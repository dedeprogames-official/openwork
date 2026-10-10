import { afterEach, describe, expect } from "bun:test"
import { LayerNode } from "@opencode-ai/core/effect/layer-node"
import { Work } from "@opencode-ai/core/work"
import { Effect, Exit } from "effect"
import { FSUtil } from "@opencode-ai/core/fs-util"
import { AgendaTool } from "../../src/tool/agenda"
import { DeployTool } from "../../src/tool/deploy"
import { Session } from "@/session/session"
import { MemoryTool } from "../../src/tool/memory"
import { SessionID, MessageID } from "../../src/session/schema"
import { Agent } from "../../src/agent/agent"
import { Truncate } from "@/tool/truncate"
import { resetDatabase } from "../fixture/db"
import { testEffect } from "../lib/effect"

const ctx = {
  sessionID: SessionID.make("ses_test-session"),
  messageID: MessageID.make("msg_test-message"),
  callID: "test-call",
  agent: "work",
  abort: AbortSignal.any([]),
  messages: [],
  metadata: () => Effect.void,
  ask: () => Effect.void,
}

const it = testEffect(
  LayerNode.compile(LayerNode.group([Work.node, Truncate.node, Agent.node, Session.node, FSUtil.node])),
)

afterEach(() => resetDatabase())

describe("work tools", () => {
  // The TUI labels these calls from their metadata, and a missing item has to fail the call instead of reading as done.
  it.instance("memory reports what it saved, forgot and found", () =>
    Effect.gen(function* () {
      const info = yield* MemoryTool
      const tool = yield* info.init()
      const saved = yield* tool.execute({ action: "save", content: "Dog is called Biscuit" }, ctx)
      expect(saved.metadata.content).toBe("Dog is called Biscuit")
      expect((yield* tool.execute({ action: "list" }, ctx)).metadata.count).toBe(1)

      const work = yield* Work.Service
      const memory = (yield* work.memory.list())[0]
      const forgot = yield* tool.execute({ action: "forget", id: memory.id }, ctx)
      expect(forgot.metadata.content).toBe("Dog is called Biscuit")

      const missing = yield* tool.execute({ action: "forget", id: memory.id }, ctx).pipe(Effect.exit)
      expect(Exit.isFailure(missing)).toBe(true)
      expect(String(Exit.isFailure(missing) ? missing.cause : "")).toContain(`No memory with id ${memory.id}`)
    }),
  )

  it.instance("agenda reports the event it added and fails on a missing id", () =>
    Effect.gen(function* () {
      const info = yield* AgendaTool
      const tool = yield* info.init()
      const added = yield* tool.execute({ action: "add", title: "Call with Ana", starts_at: "14:30" }, ctx)
      expect(added.metadata.title).toBe("Call with Ana")
      expect(new Date(added.metadata.startsAt ?? 0).getHours()).toBe(14)
      expect((yield* tool.execute({ action: "list" }, ctx)).metadata.count).toBe(1)

      const invalid = yield* tool.execute({ action: "add", title: "Lunch", starts_at: "soon" }, ctx).pipe(Effect.exit)
      expect(Exit.isFailure(invalid)).toBe(true)
      const missing = yield* tool.execute({ action: "remove", id: "wag_missing" }, ctx).pipe(Effect.exit)
      expect(Exit.isFailure(missing)).toBe(true)
    }),
  )

  it.instance("deploy follows the defaults chosen in Settings", () =>
    Effect.gen(function* () {
      const work = yield* Work.Service
      yield* work.setDefaults({ access: "write", runOnDeploy: true })
      const info = yield* DeployTool
      const tool = yield* info.init()
      const created = yield* tool.execute({ action: "create", request: "summarize my notes every morning at 8" }, ctx)
      const deployment = (yield* work.deployment.get(Work.DeploymentID.make(created.metadata.deploymentID!)))!
      expect(deployment.access).toBe("write")
      // It runs once right away, like an agent deployed from the TUI.
      expect(deployment.runRequestedAt).toBeNumber()

      yield* work.setDefaults({ runOnDeploy: false })
      const quiet = yield* tool.execute(
        { action: "create", request: "check the rates daily at 9am", access: "read" },
        ctx,
      )
      const second = (yield* work.deployment.get(Work.DeploymentID.make(quiet.metadata.deploymentID!)))!
      expect(second.access).toBe("read")
      expect(second.runRequestedAt).toBeUndefined()
    }),
  )
})
