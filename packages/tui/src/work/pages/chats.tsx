import { createMemo, createSignal, For, Show } from "solid-js"
import { useRoute } from "../../context/route"
import { useSync } from "../../context/sync"
import { useTheme } from "../../context/theme"
import { useTuiPaths } from "../../context/runtime"
import { useWork } from "../context"
import { Empty, Hints, PageHeader, Pill } from "../components"
import { ago, tokens, truncate } from "../format"
import { step, useFollowSelection, usePageKeys, usePressed } from "../keys"
import { useOpencodeKeymap } from "../../keymap"
import { isWorkRun, workMeta } from "../session"

export function ChatsPage() {
  const sync = useSync()
  const work = useWork()
  const route = useRoute()
  const paths = useTuiPaths()
  const { theme } = useTheme()
  const [selected, setSelected] = createSignal(0)
  const sessions = createMemo(() =>
    sync.data.session
      .filter((session) => !session.parentID && !isWorkRun(session) && !session.time.archived)
      .toSorted((a, b) => b.time.updated - a.time.updated),
  )
  const agentOf = (id: string | undefined) => work.state.deployments.find((item) => item.id === id)?.title
  const keymap = useOpencodeKeymap()
  const pressed = usePressed()
  const follow = useFollowSelection("chat", selected)
  const open = () => {
    const session = sessions()[selected()]
    if (session) route.navigate({ type: "session", sessionID: session.id })
  }

  usePageKeys(() => [
    { key: "up,k", desc: "Previous chat", run: () => setSelected((index) => step(index, -1, sessions().length)) },
    { key: "down,j", desc: "Next chat", run: () => setSelected((index) => step(index, 1, sessions().length)) },
    { key: "return", desc: "Open chat", run: open },
    { key: "n", desc: "New chat", run: () => route.navigate({ type: "home" }) },
  ])

  return (
    <box flexGrow={1} minHeight={0} paddingLeft={2} paddingRight={2} paddingTop={1}>
      <PageHeader
        title="Chats"
        subtitle="Conversations with OpenWork. Agent runs live on their agent's page."
        right={<Pill label="+ New chat" active onClick={() => route.navigate({ type: "home" })} />}
      />
      <scrollbox ref={follow} flexGrow={1} minHeight={0} verticalScrollbarOptions={{ visible: false }}>
        <For each={sessions()}>
          {(session, index) => (
            <box
              id={`chat-${index()}`}
              flexDirection="row"
              paddingBottom={1}
              backgroundColor={index() === selected() ? theme.backgroundElement : undefined}
              onMouseUp={() => pressed() && route.navigate({ type: "session", sessionID: session.id })}
            >
              <box flexGrow={1}>
                <text fg={theme.text} wrapMode="none">
                  {truncate(session.title, 90)}
                </text>
                <text fg={theme.textMuted} wrapMode="none">
                  {[
                    session.directory.replace(paths.home, "~"),
                    session.agent ?? "work",
                    ...(workMeta(session)?.kind === "chat"
                      ? [`about ${agentOf(workMeta(session)?.deploymentID)}`]
                      : []),
                    ...(session.tokens ? [`${tokens(session.tokens.input + session.tokens.output)} tokens`] : []),
                  ].join(" · ")}
                </text>
              </box>
              <text fg={theme.textMuted} flexShrink={0}>
                {ago(session.time.updated, work.now())}
              </text>
            </box>
          )}
        </For>
        <Show when={sessions().length === 0}>
          <Empty>No chats yet. Press n or "+ New chat" to start one.</Empty>
        </Show>
      </scrollbox>
      <box flexShrink={0} paddingTop={1}>
        <Hints
          items={[
            ["↑↓", "select"],
            ["enter", "open", open],
            ["n", "new chat", () => route.navigate({ type: "home" })],
            ["ctrl+x l", "all sessions", () => keymap.dispatchCommand("session.list")],
          ]}
        />
      </box>
    </box>
  )
}
