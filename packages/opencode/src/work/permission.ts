export * as WorkPermission from "./permission"

import { Work } from "@opencode-ai/core/work"
import { PermissionV1 } from "@opencode-ai/core/v1/permission"
import { Permission } from "@/permission"

const READ = [
  "read",
  "glob",
  "grep",
  "list",
  "webfetch",
  "websearch",
  "skill",
  "todowrite",
  "inbox",
  "user_todo",
  "agenda",
  "memory",
  "external_directory",
]

const ALLOWED: Record<Exclude<Work.Access, "full">, string[]> = {
  read: READ,
  // "edit" covers the edit, write and apply_patch tools.
  write: [...READ, "edit"],
}

export const LABEL: Record<Work.Access, string> = {
  read: "read + network",
  write: "read + write + network",
  full: "full access",
}

/**
 * Session permission rules for an unattended run. Session rules are evaluated after the agent's rules, so these
 * narrow what the agent may do. Nobody can answer a prompt during a run, so anything that would ask is denied.
 */
export function ruleset(access: Work.Access, agent: PermissionV1.Ruleset): PermissionV1.Rule[] {
  const base = agent.map((rule) => (rule.action === "ask" ? { ...rule, action: "deny" as const } : rule))
  const unattended = Permission.fromConfig({ question: "deny", plan_enter: "deny", plan_exit: "deny", deploy: "deny" })
  if (access === "full") return [...base, ...unattended]
  return [
    ...base,
    { permission: "*", pattern: "*", action: "deny" },
    // Re-apply the agent's own rules for each allowed permission so user denies and path limits still hold.
    ...ALLOWED[access].flatMap((permission) => [
      ...(Permission.evaluate(permission, "*", base).action === "allow"
        ? [{ permission, pattern: "*", action: "allow" as const }]
        : []),
      ...base.filter((rule) => rule.permission === permission),
    ]),
    ...unattended,
  ]
}
