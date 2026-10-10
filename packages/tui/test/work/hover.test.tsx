import { expect, mock, test } from "bun:test"
import type { WorkDeployment, WorkRun, WorkState } from "@opencode-ai/sdk/v2"
import { createTestRenderer, type TestRendererSetup } from "@opentui/core/testing"
import { Effect } from "effect"
import { AppNodeBuilder } from "@opencode-ai/core/effect/app-node-builder"
import { Global } from "@opencode-ai/core/global"
import { createTuiResolvedConfig, resetTuiState } from "../fixture/tui-runtime"
import { createEventSource, createFetch, directory, json } from "../fixture/tui-sdk"

const now = Date.now()
const minute = 60_000
const time = { created: now - 60 * minute, updated: now - 60 * minute }

const agent: WorkDeployment = {
  id: "wdp_beach",
  spaceID: "wsp_beach",
  title: "Beach watcher",
  task: "Check the Half Moon Bay cam",
  directory,
  agent: "work",
  schedule: { type: "interval", every: 10 * minute },
  access: "read",
  status: "active",
  lastRunAt: now - 2 * minute,
  nextRunAt: now + 8 * minute,
  runCount: 1,
  time,
}

const run: WorkRun = {
  id: "wrn_1",
  deploymentID: agent.id,
  number: 1,
  status: "done",
  trigger: "schedule",
  summary: "Sunny, worth the drive",
  tokens: { input: 1200, output: 300, reasoning: 0, cache: { read: 0, write: 0 } },
  cost: 0,
  time: { started: now - 2 * minute, finished: now - 2 * minute + 5_000 },
}

const state: WorkState = {
  now,
  paused: false,
  defaults: { access: "read", runOnDeploy: true },
  permissions: [],
  spaces: [{ id: "wsp_beach", name: "Beach date", goal: "make tonight easy", color: "blue", time }],
  deployments: [agent],
  latest: [run],
  runs: [run],
  upcoming: [{ deploymentID: agent.id, at: now + 8 * minute }],
  messages: [],
  todos: [{ id: "wtd_post", content: "Write the launch post", position: 0, time: { created: now - minute } }],
  agenda: [],
  memories: [],
  usage: {
    today: { tokens: 3000, cost: 0 },
    hour: { tokens: 3000, cost: 0 },
    providers: [],
    runsToday: 1,
    runsRemaining: 1,
  },
}

test("controls answer the pointer with a fill, and the fill reaches past the glyph", async () => {
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
    if (url.pathname === `/work/deployment/${agent.id}/runs`) return json([run])
    if (url.pathname.startsWith("/work/")) return json(true)
  }, events)
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
    )
    await ready
    const pointer = hovering(setup)
    await setup.waitForFrame((frame) => frame.includes("Your Day") && frame.includes("Write the launch post"))

    // The navigation: every control lights up, and the gear's fill covers the cells on both sides of the glyph, so
    // a terminal that draws it two cells wide still has the whole symbol clickable.
    await pointer.lights("⚙")
    expect(await pointer.fillAround("⚙")).toBe(true)
    await pointer.lights("◼ pause")
    await pointer.lights("«")
    await pointer.lights("+ New chat")
    await pointer.lights("View all")
    await pointer.lights("Usage")
    await pointer.lights("◇ Spaces")

    // Your Day.
    await pointer.lights("+ Add a todo...")
    await pointer.lights("+ Add an event...")
    await pointer.lights("Write the launch post")
    await pointer.lights("Hide agents")
    await pointer.lights("Beach watcher")

    // Agents: the header buttons are filled boxes, not outlines.
    await pointer.go("◉ Agents")
    await setup.waitForFrame((frame) => frame.includes("Agent Calendar"))
    await pointer.lights("◼ Pause Agents")
    await pointer.lights("+ Create Agent")
    await pointer.lights("whole day")
    await pointer.lights("detail")
    await pointer.lights("Live")
    const frame = setup.captureCharFrame()
    expect(frame).not.toMatch(/[╭╮╰╯]/)

    // The agent's own page.
    await pointer.go("Beach watcher")
    await setup.waitForFrame((frame) => frame.includes("Check the Half Moon Bay cam"))
    await pointer.lights("←")

    // Settings: close control and section list.
    await pointer.go("⚙")
    await setup.waitForFrame((frame) => frame.includes("Settings"))
    await pointer.lights("esc")
    await pointer.lights("Integrations", 1)

    setup.mockInput.pressEscape()
    process.emit("SIGHUP")
    await task
  } finally {
    mock.restore()
  }
}, 60_000)

type Cell = { fg: string; bg: string }

/** Moves the mouse over text on screen and reports how the cells under it were drawn. */
function hovering(setup: TestRendererSetup) {
  const locate = (text: string, nth = 0) => {
    const lines = setup.captureCharFrame().split("\n")
    const hits = lines.flatMap((line, y) => (line.includes(text) ? [{ x: line.indexOf(text), y }] : []))
    const hit = hits[nth]
    if (!hit) throw new Error(`"${text}" is not on screen:\n${lines.join("\n")}`)
    return { x: hit.x, y: hit.y }
  }
  const cells = (y: number) => {
    const line = setup.captureSpans().lines[y]
    if (!line) throw new Error(`no row ${y}`)
    return line.spans.flatMap((span) =>
      Array.from({ length: span.width }, (): Cell => ({ fg: span.fg.toString(), bg: span.bg.toString() })),
    )
  }
  const away = async () => {
    // The corner shows nothing clickable.
    await setup.mockMouse.moveTo(setup.renderer.width - 1, setup.renderer.height - 1)
    await setup.flush()
  }
  return {
    /** Passing the mouse over the text must change the background of the cell under it. */
    async lights(text: string, nth = 0) {
      await away()
      const at = locate(text, nth)
      const before = cells(at.y)[at.x]
      await setup.mockMouse.moveTo(at.x, at.y)
      await setup.flush()
      const after = cells(at.y)[at.x]
      await away()
      if (!before || !after) throw new Error(`no cell for "${text}"`)
      expect(after.bg, `"${text}" has no hover fill`).not.toBe(before.bg)
    },
    /** With the mouse over the text, the cells right before and after it are filled too. */
    async fillAround(text: string) {
      await away()
      const at = locate(text)
      await setup.mockMouse.moveTo(at.x, at.y)
      await setup.flush()
      const row = cells(at.y)
      const [left, middle, right] = [row[at.x - 1], row[at.x], row[at.x + 1]]
      await away()
      return Boolean(left && middle && right && left.bg === middle.bg && right.bg === middle.bg)
    },
    async go(text: string) {
      const at = locate(text)
      await setup.mockMouse.click(at.x + Math.floor(text.length / 2), at.y)
      await setup.flush()
    },
  }
}
