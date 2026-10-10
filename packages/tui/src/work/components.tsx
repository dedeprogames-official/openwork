import { TextAttributes, type RGBA } from "@opentui/core"
import { createSignal, For, Show, type JSX, type ParentProps } from "solid-js"
import { selectedForeground, tint, useTheme } from "../context/theme"
import { useHover } from "./hover"

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

/**
 * A button in the opencode way: a filled block, no frame. `active` is the page's main action (the theme's primary
 * color, like the confirm button of a dialog); the others sit on the element color. Both react to the pointer.
 */
export function Button(props: { label: string; fg?: RGBA; active?: boolean; onClick?: () => void }) {
  const { theme } = useTheme()
  const hover = useHover()
  const hovered = () => hover.active() && props.onClick !== undefined
  const fill = () => {
    if (props.active) return hovered() ? tint(theme.primary, theme.text, 0.2) : theme.primary
    return hovered() ? tint(theme.backgroundElement, theme.primary, 0.4) : theme.backgroundElement
  }
  return (
    <box
      flexShrink={0}
      paddingLeft={1}
      paddingRight={1}
      backgroundColor={fill()}
      {...hover.bind}
      onMouseUp={props.onClick}
    >
      <text
        fg={props.active ? selectedForeground(theme, theme.primary) : (props.fg ?? theme.text)}
        attributes={props.active ? TextAttributes.BOLD : undefined}
        wrapMode="none"
        selectable={false}
      >
        {props.label}
      </text>
    </box>
  )
}

/** A block of related figures on the panel color, with a bold title, like the sections of opencode's sidebar. */
export function Card(props: ParentProps<{ title?: string; flexGrow?: number; width?: number; onClick?: () => void }>) {
  const { theme } = useTheme()
  return (
    <box
      backgroundColor={theme.backgroundPanel}
      paddingLeft={2}
      paddingRight={2}
      paddingTop={1}
      paddingBottom={1}
      flexShrink={0}
      flexGrow={props.flexGrow}
      width={props.width}
      onMouseUp={props.onClick}
    >
      <Show when={props.title}>
        <text fg={theme.text} attributes={TextAttributes.BOLD}>
          {props.title}
        </text>
      </Show>
      {props.children}
    </box>
  )
}

/** A key hint: `[key, label]`, or `[key, label, run]` to make it clickable. */
export type Hint = readonly [string, string] | readonly [string, string, () => void]

export function Hints(props: { items: ReadonlyArray<Hint> }) {
  const { theme } = useTheme()
  return (
    // Narrow terminals wrap the hints onto more lines; each hint keeps its separator so a line never starts with one.
    <box flexDirection="row" flexWrap="wrap" flexShrink={0}>
      <For each={props.items}>
        {(item, index) => (
          <box flexDirection="row" flexShrink={0}>
            <HintItem item={item} />
            <Show when={index() < props.items.length - 1}>
              <text fg={theme.textMuted} flexShrink={0} wrapMode="none" selectable={false}>
                {"  ·  "}
              </text>
            </Show>
          </box>
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
