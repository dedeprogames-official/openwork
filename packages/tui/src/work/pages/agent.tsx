import { TextAttributes } from "@opentui/core"
import type { Part, ToolPart, WorkRun } from "@opencode-ai/sdk/v2"
import { createEffect, createMemo, createSignal, For, on, Show } from "solid-js"
import { Prompt } from "../../component/prompt"
import { usePromptRef } from "../../context/prompt"
import { useRoute } from "../../context/route"
import { useSDK } from "../../context/sdk"
import { useSync } from "../../context/sync"
import { useTheme } from "../../context/theme"
import { DialogConfirm } from "../../ui/dialog-confirm"
import { useDialog } from "../../ui/dialog"
import { useWork } from "../context"
import { Hints, Pill } from "../components"
import { ACCESS, ago, clock, kind, money, schedule, tokens, truncate, until } from "../format"
import { usePageKeys } from "../keys"
import { spaceColor } from "../palette"
import { runTokens } from "../stats"

export function AgentPage(props: { deploymentID: string }) {
  const work = useWork()
  const sdk = useSDK()
  const sync = useSync()
  const route = useRoute()
  const dialog = useDialog()
  const promptRef = usePromptRef()
  const { theme } = useTheme()
  const [runs, setRuns] = createSignal<WorkRun[]>([])
  const [index, setIndex] = createSignal(0)

  const deployment = createMemo(() => work.state.deployments.find((item) => item.id === props.deploymentID))
  const space = createMemo(() => work.state.spaces.find((item) => item.id === deployment()?.spaceID))
  const latest = createMemo(() => work.state.latest.find((run) => run.deploymentID === props.deploymentID))
  const run = createMemo(() => runs()[index()])
  const running = () => latest()?.status === "running"

  // Reload the run list whenever the latest run of this agent changes.
  createEffect(
    on(
      () => `${latest()?.id}:${latest()?.status}`,
      () => {
        void sdk.client.work.deployment.runs({ deploymentID: props.deploymentID }).then((result) => {
          if (result.data) setRuns(result.data)
        })
      },
    ),
  )
  createEffect(
    on(
      () => run()?.sessionID,
      (sessionID) => {
        if (sessionID) void sync.session.sync(sessionID)
      },
    ),
  )
  // Every agent has its own chat session for questions about its work.
  createEffect(
    on(
      () => deployment()?.id,
      () => {
        if (deployment() && !deployment()?.chatSessionID) void work.chat(props.deploymentID)
      },
    ),
  )

  const parts = createMemo(() => {
    const sessionID = run()?.sessionID
    if (!sessionID) return []
    return (sync.data.message[sessionID] ?? [])
      .filter((message) => message.role === "assistant")
      .flatMap((message) => sync.data.part[message.id] ?? [])
      .filter((part) => part.type === "tool" || (part.type === "text" && part.text.trim().length > 0))
  })
  const steps = createMemo(() => parts().filter((part) => part.type === "tool").length)
  // Six runs fit next to the summary; slide the window so the selected run stays visible.
  const strip = createMemo(() => {
    const start = Math.max(0, Math.min(index() - 2, runs().length - 6))
    return runs().slice(start, start + 6)
  })
  const activity = createMemo(() => {
    const current = run()
    if (!current) return "  no runs yet"
    const provider = current.providerID ? ` · ${current.providerID}` : ""
    return `  ${index() === 0 ? "last run" : "run"} #${current.number} · ${clock(current.time.started)} · ${tokens(runTokens(current))} tokens · ${money(current.cost)}${provider}`
  })

  const remove = async () => {
    const ok = await DialogConfirm.show(dialog, "Remove agent", `Remove "${deployment()?.title}" and its run history?`)
    if (!ok) return
    await work.remove(props.deploymentID)
    route.navigate({ type: "work", page: "agents" })
  }

  usePageKeys(() => [
    { key: "r", desc: "Run now", run: () => void work.run(props.deploymentID) },
    {
      key: "p",
      desc: "Pause or resume",
      run: () =>
        void work.update(props.deploymentID, { status: deployment()?.status === "paused" ? "active" : "paused" }),
    },
    { key: "x", desc: "Remove agent", run: () => void remove() },
    {
      key: "o",
      desc: "Open run transcript",
      run: () => {
        const sessionID = run()?.sessionID
        if (sessionID) route.navigate({ type: "session", sessionID })
      },
    },
    { key: "left,h", desc: "Older run", run: () => setIndex((value) => Math.min(runs().length - 1, value + 1)) },
    { key: "right,l", desc: "Newer run", run: () => setIndex((value) => Math.max(0, value - 1)) },
    { key: "c", desc: "Ask about this agent", run: () => promptRef.current?.focus() },
    { key: "escape", desc: "Back", run: () => route.navigate({ type: "work", page: "agents" }) },
  ])

  return (
    <Show
      when={deployment()}
      fallback={
        <box padding={2}>
          <text fg={theme.textMuted}>This agent no longer exists.</text>
        </box>
      }
    >
      {(agent) => (
        <box flexGrow={1} minHeight={0} paddingLeft={3} paddingRight={3} paddingTop={1}>
          <box flexDirection="row" flexShrink={0}>
            <text flexGrow={1} wrapMode="none">
              <span style={{ fg: theme.textMuted }}>← </span>
              <span style={{ fg: spaceColor(theme, space()?.color) }}>◆ </span>
              <span style={{ fg: theme.textMuted }}>Agent: </span>
              <span style={{ fg: theme.text, bold: true }}>{agent().title} </span>
              <span style={{ fg: theme.background, bg: running() ? theme.warning : theme.textMuted }}>
                {` ${running() ? "running" : agent().status === "paused" ? "paused" : kind(agent().schedule)} `}
              </span>
            </text>
            <box flexDirection="row" gap={1} flexShrink={0}>
              <Pill
                label={agent().status === "paused" ? "▶ Resume" : "◼ Pause"}
                onClick={() =>
                  void work.update(agent().id, { status: agent().status === "paused" ? "active" : "paused" })
                }
              />
              <Pill label="▷ Run now" active onClick={() => void work.run(agent().id)} />
            </box>
          </box>
          <text fg={theme.textMuted} wrapMode="word" flexShrink={0}>
            {(space() ? `${space()?.name} — ` : "") + agent().task}
          </text>
          <text fg={theme.textMuted} wrapMode="none" flexShrink={0}>
            {[
              schedule(agent().schedule),
              `last run ${ago(agent().lastRunAt, work.now())}`,
              agent().status === "paused" ? "paused" : `next ${until(agent().nextRunAt, work.now())}`,
              ACCESS[agent().access],
              ...(agent().skill ? [`skill: ${agent().skill}`] : []),
            ].join(" · ")}
          </text>
          <text fg={theme.borderActive} wrapMode="none" flexShrink={0}>
            {truncate(agent().directory, 120)}
          </text>
          <box height={1} flexShrink={0} />
          <box flexDirection="row" flexShrink={0} gap={2}>
            <text flexGrow={1} wrapMode="none">
              <span style={{ fg: theme.text, bold: true }}>AGENT ACTIVITY</span>
              <span style={{ fg: theme.textMuted }}>{activity()}</span>
            </text>
            <text wrapMode="none" flexShrink={0}>
              <span style={{ fg: theme.textMuted }}>runs </span>
              <For each={strip()}>
                {(item) => (
                  <span
                    style={{
                      fg:
                        item.status === "error"
                          ? theme.error
                          : item.status === "running"
                            ? theme.warning
                            : item.id === run()?.id
                              ? theme.text
                              : theme.textMuted,
                      bg: item.id === run()?.id ? theme.backgroundElement : undefined,
                    }}
                  >
                    {` #${item.number} ${item.status === "error" ? "✗" : item.status === "running" ? "◐" : "✓"} `}
                  </span>
                )}
              </For>
              <span style={{ fg: theme.textMuted }}> ◀ ▶</span>
            </text>
          </box>
          <box height={1} flexShrink={0} />
          <scrollbox flexGrow={1} minHeight={0} verticalScrollbarOptions={{ visible: false }}>
            <For each={parts()}>
              {(part, position) => (
                <Activity
                  part={part}
                  step={
                    parts()
                      .slice(0, position() + 1)
                      .filter((item) => item.type === "tool").length
                  }
                  steps={steps()}
                />
              )}
            </For>
            <Show when={run() && parts().length === 0}>
              <text fg={run()?.status === "error" ? theme.error : theme.textMuted} wrapMode="word">
                {run()?.error ?? run()?.summary ?? (run()?.status === "running" ? "Working…" : "No activity recorded.")}
              </text>
            </Show>
            <box height={1} />
            <text fg={theme.textMuted} attributes={TextAttributes.ITALIC}>
              {running()
                ? "Running now — results land here and in your inbox."
                : agent().status === "paused"
                  ? "Paused. Press p to resume or r to run it once."
                  : `Waiting for next run — ${until(agent().nextRunAt, work.now())}. Ask about this agent's work below.`}
            </text>
          </scrollbox>
          <box flexShrink={0} paddingTop={1}>
            <Show when={agent().chatSessionID} keyed>
              {(sessionID) => (
                <Prompt
                  sessionID={sessionID}
                  autoFocus={false}
                  ref={(ref) => promptRef.set(ref)}
                  onSubmit={() => route.navigate({ type: "session", sessionID })}
                  placeholders={{ normal: ["Ask about this agent's work", "What changed since the last run?"] }}
                />
              )}
            </Show>
          </box>
          <box flexShrink={0}>
            <Hints
              items={[
                ["r", "run now"],
                ["p", agent().status === "paused" ? "resume" : "pause"],
                ["←→", "runs"],
                ["o", "transcript"],
                ["c", "ask"],
                ["x", "remove"],
                ["esc", "back"],
              ]}
            />
          </box>
        </box>
      )}
    </Show>
  )
}

