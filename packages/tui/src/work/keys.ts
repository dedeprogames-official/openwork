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

/** Moves a selection index within `length` items. */
export function step(index: number, delta: number, length: number) {
  if (length === 0) return 0
  return Math.min(length - 1, Math.max(0, index + delta))
}
