import { TextAttributes } from "@opentui/core"
import { useTerminalDimensions } from "@opentui/solid"
import type { WorkDeployment, WorkMessage, WorkSpace } from "@opencode-ai/sdk/v2"
import { createMemo, For, Show } from "solid-js"
import { createStore } from "solid-js/store"
import { Prompt } from "../../component/prompt"
import { useKV } from "../../context/kv"
import { usePromptRef } from "../../context/prompt"
import { useRoute } from "../../context/route"
import { useTheme } from "../../context/theme"
import { HomeSessionDestinationProvider } from "../../routes/home/session-destination"
import { DialogPrompt } from "../../ui/dialog-prompt"
import { useDialog } from "../../ui/dialog"
import { useOpencodeKeymap } from "../../keymap"
import { useWork } from "../context"
import { Hints, Pill, SectionTitle } from "../components"
import { ACCESS, ago, clock, day, truncate, until } from "../format"
import { step, useFollowSelection, usePageKeys, usePressed, useRowClick } from "../keys"
import { spaceColor } from "../palette"
import { useShellInset } from "../shell"

type Section = "agenda" | "todos" | "inbox" | "agents"
const SECTIONS: ReadonlyArray<Section> = ["agenda", "todos", "inbox", "agents"]

export function DayPage() {
  const work = useWork()
  const { theme } = useTheme()
  const route = useRoute()
  const dialog = useDialog()
  const kv = useKV()
  const promptRef = usePromptRef()
  const keymap = useOpencodeKeymap()
  const click = useRowClick()
  const pressed = usePressed()
  const dimensions = useTerminalDimensions()
  const inset = useShellInset()
  const showAgents = () => kv.get("work_show_agents", true) === true
  const setShowAgents = (value: boolean) => kv.set("work_show_agents", value)
  const [selection, setSelection] = createStore({ section: "inbox" as Section, index: 0 })

  const width = () => dimensions().width - inset() - 4
  const agentsVisible = () => showAgents() && width() >= 110
  const left = () => 34
  const right = () => (agentsVisible() ? Math.max(42, Math.min(60, Math.floor(width() * 0.36))) : 0)
  const middle = () => width() - left() - right() - (agentsVisible() ? 4 : 2)

  const agenda = createMemo(() => {
    const start = new Date(work.now())
    start.setHours(0, 0, 0, 0)
    const end = start.getTime() + 86_400_000
    return work.state.agenda.filter((item) => item.startsAt >= start.getTime() && item.startsAt < end)
  })
  const todos = createMemo(() => work.state.todos)
  const inbox = createMemo(() =>
    work.state.messages.filter((item) => !item.time.done || item.time.done > work.now() - 86_400_000),
  )
  const unread = createMemo(() => inbox().filter((item) => !item.time.read).length)
  const deployments = createMemo(() => work.state.deployments.filter((item) => item.status !== "done"))
  const running = createMemo(() => work.state.latest.filter((run) => run.status === "running").length)
  const groups = createMemo(() => groupBySpace(work.state.spaces, deployments()))
  const agentList = createMemo(() => groups().flatMap((group) => group.agents))
  const latest = (id: string) => work.state.latest.find((run) => run.deploymentID === id)
  const titleOf = (id: string | undefined) => work.state.deployments.find((item) => item.id === id)?.title

  const sizes = (): Record<Section, number> => ({
    agenda: agenda().length,
    todos: todos().length,
    inbox: inbox().length,
    agents: agentsVisible() ? agentList().length : 0,
  })
  const selected = (section: Section, index: number) => selection.section === section && selection.index === index

  const checkedIn = (spaceID: string | undefined) => {
    if (!spaceID) return 0
    const today = new Date(work.now()).setHours(0, 0, 0, 0)
    return work.state.deployments.filter(
      (item) => item.spaceID === spaceID && (latest(item.id)?.time.started ?? 0) >= today,
    ).length
  }

  const addTodo = async () => {
    const content = await DialogPrompt.show(dialog, "New todo", { placeholder: "Book a table for Friday" })
    dialog.clear()
    if (content?.trim()) await work.todo.add(content.trim())
  }

  const addEvent = async () => {
    const value = await DialogPrompt.show(dialog, "New event", {
      placeholder: "14:30 Call with Ana",
      description: () => <text>Start time (HH:MM, today) followed by a title.</text>,
    })
    dialog.clear()
    const match = value ? /^(\d{1,2})[:h](\d{2})\s+(.+)$/.exec(value.trim()) : undefined
    if (!match) return
    const at = new Date(work.now())
    at.setHours(Number(match[1]), Number(match[2]), 0, 0)
    await work.agenda.add({ title: match[3], startsAt: at.getTime() })
  }

  const open = () => {
    if (selection.section === "agenda") {
      const item = agenda()[selection.index]
      if (item?.spaceID) route.navigate({ type: "work", page: "spaces", id: item.spaceID })
      return
    }
    if (selection.section === "todos") {
      const item = todos()[selection.index]
      if (item) void work.todo.toggle(item.id, !item.time.done)
      return
    }
    if (selection.section === "inbox") {
      const item = inbox()[selection.index]
      if (!item) return
      if (!item.time.read) void work.message.read(item.id)
      if (item.deploymentID) route.navigate({ type: "work", page: "agent", id: item.deploymentID })
      return
    }
    const agent = agentList()[selection.index]
    if (agent) route.navigate({ type: "work", page: "agent", id: agent.id })
  }

  const toggle = () => {
    if (selection.section === "todos") {
      const item = todos()[selection.index]
      if (item) void work.todo.toggle(item.id, !item.time.done)
    }
    if (selection.section === "inbox") {
      const item = inbox()[selection.index]
      if (item) void work.message.done(item.id, !item.time.done)
    }
  }

  const remove = () => {
    if (selection.section === "todos") {
      const item = todos()[selection.index]
      if (item) void work.todo.remove(item.id)
    }
    if (selection.section === "inbox") {
      const item = inbox()[selection.index]
      if (item) void work.message.remove(item.id)
    }
    if (selection.section === "agenda") {
      const item = agenda()[selection.index]
      if (item) void work.agenda.remove(item.id)
    }
  }

  const cycle = (delta: number) => {
    const visible = SECTIONS.filter((section) => section !== "agents" || agentsVisible())
    const next = visible[(visible.indexOf(selection.section) + delta + visible.length) % visible.length]
    setSelection({ section: next, index: 0 })
  }

  usePageKeys(() => [
    {
      key: "up,k",
      desc: "Previous item",
      run: () => setSelection("index", (index) => step(index, -1, sizes()[selection.section])),
    },
    {
      key: "down,j",
      desc: "Next item",
      run: () => setSelection("index", (index) => step(index, 1, sizes()[selection.section])),
    },
    { key: "tab,right,l", desc: "Next section", run: () => cycle(1) },
    { key: "shift+tab,left,h", desc: "Previous section", run: () => cycle(-1) },
    { key: "return", desc: "Open", run: open },
    { key: "space", desc: "Mark done", run: toggle },
    { key: "x", desc: "Remove", run: remove },
    { key: "n", desc: "New todo or event", run: () => void (selection.section === "agenda" ? addEvent() : addTodo()) },
    { key: "a", desc: "Show agents", run: () => setShowAgents(!showAgents()) },
    { key: "c", desc: "Chat about your day", run: () => promptRef.current?.focus() },
  ])

  const row = (section: Section, index: number) => (selected(section, index) ? theme.backgroundElement : undefined)
  const followTodos = useFollowSelection("todo", () => (selection.section === "todos" ? selection.index : undefined))
  const followInbox = useFollowSelection("inbox", () => (selection.section === "inbox" ? selection.index : undefined))
  const followAgents = useFollowSelection("agent", () => (selection.section === "agents" ? selection.index : undefined))

  return (
    <box flexGrow={1} minHeight={0} paddingLeft={2} paddingRight={2} paddingTop={1}>
      <box flexDirection="row" flexShrink={0} paddingBottom={1}>
        <box flexGrow={1}>
          <text fg={theme.text} attributes={TextAttributes.BOLD}>
            Your Day
          </text>
          <text fg={theme.textMuted}>{day(work.now())}</text>
        </box>
        <box flexDirection="row" gap={1} flexShrink={0}>
          <Pill
            label={
              work.state.paused
                ? "◼ agents paused"
                : `● ${deployments().filter((item) => item.status === "active").length} agents running`
            }
            fg={work.state.paused ? theme.warning : theme.text}
            onClick={() => route.navigate({ type: "work", page: "agents" })}
          />
          <Pill
            label={showAgents() ? "◧ Hide agents" : "◧ Show agents"}
            active={showAgents()}
            onClick={() => setShowAgents(!showAgents())}
          />
        </box>
      </box>
      <box flexDirection="row" flexGrow={1} minHeight={0} gap={2}>
        <box width={left()} flexShrink={0} minHeight={0}>
          <SectionTitle title="Your Agenda" />
          <box height={1} flexShrink={0} />
          <For each={agenda()}>
            {(item, index) => (
              <box
                flexShrink={0}
                backgroundColor={row("agenda", index())}
                onMouseUp={() =>
                  click(selected("agenda", index()), () => setSelection({ section: "agenda", index: index() }), open)
                }
              >
                <text wrapMode="none">
                  <span style={{ fg: item.startsAt < work.now() ? theme.textMuted : theme.text }}>
                    {clock(item.startsAt)}
                  </span>
                  <span style={{ fg: theme.warning }}> ● </span>
                  <span style={{ fg: theme.text }}>{truncate(item.title, left() - 9)}</span>
                </text>
                <text fg={checkedIn(item.spaceID) > 0 ? theme.success : theme.textMuted} wrapMode="none">
                  {"      " +
                    truncate(
                      item.spaceID
                        ? checkedIn(item.spaceID) > 0
                          ? `Ready — ${checkedIn(item.spaceID)} agent${checkedIn(item.spaceID) === 1 ? "" : "s"} checked in`
                          : "No agent checked in yet"
                        : "No agents attached",
                      left() - 6,
                    )}
                </text>
              </box>
            )}
          </For>
          <Show when={agenda().length === 0}>
            <text fg={theme.textMuted}>Nothing on the agenda today.</text>
          </Show>
          <text fg={theme.textMuted} flexShrink={0} selectable={false} onMouseUp={() => void addEvent()}>
            + Add an event...
          </text>
          <box height={1} flexShrink={0} />
          <SectionTitle title="Your Todos" />
          <box height={1} flexShrink={0} />
          <scrollbox ref={followTodos} flexGrow={1} minHeight={0} verticalScrollbarOptions={{ visible: false }}>
            <For each={todos()}>
              {(item, index) => (
                <box
                  id={`todo-${index()}`}
                  flexDirection="row"
                  gap={1}
                  backgroundColor={row("todos", index())}
                  onMouseUp={() =>
                    click(selected("todos", index()), () => setSelection({ section: "todos", index: index() }), open)
                  }
                >
                  <text
                    fg={item.time.done ? theme.success : theme.textMuted}
                    flexShrink={0}
                    selectable={false}
                    onMouseUp={(event: { stopPropagation(): void }) => {
                      // The checkbox toggles right away; the rest of the row selects first.
                      event.stopPropagation()
                      setSelection({ section: "todos", index: index() })
                      void work.todo.toggle(item.id, !item.time.done)
                    }}
                  >
                    {item.time.done ? "✓" : "○"}
                  </text>
                  <box flexGrow={1}>
                    <text
                      fg={item.time.done ? theme.textMuted : theme.text}
                      attributes={item.time.done ? TextAttributes.STRIKETHROUGH : undefined}
                      wrapMode="word"
                    >
                      {item.content}
                    </text>
                    <Show when={item.source && !item.time.done}>
                      <text fg={theme.textMuted}>{item.source}</text>
                    </Show>
                  </box>
                </box>
              )}
            </For>
            <text fg={theme.textMuted} selectable={false} onMouseUp={() => void addTodo()}>
              + Add a todo...
            </text>
          </scrollbox>
        </box>
        <box width={middle()} flexShrink={0} minHeight={0}>
          <SectionTitle title="Agent Inbox" meta={unread() > 0 ? `${unread()} unread` : "all caught up"} />
          <box height={1} flexShrink={0} />
          <scrollbox ref={followInbox} flexGrow={1} minHeight={0} verticalScrollbarOptions={{ visible: false }}>
            <For each={inbox()}>
              {(item, index) => (
                <InboxRow
                  id={`inbox-${index()}`}
                  message={item}
                  agent={titleOf(item.deploymentID)}
                  width={middle()}
                  now={work.now()}
                  background={row("inbox", index())}
                  onClick={() =>
                    click(
                      selected("inbox", index()),
                      () => {
                        setSelection({ section: "inbox", index: index() })
                        if (!item.time.read) void work.message.read(item.id)
                      },
                      open,
                    )
                  }
                  onToggle={() => void work.message.done(item.id, !item.time.done)}
                />
              )}
            </For>
            <Show when={inbox().length === 0}>
              <text fg={theme.textMuted} wrapMode="word">
                Nothing yet. Deployed agents post here when you need to know something.
              </text>
            </Show>
          </scrollbox>
          <box flexShrink={0} paddingTop={1}>
            <HomeSessionDestinationProvider>
              <Prompt
                autoFocus={false}
                ref={(ref) => promptRef.set(ref)}
                placeholders={{ normal: ["Chat about your day", "What should I focus on first?"] }}
              />
            </HomeSessionDestinationProvider>
          </box>
        </box>
        <Show when={agentsVisible()}>
          <box width={right()} flexShrink={0} minHeight={0}>
            <SectionTitle title="Agents" meta={`${deployments().length} agents · ${running()} running now`} />
            <box height={1} flexShrink={0} />
            <scrollbox ref={followAgents} flexGrow={1} minHeight={0} verticalScrollbarOptions={{ visible: false }}>
              <For each={groups()}>
                {(group) => (
                  <box paddingBottom={1}>
                    <box flexDirection="row">
                      <text flexGrow={1} wrapMode="none">
                        <span style={{ fg: spaceColor(theme, group.space?.color) }}>◆ </span>
                        <span style={{ fg: theme.text, bold: true }}>
                          {truncate(group.space?.name ?? "No space", right() - 12)}
                        </span>
                      </text>
                      <text
                        fg={theme.textMuted}
                      >{`${group.agents.length} agent${group.agents.length === 1 ? "" : "s"}`}</text>
                    </box>
                    <Show when={group.space?.goal}>
                      <text fg={theme.textMuted} wrapMode="none">
                        {"  " + truncate(group.space?.goal ?? "", right() - 2)}
                      </text>
                    </Show>
                    <For each={group.agents}>
                      {(agent) => (
                        <AgentRow
                          id={`agent-${agentList().findIndex((item) => item.id === agent.id)}`}
                          agent={agent}
                          run={latest(agent.id)}
                          width={right()}
                          now={work.now()}
                          color={spaceColor(theme, group.space?.color)}
                          background={
                            selection.section === "agents" && agentList()[selection.index]?.id === agent.id
                              ? theme.backgroundElement
                              : undefined
                          }
                          onClick={() => pressed() && route.navigate({ type: "work", page: "agent", id: agent.id })}
                        />
                      )}
                    </For>
                  </box>
                )}
              </For>
              <Show when={groups().length === 0}>
                <text fg={theme.textMuted} wrapMode="word">
                  No agents yet. Press ctrl+x d or type /deploy to deploy one.
                </text>
              </Show>
            </scrollbox>
          </box>
        </Show>
      </box>
      <box flexShrink={0} paddingTop={1}>
        <Hints
          items={[
            ["↑↓", "select"],
            ["tab", "section", () => cycle(1)],
            ["enter", "open", open],
            ["space", "done", toggle],
            ["n", "new", () => void (selection.section === "agenda" ? addEvent() : addTodo())],
            ["c", "chat", () => promptRef.current?.focus()],
            ["a", "agents", () => setShowAgents(!showAgents())],
            ["ctrl+x d", "deploy", () => keymap.dispatchCommand("work.deploy")],
          ]}
        />
      </box>
    </box>
  )
}

