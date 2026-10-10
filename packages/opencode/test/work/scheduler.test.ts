import { expect } from "bun:test"
import path from "path"
import { Effect, Layer } from "effect"
import { LayerNode } from "@opencode-ai/core/effect/layer-node"
import { FSUtil } from "@opencode-ai/core/fs-util"
import { ModelV2 } from "@opencode-ai/core/model"
import { ProviderV2 } from "@opencode-ai/core/provider"
import { Work } from "@opencode-ai/core/work"
import { SessionProjector } from "@opencode-ai/core/session/projector"
import { RuntimeFlags } from "@/effect/runtime-flags"
import { LSP } from "@/lsp/lsp"
import { MCP } from "../../src/mcp"
import { InstanceStore } from "../../src/project/instance-store"
import { InstanceBootstrap } from "../../src/project/bootstrap-service"
import { Session } from "@/session/session"
import { SessionPrompt } from "@/session/prompt"
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
      SessionPrompt.node,
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

it.instance(
  "answers a chat that was still waiting when OpenWork closed, but not a run",
  () =>
    Effect.gen(function* () {
      const instance = yield* TestInstance
      const llm = yield* TestLLMServer
      const fs = yield* FSUtil.Service
      yield* fs.writeWithDirs(path.join(instance.directory, "opencode.json"), JSON.stringify(config(llm.url)))
      const work = yield* Work.Service
      const scheduler = yield* WorkScheduler.Service
      const sessions = yield* Session.Service
      const prompts = yield* SessionPrompt.Service
      const model = { providerID: ProviderV2.ID.make("test"), modelID: ModelV2.ID.make("test-model") }

      // A question sent while the previous answer was still streaming, left unanswered by the shutdown.
      const chat = yield* sessions.create({ title: "Plan my day" })
      yield* prompts.prompt({
        sessionID: chat.id,
        agent: "work",
        model,
        noReply: true,
        parts: [{ type: "text", text: "And what about tomorrow?" }],
      })
      const run = yield* sessions.create({
        title: "Beach watcher · run #1",
        metadata: WorkSession.metadata({ kind: "run", deploymentID: Work.DeploymentID.make("wdp_test") }),
      })
      // Both were answering in a process that has since died.
      yield* work.resume.add(chat.id, 999_999_999)
      yield* work.resume.add(run.id, 999_999_999)
      yield* llm.text("Tomorrow is clear until noon.")

      yield* scheduler.tick()
      const answer = yield* Effect.promise(async () => {
        for (let attempt = 0; attempt < 200; attempt++) {
          const messages = await Effect.runPromise(sessions.messages({ sessionID: chat.id }))
          const text = messages
            .flatMap((message) => (message.info.role === "assistant" ? message.parts : []))
            .find((part) => part.type === "text" && part.text.length > 0)
          if (text?.type === "text") return text.text
          await Bun.sleep(25)
        }
        throw new Error("the interrupted chat was never answered")
      })
      expect(answer).toBe("Tomorrow is clear until noon.")
      // Each session is picked up once; the run is reported in the inbox instead of being resumed.
      expect(yield* work.resume.take(() => false)).toEqual([])
      expect(yield* llm.inputs).toHaveLength(1)
      expect(yield* sessions.messages({ sessionID: run.id })).toEqual([])
    }),
  30_000,
)

it.instance(
  "tells the user in the inbox when a run stopped because OpenWork closed",
  () =>
    Effect.gen(function* () {
      const instance = yield* TestInstance
      const work = yield* Work.Service
      const scheduler = yield* WorkScheduler.Service
      const deployment = yield* work.deployment.create({
        title: "Beach watcher",
        task: "Tell me if the beach is worth it tonight",
        directory: instance.directory,
        agent: "work",
        schedule: { type: "manual" },
      })
      // A run owned by a process that no longer exists, like one that crashed or was closed mid-run.
      const run = yield* work.run.claim({
        deploymentID: deployment.id,
        trigger: "manual",
        now: Date.now(),
        pid: 999_999_999,
      })

      yield* scheduler.tick()
      expect((yield* work.run.get(run!.id))?.error).toBe(Work.INTERRUPTED)
      const messages = yield* work.message.list()
      expect(messages).toHaveLength(1)
      expect(messages[0]).toMatchObject({ title: "Run #1 didn't finish", deploymentID: deployment.id, runID: run!.id })
      expect(messages[0].body).toContain('OpenWork closed while "Beach watcher" was running')

      // The next pass has nothing left to report.
      yield* scheduler.tick()
      expect(yield* work.message.list()).toHaveLength(1)
    }),
  30_000,
)
