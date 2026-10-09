import { describe, expect, test } from "bun:test"
import { WorkSchedule } from "@opencode-ai/core/work/schedule"

const now = new Date(2026, 9, 8, 13, 0, 0).getTime()
const at = (hours: number, minutes = 0, day = 8) => new Date(2026, 9, day, hours, minutes, 0).getTime()

describe("WorkSchedule", () => {
  test("parses natural deploy requests", () => {
    expect(WorkSchedule.parse("check the beach cam every 10m and tell me if it's sunny", now)).toEqual({
      schedule: { type: "interval", every: 600_000 },
      task: "check the beach cam and tell me if it's sunny",
      title: "Check the beach cam and tell me if it's sunny",
    })
    expect(WorkSchedule.parse("summarize my inbox every morning at 7:30am", now).schedule).toEqual({
      type: "daily",
      at: "07:30",
    })
    expect(WorkSchedule.parse("watch AAPL hourly", now).schedule).toEqual({ type: "interval", every: 3_600_000 })
    expect(WorkSchedule.parse("verifique o clima a cada 15 minutos", now).schedule).toEqual({
      type: "interval",
      every: 900_000,
    })
    expect(WorkSchedule.parse("book a table at 7pm", now).schedule).toEqual({ type: "once", at: at(19) })
    expect(WorkSchedule.parse("clean up my downloads folder", now).schedule).toEqual({ type: "once", at: now })
  })

  test("clamps intervals to one minute", () => {
    expect(WorkSchedule.parse("ping every 5s", now).schedule).toEqual({ type: "interval", every: 60_000 })
  })

  test("computes next runs", () => {
    expect(WorkSchedule.first({ type: "interval", every: 600_000 }, now)).toBe(now)
    expect(WorkSchedule.next({ type: "interval", every: 600_000 }, now)).toBe(now + 600_000)
    expect(WorkSchedule.next({ type: "daily", at: "09:00" }, now)).toBe(at(9, 0, 9))
    expect(WorkSchedule.next({ type: "daily", at: "18:30" }, now)).toBe(at(18, 30))
    expect(WorkSchedule.next({ type: "once", at: now }, now)).toBeUndefined()
    expect(WorkSchedule.first({ type: "manual" }, now)).toBeUndefined()
  })

  test("projects the rest of the day", () => {
    const end = WorkSchedule.endOfDay(now)
    expect(WorkSchedule.between({ type: "interval", every: 3_600_000 }, now, end)).toHaveLength(11)
    expect(WorkSchedule.between({ type: "daily", at: "18:00" }, at(18), end)).toEqual([at(18)])
    expect(WorkSchedule.between({ type: "manual" }, undefined, end)).toEqual([])
  })

  test("labels schedules", () => {
    expect(WorkSchedule.label({ type: "interval", every: 600_000 })).toBe("every 10m")
    expect(WorkSchedule.label({ type: "interval", every: 7_200_000 })).toBe("every 2h")
    expect(WorkSchedule.label({ type: "daily", at: "09:00" })).toBe("daily at 09:00")
    expect(WorkSchedule.label({ type: "manual" })).toBe("on demand")
  })
})
