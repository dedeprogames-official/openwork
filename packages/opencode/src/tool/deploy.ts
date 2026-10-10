import path from "path"
import { Effect, Schema } from "effect"
import { FSUtil } from "@opencode-ai/core/fs-util"
import { Work } from "@opencode-ai/core/work"
import { WorkSchedule } from "@opencode-ai/core/work/schedule"
import { InstanceState } from "@/effect/instance-state"
import { Session } from "@/session/session"
import * as Tool from "./tool"
import DESCRIPTION from "./deploy.txt"

export const Parameters = Schema.Struct({
  action: Schema.Literals(["create", "list", "pause", "resume", "run", "remove", "move"]),
  request: Schema.optional(Schema.String).annotate({
    description: "What the agent should do and when, in plain language, for create",
  }),
  title: Schema.optional(Schema.String),
  task: Schema.optional(Schema.String),
  schedule: Schema.optional(Schema.String).annotate({
    description: 'e.g. "every 10m", "hourly", "daily at 9am", "now"',
  }),
  directory: Schema.optional(Schema.String).annotate({
    description: "Folder the agent works in; defaults to the current one",
  }),
  space: Schema.optional(Schema.String).annotate({
    description:
      "Space name to group the agent under, for create and move; leave it out on move to take the agent out of its space",
  }),
  skill: Schema.optional(Schema.String),
  access: Schema.optional(Schema.Literals(["read", "write", "full"])),
  id: Schema.optional(Schema.String).annotate({ description: "Agent id for pause, resume, run, remove and move" }),
})

type Metadata = {
  deploymentID?: string
  title?: string
  schedule?: string
  space?: string
  count?: number
}

export const DeployTool = Tool.define<typeof Parameters, Metadata, Work.Service | Session.Service | FSUtil.Service>(
  "deploy",
  Effect.gen(function* () {
    const work = yield* Work.Service
    const sessions = yield* Session.Service
    const fs = yield* FSUtil.Service
    // Spaces are matched by name, ignoring case, and created on first use.
    const spaceNamed = Effect.fnUntraced(function* (name: string) {
      const spaces = yield* work.space.list()
      return (
        spaces.find((item) => item.name.toLowerCase() === name.toLowerCase()) ?? (yield* work.space.create({ name }))
      )
    })

    return {
      description: DESCRIPTION,
      parameters: Parameters,
      execute: (params: Schema.Schema.Type<typeof Parameters>, ctx: Tool.Context<Metadata>) =>
        Effect.gen(function* () {
          if (params.action === "list") {
            const deployments = yield* work.deployment.list()
            return {
              title: `${deployments.length} agents`,
              output: deployments.length
                ? deployments
                    .map(
                      (item) =>
                        `${item.id} [${item.status}] ${item.title} - ${WorkSchedule.label(item.schedule)} in ${item.directory}`,
                    )
                    .join("\n")
                : "No agents deployed yet.",
              metadata: { count: deployments.length },
            }
          }
          if (params.action !== "create") {
            if (!params.id) return yield* Effect.fail(new Error("Provide the agent `id`."))
            yield* ctx.ask({ permission: "deploy", patterns: [params.action], always: [], metadata: {} })
            const deployment = yield* work.deployment.get(Work.DeploymentID.make(params.id))
            if (!deployment) return yield* Effect.fail(new Error(`No agent with id ${params.id}.`))
            const space = params.action === "move" && params.space ? yield* spaceNamed(params.space) : undefined
            yield* params.action === "remove"
              ? work.deployment.remove(deployment.id)
              : params.action === "run"
                ? work.deployment.requestRun(deployment.id)
                : work.deployment.update(
                    deployment.id,
                    params.action === "move"
                      ? { spaceID: space?.id ?? null }
                      : { status: params.action === "pause" ? "paused" : "active" },
                  )
            const output = {
              remove: `Removed agent ${deployment.title} (${deployment.id}).`,
              run: `${deployment.title} will run in a few seconds.`,
              move: space
                ? `Moved ${deployment.title} to ${space.name}.`
                : `${deployment.title} no longer belongs to a space.`,
              pause: `${deployment.title} is now paused.`,
              resume: `${deployment.title} is now active.`,
            }[params.action]
            return {
              title: output,
              output,
              metadata: {
                deploymentID: deployment.id,
                title: deployment.title,
                ...(space ? { space: space.name } : {}),
              },
            }
          }

          const description = [params.request ?? params.task ?? "", params.schedule ?? ""].join(" ").trim()
          if (!description) return yield* Effect.fail(new Error("Describe what the agent should do in `request`."))
          const parsed = WorkSchedule.parse(description, Date.now())
          const instance = yield* InstanceState.context
          const directory = path.resolve(instance.directory, params.directory ?? ".")
          if (!(yield* fs.isDir(directory)))
            return yield* Effect.fail(new Error(`The folder ${directory} does not exist.`))
          yield* ctx.ask({ permission: "deploy", patterns: [directory], always: [], metadata: { directory } })

          const space = params.space ? yield* spaceNamed(params.space) : undefined
          const session = yield* sessions.get(ctx.sessionID).pipe(Effect.orElseSucceed(() => undefined))
          const deployment = yield* work.deployment.create({
            title: params.title ?? parsed.title,
            task: params.task ?? parsed.task,
            directory,
            agent: "work",
            schedule: parsed.schedule,
            access: params.access ?? "read",
            ...(space ? { spaceID: space.id } : {}),
            ...(params.skill ? { skill: params.skill } : {}),
            ...(session?.model ? { model: { providerID: session.model.providerID, modelID: session.model.id } } : {}),
          })
          const output = `Deployed "${deployment.title}" (${deployment.id}) - ${WorkSchedule.label(deployment.schedule)} in ${deployment.directory}.`
          return {
            title: `Deployed: ${deployment.title}`,
            output,
            metadata: {
              deploymentID: deployment.id,
              title: deployment.title,
              schedule: WorkSchedule.label(deployment.schedule),
              ...(space ? { space: space.name } : {}),
            },
          }
        }).pipe(Effect.orDie),
    } satisfies Tool.DefWithoutID<typeof Parameters, Metadata>
  }),
)
