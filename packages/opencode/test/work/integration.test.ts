import { describe, expect, test } from "bun:test"
import path from "path"
import { Effect, Layer } from "effect"
import { HttpClient } from "effect/unstable/http"
import { httpClient } from "@opencode-ai/core/effect/app-node-platform"
import { LayerNode } from "@opencode-ai/core/effect/layer-node"
import { CrossSpawnSpawner } from "@opencode-ai/core/cross-spawn-spawner"
import { FSUtil } from "@opencode-ai/core/fs-util"
import { Global } from "@opencode-ai/core/global"
import { Npm } from "@opencode-ai/core/npm"
import { Work } from "@opencode-ai/core/work"
import { Account } from "../../src/account/account"
import { Auth } from "../../src/auth"
import { Config } from "@/config/config"
import { Env } from "../../src/env"
import { WorkIntegration } from "../../src/work/integration"
import { AccountTest } from "../fake/account"
import { AuthTest } from "../fake/auth"
import { NpmTest } from "../fake/npm"
import { tmpdirScoped } from "../fixture/fixture"
import { testEffect } from "../lib/effect"

const unexpectedHttp = HttpClient.make((request) =>
  Effect.die(`unexpected http request: ${request.method} ${request.url}`),
)

const it = testEffect(
  LayerNode.compile(LayerNode.group([Config.node, Work.node, FSUtil.node, Env.node, CrossSpawnSpawner.node]), [
    [Auth.node, AuthTest.empty],
    [Account.node, AccountTest.empty],
    [Npm.node, NpmTest.noop],
    [httpClient, Layer.succeed(HttpClient.HttpClient, unexpectedHttp)],
  ]),
)

const schema = "https://opencode.ai/config.json"
const remote = { type: "remote", name: "docs", url: "https://mcp.example.com/mcp" } as const

/** Runs with a fresh global config folder holding `files`, like the user's ~/.config/openwork. */
const withGlobal = <A, E, R>(files: Record<string, string>, fn: (dir: string) => Effect.Effect<A, E, R>) =>
  Effect.gen(function* () {
    const fsutil = yield* FSUtil.Service
    const config = yield* Config.Service
    const dir = yield* tmpdirScoped()
    yield* Effect.forEach(Object.entries(files), ([name, text]) => fsutil.writeWithDirs(path.join(dir, name), text))
    const previous = Global.Path.config
    ;(Global.Path as { config: string }).config = dir
    yield* config.invalidate()
    return yield* fn(dir).pipe(
      Effect.ensuring(
        Effect.gen(function* () {
          ;(Global.Path as { config: string }).config = previous
          yield* config.invalidate()
        }),
      ),
    )
  })

describe("WorkIntegration.parse", () => {
  test("maps a remote server and trims what was typed", () => {
    const parsed = WorkIntegration.parse({
      type: "remote",
      name: "  docs ",
      url: " https://mcp.example.com/mcp ",
      headers: { " Authorization ": " Bearer abc " },
    })
    expect(parsed).toEqual({
      name: "docs",
      config: {
        type: "remote",
        url: "https://mcp.example.com/mcp",
        headers: { Authorization: "Bearer abc" },
        enabled: true,
      },
    })
  })

  test("maps a local server", () => {
    expect(
      WorkIntegration.parse({
        type: "local",
        name: "files",
        command: ["npx", " -y ", "@modelcontextprotocol/server-filesystem", "/tmp"],
        environment: { TOKEN: "x" },
      }),
    ).toEqual({
      name: "files",
      config: {
        type: "local",
        command: ["npx", "-y", "@modelcontextprotocol/server-filesystem", "/tmp"],
        environment: { TOKEN: "x" },
        enabled: true,
      },
    })
  })

  test("leaves out empty headers and variables", () => {
    expect(WorkIntegration.parse({ ...remote, headers: {} })).toEqual({
      name: "docs",
      config: { type: "remote", url: remote.url, enabled: true },
    })
    expect(WorkIntegration.parse({ type: "local", name: "tool", command: ["tool"], environment: {} })).toEqual({
      name: "tool",
      config: { type: "local", command: ["tool"], enabled: true },
    })
  })

  test.each([
    ["a name with spaces", { ...remote, name: "my docs" }, "name"],
    ["an empty name", { ...remote, name: " " }, "name"],
    ["a name longer than 40", { ...remote, name: "a".repeat(41) }, "name"],
    ["a URL that is not http", { ...remote, url: "ftp://mcp.example.com" }, "url"],
    ["text that is not a URL", { ...remote, url: "mcp example" }, "url"],
    ["a missing URL", { type: "remote", name: "docs" }, "url"],
    ["a header name with a space", { ...remote, headers: { "Bad Header": "x" } }, "headers"],
    ["a header value with a line break", { ...remote, headers: { A: "x\ny" } }, "headers"],
    ["a missing command", { type: "local", name: "tool" }, "command"],
    ["a blank command", { type: "local", name: "tool", command: ["", " "] }, "command"],
    [
      "a bad variable name",
      { type: "local", name: "tool", command: ["tool"], environment: { "1X": "a" } },
      "environment",
    ],
  ] as const)("rejects %s", (_, input, field) => {
    expect(WorkIntegration.parse(input as never)).toMatchObject({ field })
  })
})

