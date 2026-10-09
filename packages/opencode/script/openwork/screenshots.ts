#!/usr/bin/env bun
/**
 * Captures PNG screenshots of the real OpenWork TUI.
 *
 * Starts an offline model (fake-llm.ts), runs `opencode` inside tmux with an isolated data dir, loads the demo
 * workspace, lets the agents really run, walks through the pages with keystrokes and renders each capture with
 * ansi2png.py. Run from packages/opencode:
 *
 *   TZ=Europe/London bun script/openwork/screenshots.ts --out ../../docs/openwork/screenshots
 *
 * Pick a TZ where it is late afternoon: the demo's run history starts at 06:00 local time.
 */
import { $ } from "bun"
import fs from "fs/promises"
import os from "os"
import path from "path"

const arg = (name: string, fallback: string) => {
  const index = process.argv.indexOf(`--${name}`)
  return index === -1 ? fallback : (process.argv[index + 1] ?? fallback)
}
const out = path.resolve(arg("out", "../../docs/openwork/screenshots"))
const cols = Number(arg("cols", "160"))
const rows = Number(arg("rows", "45"))
const only = arg("only", "")
const here = import.meta.dir
const root = await fs.mkdtemp(path.join(os.tmpdir(), "openwork-shots-"))
const work = path.join(root, "work", "acme")
const llmPort = 4600 + Math.floor(Math.random() * 300)
const serverPort = llmPort + 400
const session = `openwork-shots-${process.pid}`
await fs.mkdir(work, { recursive: true })
await fs.mkdir(out, { recursive: true })

// Only pass through what the tools need: credentials in the caller's environment would show up as connected accounts.
const env: Record<string, string> = {
  ...Object.fromEntries(
    ["PATH", "HOME", "USER", "SHELL", "LANG", "LC_ALL", "TZ", "TMPDIR", "BUN_INSTALL"].flatMap((name) =>
      process.env[name] === undefined ? [] : [[name, process.env[name]]],
    ),
  ),
  XDG_DATA_HOME: path.join(root, "data"),
  XDG_CONFIG_HOME: path.join(root, "config"),
  XDG_STATE_HOME: path.join(root, "state"),
  XDG_CACHE_HOME: path.join(root, "cache"),
  OPENCODE_DISABLE_MODELS_FETCH: "1",
  OPENCODE_MODELS_PATH: path.join(here, "../../test/tool/fixtures/models-api.json"),
  OPENCODE_DISABLE_AUTOUPDATE: "1",
  OPENCODE_DISABLE_LSP_DOWNLOAD: "1",
  OPENCODE_DISABLE_DEFAULT_PLUGINS: "1",
  COLORTERM: "truecolor",
  TERM: "xterm-256color",
  FAKE_LLM_HOLD: "beach",
  OPENCODE_CONFIG_CONTENT: JSON.stringify({
    model: "local/lfm2.5-1.2b",
    mcp: {
      "meeting-notes": { type: "local", command: ["bun", path.join(here, "fake-mcp.ts")] },
      "team-drive": { type: "remote", url: "http://127.0.0.1:9/mcp", enabled: false },
    },
    provider: {
      local: {
        name: "Local",
        npm: "@ai-sdk/openai-compatible",
        options: { baseURL: `http://127.0.0.1:${llmPort}/v1`, apiKey: "local" },
        models: {
          "lfm2.5-1.2b": { name: "LFM 2.5 1.2B (local)", tool_call: true, limit: { context: 128000, output: 8000 } },
        },
      },
    },
  }),
}

const llm = Bun.spawn(["bun", path.join(here, "fake-llm.ts"), "--port", String(llmPort)], { env, stdout: "ignore" })
const api = (route: string, body?: unknown) =>
  fetch(`http://127.0.0.1:${serverPort}${route}`, {
    method: body === undefined ? "GET" : "POST",
    headers: { "content-type": "application/json", "x-opencode-directory": work },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  }).then((response) => response.json())

const tmux = (...args: string[]) => $`tmux -f /dev/null -L ${session} ${args}`.env(env).quiet().nothrow()
const keys = async (...input: string[]) => {
  await tmux("send-keys", "-t", session, ...input)
  await Bun.sleep(400)
}
const type = async (text: string) => {
  await tmux("send-keys", "-t", session, "-l", text)
  await Bun.sleep(300)
}
const screen = async () => (await tmux("capture-pane", "-p", "-t", session)).stdout.toString()
const until = async (marker: string | RegExp, timeout = 20_000) => {
  const start = Date.now()
  while (Date.now() - start < timeout) {
    const text = await screen()
    if (typeof marker === "string" ? text.includes(marker) : marker.test(text)) return true
    await Bun.sleep(250)
  }
  console.warn(`timed out waiting for ${marker}`)
  return false
}
const shot = async (name: string, title: string) => {
  if (only && !only.split(",").includes(name)) return
  await Bun.sleep(900)
  const capture = (await tmux("capture-pane", "-p", "-e", "-N", "-t", session)).stdout.toString()
  const file = path.join(root, `${name}.ans`)
  await Bun.write(file, capture)
  await $`python3 -I ${path.join(here, "ansi2png.py")} ${file} ${path.join(out, `${name}.png`)} --title ${title} --cols ${cols} --rows ${rows}`.quiet()
  console.log(`saved ${name}.png`)
}

