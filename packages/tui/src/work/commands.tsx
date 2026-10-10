import { useTuiConfig } from "../config"
import { useData } from "../context/data"
import { useKV } from "../context/kv"
import { useRoute } from "../context/route"
import { useSDK } from "../context/sdk"
import { useTuiPaths } from "../context/runtime"
import { OPENCODE_BASE_MODE, useBindings } from "../keymap"
import { useDialog } from "../ui/dialog"
import { useToast } from "../ui/toast"
import { useWork } from "./context"
import { useDeploy } from "./dialog-deploy"
import { useSettings } from "./dialog-settings"
import { PAGES } from "./nav"

export const workBindingCommands = [
  ...PAGES.map((item) => `work.page.${item.page}`),
  "work.deploy",
  "work.nav.toggle",
  "work.pause",
  "work.settings",
] as const

export function useNavCollapsed() {
  const kv = useKV()
  return [
    () => kv.get("work_nav_collapsed", false) === true,
    (value: boolean) => kv.set("work_nav_collapsed", value),
  ] as const
}

/** Palette commands, slash commands and keybinds for OpenWork. */
export function useWorkCommands() {
  const route = useRoute()
  const dialog = useDialog()
  const work = useWork()
  const deploy = useDeploy()
  const toast = useToast()
  const sdk = useSDK()
  const paths = useTuiPaths()
  const tuiConfig = useTuiConfig()
  const data = useData()
  const [collapsed, setCollapsed] = useNavCollapsed()
  const openSettings = useSettings()

  useBindings(() => ({
    commands: [
      ...PAGES.map((item) => ({
        name: `work.page.${item.page}`,
        title: `Go to ${item.label}`,
        category: "OpenWork",
        namespace: "palette",
        slashName: item.page,
        run: () => {
          route.navigate({ type: "work", page: item.page })
          dialog.clear()
        },
      })),
      {
        name: "work.deploy",
        title: "Deploy an agent",
        category: "OpenWork",
        namespace: "palette",
        suggested: true,
        slashName: "deploy",
        slashArgs: (args: string) => void deploy(args),
        run: () => void deploy(),
      },
      {
        name: "work.pause",
        title: work.state.paused ? "Resume agents" : "Pause agents",
        category: "OpenWork",
        namespace: "palette",
        slashName: "pause",
        run: () => {
          void work.pause(!work.state.paused)
          dialog.clear()
        },
      },
      {
        name: "work.settings",
        title: "Open settings",
        category: "OpenWork",
        namespace: "palette",
        suggested: true,
        slashName: "settings",
        run: () => openSettings(),
      },
      {
        name: "work.nav.toggle",
        title: "Toggle navigation",
        category: "OpenWork",
        namespace: "palette",
        run: () => {
          setCollapsed(!collapsed())
          dialog.clear()
        },
      },
      {
        name: "work.demo",
        title: "Load demo workspace",
        category: "OpenWork",
        namespace: "palette",
        slashName: "demo",
        run: async () => {
          dialog.clear()
          const result = await work.demo(sdk.directory ?? paths.cwd)
          if (!result) return
          // The server reopens the folder after seeding, so the demo's project skills are discoverable now.
          await data.location.skill.refresh().catch(() => undefined)
          toast.show({
            variant: "success",
            message: `Loaded ${result.agents} demo agents in ${result.spaces} spaces. They start paused: /pause to let them run.`,
            duration: 6000,
          })
          route.navigate({ type: "work", page: "day" })
        },
      },
    ],
  }))

  useBindings(() => ({
    mode: OPENCODE_BASE_MODE,
    bindings: tuiConfig.keybinds.gather("work", workBindingCommands),
  }))
}
