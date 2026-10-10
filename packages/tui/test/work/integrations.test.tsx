import { expect, mock, test } from "bun:test"
import type { WorkState } from "@opencode-ai/sdk/v2"
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

test("an integration is added from Settings, connects at once, and is written to opencode.json on exit", async () => {
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
  let added = false
  const fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const request = new Request(input, init)
    const path = new URL(request.url).pathname
    const body = request.method === "GET" ? "" : await request.clone().text()
    if (request.method !== "GET" && (path.startsWith("/work/") || path.startsWith("/mcp"))) {
      sent.push(`${request.method} ${path} ${body}`)
    }
    if (path === "/work/integration" && request.method === "GET") return Response.json([])
    if (path === "/work/integration" && request.method === "POST") {
      added = true
      return Response.json({ name: "docs", type: "remote", target: "https://mcp.example.com/mcp", file: false })
    }
    if (path === "/work/integration/sync") return Response.json({ written: ["docs"] })
    if (path === "/mcp" && request.method === "POST") return Response.json({ docs: { status: "connected" } })
    if (path === "/mcp") return Response.json(added ? { docs: { status: "connected" } } : {})
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
    await frameUntil(setup, (frame) => frame.includes("Your Day"))

    // Settings → Integrations has a button at the top right and a row to add one.
    await mouse.click("⚙")
    await frameUntil(setup, (frame) => frame.includes("Search settings"))
    await mouse.click("⊞ Integrations", 1)
    await frameUntil(setup, (frame) => frame.includes("MCP servers that give chats and agents more tools"))
    expect(setup.captureCharFrame()).toContain("Add an integration…")
    // The last "+ Add" on screen is the button; the others belong to the page behind the dialog.
    await mouse.click("+ Add", -1)
    await frameUntil(setup, (frame) => frame.includes("A short name for it"))

    // A bad name is refused on the same screen and asked again.
    await setup.mockInput.typeText("my docs")
    setup.mockInput.pressEnter()
    await frameUntil(setup, (frame) => frame.includes("Use up to 40 letters, numbers, - or _"))
    // The prompt takes focus a moment after it is drawn.
    await Bun.sleep(100)
    for (let index = 0; index < "my docs".length; index++) setup.mockInput.pressBackspace()
    await setup.mockInput.typeText("docs")
    setup.mockInput.pressEnter()

    await frameUntil(setup, (frame) => frame.includes("Where does docs run?") && frame.includes("Remote server"))
    setup.mockInput.pressEnter()

    // The URL is checked too.
    await frameUntil(setup, (frame) => frame.includes("The address of the MCP server."))
    await setup.mockInput.typeText("mcp example")
    setup.mockInput.pressEnter()
    await frameUntil(setup, (frame) => frame.includes("address that starts with"))
    await Bun.sleep(100)
    for (let index = 0; index < "mcp example".length; index++) setup.mockInput.pressBackspace()
    await setup.mockInput.typeText("https://mcp.example.com/mcp")
    setup.mockInput.pressEnter()

    // An optional header; the summary shows it masked.
    await frameUntil(setup, (frame) => frame.includes("Save and connect") && frame.includes("Add a header…"))
    setup.mockInput.pressArrow("down")
    await Bun.sleep(100)
    setup.mockInput.pressEnter()
    await frameUntil(setup, (frame) => frame.includes("Write it as Name: value") || frame.includes("Header"))
    await setup.mockInput.typeText("Authorization: Bearer secret123")
    setup.mockInput.pressEnter()
    await frameUntil(setup, (frame) => frame.includes("Remove Authorization") && frame.includes("Be••••"))
    expect(setup.captureCharFrame()).not.toContain("secret123")

    // Enter on the first row saves it and connects the folder that is open.
    setup.mockInput.pressEnter()
    await until(() => sent.some((item) => item.startsWith("POST /mcp ")))
    expect(sent).toContain(
      'POST /work/integration {"name":"docs","type":"remote","url":"https://mcp.example.com/mcp","headers":{"Authorization":"Bearer secret123"}}',
    )
    expect(sent).toContain(
      'POST /mcp {"name":"docs","config":{"type":"remote","url":"https://mcp.example.com/mcp","enabled":true,"headers":{"Authorization":"Bearer secret123"}}}',
    )

    // Back in Settings the new integration is listed, and says where it lives.
    await frameUntil(setup, (frame) => frame.includes("docs") && frame.includes("Connected"))

    // Closing OpenWork writes it to opencode.json.
    process.emit("SIGHUP")
    await task
    expect(sent).toContain("POST /work/integration/sync ")
  } finally {
    if (!setup.renderer.isDestroyed) setup.renderer.destroy()
    mock.restore()
  }
}, 60_000)

async function frameUntil(setup: TestRendererSetup, predicate: (frame: string) => boolean) {
  const deadline = Date.now() + 8_000
  for (;;) {
    await setup.flush()
    const frame = setup.captureCharFrame()
    if (predicate(frame)) return
    if (Date.now() > deadline) throw new Error(`timed out; last frame:\n${frame}`)
    await Bun.sleep(25)
  }
}

function pointer(setup: TestRendererSetup) {
  return {
    async click(text: string, nth = 0) {
      const lines = setup.captureCharFrame().split("\n")
      const hits = lines.flatMap((line, y) => (line.includes(text) ? [{ x: line.indexOf(text), y }] : []))
      const hit = hits.at(nth)
      if (!hit) throw new Error(`"${text}" is not on screen:\n${lines.join("\n")}`)
      await setup.mockMouse.click(hit.x + Math.floor(text.trim().length / 2), hit.y)
      await setup.flush()
    },
  }
}

async function until(predicate: () => boolean) {
  const deadline = Date.now() + 8_000
  while (!predicate()) {
    if (Date.now() > deadline) throw new Error("timed out")
    await Bun.sleep(20)
  }
}
