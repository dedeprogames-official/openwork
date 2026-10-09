export * as WorkDemo from "./demo"

import path from "path"
import { Effect } from "effect"
import { FSUtil } from "@opencode-ai/core/fs-util"
import { Work } from "@opencode-ai/core/work"
import { WorkSchedule } from "@opencode-ai/core/work/schedule"

const MINUTE = 60_000

type AgentSeed = {
  readonly title: string
  readonly task: string
  readonly every: number
  readonly skill?: string
  readonly access?: Work.Access
  readonly results: ReadonlyArray<string>
}

type SpaceSeed = {
  readonly name: string
  readonly goal: string
  readonly color: Work.Color
  readonly agenda?: { readonly title: string; readonly hour: number; readonly minute: number }
  readonly agents: ReadonlyArray<AgentSeed>
}

const SPACES: ReadonlyArray<SpaceSeed> = [
  {
    name: "Client review - Harrington Family Trust",
    goal: "walk into the client review knowing what moved since last time",
    color: "cyan",
    agenda: { title: "Client review - Harrington Family Trust", hour: 11, minute: 0 },
    agents: [
      {
        title: "Watching the trust's positions",
        task: "Check the Harrington trust holdings in positions.csv against today's prices and flag anything that moved more than 2%.",
        every: 14 * MINUTE,
        skill: "position-check",
        results: [
          "3 of 6 moved more than 2% - JNJ -3.1%, XOM +2.4%, TLT -2.2%.",
          "No position moved more than 2% since the last check.",
          "2 of 6 moved more than 2% - JNJ -2.6%, TLT -2.1%.",
        ],
      },
      {
        title: "Tracking what I promised",
        task: "Read the meeting notes in notes/ and keep a list of everything I promised the Harringtons, with what is still open.",
        every: 63 * MINUTE,
        skill: "next-steps",
        results: [
          "Book the client dinner for the Okafor review - still open.",
          "4 promises tracked, 1 still open: the client dinner.",
        ],
      },
    ],
  },
  {
    name: "Focus: quarterly rebalance",
    goal: "protect the focus block and get the rebalance trades right",
    color: "purple",
    agenda: { title: "Focus: quarterly rebalance", hour: 13, minute: 0 },
    agents: [
      {
        title: "Watching the positions I am about to trade",
        task: "Watch the positions in trades.csv and tell me if any moves more than 2% before I place the trades.",
        every: 9 * MINUTE,
        skill: "movers",
        results: ["3 of 8 moved more than 2% - MSFT +2.3%, NVDA -2.9%, IEF -2.0%.", "Nothing moved more than 2%."],
      },
      {
        title: "Watching the rate the duration call hinges on",
        task: "Check the US 10-year Treasury yield and tell me if it crosses 4.6% or 4.8%.",
        every: 13 * MINUTE,
        skill: "rates",
        results: ["10-year at 4.7% - inside the band.", "10-year at 4.68%, drifting lower."],
      },
      {
        title: "Position guard",
        task: "Make sure no single position in the Okafor portfolio is above 8% of the total.",
        every: 2 * MINUTE,
        results: ["All positions under 8%.", "AAPL at 7.9% - close to the limit."],
      },
    ],
  },
  {
    name: "Focus: client proposals",
    goal: "get the proposals out",
    color: "yellow",
    agenda: { title: "Focus: client proposals", hour: 14, minute: 0 },
    agents: [
      {
        title: "Tracking what the proposals still need",
        task: "Check proposals/ and list what each draft still needs before it can go out.",
        every: 63 * MINUTE,
        skill: "next-steps",
        access: "write",
        results: ["Okafor proposal needs the fee table; Lee proposal is ready to send."],
      },
      {
        title: "Watching for news that changes the pitch",
        task: "Watch financial headlines for anything that changes the rate outlook in the proposals.",
        every: 12 * MINUTE,
        skill: "headline",
        results: ["Federal Reserve Chair Kevin Warsh signals a pause - the rate section still holds."],
      },
      {
        title: "Note checker",
        task: "Scan new meeting notes and turn action items into my todos.",
        every: 10 * MINUTE,
        results: ["Added 2 todos from meeting notes.", "No new action items."],
      },
    ],
  },
  {
    name: "Beach date - Half Moon Bay + Sam's Chowder House",
    goal: "make tonight easy",
    color: "blue",
    agenda: { title: "Beach date - Half Moon Bay + Sam's Chowder House", hour: 17, minute: 30 },
    agents: [
      {
        title: "Checking if the beach is worth it tonight",
        task: "Read the live Half Moon Bay cam and tell me if it is sunny enough for a sunset walk.",
        every: 10 * MINUTE,
        skill: "beach-cam",
        results: [
          "Sunny - clear view across the harbor, a few people at the water's edge.",
          "Light fog offshore, clearing. Still worth it.",
        ],
      },
      {
        title: "Checking the weather for tonight's date",
        task: "Check the forecast for Half Moon Bay between 17:00 and 21:00.",
        every: 30 * MINUTE,
        results: ["17 C, wind 8 kt NW, no rain - bring a jacket."],
      },
    ],
  },
  {
    name: "Dolomites wedding",
    goal: "travel, hotel and outfits sorted for the wedding",
    color: "pink",
    agents: [
      {
        title: "travel-booking",
        task: "Watch flights SFO to VCE for Sept 18-25 and tell me when a nonstop drops under $900.",
        every: 30 * MINUTE,
        results: ["Cheapest nonstop $1,140 - no change."],
      },
      {
        title: "hotel-booking",
        task: "Check availability at the three hotels near Cortina in hotels.md.",
        every: 45 * MINUTE,
        results: ["Hotel de la Poste has 2 rooms left for the wedding dates."],
      },
      {
        title: "outfit-scanning",
        task: "Look for linen suits in my size from the stores in outfits.md.",
        every: 60 * MINUTE,
        results: ["Found 2 navy linen suits under $400."],
      },
      {
        title: "calendar-monitoring",
        task: "Make sure nothing on my calendar collides with the wedding week.",
        every: 60 * MINUTE,
        results: ["No conflicts with the wedding week."],
      },
    ],
  },
  {
    name: "Markets",
    goal: "know what moved before anyone asks",
    color: "green",
    agents: [
      {
        title: "markets-news-watch",
        task: "Summarize market-moving headlines since the last run in two lines.",
        every: 5 * MINUTE,
        results: ["Futures flat; oil +1.2% on supply news.", "Tech leads, 10-year steady at 4.7%."],
      },
      {
        title: "markets-x-watch",
        task: "Watch the finance accounts in accounts.md for anything about my holdings.",
        every: 5 * MINUTE,
        results: ["Nothing about your holdings.", "Two posts mention NVDA guidance."],
      },
      {
        title: "meeting-watch",
        task: "Check today's agenda and prepare a one-paragraph brief before each meeting.",
        every: 15 * MINUTE,
        results: ["Brief for the 11:00 client review is ready in briefs/harrington.md."],
      },
    ],
  },
]

