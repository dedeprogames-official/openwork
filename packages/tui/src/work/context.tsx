import type {
  WorkAgendaCreate,
  WorkDeploymentCreate,
  WorkDeploymentPatch,
  WorkSpaceCreate,
  WorkState,
} from "@opencode-ai/sdk/v2"
import { createSignal, onCleanup } from "solid-js"
import { createStore, reconcile } from "solid-js/store"
import { createSimpleContext } from "../context/helper"
import { useEvent } from "../context/event"
import { useSDK } from "../context/sdk"
import { useToast } from "../ui/toast"

const empty: WorkState = {
  now: 0,
  paused: false,
  spaces: [],
  deployments: [],
  latest: [],
  runs: [],
  upcoming: [],
  messages: [],
  todos: [],
  agenda: [],
  memories: [],
  usage: { today: { tokens: 0, cost: 0 }, hour: { tokens: 0, cost: 0 }, providers: [], runsToday: 0, runsRemaining: 0 },
}

/** OpenWork dashboard state: loaded from `/work/state`, refreshed on `work.updated` and session activity. */
export const { use: useWork, provider: WorkProvider } = createSimpleContext({
  name: "Work",
  init: () => {
    const sdk = useSDK()
    const event = useEvent()
    const toast = useToast()
    const [store, setStore] = createStore({ state: empty, loaded: false })
    const [now, setNow] = createSignal(Date.now())
    const timer = { refresh: undefined as ReturnType<typeof setTimeout> | undefined }

    const refresh = () =>
      sdk.client.work
        .state()
        .then((result) => {
          if (!result.data) return
          setStore("state", reconcile(result.data))
          setStore("loaded", true)
        })
        .catch(() => undefined)

    const schedule = () => {
      if (timer.refresh) clearTimeout(timer.refresh)
      timer.refresh = setTimeout(() => void refresh(), 150)
    }

    // Report failures without throwing: the dashboard keeps showing the last known state.
    const act = <T,>(promise: Promise<{ data?: T; error?: unknown }>, success?: string) =>
      promise
        .then((result) => {
          if (result.error) {
            toast.show({ variant: "error", message: message(result.error) })
            return
          }
          if (success) toast.show({ variant: "success", message: success })
          schedule()
          return result.data
        })
        .catch((error) => {
          toast.show({ variant: "error", message: message(error) })
          return undefined
        })

    void refresh()
    const unsubscribe = event.on("work.updated", schedule)
    // Agents may run in another OpenWork process; poll so its runs still show up here.
    const poll = setInterval(() => void refresh(), 15_000)
    const tick = setInterval(() => setNow(Date.now()), 1_000)
    onCleanup(() => {
      unsubscribe?.()
      clearInterval(poll)
      clearInterval(tick)
      if (timer.refresh) clearTimeout(timer.refresh)
    })

    return {
      get state() {
        return store.state
      },
      get loaded() {
        return store.loaded
      },
      now,
      refresh,
      pause: (paused: boolean) =>
        act(sdk.client.work.pause({ workPauseInput: { paused } }), paused ? "Agents paused" : "Agents resumed"),
      demo: (directory: string) => act(sdk.client.work.demo({ workDemoInput: { directory } })),
      deploy: (input: WorkDeploymentCreate) => act(sdk.client.work.deployment.create({ workDeploymentCreate: input })),
      update: (deploymentID: string, patch: WorkDeploymentPatch) =>
        act(sdk.client.work.deployment.update({ deploymentID, workDeploymentPatch: patch })),
      remove: (deploymentID: string) => act(sdk.client.work.deployment.remove({ deploymentID }), "Agent removed"),
      run: (deploymentID: string) => act(sdk.client.work.deployment.run({ deploymentID })),
      chat: (deploymentID: string) => act(sdk.client.work.deployment.chat({ deploymentID })),
      space: {
        create: (input: WorkSpaceCreate) => act(sdk.client.work.space.create({ workSpaceCreate: input })),
        remove: (spaceID: string) => act(sdk.client.work.space.remove({ spaceID }), "Space removed"),
      },
      message: {
        read: (messageID: string) =>
          act(sdk.client.work.message.update({ messageID, workMessagePatch: { read: true } })),
        done: (messageID: string, done: boolean) =>
          act(sdk.client.work.message.update({ messageID, workMessagePatch: { done } })),
        remove: (messageID: string) => act(sdk.client.work.message.remove({ messageID })),
        clear: (done: boolean) =>
          act(sdk.client.work.message.clear({ workMessageClear: { done } })).then((result) => {
            if (result)
              toast.show({
                variant: "success",
                message: `Removed ${result.removed} message${result.removed === 1 ? "" : "s"}`,
              })
            return result
          }),
      },
      todo: {
        add: (content: string) => act(sdk.client.work.todo.create({ workTodoCreate: { content } })),
        toggle: (todoID: string, done: boolean) =>
          act(sdk.client.work.todo.update({ todoID, workTodoPatch: { done } })),
        remove: (todoID: string) => act(sdk.client.work.todo.remove({ todoID })),
      },
      agenda: {
        add: (input: WorkAgendaCreate) => act(sdk.client.work.agenda.create({ workAgendaCreate: input })),
        remove: (agendaID: string) => act(sdk.client.work.agenda.remove({ agendaID })),
      },
      memory: {
        save: (content: string) =>
          act(sdk.client.work.memory.create({ workMemoryCreate: { content, source: "you" } }), "Remembered"),
        remove: (memoryID: string) => act(sdk.client.work.memory.remove({ memoryID })),
      },
    }
  },
})

export type WorkContext = ReturnType<typeof useWork>

function message(error: unknown) {
  if (error && typeof error === "object" && "message" in error && typeof error.message === "string")
    return error.message
  if (error && typeof error === "object" && "data" in error) return message(error.data)
  return String(error)
}
