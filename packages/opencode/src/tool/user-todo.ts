import { Effect, Schema } from "effect"
import { Work } from "@opencode-ai/core/work"
import { Session } from "@/session/session"
import { WorkSession } from "@/work/session"
import * as Tool from "./tool"
import DESCRIPTION from "./user-todo.txt"

export const Parameters = Schema.Struct({
  action: Schema.Literals(["list", "add", "complete", "reopen", "remove"]),
  content: Schema.optional(Schema.String).annotate({ description: "The todo text, for add" }),
  source: Schema.optional(Schema.String).annotate({
    description: 'Where the item came from, e.g. "from meeting notes"',
  }),
  id: Schema.optional(Schema.String).annotate({ description: "The todo id, for complete, reopen and remove" }),
})

type Metadata = {
  open?: number
  content?: string
}

export const UserTodoTool = Tool.define<typeof Parameters, Metadata, Work.Service | Session.Service>(
  "user_todo",
  Effect.gen(function* () {
    const work = yield* Work.Service
    const sessions = yield* Session.Service

    const render = (todos: ReadonlyArray<Work.Todo>) =>
      todos.length === 0
        ? "The user's todo list is empty."
        : todos
            .map(
              (todo) =>
                `[${todo.time.done ? "x" : " "}] ${todo.id} ${todo.content}${todo.source ? ` (${todo.source})` : ""}`,
            )
            .join("\n")

    return {
      description: DESCRIPTION,
      parameters: Parameters,
      execute: (params: Schema.Schema.Type<typeof Parameters>, ctx: Tool.Context) =>
        Effect.gen(function* () {
          if (params.action === "list") {
            const todos = yield* work.todo.list()
            const open = todos.filter((todo) => !todo.time.done).length
            return { title: `${open} open todos`, output: render(todos), metadata: { open } }
          }
          yield* ctx.ask({ permission: "user_todo", patterns: [params.action], always: ["*"], metadata: {} })
          if (params.action === "add") {
            if (!params.content) return yield* Effect.fail(new Error("Provide `content` to add a todo."))
            const session = yield* sessions.get(ctx.sessionID).pipe(Effect.orElseSucceed(() => undefined))
            const owner = WorkSession.meta(session?.metadata)
            const deployment = owner ? yield* work.deployment.get(owner.deploymentID) : undefined
            const todo = yield* work.todo.add({
              content: params.content,
              ...(params.source ? { source: params.source } : deployment ? { source: `from ${deployment.title}` } : {}),
              ...(owner ? { deploymentID: owner.deploymentID } : {}),
            })
            return { title: `Added: ${todo.content}`, output: `Added ${todo.id}.`, metadata: { content: todo.content } }
          }
          if (!params.id) return yield* Effect.fail(new Error("Provide the todo `id`."))
          const todo = (yield* work.todo.list()).find((item) => item.id === params.id)
          if (!todo) return yield* Effect.fail(new Error(`No todo with id ${params.id}.`))
          yield* params.action === "remove"
            ? work.todo.remove(todo.id)
            : work.todo.update(todo.id, { done: params.action === "complete" })
          const output = `${{ complete: "Completed", reopen: "Reopened", remove: "Removed" }[params.action]}: ${todo.content}`
          return { title: output, output, metadata: { content: todo.content } }
        }).pipe(Effect.orDie),
    } satisfies Tool.DefWithoutID<typeof Parameters>
  }),
)
