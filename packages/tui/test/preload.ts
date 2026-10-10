// The TUI keeps preferences, drafts and the last page under the XDG folders, read when core is first imported.
// Tests get their own folders so they never read or change the developer's OpenWork state.
import os from "os"
import path from "path"
import fs from "fs/promises"
import { afterAll } from "bun:test"

const dir = path.join(os.tmpdir(), `openwork-tui-test-${process.pid}`)
await fs.mkdir(dir, { recursive: true })
process.env["XDG_DATA_HOME"] = path.join(dir, "share")
process.env["XDG_CACHE_HOME"] = path.join(dir, "cache")
process.env["XDG_CONFIG_HOME"] = path.join(dir, "config")
process.env["XDG_STATE_HOME"] = path.join(dir, "state")

afterAll(() => fs.rm(dir, { recursive: true, force: true }))