const TODOS = [
  {
    content: "Confirm the Harrington trust's bond ladder still matches the new duration target",
    source: "from meeting notes",
  },
  {
    content: "Rebalance the Okafor portfolio out of long-duration Treasuries and log the trade rationale",
    source: "from meeting notes",
  },
  { content: "Read the morning brief", done: true },
  { content: "Book the client dinner for the Okafor review" },
  { content: "Log the trade rationale for the Okafor rebalance" },
  { content: "Leave by 5:15 for the beach date" },
  { content: "Submit last week's expense report", done: true },
]

const SKILLS: ReadonlyArray<{ name: string; description: string; body: string }> = [
  {
    name: "position-check",
    description: "Which of the client's positions moved more than 2% since the last check.",
    body: "1. Read positions.csv in the folder.\n2. Compare each holding with today's price.\n3. List only the positions that moved more than 2%, biggest move first.\n4. If any moved more than 4%, post it to the inbox.",
  },
  {
    name: "next-steps",
    description: "What are my open next steps and promises from meeting notes.",
    body: "1. Read the newest notes in notes/.\n2. Extract every promise and next step with its owner.\n3. Add the ones I own to my todos with source 'from meeting notes'.\n4. Report what is still open.",
  },
  {
    name: "movers",
    description: "Which of the core positions in trades.csv are moving before the trade.",
    body: "1. Read trades.csv.\n2. Check each ticker's move today.\n3. Flag anything over 2% and say whether the planned trade still makes sense.",
  },
  {
    name: "rates",
    description: "What is the current US 10-year yield and is it inside the band.",
    body: "1. Look up the current US 10-year Treasury yield.\n2. Compare it with the band in the task.\n3. Post to the inbox only if it leaves the band.",
  },
  {
    name: "headline",
    description: "What is the top financial headline that could change the pitch.",
    body: "1. Search for the top financial headlines since the last run.\n2. Keep only the ones about rates, the Fed or the client's sectors.\n3. Summarize in one line and say whether the proposals need to change.",
  },
  {
    name: "beach-cam",
    description: "Read a live beach cam and say if the conditions are good tonight.",
    body: "1. Open the cam image linked in the task.\n2. Describe sky, fog and crowd in one sentence.\n3. Say clearly whether it is worth going and when to leave.",
  },
]

const MEMORIES = [
  "Dog's name is Biscuit",
  "Prefers briefs as short bullet points",
  "Works with the Harrington Family Trust and the Okafor family",
  "Sam's Chowder House is the go-to dinner spot in Half Moon Bay",
]

