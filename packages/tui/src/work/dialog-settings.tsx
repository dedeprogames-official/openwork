import { RGBA, TextAttributes, type InputRenderable, type ScrollBoxRenderable } from "@opentui/core"
import { useTerminalDimensions } from "@opentui/solid"
import { InstallationVersion } from "@opencode-ai/core/installation/version"
import { createEffect, createMemo, createSignal, For, on, onMount, Show } from "solid-js"
import { createStore } from "solid-js/store"
import { DialogAgent } from "../component/dialog-agent"
import { DialogModel } from "../component/dialog-model"
import { DialogProvider } from "../component/dialog-provider"
import { DialogStatus } from "../component/dialog-status"
import { DialogThemeList } from "../component/dialog-theme-list"
import { useCloseAndUpgrade } from "../context/exit"
import { useTuiConfig } from "../config"
import { useKV } from "../context/kv"
import { useLocal } from "../context/local"
import { useRoute } from "../context/route"
import { useTuiPaths } from "../context/runtime"
import { useSDK } from "../context/sdk"
import { useSync } from "../context/sync"
import { selectedForeground, tint, useTheme } from "../context/theme"
import { COMMAND_PALETTE_COMMAND, useBindings, useOpencodeKeymap } from "../keymap"
import { abbreviateHome } from "../runtime"
import { useDialog } from "../ui/dialog"
import { DialogConfirm } from "../ui/dialog-confirm"
import { useWork } from "./context"
import { ACCESS } from "./format"
import { Button } from "./components"
import { useIntegrations } from "./dialog-integration"
import { Action, hoverFill, useHover } from "./hover"

export type SettingsSection = "general" | "chat" | "agents" | "models" | "integrations" | "permissions" | "about"

type Setting =
  | { kind: "toggle"; label: string; description: string; value: () => boolean; set: (value: boolean) => void }
  | {
      kind: "choice"
      label: string
      description: string
      value: () => string
      options: ReadonlyArray<{ value: string; label: string }>
      set: (value: string) => void
    }
  | { kind: "action"; label: string; description: string; value?: () => string; accent?: boolean; run: () => void }
  | { kind: "info"; label: string; description?: string; value: () => string }

type Section = {
  id: SettingsSection
  label: string
  icon: string
  description: string
  settings: Setting[]
  /** A button at the top right of the section, for the thing most people come here to do. */
  action?: { label: string; run: () => void }
}

