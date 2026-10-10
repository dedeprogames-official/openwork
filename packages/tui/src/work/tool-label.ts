import type { ToolPart } from "@opencode-ai/sdk/v2"
import { clock } from "./format"

/** A friendly one-line description of a tool call: what it did, an optional detail, and what it says meanwhile. */
export type ToolLabel = {
  icon: string
  text: string
  detail?: string
  pending: string
  failure: string
}

/** OpenWork's own tools. The chat draws them with these labels instead of the generic tool block. */
export const WORK_TOOLS = new Set(["inbox", "user_todo", "agenda", "memory", "deploy"])

export function toolLabel(part: ToolPart): ToolLabel {
  const input = part.state.input ?? {}
  const metadata = part.state.status === "pending" ? {} : (part.state.metadata ?? {})
  const label = (Object.hasOwn(LABELS, part.tool) ? LABELS[part.tool] : fallback(part.tool))(input, metadata)
  return { ...label, failure: `${label.pending.replace(/…$/, "")} failed` }
}

type Values = Record<string, unknown>
type Label = Omit<ToolLabel, "failure">
type Step = { text: string; pending: string; detail?: string }

const LABELS: Record<string, (input: Values, metadata: Values) => Label> = {
  inbox: (input) => ({
    icon: "✉",
    text: input.priority === "high" ? "Sent you an urgent message" : "Sent you a message",
    detail: text(input.title),
    pending: "Writing to your inbox…",
  }),
  user_todo: (input, metadata) => {
    const content = text(metadata.content) ?? text(input.content)
    return action("☐", input.action, "Updating your todos…", {
      list: {
        text: "Checked your todos",
        pending: "Checking your todos…",
        detail: amount(metadata.open, "open", "open"),
      },
      add: { text: "Added a todo", pending: "Adding a todo…", detail: content },
      complete: { text: "Checked off a todo", pending: "Checking off a todo…", detail: content },
      reopen: { text: "Reopened a todo", pending: "Reopening a todo…", detail: content },
      remove: { text: "Removed a todo", pending: "Removing a todo…", detail: content },
    })
  },
  agenda: (input, metadata) => {
    const title = text(metadata.title) ?? text(input.title)
    const startsAt = typeof metadata.startsAt === "number" ? clock(metadata.startsAt) : text(input.starts_at)
    return action("◷", input.action, "Checking your agenda…", {
      list: { text: "Checked your agenda", pending: "Checking your agenda…", detail: amount(metadata.count, "event") },
      add: {
        text: "Added an event",
        pending: "Adding an event…",
        detail: title && startsAt ? `${title} at ${startsAt}` : title,
      },
      remove: { text: "Removed an event", pending: "Removing an event…", detail: title },
    })
  },
  memory: (input, metadata) => {
    const content = text(metadata.content) ?? text(input.content)
    return action("◍", input.action, "Checking your memories…", {
      list: {
        text: "Recalled your memories",
        pending: "Recalling your memories…",
        detail: amount(metadata.count, "memory", "memories"),
      },
      save: { text: "Remembered a memory", pending: "Remembering…", detail: content },
      forget: { text: "Forgot a memory", pending: "Forgetting a memory…", detail: content },
    })
  },
  deploy: (input, metadata) => {
    const title = text(metadata.title) ?? text(input.title)
    const space = text(metadata.space) ?? text(input.space)
    const created = [title ?? text(input.request), text(metadata.schedule)].filter(Boolean).join(" · ")
    return action("◉", input.action, "Managing your agents…", {
      list: { text: "Checked your agents", pending: "Checking your agents…", detail: amount(metadata.count, "agent") },
      create: { text: "Deployed an agent", pending: "Deploying an agent…", detail: created || undefined },
      run: { text: "Started an agent", pending: "Starting an agent…", detail: title },
      pause: { text: "Paused an agent", pending: "Pausing an agent…", detail: title },
      resume: { text: "Resumed an agent", pending: "Resuming an agent…", detail: title },
      remove: { text: "Removed an agent", pending: "Removing an agent…", detail: title },
      move: space
        ? { text: "Moved an agent", pending: "Moving an agent…", detail: title ? `${title} → ${space}` : space }
        : { text: "Took an agent out of its space", pending: "Moving an agent…", detail: title },
    })
  },
  // The rest have their own renderers in the chat; these labels are for compact lists such as the agent page.
  read: (input) => file("→", "Read", "Reading a file…", input.filePath),
  write: (input) => file("←", "Wrote", "Writing a file…", input.filePath),
  edit: (input) => file("←", "Edited", "Editing a file…", input.filePath),
  apply_patch: (_input, metadata) => ({
    icon: "←",
    text: "Edited files",
    detail: Array.isArray(metadata.files) ? amount(metadata.files.length, "file") : undefined,
    pending: "Editing files…",
  }),
  bash: (input) => ({
    icon: "$",
    text: "Ran a command",
    detail: text(input.description) ?? text(input.command),
    pending: "Running a command…",
  }),
  glob: (input, metadata) => ({
    icon: "✱",
    text: "Looked for files",
    detail: search(input.pattern, amount(metadata.count, "match", "matches")),
    pending: "Looking for files…",
  }),
  grep: (input, metadata) => ({
    icon: "✱",
    text: "Searched inside files",
    detail: search(input.pattern, amount(metadata.matches, "match", "matches")),
    pending: "Searching inside files…",
  }),
  webfetch: (input) => ({
    icon: "%",
    text: "Opened a web page",
    detail: host(input.url),
    pending: "Opening a web page…",
  }),
  websearch: (input) => ({
    icon: "◈",
    text: "Searched the web",
    detail: search(input.query),
    pending: "Searching the web…",
  }),
  task: (input) => ({
    icon: "│",
    text: "Handed off a task",
    detail: text(input.description),
    pending: "Handing off a task…",
  }),
  todowrite: () => ({ icon: "☐", text: "Updated its plan", pending: "Updating its plan…" }),
  question: () => ({ icon: "→", text: "Asked you a question", pending: "Asking you a question…" }),
  skill: (input) => ({ icon: "✦", text: "Used a skill", detail: text(input.name), pending: "Loading a skill…" }),
  execute: () => ({ icon: "$", text: "Ran a script", pending: "Running a script…" }),
}

function fallback(tool: string) {
  return (): Label => ({ icon: "⚙", text: `Used ${tool}`, pending: `Using ${tool}…` })
}

// Picks the label for the tool's action; while the input is still streaming the action may not be known yet.
function action(icon: string, name: unknown, pending: string, steps: Record<string, Step>): Label {
  const step = typeof name === "string" && Object.hasOwn(steps, name) ? steps[name] : undefined
  if (!step) return { icon, text: pending.replace(/…$/, ""), pending }
  return { icon, ...step }
}

function file(icon: string, verb: string, pending: string, path: unknown): Label {
  const name = text(path)?.split(/[\\/]/).at(-1)
  return { icon, text: name ? `${verb} ${name}` : `${verb} a file`, pending }
}

function search(pattern: unknown, found?: string) {
  const value = text(pattern)
  if (!value) return found
  return found ? `"${value}" · ${found}` : `"${value}"`
}

function host(url: unknown) {
  const value = text(url)
  if (!value || !URL.canParse(value)) return value
  return new URL(value).host
}

function amount(value: unknown, one: string, many = `${one}s`) {
  return typeof value === "number" ? `${value} ${value === 1 ? one : many}` : undefined
}

function text(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined
}
