import { TextAttributes, type RGBA } from "@opentui/core"
import { For, Show, type JSX, type ParentProps } from "solid-js"
import { useTheme } from "../context/theme"

export function PageHeader(props: { title: string; subtitle?: string; right?: JSX.Element }) {
  const { theme } = useTheme()
  return (
    <box flexDirection="row" flexShrink={0} paddingBottom={1}>
      <box flexGrow={1}>
        <text fg={theme.text} attributes={TextAttributes.BOLD}>
          {props.title}
        </text>
        <Show when={props.subtitle}>
          <text fg={theme.textMuted}>{props.subtitle}</text>
        </Show>
      </box>
      <box flexDirection="row" gap={1} flexShrink={0}>
        {props.right}
      </box>
    </box>
  )
}

export function SectionTitle(props: { title: string; meta?: string; right?: JSX.Element }) {
  const { theme } = useTheme()
  return (
    <box flexDirection="row" flexShrink={0}>
      <text fg={theme.text} flexGrow={1}>
        <b>{props.title}</b>
        <Show when={props.meta}>
          <span style={{ fg: theme.textMuted }}> {props.meta}</span>
        </Show>
      </text>
      {props.right}
    </box>
  )
}

export function Pill(props: { label: string; fg?: RGBA; active?: boolean; onClick?: () => void }) {
  const { theme } = useTheme()
  return (
    <box
      flexShrink={0}
      border
      borderStyle="rounded"
      borderColor={props.active ? theme.primary : theme.borderSubtle}
      paddingLeft={1}
      paddingRight={1}
      onMouseUp={props.onClick}
    >
      <text fg={props.fg ?? theme.text} selectable={false}>
        {props.label}
      </text>
    </box>
  )
}

export function Card(
  props: ParentProps<{ title?: string; flexGrow?: number; width?: number; borderColor?: RGBA; onClick?: () => void }>,
) {
  const { theme } = useTheme()
  return (
    <box
      border
      borderStyle="rounded"
      borderColor={props.borderColor ?? theme.borderSubtle}
      title={props.title ? ` ${props.title} ` : undefined}
      titleColor={theme.textMuted}
      paddingLeft={1}
      paddingRight={1}
      flexShrink={0}
      flexGrow={props.flexGrow}
      width={props.width}
      onMouseUp={props.onClick}
    >
      {props.children}
    </box>
  )
}

export function Hints(props: { items: ReadonlyArray<readonly [string, string]> }) {
  const { theme } = useTheme()
  return (
    <text fg={theme.textMuted} flexShrink={0} wrapMode="none">
      <For each={props.items}>
        {(item, index) => (
          <>
            <span style={{ fg: theme.text }}>{item[0]}</span> {item[1]}
            {index() < props.items.length - 1 ? "  ·  " : ""}
          </>
        )}
      </For>
    </text>
  )
}

export function Empty(props: { children: string }) {
  const { theme } = useTheme()
  return (
    <text fg={theme.textMuted} wrapMode="word">
      {props.children}
    </text>
  )
}