/** Settings in the shape most chat apps use: sections on the left, the selected section's settings on the right. */
function DialogSettings(props: { sections: () => Section[]; section?: SettingsSection }) {
  const dialog = useDialog()
  const { theme } = useTheme()
  const dimensions = useTerminalDimensions()
  const tuiConfig = useTuiConfig()
  const sections = createMemo(props.sections)
  const [store, setStore] = createStore({ section: props.section ?? "general", index: 0, filter: "" })
  let input: InputRenderable | undefined
  let scroll: ScrollBoxRenderable | undefined

  onMount(() => dialog.setSize("xlarge"))

  const query = () => store.filter.trim().toLowerCase()
  const current = createMemo(() => sections().find((item) => item.id === store.section) ?? sections()[0])
  // While searching, the right side lists matches from every section.
  const rows = createMemo(() => {
    const words = query().split(/\s+/).filter(Boolean)
    if (!words.length) return current().settings.map((setting) => ({ setting, section: current() }))
    return sections().flatMap((section) =>
      section.settings
        .filter((setting) => {
          const haystack = `${setting.label} ${setting.description ?? ""} ${section.label}`.toLowerCase()
          return words.every((word) => haystack.includes(word))
        })
        .map((setting) => ({ setting, section })),
    )
  })
  const selected = () => rows()[store.index]

  createEffect(
    on(
      () => rows().length,
      (count) => {
        if (store.index >= count) setStore("index", Math.max(0, count - 1))
      },
    ),
  )
  createEffect(
    on(
      () => store.index,
      (index) => scroll?.scrollChildIntoView(`setting-${index}`),
    ),
  )

  const move = (delta: number) => {
    const count = rows().length
    if (count) setStore("index", (store.index + delta + count) % count)
  }
  // Clicks move focus off the search field; bring it back so typing still searches and Enter still works.
  const refocus = () =>
    setTimeout(() => {
      if (input && !input.isDestroyed) input.focus()
    }, 1)
  const showSection = (id: SettingsSection) => {
    if (input) input.value = ""
    setStore({ section: id, index: 0, filter: "" })
  }
  const cycleSection = (delta: number) => {
    const list = sections()
    const index = list.findIndex((item) => item.id === current().id)
    showSection(list[(index + delta + list.length) % list.length].id)
  }

  // The same commands and keys as every other list dialog, so custom keybinds apply here too.
  useBindings(() => ({
    commands: [
      { name: "dialog.select.prev", title: "Previous setting", category: "Dialog", run: () => move(-1) },
      { name: "dialog.select.next", title: "Next setting", category: "Dialog", run: () => move(1) },
      {
        name: "dialog.select.submit",
        title: "Change setting",
        category: "Dialog",
        run: () => change(selected()?.setting),
      },
    ],
    bindings: [
      ...tuiConfig.keybinds.gather("dialog.select", [
        "dialog.select.prev",
        "dialog.select.next",
        "dialog.select.submit",
      ]),
      { key: "tab", desc: "Next section", group: "Settings", cmd: () => cycleSection(1) },
      { key: "shift+tab", desc: "Previous section", group: "Settings", cmd: () => cycleSection(-1) },
    ],
  }))

  const height = () => Math.max(14, Math.min(32, dimensions().height - Math.floor(dimensions().height / 4) - 3))
  // Narrow terminals keep only the section icons on the left.
  const compact = () => dimensions().width < 96

  return (
    <box height={height()} gap={1} paddingBottom={1}>
      <box flexDirection="row" justifyContent="space-between" paddingLeft={4} paddingRight={4} flexShrink={0}>
        <text fg={theme.text} attributes={TextAttributes.BOLD}>
          Settings
        </text>
        <Action label="esc" base={theme.backgroundPanel} onClick={() => dialog.clear()} />
      </box>
      <box flexDirection="row" flexGrow={1} minHeight={0} paddingLeft={2} paddingRight={2} gap={2}>
        <box width={compact() ? 7 : 24} flexShrink={0} gap={1}>
          <box flexDirection="row" paddingLeft={1} backgroundColor={theme.backgroundElement} flexShrink={0}>
            <text fg={theme.textMuted} flexShrink={0} selectable={false}>
              {"⌕ "}
            </text>
            <input
              flexGrow={1}
              placeholder={compact() ? "" : "Search settings"}
              placeholderColor={theme.textMuted}
              backgroundColor={theme.backgroundElement}
              focusedBackgroundColor={theme.backgroundElement}
              focusedTextColor={theme.text}
              cursorColor={theme.primary}
              cursorStyle={tuiConfig.cursor}
              onInput={(value) => setStore({ filter: value, index: 0 })}
              ref={(ref: InputRenderable) => {
                input = ref
                setTimeout(() => {
                  if (input && !input.isDestroyed) input.focus()
                }, 1)
              }}
            />
          </box>
          <box flexShrink={0}>
            <For each={sections()}>
              {(section) => (
                <SectionItem
                  section={section}
                  active={!query() && section.id === current().id}
                  compact={compact()}
                  onPress={() => {
                    showSection(section.id)
                    refocus()
                  }}
                />
              )}
            </For>
          </box>
        </box>
        <box flexGrow={1} minWidth={0} minHeight={0}>
          <box flexDirection="row" paddingLeft={2} gap={2} flexShrink={0}>
            <box flexGrow={1} minWidth={0}>
              <text fg={theme.text} attributes={TextAttributes.BOLD} wrapMode="none">
                {query() ? `Results for "${store.filter.trim()}"` : current().label}
              </text>
              <text fg={theme.textMuted} wrapMode="none">
                {query() ? `${rows().length} ${rows().length === 1 ? "setting" : "settings"}` : current().description}
              </text>
            </box>
            <Show when={!query() ? current().action : undefined}>
              {(action) => (
                <box flexShrink={0}>
                  <Button
                    label={action().label}
                    active
                    onClick={() => {
                      action().run()
                      refocus()
                    }}
                  />
                </box>
              )}
            </Show>
          </box>
          <box height={1} flexShrink={0} />
          <scrollbox
            flexGrow={1}
            minHeight={0}
            verticalScrollbarOptions={{ visible: false }}
            ref={(ref: ScrollBoxRenderable) => (scroll = ref)}
          >
            <For each={rows()}>
              {(row, index) => (
                <box id={`setting-${index()}`} paddingBottom={1} flexShrink={0}>
                  <SettingRow
                    setting={row.setting}
                    section={query() ? row.section.label : undefined}
                    active={index() === store.index}
                    onHover={() => setStore("index", index())}
                    onPress={() => {
                      setStore("index", index())
                      change(row.setting)
                      refocus()
                    }}
                  />
                </box>
              )}
            </For>
            <Show when={!rows().length}>
              <text fg={theme.textMuted} paddingLeft={2}>
                No settings match. Try "theme", "agents" or "thinking".
              </text>
            </Show>
          </scrollbox>
        </box>
      </box>
      <box flexDirection="row" gap={3} paddingLeft={4} flexShrink={0}>
        <For
          each={[
            ["↑↓", "choose"],
            ["enter", "change"],
            ["tab", "section"],
            ["type", "search"],
          ]}
        >
          {(hint) => (
            <text wrapMode="none" flexShrink={0}>
              <span style={{ fg: theme.text, bold: true }}>{hint[0]}</span>
              <span style={{ fg: theme.textMuted }}> {hint[1]}</span>
            </text>
          )}
        </For>
      </box>
    </box>
  )
}

