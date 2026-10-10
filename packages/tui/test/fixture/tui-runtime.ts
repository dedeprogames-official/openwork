import { rm } from "fs/promises"
import path from "path"
import { Global } from "@opencode-ai/core/global"
import { resolve, type Info, type Resolved } from "../../src/config"
import { TuiKeybind } from "../../src/config/keybind"

type ResolvedInput = Omit<Info, "attention" | "keybinds" | "leader_timeout"> & {
  attention?: Partial<Resolved["attention"]>
  keybinds?: Partial<TuiKeybind.Keybinds>
  leader_timeout?: number
}

export function createTuiResolvedConfig(input: ResolvedInput = {}) {
  return resolve(input, { terminalSuspend: process.platform !== "win32" })
}

/** Starts the next app like a first run: no remembered page, preferences, models or drafts. */
export async function resetTuiState() {
  await Promise.all(
    ["kv.json", "model.json", "prompt-drafts.json", "session.json"].map((file) =>
      rm(path.join(Global.Path.state, file), { force: true }),
    ),
  )
}
