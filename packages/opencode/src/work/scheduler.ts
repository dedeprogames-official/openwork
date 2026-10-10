export * as WorkScheduler from "./scheduler"

import { Cause, Context, Duration, Effect, Exit, Layer, Schedule, Scope, Semaphore } from "effect"
import { LayerNode } from "@opencode-ai/core/effect/layer-node"
import { ModelV2 } from "@opencode-ai/core/model"
import { ProviderV2 } from "@opencode-ai/core/provider"
import { SessionV1 } from "@opencode-ai/core/v1/session"
import { Work } from "@opencode-ai/core/work"
import { Agent } from "@/agent/agent"
import { RuntimeFlags } from "@/effect/runtime-flags"
import { InstanceStore } from "@/project/instance-store"
import { Provider } from "@/provider/provider"
import { SessionPrompt } from "@/session/prompt"
import { SessionID } from "@/session/schema"
import { Session } from "@/session/session"
import { WorkPermission } from "./permission"
import { WorkPrompt } from "./prompt"
import { WorkSession } from "./session"

export class BusyError extends Error {
  constructor(readonly deploymentID: Work.DeploymentID) {
    super(`Agent ${deploymentID} is already running`)
  }
}

export interface Interface {
  /** Starts a manual run in the background and returns it right away. */
  readonly start: (id: Work.DeploymentID) => Effect.Effect<Work.Run, Work.NotFoundError | BusyError>
  /** Starts a manual run and waits for it to finish. */
  readonly run: (id: Work.DeploymentID) => Effect.Effect<Work.Run, Work.NotFoundError | BusyError>
  /** One scheduler pass: recovers dead runs, resumes interrupted chats and starts every due agent. */
  readonly tick: () => Effect.Effect<void>
}

export class Service extends Context.Service<Service, Interface>()("@opencode/WorkScheduler") {}

const TICK = Duration.seconds(5)
const RUN_TIMEOUT = Duration.minutes(15)
const CONCURRENCY = 3

