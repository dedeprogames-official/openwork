import path from "path"
import type { WorkAccess, WorkDeployment } from "@opencode-ai/sdk/v2"
import { WorkSchedule } from "@opencode-ai/core/work/schedule"
import { useLocal } from "../context/local"
import { useRoute } from "../context/route"
import { useSDK } from "../context/sdk"
import { useTuiPaths } from "../context/runtime"
import { DialogPrompt } from "../ui/dialog-prompt"
import { DialogSelect, type DialogSelectOption } from "../ui/dialog-select"
import { useDialog, type DialogContext } from "../ui/dialog"
import { useToast } from "../ui/toast"
import { abbreviateHome } from "../runtime"
import { useWork } from "./context"
import { ACCESS, schedule as label } from "./format"

/**
 * Instant deploy: describe the agent in one line ("check the beach cam every 10m"), then press enter through
 * folder, space and access defaults. The agent is created and its first run starts right away.
 */
export function useDeploy() {
  const dialog = useDialog()
  const work = useWork()
  const local = useLocal()
  const route = useRoute()
  const sdk = useSDK()
  const paths = useTuiPaths()
  const toast = useToast()

  return async (initial?: string) => {
    const text = initial?.trim()
      ? initial.trim()
      : await DialogPrompt.show(dialog, "Deploy an agent", {
          placeholder: "Check the Half Moon Bay cam every 10m and tell me if it's sunny",
          description: () => (
            <text>Say what it should do and when: "every 10m", "hourly", "every morning at 8", "at 5pm" or "now".</text>
          ),
        })
    if (!text?.trim()) return dialog.clear()
    const parsed = WorkSchedule.parse(text, Date.now())

    const cwd = sdk.directory ?? paths.cwd
    const folders = Array.from(new Set([cwd, ...work.state.deployments.map((item) => item.directory)])).slice(0, 8)
    const folder = await choose<string>(dialog, "Where should it work?", [
      ...folders.map((item, index) => ({
        title: abbreviateHome(item, paths.home),
        value: item,
        description: index === 0 ? "current folder" : "used by other agents",
      })),
      { title: "Other folder…", value: "", description: "type a path" },
    ])
    if (folder === undefined) return
    const directory = folder
      ? folder
      : await DialogPrompt.show(dialog, "Folder", { placeholder: cwd, value: cwd }).then((value) =>
          value?.trim() ? path.resolve(cwd, value.trim()) : undefined,
        )
    if (!directory) return dialog.clear()

    const space = await choose<string>(dialog, "Space", [
      { title: "No space", value: "", description: "keep it on its own" },
      ...work.state.spaces.map((item) => ({ title: item.name, value: item.id, description: item.goal })),
      { title: "New space…", value: "new", description: "group agents around a goal" },
    ])
    if (space === undefined) return
    const spaceID =
      space === "new"
        ? await DialogPrompt.show(dialog, "New space", { placeholder: "Beach date - Half Moon Bay" }).then((name) =>
            name?.trim() ? work.space.create({ name: name.trim() }).then((created) => created?.id) : undefined,
          )
        : space || undefined

    const when = await choose<WorkDeployment["schedule"]>(dialog, `When should "${parsed.title}" run?`, [
      { title: label(parsed.schedule), value: parsed.schedule, description: "from your description" },
      ...[
        { type: "interval" as const, every: 10 * 60_000 },
        { type: "interval" as const, every: 60 * 60_000 },
        { type: "daily" as const, at: "08:00" },
        { type: "once" as const, at: Date.now() },
        { type: "manual" as const },
      ]
        .filter((item) => label(item) !== label(parsed.schedule))
        .map((item) => ({ title: label(item), value: item })),
    ])
    if (when === undefined) return

    const access = await choose<WorkAccess>(dialog, "What may it do?", [
      { title: ACCESS.read, value: "read", description: "read files, browse the web, post to your inbox" },
      { title: ACCESS.write, value: "write", description: "also create and edit files in its folder" },
      { title: ACCESS.full, value: "full", description: "every tool you allow, including shell commands" },
    ])
    if (access === undefined) return
    dialog.clear()

    const model = local.model.current()
    const deployment = await work.deploy({
      title: parsed.title,
      task: parsed.task,
      directory,
      schedule: when,
      access,
      runNow: true,
      ...(spaceID ? { spaceID } : {}),
      ...(model ? { model: { providerID: model.providerID, modelID: model.modelID } } : {}),
    })
    if (!deployment) return
    toast.show({ variant: "success", message: `Deployed "${deployment.title}" · ${label(deployment.schedule)}` })
    route.navigate({ type: "work", page: "agent", id: deployment.id })
  }
}

function choose<T>(dialog: DialogContext, title: string, options: DialogSelectOption<T>[]) {
  return new Promise<T | undefined>((resolve) => {
    dialog.replace(
      () => <DialogSelect title={title} options={options} onSelect={(option) => resolve(option.value)} />,
      () => resolve(undefined),
    )
  })
}