// Enter and clicks: flip a toggle, step a choice forward, or run an action.
function change(setting: Setting | undefined) {
  if (!setting) return
  if (setting.kind === "action") return setting.run()
  if (setting.kind === "toggle") return setting.set(!setting.value())
  step(setting, 1)
}

function step(setting: Setting, delta: number) {
  if (setting.kind !== "choice") return
  const index = setting.options.findIndex((option) => option.value === setting.value())
  const next = setting.options[(index + delta + setting.options.length) % setting.options.length]
  if (next) setting.set(next.value)
}

// The open section is marked quietly: the selected setting on the right has the focus colour.
function SectionItem(props: { section: Section; active: boolean; compact: boolean; onPress: () => void }) {
  const { theme } = useTheme()
  const hover = useHover()
  return (
    <box
      flexDirection="row"
      paddingLeft={1}
      paddingRight={1}
      backgroundColor={
        props.active
          ? theme.backgroundElement
          : hover.active()
            ? tint(theme.backgroundPanel, hoverFill(theme, theme.backgroundPanel), 0.55)
            : RGBA.fromInts(0, 0, 0, 0)
      }
      {...hover.bind}
      onMouseUp={props.onPress}
    >
      <text fg={props.active ? theme.primary : theme.textMuted} flexShrink={0} selectable={false}>
        {props.section.icon + " "}
      </text>
      <Show when={!props.compact}>
        <text
          fg={props.active ? theme.text : theme.textMuted}
          attributes={props.active ? TextAttributes.BOLD : undefined}
          wrapMode="none"
          selectable={false}
        >
          {props.section.label}
        </text>
      </Show>
    </box>
  )
}

function SettingRow(props: {
  setting: Setting
  section?: string
  active: boolean
  onHover: () => void
  onPress: () => void
}) {
  const { theme } = useTheme()
  const fg = selectedForeground(theme)
  const color = (normal: RGBA) => (props.active ? fg : normal)
  return (
    <box
      flexDirection="row"
      gap={2}
      paddingLeft={2}
      paddingRight={2}
      backgroundColor={props.active ? theme.primary : RGBA.fromInts(0, 0, 0, 0)}
      onMouseOver={props.onHover}
      onMouseUp={props.onPress}
    >
      <box flexGrow={1} minWidth={0}>
        <text
          fg={color(theme.text)}
          attributes={props.active ? TextAttributes.BOLD : undefined}
          wrapMode="none"
          selectable={false}
        >
          {props.setting.label}
          <Show when={props.section}>
            <span style={{ fg: color(theme.textMuted) }}>{"  " + props.section}</span>
          </Show>
        </text>
        <Show when={props.setting.description}>
          <text fg={color(theme.textMuted)} wrapMode="none" selectable={false}>
            {props.setting.description}
          </text>
        </Show>
      </box>
      <box flexShrink={0} justifyContent="center">
        <Control setting={props.setting} active={props.active} />
      </box>
    </box>
  )
}

