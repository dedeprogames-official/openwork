import { TextAttributes } from "@opentui/core"
import { createMemo, For, Show } from "solid-js"
import { useRoute, type WorkPage } from "../context/route"
import { useSync } from "../context/sync"
import { useTheme } from "../context/theme"
import { COMMAND_PALETTE_COMMAND, useOpencodeKeymap } from "../keymap"
import { useWork } from "./context"
import { isWorkRun } from "./session"
import { tokens, truncate } from "./format"
import { usage } from "./stats"
import { NAV_WIDTH, RAIL_WIDTH } from "./shell"

export const PAGES: ReadonlyArray<{ page: Exclude<WorkPage, "agent">; label: string; icon: string }> = [
  { page: "day", label: "Your Day", icon: "◎" },
  { page: "chats", label: "Chats", icon: "▤" },
  { page: "spaces", label: "Spaces", icon: "◇" },
  { page: "agents", label: "Agents", icon: "◉" },
  { page: "skills", label: "Skills", icon: "✦" },
  { page: "memory", label: "Memory", icon: "◍" },
  { page: "models", label: "Models", icon: "◌" },
  { page: "integrations", label: "Integrations", icon: "⊞" },
]

export function WorkNav(props: { collapsed: boolean; onToggle: () => void }) {
  const { theme } = useTheme()
  const route = useRoute()
  const sync = useSync()
  const work = useWork()
  const keymap = useOpencodeKeymap()
  const current = createMemo(() => {
    if (route.data.type === "work") return route.data.page === "agent" ? "agents" : route.data.page
    if (route.data.type === "session") return "chats"
  })
  const recent = createMemo(() =>
    sync.data.session
      .filter((session) => !session.parentID && !isWorkRun(session))
      .toSorted((a, b) => b.time.updated - a.time.updated)
      .slice(0, 5),
  )
  const stats = createMemo(() => usage(work.state, sync.data.provider))
  const width = () => (props.collapsed ? RAIL_WIDTH : NAV_WIDTH)

  return (
    <box
      width={width()}
      flexShrink={0}
      height="100%"
      backgroundColor={theme.backgroundPanel}
      paddingTop={1}
      paddingBottom={1}
      paddingLeft={1}
      paddingRight={1}
    >
      <box flexDirection="row" flexShrink={0}>
        <Show when={!props.collapsed}>
          <text flexGrow={1} selectable={false}>
            <span style={{ fg: theme.textMuted }}>Open</span>
            <span style={{ fg: theme.text, bold: true }}>Work</span>
          </text>
        </Show>
        <text fg={theme.textMuted} onMouseUp={props.onToggle} selectable={false}>
          {props.collapsed ? "»" : "«"}
        </text>
      </box>
      <box height={1} flexShrink={0} />
      <text
        fg={route.data.type === "home" ? theme.text : theme.textMuted}
        onMouseUp={() => route.navigate({ type: "home" })}
        selectable={false}
        flexShrink={0}
      >
        {props.collapsed ? "+" : "+ New chat"}
      </text>
      <box height={1} flexShrink={0} />
      <For each={PAGES}>
        {(item, index) => (
          <box
            flexDirection="row"
            flexShrink={0}
            backgroundColor={current() === item.page ? theme.backgroundElement : undefined}
            onMouseUp={() => route.navigate({ type: "work", page: item.page })}
          >
            <text
              flexGrow={1}
              fg={current() === item.page ? theme.text : theme.textMuted}
              attributes={current() === item.page ? TextAttributes.BOLD : undefined}
              selectable={false}
            >
              <span style={{ fg: current() === item.page ? theme.primary : theme.textMuted }}>{item.icon}</span>
              {props.collapsed ? "" : ` ${item.label}`}
            </text>
            <Show when={!props.collapsed}>
              <text fg={theme.borderActive} selectable={false}>
                M-{index() + 1}
              </text>
            </Show>
          </box>
        )}
      </For>
      <Show when={!props.collapsed}>
        <box height={1} flexShrink={0} />
        <text fg={theme.textMuted} flexShrink={0} selectable={false}>
          Recent
        </text>
        <For each={recent()}>
          {(session) => (
            <text
              fg={route.data.type === "session" && route.data.sessionID === session.id ? theme.text : theme.textMuted}
              wrapMode="none"
              flexShrink={0}
              selectable={false}
              onMouseUp={() => route.navigate({ type: "session", sessionID: session.id })}
            >
              {"  " + truncate(session.title, NAV_WIDTH - 4)}
            </text>
          )}
        </For>
        <Show when={recent().length === 0}>
          <text fg={theme.borderActive} flexShrink={0}>
            {"  No chats yet"}
          </text>
        </Show>
        <text
          fg={theme.borderActive}
          flexShrink={0}
          selectable={false}
          onMouseUp={() => route.navigate({ type: "work", page: "chats" })}
        >
          {"  View all"}
        </text>
      </Show>
      <box flexGrow={1} minHeight={0} />
      <Show when={!props.collapsed}>
        <box
          border
          borderStyle="rounded"
          borderColor={theme.borderSubtle}
          title=" Usage "
          titleColor={theme.textMuted}
          paddingLeft={1}
          paddingRight={1}
          flexShrink={0}
          onMouseUp={() => route.navigate({ type: "work", page: "agents" })}
        >
          <Row label="Local tokens" value={tokens(stats().local)} />
          <Row label="Cloud tokens" value={tokens(stats().cloud)} />
          <Row label="Tokens/hr" value={"~" + tokens(stats().perHour)} />
        </box>
      </Show>
      <box flexDirection="row" flexShrink={0} gap={2} paddingTop={1}>
        <text fg={theme.textMuted} selectable={false} onMouseUp={() => keymap.dispatchCommand(COMMAND_PALETTE_COMMAND)}>
          ⚙
        </text>
        <Show when={!props.collapsed}>
          <text
            fg={work.state.paused ? theme.warning : theme.textMuted}
            selectable={false}
            onMouseUp={() => void work.pause(!work.state.paused)}
          >
            {work.state.paused ? "▶ resume" : "◼ pause"}
          </text>
          <box flexGrow={1} />
          <text fg={sync.status === "complete" ? theme.success : theme.warning} selectable={false}>
            ●
          </text>
        </Show>
      </box>
    </box>
  )
}

function Row(props: { label: string; value: string }) {
  const { theme } = useTheme()
  return (
    <box flexDirection="row">
      <text fg={theme.textMuted} flexGrow={1}>
        {props.label}
      </text>
      <text fg={theme.text}>{props.value}</text>
    </box>
  )
}
