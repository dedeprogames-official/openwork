#!/usr/bin/env bun
/**
 * Offline OpenAI-compatible model for OpenWork demos and screenshots.
 *
 * Deployed agent runs call the `inbox` tool once and then answer with a short result; chats get a short reply.
 * A chat that mentions "remember" walks through OpenWork's own tools one call at a time, to show how each one reads.
 * Requests that mention `FAKE_LLM_HOLD` (e.g. "beach") are held open so a run stays visibly "running".
 *
 *   bun script/openwork/fake-llm.ts --port 4998
 */

const port = Number(process.argv[process.argv.indexOf("--port") + 1] || 4998)
const hold = process.env.FAKE_LLM_HOLD
const holdMs = Number(process.env.FAKE_LLM_HOLD_MS ?? 180_000)

type Message = { role: string; content?: unknown }

const line = (input: unknown) => `data: ${JSON.stringify(input)}\n\n`
const chunk = (delta: Record<string, unknown>, finish?: string, usage?: { input: number; output: number }) => ({
  id: "chatcmpl-openwork",
  object: "chat.completion.chunk",
  choices: [{ index: 0, delta, ...(finish ? { finish_reason: finish } : {}) }],
  ...(usage
    ? {
        usage: {
          prompt_tokens: usage.input,
          completion_tokens: usage.output,
          total_tokens: usage.input + usage.output,
        },
      }
    : {}),
})

function text(content: unknown) {
  if (typeof content === "string") return content
  if (Array.isArray(content))
    return content.map((part) => (part && typeof part === "object" && "text" in part ? String(part.text) : "")).join("")
  return ""
}

function reply(messages: Message[], tools: string[]) {
  const last = messages.at(-1)
  const user = messages.findLast((item) => item.role === "user")
  const prompt = text(user?.content)
  const task = /Task:\n([^\n]+)/.exec(prompt)?.[1] ?? prompt
  const usage = { input: 1800 + Math.floor(Math.random() * 1600), output: 90 + Math.floor(Math.random() * 120) }
  if (/remember/i.test(prompt) && tools.includes("memory")) {
    const results = messages
      .slice(messages.findLastIndex((item) => item.role === "user") + 1)
      .filter((item) => item.role === "tool")
    const next = TOUR[results.length]
    if (next) return { kind: "tool" as const, ...next(results.map((item) => text(item.content)).join("\n")), usage }
    return {
      kind: "text" as const,
      text: "Saved. I added the dinner to your todos, put the call with Ana on today's agenda and kicked off the beach watcher.",
      usage,
    }
  }
  if (last?.role === "tool") return { kind: "text" as const, text: summary(task), usage }
  if (prompt.includes("Nobody is watching this run") && tools.includes("inbox"))
    return { kind: "tool" as const, name: "inbox", args: inbox(task), usage }
  if (messages.some((item) => item.role === "system" && /title generator/i.test(text(item.content))))
    return { kind: "text" as const, text: title(prompt), usage }
  return { kind: "text" as const, text: chat(prompt), usage }
}

