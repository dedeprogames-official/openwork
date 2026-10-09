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

export const UserTodoTool = Tool.define(
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
            return {
              title: `${todos.filter((todo) => !todo.time.done).length} open todos`,
              output: render(todos),
              metadata: {},
            }
          }
          yield* ctx.ask({ permission: "user_todo", patterns: [params.action], always: ["*"], metadata: {} })
          if (params.action === "add") {
            if (!params.content)
              return { title: "Missing content", output: "Provide `content` to add a todo.", metadata: {} }
            const session = yield* sessions.get(ctx.sessionID).pipe(Effect.orElseSucceed(() => undefined))
            const owner = WorkSession.meta(session?.metadata)
            const deployment = owner ? yield* work.deployment.get(owner.deploymentID) : undefined
            const todo = yield* work.todo.add({
              content: params.content,
              ...(params.source ? { source: params.source } : deployment ? { source: `from ${deployment.title}` } : {}),
              ...(owner ? { deploymentID: owner.deploymentID } : {}),
            })
            return { title: `Added: ${todo.content}`, output: `Added ${todo.id}.`, metadata: {} }
          }
          if (!params.id) return { title: "Missing id", output: "Provide the todo `id`.", metadata: {} }
          const id = Work.TodoID.make(params.id)
          const result =
            params.action === "remove"
              ? work.todo.remove(id).pipe(Effect.as(`Removed ${id}.`))
              : work.todo
                  .update(id, { done: params.action === "complete" })
                  .pipe(Effect.map((todo) => `${todo.time.done ? "Completed" : "Reopened"}: ${todo.content}`))
          const output = yield* result.pipe(
            Effect.catchTag("Work.NotFoundError", () => Effect.succeed(`No todo with id ${id}.`)),
          )
          return { title: output, output, metadata: {} }
        }),
    } satisfies Tool.DefWithoutID<typeof Parameters>
  }),
)
