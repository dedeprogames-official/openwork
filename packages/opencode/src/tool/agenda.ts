import { Effect, Schema } from "effect"
import { Work } from "@opencode-ai/core/work"
import { WorkSchedule } from "@opencode-ai/core/work/schedule"
import * as Tool from "./tool"
import DESCRIPTION from "./agenda.txt"

export const Parameters = Schema.Struct({
  action: Schema.Literals(["list", "add", "remove"]),
  title: Schema.optional(Schema.String).annotate({ description: "Event title, for add" }),
  starts_at: Schema.optional(Schema.String).annotate({ description: "\"HH:MM\" today, or a full date and time, for add" }),
  ends_at: Schema.optional(Schema.String).annotate({ description: "Optional end, same formats as starts_at" }),
  note: Schema.optional(Schema.String),
  space: Schema.optional(Schema.String).annotate({ description: "Name of the space this event belongs to" }),
  days: Schema.optional(Schema.Number).annotate({ description: "How many days to list, starting today (default 1)" }),
  id: Schema.optional(Schema.String).annotate({ description: "The event id, for remove" }),
})

export const AgendaTool = Tool.define(
  "agenda",
  Effect.gen(function* () {
    const work = yield* Work.Service

    return {
      description: DESCRIPTION,
      parameters: Parameters,
      execute: (params: Schema.Schema.Type<typeof Parameters>, ctx: Tool.Context) =>
        Effect.gen(function* () {
          const now = Date.now()
          if (params.action === "list") {
            const from = WorkSchedule.startOfDay(now)
            const events = yield* work.agenda.list({ from, until: from + Math.max(1, params.days ?? 1) * 86_400_000 })
            return {
              title: `${events.length} events`,
              output: events.length
                ? events.map((event) => `${event.id} ${new Date(event.startsAt).toLocaleString()} ${event.title}`).join("\n")
                : "Nothing on the agenda.",
              metadata: {},
            }
          }
          yield* ctx.ask({ permission: "agenda", patterns: [params.action], always: ["*"], metadata: {} })
          if (params.action === "remove") {
            if (!params.id) return { title: "Missing id", output: "Provide the event `id`.", metadata: {} }
            const id = Work.AgendaID.make(params.id)
            const output = yield* work.agenda.remove(id).pipe(
              Effect.as(`Removed ${id}.`),
              Effect.catchTag("Work.NotFoundError", () => Effect.succeed(`No event with id ${id}.`)),
            )
            return { title: output, output, metadata: {} }
          }
          const startsAt = time(params.starts_at, now)
          if (!params.title || startsAt === undefined)
            return { title: "Missing details", output: "Provide `title` and a valid `starts_at`.", metadata: {} }
          const endsAt = time(params.ends_at, now)
          const space = params.space
            ? (yield* work.space.list()).find((item) => item.name.toLowerCase() === params.space?.toLowerCase())
            : undefined
          const event = yield* work.agenda.add({
            title: params.title,
            startsAt,
            ...(endsAt === undefined ? {} : { endsAt }),
            ...(params.note ? { note: params.note } : {}),
            ...(space ? { spaceID: space.id } : {}),
          })
          return {
            title: `Added: ${event.title}`,
            output: `Added ${event.id} at ${new Date(event.startsAt).toLocaleString()}.`,
            metadata: {},
          }
        }),
    } satisfies Tool.DefWithoutID<typeof Parameters>
  }),
)

function time(value: string | undefined, now: number) {
  if (!value) return
  const clock = /^(\d{1,2}):(\d{2})$/.exec(value.trim())
  if (clock) {
    const date = new Date(now)
    date.setHours(Number(clock[1]), Number(clock[2]), 0, 0)
    return date.getTime()
  }
  const parsed = Date.parse(value)
  if (Number.isNaN(parsed)) return
  return parsed
}
