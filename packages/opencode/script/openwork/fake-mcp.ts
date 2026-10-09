#!/usr/bin/env bun
/**
 * Tiny stdio MCP server used by screenshots.ts so the Integrations page shows a live connector.
 */
import { Server } from "@modelcontextprotocol/sdk/server/index.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js"

const server = new Server({ name: "meeting-notes", version: "1.0.0" }, { capabilities: { tools: {} } })

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "search_notes",
      description: "Search meeting notes by keyword",
      inputSchema: { type: "object", properties: { query: { type: "string" } }, required: ["query"] },
    },
  ],
}))
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const query = request.params.arguments?.query
  return { content: [{ type: "text", text: `No notes matched "${typeof query === "string" ? query : ""}".` }] }
})

await server.connect(new StdioServerTransport())
