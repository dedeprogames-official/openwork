import { describe, expect, test } from "bun:test"
import type { Provider, WorkDeployment, WorkRun, WorkState } from "@opencode-ai/sdk/v2"
import { isLocal, runTokens, shares, usage } from "../../src/work/stats"

const provider = (id: string, baseURL?: string): Provider => ({
  id,
  name: id,
  source: "config",
  env: [],
  options: baseURL ? { baseURL } : {},
  models: {},
})

const run = (deploymentID: string, input: number): WorkRun => ({
  id: `wrn_${deploymentID}_${input}`,
  deploymentID,
  number: 1,
  status: "done",
  trigger: "schedule",
  tokens: { input, output: 10, reasoning: 0, cache: { read: 5, write: 0 } },
  cost: 0,
  time: { started: 0 },
})

const deployment = (id: string, spaceID?: string): WorkDeployment => ({
  id,
  spaceID,
  title: id,
  task: "watch",
  directory: "/tmp",
  agent: "work",
  schedule: { type: "interval", every: 600_000 },
  access: "read",
  status: "active",
  runCount: 0,
  time: { created: 0, updated: 0 },
})

const empty: WorkState = {
  now: 0,
  paused: false,
  spaces: [],
  deployments: [],
  latest: [],
  runs: [],
  upcoming: [],
  messages: [],
  todos: [],
  agenda: [],
  memories: [],
  usage: { today: { tokens: 0, cost: 0 }, hour: { tokens: 0, cost: 0 }, providers: [], runsToday: 0, runsRemaining: 0 },
}

describe("work stats", () => {
  test("detects local providers by id or loopback base URL", () => {
    expect(isLocal("ollama", [])).toBe(true)
    expect(isLocal("mine", [provider("mine", "http://127.0.0.1:1234/v1")])).toBe(true)
    expect(isLocal("mine", [provider("mine", "http://localhost/v1")])).toBe(true)
    expect(isLocal("cloud", [provider("cloud", "https://api.example.com/v1")])).toBe(false)
    expect(isLocal("anthropic", [])).toBe(false)
  })

  test("splits usage into local and cloud and projects it over a day", () => {
    const result = usage(
      {
        ...empty,
        usage: {
          ...empty.usage,
          today: { tokens: 1_000, cost: 0.5 },
          hour: { tokens: 100, cost: 0.01 },
          providers: [
            { providerID: "ollama", tokens: 750, cost: 0 },
            { providerID: "anthropic", tokens: 250, cost: 0.5 },
          ],
        },
      },
      [],
    )
    expect(result.local).toBe(750)
    expect(result.cloud).toBe(250)
    expect(result.perDay).toBe(2_400)
    expect(result.costPerDay).toBeCloseTo(0.24)
    expect(result.savingsPerDay).toBeGreaterThan(0)
  })

  test("groups today's run tokens by space", () => {
    const state: WorkState = {
      ...empty,
      spaces: [
        { id: "wsp_a", name: "Markets", color: "green", time: { created: 0, updated: 0 } },
        { id: "wsp_b", name: "Beach", color: "blue", time: { created: 0, updated: 0 } },
      ],
      deployments: [deployment("wdp_1", "wsp_a"), deployment("wdp_2", "wsp_b"), deployment("wdp_3")],
      runs: [run("wdp_1", 100), run("wdp_2", 300), run("wdp_2", 20), run("wdp_3", 50)],
    }
    expect(runTokens(state.runs[0])).toBe(115)
    expect(shares(state).map((slice) => [slice.label, slice.value])).toEqual([
      ["Beach", 350],
      ["Markets", 115],
      ["No space", 65],
    ])
    expect(shares(state, 2).map((slice) => [slice.label, slice.value])).toEqual([
      ["Beach", 350],
      ["2 more", 180],
    ])
  })
})
