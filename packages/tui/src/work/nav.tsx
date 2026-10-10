import { TextAttributes } from "@opentui/core"
import { createMemo, createSignal, For, Show } from "solid-js"
import { useRoute, type WorkPage } from "../context/route"
import { useSync } from "../context/sync"
import { useTheme } from "../context/theme"
import { useWork } from "./context"
import { Action, hoverFill, useHover } from "./hover"
import { useSettings } from "./dialog-settings"
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
  const openSettings = useSettings()
  // The row under the mouse pointer, highlighted so clickable rows are discoverable.
  const [hover, setHover] = createSignal<string>()
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
        <Action
          label={props.collapsed ? "»" : "«"}
          pad={!props.collapsed}
          base={theme.backgroundPanel}
          onClick={props.onToggle}
        />
      </box>
      <box height={1} flexShrink={0} />
      <NavLink
        label={props.collapsed ? "+" : "+ New chat"}
        active={route.data.type === "home"}
        onClick={() => route.navigate({ type: "home" })}
      />
      <box height={1} flexShrink={0} />
      <For each={PAGES}>
        {(item, index) => (
          <box
            flexDirection="row"
            flexShrink={0}
            backgroundColor={
              current() === item.page || hover() === item.page ? hoverFill(theme, theme.backgroundPanel) : undefined
            }
            onMouseOver={() => setHover(item.page)}
            onMouseOut={() => setHover(undefined)}
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
              fg={
                (route.data.type === "session" && route.data.sessionID === session.id) || hover() === session.id
                  ? theme.text
                  : theme.textMuted
              }
              bg={hover() === session.id ? hoverFill(theme, theme.backgroundPanel) : undefined}
              wrapMode="none"
              flexShrink={0}
              selectable={false}
              onMouseOver={() => setHover(session.id)}
              onMouseOut={() => setHover(undefined)}
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
        <NavLink label="  View all" onClick={() => route.navigate({ type: "work", page: "chats" })} />
      </Show>
      <box flexGrow={1} minHeight={0} />
      <Show when={!props.collapsed}>
        <UsageBlock
          rows={[
            ["Local tokens", tokens(stats().local)],
            ["Cloud tokens", tokens(stats().cloud)],
            ["Tokens/hr", "~" + tokens(stats().perHour)],
          ]}
          onClick={() => route.navigate({ type: "work", page: "agents" })}
        />
      </Show>
      <box flexDirection="row" flexShrink={0} paddingTop={1}>
        <Action
          label={props.collapsed ? "⚙ " : "⚙"}
          pad={!props.collapsed}
          base={theme.backgroundPanel}
          onClick={() => openSettings()}
        />
        <Show when={!props.collapsed}>
          <Action
            label={work.state.paused ? "▶ resume" : "◼ pause"}
            fg={work.state.paused ? theme.warning : theme.textMuted}
            base={theme.backgroundPanel}
            onClick={() => void work.pause(!work.state.paused)}
          />
          <box flexGrow={1} />
          <text fg={sync.status === "complete" ? theme.success : theme.warning} selectable={false}>
            ●
          </text>
        </Show>
      </box>
    </box>
  )
}

/** A full-width link in the navigation that lights up under the pointer. */
function NavLink(props: { label: string; active?: boolean; onClick: () => void }) {
  const { theme } = useTheme()
  const hover = useHover()
  return (
    <box
      flexShrink={0}
      backgroundColor={hover.active() ? hoverFill(theme, theme.backgroundPanel) : undefined}
      {...hover.bind}
      onMouseUp={() => props.onClick()}
    >
      <text fg={props.active || hover.active() ? theme.text : theme.textMuted} wrapMode="none" selectable={false}>
        {props.label}
      </text>
    </box>
  )
}

/** Token usage as a plain section, like the ones in the sidebar of a chat: a bold title and a few rows. */
function UsageBlock(props: { rows: ReadonlyArray<readonly [string, string]>; onClick: () => void }) {
  const { theme } = useTheme()
  const hover = useHover()
  return (
    <box
      flexShrink={0}
      backgroundColor={hover.active() ? hoverFill(theme, theme.backgroundPanel) : undefined}
      {...hover.bind}
      onMouseUp={props.onClick}
    >
      <text fg={theme.text} attributes={TextAttributes.BOLD} selectable={false}>
        Usage
      </text>
      <For each={props.rows}>
        {(row) => (
          <box flexDirection="row">
            <text fg={theme.textMuted} flexGrow={1} selectable={false}>
              {row[0]}
            </text>
            <text fg={theme.text} selectable={false}>
              {row[1]}
            </text>
          </box>
        )}
      </For>
    </box>
  )
}
