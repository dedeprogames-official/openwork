export * as WorkIntegration from "./integration"

import { Cause, Effect, Exit, Option, Schema } from "effect"
import { ConfigMCPV1 } from "@opencode-ai/core/v1/config/mcp"
import { Work } from "@opencode-ai/core/work"
import { Config } from "@/config/config"

const NAME = /^[A-Za-z0-9_-]{1,40}$/
const HEADER = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+$/
const VARIABLE = /^[A-Za-z_][A-Za-z0-9_]*$/

/**
 * Integrations are MCP servers. Ones added in OpenWork are kept in its database right away, so they work at once and
 * nothing running is interrupted, and are written to the global opencode.json when OpenWork closes, which is the
 * file that stays the source of truth. A write that fails leaves them in the database to try again at the next start.
 */
export function parse(input: Work.IntegrationCreate) {
  const name = input.name.trim()
  if (!NAME.test(name))
    return invalid("name", "Use up to 40 letters, numbers, - or _ for the name; it prefixes the integration's tools")

  if (input.type === "remote") {
    const url = input.url?.trim() ?? ""
    if (!URL.canParse(url) || !["http:", "https:"].includes(new URL(url).protocol))
      return invalid("url", "The URL of an MCP server starts with http:// or https://")
    const headers = pairs(input.headers, HEADER)
    if (!headers) return invalid("headers", "A header has a name and a one-line value")
    return {
      name,
      config: { type: "remote", url, ...(headers && Object.keys(headers).length ? { headers } : {}), enabled: true },
    } satisfies Parsed
  }

  const command = (input.command ?? []).map((part) => part.trim()).filter(Boolean)
  if (command.length === 0) return invalid("command", "A local integration needs the command that starts it")
  const environment = pairs(input.environment, VARIABLE)
  if (!environment) return invalid("environment", "A variable is written NAME=value, with letters, digits and _")
  return {
    name,
    config: {
      type: "local",
      command,
      ...(Object.keys(environment).length ? { environment } : {}),
      enabled: true,
    },
  } satisfies Parsed
}

type Parsed = { name: string; config: ConfigMCPV1.Info }

function invalid(field: string, message: string) {
  return { field, message }
}

function pairs(value: Record<string, string> | undefined, key: RegExp) {
  const entries = Object.entries(value ?? {}).map(([name, text]) => [name.trim(), text.trim()] as const)
  if (entries.some(([name, text]) => !key.test(name) || text.includes("\n") || text.includes("\r"))) return undefined
  return Object.fromEntries(entries)
}

/** What the lists show: where it connects, never the headers or variables that may hold secrets. */
export function summarize(name: string, config: ConfigMCPV1.Info, file: boolean): Work.Integration {
  if (config.type === "local") return { name, type: "local", target: config.command[0] ?? "", file }
  const url = URL.canParse(config.url) ? new URL(config.url) : undefined
  return { name, type: "remote", target: url ? url.origin + url.pathname : (config.url.split("?")[0] ?? ""), file }
}

/** Every integration OpenWork manages: the ones in the global opencode.json and the ones waiting to be written. */
export const list = Effect.fn("WorkIntegration.list")(function* (work: Work.Interface, config: Config.Interface) {
  const file = yield* fileEntries(config)
  const staged = yield* work.integrations.staged()
  return [
    ...Object.entries(file).map(([name, entry]) => summarize(name, entry, true)),
    ...Object.entries(staged)
      .filter(([name]) => !(name in file))
      .flatMap(([name, value]) => {
        const entry = decode(value)
        return entry ? [summarize(name, entry, false)] : []
      }),
  ].toSorted((a, b) => a.name.localeCompare(b.name))
})

export const exists = Effect.fn("WorkIntegration.exists")(function* (
  work: Work.Interface,
  config: Config.Interface,
  name: string,
) {
  const file = yield* rawEntries(config)
  return name in file || name in (yield* work.integrations.staged())
})

/** Writes everything that waits in the database to the global opencode.json; whatever the file has already is dropped. */
export const sync = Effect.fn("WorkIntegration.sync")(function* (work: Work.Interface, config: Config.Interface) {
  const staged = Object.entries(yield* work.integrations.staged())
  if (staged.length === 0) return { written: [] }
  const file = yield* rawEntries(config)
  // The file wins when both have the name: the user may have edited it by hand.
  const pending = staged.flatMap(([name, value]) => {
    const entry = decode(value)
    return name in file || !entry ? [] : [[name, entry] as const]
  })
  if (pending.length > 0) {
    const result = yield* Effect.exit(config.updateGlobal({ mcp: Object.fromEntries(pending) }))
    if (Exit.isFailure(result)) return { written: [], warning: reason(result.cause) }
  }
  yield* Effect.forEach(staged, ([name]) => work.integrations.unstage(name))
  return { written: pending.map(([name]) => name) }
})

/** Takes the integration out of the database and, when it is there, the global opencode.json. */
export const remove = Effect.fn("WorkIntegration.remove")(function* (
  work: Work.Interface,
  config: Config.Interface,
  name: string,
) {
  yield* work.integrations.unstage(name)
  yield* work.integrations.setEnabled(name, true)
  if (!(name in (yield* rawEntries(config)))) return {}
  // An undefined value deletes the key from the file, with the rest of it (and its comments) left as it was.
  const result = yield* Effect.exit(
    config.updateGlobal({ mcp: { [name]: undefined } } as unknown as Parameters<Config.Interface["updateGlobal"]>[0]),
  )
  return Exit.isFailure(result) ? { warning: reason(result.cause) } : {}
})

/** The raw `mcp` entries of the global file; an unreadable file counts as empty, because lists must still open. */
const rawEntries = Effect.fnUntraced(function* (config: Config.Interface) {
  const global = yield* Effect.exit(config.getGlobal())
  return Exit.isSuccess(global) ? (global.value.mcp ?? {}) : {}
})

const fileEntries = Effect.fnUntraced(function* (config: Config.Interface) {
  const raw = yield* rawEntries(config)
  return Object.fromEntries(Object.entries(raw).flatMap(([name, entry]) => ("type" in entry ? [[name, entry]] : [])))
})

function decode(value: unknown) {
  return Option.getOrUndefined(Schema.decodeUnknownOption(ConfigMCPV1.Info)(value))
}

function reason(cause: Cause.Cause<unknown>) {
  const error = Cause.squash(cause)
  return error instanceof Error ? error.message : String(error)
}
