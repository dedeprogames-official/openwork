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
  action: Schema.Literals(["create", "list", "pause", "resume", "run", "remove"]),
  request: Schema.optional(Schema.String).annotate({
    description: "What the agent should do and when, in plain language, for create",
  }),
  title: Schema.optional(Schema.String),
  task: Schema.optional(Schema.String),
  schedule: Schema.optional(Schema.String).annotate({ description: "e.g. \"every 10m\", \"hourly\", \"daily at 9am\", \"now\"" }),
  directory: Schema.optional(Schema.String).annotate({ description: "Folder the agent works in; defaults to the current one" }),
  space: Schema.optional(Schema.String).annotate({ description: "Space name to group the agent under" }),
  skill: Schema.optional(Schema.String),
  access: Schema.optional(Schema.Literals(["read", "write", "full"])),
  id: Schema.optional(Schema.String).annotate({ description: "Agent id for pause, resume, run and remove" }),
})

type Metadata = {
  deploymentID?: string
}

export const DeployTool = Tool.define<typeof Parameters, Metadata, Work.Service | Session.Service | FSUtil.Service>(
  "deploy",
  Effect.gen(function* () {
    const work = yield* Work.Service
    const sessions = yield* Session.Service
    const fs = yield* FSUtil.Service

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
                    .map((item) => `${item.id} [${item.status}] ${item.title} - ${WorkSchedule.label(item.schedule)} in ${item.directory}`)
                    .join("\n")
                : "No agents deployed yet.",
              metadata: {},
            }
          }
          if (params.action !== "create") {
            if (!params.id) return { title: "Missing id", output: "Provide the agent `id`.", metadata: {} }
            yield* ctx.ask({ permission: "deploy", patterns: [params.action], always: [], metadata: {} })
            const id = Work.DeploymentID.make(params.id)
            const action =
              params.action === "remove"
                ? work.deployment.remove(id).pipe(Effect.as(`Removed agent ${id}.`))
                : params.action === "run"
                  ? work.deployment.requestRun(id).pipe(Effect.as(`Agent ${id} will run in a few seconds.`))
                  : work.deployment
                      .update(id, { status: params.action === "pause" ? "paused" : "active" })
                      .pipe(Effect.map((item) => `${item.title} is now ${item.status}.`))
            const output = yield* action.pipe(
              Effect.catchTag("Work.NotFoundError", () => Effect.succeed(`No agent with id ${id}.`)),
            )
            return { title: output, output, metadata: {} }
          }

          const description = [params.request ?? params.task ?? "", params.schedule ?? ""].join(" ").trim()
          if (!description) return { title: "Missing request", output: "Describe what the agent should do in `request`.", metadata: {} }
          const parsed = WorkSchedule.parse(description, Date.now())
          const instance = yield* InstanceState.context
          const directory = path.resolve(instance.directory, params.directory ?? ".")
          if (!(yield* fs.isDir(directory)))
            return { title: "Folder not found", output: `The folder ${directory} does not exist.`, metadata: {} }
          yield* ctx.ask({ permission: "deploy", patterns: [directory], always: [], metadata: { directory } })

          const spaces = yield* work.space.list()
          const space = params.space
            ? (spaces.find((item) => item.name.toLowerCase() === params.space?.toLowerCase()) ??
              (yield* work.space.create({ name: params.space })))
            : undefined
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
          return { title: `Deployed: ${deployment.title}`, output, metadata: { deploymentID: deployment.id } }
        }),
    } satisfies Tool.DefWithoutID<typeof Parameters, Metadata>
  }),
)
