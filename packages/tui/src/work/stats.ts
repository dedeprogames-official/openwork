import type { Provider, WorkRun, WorkState } from "@opencode-ai/sdk/v2"

const LOCAL = new Set(["ollama", "lmstudio", "llamacpp", "llama.cpp", "vllm", "localai", "jan", "mlx", "local"])

/** Reference cloud price used for "estimated savings": $3 in / $15 out per 1M, assuming 80% input tokens. */
export const REFERENCE = { input: 3, output: 15, label: "$3 in / $15 out per 1M" }
const BLENDED = (0.8 * REFERENCE.input + 0.2 * REFERENCE.output) / 1_000_000

export function isLocal(providerID: string, providers: ReadonlyArray<Provider>) {
  if (LOCAL.has(providerID)) return true
  const baseURL = providers.find((item) => item.id === providerID)?.options.baseURL
  if (typeof baseURL !== "string") return false
  return /^https?:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\])(:|\/|$)/.test(baseURL)
}

export function usage(state: WorkState, providers: ReadonlyArray<Provider>) {
  const local = state.usage.providers
    .filter((item) => isLocal(item.providerID, providers))
    .reduce((sum, item) => sum + item.tokens, 0)
  const perHour = state.usage.hour.tokens
  const share = state.usage.today.tokens > 0 ? local / state.usage.today.tokens : 0
  return {
    local,
    cloud: Math.max(0, state.usage.today.tokens - local),
    today: state.usage.today.tokens,
    perHour,
    perDay: perHour * 24,
    costPerDay: state.usage.hour.cost * 24,
    // What the local share of today's projected tokens would cost on the reference cloud model.
    savingsPerDay: perHour * 24 * share * BLENDED,
  }
}

export function runTokens(run: WorkRun) {
  return run.tokens.input + run.tokens.output + run.tokens.reasoning + run.tokens.cache.read + run.tokens.cache.write
}

export type Slice = {
  label: string
  key: string
  value: number
  color: WorkState["spaces"][number]["color"] | undefined
}

/** Today's token share per space (agents without a space are grouped together). */
export function shares(state: WorkState, limit = 6): Slice[] {
  const spaceOf = new Map(state.deployments.map((item) => [item.id, item.spaceID]))
  const totals = new Map<string, number>()
  for (const run of state.runs) {
    const key = spaceOf.get(run.deploymentID) ?? "none"
    totals.set(key, (totals.get(key) ?? 0) + runTokens(run))
  }
  const slices = Array.from(totals.entries())
    .map(([key, value]) => {
      const space = state.spaces.find((item) => item.id === key)
      return { key, value, label: space?.name ?? "No space", color: space?.color }
    })
    .toSorted((a, b) => b.value - a.value)
  if (slices.length <= limit) return slices
  const rest = slices.slice(limit - 1)
  return [
    ...slices.slice(0, limit - 1),
    {
      key: "more",
      label: `${rest.length} more`,
      value: rest.reduce((sum, item) => sum + item.value, 0),
      color: undefined,
    },
  ]
}
