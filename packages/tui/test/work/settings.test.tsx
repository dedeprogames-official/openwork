import { expect, mock, test } from "bun:test"
import type { WorkState } from "@opencode-ai/sdk/v2"
import { createTestRenderer, type TestRendererSetup } from "@opentui/core/testing"
import { Effect } from "effect"
import { AppNodeBuilder } from "@opencode-ai/core/effect/app-node-builder"
import { Global } from "@opencode-ai/core/global"
import { createTuiResolvedConfig, resetTuiState } from "../fixture/tui-runtime"
import { createEventSource, createFetch, directory, json } from "../fixture/tui-sdk"

const now = Date.now()

const state: WorkState = {
  now,
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

test("settings open from the gear and change preferences", async () => {
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
    if (url.pathname.startsWith("/work/")) return json(true)
  }, events)
  const sent: string[] = []
  const fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const request = new Request(input, init)
    if (new URL(request.url).pathname.startsWith("/work/") && request.method !== "GET")
      sent.push(`${request.method} ${new URL(request.url).pathname} ${await request.clone().text()}`)
    return calls.fetch(request)
  }) as typeof globalThis.fetch
  let started!: () => void
  const ready = new Promise<void>((resolve) => {
    started = resolve
  })

  try {
    await resetTuiState()
    const { run: start } = await import("../../src/app")
    const task = Effect.runPromise(
      start({
        url: "http://test",
        directory,
        config: createTuiResolvedConfig({ plugin_enabled: {} }),
        fetch,
        events: events.source,
        args: {},
        pluginHost: {
          async start() {
            started()
          },
          async dispose() {},
        },
      }).pipe(Effect.provide(AppNodeBuilder.build(Global.node))),
    )
    await ready
    const mouse = pointer(setup)
    await setup.waitForFrame((frame) => frame.includes("Your Day"))

    // The gear in the navigation opens the settings, on General.
    await mouse.click("⚙")
    await setup.waitForFrame((frame) => frame.includes("Search settings") && frame.includes("How OpenWork looks"))
    expect(setup.captureCharFrame()).toContain("Animations")

    // Tab walks the sections; Enter flips the selected toggle. Preferences persist, so compare with the current value.
    setup.mockInput.pressTab()
    await frameUntil(setup, (frame) => frame.includes("What a conversation shows"))
    const thinking = isOn(setup.captureCharFrame(), "Show thinking")
    setup.mockInput.pressEnter()
    await frameUntil(setup, (frame) => isOn(frame, "Show thinking") !== thinking)
    // ↓ moves to the next row, so Enter flips that one instead.
    const steps = isOn(setup.captureCharFrame(), "Show finished steps")
    setup.mockInput.pressArrow("down")
    // An arrow is an escape sequence; let it finish parsing before Enter arrives.
    await Bun.sleep(100)
    setup.mockInput.pressEnter()
    await frameUntil(setup, (frame) => isOn(frame, "Show finished steps") !== steps)
    expect(isOn(setup.captureCharFrame(), "Show thinking")).toBe(!thinking)

    // A click on a section and then on a row changes it too. The first "◉ Agents" is the navigation's.
    await mouse.click("◉ Agents", 1)
    await frameUntil(setup, (frame) => frame.includes("Defaults for the agents you deploy"))
    await mouse.click("Run agents on schedule")
    await until(() => sent.includes('POST /work/pause {"paused":true}'))

    // Typing searches every section.
    await setup.mockInput.typeText("dark")
    await frameUntil(setup, (frame) => frame.includes('Results for "dark"') && frame.includes("Appearance"))

    process.emit("SIGHUP")
    await task
  } finally {
    if (!setup.renderer.isDestroyed) setup.renderer.destroy()
    mock.restore()
  }
}, 30_000)

/** Renders until the frame matches; key presses take a few frames to land. */
async function frameUntil(setup: TestRendererSetup, predicate: (frame: string) => boolean) {
  const deadline = Date.now() + 5_000
  for (;;) {
    await setup.flush()
    const frame = setup.captureCharFrame()
    if (predicate(frame)) return
    if (Date.now() > deadline) throw new Error(`timed out; last frame:\n${frame}`)
    await Bun.sleep(25)
  }
}

function isOn(frame: string, label: string) {
  return frame.split("\n").some((line) => line.includes(label) && line.includes("● On"))
}

function pointer(setup: TestRendererSetup) {
  const locate = (text: string, nth = 0) => {
    const lines = setup.captureCharFrame().split("\n")
    const hits = lines.flatMap((line, y) => (line.includes(text) ? [{ x: line.indexOf(text), y }] : []))
    const hit = hits[nth]
    if (!hit) throw new Error(`"${text}" is not on screen:\n${lines.join("\n")}`)
    return { x: hit.x + Math.floor(text.trim().length / 2), y: hit.y }
  }
  return {
    async click(text: string, nth = 0) {
      const at = locate(text, nth)
      await setup.mockMouse.click(at.x, at.y)
      await setup.flush()
    },
  }
}

async function until(predicate: () => boolean) {
  const deadline = Date.now() + 5_000
  while (!predicate()) {
    if (Date.now() > deadline) throw new Error("timed out")
    await Bun.sleep(20)
  }
}
