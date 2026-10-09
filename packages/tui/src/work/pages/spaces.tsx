import { TextAttributes } from "@opentui/core"
import { createMemo, createSignal, For, Show } from "solid-js"
import { useRoute } from "../../context/route"
import { useTheme } from "../../context/theme"
import { DialogPrompt } from "../../ui/dialog-prompt"
import { DialogConfirm } from "../../ui/dialog-confirm"
import { useDialog } from "../../ui/dialog"
import { useWork } from "../context"
import { Empty, Hints, PageHeader, Pill, SectionTitle } from "../components"
import { useDeploy } from "../dialog-deploy"
import { ago, clock, schedule, truncate, until } from "../format"
import { step, useFollowSelection, usePageKeys, usePressed, useRowClick } from "../keys"
import { spaceColor } from "../palette"

export function SpacesPage(props: { spaceID?: string }) {
  const work = useWork()
  const route = useRoute()
  const dialog = useDialog()
  const deploy = useDeploy()
  const { theme } = useTheme()
  const spaces = createMemo(() => work.state.spaces)
  const initial = Math.max(
    0,
    spaces().findIndex((item) => item.id === props.spaceID),
  )
  const [selected, setSelected] = createSignal(initial)
  const space = createMemo(() => spaces()[selected()])
  const agents = createMemo(() => work.state.deployments.filter((item) => item.spaceID === space()?.id))
  const events = createMemo(() => work.state.agenda.filter((item) => item.spaceID === space()?.id))
  const latest = (id: string) => work.state.latest.find((run) => run.deploymentID === id)
  const click = useRowClick()
  const pressed = usePressed()
  const follow = useFollowSelection("space", selected)
  const openFirst = () => {
    const agent = agents()[0]
    if (agent) route.navigate({ type: "work", page: "agent", id: agent.id })
  }

  const create = async () => {
    const name = await DialogPrompt.show(dialog, "New space", { placeholder: "Launch prep" })
    if (!name?.trim()) return dialog.clear()
    const goal = await DialogPrompt.show(dialog, "Goal", { placeholder: "ship the launch without surprises" })
    await work.space.create({ name: name.trim(), ...(goal?.trim() ? { goal: goal.trim() } : {}) })
    dialog.clear()
  }

  const remove = async () => {
    const current = space()
    if (!current) return
    const ok = await DialogConfirm.show(dialog, "Remove space", `Remove "${current.name}"? Its agents stay deployed.`)
    if (ok) await work.space.remove(current.id)
  }

  usePageKeys(() => [
    { key: "up,k", desc: "Previous space", run: () => setSelected((index) => step(index, -1, spaces().length)) },
    { key: "down,j", desc: "Next space", run: () => setSelected((index) => step(index, 1, spaces().length)) },
    { key: "n", desc: "New space", run: () => void create() },
    { key: "d", desc: "Deploy an agent", run: () => void deploy() },
    { key: "x", desc: "Remove space", run: () => void remove() },
    { key: "return", desc: "Open first agent", run: openFirst },
  ])

  return (
    <box flexGrow={1} minHeight={0} paddingLeft={2} paddingRight={2} paddingTop={1}>
      <PageHeader
        title="Spaces"
        subtitle="Group agents around a goal, an event or a client."
        right={<Pill label="+ New space" active onClick={() => void create()} />}
      />
      <box flexDirection="row" flexGrow={1} minHeight={0} gap={3}>
        <scrollbox ref={follow} width={44} flexShrink={0} verticalScrollbarOptions={{ visible: false }}>
          <For each={spaces()}>
            {(item, index) => (
              <box
                id={`space-${index()}`}
                flexShrink={0}
                paddingBottom={1}
                backgroundColor={index() === selected() ? theme.backgroundElement : undefined}
                onMouseUp={() => click(index() === selected(), () => setSelected(index()), openFirst)}
              >
                <box flexDirection="row">
                  <text flexGrow={1} wrapMode="none">
                    <span style={{ fg: spaceColor(theme, item.color) }}>◆ </span>
                    <span style={{ fg: theme.text, bold: true }}>{truncate(item.name, 32)}</span>
                  </text>
                  <text fg={theme.textMuted}>
                    {`${work.state.deployments.filter((agent) => agent.spaceID === item.id).length} agents`}
                  </text>
                </box>
                <Show when={item.goal}>
                  <text fg={theme.textMuted} wrapMode="none">
                    {"  " + truncate(item.goal ?? "", 40)}
                  </text>
                </Show>
              </box>
            )}
          </For>
          <Show when={spaces().length === 0}>
            <Empty>No spaces yet. Press n to create one, or /demo to load an example workspace.</Empty>
          </Show>
        </scrollbox>
        <box flexGrow={1} minHeight={0}>
          <Show when={space()}>
            {(current) => (
              <>
                <text fg={spaceColor(theme, current().color)} attributes={TextAttributes.BOLD}>
                  {"◆ " + current().name}
                </text>
                <text fg={theme.textMuted} wrapMode="word">
                  {current().goal ?? "No goal yet."}
                </text>
                <box height={1} />
                <SectionTitle title="Agents" meta={`${agents().length}`} />
                <For each={agents()}>
                  {(agent) => (
                    <box
                      paddingTop={1}
                      onMouseUp={() => pressed() && route.navigate({ type: "work", page: "agent", id: agent.id })}
                    >
                      <box flexDirection="row">
                        <text flexGrow={1} wrapMode="none">
                          <span style={{ fg: latest(agent.id)?.status === "running" ? theme.warning : theme.success }}>
                            {latest(agent.id)?.status === "running" ? "◐ " : "● "}
                          </span>
                          <span style={{ fg: theme.text }}>{agent.title}</span>
                          <span style={{ fg: theme.textMuted }}>{"  " + schedule(agent.schedule)}</span>
                        </text>
                        <text fg={theme.textMuted}>
                          {`${ago(agent.lastRunAt, work.now())} · ${until(agent.nextRunAt, work.now())}`}
                        </text>
                      </box>
                      <text fg={theme.textMuted} wrapMode="none" paddingLeft={2}>
                        {truncate(latest(agent.id)?.summary ?? agent.task, 100)}
                      </text>
                    </box>
                  )}
                </For>
                <Show when={agents().length === 0}>
                  <Empty>No agents in this space yet.</Empty>
                </Show>
                <text fg={theme.textMuted} paddingTop={1} selectable={false} onMouseUp={() => void deploy()}>
                  + Deploy an agent...
                </text>
                <box height={1} />
                <SectionTitle title="On the agenda" />
                <For each={events()}>
                  {(event) => (
                    <text fg={theme.text}>
                      <span style={{ fg: theme.textMuted }}>{clock(event.startsAt)} </span>
                      {event.title}
                    </text>
                  )}
                </For>
                <Show when={events().length === 0}>
                  <Empty>Nothing scheduled for this space.</Empty>
                </Show>
              </>
            )}
          </Show>
        </box>
      </box>
      <box flexShrink={0} paddingTop={1}>
        <Hints
          items={[
            ["↑↓", "select"],
            ["enter", "open agent", openFirst],
            ["n", "new space", () => void create()],
            ["d", "deploy", () => void deploy()],
            ["x", "remove", () => void remove()],
          ]}
        />
      </box>
    </box>
  )
}
