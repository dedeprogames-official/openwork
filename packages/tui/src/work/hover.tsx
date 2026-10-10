import { TextAttributes, type RGBA } from "@opentui/core"
import { createSignal, type ParentProps } from "solid-js"
import { tint, useTheme, type Theme } from "../context/theme"

function same(a: RGBA, b: RGBA) {
  return Math.abs(a.r - b.r) + Math.abs(a.g - b.g) + Math.abs(a.b - b.b) < 0.02
}

/**
 * The fill of a hovered control drawn over `base`. The opencode way is `backgroundElement`; a few themes give
 * panels and elements the same color, so there it is mixed from the surface instead, and a hover never disappears.
 */
export function hoverFill(theme: Theme, base: RGBA) {
  return same(theme.backgroundElement, base) ? tint(base, theme.text, 0.12) : theme.backgroundElement
}

/** Pointer-over state for a control: spread `bind` on the element that should react. */
export function useHover() {
  const [active, setActive] = createSignal(false)
  return {
    active,
    bind: { onMouseOver: () => setActive(true), onMouseOut: () => setActive(false) },
  }
}

/**
 * A text control (icon, link, toggle) that answers the pointer: it fills with the theme's hover color and the text
 * turns to the normal text color. The fill covers the padding too, so glyphs the terminal draws wider than one cell
 * (a gear, an emoji) still have a click area that reaches the whole symbol.
 */
export function Action(props: {
  label: string
  onClick: () => void
  /** Resting text color; defaults to the muted one. */
  fg?: RGBA
  /** The surface the control sits on, so the hover color differs from it. Defaults to the page background. */
  base?: RGBA
  /** Text color while the pointer is over it; defaults to the normal text color. */
  hoverFg?: RGBA
  /** One blank cell on each side; turn it off where the width is tight, such as the collapsed navigation. */
  pad?: boolean
  bold?: boolean
  /** Keep the click from reaching the row behind the control. */
  stop?: boolean
}) {
  const { theme } = useTheme()
  const hover = useHover()
  const text = () => (props.pad === false ? props.label : ` ${props.label} `)
  return (
    <text
      fg={hover.active() ? (props.hoverFg ?? theme.text) : (props.fg ?? theme.textMuted)}
      bg={hover.active() ? hoverFill(theme, props.base ?? theme.background) : undefined}
      attributes={props.bold ? TextAttributes.BOLD : undefined}
      wrapMode="none"
      flexShrink={0}
      selectable={false}
      {...hover.bind}
      onMouseUp={(event: { stopPropagation(): void }) => {
        if (props.stop) event.stopPropagation()
        props.onClick()
      }}
    >
      {text()}
    </text>
  )
}

/**
 * A row of a list: filled when it is the selected one, lighter while the pointer is over it, so the pointer always
 * shows what a click would pick. `onClick` gets the whole row, like the rows of opencode's own lists.
 */
export function HoverRow(
  props: ParentProps<{
    id?: string
    selected?: boolean
    /** The surface behind the list; defaults to the page background. */
    base?: RGBA
    flexDirection?: "row" | "column"
    gap?: number
    paddingTop?: number
    paddingBottom?: number
    paddingLeft?: number
    onClick?: () => void
  }>,
) {
  const { theme } = useTheme()
  const hover = useHover()
  const fill = () => {
    const base = props.base ?? theme.background
    if (props.selected) return hoverFill(theme, base)
    if (hover.active() && props.onClick) return tint(base, hoverFill(theme, base), 0.55)
    return undefined
  }
  return (
    <box
      id={props.id}
      flexShrink={0}
      flexDirection={props.flexDirection}
      gap={props.gap}
      paddingTop={props.paddingTop}
      paddingBottom={props.paddingBottom}
      paddingLeft={props.paddingLeft}
      backgroundColor={fill()}
      {...hover.bind}
      onMouseUp={props.onClick}
    >
      {props.children}
    </box>
  )
}
