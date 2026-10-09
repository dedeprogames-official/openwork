import { expect } from "bun:test"
import path from "path"
import { Effect, Layer } from "effect"
import { LayerNode } from "@opencode-ai/core/effect/layer-node"
import { FSUtil } from "@opencode-ai/core/fs-util"
import { Work } from "@opencode-ai/core/work"
import { SessionProjector } from "@opencode-ai/core/session/projector"
import { RuntimeFlags } from "@/effect/runtime-flags"
import { LSP } from "@/lsp/lsp"
import { MCP } from "../../src/mcp"
import { InstanceStore } from "../../src/project/instance-store"
import { InstanceBootstrap } from "../../src/project/bootstrap-service"
import { Session } from "@/session/session"
import { SessionSummary } from "../../src/session/summary"
import { SessionID } from "../../src/session/schema"
import { WorkScheduler } from "../../src/work/scheduler"
import { WorkSession } from "../../src/work/session"
import { Permission } from "../../src/permission"
import { TestInstance } from "../fixture/fixture"
import { testEffect } from "../lib/effect"
import { TestLLMServer } from "../lib/llm-server"

const summary = Layer.succeed(
  SessionSummary.Service,
  SessionSummary.Service.of({
    summarize: () => Effect.void,
    diff: () => Effect.succeed([]),
    computeDiff: () => Effect.succeed([]),
  }),
)

const mcp = Layer.succeed(
  MCP.Service,
  MCP.Service.of({
    status: () => Effect.succeed({}),
    clients: () => Effect.succeed({}),
    instructions: () => Effect.succeed([]),
    tools: () => Effect.succeed({}),
    prompts: () => Effect.succeed({}),
    resources: () => Effect.succeed({}),
    resourceTemplates: () => Effect.succeed({}),
    add: () => Effect.succeed({ status: { status: "disabled" as const } }),
    connect: () => Effect.void,
    disconnect: () => Effect.void,
    getPrompt: () => Effect.succeed(undefined),
    readResource: () => Effect.succeed(undefined),
    startAuth: () => Effect.die("unexpected MCP auth"),
    authenticate: () => Effect.die("unexpected MCP auth"),
    finishAuth: () => Effect.die("unexpected MCP auth"),
    removeAuth: () => Effect.void,
    supportsOAuth: () => Effect.succeed(false),
    hasStoredTokens: () => Effect.succeed(false),
    getAuthStatus: () => Effect.succeed("not_authenticated" as const),
  }),
)

const lsp = Layer.succeed(
  LSP.Service,
  LSP.Service.of({
    init: () => Effect.void,
    status: () => Effect.succeed([]),
    hasClients: () => Effect.succeed(false),
    touchFile: () => Effect.void,
    diagnostics: () => Effect.succeed({}),
    hover: () => Effect.succeed(undefined),
    definition: () => Effect.succeed([]),
    references: () => Effect.succeed([]),
    implementation: () => Effect.succeed([]),
    documentSymbol: () => Effect.succeed([]),
    workspaceSymbol: () => Effect.succeed([]),
    prepareCallHierarchy: () => Effect.succeed([]),
    incomingCalls: () => Effect.succeed([]),
    outgoingCalls: () => Effect.succeed([]),
  }),
)

const noopBootstrap = Layer.succeed(InstanceBootstrap.Service, InstanceBootstrap.Service.of({ run: Effect.void }))

const testLLMServerNode = LayerNode.make({ service: TestLLMServer, layer: TestLLMServer.layer, deps: [] })

const it = testEffect(
  LayerNode.compile(
    LayerNode.group([
      WorkScheduler.node,
      Work.node,
      Session.node,
      SessionProjector.node,
      InstanceStore.node,
      FSUtil.node,
      testLLMServerNode,
    ]),
    [
      [SessionSummary.node, summary],
      [LSP.node, lsp],
      [MCP.node, mcp],
      [RuntimeFlags.node, RuntimeFlags.layer({ disableWorkScheduler: true })],
      [InstanceStore.bootstrapNode, noopBootstrap],
    ],
  ),
)

const config = (url: string) => ({
  $schema: "https://opencode.ai/config.json",
  provider: {
    test: {
      name: "Test",
      id: "test",
      env: [],
      npm: "@ai-sdk/openai-compatible",
      models: {
        "test-model": {
          id: "test-model",
          name: "Test Model",
          attachment: false,
          reasoning: false,
          temperature: false,
          tool_call: true,
          release_date: "2025-01-01",
          limit: { context: 100000, output: 10000 },
          cost: { input: 0, output: 0 },
          options: {},
        },
      },
      options: { apiKey: "test-key", baseURL: url },
    },
  },
})

it.instance(
  "runs a deployed agent unattended and records the result",
  () =>
    Effect.gen(function* () {
      const instance = yield* TestInstance
      const llm = yield* TestLLMServer
      const fs = yield* FSUtil.Service
      yield* fs.writeWithDirs(path.join(instance.directory, "opencode.json"), JSON.stringify(config(llm.url)))
      const work = yield* Work.Service
      const scheduler = yield* WorkScheduler.Service
      const sessions = yield* Session.Service

      const deployment = yield* work.deployment.create({
        title: "Beach watcher",
        task: "Tell me if the beach is worth it tonight",
        directory: instance.directory,
        agent: "work",
        model: { providerID: "test", modelID: "test-model" },
        schedule: { type: "manual" },
      })
      yield* llm.tool("inbox", { title: "Tonight's conditions", message: "Sunny, go at 5pm." })
      yield* llm.text("Checked: worth it tonight.", { usage: { input: 1200, output: 80 } })

      const run = yield* scheduler.run(deployment.id)
      expect(run.error).toBeUndefined()
      expect(run.status).toBe("done")
      expect(run.summary).toBe("Checked: worth it tonight.")
      expect(run.number).toBe(1)
      expect(run.tokens.input).toBeGreaterThan(0)

      const messages = yield* work.message.list()
      expect(messages).toHaveLength(1)
      expect(messages[0]).toMatchObject({ title: "Tonight's conditions", deploymentID: deployment.id, runID: run.id })

      const session = yield* sessions.get(SessionID.make(run.sessionID!))
      expect(WorkSession.meta(session.metadata)).toEqual({ kind: "run", deploymentID: deployment.id, runID: run.id })
      expect(Permission.evaluate("question", "*", session.permission ?? []).action).toBe("deny")
      expect(Permission.evaluate("edit", "notes.md", session.permission ?? []).action).toBe("deny")

      const body = JSON.stringify((yield* llm.inputs)[0])
      expect(body).toContain("Run #1 of your deployed task")
      expect(body).toContain("<openwork_agent>")
      expect(body).not.toContain("You are opencode, an interactive CLI tool")
    }),
  30_000,
)
