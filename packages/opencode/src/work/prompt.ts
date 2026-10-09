export * as WorkPrompt from "./prompt"

import { Work } from "@opencode-ai/core/work"
import { WorkSchedule } from "@opencode-ai/core/work/schedule"

const ACCESS: Record<Work.Access, string> = {
  read: "read files and use the network; you cannot change files",
  write: "read and write files in your folder and use the network",
  full: "use every tool the user allows, including shell commands",
}

/** The user message that starts one unattended run of a deployed agent. */
export function run(deployment: Work.Deployment, run: Pick<Work.Run, "number">, previous?: Work.Run) {
  return [
    `Run #${run.number} of your deployed task "${deployment.title}" (${WorkSchedule.label(deployment.schedule)}).`,
    "",
    "Task:",
    deployment.task,
    "",
    ...(deployment.skill ? [`Use the \`${deployment.skill}\` skill for this task.`, ""] : []),
    ...(previous?.summary ? [`Your previous run (#${previous.number}) concluded: ${previous.summary}`, ""] : []),
    "Nobody is watching this run. Do not ask questions; make reasonable assumptions and finish.",
    "Post to the user's inbox with the `inbox` tool only when they need to know something or act on it.",
    "Add follow-ups the user must do to their list with the `user_todo` tool.",
    "End with one or two sentences that state the result of this run.",
  ].join("\n")
}

/** System context for OpenWork sessions: saved memories and, for deployed agents, what they are deployed to do. */
export function context(input: {
  readonly memories: ReadonlyArray<Work.Memory>
  readonly deployment?: Work.Deployment
  readonly runs?: ReadonlyArray<Work.Run>
  readonly space?: Work.Space
}) {
  const memory = input.memories.length
    ? [
        "<user_memory>",
        "Things the user asked you to remember. Use them when relevant; save new ones with the `memory` tool.",
        ...input.memories.map((item) => `- ${item.content}`),
        "</user_memory>",
      ].join("\n")
    : undefined
  const deployment = input.deployment
  const agent = deployment
    ? [
        "<openwork_agent>",
        `You are the deployed OpenWork agent "${deployment.title}".`,
        ...(input.space ? [`Space: ${input.space.name}${input.space.goal ? ` - ${input.space.goal}` : ""}`] : []),
        `Task: ${deployment.task}`,
        `Schedule: ${WorkSchedule.label(deployment.schedule)}`,
        `Folder: ${deployment.directory}`,
        `Access: ${ACCESS[deployment.access]}`,
        ...(input.runs?.length
          ? [
              "Recent runs:",
              ...input.runs.map(
                (item) =>
                  `- #${item.number} ${item.status}${item.summary ? `: ${item.summary}` : ""}${item.error ? `: ${item.error}` : ""}`,
              ),
            ]
          : []),
        "</openwork_agent>",
      ].join("\n")
    : undefined
  const parts = [memory, agent].filter((part): part is string => part !== undefined)
  if (parts.length === 0) return
  return parts.join("\n\n")
}
