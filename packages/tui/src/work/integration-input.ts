/** What the add-integration wizard accepts, checked here so a typo is caught on the same screen it was made on. */

const NAME = /^[A-Za-z0-9_-]{1,40}$/

export function checkName(name: string, taken: ReadonlySet<string>) {
  if (!NAME.test(name)) return "Use up to 40 letters, numbers, - or _"
  if (taken.has(name)) return `There is already an integration called ${name}`
}

export function checkUrl(url: string) {
  if (!URL.canParse(url) || !["http:", "https:"].includes(new URL(url).protocol))
    return "A remote MCP server has an address that starts with http:// or https://"
}

/**
 * Splits a command line into its words. Quotes keep a word together ("C:\Program Files\tool.exe"); there are no
 * escapes, so a Windows path needs no doubled backslashes. An unclosed quote returns undefined.
 */
export function splitCommand(line: string) {
  const words: string[] = []
  let word: string | undefined
  let quote: string | undefined
  for (const char of line) {
    if (quote) {
      if (char === quote) quote = undefined
      else word = (word ?? "") + char
      continue
    }
    if (char === '"' || char === "'") {
      quote = char
      word ??= ""
      continue
    }
    if (/\s/.test(char)) {
      if (word !== undefined) words.push(word)
      word = undefined
      continue
    }
    word = (word ?? "") + char
  }
  if (quote) return undefined
  if (word !== undefined) words.push(word)
  return words
}

/** `Authorization: Bearer abc` for a header, `API_KEY=abc` for an environment variable. */
export function parsePair(line: string, kind: "header" | "variable") {
  const separator = kind === "header" ? ":" : "="
  const at = line.indexOf(separator)
  const name = line.slice(0, at).trim()
  const value = line.slice(at + 1).trim()
  if (at < 1 || !name || !value) return
  if (kind === "header" && !/^[!#$%&'*+.^_`|~0-9A-Za-z-]+$/.test(name)) return
  if (kind === "variable" && !/^[A-Za-z_][A-Za-z0-9_]*$/.test(name)) return
  return [name, value] as const
}

/** Enough of a secret to recognise it, never all of it. */
export function mask(value: string) {
  return value.length <= 4 ? "••••" : value.slice(0, 2) + "••••"
}
