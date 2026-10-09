import type { RGBA } from "@opentui/core"
import type { WorkColor } from "@opencode-ai/sdk/v2"
import type { useTheme } from "../context/theme"

type Theme = ReturnType<typeof useTheme>["theme"]

/** Space colors map to theme tokens so they follow theme switches. */
export function spaceColor(theme: Theme, color: WorkColor | undefined): RGBA {
  if (color === "purple") return theme.primary
  if (color === "yellow") return theme.warning
  if (color === "blue") return theme.secondary
  if (color === "green") return theme.success
  if (color === "pink") return theme.error
  if (color === "cyan") return theme.info
  if (color === "orange") return theme.accent
  return theme.textMuted
}