try {
  await tmux(
    "new-session",
    "-d",
    "-s",
    session,
    "-x",
    String(cols),
    "-y",
    String(rows),
    `cd ${path.join(here, "../..")} && exec bun run src/index.ts ${work} --port ${serverPort} 2>${path.join(root, "tui.log")}`,
  )
  await tmux("set", "-g", "default-terminal", "tmux-256color")
  await tmux("set", "-as", "terminal-features", ",*:RGB")
  for (const name of Object.keys(env)) await tmux("set-environment", "-g", name, env[name])
  // Restart the pane now that the environment is in place.
  await tmux(
    "respawn-pane",
    "-k",
    "-t",
    session,
    `cd ${path.join(here, "../..")} && exec bun run src/index.ts ${work} --port ${serverPort} 2>${path.join(root, "tui.log")}`,
  )
  const ready = Date.now()
  while (Date.now() - ready < 60_000) {
    // Requests that land while the server is still starting can hang, so give each probe its own deadline.
    const healthy = await fetch(`http://127.0.0.1:${serverPort}/global/health`, {
      signal: AbortSignal.timeout(2_000),
    }).then(
      (response) => response.ok,
      () => false,
    )
    if (healthy) break
    await Bun.sleep(500)
  }
  await until("Your Day", 60_000)

  await api("/work/demo", { directory: work })
  await api("/work/pause", { paused: false })
  const state = (await api("/work/state")) as { deployments: { id: string; title: string }[] }
  const beach = state.deployments.find((item) => item.title.includes("beach"))
  // Real runs against the offline model: the beach run is held open so it shows as running.
  for (const item of state.deployments.slice(0, 4)) await api(`/work/deployment/${item.id}/run`, {})
  if (beach) await api(`/work/deployment/${beach.id}/run`, {})
  await Bun.sleep(6000)
  const after = (await api("/work/state")) as { latest: { status: string; error?: string; deploymentID: string }[] }
  for (const run of after.latest.filter((item) => item.status === "error"))
    console.warn(`run of ${run.deploymentID} failed: ${run.error}`)

  await keys("M-1")
  await until("Agent Inbox")
  await shot("01-your-day", "OpenWork — Your Day")

  await keys("a")
  await shot("02-your-day-focus", "OpenWork — Your Day (agents hidden)")
  await keys("a")

  await keys("M-4")
  await until("Agent Calendar")
  await shot("03-agents", "OpenWork — Agents")
  await keys("z")
  await shot("04-agents-whole-day", "OpenWork — Agents · whole day")
  await keys("z")

  // A finished run with its tool calls: the first agent on Your Day ran for real above.
  await keys("M-1")
  await until("Agent Inbox")
  await keys("tab")
  await keys("Enter")
  await until("AGENT ACTIVITY")
  await until("inbox", 10_000)
  await shot("05-agent-detail", "OpenWork — Agent")

  // The beach run is held open by the offline model, so it is the live run on the calendar.
  if (beach) {
    await keys("M-4")
    await until("Agent Calendar")
    await keys("Enter")
    await until("AGENT ACTIVITY")
    await shot("06-agent-running", "OpenWork — Agent (running)")
  }

  await keys("M-3")
  await until("Spaces")
  await shot("07-spaces", "OpenWork — Spaces")

  await keys("M-1")
  await until("Agent Inbox")
  await keys("c")
  await type("What should I focus on before my 11:00?")
  await keys("Enter")
  await until("client review", 30_000)
  await shot("08-chat", "OpenWork — Chat")

  await keys("M-2")
  await until("Chats")
  await shot("09-chats", "OpenWork — Chats")

  await keys("M-5")
  await shot("10-skills", "OpenWork — Skills")
  await keys("M-6")
  await until("Memory")
  await shot("11-memory", "OpenWork — Memory")
  await keys("M-7")
  await until("Models")
  await shot("12-models", "OpenWork — Models")
  await keys("M-8")
  await until("Integrations")
  await shot("13-integrations", "OpenWork — Integrations")

  await keys("M-1")
  await until("Agent Inbox")
  await keys("C-x", "d")
  await until("Deploy an agent")
  await type("Check the Half Moon Bay cam every 10m and tell me if it's sunny")
  await shot("14-deploy", "OpenWork — Deploy an agent")
  await keys("Enter")
  await until("Where should it work?")
  await shot("15-deploy-folder", "OpenWork — Deploy an agent")
  await keys("Escape")
  await keys("Escape")

  await keys("C-p")
  await until("Commands")
  await type("work")
  await shot("16-command-palette", "OpenWork — Commands")
  await keys("Escape")

  await keys("C-x", "n")
  await until("Ask anything")
  await shot("17-new-chat", "OpenWork — New chat")

  await keys("M-1")
  await until("Agent Inbox")
  await keys("C-x", "w")
  await shot("18-nav-collapsed", "OpenWork — Your Day (navigation collapsed)")
  await keys("C-x", "w")
} finally {
  await tmux("kill-server")
  llm.kill()
  await fs.rm(root, { recursive: true, force: true }).catch(() => undefined)
}
