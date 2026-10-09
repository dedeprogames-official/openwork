import { Effect, Schema } from "effect"
import { Work } from "@opencode-ai/core/work"
import { Session } from "@/session/session"
import { WorkSession } from "@/work/session"
import * as Tool from "./tool"
import DESCRIPTION from "./inbox.txt"

export const Parameters = Schema.Struct({
  title: Schema.String.annotate({ description: 'A few words naming what this is about, e.g. "Tonight\'s conditions"' }),
  message: Schema.String.annotate({ description: "One or two sentences the user can act on" }),
  priority: Schema.optional(Schema.Literals(["normal", "high"])).annotate({
    description: "Use high only when the user must act soon",
  }),
})

export const InboxTool = Tool.define(
  "inbox",
  Effect.gen(function* () {
    const work = yield* Work.Service
    const sessions = yield* Session.Service

    return {
      description: DESCRIPTION,
      parameters: Parameters,
      execute: (params: Schema.Schema.Type<typeof Parameters>, ctx: Tool.Context) =>
        Effect.gen(function* () {
          yield* ctx.ask({ permission: "inbox", patterns: ["*"], always: ["*"], metadata: {} })
          const session = yield* sessions.get(ctx.sessionID).pipe(Effect.orElseSucceed(() => undefined))
          const owner = WorkSession.meta(session?.metadata)
          const message = yield* work.message.post({
            title: params.title,
            body: params.message,
            priority: params.priority ?? "normal",
            sessionID: ctx.sessionID,
            ...(owner ? { deploymentID: owner.deploymentID } : {}),
            ...(owner?.runID ? { runID: owner.runID } : {}),
          })
          return {
            title: params.title,
            output: `Posted to the user's inbox (${message.id}).`,
            metadata: { messageID: message.id },
          }
        }),
    } satisfies Tool.DefWithoutID<typeof Parameters>
  }),
)
