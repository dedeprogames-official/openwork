import { expect, mock, test } from "bun:test"
import path from "path"
import type { WorkState, WorkVersion } from "@opencode-ai/sdk/v2"
import { createTestRenderer, type TestRendererSetup } from "@opentui/core/testing"
import { Effect } from "effect"
import { AppNodeBuilder } from "@opencode-ai/core/effect/app-node-builder"
import { Global } from "@opencode-ai/core/global"
import { createTuiResolvedConfig, resetTuiState } from "../fixture/tui-runtime"
import { createEventSource, createFetch, directory, json } from "../fixture/tui-sdk"

const state: WorkState = {
  now: Date.now(),
  paused: false,
  defaults: { access: "read", runOnDeploy: true },
  spaces: [],
  deployments: [],
  latest: [],
  runs: [],
  upcoming: [],
  messages: [],
  todos: [],
  agenda: [],
  memories: [],
  permissions: [],
  usage: {
    today: { tokens: 0, cost: 0 },
    hour: { tokens: 0, cost: 0 },
    providers: [],
    runsToday: 0,
    runsRemaining: 0,
  },
}

test("OpenWork reopens on the last page with the unsent text still there", async () => {
  await resetTuiState()

  const first = await boot()
  // Leave Your Day for the Agents page, with a draft typed into Your Day's prompt first.
  await first.click("Ask anything")
  await first.setup.mockInput.typeText("Call the bank about the card")
  await until(first.setup, (frame) => frame.includes("Call the bank about the card"))
  await first.click("◉ Agents")
  await until(first.setup, (frame) => frame.includes("Agent Calendar"))
  await first.stop()

  const drafts = await Bun.file(path.join(Global.Path.state, "prompt-drafts.json")).json()
  expect(drafts["work:day"].prompt.input).toBe("Call the bank about the card")

  const second = await boot()
  // The app opens where it was left, and Your Day still has the draft.
  await until(second.setup, (frame) => frame.includes("Agent Calendar"))
  await second.click("◎ Your Day")
  await until(second.setup, (frame) => frame.includes("Call the bank about the card"))
  await second.stop()
}, 60_000)

test("Settings offers a newer release and closes OpenWork to install it", async () => {
  await resetTuiState()
  const app = await boot({ current: "0.1.0", latest: "0.2.0", available: true })
  await app.click("⚙")
  await until(app.setup, (frame) => frame.includes("OpenWork v0.2.0 is available") && frame.includes("You have v0.1.0"))
  // It is the first row, so Enter asks before closing.
  app.setup.mockInput.pressEnter()
  await until(app.setup, (frame) => frame.includes("Update to v0.2.0") && frame.includes("openwork upgrade"))
  app.setup.mockInput.pressEnter()
  await app.closed
}, 60_000)

async function boot(version: WorkVersion = { current: "local", available: false }) {
  const setup = await createTestRenderer({ width: 160, height: 45, useThread: false })
  const core = await import("@opentui/core")
  mock.module("@opentui/core", () => ({ ...core, createCliRenderer: async () => setup.renderer }))
  const events = createEventSource()
  const calls = createFetch((url) => {
    if (url.pathname === "/config/providers")
      return json({
        providers: [{ id: "local", name: "Local", source: "config", env: [], options: {}, models: {} }],
        default: {},
      })
    if (url.pathname === "/work/state") return json(state)
    if (url.pathname === "/work/version") return json(version)
    if (url.pathname.startsWith("/work/")) return json(true)
  }, events)
  let started!: () => void
  const ready = new Promise<void>((resolve) => {
    started = resolve
  })
  const { run } = await import("../../src/app")
  const task = Effect.runPromise(
    run({
      url: "http://test",
      directory,
      config: createTuiResolvedConfig({ plugin_enabled: {} }),
      fetch: calls.fetch,
      events: events.source,
      args: {},
      pluginHost: {
        async start() {
          started()
        },
        async dispose() {},
      },
    }).pipe(Effect.provide(AppNodeBuilder.build(Global.node))),
  ).finally(() => mock.restore())
  await ready
  await until(setup, (frame) => frame.includes("Your Day"))
  return {
    setup,
    closed: task,
    async click(text: string, nth = 0) {
      const lines = setup.captureCharFrame().split("\n")
      const hits = lines.flatMap((line, y) => (line.includes(text) ? [{ x: line.indexOf(text), y }] : []))
      const hit = hits[nth]
      if (!hit) throw new Error(`"${text}" is not on screen:\n${lines.join("\n")}`)
      await setup.mockMouse.click(hit.x + Math.floor(text.length / 2), hit.y)
      await setup.flush()
    },
    async stop() {
      process.emit("SIGHUP")
      await task
    },
  }
}

/** Renders until the frame matches; key presses and clicks take a few frames to land. */
async function until(setup: TestRendererSetup, predicate: (frame: string) => boolean) {
  const deadline = Date.now() + 10_000
  for (;;) {
    await setup.flush()
    const frame = setup.captureCharFrame()
    if (predicate(frame)) return
    if (Date.now() > deadline) throw new Error(`timed out; last frame:\n${frame}`)
    await Bun.sleep(25)
  }
}