function title(prompt: string) {
  if (/focus|day|today/i.test(prompt)) return "Plan for today's client review"
  const words = prompt
    .replace(/[^\w\s']/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 6)
    .join(" ")
  return words.charAt(0).toUpperCase() + words.slice(1)
}

const TOPICS: ReadonlyArray<{ match: RegExp; title: string; message: string; summary: string }> = [
  {
    match: /beach|cam/i,
    title: "Tonight's conditions",
    message: "Sunny with a clear view across the harbor - worth it. Leave by 5:15.",
    summary: "Sunny - clear view across the harbor, a few people at the water's edge.",
  },
  {
    match: /10-year|yield|rate/i,
    title: "Rate check",
    message: "10-year at 4.71% - still inside your 4.6-4.8% band, no change to the duration call.",
    summary: "10-year at 4.71%, inside the band.",
  },
  {
    match: /position|trade|portfolio/i,
    title: "Moves over 2%",
    message: "3 of 6 positions moved more than 2% - JNJ -3.1%, XOM +2.4%, TLT -2.2%.",
    summary: "3 of 6 moved more than 2% - JNJ -3.1%, XOM +2.4%, TLT -2.2%.",
  },
  {
    match: /promise|meeting notes|action item/i,
    title: "Open promises",
    message: "1 of 4 promises is still open: book the client dinner for the Okafor review.",
    summary: "4 promises tracked, 1 still open: the client dinner.",
  },
  {
    match: /proposal/i,
    title: "Proposals",
    message: "Okafor proposal still needs the fee table; the Lee proposal is ready to send.",
    summary: "Okafor needs the fee table; Lee is ready.",
  },
  {
    match: /headline|news/i,
    title: "Headline",
    message: "Fed signals a pause - the rate section of the proposals still holds.",
    summary: "Fed signals a pause; nothing to change.",
  },
  {
    match: /weather|forecast/i,
    title: "Tonight's forecast",
    message: "17 C, light wind, no rain after 5pm - bring a jacket.",
    summary: "17 C, wind 8 kt NW, no rain - bring a jacket.",
  },
  {
    match: /flight|hotel|outfit|calendar|wedding/i,
    title: "Wedding prep",
    message: "Hotel de la Poste has 2 rooms left for the wedding dates - worth booking today.",
    summary: "2 rooms left at Hotel de la Poste.",
  },
]

// One call per step; each step sees the earlier tool results, so it can reuse an id the list returned.
const TOUR: ReadonlyArray<(results: string) => { name: string; args: Record<string, unknown> }> = [
  () => ({ name: "memory", args: { action: "save", content: "Prefers the window table at Sam's Chowder House" } }),
  () => ({ name: "memory", args: { action: "list" } }),
  () => ({ name: "user_todo", args: { action: "add", content: "Book the Okafor dinner", source: "from chat" } }),
  () => ({ name: "agenda", args: { action: "add", title: "Call with Ana", starts_at: "16:30" } }),
  () => ({ name: "deploy", args: { action: "list" } }),
  (results) => ({
    name: "deploy",
    args: { action: "run", id: /(wdp_\w+) \[\w+\] Checking if the beach/.exec(results)?.[1] ?? "" },
  }),
  () => ({
    name: "inbox",
    args: { title: "Dinner is set", message: "Window table held for 7pm - confirm by 3pm.", priority: "high" },
  }),
]

function topic(task: string) {
  return TOPICS.find((item) => item.match.test(task))
}

function inbox(task: string) {
  const match = topic(task)
  if (match) return { title: match.title, message: match.message }
  return { title: "Update", message: `Done: ${task.slice(0, 120)}` }
}

function summary(task: string) {
  return topic(task)?.summary ?? `Checked: ${task.slice(0, 80)} - nothing needs your attention.`
}

function chat(prompt: string) {
  if (/day|focus|today/i.test(prompt))
    return "Your 11:00 client review is first - the position watcher flagged JNJ, XOM and TLT. After that, book the Okafor dinner and leave by 5:15 for the beach."
  return "On it. I'll keep track of that and post anything important to your inbox."
}

Bun.serve({
  port,
  idleTimeout: 0,
  async fetch(request) {
    const url = new URL(request.url)
    if (request.method !== "POST" || !url.pathname.endsWith("/chat/completions"))
      return Response.json({ data: [{ id: "fake-model", object: "model" }] })
    const body = (await request.json()) as { messages?: Message[]; tools?: { function?: { name?: string } }[] }
    const messages = body.messages ?? []
    const tools = (body.tools ?? []).flatMap((item) => (item.function?.name ? [item.function.name] : []))
    const answer = reply(messages, tools)
    const user = text(messages.findLast((item) => item.role === "user")?.content)
    const held = hold && answer.kind === "tool" && user.toLowerCase().includes(hold.toLowerCase())
    const stream = new ReadableStream({
      async start(controller) {
        const send = (value: string) => controller.enqueue(new TextEncoder().encode(value))
        send(line(chunk({ role: "assistant" })))
        if (held) await Bun.sleep(holdMs)
        if (answer.kind === "tool") {
          send(
            line(
              chunk({
                tool_calls: [
                  {
                    index: 0,
                    id: `call_${Date.now()}`,
                    type: "function",
                    function: { name: answer.name, arguments: "" },
                  },
                ],
              }),
            ),
          )
          send(line(chunk({ tool_calls: [{ index: 0, function: { arguments: JSON.stringify(answer.args) } }] })))
          send(line(chunk({}, "tool_calls", answer.usage)))
        }
        if (answer.kind === "text") {
          for (const word of answer.text.split(/(?<= )/)) send(line(chunk({ content: word })))
          send(line(chunk({}, "stop", answer.usage)))
        }
        send("data: [DONE]\n\n")
        controller.close()
      },
    })
    return new Response(stream, { headers: { "content-type": "text/event-stream" } })
  },
})

console.log(`fake llm listening on http://127.0.0.1:${port}/v1`)
