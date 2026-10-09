import { DialogPrompt } from "../ui/dialog-prompt"
import { DialogSelect } from "../ui/dialog-select"
import { useDialog, type DialogContext } from "../ui/dialog"
import { useToast } from "../ui/toast"
import { useWork } from "./context"

type Work = ReturnType<typeof useWork>
type Space = { id: string; name: string }

/**
 * Asks for a space: an existing one, a new one (named on the spot) or none. Resolves `null` for "No space" and
 * `undefined` when the dialog is dismissed.
 */
export async function chooseSpace(dialog: DialogContext, work: Work, title: string, current?: string) {
  const picked = await new Promise<string | undefined>((resolve) => {
    dialog.replace(
      () => (
        <DialogSelect
          title={title}
          current={current ?? ""}
          options={[
            { title: "No space", value: "", description: "keep it on its own" },
            ...work.state.spaces.map((item) => ({ title: item.name, value: item.id, description: item.goal })),
            { title: "New space…", value: "new", description: "group agents around a goal" },
          ]}
          onSelect={(option) => resolve(option.value)}
        />
      ),
      () => resolve(undefined),
    )
  })
  if (picked === undefined) return undefined
  if (picked === "") return null
  if (picked !== "new") return work.state.spaces.find((item) => item.id === picked)
  const name = await DialogPrompt.show(dialog, "New space", { placeholder: "Beach date - Half Moon Bay" })
  if (!name?.trim()) return undefined
  return work.space.create({ name: name.trim() })
}

/** Moves one agent into another space, or out of its space. */
export function useMoveToSpace() {
  const dialog = useDialog()
  const work = useWork()
  const move = useMove()
  return async (deploymentID: string) => {
    const agent = work.state.deployments.find((item) => item.id === deploymentID)
    if (!agent) return
    const space = await chooseSpace(dialog, work, `Move "${agent.title}" to`, agent.spaceID)
    dialog.clear()
    if (space !== undefined) await move(agent, space)
  }
}

/** Picks an agent from elsewhere and moves it into this space. */
export function useMoveIntoSpace() {
  const dialog = useDialog()
  const work = useWork()
  const move = useMove()
  return async (spaceID: string) => {
    const space = work.state.spaces.find((item) => item.id === spaceID)
    const others = work.state.deployments.filter((item) => item.spaceID !== spaceID)
    if (!space || others.length === 0) return
    const agentID = await new Promise<string | undefined>((resolve) => {
      dialog.replace(
        () => (
          <DialogSelect
            title={`Move an agent to ${space.name}`}
            options={others.map((item) => ({
              title: item.title,
              value: item.id,
              description: work.state.spaces.find((other) => other.id === item.spaceID)?.name ?? "no space",
            }))}
            onSelect={(option) => resolve(option.value)}
          />
        ),
        () => resolve(undefined),
      )
    })
    dialog.clear()
    const agent = others.find((item) => item.id === agentID)
    if (agent) await move(agent, space)
  }
}

function useMove() {
  const work = useWork()
  const toast = useToast()
  return async (agent: { id: string; title: string; spaceID?: string }, space: Space | null) => {
    if ((space?.id ?? undefined) === agent.spaceID) return
    const moved = await work.update(agent.id, { spaceID: space?.id ?? null })
    if (!moved) return
    toast.show({
      variant: "success",
      message: space ? `Moved "${agent.title}" to ${space.name}` : `"${agent.title}" no longer belongs to a space`,
    })
  }
}
