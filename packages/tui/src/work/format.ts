import type { WorkAccess, WorkDeployment } from "@opencode-ai/sdk/v2"

const SECOND = 1_000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

export function ago(time: number | undefined, now: number) {
  if (time === undefined) return "not run yet"
  const delta = Math.max(0, now - time)
  if (delta < MINUTE) return "just now"
  if (delta < HOUR) return `${Math.floor(delta / MINUTE)}m ago`
  if (delta < DAY) return `${Math.floor(delta / HOUR)}h ago`
  return `${Math.floor(delta / DAY)}d ago`
}

export function until(time: number | undefined, now: number) {
  if (time === undefined) return "not scheduled"
  const delta = time - now
  if (delta <= 0) return "due now"
  if (delta < 2 * MINUTE) return `in ${Math.ceil(delta / SECOND)}s`
  if (delta < HOUR) return `in ${Math.round(delta / MINUTE)}m`
  if (delta < DAY) return `in ${Math.round(delta / HOUR)}h`
  return `in ${Math.round(delta / DAY)}d`
}

export function clock(time: number) {
  const date = new Date(time)
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`
}

export function day(time: number) {
  return new Date(time).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
}

export function tokens(value: number) {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}k`
  return String(Math.round(value))
}

export function money(value: number) {
  if (value >= 100) return `$${Math.round(value).toLocaleString("en-US")}`
  if (value >= 1) return `$${value.toFixed(2)}`
  if (value === 0) return "$0"
  return `$${value.toFixed(3)}`
}

export function count(value: number) {
  return value.toLocaleString("en-US")
}

export function schedule(input: WorkDeployment["schedule"]) {
  if (input.type === "manual") return "on demand"
  if (input.type === "once") return "once"
  if (input.type === "daily") return `daily at ${input.at}`
  return `every ${duration(input.every)}`
}

export function duration(ms: number) {
  if (ms % DAY === 0) return `${ms / DAY}d`
  if (ms % HOUR === 0) return `${ms / HOUR}h`
  if (ms % MINUTE === 0) return `${ms / MINUTE}m`
  return `${Math.round(ms / SECOND)}s`
}

export function kind(input: WorkDeployment["schedule"]) {
  if (input.type === "interval") return "monitoring"
  if (input.type === "daily") return "routine"
  if (input.type === "once") return "task"
  return "on demand"
}

export const ACCESS: Record<WorkAccess, string> = {
  read: "read + network",
  write: "read + write + network",
  full: "full access",
}

export function truncate(text: string, width: number) {
  if (width <= 1) return ""
  const line = text.replace(/\s+/g, " ").trim()
  if (line.length <= width) return line
  return line.slice(0, width - 1).trimEnd() + "…"
}
