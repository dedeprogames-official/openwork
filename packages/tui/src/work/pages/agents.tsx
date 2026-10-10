import { TextAttributes } from "@opentui/core"
import { useTerminalDimensions } from "@opentui/solid"
import type { WorkDeployment, WorkRun } from "@opencode-ai/sdk/v2"
import { createEffect, createMemo, createSignal, For, Show } from "solid-js"
import { useKV } from "../../context/kv"
import { useRoute } from "../../context/route"
import { useSync } from "../../context/sync"
import { tint, useTheme } from "../../context/theme"
import { useWork } from "../context"
import { Card, Hints, PageHeader, Pill } from "../components"
import { useDeploy } from "../dialog-deploy"
import { clock, count, money, tokens, truncate } from "../format"
import { step, usePageKeys, useRowClick } from "../keys"
import { spaceColor } from "../palette"
import { Donut, Gauge } from "../raster"
import { useShellInset } from "../shell"
import { REFERENCE, runTokens, shares, usage } from "../stats"

type Entry = {
  key: string
  at: number
  deployment: WorkDeployment | undefined
  run: WorkRun | undefined
}

const STATS_WIDTH = 40

export function AgentsPage() {
  const work = useWork()
  const sync = useSync()
  const { theme } = useTheme()
  const route = useRoute()
  const kv = useKV()
  const deploy = useDeploy()
  const dimensions = useTerminalDimensions()
  const inset = useShellInset()
  const zoom = () => (kv.get("work_calendar_zoom", "detail") === "day" ? "day" : "detail")
  // "Follow live" is a preference kept across restarts; moving through the runs pauses it until you turn it back on.
  const [live, setLive] = createSignal(kv.get("work_calendar_live", true) !== false)
  const toggleLive = () => {
    setLive(!live())
    kv.set("work_calendar_live", live())
  }
  const [selected, setSelected] = createSignal(0)
  const click = useRowClick()

  const stats = createMemo(() => usage(work.state, sync.data.provider))
  const slices = createMemo(() => shares(work.state))
  const sliceTotal = createMemo(() => slices().reduce((sum, item) => sum + item.value, 0))
  const byID = createMemo(() => new Map(work.state.deployments.map((item) => [item.id, item])))
  const spaceOf = (deployment: WorkDeployment | undefined) =>
    work.state.spaces.find((item) => item.id === deployment?.spaceID)

  const entries = createMemo<Entry[]>(() => [
    ...work.state.runs.map((run) => ({
      key: run.id,
      at: run.time.started,
      deployment: byID().get(run.deploymentID),
      run,
    })),
    ...work.state.upcoming.map((item, index) => ({
      key: `upcoming-${item.deploymentID}-${item.at}-${index}`,
      at: item.at,
      deployment: byID().get(item.deploymentID),
      run: undefined,
    })),
  ])
  // Index of the first entry that is running or still to come: "now" on the calendar.
  const nowIndex = createMemo(() => {
    const running = entries().findIndex((entry) => entry.run?.status === "running")
    if (running >= 0) return running
    const next = entries().findIndex((entry) => !entry.run)
    return next >= 0 ? Math.max(0, next - 1) : Math.max(0, entries().length - 1)
  })
  createEffect(() => {
    if (live()) setSelected(nowIndex())
  })

  const width = () => dimensions().width - inset() - 4
  const calendarWidth = () => width() - STATS_WIDTH - 2
  // The running run is drawn with a border and takes three lines.
  const visibleRows = () => Math.max(3, dimensions().height - 15)
  // Live keeps "now" a third of the way down; otherwise the window only scrolls once the selection leaves it,
  // so clicking a row never moves the rows under the pointer.
  const windowStart = createMemo<number>((previous) => {
    const rows = visibleRows()
    const clamp = (value: number) => Math.max(0, Math.min(entries().length - rows, value))
    if (live()) return clamp(selected() - Math.floor(rows / 3))
    if (selected() < previous) return clamp(selected())
    if (selected() >= previous + rows) return clamp(selected() - rows + 1)
    return clamp(previous)
  }, 0)
  const visible = createMemo(() => entries().slice(windowStart(), windowStart() + visibleRows()))

  const hours = createMemo(() => {
    const start = new Date(work.now())
    start.setHours(0, 0, 0, 0)
    return Array.from({ length: 24 }, (_, hour) => {
      const from = start.getTime() + hour * 3_600_000
      const items = entries().filter((entry) => entry.at >= from && entry.at < from + 3_600_000)
      return { hour, from, items, done: items.filter((entry) => entry.run).length }
    })
  })
  const busiest = createMemo(() => Math.max(1, ...hours().map((item) => item.items.length)))
  const currentHour = () => new Date(work.now()).getHours()

  const open = () => {
    const entry = entries()[selected()]
    if (entry?.deployment) route.navigate({ type: "work", page: "agent", id: entry.deployment.id })
  }
  const move = (delta: number) => {
    setLive(false)
    setSelected((index) => step(index, delta, entries().length))
  }
  const setZoom = (value: "day" | "detail") => kv.set("work_calendar_zoom", value)
  // Whole-day rows zoom into that hour: select its first run and switch to the detail view.
  const openHour = (items: ReadonlyArray<Entry>) => {
    const index = items[0] ? entries().indexOf(items[0]) : -1
    if (index === -1) return
    setLive(false)
    setSelected(index)
    setZoom("detail")
  }

  usePageKeys(() => [
    { key: "up,k", desc: "Earlier run", run: () => move(-1) },
    { key: "down,j", desc: "Later run", run: () => move(1) },
    { key: "return", desc: "Open agent", run: open },
    { key: "z", desc: "Zoom calendar", run: () => setZoom(zoom() === "day" ? "detail" : "day") },
    { key: "l", desc: "Follow live", run: toggleLive },
    { key: "p", desc: "Pause agents", run: () => void work.pause(!work.state.paused) },
    { key: "n", desc: "Create agent", run: () => void deploy() },
  ])

  return (
    <box flexGrow={1} minHeight={0} paddingLeft={2} paddingRight={2} paddingTop={1}>
      <PageHeader
        title="Agents"
        subtitle="Every run today, in order — the outlined run is what is working right now."
        right={
          <>
            <Pill
              label={work.state.paused ? "▶ Resume Agents" : "◼ Pause Agents"}
              fg={work.state.paused ? theme.success : theme.warning}
              onClick={() => void work.pause(!work.state.paused)}
            />
            <Pill label="+ Create Agent" active onClick={() => void deploy()} />
          </>
        }
      />
      <box flexDirection="row" flexGrow={1} minHeight={0} gap={2}>
        <box width={STATS_WIDTH} flexShrink={0} gap={0}>
          <Card title="Estimated daily token spend">
            <box alignItems="center">
              <Gauge
                width={STATS_WIDTH - 10}
                height={6}
                fraction={stats().perDay > 0 ? stats().today / stats().perDay : 0}
                color={theme.primary}
                track={tint(theme.background, theme.text, 0.14)}
                background={theme.background}
              />
              <text fg={theme.text} attributes={TextAttributes.BOLD}>
                {tokens(stats().perDay)}
                <span style={{ fg: theme.textMuted }}> tokens/day</span>
              </text>
              <text fg={theme.textMuted}>{`24h at the current rate · ${tokens(stats().today)} today`}</text>
            </box>
          </Card>
          <Card title="Current burn rate">
            <text fg={theme.text}>
              <b>{tokens(stats().perHour)}</b>
              <span style={{ fg: theme.textMuted }}> tokens/hr</span>
            </text>
            <text fg={theme.textMuted}>measured over the trailing hour</text>
          </Card>
          <Card title={stats().savingsPerDay > 0 ? "Estimated daily savings" : "Estimated daily cost"}>
            <text fg={stats().savingsPerDay > 0 ? theme.success : theme.text}>
              <b>{money(stats().savingsPerDay > 0 ? stats().savingsPerDay : stats().costPerDay)}/day</b>
            </text>
            <text fg={theme.textMuted} wrapMode="word">
              {stats().savingsPerDay > 0
                ? `local models vs a cloud model at ${REFERENCE.label}`
                : "at the current rate on your models"}
            </text>
          </Card>
          <Card title="Agent tasks">
            <box flexDirection="row" gap={2} paddingTop={1}>
              <box>
                <Donut
                  width={14}
                  slices={slices().map((item) => ({ value: item.value, color: spaceColor(theme, item.color) }))}
                  track={tint(theme.background, theme.text, 0.14)}
                  background={theme.background}
                />
                <text fg={theme.text} wrapMode="none">
                  <b>{` ${work.state.deployments.length}`}</b>
                  <span style={{ fg: theme.textMuted }}> agents</span>
                </text>
              </box>
              <box flexGrow={1}>
                <For each={slices()}>
                  {(item) => (
                    <box
                      flexDirection="row"
                      onMouseUp={() => {
                        if (work.state.spaces.some((space) => space.id === item.key))
                          route.navigate({ type: "work", page: "spaces", id: item.key })
                      }}
                    >
                      <text flexGrow={1} wrapMode="none">
                        <span style={{ fg: spaceColor(theme, item.color) }}>● </span>
                        <span style={{ fg: theme.textMuted }}>{truncate(item.label, 12)}</span>
                      </text>
                      <text fg={theme.text}>{`${Math.round((item.value / Math.max(1, sliceTotal())) * 100)}%`}</text>
                    </box>
                  )}
                </For>
                <Show when={slices().length === 0}>
                  <text fg={theme.textMuted}>No runs yet today</text>
                </Show>
              </box>
            </box>
          </Card>
        </box>
        <box flexGrow={1} minHeight={0}>
          <box flexDirection="row" flexShrink={0}>
            <text fg={theme.text} flexGrow={1}>
              <b>Agent Calendar</b>
            </text>
            <text
              fg={zoom() === "day" ? theme.text : theme.textMuted}
              wrapMode="none"
              flexShrink={0}
              selectable={false}
              onMouseUp={() => setZoom("day")}
            >
              whole day{" "}
            </text>
            <text
              fg={theme.borderActive}
              wrapMode="none"
              flexShrink={0}
              selectable={false}
              onMouseUp={() => setZoom(zoom() === "day" ? "detail" : "day")}
            >
              {zoom() === "day" ? "●━━━━━━━━" : "━━━━━━━━●"}
            </text>
            <text
              fg={zoom() === "detail" ? theme.text : theme.textMuted}
              wrapMode="none"
              flexShrink={0}
              selectable={false}
              onMouseUp={() => setZoom("detail")}
            >
              {" detail"}
            </text>
            <text
              fg={live() ? theme.success : theme.textMuted}
              wrapMode="none"
              flexShrink={0}
              selectable={false}
              onMouseUp={toggleLive}
            >
              {live() ? "   ● Live" : "   ○ Live"}
            </text>
          </box>
          <text fg={theme.textMuted} flexShrink={0}>
            Every run today, in order. Zoom in to read them, out to see the size of the day. Enter opens that agent.
          </text>
          <box height={1} flexShrink={0} />
          <Show
            when={zoom() === "detail"}
            fallback={
              <box flexGrow={1} minHeight={0}>
                <For each={hours()}>
                  {(hour) => (
                    <box flexDirection="row" flexShrink={0} onMouseUp={() => openHour(hour.items)}>
                      <text fg={hour.hour === currentHour() ? theme.text : theme.textMuted} width={7} flexShrink={0}>
                        {`${String(hour.hour).padStart(2, "0")}:00`}
                      </text>
                      <text flexGrow={1} wrapMode="none">
                        <For each={hourBar(hour.items, busiest(), calendarWidth() - 22)}>
                          {(segment) => (
                            <span
                              style={{
                                fg: segment.upcoming
                                  ? tint(theme.background, spaceColor(theme, spaceOf(segment.deployment)?.color), 0.35)
                                  : spaceColor(theme, spaceOf(segment.deployment)?.color),
                              }}
                            >
                              {segment.text}
                            </span>
                          )}
                        </For>
                      </text>
                      <text fg={theme.textMuted} flexShrink={0}>
                        {hour.items.length ? `${count(hour.items.length)} runs` : ""}
                      </text>
                    </box>
                  )}
                </For>
              </box>
            }
          >
            <box
              flexGrow={1}
              minHeight={0}
              onMouseScroll={(event: { scroll?: { direction: string; delta: number } }) => {
                if (event.scroll?.direction === "up") move(-Math.max(1, event.scroll.delta))
                if (event.scroll?.direction === "down") move(Math.max(1, event.scroll.delta))
              }}
            >
              <For each={visible()}>
                {(entry, index) => (
                  <CalendarRow
                    entry={entry}
                    width={calendarWidth()}
                    space={spaceOf(entry.deployment)}
                    selected={windowStart() + index() === selected()}
                    showTime={index() === 0 || clock(visible()[index() - 1]?.at ?? 0) !== clock(entry.at)}
                    onClick={() =>
                      click(
                        windowStart() + index() === selected(),
                        () => {
                          setLive(false)
                          setSelected(windowStart() + index())
                        },
                        open,
                      )
                    }
                  />
                )}
              </For>
              <Show when={entries().length === 0}>
                <text fg={theme.textMuted}>No runs scheduled today. Create an agent to fill the calendar.</text>
              </Show>
            </box>
          </Show>
          <text fg={theme.textMuted} flexShrink={0}>
            {`${count(work.state.usage.runsToday)} runs today · ${count(work.state.usage.runsRemaining)} still to come`}
          </text>
        </box>
      </box>
      <box flexShrink={0} paddingTop={1}>
        <Hints
          items={[
            ["↑↓", "runs"],
            ["enter", "open agent", open],
            ["z", "zoom", () => setZoom(zoom() === "day" ? "detail" : "day")],
            ["l", "live", () => setLive(!live())],
            ["p", work.state.paused ? "resume" : "pause", () => void work.pause(!work.state.paused)],
            ["n", "create agent", () => void deploy()],
          ]}
        />
      </box>
    </box>
  )
}

