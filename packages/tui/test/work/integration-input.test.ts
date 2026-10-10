import { describe, expect, test } from "bun:test"
import { checkName, checkUrl, mask, parsePair, splitCommand } from "../../src/work/integration-input"

describe("splitCommand", () => {
  test("splits on spaces and keeps quoted words together", () => {
    expect(splitCommand("npx -y @modelcontextprotocol/server-filesystem ~/Documents")).toEqual([
      "npx",
      "-y",
      "@modelcontextprotocol/server-filesystem",
      "~/Documents",
    ])
    expect(splitCommand("node \"/home/me/my tools/server.js\" --name 'two words'")).toEqual([
      "node",
      "/home/me/my tools/server.js",
      "--name",
      "two words",
    ])
  })

  test("leaves backslashes alone, so Windows paths work", () => {
    expect(splitCommand('"C:\\Program Files\\tool\\tool.exe" --port 80')).toEqual([
      "C:\\Program Files\\tool\\tool.exe",
      "--port",
      "80",
    ])
  })

  test("keeps an empty quoted word and ignores extra spaces", () => {
    expect(splitCommand('  tool   ""  x ')).toEqual(["tool", "", "x"])
    expect(splitCommand("   ")).toEqual([])
  })

  test("returns undefined for a quote that never closes", () => {
    expect(splitCommand('tool "unclosed')).toBeUndefined()
  })
})

describe("parsePair", () => {
  test("reads a header as Name: value and keeps colons in the value", () => {
    expect(parsePair("Authorization: Bearer abc", "header")).toEqual(["Authorization", "Bearer abc"])
    expect(parsePair("X-Url: https://a.example", "header")).toEqual(["X-Url", "https://a.example"])
  })

  test("reads a variable as NAME=value and keeps equals signs in the value", () => {
    expect(parsePair("API_KEY=abc=def", "variable")).toEqual(["API_KEY", "abc=def"])
  })

  test.each([
    ["no separator", "Authorization Bearer", "header"],
    ["no value", "Authorization:", "header"],
    ["no name", ": value", "header"],
    ["a header name with a space", "My Header: x", "header"],
    ["a variable starting with a digit", "1KEY=x", "variable"],
    ["a variable name with a dash", "MY-KEY=x", "variable"],
  ] as const)("rejects %s", (_, line, kind) => {
    expect(parsePair(line, kind)).toBeUndefined()
  })
})

describe("checks", () => {
  test("names", () => {
    expect(checkName("docs", new Set())).toBeUndefined()
    expect(checkName("my_docs-2", new Set())).toBeUndefined()
    expect(checkName("my docs", new Set())).toBeDefined()
    expect(checkName("", new Set())).toBeDefined()
    expect(checkName("docs", new Set(["docs"]))).toContain("already")
  })

  test("urls", () => {
    expect(checkUrl("https://mcp.example.com/mcp")).toBeUndefined()
    expect(checkUrl("http://localhost:3000/sse")).toBeUndefined()
    expect(checkUrl("ftp://example.com")).toBeDefined()
    expect(checkUrl("example.com/mcp")).toBeDefined()
  })

  test("secrets never show in full", () => {
    expect(mask("Bearer abc123")).toBe("Be••••")
    expect(mask("abc")).toBe("••••")
    expect(mask("Bearer abc123")).not.toContain("abc123")
  })
})
