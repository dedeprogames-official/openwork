import path from "path"
import type { ParentProps } from "solid-js"
import { createStore, produce, unwrap } from "solid-js/store"
import { createSimpleContext } from "../context/helper"
import { useTuiPaths } from "../context/runtime"
import { readJson, writeJsonAtomic } from "../util/persistence"
import type { PromptInfo } from "./history"
import { PromptStashProvider } from "./stash"

export type PromptDraft = {
  prompt: PromptInfo
  cursor: number
  time: number
}

/** Only the most recently edited drafts are kept, so the file stays small. */
export const MAX_PROMPT_DRAFTS = 50

/** Unsent prompt text per chat (or per page for prompts without a chat), kept across restarts. */
export const { use: usePromptDrafts, provider: PromptDraftProvider } = createSimpleContext({
  name: "PromptDrafts",
  init: () => {
    const file = path.join(useTuiPaths().state, "prompt-drafts.json")
    const [store, setStore] = createStore({ ready: false, drafts: {} as Record<string, PromptDraft> })
    // One write at a time; edits made while writing are saved right after, so the newest text always lands.
    const disk = { writing: false, dirty: false }

    readJson<unknown>(file)
      .then((value) => setStore("drafts", parsePromptDrafts(value)))
      .catch(() => {})
      .finally(() => setStore("ready", true))

    function persist() {
      if (disk.writing) {
        disk.dirty = true
        return
      }
      disk.writing = true
      void writeJsonAtomic(file, structuredClone(unwrap(store.drafts)))
        .catch(() => {})
        .finally(() => {
          disk.writing = false
          if (!disk.dirty) return
          disk.dirty = false
          persist()
        })
    }

    return {
      get ready() {
        return store.ready
      },
      get(key: string): PromptDraft | undefined {
        return store.drafts[key]
      },
      set(key: string, draft: Omit<PromptDraft, "time">) {
        setStore(
          "drafts",
          produce((drafts) => {
            drafts[key] = { ...structuredClone(draft), time: Date.now() }
            Object.entries(drafts)
              .toSorted((a, b) => b[1].time - a[1].time)
              .slice(MAX_PROMPT_DRAFTS)
              .forEach(([stale]) => delete drafts[stale])
          }),
        )
        persist()
      },
      remove(key: string) {
        if (!store.drafts[key]) return
        setStore(
          "drafts",
          produce((drafts) => {
            delete drafts[key]
          }),
        )
        persist()
      },
    }
  },
})

/** The stash and the drafts together, above the dialogs, so a prompt inside a plugin dialog works too. */
export function PromptStorageProvider(props: ParentProps) {
  return (
    <PromptStashProvider>
      <PromptDraftProvider>{props.children}</PromptDraftProvider>
    </PromptStashProvider>
  )
}

export function parsePromptDrafts(value: unknown) {
  if (!value || typeof value !== "object") return {}
  return Object.fromEntries(
    Object.entries(value).filter((entry): entry is [string, PromptDraft] => {
      const draft = entry[1]
      return (
        !!draft &&
        typeof draft === "object" &&
        typeof draft.prompt?.input === "string" &&
        Array.isArray(draft.prompt?.parts) &&
        typeof draft.cursor === "number" &&
        typeof draft.time === "number"
      )
    }),
  )
}