function Activity(props: { part: Part; step: number; steps: number }) {
  const { theme } = useTheme()
  return (
    <Show
      when={props.part.type === "tool" ? props.part : undefined}
      fallback={
        <box paddingBottom={1}>
          <text fg={theme.text} wrapMode="word">
            {props.part.type === "text" ? props.part.text.trim() : ""}
          </text>
        </box>
      }
    >
      {(tool) => (
        <box paddingBottom={1}>
          <text wrapMode="none">
            <span style={{ fg: theme.primary }}>⚙ </span>
            <span style={{ fg: theme.text, bold: true }}>{tool().tool}</span>
            <span style={{ fg: theme.textMuted }}>{"  " + truncate(title(tool()), 90)}</span>
          </text>
          <Show when={tool().state.status === "completed" || tool().state.status === "error"}>
            <text fg={tool().state.status === "error" ? theme.error : theme.textMuted} wrapMode="word" paddingLeft={2}>
              {truncate(detail(tool()), 220)}
            </text>
          </Show>
          <text fg={theme.textMuted} wrapMode="none">
            <span style={{ fg: theme.borderActive }}>▸ Step </span>
            {`  action ${props.step} of ${props.steps}`}
          </text>
        </box>
      )}
    </Show>
  )
}

function describe(input: unknown) {
  if (!input || typeof input !== "object") return ""
  return Object.values(input)
    .filter((value) => typeof value === "string")
    .join(" · ")
}

function title(tool: ToolPart) {
  if (tool.state.status === "completed" && tool.state.title) return tool.state.title
  return describe(tool.state.input)
}

function detail(tool: ToolPart) {
  if (tool.state.status === "error") return tool.state.error
  if (tool.state.status !== "completed") return ""
  if (tool.tool === "inbox") return describe(tool.state.input)
  return tool.state.output
}
