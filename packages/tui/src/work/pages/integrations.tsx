import { createMemo, createSignal, For, Show } from "solid-js"
import { DialogMcp } from "../../component/dialog-mcp"
import { useData } from "../../context/data"
import { useSync } from "../../context/sync"
import { useTheme } from "../../context/theme"
import { useDialog } from "../../ui/dialog"
import { Empty, Hints, PageHeader, Pill, SectionTitle } from "../components"
import { truncate } from "../format"
import { step, usePageKeys, usePressed } from "../keys"
import { COMMAND_PALETTE_COMMAND, useOpencodeKeymap } from "../../keymap"

export function IntegrationsPage() {
  const sync = useSync()
  const data = useData()
  const dialog = useDialog()
  const { theme } = useTheme()
  const [selected, setSelected] = createSignal(0)
  const servers = createMemo(() => Object.entries(sync.data.mcp).toSorted((a, b) => a[0].localeCompare(b[0])))
  const integrations = createMemo(() => data.location.integration.list() ?? [])
  const connected = createMemo(() => integrations().filter((item) => item.connections.length > 0))
  const available = () =>
    integrations()
      .filter((item) => item.connections.length === 0)
      .slice(0, 8)
      .map((item) => item.name)
      .join(", ")
  const color = (status: string) => {
    if (status === "connected") return theme.success
    if (status === "failed") return theme.error
    if (status === "disabled") return theme.textMuted
    return theme.warning
  }

  const keymap = useOpencodeKeymap()
  const pressed = usePressed()
  const manage = () => dialog.replace(() => <DialogMcp />)

  usePageKeys(() => [
    { key: "up,k", desc: "Previous", run: () => setSelected((index) => step(index, -1, servers().length)) },
    { key: "down,j", desc: "Next", run: () => setSelected((index) => step(index, 1, servers().length)) },
    { key: "return", desc: "Manage MCP servers", run: manage },
  ])

  return (
    <box flexGrow={1} minHeight={0} paddingLeft={2} paddingRight={2} paddingTop={1}>
      <PageHeader
        title="Integrations"
        subtitle="Connectors give chats and agents access to your tools: mail, calendars, drives, CRMs and more (MCP)."
        right={<Pill label="Manage" active onClick={manage} />}
      />
      <SectionTitle title="MCP servers" meta={`${servers().length}`} />
      <box height={1} flexShrink={0} />
      <For each={servers()}>
        {(entry, index) => (
          <box
            flexDirection="row"
            paddingBottom={1}
            backgroundColor={index() === selected() ? theme.backgroundElement : undefined}
            onMouseUp={() => {
              if (!pressed()) return
              setSelected(index())
              manage()
            }}
          >
            <text flexGrow={1} wrapMode="none">
              <span style={{ fg: color(entry[1].status) }}>● </span>
              <span style={{ fg: theme.text, bold: true }}>{entry[0]}</span>
            </text>
            <text fg={color(entry[1].status)} wrapMode="none">
              {entry[1].status === "failed"
                ? `failed: ${truncate(entry[1].error, 60)}`
                : entry[1].status.replace(/_/g, " ")}
            </text>
          </box>
        )}
      </For>
      <Show when={servers().length === 0}>
        <Empty>
          No MCP servers configured. Add one under "mcp" in opencode.json, e.g. a Gmail, Google Drive or Linear server.
        </Empty>
      </Show>
      <box height={1} flexShrink={0} />
      <SectionTitle
        title="Accounts"
        meta={`${connected().length} connected · ${integrations().length - connected().length} available`}
      />
      <box height={1} flexShrink={0} />
      <For each={connected()}>
        {(item) => (
          <text wrapMode="none" flexShrink={0}>
            <span style={{ fg: theme.success }}>● </span>
            <span style={{ fg: theme.text }}>{item.name}</span>
            <span style={{ fg: theme.textMuted }}>{`  ${item.connections.length} connected`}</span>
          </text>
        )}
      </For>
      <text fg={theme.textMuted} wrapMode="word" flexShrink={0}>
        {connected().length === 0 ? "No accounts connected yet. " : ""}
        {`Run /connect to add one of ${integrations().length} providers and services: ${available()}…`}
      </text>
      <text
        fg={theme.textMuted}
        flexShrink={0}
        paddingTop={1}
        selectable={false}
        onMouseUp={() => keymap.dispatchCommand("provider.connect")}
      >
        + Connect an account...
      </text>
      <box flexGrow={1} />
      <box flexShrink={0} paddingTop={1}>
        <Hints
          items={[
            ["↑↓", "select"],
            ["enter", "manage servers", manage],
            ["ctrl+p", "commands", () => keymap.dispatchCommand(COMMAND_PALETTE_COMMAND)],
          ]}
        />
      </box>
    </box>
  )
}