const layer = Layer.effect(
  Service,
  Effect.gen(function* () {
    const work = yield* Work.Service
    const instances = yield* InstanceStore.Service
    const sessions = yield* Session.Service
    const prompts = yield* SessionPrompt.Service
    const agents = yield* Agent.Service
    const provider = yield* Provider.Service
    const flags = yield* RuntimeFlags.Service
    const scope = yield* Scope.Scope
    const slots = Semaphore.makeUnsafe(CONCURRENCY)
    const active = new Set<Work.DeploymentID>()

    const execute = Effect.fn("WorkScheduler.execute")(function* (deployment: Work.Deployment, run: Work.Run) {
      const previous = (yield* work.run.list(deployment.id, 2)).find((item) => item.id !== run.id)
      const exit = yield* instances
        .provide(
          { directory: deployment.directory },
          Effect.gen(function* () {
            const agent = (yield* agents.get(deployment.agent)) ?? (yield* agents.get("work"))
            const model = deployment.model
              ? {
                  providerID: ProviderV2.ID.make(deployment.model.providerID),
                  modelID: ModelV2.ID.make(deployment.model.modelID),
                }
              : (agent.model ?? (yield* provider.defaultModel()))
            const session = yield* sessions.create({
              // An explicit title skips the extra title-generation request.
              title: `${deployment.title} · run #${run.number}`,
              agent: agent.name,
              model: { id: model.modelID, providerID: model.providerID },
              permission: WorkPermission.ruleset(deployment.access, agent.permission),
              metadata: WorkSession.metadata({ kind: "run", deploymentID: deployment.id, runID: run.id }),
            })
            yield* work.run.attach(run.id, session.id)
            yield* prompts
              .prompt({
                sessionID: session.id,
                agent: agent.name,
                model,
                parts: [{ type: "text", text: WorkPrompt.run(deployment, run, previous) }],
              })
              .pipe(
                Effect.timeoutOrElse({
                  duration: RUN_TIMEOUT,
                  orElse: () =>
                    prompts.cancel(session.id).pipe(Effect.andThen(Effect.die(new Error("The run timed out")))),
                }),
              )
            const messages = yield* sessions.messages({ sessionID: session.id })
            // Closing OpenWork aborts the answer and lists the session to resume; a run reports it instead.
            if (aborted(messages) && (yield* work.resume.has(session.id)))
              return { ...outcome(messages), status: "error" as const, error: Work.INTERRUPTED }
            return outcome(messages)
          }),
        )
        .pipe(slots.withPermits(1), Effect.exit)
      const result: Work.RunOutcome = Exit.isSuccess(exit)
        ? exit.value
        : { status: Cause.hasInterruptsOnly(exit.cause) ? "cancelled" : "error", error: failure(exit.cause) }
      yield* work.run.finish(run.id, result)
      if (result.error === Work.INTERRUPTED) yield* notifyInterrupted(deployment, run)
    })

    /** Tells the user in the inbox that a run stopped early because OpenWork closed. */
    const notifyInterrupted = Effect.fn("WorkScheduler.notifyInterrupted")(function* (
      deployment: Work.Deployment,
      run: Work.Run,
    ) {
      const current = (yield* work.deployment.get(deployment.id)) ?? deployment
      const next =
        current.status === "active" && current.nextRunAt !== undefined
          ? "It runs again at its next scheduled time, or open it to run it now."
          : "Open it to run it again."
      yield* work.message.post({
        title: `Run #${run.number} didn't finish`,
        body: `OpenWork closed while "${current.title}" was running, so this run stopped early. ${next}`,
        deploymentID: current.id,
        runID: run.id,
        ...(run.sessionID ? { sessionID: run.sessionID } : {}),
      })
    })

    /** Picks up chats that were still answering when the OpenWork process running them stopped. */
    const resume = Effect.fn("WorkScheduler.resume")(function* () {
      const pending = yield* work.resume.take(alive)
      yield* Effect.forEach(
        pending,
        (id) =>
          Effect.gen(function* () {
            const session = yield* sessions.get(SessionID.make(id)).pipe(Effect.orElseSucceed(() => undefined))
            // Runs are reported in the inbox instead, and a subagent's parent picks its work up again.
            if (!session || session.parentID || WorkSession.meta(session.metadata)?.kind === "run") return
            yield* instances.provide({ directory: session.directory }, prompts.loop({ sessionID: session.id })).pipe(
              Effect.catchCause((cause) =>
                Effect.logError("resuming an interrupted chat failed", { sessionID: id, cause: Cause.pretty(cause) }),
              ),
              Effect.forkIn(scope),
            )
          }),
        { discard: true },
      )
    })

    const launch = (deployment: Work.Deployment, run: Work.Run) => {
      active.add(deployment.id)
      return execute(deployment, run).pipe(
        Effect.catchCause((cause) => Effect.logError("work run failed", { deploymentID: deployment.id, cause })),
        Effect.ensuring(Effect.sync(() => active.delete(deployment.id))),
      )
    }

    const claim = Effect.fn("WorkScheduler.claim")(function* (id: Work.DeploymentID, trigger: Work.RunTrigger) {
      const deployment = yield* work.deployment.get(id)
      if (!deployment) return yield* Effect.fail(new Work.NotFoundError({ kind: "deployment", id }))
      if (active.has(id)) return yield* Effect.fail(new BusyError(id))
      const run = yield* work.run.claim({ deploymentID: id, trigger, now: Date.now(), pid: process.pid })
      if (!run) return yield* Effect.fail(new BusyError(id))
      return { deployment, run }
    })

    const tick = Effect.fn("WorkScheduler.tick")(function* () {
      const recovered = yield* work.run.recover(alive)
      yield* Effect.forEach(
        recovered,
        (run) =>
          Effect.gen(function* () {
            const deployment = yield* work.deployment.get(run.deploymentID)
            if (deployment) yield* notifyInterrupted(deployment, run)
          }),
        { discard: true },
      )
      yield* resume()
      const due = (yield* work.deployment.due(Date.now())).filter((item) => !active.has(item.id))
      yield* Effect.forEach(
        due,
        (deployment) =>
          Effect.gen(function* () {
            const run = yield* work.run
              .claim({ deploymentID: deployment.id, trigger: "schedule", now: Date.now(), pid: process.pid })
              .pipe(Effect.orElseSucceed(() => undefined))
            if (!run) return
            yield* launch(deployment, run).pipe(Effect.forkIn(scope))
          }),
        { discard: true },
      )
    })

    if (!flags.disableWorkScheduler)
      yield* tick().pipe(
        Effect.catchCause((cause) => Effect.logError("work scheduler tick failed", { cause: Cause.pretty(cause) })),
        Effect.repeat(Schedule.spaced(TICK)),
        Effect.delay(Duration.seconds(2)),
        Effect.forkScoped,
      )

    return Service.of({
      start: Effect.fn("WorkScheduler.start")(function* (id: Work.DeploymentID) {
        const claimed = yield* claim(id, "manual")
        yield* launch(claimed.deployment, claimed.run).pipe(Effect.forkIn(scope))
        return claimed.run
      }),
      run: Effect.fn("WorkScheduler.run")(function* (id: Work.DeploymentID) {
        const claimed = yield* claim(id, "manual")
        yield* launch(claimed.deployment, claimed.run)
        return (yield* work.run.get(claimed.run.id)) ?? claimed.run
      }),
      tick,
    })
  }),
)