function CalendarRow(props: {
  entry: Entry
  width: number
  space: { name: string; color: Parameters<typeof spaceColor>[1] } | undefined
  selected: boolean
  showTime: boolean
  onClick: () => void
}) {
  const { theme } = useTheme()
  const color = () => spaceColor(theme, props.space?.color)
  const running = () => props.entry.run?.status === "running"
  const upcoming = () => !props.entry.run
  const failed = () => props.entry.run?.status === "error"
  const background = () =>
    props.selected ? tint(theme.background, color(), 0.5) : tint(theme.background, color(), upcoming() ? 0.1 : 0.28)
  // Secondary text is mixed from the row's own background, so it stays readable over any space color and theme.
  const soft = () => tint(background(), theme.text, 0.6)
  const right = () => {
    if (running()) return "running"
    if (upcoming()) return "scheduled"
    if (failed()) return "failed"
    return `${tokens(props.entry.run ? runTokens(props.entry.run) : 0)} tok`
  }
  // Columns left after the time gutter, the border and the right-hand label.
  const room = () => Math.max(20, props.width - 22)
  const title = () => truncate(`Agent: ${props.entry.deployment?.title ?? "removed agent"}`, Math.ceil(room() * 0.62))
  const spaceName = () => (props.space ? truncate(props.space.name, room() - title().length - 2) : "")
  return (
    <box flexDirection="row" flexShrink={0} onMouseUp={props.onClick}>
      <text fg={theme.textMuted} width={7} flexShrink={0}>
        {props.showTime ? clock(props.entry.at) : ""}
      </text>
      <box
        flexGrow={1}
        flexDirection="row"
        backgroundColor={background()}
        border={running() ? true : ["left"]}
        borderStyle={running() ? "rounded" : "heavy"}
        borderColor={running() ? theme.error : color()}
        paddingRight={1}
      >
        <text flexGrow={1} wrapMode="none" fg={upcoming() ? theme.textMuted : theme.text}>
          {title()}
          <span style={{ fg: soft() }}>{spaceName() ? `  ${spaceName()}` : ""}</span>
        </text>
        <text fg={running() ? theme.error : failed() ? theme.error : soft()} flexShrink={0}>
          {right()}
        </text>
      </box>
    </box>
  )
}

/** One hour of runs as colored blocks, scaled against the busiest hour. */
function hourBar(items: ReadonlyArray<Entry>, busiest: number, width: number) {
  const cells = Math.max(0, Math.round((items.length / busiest) * Math.max(10, width)))
  if (cells === 0) return []
  const per = items.length / cells
  return Array.from({ length: cells }, (_, index) => items[Math.min(items.length - 1, Math.floor(index * per))]).reduce<
    { text: string; deployment: WorkDeployment | undefined; upcoming: boolean; key: string }[]
  >((segments, entry) => {
    const key = `${entry?.deployment?.spaceID ?? "none"}-${entry?.run ? "run" : "next"}`
    const last = segments.at(-1)
    if (last && last.key === key) {
      last.text += "▇"
      return segments
    }
    segments.push({ text: "▇", deployment: entry?.deployment, upcoming: !entry?.run, key })
    return segments
  }, [])
}