function Control(props: { setting: Setting; active: boolean }) {
  const { theme } = useTheme()
  const fg = selectedForeground(theme)
  const color = (normal: RGBA) => (props.active ? fg : normal)
  const setting = props.setting
  if (setting.kind === "toggle")
    return (
      <text wrapMode="none" selectable={false}>
        <Show when={setting.value()} fallback={<span style={{ fg: color(theme.textMuted) }}>○ Off</span>}>
          <span style={{ fg: color(theme.success), bold: true }}>● On </span>
        </Show>
      </text>
    )
  if (setting.kind === "choice")
    return (
      <text wrapMode="none" selectable={false}>
        <span style={{ fg: color(theme.textMuted) }}>‹ </span>
        <span style={{ fg: color(theme.text), bold: props.active }}>
          {setting.options.find((option) => option.value === setting.value())?.label ?? setting.value()}
        </span>
        <span style={{ fg: color(theme.textMuted) }}> ›</span>
      </text>
    )
  if (setting.kind === "action")
    return (
      <text wrapMode="none" selectable={false}>
        <span style={{ fg: color(setting.accent ? theme.success : theme.textMuted), bold: setting.accent }}>
          {setting.value ? setting.value() + "  " : ""}
        </span>
        <span style={{ fg: color(theme.text) }}>›</span>
      </text>
    )
  return (
    <text fg={color(theme.text)} wrapMode="none" selectable={false}>
      {setting.value()}
    </text>
  )
}

/**
 * Returns a function that opens the settings. Dialogs render outside the OpenWork providers, so the sections are
 * built here, where Work, Local and Sync are in scope, and handed to the dialog.
 */