/** Seeds a realistic OpenWork workspace: spaces, agents with a day of run history, inbox, todos, agenda and memory. */
export const seed = Effect.fn("WorkDemo.seed")(function* (input: {
  readonly directory: string
  readonly now?: number
}) {
  const work = yield* Work.Service
  const fs = yield* FSUtil.Service
  const now = input.now ?? Date.now()
  // A working day of history: from 06:00 (or 10h back early in the morning) up to an hour ago.
  const start = Math.min(
    now - 60 * MINUTE,
    Math.max(WorkSchedule.startOfDay(now) + 6 * 60 * MINUTE, now - 10 * 60 * MINUTE),
  )
  const random = generator(42)
  const root = path.join(input.directory, "openwork-demo")
  // Leave the agents paused so the demo never spends tokens until the user resumes them.
  yield* work.setPaused(true)
  // Skills the demo agents use; project skills under .opencode/skills are picked up by chats and agents alike.
  yield* Effect.forEach(
    SKILLS,
    (skill) =>
      fs
        .writeWithDirs(
          path.join(input.directory, ".opencode", "skills", skill.name, "SKILL.md"),
          `---\nname: ${skill.name}\ndescription: ${skill.description}\n---\n\n# ${skill.name}\n\n${skill.body}\n`,
        )
        .pipe(Effect.orDie),
    { discard: true },
  )

  const created = yield* Effect.forEach(SPACES, (item) =>
    Effect.gen(function* () {
      const space = yield* work.space.create({ name: item.name, goal: item.goal, color: item.color })
      if (item.agenda) {
        const at = new Date(now)
        at.setHours(item.agenda.hour, item.agenda.minute, 0, 0)
        yield* work.agenda.add({ title: item.agenda.title, startsAt: at.getTime(), spaceID: space.id })
      }
      const directory = path.join(root, slug(item.name))
      yield* fs.ensureDir(directory).pipe(Effect.orDie)
      const agents = yield* Effect.forEach(item.agents, (agent) =>
        Effect.gen(function* () {
          const deployment = yield* work.deployment.create({
            title: agent.title,
            task: agent.task,
            directory,
            spaceID: space.id,
            agent: "work",
            schedule: { type: "interval", every: agent.every },
            access: agent.access ?? "read",
            ...(agent.skill ? { skill: agent.skill } : {}),
          })
          const offset = Math.floor(random() * agent.every)
          const slots = Math.max(0, Math.floor((now - start - offset) / agent.every) + 1)
          const times = Array.from({ length: slots }, (_, index) => start + offset + index * agent.every)
          yield* Effect.forEach(
            times,
            (started, index) =>
              work.run.record({
                deploymentID: deployment.id,
                trigger: "schedule",
                status: random() < 0.03 ? "error" : "done",
                summary: agent.results[index % agent.results.length],
                tokens: {
                  input: 1800 + Math.floor(random() * 2400),
                  output: 120 + Math.floor(random() * 300),
                  reasoning: 0,
                  cache: { read: Math.floor(random() * 800), write: 0 },
                },
                cost: 0,
                providerID: "ollama",
                modelID: "lfm2.5-1.2b",
                started,
                finished: started + 4_000 + Math.floor(random() * 20_000),
              }),
            { discard: true },
          )
          // The next slot of the same rhythm, so agents stay staggered instead of all firing at once.
          yield* work.deployment.reschedule(deployment.id, start + offset + slots * agent.every)
          return deployment
        }),
      )
      return { space, agents }
    }),
  )

  const find = (title: string) => created.flatMap((item) => item.agents).find((agent) => agent.title === title)
  const notes = find("Note checker")
  const beach = find("Checking if the beach is worth it tonight")
  const promises = find("Tracking what I promised")
  yield* work.message.post({
    title: "Note checker",
    body: "Book the client dinner for the Okafor review - Harrington Family Trust quarterly review.",
    ...(notes ? { deploymentID: notes.id } : {}),
  })
  yield* work.message.post({
    title: "Tracking what I promised",
    body: "Jonathan to book the client dinner for the Okafor review - Harrington Family Trust quarterly review [11:00].",
    ...(promises ? { deploymentID: promises.id } : {}),
  })
  const sunny = yield* work.message.post({
    title: "Tonight's conditions",
    body: "Sunny with a clear view across the harbor - worth it. Leave by 5:15 to make the sunset.",
    ...(beach ? { deploymentID: beach.id } : {}),
  })
  yield* work.message.update(sunny.id, { read: true })

  yield* Effect.forEach(
    TODOS,
    (item) =>
      Effect.gen(function* () {
        const todo = yield* work.todo.add({ content: item.content, ...(item.source ? { source: item.source } : {}) })
        if (item.done) yield* work.todo.update(todo.id, { done: true })
      }),
    { discard: true },
  )
  yield* Effect.forEach(MEMORIES, (content) => work.memory.save({ content, source: "demo" }), { discard: true })
  return { spaces: created.length, agents: created.reduce((sum, item) => sum + item.agents.length, 0), directory: root }
})

function slug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40)
}

/** Small deterministic generator so the demo looks the same every time. */
function generator(seed: number) {
  const state = { value: seed }
  return () => {
    state.value = (state.value * 1_103_515_245 + 12_345) % 2_147_483_648
    return state.value / 2_147_483_648
  }
}
