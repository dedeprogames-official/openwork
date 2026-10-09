import { createContext, useContext, type Accessor } from "solid-js"

/** Columns the OpenWork navigation takes from the left of the screen; pages subtract it from their width. */
export const ShellInset = createContext<Accessor<number>>(() => 0)

export function useShellInset() {
  return useContext(ShellInset)
}

export const NAV_WIDTH = 26
export const RAIL_WIDTH = 4
