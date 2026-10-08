import { Effect, Schema } from "effect"
import { Work } from "@opencode-ai/core/work"
import * as Tool from "./tool"
import DESCRIPTION from "./memory.txt"

export const Parameters = Schema.Struct({
  action: Schema.Literals(["list", "save", "forget"]),
  content: Schema.optional(Schema.String).annotate({ description: "The fact to remember, for save" }),
  id: Schema.optional(Schema.String).annotate({ description: "The memory id, for forget" }),
})

export const MemoryTool = Tool.define(
  "memory",
  Effect.gen(function* () {
    const work = yield* Work.Service

    return {
      description: DESCRIPTION,
      parameters: Parameters,
      execute: (params: Schema.Schema.Type<typeof Parameters>, ctx: Tool.Context) =>
        Effect.gen(function* () {
          if (params.action === "list") {
            const memories = yield* work.memory.list()
            return {
              title: `${memories.length} memories`,
              output: memories.length
                ? memories.map((memory) => `${memory.id} ${memory.content}`).join("\n")
                : "Nothing saved yet.",
              metadata: {},
            }
          }
          yield* ctx.ask({ permission: "memory", patterns: [params.action], always: ["*"], metadata: {} })
          if (params.action === "save") {
            if (!params.content) return { title: "Missing content", output: "Provide `content` to remember.", metadata: {} }
            const memory = yield* work.memory.save({ content: params.content, source: ctx.agent })
            return { title: `Remembered: ${memory.content}`, output: `Saved ${memory.id}.`, metadata: {} }
          }
          if (!params.id) return { title: "Missing id", output: "Provide the memory `id` to forget.", metadata: {} }
          const id = Work.MemoryID.make(params.id)
          const output = yield* work.memory.remove(id).pipe(
            Effect.as(`Forgot ${id}.`),
            Effect.catchTag("Work.NotFoundError", () => Effect.succeed(`No memory with id ${id}.`)),
          )
          return { title: output, output, metadata: {} }
        }),
    } satisfies Tool.DefWithoutID<typeof Parameters>
  }),
)
