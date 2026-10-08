import { afterEach, describe, expect, test } from "bun:test"
import { Server } from "../../src/server/server"
import { WorkPaths } from "../../src/server/routes/instance/httpapi/groups/work"
import { resetDatabase } from "../fixture/db"
import { disposeAllInstances, tmpdir } from "../fixture/fixture"

afterEach(async () => {
  await disposeAllInstances()
  await resetDatabase()
})

const request = (path: string, init?: { method?: string; body?: unknown }) =>
  Server.Default().app.request(path, {
    method: init?.method ?? "GET",
    ...(init?.body === undefined
      ? {}
      : { body: JSON.stringify(init.body), headers: { "content-type": "application/json" } }),
  })

describe("work HttpApi", () => {
  test("deploys agents and manages the dashboard", async () => {
    await using tmp = await tmpdir()

    const space = await request(WorkPaths.spaces, { method: "POST", body: { name: "Beach date" } })
    expect(space.status).toBe(200)
    const spaceID = (await space.json()).id

    const created = await request(WorkPaths.deployments, {
      method: "POST",
      body: {
        title: "Check the beach",
        task: "Read the live cam",
        directory: tmp.path,
        spaceID,
        schedule: { type: "interval", every: 600_000 },
      },
    })
    expect(created.status).toBe(200)
    const deployment = await created.json()
    expect(deployment).toMatchObject({ agent: "work", access: "read", status: "active", spaceID })

    const missing = await request(WorkPaths.deployments, {
      method: "POST",
      body: { title: "x", task: "x", directory: tmp.path + "/missing", schedule: { type: "manual" } },
    })
    expect(missing.status).toBe(400)

    const paused = await request(WorkPaths.deployment.replace(":deploymentID", deployment.id), {
      method: "PATCH",
      body: { status: "paused" },
    })
    expect((await paused.json()).status).toBe("paused")

    const todo = await (await request(WorkPaths.todos, { method: "POST", body: { content: "Book a table" } })).json()
    await request(WorkPaths.todo.replace(":todoID", todo.id), { method: "PATCH", body: { done: true } })
    await request(WorkPaths.agendas, { method: "POST", body: { title: "Sunset", startsAt: Date.now() + 60_000 } })
    await request(WorkPaths.memories, { method: "POST", body: { content: "Dog is called Biscuit" } })

    const chat = await request(WorkPaths.deploymentChat.replace(":deploymentID", deployment.id), { method: "POST" })
    expect(chat.status).toBe(200)
    const sessionID = (await chat.json()).sessionID
    const again = await request(WorkPaths.deploymentChat.replace(":deploymentID", deployment.id), { method: "POST" })
    expect((await again.json()).sessionID).toBe(sessionID)

    const state = await (await request(WorkPaths.state)).json()
    expect(state.deployments).toHaveLength(1)
    expect(state.deployments[0].chatSessionID).toBe(sessionID)
    expect(state.todos[0].time.done).toBeNumber()
    expect(state.agenda[0].title).toBe("Sunset")
    expect(state.memories[0].content).toBe("Dog is called Biscuit")

    const removed = await request(WorkPaths.deployment.replace(":deploymentID", deployment.id), { method: "DELETE" })
    expect(await removed.json()).toBe(true)
    const gone = await request(WorkPaths.deployment.replace(":deploymentID", deployment.id), { method: "DELETE" })
    expect(gone.status).toBe(404)
  })

  test("seeds the demo workspace paused", async () => {
    await using tmp = await tmpdir()
    const response = await request(WorkPaths.demo, { method: "POST", body: { directory: tmp.path } })
    expect(response.status).toBe(200)
    expect(await response.json()).toMatchObject({ spaces: 6, agents: 17 })
    const state = await (await request(WorkPaths.state)).json()
    expect(state.paused).toBe(true)
    expect(state.deployments).toHaveLength(17)
    expect(state.messages.length).toBeGreaterThan(0)
  })
})
