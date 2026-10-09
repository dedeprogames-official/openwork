import { createMemo, createSignal, For, Show } from "solid-js"
import { DialogModel } from "../../component/dialog-model"
import { DialogProvider } from "../../component/dialog-provider"
import { useLocal } from "../../context/local"
import { useSync } from "../../context/sync"
import { useTheme } from "../../context/theme"
import { useDialog } from "../../ui/dialog"
import { useWork } from "../context"
import { Empty, Hints, PageHeader, Pill, SectionTitle } from "../components"
import { tokens, truncate } from "../format"
import { step, usePageKeys } from "../keys"
import { isLocal } from "../stats"

export function ModelsPage() {
  const sync = useSync()
  const local = useLocal()
  const work = useWork()
  const dialog = useDialog()
  const { theme } = useTheme()
  const [selected, setSelected] = createSignal(0)
  const providers = createMemo(() =>
    sync.data.provider.toSorted(
      (a, b) =>
        Number(isLocal(b.id, sync.data.provider)) - Number(isLocal(a.id, sync.data.provider)) ||
        a.name.localeCompare(b.name),
    ),
  )
  const current = () => local.model.current()
  const usedToday = (providerID: string) =>
    work.state.usage.providers.find((item) => item.providerID === providerID)?.tokens ?? 0

  usePageKeys(() => [
    { key: "up,k", desc: "Previous provider", run: () => setSelected((index) => step(index, -1, providers().length)) },
    { key: "down,j", desc: "Next provider", run: () => setSelected((index) => step(index, 1, providers().length)) },
    {
      key: "return",
      desc: "Choose model",
      run: () => dialog.replace(() => <DialogModel providerID={providers()[selected()]?.id} />),
    },
    { key: "c", desc: "Connect provider", run: () => dialog.replace(() => <DialogProvider />) },
  ])

  return (
    <box flexGrow={1} minHeight={0} paddingLeft={2} paddingRight={2} paddingTop={1}>
      <PageHeader
        title="Models"
        subtitle="Local models keep agents private and free to run; cloud models handle the hard tasks."
        right={<Pill label="+ Connect provider" active onClick={() => dialog.replace(() => <DialogProvider />)} />}
      />
      <text fg={theme.textMuted} flexShrink={0}>
        <span style={{ fg: theme.text }}>Default model </span>
        {current() ? `${current()?.providerID}/${current()?.modelID}` : "none — connect a provider"}
      </text>
      <box height={1} flexShrink={0} />
      <scrollbox flexGrow={1} minHeight={0} verticalScrollbarOptions={{ visible: false }}>
        <For each={providers()}>
          {(provider, index) => (
            <box
              paddingBottom={1}
              backgroundColor={index() === selected() ? theme.backgroundElement : undefined}
              onMouseUp={() => {
                setSelected(index())
                dialog.replace(() => <DialogModel providerID={provider.id} />)
              }}
            >
              <box flexDirection="row">
                <text flexGrow={1} wrapMode="none">
                  <span style={{ fg: isLocal(provider.id, sync.data.provider) ? theme.success : theme.secondary }}>
                    {isLocal(provider.id, sync.data.provider) ? "◉ local  " : "◌ cloud  "}
                  </span>
                  <span style={{ fg: theme.text, bold: true }}>{provider.name}</span>
                  <span style={{ fg: theme.textMuted }}>{`  ${Object.keys(provider.models).length} models`}</span>
                </text>
                <text fg={theme.textMuted}>{`${tokens(usedToday(provider.id))} tokens today`}</text>
              </box>
              <text fg={theme.textMuted} wrapMode="none" paddingLeft={9}>
                {truncate(
                  Object.values(provider.models)
                    .slice(0, 6)
                    .map((model) => model.name)
                    .join(" · "),
                  110,
                )}
              </text>
            </box>
          )}
        </For>
        <Show when={providers().length === 0}>
          <Empty>No providers yet. Press c to connect one, or point OpenWork at a local model server.</Empty>
        </Show>
      </scrollbox>
      <box flexShrink={0}>
        <SectionTitle title="Tip" />
        <text fg={theme.textMuted} wrapMode="word">
          Agents run on the model they were deployed with. Ollama, LM Studio and any localhost endpoint count as local.
        </text>
      </box>
      <box flexShrink={0} paddingTop={1}>
        <Hints
          items={[
            ["↑↓", "select"],
            ["enter", "choose model"],
            ["c", "connect provider"],
          ]}
        />
      </box>
    </box>
  )
}
