import { expect, mock, test } from "bun:test"
import type { WorkDeployment, WorkRun, WorkState } from "@opencode-ai/sdk/v2"
import { createTestRenderer, type TestRendererSetup } from "@opentui/core/testing"
import { Effect } from "effect"
import { AppNodeBuilder } from "@opencode-ai/core/effect/app-node-builder"
import { Global } from "@opencode-ai/core/global"
import { createTuiResolvedConfig } from "../fixture/tui-runtime"
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
  runCount: 2,
  time,
}

const run = (number: number, started: number, summary: string): WorkRun => ({
  id: `wrn_${number}`,
  deploymentID: agent.id,
  number,
  status: "done",
  trigger: "schedule",
  summary,
  tokens: { input: 1200, output: 300, reasoning: 0, cache: { read: 0, write: 0 } },
  cost: 0,
  time: { started, finished: started + 5_000 },
})

// Runs are only today when the test starts at least 20 minutes after midnight.
const runs = [run(1, now - 12 * minute, "Foggy all afternoon"), run(2, now - 2 * minute, "Sunny, worth the drive")]

const state: WorkState = {
  now,
  paused: false,
  spaces: [{ id: "wsp_beach", name: "Beach date", goal: "make tonight easy", color: "blue", time }],
  deployments: [agent],
  latest: [runs[1]],
  runs,
  upcoming: [{ deploymentID: agent.id, at: now + 8 * minute }],
  messages: [
    {
      id: "wms_sunny",
      deploymentID: agent.id,
      title: "Tonight's conditions",
      body: "Sunny with a clear view across the harbor",
      priority: "normal",
      time: { created: now - 2 * minute },
    },
  ],
  todos: [{ id: "wtd_post", content: "Write the launch post", position: 0, time: { created: now - minute } }],
  agenda: [],
  memories: [
    { id: "wmm_brief", content: "Prefers short bullet briefs", source: "you", time: { created: now - minute } },
  ],
  usage: {
    today: { tokens: 3000, cost: 0 },
    hour: { tokens: 3000, cost: 0 },
    providers: [],
    runsToday: 2,
    runsRemaining: 1,
  },
}

