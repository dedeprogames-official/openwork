import { createSimpleContext } from "./helper"

export type Exit = (reason?: unknown) => void

export const { use: useExit, provider: ExitProvider } = createSimpleContext({
  name: "Exit",
  init: (input: { exit: Exit }) => input.exit,
})

/** Closes OpenWork and runs `openwork upgrade` in the terminal it was running in. */
export const { use: useCloseAndUpgrade, provider: CloseAndUpgradeProvider } = createSimpleContext({
  name: "CloseAndUpgrade",
  init: (input: { run: () => void }) => input.run,
})