function InboxRow(props: {
  id: string
  message: WorkMessage
  agent: string | undefined
  width: number
  now: number
  background: ReturnType<typeof useTheme>["theme"]["background"] | undefined
  onClick: () => void
  onToggle: () => void
}) {
  const { theme } = useTheme()
  const done = () => Boolean(props.message.time.done)
  const unread = () => !props.message.time.read
  const agent = () => props.agent ?? "OpenWork"
  // Columns left for "agent · title" after the checkbox, dot, separator and time.
  const room = () => Math.max(16, props.width - 18)
  const agentWidth = () => Math.min(agent().length, Math.max(10, room() - props.message.title.length))
  return (
    <box id={props.id} flexShrink={0} paddingBottom={1} backgroundColor={props.background} onMouseUp={props.onClick}>
      <box flexDirection="row">
        <text
          fg={theme.textMuted}
          flexShrink={0}
          selectable={false}
          onMouseUp={(event: { stopPropagation(): void }) => {
            // Only toggle done; the row's own click would also select and mark the message read.
            event.stopPropagation()
            props.onToggle()
          }}
        >
          {done() ? "☑ " : "☐ "}
        </text>
        <text flexGrow={1} wrapMode="none">
          <span style={{ fg: theme.primary }}>● </span>
          <span style={{ fg: done() ? theme.textMuted : theme.text, bold: unread() }}>
            {truncate(agent(), agentWidth())}
          </span>
          <span style={{ fg: theme.textMuted }}>{" · " + truncate(props.message.title, room() - agentWidth())}</span>
        </text>
        <text flexShrink={0} wrapMode="none">
          <span style={{ fg: theme.secondary }}>{unread() ? "• " : "  "}</span>
          <span style={{ fg: theme.textMuted }}>{ago(props.message.time.created, props.now)}</span>
        </text>
      </box>
      <text fg={done() ? theme.textMuted : theme.text} wrapMode="word" paddingLeft={2}>
        {props.message.body}
      </text>
    </box>
  )
}

