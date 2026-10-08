import path from "path"
import { Effect } from "effect"
import { HttpApiBuilder } from "effect/unstable/httpapi"
import { FSUtil } from "@opencode-ai/core/fs-util"
import { ModelV2 } from "@opencode-ai/core/model"
import { ProviderV2 } from "@opencode-ai/core/provider"
import { Work } from "@opencode-ai/core/work"
import { InstanceStore } from "@/project/instance-store"
import { Session } from "@/session/session"
import { SessionID } from "@/session/schema"
import { WorkDemo } from "@/work/demo"
import { WorkScheduler } from "@/work/scheduler"
import { WorkSession } from "@/work/session"
import { RootHttpApi } from "../api"
import { ConflictError, InvalidRequestError, WorkNotFoundError } from "../errors"

export const workHandlers = HttpApiBuilder.group(RootHttpApi, "work", (handlers) =>
  Effect.gen(function* () {
    const work = yield* Work.Service
    const scheduler = yield* WorkScheduler.Service
    const instances = yield* InstanceStore.Service
    const sessions = yield* Session.Service
    const fs = yield* FSUtil.Service

    const notFound = (error: Work.NotFoundError) =>
      Effect.fail(
        new WorkNotFoundError({ kind: error.kind, id: error.id, message: `No ${error.kind} with id ${error.id}` }),
      )

    const folder = Effect.fn("WorkHttpApi.folder")(function* (directory: string) {
      const resolved = path.resolve(directory)
      if (yield* fs.isDir(resolved)) return resolved
      return yield* Effect.fail(
        new InvalidRequestError({ message: `The folder ${resolved} does not exist`, field: "directory" }),
      )
    })

    const deploymentCreate = Effect.fn("WorkHttpApi.deploymentCreate")(function* (ctx: {
      payload: Work.DeploymentCreate
    }) {
      const directory = yield* folder(ctx.payload.directory)
      const deployment = yield* work.deployment.create({
        ...ctx.payload,
        directory,
        agent: ctx.payload.agent ?? "work",
      })
      if (ctx.payload.runNow && deployment.schedule.type !== "interval")
        yield* scheduler.start(deployment.id).pipe(Effect.ignore)
      return deployment
    })

    const deploymentUpdate = Effect.fn("WorkHttpApi.deploymentUpdate")(function* (ctx: {
      params: { deploymentID: Work.DeploymentID }
      payload: Work.DeploymentPatch
    }) {
      const directory = ctx.payload.directory === undefined ? undefined : yield* folder(ctx.payload.directory)
      return yield* work.deployment
        .update(ctx.params.deploymentID, { ...ctx.payload, ...(directory ? { directory } : {}) })
        .pipe(Effect.catchTag("Work.NotFoundError", notFound))
    })

    const deploymentRun = Effect.fn("WorkHttpApi.deploymentRun")(function* (ctx: {
      params: { deploymentID: Work.DeploymentID }
    }) {
      return yield* scheduler.start(ctx.params.deploymentID).pipe(
        Effect.catchTag("Work.NotFoundError", notFound),
        Effect.catchIf(
          (error) => error instanceof WorkScheduler.BusyError,
          (error) => Effect.fail(new ConflictError({ message: error.message, resource: ctx.params.deploymentID })),
        ),
      )
    })

    const deploymentRuns = Effect.fn("WorkHttpApi.deploymentRuns")(function* (ctx: {
      params: { deploymentID: Work.DeploymentID }
    }) {
      if (!(yield* work.deployment.get(ctx.params.deploymentID)))
        return yield* notFound(new Work.NotFoundError({ kind: "deployment", id: ctx.params.deploymentID }))
      return yield* work.run.list(ctx.params.deploymentID, 50)
    })

    const deploymentChat = Effect.fn("WorkHttpApi.deploymentChat")(function* (ctx: {
      params: { deploymentID: Work.DeploymentID }
    }) {
      const deployment = yield* work.deployment.get(ctx.params.deploymentID)
      if (!deployment)
        return yield* notFound(new Work.NotFoundError({ kind: "deployment", id: ctx.params.deploymentID }))
      const directory = yield* folder(deployment.directory)
      const sessionID = yield* instances.provide(
        { directory },
        Effect.gen(function* () {
          const existing = deployment.chatSessionID
            ? yield* sessions.get(SessionID.make(deployment.chatSessionID)).pipe(Effect.orElseSucceed(() => undefined))
            : undefined
          if (existing) return existing.id
          const session = yield* sessions.create({
            title: `Ask: ${deployment.title}`,
            agent: "work",
            metadata: WorkSession.metadata({ kind: "chat", deploymentID: deployment.id }),
            ...(deployment.model
              ? {
                  model: {
                    id: ModelV2.ID.make(deployment.model.modelID),
                    providerID: ProviderV2.ID.make(deployment.model.providerID),
                  },
                }
              : {}),
          })
          yield* work.deployment.setChat(deployment.id, session.id)
          return session.id
        }),
      )
      return { sessionID }
    })

    return handlers
      .handle("state", () => work.state())
      .handle("pause", (ctx) => work.setPaused(ctx.payload.paused).pipe(Effect.as(true)))
      .handle("demo", (ctx) =>
        Effect.gen(function* () {
          const directory = yield* folder(ctx.payload.directory ?? process.cwd())
          return yield* WorkDemo.seed({ directory }).pipe(
            Effect.provideService(Work.Service, work),
            Effect.provideService(FSUtil.Service, fs),
            Effect.orDie,
          )
        }),
      )
      .handle("deploymentCreate", deploymentCreate)
      .handle("deploymentUpdate", deploymentUpdate)
      .handle("deploymentRemove", (ctx) =>
        work.deployment
          .remove(ctx.params.deploymentID)
          .pipe(Effect.as(true), Effect.catchTag("Work.NotFoundError", notFound)),
      )
      .handle("deploymentRun", deploymentRun)
      .handle("deploymentRuns", deploymentRuns)
      .handle("deploymentChat", deploymentChat)
      .handle("spaceCreate", (ctx) => work.space.create(ctx.payload))
      .handle("spaceUpdate", (ctx) =>
        work.space.update(ctx.params.spaceID, ctx.payload).pipe(Effect.catchTag("Work.NotFoundError", notFound)),
      )
      .handle("spaceRemove", (ctx) =>
        work.space.remove(ctx.params.spaceID).pipe(Effect.as(true), Effect.catchTag("Work.NotFoundError", notFound)),
      )
      .handle("messageUpdate", (ctx) =>
        work.message.update(ctx.params.messageID, ctx.payload).pipe(Effect.catchTag("Work.NotFoundError", notFound)),
      )
      .handle("messageRemove", (ctx) =>
        work.message
          .remove(ctx.params.messageID)
          .pipe(Effect.as(true), Effect.catchTag("Work.NotFoundError", notFound)),
      )
      .handle("todoCreate", (ctx) => work.todo.add(ctx.payload))
      .handle("todoUpdate", (ctx) =>
        work.todo.update(ctx.params.todoID, ctx.payload).pipe(Effect.catchTag("Work.NotFoundError", notFound)),
      )
      .handle("todoRemove", (ctx) =>
        work.todo.remove(ctx.params.todoID).pipe(Effect.as(true), Effect.catchTag("Work.NotFoundError", notFound)),
      )
      .handle("agendaCreate", (ctx) => work.agenda.add(ctx.payload))
      .handle("agendaUpdate", (ctx) =>
        work.agenda.update(ctx.params.agendaID, ctx.payload).pipe(Effect.catchTag("Work.NotFoundError", notFound)),
      )
      .handle("agendaRemove", (ctx) =>
        work.agenda.remove(ctx.params.agendaID).pipe(Effect.as(true), Effect.catchTag("Work.NotFoundError", notFound)),
      )
      .handle("memoryCreate", (ctx) => work.memory.save(ctx.payload))
      .handle("memoryRemove", (ctx) =>
        work.memory.remove(ctx.params.memoryID).pipe(Effect.as(true), Effect.catchTag("Work.NotFoundError", notFound)),
      )
  }),
)
