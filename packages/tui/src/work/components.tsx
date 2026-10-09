import { TextAttributes, type RGBA } from "@opentui/core"
import { createSignal, For, Show, type JSX, type ParentProps } from "solid-js"
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
  const [hover, setHover] = createSignal(false)
  return (
    <box
      flexShrink={0}
      border
      borderStyle="rounded"
      borderColor={props.active || (hover() && props.onClick) ? theme.primary : theme.borderSubtle}
      backgroundColor={hover() && props.onClick ? theme.backgroundElement : undefined}
      paddingLeft={1}
      paddingRight={1}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
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

/** A key hint: `[key, label]`, or `[key, label, run]` to make it clickable. */
export type Hint = readonly [string, string] | readonly [string, string, () => void]

export function Hints(props: { items: ReadonlyArray<Hint> }) {
  const { theme } = useTheme()
  return (
    <box flexDirection="row" flexShrink={0} overflow="hidden">
      <For each={props.items}>
        {(item, index) => (
          <>
            <Show when={index() > 0}>
              <text fg={theme.textMuted} flexShrink={0} wrapMode="none" selectable={false}>
                {"  ·  "}
              </text>
            </Show>
            <HintItem item={item} />
          </>
        )}
      </For>
    </box>
  )
}

function HintItem(props: { item: Hint }) {
  const { theme } = useTheme()
  const [hover, setHover] = createSignal(false)
  const run = () => props.item[2]
  return (
    <text
      fg={theme.textMuted}
      bg={hover() && run() ? theme.backgroundElement : undefined}
      flexShrink={0}
      wrapMode="none"
      selectable={false}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      onMouseUp={() => run()?.()}
    >
      <span style={{ fg: theme.text }}>{props.item[0]}</span> {props.item[1]}
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
