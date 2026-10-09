import type { Session } from "@opencode-ai/sdk/v2"

/** OpenWork bookkeeping stored on `session.metadata.openwork`. */
export function workMeta(session: Pick<Session, "metadata"> | undefined) {
  const value = session?.metadata?.openwork
  if (!value || typeof value !== "object") return
  const kind = "kind" in value ? value.kind : undefined
  const deploymentID = "deploymentID" in value ? value.deploymentID : undefined
  if ((kind !== "run" && kind !== "chat") || typeof deploymentID !== "string") return
  return { kind, deploymentID }
}

/** Sessions that deployed agents created for their runs; hidden from chat lists. */
export function isWorkRun(session: Pick<Session, "metadata"> | undefined) {
  return workMeta(session)?.kind === "run"
}
