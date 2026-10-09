import { describe, expect, test } from "bun:test"
import { ago, duration, kind, money, schedule, tokens, truncate, until } from "../../src/work/format"

const now = Date.UTC(2026, 9, 9, 12, 0, 0)
const minute = 60_000

describe("work format", () => {
  test("relative times", () => {
    expect(ago(undefined, now)).toBe("not run yet")
    expect(ago(now - 10_000, now)).toBe("just now")
    expect(ago(now - 14 * minute, now)).toBe("14m ago")
    expect(ago(now - 3 * 60 * minute, now)).toBe("3h ago")
    expect(until(undefined, now)).toBe("not scheduled")
    expect(until(now - 1, now)).toBe("due now")
    expect(until(now + 84_000, now)).toBe("in 84s")
    expect(until(now + 9 * minute, now)).toBe("in 9m")
  })

  test("token and money amounts", () => {
    expect(tokens(812)).toBe("812")
    expect(tokens(114_800)).toBe("114.8k")
    expect(tokens(1_600_000)).toBe("1.6M")
    expect(money(0)).toBe("$0")
    expect(money(0.0123)).toBe("$0.012")
    expect(money(51.374)).toBe("$51.37")
    expect(money(1234.5)).toBe("$1,235")
  })

  test("schedules", () => {
    expect(schedule({ type: "manual" })).toBe("on demand")
    expect(schedule({ type: "daily", at: "07:30" })).toBe("daily at 07:30")
    expect(schedule({ type: "interval", every: 10 * minute })).toBe("every 10m")
    expect(duration(2 * 60 * minute)).toBe("2h")
    expect(duration(90_000)).toBe("90s")
    expect(kind({ type: "interval", every: minute })).toBe("monitoring")
    expect(kind({ type: "daily", at: "09:00" })).toBe("routine")
    expect(kind({ type: "once", at: now })).toBe("task")
  })

  test("truncate collapses whitespace and adds an ellipsis", () => {
    expect(truncate("  short\n text ", 20)).toBe("short text")
    expect(truncate("Watching the trust's positions", 12)).toBe("Watching th…")
    expect(truncate("anything", 1)).toBe("")
  })
})
