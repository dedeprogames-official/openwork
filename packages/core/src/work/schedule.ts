export * as WorkSchedule from "./schedule"

import type { Work } from "@opencode-ai/schema/work"

const SECOND = 1_000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

export const MIN_INTERVAL = MINUTE

/** When a newly deployed agent should first run. Interval agents start right away. */
export function first(schedule: Work.Schedule, now: number) {
  if (schedule.type === "manual") return
  if (schedule.type === "once") return Math.max(schedule.at, now)
  if (schedule.type === "interval") return now
  return daily(schedule.at, now)
}

/** When an agent should run again after a run starting at `now`. */
export function next(schedule: Work.Schedule, now: number) {
  if (schedule.type === "interval") return now + Math.max(schedule.every, MIN_INTERVAL)
  if (schedule.type === "daily") return daily(schedule.at, now)
}

/** Projected run times in `[from, until)`, starting at the stored next run time. */
export function between(schedule: Work.Schedule, nextRunAt: number | undefined, until: number, limit = 10_000) {
  if (nextRunAt === undefined || nextRunAt >= until) return []
  if (schedule.type === "interval") {
    const every = Math.max(schedule.every, MIN_INTERVAL)
    const count = Math.min(limit, Math.ceil((until - nextRunAt) / every))
    return Array.from({ length: count }, (_, index) => nextRunAt + index * every)
  }
  if (schedule.type === "daily") {
    const count = Math.min(limit, Math.ceil((until - nextRunAt) / DAY))
    return Array.from({ length: count }, (_, index) => nextRunAt + index * DAY).filter((at) => at < until)
  }
  return [nextRunAt]
}

export function label(schedule: Work.Schedule) {
  if (schedule.type === "manual") return "on demand"
  if (schedule.type === "once") return "once"
  if (schedule.type === "daily") return `daily at ${schedule.at}`
  return `every ${duration(schedule.every)}`
}

export function duration(ms: number) {
  if (ms % DAY === 0) return `${ms / DAY}d`
  if (ms % HOUR === 0) return `${ms / HOUR}h`
  if (ms % MINUTE === 0) return `${ms / MINUTE}m`
  return `${Math.round(ms / SECOND)}s`
}

/** Next local occurrence of `HH:MM` strictly after `now`. */
export function daily(at: string, now: number) {
  const [hours, minutes] = at.split(":").map((part) => Number(part))
  const date = new Date(now)
  date.setHours(hours ?? 9, minutes ?? 0, 0, 0)
  if (date.getTime() <= now) date.setDate(date.getDate() + 1)
  return date.getTime()
}

export function startOfDay(now: number) {
  const date = new Date(now)
  date.setHours(0, 0, 0, 0)
  return date.getTime()
}

export function endOfDay(now: number) {
  const date = new Date(now)
  date.setHours(24, 0, 0, 0)
  return date.getTime()
}

export type Parsed = {
  readonly schedule: Work.Schedule
  readonly task: string
  readonly title: string
}

/**
 * Turns a natural description such as "check the beach cam every 10m" into a schedule, a task and a title.
 * Text without any timing words means "run once, right now".
 */
export function parse(text: string, now: number): Parsed {
  const match = matchSchedule(text, now)
  const task = clean(match ? text.slice(0, match.index) + " " + text.slice(match.index + match.length) : text)
  return {
    schedule: match?.schedule ?? { type: "once", at: now },
    task: task || clean(text),
    title: title(task || text),
  }
}

type Match = { schedule: Work.Schedule; index: number; length: number }

const UNITS: Record<string, number> = {
  s: SECOND,
  sec: SECOND,
  secs: SECOND,
  second: SECOND,
  seconds: SECOND,
  segundo: SECOND,
  segundos: SECOND,
  m: MINUTE,
  min: MINUTE,
  mins: MINUTE,
  minute: MINUTE,
  minutes: MINUTE,
  minuto: MINUTE,
  minutos: MINUTE,
  h: HOUR,
  hr: HOUR,
  hrs: HOUR,
  hour: HOUR,
  hours: HOUR,
  hora: HOUR,
  horas: HOUR,
  d: DAY,
  day: DAY,
  days: DAY,
  dia: DAY,
  dias: DAY,
}

const TIME = String.raw`(\d{1,2})(?::(\d{2}))?\s*(am|pm|h)?`

function matchSchedule(text: string, now: number): Match | undefined {
  const lower = text.toLowerCase()
  const interval = new RegExp(String.raw`\b(?:every|a cada|cada)\s+(\d+)\s*([a-z]+)\b`).exec(lower)
  if (interval && UNITS[interval[2]] !== undefined) {
    const every = Math.max(MIN_INTERVAL, Number(interval[1]) * UNITS[interval[2]])
    return { schedule: { type: "interval", every }, index: interval.index, length: interval[0].length }
  }
  const unit = /\b(?:every|each|a cada|toda)\s+(minute|minuto|hour|hora)\b|\b(hourly)\b/.exec(lower)
  if (unit) {
    const every = unit[1] === "minute" || unit[1] === "minuto" ? MINUTE : HOUR
    return { schedule: { type: "interval", every }, index: unit.index, length: unit[0].length }
  }
  const day = new RegExp(
    String.raw`(?<![a-z])(daily|every day|each day|every morning|each morning|every evening|every night|todo dia|todos os dias|diariamente|toda manh[aã])(?![a-z])(?:\s+(?:at|[àa]s?)\s+${TIME})?`,
  ).exec(lower)
  if (day) {
    const fallback = /morning|manh/.test(day[1]) ? "08:00" : /evening|night/.test(day[1]) ? "18:00" : "09:00"
    const at = day[2] ? clock(day[2], day[3], day[4]) : fallback
    return { schedule: { type: "daily", at }, index: day.index, length: day[0].length }
  }
  const once = new RegExp(String.raw`(?<![a-z])(?:at|[àa]s)\s+${TIME}(?![\d:])`).exec(lower)
  if (once && (once[2] || once[3])) {
    return {
      schedule: { type: "once", at: daily(clock(once[1], once[2], once[3]), now) },
      index: once.index,
      length: once[0].length,
    }
  }
  const immediate = /\b(right now|now|once|agora)\b/.exec(lower)
  if (immediate) return { schedule: { type: "once", at: now }, index: immediate.index, length: immediate[0].length }
}

function clock(hours: string, minutes: string | undefined, meridiem: string | undefined) {
  const base = Number(hours) % 24
  const shifted = meridiem === "pm" && base < 12 ? base + 12 : meridiem === "am" && base === 12 ? 0 : base
  return `${String(shifted).padStart(2, "0")}:${(minutes ?? "00").padStart(2, "0")}`
}

function clean(text: string) {
  return text
    .replace(/\s+/g, " ")
    .replace(/^[\s,;:-]+|[\s,;:-]+$/g, "")
    .replace(/\s+(and|e)$/i, "")
    .trim()
}

function title(text: string) {
  const first = clean(text).split(/[.;\n]/)[0] ?? ""
  const short = first.length > 60 ? first.slice(0, 57).trimEnd() + "..." : first
  return short.charAt(0).toUpperCase() + short.slice(1)
}
