import { describe, expect } from "bun:test"
import { Effect } from "effect"
import { LayerNode } from "@opencode-ai/core/effect/layer-node"
import { Work } from "@opencode-ai/core/work"
import { testEffect } from "./lib/effect"

const it = testEffect(LayerNode.compile(Work.node))

const deploy = (work: Work.Interface, schedule: Work.Schedule) =>
  work.deployment.create({
    title: "Check the beach",
    task: "Read the live cam",
    directory: "/tmp",
    agent: "work",
    schedule,
  })

describe("Work", () => {
  it.effect("stores spaces, todos, agenda, memories and inbox messages", () =>
    Effect.gen(function* () {
      const work = yield* Work.Service
      const space = yield* work.space.create({ name: "Beach date", goal: "Half Moon Bay" })
      expect(space.color).toBe("purple")
      expect((yield* work.space.update(space.id, { goal: "Sam's Chowder House" })).goal).toBe("Sam's Chowder House")

      const first = yield* work.todo.add({ content: "Book a table", source: "from meeting notes" })
      const second = yield* work.todo.add({ content: "Leave by 5:15" })
      expect(second.position).toBe(first.position + 1)
      expect((yield* work.todo.update(first.id, { done: true })).time.done).toBeNumber()

      const message = yield* work.message.post({ title: "Beach watcher", body: "Fog clears at 5pm" })
      expect(message.priority).toBe("normal")
      expect((yield* work.message.update(message.id, { done: true })).time.read).toBeNumber()

      yield* work.agenda.add({ title: "Beach date", startsAt: Date.now() + 1000, spaceID: space.id })
      yield* work.memory.save({ content: "My dog is called Biscuit" })

      const state = yield* work.state()
      expect(state.spaces).toHaveLength(1)
      expect(state.todos.map((todo) => todo.content)).toEqual(["Book a table", "Leave by 5:15"])
      expect(state.messages).toHaveLength(1)
      expect(state.agenda[0]?.spaceID).toBe(space.id)
      expect(state.memories[0]?.content).toBe("My dog is called Biscuit")

      yield* work.space.remove(space.id)
      expect((yield* work.agenda.list())[0]?.spaceID).toBeUndefined()
      expect(yield* work.todo.remove(Work.TodoID.make("wtd_missing")).pipe(Effect.flip)).toBeInstanceOf(
        Work.NotFoundError,
      )
    }),
  )

  it.effect("claims each scheduled slot once", () =>
    Effect.gen(function* () {
      const work = yield* Work.Service
      const deployment = yield* deploy(work, { type: "interval", every: 600_000 })
      const now = Date.now() + 1

      expect((yield* work.deployment.due(now)).map((item) => item.id)).toEqual([deployment.id])
      const run = yield* work.run.claim({ deploymentID: deployment.id, trigger: "schedule", now, pid: process.pid })
      expect(run?.number).toBe(1)
      expect(run?.status).toBe("running")
      expect(yield* work.run.claim({ deploymentID: deployment.id, trigger: "manual", now, pid: process.pid })).toBe(
        undefined,
      )
      expect(yield* work.deployment.due(now + 600_000)).toEqual([])

      yield* work.run.finish(run!.id, {
        status: "done",
        summary: "Sunny",
        tokens: { input: 1200, output: 80, reasoning: 0, cache: { read: 0, write: 0 } },
        cost: 0.01,
      })
      const updated = (yield* work.deployment.get(deployment.id))!
      expect(updated.runCount).toBe(1)
      expect(updated.nextRunAt).toBe(now + 600_000)
      expect(yield* work.run.claim({ deploymentID: deployment.id, trigger: "schedule", now, pid: process.pid })).toBe(
        undefined,
      )

      const state = yield* work.state(now)
      expect(state.latest[0]?.summary).toBe("Sunny")
      expect(state.latest[0]?.tokens.input).toBe(1200)
      expect(state.runs).toHaveLength(1)
    }),
  )

  it.effect("runs requested agents even while paused and recovers dead runs", () =>
    Effect.gen(function* () {
      const work = yield* Work.Service
      const deployment = yield* deploy(work, { type: "manual" })
      yield* work.setPaused(true)
      expect(yield* work.deployment.due(Date.now())).toEqual([])

      yield* work.deployment.requestRun(deployment.id)
      expect((yield* work.deployment.due(Date.now())).map((item) => item.id)).toEqual([deployment.id])
      const run = yield* work.run.claim({
        deploymentID: deployment.id,
        trigger: "schedule",
        now: Date.now(),
        pid: 999_999_999,
      })
      expect(run).toBeDefined()
      expect((yield* work.deployment.get(deployment.id))?.runRequestedAt).toBeUndefined()

      yield* work.run.recover((pid) => pid === process.pid)
      expect((yield* work.run.get(run!.id))?.status).toBe("error")
      expect((yield* work.state()).paused).toBe(true)
    }),
  )

  it.effect("finishes one-off agents after their only run", () =>
    Effect.gen(function* () {
      const work = yield* Work.Service
      const deployment = yield* deploy(work, { type: "once", at: 0 })
      const run = yield* work.run.claim({
        deploymentID: deployment.id,
        trigger: "schedule",
        now: Date.now() + 1,
        pid: process.pid,
      })
      expect(run).toBeDefined()
      const updated = (yield* work.deployment.get(deployment.id))!
      expect(updated.status).toBe("done")
      expect(updated.nextRunAt).toBeUndefined()
    }),
  )
})
