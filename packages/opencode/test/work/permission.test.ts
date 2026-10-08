import { describe, expect, test } from "bun:test"
import { Permission } from "../../src/permission"
import { WorkPermission } from "../../src/work/permission"

const agent = Permission.fromConfig({
  "*": "allow",
  question: "allow",
  bash: "ask",
  read: { "*": "allow", "*.env": "ask" },
  external_directory: { "*": "ask", "/tmp/*": "allow" },
})

const action = (rules: ReturnType<typeof WorkPermission.ruleset>, permission: string, pattern = "*") =>
  Permission.evaluate(permission, pattern, agent, rules).action

describe("WorkPermission.ruleset", () => {
  test("read access allows reading, the network and cowork tools only", () => {
    const rules = WorkPermission.ruleset("read", agent)
    expect(action(rules, "read", "notes.md")).toBe("allow")
    expect(action(rules, "webfetch")).toBe("allow")
    expect(action(rules, "inbox")).toBe("allow")
    expect(action(rules, "edit", "notes.md")).toBe("deny")
    expect(action(rules, "bash")).toBe("deny")
    expect(action(rules, "question")).toBe("deny")
    expect(action(rules, "deploy")).toBe("deny")
  })

  test("never prompts during unattended runs", () => {
    const rules = WorkPermission.ruleset("full", agent)
    expect(action(rules, "bash")).toBe("deny")
    expect(action(rules, "read", "secrets.env")).toBe("deny")
    expect(action(rules, "external_directory", "/etc/passwd")).toBe("deny")
    expect(action(rules, "external_directory", "/tmp/file")).toBe("allow")
    expect(action(rules, "edit", "notes.md")).toBe("allow")
  })

  test("write access adds edits but keeps user limits", () => {
    const rules = WorkPermission.ruleset("write", agent)
    expect(action(rules, "edit", "notes.md")).toBe("allow")
    expect(action(rules, "read", "secrets.env")).toBe("deny")
    expect(action(rules, "bash")).toBe("deny")
  })
})
