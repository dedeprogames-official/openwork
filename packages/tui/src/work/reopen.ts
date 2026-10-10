import { createEffect, untrack } from "solid-js"
import { useArgs } from "../context/args"
import { useKV } from "../context/kv"
import { useRoute, WorkPages, type Route } from "../context/route"
import { useTuiStartup } from "../context/runtime"
import { useSDK } from "../context/sdk"
import { useWork } from "./context"

type Page = { type: "home" } | { type: "session"; sessionID: string } | Extract<Route, { type: "work" }>

/** OpenWork reopens the page or chat you were on, unless the command line asked for something else. */
export function useReopenLastPage() {
  const route = useRoute()
  const kv = useKV()
  const args = useArgs()
  const startup = useTuiStartup()
  const sdk = useSDK()
  const work = useWork()
  const state = { decided: false }

  createEffect(() => {
    if (state.decided || !kv.ready || !work.loaded) return
    state.decided = true
    untrack(() => {
      const last = page(kv.get("last_page"))
      if (!last || args.continue || args.prompt || args.sessionID || startup.initialRoute) return
      // Only replace the start page; anything the user already opened wins.
      const untouched = () => route.data.type === "work" && route.data.page === "day"
      if (!untouched()) return
      if (last.type !== "session") {
        if (
          last.type === "work" &&
          last.page === "agent" &&
          !work.state.deployments.some((item) => item.id === last.id)
        )
          return
        route.navigate(last)
        return
      }
      // A chat removed since last time is skipped instead of failing with "Session not found".
      void sdk.client.session
        .get({ sessionID: last.sessionID })
        .then((result) => {
          if (result.data && untouched()) route.navigate(last)
        })
        .catch(() => undefined)
    })
  })

  createEffect(() => {
    const current = page(route.data)
    if (current && state.decided) kv.set("last_page", current)
  })
}

function page(value: unknown): Page | undefined {
  if (!value || typeof value !== "object" || !("type" in value)) return
  if (value.type === "home") return { type: "home" }
  if (value.type === "session" && "sessionID" in value && typeof value.sessionID === "string")
    return { type: "session", sessionID: value.sessionID }
  if (value.type !== "work" || !("page" in value)) return
  const name = WorkPages.find((item) => item === value.page)
  if (!name) return
  return { type: "work", page: name, ...("id" in value && typeof value.id === "string" ? { id: value.id } : {}) }
}
