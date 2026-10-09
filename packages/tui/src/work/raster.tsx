import type { RGBA } from "@opentui/core"
import { For } from "solid-js"

type Pixel = (x: number, y: number) => RGBA | undefined

type Span = { text: string; fg: RGBA; bg: RGBA }

/**
 * Draws a pixel function with half blocks: every cell shows two vertical pixels as `▀`
 * (top pixel in the foreground, bottom pixel in the background), so charts stay round in a terminal.
 */
export function Raster(props: { width: number; height: number; pixel: Pixel; background: RGBA }) {
  const rows = () =>
    Array.from({ length: props.height }, (_, row) =>
      Array.from({ length: props.width }, (_, col) => {
        const top = props.pixel(col, row * 2)
        const bottom = props.pixel(col, row * 2 + 1)
        if (!top && !bottom) return { text: " ", fg: props.background, bg: props.background }
        return { text: "▀", fg: top ?? props.background, bg: bottom ?? props.background }
      }).reduce<Span[]>((spans, cell) => {
        const last = spans.at(-1)
        if (last && last.text[0] === cell.text && same(last.fg, cell.fg) && same(last.bg, cell.bg)) {
          last.text += cell.text
          return spans
        }
        spans.push({ ...cell })
        return spans
      }, []),
    )
  return (
    <box flexShrink={0}>
      <For each={rows()}>
        {(spans) => (
          <text selectable={false}>
            <For each={spans}>{(span) => <span style={{ fg: span.fg, bg: span.bg }}>{span.text}</span>}</For>
          </text>
        )}
      </For>
    </box>
  )
}

/** Semicircle gauge filled from the left by `fraction`. */
export function Gauge(props: {
  width: number
  height: number
  fraction: number
  color: RGBA
  track: RGBA
  background: RGBA
}) {
  const pixel: Pixel = (x, y) => {
    const cx = props.width / 2
    const cy = props.height * 2
    const outer = Math.min(props.width / 2, props.height * 2) - 0.5
    const inner = outer * 0.62
    const dx = x + 0.5 - cx
    const dy = cy - (y + 0.5)
    const distance = Math.hypot(dx, dy)
    if (dy < 0 || distance > outer || distance < inner) return
    const progress = (Math.PI - Math.atan2(dy, dx)) / Math.PI
    return progress <= Math.min(1, Math.max(0, props.fraction)) ? props.color : props.track
  }
  return <Raster width={props.width} height={props.height} pixel={pixel} background={props.background} />
}

/** Ring chart; slices start at the top and go clockwise. */
export function Donut(props: {
  width: number
  slices: ReadonlyArray<{ value: number; color: RGBA }>
  track: RGBA
  background: RGBA
}) {
  const height = () => Math.ceil(props.width / 2)
  const pixel: Pixel = (x, y) => {
    const cx = props.width / 2
    const cy = height()
    const outer = Math.min(props.width / 2, height()) - 0.5
    const inner = outer * 0.55
    const dx = x + 0.5 - cx
    const dy = y + 0.5 - cy
    const distance = Math.hypot(dx, dy)
    if (distance > outer || distance < inner) return
    const total = props.slices.reduce((sum, item) => sum + item.value, 0)
    if (total <= 0) return props.track
    const angle = (Math.atan2(dx, -dy) + Math.PI * 2) % (Math.PI * 2)
    const target = (angle / (Math.PI * 2)) * total
    const hit = props.slices.reduce<{ sum: number; color: RGBA | undefined }>(
      (result, slice) => {
        if (result.color) return result
        const sum = result.sum + slice.value
        return { sum, color: target < sum ? slice.color : undefined }
      },
      { sum: 0, color: undefined },
    )
    return hit.color ?? props.track
  }
  return <Raster width={props.width} height={height()} pixel={pixel} background={props.background} />
}

function same(a: RGBA, b: RGBA) {
  return a.r === b.r && a.g === b.g && a.b === b.b && a.a === b.a
}
