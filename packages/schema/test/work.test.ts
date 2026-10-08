import { describe, expect, test } from "bun:test"
import { Schema } from "effect"
import { Work } from "../src/work"
import { EventManifest } from "../src/event-manifest"

describe("work contracts", () => {
  test("creates prefixed identifiers", () => {
    expect(Work.DeploymentID.create().startsWith("wdp_")).toBe(true)
    expect(Work.SpaceID.create().startsWith("wsp_")).toBe(true)
    expect(Work.RunID.create().startsWith("wrn_")).toBe(true)
    expect(Work.MessageID.create().startsWith("wms_")).toBe(true)
  })

  test("decodes schedules as a tagged union", () => {
    const decode = Schema.decodeUnknownSync(Work.Schedule)
    expect(decode({ type: "interval", every: 600_000 })).toEqual({ type: "interval", every: 600_000 })
    expect(decode({ type: "daily", at: "09:00" })).toEqual({ type: "daily", at: "09:00" })
    expect(() => decode({ type: "weekly" })).toThrow()
  })

  test("omits absent optional fields when encoding", () => {
    const encoded = Schema.encodeSync(Work.Todo)({
      id: Work.TodoID.make("wtd_1"),
      content: "Call the bank",
      position: 0,
      time: { created: 1 },
    })
    expect(Object.keys(encoded)).toEqual(["id", "content", "position", "time"])
  })

  test("publishes the work.updated event", () => {
    expect(EventManifest.Latest.get("work.updated")).toBe(Work.Event.Updated)
  })
})
