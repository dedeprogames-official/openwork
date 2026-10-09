export * as WorkSession from "./session"

import { Work } from "@opencode-ai/core/work"

/** OpenWork bookkeeping stored on `session.metadata.openwork`. */
export type Meta = {
  readonly kind: "run" | "chat"
  readonly deploymentID: Work.DeploymentID
  readonly runID?: Work.RunID
}

export function meta(metadata: Record<string, unknown> | undefined): Meta | undefined {
  const value = metadata?.openwork
  if (!value || typeof value !== "object") return
  const kind = "kind" in value ? value.kind : undefined
  const deploymentID = "deploymentID" in value ? value.deploymentID : undefined
  const runID = "runID" in value ? value.runID : undefined
  if (kind !== "run" && kind !== "chat") return
  if (typeof deploymentID !== "string") return
  return {
    kind,
    deploymentID: Work.DeploymentID.make(deploymentID),
    ...(typeof runID === "string" ? { runID: Work.RunID.make(runID) } : {}),
  }
}

export function metadata(input: Meta) {
  return { openwork: input }
}