describe("WorkIntegration.summarize", () => {
  test("shows where it connects and never the secrets", () => {
    expect(
      WorkIntegration.summarize(
        "docs",
        { type: "remote", url: "https://user:secret@mcp.example.com/mcp?token=abc", headers: { A: "b" } },
        false,
      ),
    ).toEqual({ name: "docs", type: "remote", target: "https://mcp.example.com/mcp", file: false })
    expect(
      WorkIntegration.summarize(
        "files",
        { type: "local", command: ["npx", "--token", "abc"], environment: { A: "b" } },
        true,
      ),
    ).toEqual({ name: "files", type: "local", target: "npx", file: true })
  })
})

describe("saving to opencode.json", () => {
  it.effect("waits in the database, then sync writes it to the file and drops it from the database", () =>
    withGlobal({ "opencode.json": JSON.stringify({ $schema: schema, model: "test/model" }) }, (dir) =>
      Effect.gen(function* () {
        const work = yield* Work.Service
        const config = yield* Config.Service
        const fsutil = yield* FSUtil.Service
        const parsed = WorkIntegration.parse(remote)
        if ("message" in parsed) throw new Error(parsed.message)

        yield* work.integrations.stage(parsed.name, parsed.config)
        expect(yield* WorkIntegration.list(work, config)).toEqual([
          { name: "docs", type: "remote", target: "https://mcp.example.com/mcp", file: false },
        ])
        // Nothing is written until OpenWork closes.
        expect(yield* fsutil.readJson(path.join(dir, "opencode.json"))).toEqual({
          $schema: schema,
          model: "test/model",
        })

        expect(yield* WorkIntegration.sync(work, config)).toEqual({ written: ["docs"] })

        expect(yield* fsutil.readJson(path.join(dir, "opencode.json"))).toMatchObject({
          model: "test/model",
          mcp: { docs: { type: "remote", url: remote.url, enabled: true } },
        })
        expect(yield* work.integrations.staged()).toEqual({})
        expect(yield* WorkIntegration.list(work, config)).toEqual([
          { name: "docs", type: "remote", target: "https://mcp.example.com/mcp", file: true },
        ])
        // A second sync has nothing left to do.
        expect(yield* WorkIntegration.sync(work, config)).toEqual({ written: [] })
      }),
    ),
  )

  it.effect("keeps the comments of a jsonc file", () =>
    withGlobal(
      {
        "opencode.jsonc":
          '{\n  "$schema": "https://opencode.ai/config.json",\n  // my favourite model\n  "model": "test/model"\n}\n',
      },
      (dir) =>
        Effect.gen(function* () {
          const work = yield* Work.Service
          const config = yield* Config.Service
          const fsutil = yield* FSUtil.Service
          const parsed = WorkIntegration.parse({ type: "local", name: "files", command: ["npx", "files-server"] })
          if ("message" in parsed) throw new Error(parsed.message)
          yield* work.integrations.stage(parsed.name, parsed.config)

          expect(yield* WorkIntegration.sync(work, config)).toEqual({ written: ["files"] })

          const text = yield* fsutil.readFileString(path.join(dir, "opencode.jsonc"))
          expect(text).toContain("// my favourite model")
          expect(text).toContain('"files"')
          expect(text).toContain("files-server")
        }),
    ),
  )

  it.effect("lets the file win when it already has the name", () =>
    withGlobal(
      {
        "opencode.json": JSON.stringify({
          $schema: schema,
          mcp: { docs: { type: "remote", url: "https://edited.example.com" } },
        }),
      },
      (dir) =>
        Effect.gen(function* () {
          const work = yield* Work.Service
          const config = yield* Config.Service
          const fsutil = yield* FSUtil.Service
          const parsed = WorkIntegration.parse(remote)
          if ("message" in parsed) throw new Error(parsed.message)
          yield* work.integrations.stage(parsed.name, parsed.config)
          expect(yield* WorkIntegration.exists(work, config, "docs")).toBe(true)

          expect(yield* WorkIntegration.sync(work, config)).toEqual({ written: [] })

          expect(yield* fsutil.readJson(path.join(dir, "opencode.json"))).toEqual({
            $schema: schema,
            mcp: { docs: { type: "remote", url: "https://edited.example.com" } },
          })
          expect(yield* work.integrations.staged()).toEqual({})
        }),
    ),
  )

  it.effect("keeps it in the database when the file cannot be written, and tries again later", () =>
    withGlobal({ "opencode.json": "{ not json" }, (dir) =>
      Effect.gen(function* () {
        const work = yield* Work.Service
        const config = yield* Config.Service
        const fsutil = yield* FSUtil.Service
        const parsed = WorkIntegration.parse(remote)
        if ("message" in parsed) throw new Error(parsed.message)
        yield* work.integrations.stage(parsed.name, parsed.config)

        const failed = yield* WorkIntegration.sync(work, config)
        expect(failed.written).toEqual([])
        expect(failed).toHaveProperty("warning")
        // Still there, and still listed, so the integration keeps working.
        expect(Object.keys(yield* work.integrations.staged())).toEqual(["docs"])
        expect(yield* WorkIntegration.list(work, config)).toEqual([
          { name: "docs", type: "remote", target: "https://mcp.example.com/mcp", file: false },
        ])

        yield* fsutil.writeWithDirs(path.join(dir, "opencode.json"), "{}")
        yield* config.invalidate()
        expect(yield* WorkIntegration.sync(work, config)).toEqual({ written: ["docs"] })
        expect(Object.keys(yield* work.integrations.staged())).toEqual([])
      }),
    ),
  )

  it.effect("remove takes it out of the database and the file, and leaves the rest alone", () =>
    withGlobal(
      {
        "opencode.jsonc":
          '{\n  "$schema": "https://opencode.ai/config.json",\n  // keep me\n  "model": "test/model",\n  "mcp": {\n    "docs": { "type": "remote", "url": "https://mcp.example.com/mcp" },\n    "other": { "type": "remote", "url": "https://other.example.com" }\n  }\n}\n',
      },
      (dir) =>
        Effect.gen(function* () {
          const work = yield* Work.Service
          const config = yield* Config.Service
          const fsutil = yield* FSUtil.Service
          yield* work.integrations.stage("pending", { type: "remote", url: "https://pending.example.com" })
          yield* work.integrations.setEnabled("docs", false)

          expect(yield* WorkIntegration.remove(work, config, "pending")).toEqual({})
          expect(yield* WorkIntegration.remove(work, config, "docs")).toEqual({})

          const text = yield* fsutil.readFileString(path.join(dir, "opencode.jsonc"))
          expect(text).toContain("// keep me")
          expect(text).toContain('"other"')
          expect(text).not.toContain('"docs"')
          expect(yield* work.integrations.staged()).toEqual({})
          // Switched back on, so adding the same name again is not born switched off.
          expect(yield* work.integrations.disabled()).toEqual([])
          expect((yield* WorkIntegration.list(work, config)).map((item) => item.name)).toEqual(["other"])
        }),
    ),
  )

  it.effect("remove from a json file deletes the key", () =>
    withGlobal(
      {
        "opencode.json": JSON.stringify({
          $schema: schema,
          model: "test/model",
          mcp: { docs: { type: "remote", url: remote.url } },
        }),
      },
      (dir) =>
        Effect.gen(function* () {
          const work = yield* Work.Service
          const config = yield* Config.Service
          const fsutil = yield* FSUtil.Service

          expect(yield* WorkIntegration.remove(work, config, "docs")).toEqual({})

          const written = (yield* fsutil.readJson(path.join(dir, "opencode.json"))) as { mcp?: Record<string, unknown> }
          expect(written).toMatchObject({ model: "test/model" })
          expect(written.mcp ?? {}).not.toHaveProperty("docs")
        }),
    ),
  )
})
