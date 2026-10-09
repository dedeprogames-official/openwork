import { createMemo, createSignal, For, onMount, Show } from "solid-js"
import { useData } from "../../context/data"
import { useRoute } from "../../context/route"
import { useTheme } from "../../context/theme"
import { useTuiPaths } from "../../context/runtime"
import { Empty, Hints, PageHeader, Pill } from "../components"
import { truncate } from "../format"
import { step, useFollowSelection, usePageKeys, useRowClick } from "../keys"

export function SkillsPage() {
  const data = useData()
  const route = useRoute()
  const paths = useTuiPaths()
  const { theme } = useTheme()
  const [selected, setSelected] = createSignal(0)
  const skills = createMemo(() => (data.location.skill.list() ?? []).toSorted((a, b) => a.name.localeCompare(b.name)))
  const skill = createMemo(() => skills()[selected()])
  const click = useRowClick()
  const follow = useFollowSelection("skill", selected)
  onMount(() => void data.location.skill.refresh().catch(() => undefined))

  const use = () => {
    const current = skill()
    if (!current) return
    route.navigate({ type: "home", prompt: { input: `Use the ${current.name} skill to `, parts: [] } })
  }

  usePageKeys(() => [
    { key: "up,k", desc: "Previous skill", run: () => setSelected((index) => step(index, -1, skills().length)) },
    { key: "down,j", desc: "Next skill", run: () => setSelected((index) => step(index, 1, skills().length)) },
    { key: "return", desc: "Use skill in a chat", run: use },
    { key: "r", desc: "Reload skills", run: () => void data.location.skill.refresh() },
  ])

  return (
    <box flexGrow={1} minHeight={0} paddingLeft={2} paddingRight={2} paddingTop={1}>
      <PageHeader
        title="Skills"
        subtitle="Reusable instructions your chats and agents load when a task matches. Add SKILL.md files to .opencode/skills or ~/.agents/skills."
      />
      <box flexDirection="row" flexGrow={1} minHeight={0} gap={3}>
        <scrollbox ref={follow} width={44} flexShrink={0} verticalScrollbarOptions={{ visible: false }}>
          <For each={skills()}>
            {(item, index) => (
              <box
                id={`skill-${index()}`}
                paddingBottom={1}
                backgroundColor={index() === selected() ? theme.backgroundElement : undefined}
                onMouseUp={() => click(index() === selected(), () => setSelected(index()), use)}
              >
                <text fg={theme.text} wrapMode="none">
                  <span style={{ fg: theme.primary }}>✦ </span>
                  {item.name}
                </text>
                <text fg={theme.textMuted} wrapMode="none">
                  {"  " + truncate(item.description ?? "", 40)}
                </text>
              </box>
            )}
          </For>
          <Show when={skills().length === 0}>
            <Empty>No skills found. Create a SKILL.md in .opencode/skills/name/ and press r.</Empty>
          </Show>
        </scrollbox>
        <box flexGrow={1} minHeight={0}>
          <Show when={skill()}>
            {(current) => (
              <>
                <text fg={theme.text} flexShrink={0}>
                  <b>{current().name}</b>
                </text>
                <text fg={theme.textMuted} flexShrink={0}>
                  {current().location.replace(paths.home, "~")}
                </text>
                <box flexDirection="row" flexShrink={0} paddingTop={1} paddingBottom={1}>
                  <Pill label="▷ Use in a chat" active onClick={use} />
                </box>
                <scrollbox flexGrow={1} minHeight={0} verticalScrollbarOptions={{ visible: false }}>
                  <text fg={theme.text} wrapMode="word">
                    {current().content.trim()}
                  </text>
                </scrollbox>
              </>
            )}
          </Show>
        </box>
      </box>
      <box flexShrink={0} paddingTop={1}>
        <Hints
          items={[
            ["↑↓", "select"],
            ["enter", "use in a chat", use],
            ["r", "reload", () => void data.location.skill.refresh()],
          ]}
        />
      </box>
    </box>
  )
}