export function useSettings() {
  const dialog = useDialog()
  const kv = useKV()
  const work = useWork()
  const local = useLocal()
  const sync = useSync()
  const sdk = useSDK()
  const route = useRoute()
  const paths = useTuiPaths()
  const keymap = useOpencodeKeymap()
  const themes = useTheme()
  const upgrade = useCloseAndUpgrade()
  const integrations = useIntegrations()
  // Where each integration lives: true when it is in the global opencode.json, false while OpenWork still holds it.
  const [inFile, setInFile] = createSignal<Record<string, boolean>>({})
  const locate = () =>
    sdk.client.work.integration
      .list()
      .then((result) => setInFile(Object.fromEntries((result.data ?? []).map((item) => [item.name, item.file]))))
      .catch(() => undefined)
  const manage = (run: () => Promise<boolean>) => () => void run().then(() => open("integrations"))

  const flag = (key: string, fallback: boolean): Pick<Extract<Setting, { kind: "toggle" }>, "value" | "set"> => ({
    value: () => kv.get(key, fallback) === true,
    set: (value) => kv.set(key, value),
  })
  const go = (page: "models" | "integrations") => () => {
    dialog.clear()
    route.navigate({ type: "work", page })
  }
  const command = (name: string) => () => {
    dialog.clear()
    keymap.dispatchCommand(name)
  }

  const open = (section?: SettingsSection) => {
    work.checkVersion()
    void locate()
    dialog.replace(() => <DialogSettings sections={sections} section={section} />)
  }
  const update = (latest: string) =>
    void DialogConfirm.show(
      dialog,
      `Update to v${latest}`,
      "OpenWork closes and runs openwork upgrade in this terminal. Chats, agents and settings are kept, and " +
        "anything still running picks up again when you open OpenWork.",
    ).then((confirmed) => {
      if (confirmed) return upgrade()
      if (confirmed === false) open("general")
    })
  // A newer release shows up first in General, where Settings opens.
  const updates = (): Setting[] => {
    const info = work.version()
    if (!info?.available || !info.latest) return []
    const latest = info.latest
    return [
      {
        kind: "action",
        label: `OpenWork v${latest} is available`,
        description: `You have v${info.current} · closes OpenWork and runs openwork upgrade`,
        value: () => "Update",
        accent: true,
        run: () => update(latest),
      },
    ]
  }
  const sections = (): Section[] => [
    {
      id: "general",
      label: "General",
      icon: "⚙",
      description: "How OpenWork looks and behaves",
      settings: [
        ...updates(),
        {
          kind: "action",
          label: "Theme",
          description: "Colors for the whole app",
          value: () => themes.selected || "openwork",
          // Come back here once a theme is picked or the list is closed.
          run: () =>
            dialog.replace(
              () => <DialogThemeList />,
              () => setTimeout(() => open("general"), 0),
            ),
        },
        {
          kind: "choice",
          label: "Appearance",
          description: "Follow the terminal, or always use dark or light",
          value: () => (themes.locked() ? themes.mode() : "system"),
          options: [
            { value: "system", label: "System" },
            { value: "dark", label: "Dark" },
            { value: "light", label: "Light" },
          ],
          set: (value) => (value === "dark" || value === "light" ? themes.setMode(value) : themes.unlock()),
        },
        {
          kind: "toggle",
          label: "Animations",
          description: "Spinners and motion while agents work",
          ...flag("animations_enabled", true),
        },
        {
          kind: "toggle",
          label: "Terminal title",
          description: "Show the current page or chat in the window title",
          ...flag("terminal_title_enabled", true),
        },
        {
          kind: "toggle",
          label: "Compact navigation",
          description: "Collapse the sidebar to icons",
          ...flag("work_nav_collapsed", false),
        },
        {
          kind: "toggle",
          label: "Tips on the new chat page",
          description: "A short tip under the prompt",
          value: () => kv.get("tips_hidden", false) !== true,
          set: (value) => kv.set("tips_hidden", !value),
        },
      ],
    },
    {
      id: "chat",
      label: "Chat",
      icon: "▤",
      description: "What a conversation shows",
      settings: [
        {
          kind: "toggle",
          label: "Show thinking",
          description: "Expand the model's reasoning while it works",
          value: () => kv.get("thinking_mode", "hide") === "show",
          set: (value) => kv.set("thinking_mode", value ? "show" : "hide"),
        },
        {
          kind: "toggle",
          label: "Show finished steps",
          description: "Keep each tool call in the chat once it is done",
          ...flag("tool_details_visibility", true),
        },
        {
          kind: "toggle",
          label: "Show tool output",
          description: "Expand what other tools returned",
          ...flag("generic_tool_output_visibility", false),
        },
        {
          kind: "toggle",
          label: "Reply details",
          description: "Agent, model and time under each reply",
          ...flag("assistant_metadata_visibility", true),
        },
        {
          kind: "toggle",
          label: "Scrollbar",
          description: "Show a scrollbar beside long chats",
          ...flag("scrollbar_visible", false),
        },
        {
          kind: "toggle",
          label: "Summarize long pastes",
          description: "Collapse big pasted text into one line in the prompt",
          ...flag("paste_summary_enabled", !sync.data.config.experimental?.disable_paste_summary),
        },
        {
          kind: "toggle",
          label: "Wrap long lines in changes",
          description: "Wrap lines in file diffs instead of cutting them off",
          value: () => kv.get("diff_wrap_mode", "word") === "word",
          set: (value) => kv.set("diff_wrap_mode", value ? "word" : "none"),
        },
        {
          kind: "toggle",
          label: "Editor context",
          description: "Add the file open in your editor to new messages",
          ...flag("file_context_enabled", true),
        },
      ],
    },
    {
      id: "agents",
      label: "Agents",
      icon: "◉",
      description: "Defaults for the agents you deploy",
      settings: [
        {
          kind: "toggle",
          label: "Run agents on schedule",
          description: "Off pauses every scheduled run; Run now still works",
          value: () => !work.state.paused,
          set: (value) => void work.pause(!value),
        },
        {
          kind: "choice",
          label: "Access for new agents",
          description: "What new agents may do, also when a chat deploys one",
          value: () => work.state.defaults.access,
          options: (["read", "write", "full"] as const).map((value) => ({ value, label: ACCESS[value] })),
          set: (value) => {
            if (value === "read" || value === "write" || value === "full") void work.defaults({ access: value })
          },
        },
        {
          kind: "toggle",
          label: "Run once after deploying",
          description: "Start a new agent's first run right away",
          value: () => work.state.defaults.runOnDeploy,
          set: (value) => void work.defaults({ runOnDeploy: value }),
        },
        {
          kind: "toggle",
          label: "Agents on Your Day",
          description: "Show the agents column next to your inbox",
          ...flag("work_show_agents", true),
        },
        {
          kind: "toggle",
          label: "Whole-day calendar",
          description: "Open the Agents calendar on the full day instead of the latest runs",
          value: () => kv.get("work_calendar_zoom", "detail") === "day",
          set: (value) => kv.set("work_calendar_zoom", value ? "day" : "detail"),
        },
      ],
    },
    {
      id: "models",
      label: "Models",
      icon: "◌",
      description: "Which model chats and new agents use",
      settings: [
        {
          kind: "action",
          label: "Model",
          description: `Used by new chats and new agents · ${local.model.parsed().provider}`,
          value: () => local.model.parsed().model,
          run: () => dialog.replace(() => <DialogModel />),
        },
        {
          kind: "action",
          label: "Chat agent",
          description: "The persona a new chat starts with",
          value: () => local.agent.current()?.name ?? "work",
          run: () => dialog.replace(() => <DialogAgent />),
        },
        {
          kind: "action",
          label: "Providers",
          description: "Connect a local server or a cloud account",
          value: () => `${sync.data.provider.length} connected`,
          run: () => dialog.replace(() => <DialogProvider />),
        },
        {
          kind: "action",
          label: "All models",
          description: "Local and cloud models side by side",
          run: go("models"),
        },
      ],
    },
    {
      id: "integrations",
      label: "Integrations",
      icon: "⊞",
      description: "MCP servers that give chats and agents more tools",
      action: { label: "+ Add", run: manage(integrations.add) },
      settings: [
        {
          kind: "action",
          label: "Add an integration…",
          description: "A name, the server's URL or command, and any keys it needs; no need to edit opencode.json",
          accent: true,
          run: manage(integrations.add),
        },
        ...Object.entries(sync.data.mcp)
          .toSorted((a, b) => a[0].localeCompare(b[0]))
          .map(
            ([name, status]): Setting => ({
              kind: "toggle",
              label: name,
              description: [
                status.status === "failed" ? "Failed to start" : capitalize(status.status.replace(/_/g, " ")),
                inFile()[name] === true ? "opencode.json" : undefined,
                inFile()[name] === false ? "OpenWork, written to opencode.json when it closes" : undefined,
              ]
                .filter(Boolean)
                .join(" · "),
              value: () => local.mcp.isEnabled(name),
              set: () =>
                void local.mcp
                  .toggle(name)
                  .then(() => sdk.client.mcp.status())
                  .then((result) => {
                    if (result.data) sync.set("mcp", result.data)
                  })
                  .catch(() => undefined),
            }),
          ),
        {
          kind: "action",
          label: "Remove an integration…",
          description: "Delete one from OpenWork and from your global opencode.json",
          run: manage(integrations.remove),
        },
        {
          kind: "action",
          label: "Integrations page",
          description: Object.keys(sync.data.mcp).length
            ? "Status and tools of every server"
            : 'No servers yet: add them under "mcp" in opencode.json',
          run: go("integrations"),
        },
      ],
    },
    {
      id: "permissions",
      label: "Permissions",
      icon: "✓",
      description: 'What you chose to "Allow always", per folder',
      settings: work.state.permissions.length
        ? work.state.permissions.map(
            (item): Setting => ({
              kind: "action",
              label: `${item.permission} · ${item.pattern}`,
              description: `${abbreviateHome(item.directory, paths.home)} · forget it to be asked again`,
              value: () => "Forget",
              run: () => void work.permission.remove(item.id),
            }),
          )
        : [
            {
              kind: "info",
              label: "Nothing allowed yet",
              description: 'Answer "Allow always" when OpenWork asks, and it is remembered here',
              value: () => "",
            },
          ],
    },
    {
      id: "about",
      label: "About",
      icon: "ℹ",
      description: "Version, folder and help",
      settings: [
        {
          kind: "info",
          label: "Version",
          description: versionNote(work.version()),
          value: () => (InstallationVersion === "local" ? "development build" : `v${InstallationVersion}`),
        },
        {
          kind: "info",
          label: "Folder",
          description: "Where new chats and agents start",
          value: () => abbreviateHome(sdk.directory ?? paths.cwd, paths.home),
        },
        {
          kind: "action",
          label: "Keyboard shortcuts",
          description: "Every key binding, grouped",
          run: command("which-key.toggle"),
        },
        {
          kind: "action",
          label: "All commands",
          description: "Search everything OpenWork can do",
          run: command(COMMAND_PALETTE_COMMAND),
        },
        {
          kind: "action",
          label: "Status",
          description: "Servers, formatters and plugins",
          run: () => dialog.replace(() => <DialogStatus />),
        },
      ],
    },
  ]
  return open
}

function versionNote(info: { available: boolean; latest?: string } | undefined) {
  if (InstallationVersion === "local") return "Built from source"
  if (info?.available && info.latest) return `v${info.latest} is available: Update is at the top of General`
  if (info?.latest) return "Up to date"
  return "Update with: openwork upgrade"
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}