test("OpenWork pages respond to the mouse", async () => {
  const setup = await createTestRenderer({ width: 160, height: 45, useThread: false })
  const core = await import("@opentui/core")
  mock.module("@opentui/core", () => ({ ...core, createCliRenderer: async () => setup.renderer }))
  const events = createEventSource()
  const calls = createFetch((url) => {
    // One connected provider, so the first-run "connect a provider" dialog stays closed.
    if (url.pathname === "/config/providers")
      return json({
        providers: [{ id: "local", name: "Local", source: "config", env: [], options: {}, models: {} }],
        default: {},
      })
    if (url.pathname === "/work/state") return json(state)
    if (url.pathname === `/work/deployment/${agent.id}/runs`) return json(runs.toReversed())
    if (url.pathname.startsWith("/work/")) return json(true)
  }, events)
  // Mutations the pages send, as "METHOD /path body".
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
    await setup.waitForFrame((frame) => frame.includes("Your Day") && frame.includes("Write the launch post"))

    // Your Day: the todo checkbox toggles at once (and selects the todo).
    await mouse.click("○")
    await until(() => sent.includes('PATCH /work/todo/wtd_post {"done":true}'))
    const toggles = () => sent.filter((item) => item.startsWith("PATCH /work/todo/wtd_post")).length

    // "+ Add a todo..." opens a form; submitting it saves the todo and closes the form.
    await mouse.click("+ Add a todo...")
    await setup.waitForFrame((frame) => frame.includes("New todo"))
    await setup.mockInput.typeText("Buy flowers")
    setup.mockInput.pressEnter()
    await until(() => sent.includes('POST /work/todo {"content":"Buy flowers"}'))
    await setup.waitForFrame((frame) => !frame.includes("New todo"))

    // The inbox checkbox only marks the message done; the row's own click must not run too.
    await mouse.click("☐")
    await until(() => sent.includes('PATCH /work/message/wms_sunny {"done":true}'))
    await settle()
    expect(sent.some((item) => item.includes('"read":true'))).toBe(false)
    // Clicking the message selects it and marks it read.
    await mouse.click("Sunny with a clear view")
    await until(() => sent.includes('PATCH /work/message/wms_sunny {"read":true}'))

    // A todo row selects on the first click and toggles on a click once selected.
    await mouse.click("Write the launch post")
    await settle()
    expect(toggles()).toBe(1)
    await mouse.click("Write the launch post")
    await until(() => toggles() === 2)

    // Same for the message: select first, then a second click opens its agent.
    await mouse.click("Sunny with a clear view")
    await settle()
    expect(setup.captureCharFrame()).not.toContain("AGENT ACTIVITY")
    await mouse.click("Sunny with a clear view")
    await setup.waitForFrame((frame) => frame.includes("AGENT ACTIVITY"))

    // Agent page: the run strip picks a run, the arrow goes back to the calendar.
    await setup.waitForFrame((frame) => frame.includes("last run #2"))
    await mouse.click("#1 ✓")
    await setup.waitForFrame((frame) => frame.includes("run #1 ·"))
    await mouse.click("Run now")
    await until(() => sent.some((item) => item.startsWith(`POST /work/deployment/${agent.id}/run`)))
    await mouse.click("← ")
    await setup.waitForFrame((frame) => frame.includes("Agent Calendar"))

    // Agents: zoom and live are clickable, the wheel scrolls runs and stops following live.
    await mouse.click("whole day")
    await setup.waitForFrame((frame) => frame.includes("00:00") && frame.includes("23:00"))
    await mouse.click(" detail")
    await setup.waitForFrame((frame) => frame.includes("Agent: Beach watcher"))
    // In the whole-day view an hour row zooms into that hour, which stops following live; Live turns it back on.
    await mouse.click("whole day")
    await setup.waitForFrame((frame) => frame.includes("23:00"))
    await mouse.click(" runs")
    await setup.waitForFrame((frame) => frame.includes("Agent: Beach watcher") && frame.includes("○ Live"))
    await mouse.click("○ Live")
    await setup.waitForFrame((frame) => frame.includes("● Live"))
    await mouse.scroll("Agent: Beach watcher", "down")
    await setup.waitForFrame((frame) => frame.includes("○ Live"))
    // The wheel moved the selection to the scheduled run, so the first row selects on the first click
    // and opens the agent on the second.
    await mouse.click("Agent: Beach watcher")
    await settle()
    expect(setup.captureCharFrame()).toContain("Agent Calendar")
    await mouse.click("Agent: Beach watcher")
    await setup.waitForFrame((frame) => frame.includes("AGENT ACTIVITY"))

    // Navigation and footer hints are clickable.
    await mouse.click("M-1")
    await setup.waitForFrame((frame) => frame.includes("Your Agenda") && frame.includes("Hide agents"))
    await mouse.click("a agents")
    await setup.waitForFrame((frame) => frame.includes("Show agents"))
    await mouse.click("Show agents")
    await setup.waitForFrame((frame) => frame.includes("Hide agents"))

    // Memory: the selected row offers a forget button.
    await mouse.click("M-6")
    await setup.waitForFrame((frame) => frame.includes("Prefers short bullet briefs"))
    await mouse.click("Prefers short bullet briefs")
    await mouse.click("✕ forget")
    await until(() => sent.some((item) => item.startsWith("DELETE /work/memory/wmm_brief")))

    // Models: a provider row opens its models. Clicking the row's text leaves an empty text selection behind,
    // which must not stop the dialog from closing on the first backdrop click.
    await mouse.click("M-7")
    await setup.waitForFrame((frame) => frame.includes("Default model"))
    await mouse.click("Local", 1)
    await setup.waitForFrame((frame) => frame.includes("Search"))
    await setup.mockMouse.click(2, 44)
    await setup.waitForFrame((frame) => !frame.includes("Search"))

    // Spaces: deploy from a space, then dismiss the dialog by clicking its backdrop.
    await mouse.click("M-3")
    await setup.waitForFrame((frame) => frame.includes("make tonight easy"))
    await mouse.click("+ Deploy an agent...")
    await setup.waitForFrame((frame) => frame.includes("Say what it should do"))
    await setup.mockMouse.click(2, 44)
    await setup.waitForFrame((frame) => !frame.includes("Say what it should do"))

    // An agent opened from its space can move: the Move button offers every space, "No space" takes it out.
    await mouse.click("Beach watcher")
    await setup.waitForFrame((frame) => frame.includes("AGENT ACTIVITY"))
    await mouse.click("◆ Move")
    await setup.waitForFrame((frame) => frame.includes('Move "Beach watcher" to') && frame.includes("No space"))
    await mouse.click("keep it on its own")
    await until(() => sent.includes(`PATCH /work/deployment/${agent.id} {"spaceID":null}`))
    await setup.waitForFrame((frame) => !frame.includes('Move "Beach watcher" to'))

    process.emit("SIGHUP")
    await task
  } finally {
    if (!setup.renderer.isDestroyed) setup.renderer.destroy()
    mock.restore()
  }
}, 30_000)

/** Clicks and scrolls on the first on-screen occurrence of some text. */
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
    async scroll(text: string, direction: "up" | "down") {
      const at = locate(text)
      await setup.mockMouse.scroll(at.x, at.y, direction)
      await setup.flush()
    },
  }
}

/** Gives a click's async side effects (requests, navigation) time to land before asserting they did not happen. */
function settle() {
  return Bun.sleep(150)
}

async function until(predicate: () => boolean) {
  const deadline = Date.now() + 5_000
  while (!predicate()) {
    if (Date.now() > deadline) throw new Error("timed out")
    await Bun.sleep(20)
  }
}