function AgentRow(props: {
  id: string
  agent: WorkDeployment
  run: ReturnType<typeof useWork>["state"]["latest"][number] | undefined
  width: number
  now: number
  color: ReturnType<typeof useTheme>["theme"]["background"]
  background: ReturnType<typeof useTheme>["theme"]["background"] | undefined
  onClick: () => void
}) {
  const { theme } = useTheme()
  const status = () => {
    if (props.run?.status === "running") return { icon: "◐", fg: theme.warning }
    if (props.agent.status === "paused") return { icon: "◌", fg: theme.textMuted }
    if (props.run?.status === "error") return { icon: "◆", fg: theme.error }
    return { icon: "◆", fg: props.color }
  }
  const timing = () =>
    props.run?.status === "running"
      ? "running now"
      : `${ago(props.agent.lastRunAt, props.now)} · ${props.agent.status === "paused" ? "paused" : until(props.agent.nextRunAt, props.now)}`
  const summary = () => props.run?.summary ?? props.run?.error ?? props.agent.task
  return (
    <box id={props.id} paddingLeft={2} paddingTop={1} backgroundColor={props.background} onMouseUp={props.onClick}>
      <text wrapMode="none">
        <span style={{ fg: status().fg }}>{status().icon} </span>
        <span style={{ fg: theme.textMuted }}>Agent: </span>
        <span style={{ fg: theme.text }}>{truncate(props.agent.title, props.width - 12)}</span>
      </text>
      <box flexDirection="row" paddingLeft={2}>
        <text fg={props.run?.status === "error" ? theme.error : theme.textMuted} wrapMode="none" flexGrow={1}>
          {truncate(summary(), props.width - 8 - timing().length)}
        </text>
        <text fg={props.run?.status === "running" ? theme.warning : theme.textMuted} flexShrink={0}>
          {timing()}
        </text>
      </box>
      <Show when={props.agent.skill}>
        <text fg={theme.textMuted} wrapMode="none" paddingLeft={2}>
          <span style={{ fg: theme.success }}>✓ </span>
          {"skill: " + props.agent.skill}
        </text>
      </Show>
      <text fg={theme.textMuted} wrapMode="none" paddingLeft={2}>
        <span style={{ fg: theme.success }}>✓ </span>
        {"permissions: " + ACCESS[props.agent.access]}
      </text>
    </box>
  )
}

function groupBySpace(spaces: ReadonlyArray<WorkSpace>, deployments: ReadonlyArray<WorkDeployment>) {
  const grouped = spaces
    .map((space) => ({ space, agents: deployments.filter((item) => item.spaceID === space.id) }))
    .filter((group) => group.agents.length > 0)
  const loose = deployments.filter((item) => !item.spaceID || !spaces.some((space) => space.id === item.spaceID))
  if (loose.length === 0) return grouped
  return [...grouped, { space: undefined, agents: loose }]
}