export const node = LayerNode.make({
  service: Service,
  layer,
  deps: [Work.node, InstanceStore.node, Session.node, SessionPrompt.node, Agent.node, Provider.node, RuntimeFlags.node],
})

function alive(pid: number) {
  if (pid === process.pid) return true
  try {
    process.kill(pid, 0)
    return true
  } catch {
    return false
  }
}

function aborted(messages: ReadonlyArray<SessionV1.WithParts>) {
  const last = messages.findLast((message) => message.info.role === "assistant")?.info
  return last?.role === "assistant" && last.error?.name === "MessageAbortedError"
}

function failure(cause: Cause.Cause<unknown>) {
  const error = Cause.squash(cause)
  if (error instanceof Error) return error.message
  return Cause.pretty(cause)
}

/** Summarizes a finished run from its session messages. */
export function outcome(messages: ReadonlyArray<SessionV1.WithParts>): Work.RunOutcome {
  const assistants = messages.flatMap((message) => (message.info.role === "assistant" ? [message.info] : []))
  const last = assistants.at(-1)
  const text = messages
    .flatMap((message) => (message.info.role === "assistant" ? message.parts : []))
    .findLast((part) => part.type === "text" && part.text.trim().length > 0)
  const summary = text?.type === "text" ? text.text.trim() : undefined
  const error = last?.error
    ? "message" in last.error.data && typeof last.error.data.message === "string"
      ? last.error.data.message
      : last.error.name
    : undefined
  return {
    status: error ? "error" : "done",
    ...(summary ? { summary: summary.length > 600 ? summary.slice(0, 597) + "..." : summary } : {}),
    ...(error ? { error } : {}),
    tokens: {
      input: assistants.reduce((sum, item) => sum + item.tokens.input, 0),
      output: assistants.reduce((sum, item) => sum + item.tokens.output, 0),
      reasoning: assistants.reduce((sum, item) => sum + item.tokens.reasoning, 0),
      cache: {
        read: assistants.reduce((sum, item) => sum + item.tokens.cache.read, 0),
        write: assistants.reduce((sum, item) => sum + item.tokens.cache.write, 0),
      },
    },
    cost: assistants.reduce((sum, item) => sum + item.cost, 0),
    ...(last ? { providerID: last.providerID, modelID: last.modelID } : {}),
  }
}
