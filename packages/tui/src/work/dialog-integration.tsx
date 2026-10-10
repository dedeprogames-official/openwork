import { TextAttributes } from "@opentui/core"
import { For, Show } from "solid-js"
import { Spinner } from "../component/spinner"
import { useSDK } from "../context/sdk"
import { useSync } from "../context/sync"
import { useTheme } from "../context/theme"
import { DialogConfirm } from "../ui/dialog-confirm"
import { DialogPrompt } from "../ui/dialog-prompt"
import { useDialog, type DialogContext } from "../ui/dialog"
import { useToast } from "../ui/toast"
import { message } from "./context"
import { choose } from "./dialog-deploy"
import { checkName, checkUrl, mask, parsePair, splitCommand } from "./integration-input"

/**
 * Add and remove integrations (MCP servers) without editing opencode.json. A new one is kept by OpenWork at once and
 * connects in the folder that is open; OpenWork writes it to the global opencode.json when it closes.
 */
export function useIntegrations() {
  const dialog = useDialog()
  const sdk = useSDK()
  const sync = useSync()
  const toast = useToast()

  const refresh = () =>
    sdk.client.mcp
      .status()
      .then((result) => {
        if (result.data) sync.set("mcp", result.data)
      })
      .catch(() => undefined)

  const existing = () =>
    sdk.client.work.integration
      .list()
      .then((result) => result.data ?? [])
      .catch(() => [])

  /** Asks the questions in turn. Resolves true once the integration is saved, false if it was given up. */
  const add = async () => {
    const taken = new Set([...Object.keys(sync.data.mcp), ...(await existing()).map((item) => item.name)])
    const name = await ask(dialog, "Add an integration", {
      placeholder: "docs",
      lines: ["A short name for it. The tools it brings are listed under this name."],
      check: (value) => checkName(value, taken),
    })
    if (!name) return false

    const kind = await choose<"remote" | "local">(dialog, `Where does ${name} run?`, [
      { title: "Remote server", value: "remote", description: "connect to a URL, like https://mcp.example.com/mcp" },
      { title: "Local command", value: "local", description: "start a program on this computer" },
    ])
    if (!kind) return false

    const target =
      kind === "remote"
        ? await ask(dialog, "Server URL", {
            placeholder: "https://mcp.example.com/mcp",
            lines: ["The address of the MCP server."],
            check: checkUrl,
          })
        : await ask(dialog, "Command", {
            placeholder: "npx -y @modelcontextprotocol/server-filesystem ~/Documents",
            lines: ["The command that starts the server. Put quotes around anything that has spaces."],
            check: (value) => {
              const words = splitCommand(value)
              if (!words) return "A quote is not closed"
              if (words.length === 0) return "Type the command that starts the server"
            },
          })
    if (!target) return false

    const pair = kind === "remote" ? "header" : "variable"
    const extras: Array<readonly [string, string]> = []
    for (;;) {
      const step = await choose<string>(dialog, `Add ${name}`, [
        { title: "Save and connect", value: "save", description: summary(kind, target, extras) },
        {
          title: kind === "remote" ? "Add a header…" : "Add an environment variable…",
          value: "extra",
          description: kind === "remote" ? "for an API key: Authorization: Bearer …" : "for an API key: API_KEY=…",
        },
        ...extras.map(([key, value]) => ({ title: `Remove ${key}`, value: `remove:${key}`, description: mask(value) })),
      ])
      if (step === undefined) return false

      if (step === "extra") {
        const line = await ask(dialog, kind === "remote" ? "Header" : "Environment variable", {
          placeholder: kind === "remote" ? "Authorization: Bearer abc123" : "API_KEY=abc123",
          lines: [
            kind === "remote"
              ? "Sent with every request to the server. Write it as Name: value."
              : "Given to the command when it starts. Write it as NAME=value.",
          ],
          check: (value) =>
            parsePair(value, pair) ? undefined : `Write it as ${kind === "remote" ? "Name: value" : "NAME=value"}`,
        })
        const added = line ? parsePair(line, pair) : undefined
        if (!added) return false
        const at = extras.findIndex(([key]) => key === added[0])
        if (at >= 0) extras.splice(at, 1)
        extras.push(added)
        continue
      }
      if (step.startsWith("remove:")) {
        const at = extras.findIndex(([key]) => key === step.slice("remove:".length))
        if (at >= 0) extras.splice(at, 1)
        continue
      }

      if (await save(name, kind, target, extras)) return true
    }
  }

  const save = async (
    name: string,
    kind: "remote" | "local",
    target: string,
    extras: ReadonlyArray<readonly [string, string]>,
  ) => {
    const values = Object.fromEntries(extras)
    const hasValues = extras.length > 0
    const command = splitCommand(target) ?? []
    dialog.replace(() => <Busy>{`Connecting ${name}…`}</Busy>)
    const created = await sdk.client.work.integration
      .create({
        workIntegrationCreate:
          kind === "remote"
            ? { name, type: "remote", url: target, ...(hasValues ? { headers: values } : {}) }
            : { name, type: "local", command, ...(hasValues ? { environment: values } : {}) },
      })
      .catch((error: unknown) => ({ data: undefined, error }))
    if (created.error || !created.data) {
      toast.show({ variant: "error", message: message(created.error) })
      return false
    }

    // The folder that is open connects now; other folders pick it up the next time they load.
    await sdk.client.mcp
      .add({
        name,
        config:
          kind === "remote"
            ? { type: "remote", url: target, enabled: true, ...(hasValues ? { headers: values } : {}) }
            : { type: "local", command, enabled: true, ...(hasValues ? { environment: values } : {}) },
      })
      .catch(() => undefined)
    await refresh()
    const status = sync.data.mcp[name]
    dialog.clear()
    if (status?.status === "connected")
      toast.show({
        variant: "success",
        message: `${name} is connected. It is saved to opencode.json when OpenWork closes.`,
      })
    else if (status?.status === "needs_auth" || status?.status === "needs_client_registration")
      toast.show({
        variant: "warning",
        duration: 10000,
        message: `${name} is saved but needs you to sign in. Run: openwork mcp auth ${name}`,
      })
    else
      toast.show({
        variant: "warning",
        duration: 10000,
        message: `${name} is saved but did not connect${status?.status === "failed" ? `: ${status.error}` : ""}`,
      })
    return true
  }

  const remove = async () => {
    const list = await existing()
    if (list.length === 0) {
      toast.show({ variant: "info", message: "No integration was added in OpenWork or the global opencode.json" })
      return false
    }
    const name = await choose<string>(
      dialog,
      "Remove an integration",
      list.map((item) => ({
        title: item.name,
        value: item.name,
        description: `${item.type} · ${item.target}${item.file ? "" : " · not in opencode.json yet"}`,
      })),
    )
    if (!name) return false
    const sure = await DialogConfirm.show(
      dialog,
      `Remove ${name}?`,
      "It is deleted from OpenWork and from your global opencode.json, and its tools stop being available.",
    )
    if (!sure) return false
    const removed = await sdk.client.work.integration
      .remove({ name })
      .catch((error: unknown) => ({ data: undefined, error }))
    if (removed.error) {
      toast.show({ variant: "error", message: message(removed.error) })
      return false
    }
    await sdk.client.mcp.remove({ name }).catch(() => undefined)
    await refresh()
    dialog.clear()
    toast.show({ variant: "success", message: `${name} was removed` })
    return true
  }

  return { add, remove }
}

