import { createMemo, createSignal, For, Show } from "solid-js"
import { useTheme } from "../../context/theme"
import { DialogPrompt } from "../../ui/dialog-prompt"
import { useDialog } from "../../ui/dialog"
import { useWork } from "../context"
import { Empty, Hints, PageHeader, Pill } from "../components"
import { ago } from "../format"
import { step, usePageKeys } from "../keys"

export function MemoryPage() {
  const work = useWork()
  const dialog = useDialog()
  const { theme } = useTheme()
  const [selected, setSelected] = createSignal(0)
  const memories = createMemo(() => work.state.memories)

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
    {
      key: "x",
      desc: "Forget",
      run: () => {
        const memory = memories()[selected()]
        if (memory) void work.memory.remove(memory.id)
      },
    },
  ])

  return (
    <box flexGrow={1} minHeight={0} paddingLeft={2} paddingRight={2} paddingTop={1}>
      <PageHeader
        title="Memory"
        subtitle="What OpenWork remembers about you. Every chat and agent sees these facts; agents can save new ones."
        right={<Pill label="+ Remember" active onClick={() => void add()} />}
      />
      <scrollbox flexGrow={1} minHeight={0} verticalScrollbarOptions={{ visible: false }}>
        <For each={memories()}>
          {(memory, index) => (
            <box
              flexDirection="row"
              paddingBottom={1}
              backgroundColor={index() === selected() ? theme.backgroundElement : undefined}
              onMouseUp={() => setSelected(index())}
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
            </box>
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
            ["n", "remember"],
            ["x", "forget"],
          ]}
        />
      </box>
    </box>
  )
}
