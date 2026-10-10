import { createMemo, createSignal, For, Show } from "solid-js"
import { useTheme } from "../../context/theme"
import { DialogPrompt } from "../../ui/dialog-prompt"
import { useDialog } from "../../ui/dialog"
import { useWork } from "../context"
import { Empty, Hints, PageHeader, Button } from "../components"
import { ago } from "../format"
import { step, useFollowSelection, usePageKeys, usePressed } from "../keys"
import { Action, HoverRow } from "../hover"

export function MemoryPage() {
  const work = useWork()
  const dialog = useDialog()
  const { theme } = useTheme()
  const [selected, setSelected] = createSignal(0)
  const memories = createMemo(() => work.state.memories)
  const pressed = usePressed()
  const follow = useFollowSelection("memory", selected)
  const forget = () => {
    const memory = memories()[selected()]
    if (memory) void work.memory.remove(memory.id)
  }

  const add = async () => {
    const content = await DialogPrompt.show(dialog, "Remember", {
      placeholder: "Prefers briefs as short bullet points",
    })
    dialog.clear()
    if (content?.trim()) await work.memory.save(content.trim())
  }

  usePageKeys(() => [
    { key: "up,k", desc: "Previous memory", run: () => setSelected((index) => step(index, -1, memories().length)) },
    { key: "down,j", desc: "Next memory", run: () => setSelected((index) => step(index, 1, memories().length)) },
    { key: "n", desc: "Remember something", run: () => void add() },
    { key: "x", desc: "Forget", run: forget },
  ])

  return (
    <box flexGrow={1} minHeight={0} paddingLeft={2} paddingRight={2} paddingTop={1}>
      <PageHeader
        title="Memory"
        subtitle="What OpenWork remembers about you. Every chat and agent sees these facts; agents can save new ones."
        right={<Button label="+ Remember" active onClick={() => void add()} />}
      />
      <scrollbox ref={follow} flexGrow={1} minHeight={0} verticalScrollbarOptions={{ visible: false }}>
        <For each={memories()}>
          {(memory, index) => (
            <HoverRow
              id={`memory-${index()}`}
              flexDirection="row"
              paddingBottom={1}
              selected={index() === selected()}
              onClick={() => pressed() && setSelected(index())}
            >
              <text fg={theme.primary} flexShrink={0}>
                {"◍ "}
              </text>
              <text fg={theme.text} flexGrow={1} wrapMode="word">
                {memory.content}
              </text>
              <text fg={theme.textMuted} flexShrink={0}>
                {`${memory.source ? `${memory.source} · ` : ""}${ago(memory.time.created, work.now())}`}
              </text>
              <Show when={index() === selected()}>
                <Action
                  label="  ✕ forget"
                  pad={false}
                  stop
                  fg={theme.error}
                  hoverFg={theme.error}
                  base={theme.backgroundElement}
                  onClick={() => void work.memory.remove(memory.id)}
                />
              </Show>
            </HoverRow>
          )}
        </For>
        <Show when={memories().length === 0}>
          <Empty>Nothing yet. Press n, or tell OpenWork "remember that…" in any chat.</Empty>
        </Show>
      </scrollbox>
      <box flexShrink={0} paddingTop={1}>
        <Hints
          items={[
            ["↑↓", "select"],
            ["n", "remember", () => void add()],
            ["x", "forget", forget],
          ]}
        />
      </box>
    </box>
  )
}
