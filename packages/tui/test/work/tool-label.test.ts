import { describe, expect, test } from "bun:test"
import type { ToolPart } from "@opencode-ai/sdk/v2"
import { toolLabel } from "../../src/work/tool-label"

const done = (tool: string, input: Record<string, unknown>, metadata: Record<string, unknown> = {}): ToolPart => ({
  id: "prt_1",
  sessionID: "ses_1",
  messageID: "msg_1",
  type: "tool",
  callID: "call_1",
  tool,
  state: { status: "completed", input, output: "", title: "", metadata, time: { start: 0, end: 1 } },
})

const line = (part: ToolPart) => {
  const label = toolLabel(part)
  return label.detail ? `${label.text} · ${label.detail}` : label.text
}

describe("tool labels", () => {
  test("OpenWork tools read as friendly sentences", () => {
    expect(line(done("memory", { action: "save", content: "Dog is called Biscuit" }))).toBe(
      "Remembered a memory · Dog is called Biscuit",
    )
    expect(line(done("memory", { action: "list" }, { count: 1 }))).toBe("Recalled your memories · 1 memory")
    expect(line(done("memory", { action: "forget", id: "wmm_1" }, { content: "Likes tea" }))).toBe(
      "Forgot a memory · Likes tea",
    )
    expect(line(done("deploy", { action: "list" }, { count: 3 }))).toBe("Checked your agents · 3 agents")
    expect(
      line(
        done(
          "deploy",
          { action: "create", request: "check the beach every 10m" },
          { title: "Check the beach", schedule: "every 10m" },
        ),
      ),
    ).toBe("Deployed an agent · Check the beach · every 10m")
    expect(line(done("deploy", { action: "move", id: "wdp_1", space: "Markets" }, { title: "Rates" }))).toBe(
      "Moved an agent · Rates → Markets",
    )
    expect(line(done("deploy", { action: "move", id: "wdp_1" }, { title: "Rates" }))).toBe(
      "Took an agent out of its space · Rates",
    )
    expect(line(done("inbox", { title: "Tonight's conditions", message: "Go at 5pm", priority: "high" }))).toBe(
      "Sent you an urgent message · Tonight's conditions",
    )
    expect(line(done("user_todo", { action: "list" }, { open: 2 }))).toBe("Checked your todos · 2 open")
    expect(line(done("user_todo", { action: "complete", id: "wtd_1" }, { content: "Book a table" }))).toBe(
      "Checked off a todo · Book a table",
    )
    const startsAt = new Date(2026, 9, 10, 14, 30).getTime()
    expect(line(done("agenda", { action: "add", title: "Call with Ana", starts_at: "14:30" }, { startsAt }))).toBe(
      "Added an event · Call with Ana at 14:30",
    )
  })

  test("built-in tools get short labels for the agent page", () => {
    expect(line(done("read", { filePath: "/home/me/notes/today.md" }))).toBe("Read today.md")
    expect(line(done("webfetch", { url: "https://surf.example.com/cams/half-moon-bay" }))).toBe(
      "Opened a web page · surf.example.com",
    )
    expect(line(done("websearch", { query: "half moon bay tides" }))).toBe('Searched the web · "half moon bay tides"')
    expect(line(done("bash", { command: "ls -la", description: "List the folder" }))).toBe(
      "Ran a command · List the folder",
    )
    expect(line(done("github_create_issue", { title: "x" }))).toBe("Used github_create_issue")
    expect(line(done("toString", {}))).toBe("Used toString")
  })

  test("calls still running or failed say what they were doing", () => {
    const running: ToolPart = {
      ...done("memory", { action: "save", content: "x" }),
      state: { status: "running", input: { action: "save", content: "x" }, time: { start: 0 } },
    }
    expect(toolLabel(running).pending).toBe("Remembering…")
    const failed: ToolPart = {
      ...done("user_todo", { action: "remove", id: "wtd_9" }),
      state: {
        status: "error",
        input: { action: "remove", id: "wtd_9" },
        error: "No todo with id wtd_9.",
        time: { start: 0, end: 1 },
      },
    }
    expect(toolLabel(failed).failure).toBe("Removing a todo failed")
    // While the input streams in, the action is not known yet.
    const streaming: ToolPart = {
      ...done("deploy", {}),
      state: { status: "pending", input: {}, raw: "" },
    }
    expect(toolLabel(streaming).pending).toBe("Managing your agents…")
  })
})
