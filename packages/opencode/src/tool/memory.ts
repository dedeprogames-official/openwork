import { Effect, Schema } from "effect"
import { Work } from "@opencode-ai/core/work"
import * as Tool from "./tool"
import DESCRIPTION from "./memory.txt"

export const Parameters = Schema.Struct({
  action: Schema.Literals(["list", "save", "forget"]),
  content: Schema.optional(Schema.String).annotate({ description: "The fact to remember, for save" }),
  id: Schema.optional(Schema.String).annotate({ description: "The memory id, for forget" }),
})

type Metadata = {
  count?: number
  content?: string
}

export const MemoryTool = Tool.define<typeof Parameters, Metadata, Work.Service>(
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
              metadata: { count: memories.length },
            }
          }
          yield* ctx.ask({ permission: "memory", patterns: [params.action], always: ["*"], metadata: {} })
          if (params.action === "save") {
            if (!params.content) return yield* Effect.fail(new Error("Provide `content` to remember."))
            const memory = yield* work.memory.save({ content: params.content, source: ctx.agent })
            return {
              title: `Remembered: ${memory.content}`,
              output: `Saved ${memory.id}.`,
              metadata: { content: memory.content },
            }
          }
          if (!params.id) return yield* Effect.fail(new Error("Provide the memory `id` to forget."))
          const memory = (yield* work.memory.list()).find((item) => item.id === params.id)
          if (!memory) return yield* Effect.fail(new Error(`No memory with id ${params.id}.`))
          yield* work.memory.remove(memory.id)
          return {
            title: `Forgot: ${memory.content}`,
            output: `Forgot ${memory.id}.`,
            metadata: { content: memory.content },
          }
        }).pipe(Effect.orDie),
    } satisfies Tool.DefWithoutID<typeof Parameters>
  }),
)