/** One free-text question that asks again, with the reason, until the answer is acceptable or the dialog is closed. */
async function ask(
  dialog: DialogContext,
  title: string,
  input: { placeholder: string; lines: string[]; check: (value: string) => string | undefined },
) {
  let value: string | undefined
  let error: string | undefined
  for (;;) {
    const answer = await DialogPrompt.show(dialog, title, {
      placeholder: input.placeholder,
      value,
      description: () => <Lines lines={input.lines} error={error} />,
    })
    if (answer === null) return
    error = input.check(answer.trim())
    if (!error) return answer.trim()
    value = answer
  }
}

function summary(kind: "remote" | "local", target: string, extras: ReadonlyArray<readonly [string, string]>) {
  if (extras.length === 0) return target
  const noun = kind === "remote" ? "header" : "variable"
  return `${target} · ${extras.length} ${noun}${extras.length === 1 ? "" : "s"}`
}

function Lines(props: { lines: string[]; error?: string }) {
  const { theme } = useTheme()
  return (
    <box>
      <For each={props.lines}>
        {(line) => (
          <text fg={theme.textMuted} wrapMode="word">
            {line}
          </text>
        )}
      </For>
      <Show when={props.error}>
        <text fg={theme.error} wrapMode="word">
          {props.error}
        </text>
      </Show>
    </box>
  )
}

function Busy(props: { children: string }) {
  const { theme } = useTheme()
  return (
    <box paddingLeft={2} paddingRight={2} paddingBottom={1} gap={1}>
      <text fg={theme.text} attributes={TextAttributes.BOLD}>
        Add an integration
      </text>
      <Spinner color={theme.textMuted}>{props.children}</Spinner>
    </box>
  )
}
