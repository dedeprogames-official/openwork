import type { ScrollBoxRenderable } from "@opentui/core"
import { useRenderer } from "@opentui/solid"
import { createEffect, on } from "solid-js"
import { usePromptRef } from "../context/prompt"
import { useDialog } from "../ui/dialog"
import { OPENCODE_BASE_MODE, useBindings } from "../keymap"

export type PageKey = { readonly key: string; readonly desc: string; readonly run: () => void }

/** Page-local keys that only fire while no prompt has focus and no dialog is open. */
export function usePageKeys(items: () => ReadonlyArray<PageKey>) {
  const promptRef = usePromptRef()
  const dialog = useDialog()
  useBindings(() => ({
    mode: OPENCODE_BASE_MODE,
    enabled: () => !promptRef.current?.focused && dialog.stack.length === 0,
    bindings: items().map((item) => ({ key: item.key, desc: item.desc, group: "OpenWork", cmd: item.run })),
  }))
}

/**
 * Mouse clicks on list rows: the first click selects a row, a click on the selected row opens it (like enter).
 * Clicking a row also hands the keyboard back to the page by blurring a focused prompt.
 */
export function useRowClick() {
  const promptRef = usePromptRef()
  const pressed = usePressed()
  return (selected: boolean, select: () => void, open: () => void) => {
    if (!pressed()) return
    promptRef.current?.blur()
    if (selected) return open()
    select()
  }
}

/**
 * Whether a mouse release is a click: releasing a drag that selected text (to copy it) is not, matching the
 * dialogs' copy-on-select behaviour.
 */
export function usePressed() {
  const renderer = useRenderer()
  return () => !renderer.getSelection()?.getSelectedText()
}

/** Moves a selection index within `length` items. */
export function step(index: number, delta: number, length: number) {
  if (length === 0) return 0
  return Math.min(length - 1, Math.max(0, index + delta))
}

/**
 * Keeps a scrollbox list's selected row in view when the selection moves (keys or clicks); the mouse wheel scrolls
 * the list freely. Rows need `id={`${prefix}-${index}`}`; pass the returned function as the scrollbox `ref`.
 */
export function useFollowSelection(prefix: string, index: () => number | undefined) {
  let scroll: ScrollBoxRenderable | undefined
  createEffect(
    on(index, (value) => {
      if (value !== undefined) scroll?.scrollChildIntoView(`${prefix}-${value}`)
    }),
  )
  return (ref: ScrollBoxRenderable) => {
    scroll = ref
  }
}
