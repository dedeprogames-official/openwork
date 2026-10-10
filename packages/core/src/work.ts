export * as Work from "./work"

import { and, asc, desc, eq, gte, inArray, isNotNull, isNull, lte, or, sql } from "drizzle-orm"
import { Context, Effect, Layer, Schema } from "effect"
import { Work } from "@opencode-ai/schema/work"
import { Database } from "./database/database"
import { makeGlobalNode } from "./effect/app-node"
import { EventV2 } from "./event"
import { MessageTable, SessionTable } from "./session/sql"
import { WorkSchedule } from "./work/schedule"
import {
  WorkAgendaTable,
  WorkDeploymentTable,
  WorkMemoryTable,
  WorkMessageTable,
  WorkPermissionTable,
  WorkResumeTable,
  WorkRunTable,
  WorkSettingTable,
  WorkSpaceTable,
  WorkTodoTable,
} from "./work/sql"

export const SpaceID = Work.SpaceID
export type SpaceID = Work.SpaceID
export const DeploymentID = Work.DeploymentID
export type DeploymentID = Work.DeploymentID
export const RunID = Work.RunID
export type RunID = Work.RunID
export const MessageID = Work.MessageID
export type MessageID = Work.MessageID
export const TodoID = Work.TodoID
export type TodoID = Work.TodoID
export const AgendaID = Work.AgendaID
export type AgendaID = Work.AgendaID
export const MemoryID = Work.MemoryID
export type MemoryID = Work.MemoryID
export const PermissionID = Work.PermissionID
export type PermissionID = Work.PermissionID

export type Space = Work.Space
export type Deployment = Work.Deployment
export type Run = Work.Run
export type Message = Work.Message
export type Todo = Work.Todo
export type Agenda = Work.Agenda
export type Memory = Work.Memory
export type State = Work.State
export type Schedule = Work.Schedule
export type Access = Work.Access
export type Tokens = Work.Tokens
export type Kind = Work.Kind
export type Color = Work.Color
export type RunTrigger = Work.RunTrigger
export type SpaceCreate = Work.SpaceCreate
export type DeploymentCreate = Work.DeploymentCreate
export type DeploymentPatch = Work.DeploymentPatch
export type MessageCreate = Work.MessageCreate
export type TodoCreate = Work.TodoCreate
export type AgendaCreate = Work.AgendaCreate
export type MemoryCreate = Work.MemoryCreate

export const Colors = Work.Colors
export const Event = Work.Event

export class NotFoundError extends Schema.TaggedErrorClass<NotFoundError>()("Work.NotFoundError", {
  kind: Schema.String,
  id: Schema.String,
}) {}

export type RunOutcome = {
  readonly status: Exclude<Work.RunStatus, "running">
  readonly summary?: string
  readonly error?: string
  readonly tokens?: Work.Tokens
  readonly cost?: number
  readonly providerID?: string
  readonly modelID?: string
}

export interface Interface {
  /** Snapshot of everything the work dashboard renders. */
  readonly state: (now?: number) => Effect.Effect<Work.State>
  readonly paused: () => Effect.Effect<boolean>
  readonly setPaused: (paused: boolean) => Effect.Effect<void>
  /** Defaults for agents deployed from the TUI or by the `deploy` tool. */
  readonly defaults: () => Effect.Effect<Work.Defaults>
  readonly setDefaults: (patch: Work.DefaultsPatch) => Effect.Effect<Work.Defaults>
  /** MCP servers the user switched off; they stay off in every folder until switched back on. */
  readonly integrations: {
    readonly disabled: () => Effect.Effect<string[]>
    readonly setEnabled: (name: string, enabled: boolean) => Effect.Effect<void>
  }
  /** Sessions answering right now; any still listed at the next start were cut off when OpenWork stopped. */
  readonly resume: {
    readonly add: (sessionID: string, pid: number) => Effect.Effect<void>
    readonly remove: (sessionID: string) => Effect.Effect<void>
    readonly has: (sessionID: string) => Effect.Effect<boolean>
    /** Removes and returns the sessions whose process died, so exactly one live process picks each one up. */
    readonly take: (alive: (pid: number) => boolean) => Effect.Effect<string[]>
  }
  readonly space: {
    readonly list: () => Effect.Effect<Work.Space[]>
    readonly get: (id: SpaceID) => Effect.Effect<Work.Space | undefined>
    readonly create: (input: Work.SpaceCreate) => Effect.Effect<Work.Space>
    readonly update: (id: SpaceID, patch: Work.SpacePatch) => Effect.Effect<Work.Space, NotFoundError>
    readonly remove: (id: SpaceID) => Effect.Effect<void, NotFoundError>
  }
  readonly deployment: {
    readonly list: () => Effect.Effect<Work.Deployment[]>
    readonly get: (id: DeploymentID) => Effect.Effect<Work.Deployment | undefined>
    readonly create: (input: Work.DeploymentCreate & { readonly agent: string }) => Effect.Effect<Work.Deployment>
    readonly update: (id: DeploymentID, patch: Work.DeploymentPatch) => Effect.Effect<Work.Deployment, NotFoundError>
    readonly remove: (id: DeploymentID) => Effect.Effect<void, NotFoundError>
    /** Asks whichever process runs the scheduler to start this agent as soon as possible. */
    readonly requestRun: (id: DeploymentID) => Effect.Effect<void, NotFoundError>
    readonly setChat: (id: DeploymentID, sessionID: string) => Effect.Effect<void>
    /** Moves the next scheduled run, e.g. to stagger imported agents. */
    readonly reschedule: (id: DeploymentID, nextRunAt: number | undefined) => Effect.Effect<void>
    /** Deployments whose scheduled or requested run is due and that are not already running. */
    readonly due: (now: number) => Effect.Effect<Work.Deployment[]>
  }
  readonly run: {
    /**
     * Atomically starts a run. Returns undefined when another process already claimed this slot,
     * the deployment is busy, or the run is not due.
     */
    readonly claim: (input: {
      readonly deploymentID: DeploymentID
      readonly trigger: Work.RunTrigger
      readonly now: number
      readonly pid: number
    }) => Effect.Effect<Work.Run | undefined, NotFoundError>
    readonly attach: (id: RunID, sessionID: string) => Effect.Effect<void>
    /** Stores an already finished run, e.g. history imported from elsewhere. */
    readonly record: (
      input: RunOutcome & {
        readonly deploymentID: DeploymentID
        readonly trigger: Work.RunTrigger
        readonly started: number
        readonly finished: number
      },
    ) => Effect.Effect<Work.Run, NotFoundError>
    readonly finish: (id: RunID, outcome: RunOutcome) => Effect.Effect<void>
    readonly get: (id: RunID) => Effect.Effect<Work.Run | undefined>
    readonly list: (deploymentID: DeploymentID, limit?: number) => Effect.Effect<Work.Run[]>
    /** Marks runs whose owning process died as interrupted and returns them. */
    readonly recover: (alive: (pid: number) => boolean) => Effect.Effect<Work.Run[]>
  }
  readonly message: {
    readonly list: () => Effect.Effect<Work.Message[]>
    readonly post: (input: Work.MessageCreate) => Effect.Effect<Work.Message>
    readonly update: (id: MessageID, patch: Work.MessagePatch) => Effect.Effect<Work.Message, NotFoundError>
    readonly remove: (id: MessageID) => Effect.Effect<void, NotFoundError>
    /** Removes every message, or only the done ones, and returns how many were removed. */
    readonly clear: (input: Work.MessageClear) => Effect.Effect<number>
  }
  readonly todo: {
    readonly list: () => Effect.Effect<Work.Todo[]>
    readonly add: (input: Work.TodoCreate) => Effect.Effect<Work.Todo>
    readonly update: (id: TodoID, patch: Work.TodoPatch) => Effect.Effect<Work.Todo, NotFoundError>
    readonly remove: (id: TodoID) => Effect.Effect<void, NotFoundError>
  }
  readonly agenda: {
    readonly list: (range?: { readonly from: number; readonly until: number }) => Effect.Effect<Work.Agenda[]>
    readonly add: (input: Work.AgendaCreate) => Effect.Effect<Work.Agenda>
    readonly update: (id: AgendaID, patch: Work.AgendaPatch) => Effect.Effect<Work.Agenda, NotFoundError>
    readonly remove: (id: AgendaID) => Effect.Effect<void, NotFoundError>
  }
  readonly memory: {
    readonly list: () => Effect.Effect<Work.Memory[]>
    readonly save: (input: Work.MemoryCreate) => Effect.Effect<Work.Memory>
    readonly remove: (id: MemoryID) => Effect.Effect<void, NotFoundError>
  }
  /** "Always allow" answers, kept per folder so they survive a restart. */
  readonly permission: {
    readonly list: (directory?: string) => Effect.Effect<Work.Permission[]>
    readonly add: (input: {
      readonly directory: string
      readonly permission: string
      readonly patterns: ReadonlyArray<string>
    }) => Effect.Effect<void>
    readonly remove: (id: PermissionID) => Effect.Effect<void, NotFoundError>
  }
}

export class Service extends Context.Service<Service, Interface>()("@opencode/Work") {}

/** Why a run stopped when OpenWork closed or crashed before it finished. */
export const INTERRUPTED = "Interrupted: OpenWork stopped before this run finished"

const PAUSED = "paused"
const DEFAULT_ACCESS = "default_access"
const RUN_ON_DEPLOY = "run_on_deploy"
const MCP_DISABLED = "mcp_disabled"
const HOUR = 60 * 60 * 1000

const layer = Layer.effect(
  Service,
  Effect.gen(function* () {
    const database = yield* Database.Service
    const events = yield* EventV2.Service
    const db = database.db

    const changed = (kind: Work.Kind, id?: string) =>
      events.publish(Work.Event.Updated, id === undefined ? { kind } : { kind, id }).pipe(Effect.asVoid)

    const missing = (kind: string, id: string) => Effect.fail(new NotFoundError({ kind, id }))

    const setting = Effect.fn("Work.setting")(function* (key: string) {
      const row = yield* db
        .select()
        .from(WorkSettingTable)
        .where(eq(WorkSettingTable.key, key))
        .get()
        .pipe(Effect.orDie)
      return row?.value
    })

    const saveSetting = Effect.fn("Work.saveSetting")(function* (key: string, value: unknown) {
      yield* db
        .insert(WorkSettingTable)
        .values({ key, value })
        .onConflictDoUpdate({ target: WorkSettingTable.key, set: { value, time_updated: Date.now() } })
        .run()
        .pipe(Effect.orDie)
      yield* changed("settings", key)
    })

    const paused = Effect.fn("Work.paused")(function* () {
      return (yield* setting(PAUSED)) === true
    })

    const disabledIntegrations = Effect.fn("Work.integrations.disabled")(function* () {
      const value = yield* setting(MCP_DISABLED)
      return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : []
    })

    const defaults = Effect.fn("Work.defaults")(function* () {
      const access = yield* setting(DEFAULT_ACCESS)
      const runOnDeploy = yield* setting(RUN_ON_DEPLOY)
      return {
        access: Schema.is(Work.Access)(access) ? access : "read",
        runOnDeploy: typeof runOnDeploy === "boolean" ? runOnDeploy : true,
      } satisfies Work.Defaults
    })

    const getSpace = Effect.fn("Work.space.get")(function* (id: SpaceID) {
      const row = yield* db.select().from(WorkSpaceTable).where(eq(WorkSpaceTable.id, id)).get().pipe(Effect.orDie)
      return row ? fromSpace(row) : undefined
    })

    const getDeployment = Effect.fn("Work.deployment.get")(function* (id: DeploymentID) {
      const row = yield* db
        .select()
        .from(WorkDeploymentTable)
        .where(eq(WorkDeploymentTable.id, id))
        .get()
        .pipe(Effect.orDie)
      return row ? fromDeployment(row) : undefined
    })

    const getRun = Effect.fn("Work.run.get")(function* (id: RunID) {
      const row = yield* db.select().from(WorkRunTable).where(eq(WorkRunTable.id, id)).get().pipe(Effect.orDie)
      return row ? fromRun(row) : undefined
    })

    const running = Effect.fn("Work.running")(function* () {
      const rows = yield* db
        .select({ deploymentID: WorkRunTable.deployment_id })
        .from(WorkRunTable)
        .where(eq(WorkRunTable.status, "running"))
        .all()
        .pipe(Effect.orDie)
      return new Set(rows.map((row) => row.deploymentID))
    })

    const usage = Effect.fn("Work.usage")(function* (now: number) {
      const since = WorkSchedule.startOfDay(now)
      const hour = now - HOUR
      const from = Math.min(since, hour)
      const tokens = sql<number>`coalesce(json_extract(${MessageTable.data}, '$.tokens.input'), 0) + coalesce(json_extract(${MessageTable.data}, '$.tokens.output'), 0) + coalesce(json_extract(${MessageTable.data}, '$.tokens.reasoning'), 0) + coalesce(json_extract(${MessageTable.data}, '$.tokens.cache.read'), 0) + coalesce(json_extract(${MessageTable.data}, '$.tokens.cache.write'), 0)`
      const cost = sql<number>`coalesce(json_extract(${MessageTable.data}, '$.cost'), 0)`
      // Chats only: agent runs are counted from work_run below. Filtering sessions first lets the message
      // scan use the (session_id, time_created) index.
      const chats = yield* db
        .select({
          providerID: sql<string | null>`json_extract(${MessageTable.data}, '$.providerID')`,
          today: sql<number>`coalesce(sum(case when ${MessageTable.time_created} >= ${since} then ${tokens} else 0 end), 0)`,
          todayCost: sql<number>`coalesce(sum(case when ${MessageTable.time_created} >= ${since} then ${cost} else 0 end), 0)`,
          hour: sql<number>`coalesce(sum(case when ${MessageTable.time_created} >= ${hour} then ${tokens} else 0 end), 0)`,
          hourCost: sql<number>`coalesce(sum(case when ${MessageTable.time_created} >= ${hour} then ${cost} else 0 end), 0)`,
        })
        .from(MessageTable)
        .where(
          and(
            inArray(
              MessageTable.session_id,
              db
                .select({ id: SessionTable.id })
                .from(SessionTable)
                .where(
                  and(
                    gte(SessionTable.time_updated, from),
                    sql`json_extract(${SessionTable.metadata}, '$.openwork.kind') is not 'run'`,
                  ),
                ),
            ),
            gte(MessageTable.time_created, from),
            sql`json_extract(${MessageTable.data}, '$.role') = 'assistant'`,
          ),
        )
        .groupBy(sql`json_extract(${MessageTable.data}, '$.providerID')`)
        .all()
        .pipe(Effect.orDie)
      const runTokens = sql<number>`${WorkRunTable.tokens_input} + ${WorkRunTable.tokens_output} + ${WorkRunTable.tokens_reasoning} + ${WorkRunTable.tokens_cache_read} + ${WorkRunTable.tokens_cache_write}`
      const runs = yield* db
        .select({
          providerID: WorkRunTable.provider_id,
          today: sql<number>`coalesce(sum(case when ${WorkRunTable.time_started} >= ${since} then ${runTokens} else 0 end), 0)`,
          todayCost: sql<number>`coalesce(sum(case when ${WorkRunTable.time_started} >= ${since} then ${WorkRunTable.cost} else 0 end), 0)`,
          hour: sql<number>`coalesce(sum(case when ${WorkRunTable.time_started} >= ${hour} then ${runTokens} else 0 end), 0)`,
          hourCost: sql<number>`coalesce(sum(case when ${WorkRunTable.time_started} >= ${hour} then ${WorkRunTable.cost} else 0 end), 0)`,
        })
        .from(WorkRunTable)
        .where(gte(WorkRunTable.time_started, from))
        .groupBy(WorkRunTable.provider_id)
        .all()
        .pipe(Effect.orDie)
      const rows = [...chats, ...runs]
      const providers = new Map<string, { tokens: number; cost: number }>()
      for (const row of rows) {
        const key = row.providerID ?? "unknown"
        const current = providers.get(key) ?? { tokens: 0, cost: 0 }
        providers.set(key, { tokens: current.tokens + Number(row.today), cost: current.cost + Number(row.todayCost) })
      }
      return {
        today: {
          tokens: rows.reduce((sum, row) => sum + Number(row.today), 0),
          cost: rows.reduce((sum, row) => sum + Number(row.todayCost), 0),
        },
        hour: {
          tokens: rows.reduce((sum, row) => sum + Number(row.hour), 0),
          cost: rows.reduce((sum, row) => sum + Number(row.hourCost), 0),
        },
        providers: Array.from(providers.entries())
          .filter((entry) => entry[1].tokens > 0)
          .map((entry) => ({ providerID: entry[0], tokens: entry[1].tokens, cost: entry[1].cost })),
      }
    })

    return Service.of({
      paused,
      setPaused: Effect.fn("Work.setPaused")(function* (value: boolean) {
        yield* saveSetting(PAUSED, value)
      }),
      defaults,
      setDefaults: Effect.fn("Work.setDefaults")(function* (patch: Work.DefaultsPatch) {
        if (patch.access !== undefined) yield* saveSetting(DEFAULT_ACCESS, patch.access)
        if (patch.runOnDeploy !== undefined) yield* saveSetting(RUN_ON_DEPLOY, patch.runOnDeploy)
        return yield* defaults()
      }),
      integrations: {
        disabled: disabledIntegrations,
        setEnabled: Effect.fn("Work.integrations.setEnabled")(function* (name: string, enabled: boolean) {
          const current = yield* disabledIntegrations()
          const next = enabled ? current.filter((item) => item !== name) : Array.from(new Set([...current, name]))
          if (next.length === current.length && next.every((item, index) => item === current[index])) return
          yield* saveSetting(MCP_DISABLED, next)
        }),
      },
      resume: {
        add: Effect.fn("Work.resume.add")(function* (sessionID: string, pid: number) {
          yield* db
            .insert(WorkResumeTable)
            .values({ session_id: sessionID, owner_pid: pid })
            .onConflictDoUpdate({
              target: WorkResumeTable.session_id,
              set: { owner_pid: pid, time_updated: Date.now() },
            })
            .run()
            .pipe(Effect.orDie)
        }),
        remove: Effect.fn("Work.resume.remove")(function* (sessionID: string) {
          yield* db.delete(WorkResumeTable).where(eq(WorkResumeTable.session_id, sessionID)).run().pipe(Effect.orDie)
        }),
        has: Effect.fn("Work.resume.has")(function* (sessionID: string) {
          const row = yield* db
            .select({ id: WorkResumeTable.session_id })
            .from(WorkResumeTable)
            .where(eq(WorkResumeTable.session_id, sessionID))
            .get()
            .pipe(Effect.orDie)
          return row !== undefined
        }),
        take: Effect.fn("Work.resume.take")(function* (alive: (pid: number) => boolean) {
          const rows = yield* db
            .select({ id: WorkResumeTable.session_id, pid: WorkResumeTable.owner_pid })
            .from(WorkResumeTable)
            .all()
            .pipe(Effect.orDie)
          const dead = rows.filter((row) => !alive(row.pid)).map((row) => row.id)
          if (dead.length === 0) return []
          // Another process may take the same rows at the same moment; each row is deleted, and returned, only once.
          const taken = yield* db
            .delete(WorkResumeTable)
            .where(inArray(WorkResumeTable.session_id, dead))
            .returning({ id: WorkResumeTable.session_id })
            .all()
            .pipe(Effect.orDie)
          return taken.map((row) => row.id)
        }),
      },
      state: Effect.fn("Work.state")(function* (input?: number) {
        const now = input ?? Date.now()
        const since = WorkSchedule.startOfDay(now)
        const until = WorkSchedule.endOfDay(now)
        const [
          isPaused,
          preferences,
          spaces,
          deployments,
          latest,
          runs,
          messages,
          todos,
          agenda,
          memories,
          permissions,
          totals,
        ] = yield* Effect.all([
          paused(),
          defaults(),
          db.select().from(WorkSpaceTable).orderBy(asc(WorkSpaceTable.time_created)).all(),
          db.select().from(WorkDeploymentTable).orderBy(asc(WorkDeploymentTable.time_created)).all(),
          db
            .select()
            .from(WorkRunTable)
            .where(
              sql`(${WorkRunTable.deployment_id}, ${WorkRunTable.number}) in (select deployment_id, max(number) from work_run group by deployment_id)`,
            )
            .all(),
          db
            .select()
            .from(WorkRunTable)
            .where(gte(WorkRunTable.time_started, since))
            .orderBy(desc(WorkRunTable.time_started))
            .limit(2000)
            .all(),
          db.select().from(WorkMessageTable).orderBy(desc(WorkMessageTable.time_created)).limit(100).all(),
          db
            .select()
            .from(WorkTodoTable)
            .where(or(isNull(WorkTodoTable.time_done), gte(WorkTodoTable.time_done, since)))
            .orderBy(asc(WorkTodoTable.position))
            .all(),
          db
            .select()
            .from(WorkAgendaTable)
            .where(and(gte(WorkAgendaTable.starts_at, since), lte(WorkAgendaTable.starts_at, since + 7 * 24 * HOUR)))
            .orderBy(asc(WorkAgendaTable.starts_at))
            .all(),
          db.select().from(WorkMemoryTable).orderBy(desc(WorkMemoryTable.time_created)).limit(200).all(),
          db.select().from(WorkPermissionTable).orderBy(asc(WorkPermissionTable.time_created)).all(),
          usage(now),
        ]).pipe(Effect.orDie)
        const projected = deployments
          .filter((row) => row.status === "active")
          .map((row) => ({
            deploymentID: row.id,
            times: WorkSchedule.between(row.schedule, row.next_run_at ?? undefined, until),
          }))
        const remaining = isPaused ? 0 : projected.reduce((sum, item) => sum + item.times.length, 0)
        return {
          now,
          paused: isPaused,
          defaults: preferences,
          spaces: spaces.map(fromSpace),
          deployments: deployments.map(fromDeployment),
          latest: latest.map(fromRun),
          runs: runs.map(fromRun).reverse(),
          upcoming: isPaused
            ? []
            : projected
                .flatMap((item) => item.times.slice(0, 200).map((at) => ({ deploymentID: item.deploymentID, at })))
                .toSorted((a, b) => a.at - b.at)
                .slice(0, 500),
          messages: messages.map(fromMessage),
          todos: todos.map(fromTodo),
          agenda: agenda.map(fromAgenda),
          memories: memories.map(fromMemory),
          permissions: permissions.map(fromPermission),
          usage: { ...totals, runsToday: runs.length, runsRemaining: remaining },
        } satisfies Work.State
      }),
      space: {
        list: Effect.fn("Work.space.list")(function* () {
          return (yield* db
            .select()
            .from(WorkSpaceTable)
            .orderBy(asc(WorkSpaceTable.time_created))
            .all()
            .pipe(Effect.orDie)).map(fromSpace)
        }),
        get: getSpace,
        create: Effect.fn("Work.space.create")(function* (input: Work.SpaceCreate) {
          const count = (yield* db.select({ id: WorkSpaceTable.id }).from(WorkSpaceTable).all().pipe(Effect.orDie))
            .length
          const id = SpaceID.create()
          yield* db
            .insert(WorkSpaceTable)
            .values({
              id,
              name: input.name,
              goal: input.goal,
              color: input.color ?? Work.Colors[count % Work.Colors.length],
            })
            .run()
            .pipe(Effect.orDie)
          yield* changed("space", id)
          return (yield* getSpace(id))!
        }),
        update: Effect.fn("Work.space.update")(function* (id: SpaceID, patch: Work.SpacePatch) {
          if (!(yield* getSpace(id))) return yield* missing("space", id)
          yield* db
            .update(WorkSpaceTable)
            .set({ name: patch.name, goal: patch.goal, color: patch.color })
            .where(eq(WorkSpaceTable.id, id))
            .run()
            .pipe(Effect.orDie)
          yield* changed("space", id)
          return (yield* getSpace(id))!
        }),
        remove: Effect.fn("Work.space.remove")(function* (id: SpaceID) {
          if (!(yield* getSpace(id))) return yield* missing("space", id)
          yield* db.delete(WorkSpaceTable).where(eq(WorkSpaceTable.id, id)).run().pipe(Effect.orDie)
          yield* changed("space", id)
        }),
      },
      deployment: {
        list: Effect.fn("Work.deployment.list")(function* () {
          return (yield* db
            .select()
            .from(WorkDeploymentTable)
            .orderBy(asc(WorkDeploymentTable.time_created))
            .all()
            .pipe(Effect.orDie)).map(fromDeployment)
        }),
        get: getDeployment,
        create: Effect.fn("Work.deployment.create")(function* (input) {
          const id = DeploymentID.create()
          yield* db
            .insert(WorkDeploymentTable)
            .values({
              id,
              space_id: input.spaceID,
              title: input.title,
              task: input.task,
              directory: input.directory,
              agent: input.agent,
              model: input.model,
              skill: input.skill,
              schedule: input.schedule,
              access: input.access ?? (yield* defaults()).access,
              status: "active",
              next_run_at: WorkSchedule.first(input.schedule, Date.now()),
            })
            .run()
            .pipe(Effect.orDie)
          yield* changed("deployment", id)
          return (yield* getDeployment(id))!
        }),
        update: Effect.fn("Work.deployment.update")(function* (id: DeploymentID, patch: Work.DeploymentPatch) {
          const current = yield* getDeployment(id)
          if (!current) return yield* missing("deployment", id)
          const schedule = patch.schedule ?? current.schedule
          const resumed = patch.status === "active" && current.status !== "active"
          const rescheduled = patch.schedule !== undefined || resumed
          yield* db
            .update(WorkDeploymentTable)
            .set({
              title: patch.title,
              task: patch.task,
              directory: patch.directory,
              space_id: patch.spaceID,
              agent: patch.agent,
              model: patch.model,
              skill: patch.skill,
              schedule: patch.schedule,
              access: patch.access,
              status: patch.status,
              ...(rescheduled
                ? {
                    next_run_at:
                      WorkSchedule.next(schedule, Date.now()) ?? WorkSchedule.first(schedule, Date.now()) ?? null,
                  }
                : {}),
            })
            .where(eq(WorkDeploymentTable.id, id))
            .run()
            .pipe(Effect.orDie)
          yield* changed("deployment", id)
          return (yield* getDeployment(id))!
        }),
        remove: Effect.fn("Work.deployment.remove")(function* (id: DeploymentID) {
          if (!(yield* getDeployment(id))) return yield* missing("deployment", id)
          yield* db.delete(WorkDeploymentTable).where(eq(WorkDeploymentTable.id, id)).run().pipe(Effect.orDie)
          yield* changed("deployment", id)
        }),
        requestRun: Effect.fn("Work.deployment.requestRun")(function* (id: DeploymentID) {
          if (!(yield* getDeployment(id))) return yield* missing("deployment", id)
          yield* db
            .update(WorkDeploymentTable)
            .set({ run_requested_at: Date.now() })
            .where(eq(WorkDeploymentTable.id, id))
            .run()
            .pipe(Effect.orDie)
          yield* changed("deployment", id)
        }),
        setChat: Effect.fn("Work.deployment.setChat")(function* (id: DeploymentID, sessionID: string) {
          yield* db
            .update(WorkDeploymentTable)
            .set({ chat_session_id: sessionID })
            .where(eq(WorkDeploymentTable.id, id))
            .run()
            .pipe(Effect.orDie)
          yield* changed("deployment", id)
        }),
        reschedule: Effect.fn("Work.deployment.reschedule")(function* (
          id: DeploymentID,
          nextRunAt: number | undefined,
        ) {
          yield* db
            .update(WorkDeploymentTable)
            .set({ next_run_at: nextRunAt ?? null })
            .where(eq(WorkDeploymentTable.id, id))
            .run()
            .pipe(Effect.orDie)
          yield* changed("deployment", id)
        }),
        due: Effect.fn("Work.deployment.due")(function* (now: number) {
          const isPaused = yield* paused()
          const busy = yield* running()
          const scheduled = and(
            eq(WorkDeploymentTable.status, "active"),
            isNotNull(WorkDeploymentTable.next_run_at),
            lte(WorkDeploymentTable.next_run_at, now),
          )
          const rows = yield* db
            .select()
            .from(WorkDeploymentTable)
            .where(
              isPaused
                ? isNotNull(WorkDeploymentTable.run_requested_at)
                : or(scheduled, isNotNull(WorkDeploymentTable.run_requested_at)),
            )
            .orderBy(asc(WorkDeploymentTable.next_run_at))
            .all()
            .pipe(Effect.orDie)
          return rows.filter((row) => !busy.has(row.id)).map(fromDeployment)
        }),
      },
      run: {
        claim: Effect.fn("Work.run.claim")(function* (input) {
          const current = yield* db
            .select()
            .from(WorkDeploymentTable)
            .where(eq(WorkDeploymentTable.id, input.deploymentID))
            .get()
            .pipe(Effect.orDie)
          if (!current) return yield* missing("deployment", input.deploymentID)
          const requested = current.run_requested_at !== null
          const scheduled =
            current.status === "active" && current.next_run_at !== null && current.next_run_at <= input.now
          if (input.trigger === "schedule" && !requested && !scheduled) return
          const nextRunAt = scheduled ? (WorkSchedule.next(current.schedule, input.now) ?? null) : current.next_run_at
          const finished = scheduled && current.schedule.type === "once"
          const id = RunID.create()
          const claimed = yield* db
            .transaction((tx) =>
              Effect.gen(function* () {
                const busy = yield* tx
                  .select({ id: WorkRunTable.id })
                  .from(WorkRunTable)
                  .where(and(eq(WorkRunTable.deployment_id, current.id), eq(WorkRunTable.status, "running")))
                  .get()
                if (busy) return false
                // run_count doubles as an optimistic lock: a concurrent claim bumps it first.
                const updated = yield* tx
                  .update(WorkDeploymentTable)
                  .set({
                    run_count: current.run_count + 1,
                    last_run_at: input.now,
                    next_run_at: nextRunAt,
                    run_requested_at: null,
                    ...(finished ? { status: "done" as const } : {}),
                  })
                  .where(
                    and(eq(WorkDeploymentTable.id, current.id), eq(WorkDeploymentTable.run_count, current.run_count)),
                  )
                  .returning({ id: WorkDeploymentTable.id })
                  .get()
                if (!updated) return false
                yield* tx
                  .insert(WorkRunTable)
                  .values({
                    id,
                    deployment_id: current.id,
                    number: current.run_count + 1,
                    status: "running",
                    trigger: input.trigger,
                    owner_pid: input.pid,
                    time_started: input.now,
                  })
                  .run()
                return true
              }),
            )
            .pipe(Effect.orDie)
          if (!claimed) return
          yield* changed("run", id)
          return yield* getRun(id)
        }),
        record: Effect.fn("Work.run.record")(function* (input) {
          const current = yield* getDeployment(input.deploymentID)
          if (!current) return yield* missing("deployment", input.deploymentID)
          const id = RunID.create()
          yield* db
            .transaction((tx) =>
              Effect.gen(function* () {
                yield* tx
                  .update(WorkDeploymentTable)
                  .set({
                    run_count: current.runCount + 1,
                    last_run_at: Math.max(current.lastRunAt ?? 0, input.started),
                  })
                  .where(eq(WorkDeploymentTable.id, current.id))
                  .run()
                yield* tx
                  .insert(WorkRunTable)
                  .values({
                    id,
                    deployment_id: current.id,
                    number: current.runCount + 1,
                    status: input.status,
                    trigger: input.trigger,
                    summary: input.summary,
                    error: input.error,
                    tokens_input: input.tokens?.input,
                    tokens_output: input.tokens?.output,
                    tokens_reasoning: input.tokens?.reasoning,
                    tokens_cache_read: input.tokens?.cache.read,
                    tokens_cache_write: input.tokens?.cache.write,
                    cost: input.cost,
                    provider_id: input.providerID,
                    model_id: input.modelID,
                    time_started: input.started,
                    time_finished: input.finished,
                  })
                  .run()
              }),
            )
            .pipe(Effect.orDie)
          yield* changed("run", id)
          return (yield* getRun(id))!
        }),
        attach: Effect.fn("Work.run.attach")(function* (id: RunID, sessionID: string) {
          yield* db
            .update(WorkRunTable)
            .set({ session_id: sessionID })
            .where(eq(WorkRunTable.id, id))
            .run()
            .pipe(Effect.orDie)
          yield* changed("run", id)
        }),
        finish: Effect.fn("Work.run.finish")(function* (id: RunID, outcome: RunOutcome) {
          yield* db
            .update(WorkRunTable)
            .set({
              status: outcome.status,
              summary: outcome.summary,
              error: outcome.error,
              tokens_input: outcome.tokens?.input,
              tokens_output: outcome.tokens?.output,
              tokens_reasoning: outcome.tokens?.reasoning,
              tokens_cache_read: outcome.tokens?.cache.read,
              tokens_cache_write: outcome.tokens?.cache.write,
              cost: outcome.cost,
              provider_id: outcome.providerID,
              model_id: outcome.modelID,
              time_finished: Date.now(),
            })
            .where(eq(WorkRunTable.id, id))
            .run()
            .pipe(Effect.orDie)
          yield* changed("run", id)
        }),
        get: getRun,
        list: Effect.fn("Work.run.list")(function* (deploymentID: DeploymentID, limit?: number) {
          return (yield* db
            .select()
            .from(WorkRunTable)
            .where(eq(WorkRunTable.deployment_id, deploymentID))
            .orderBy(desc(WorkRunTable.number))
            .limit(limit ?? 50)
            .all()
            .pipe(Effect.orDie)).map(fromRun)
        }),
        recover: Effect.fn("Work.run.recover")(function* (alive: (pid: number) => boolean) {
          const rows = yield* db
            .select({ id: WorkRunTable.id, pid: WorkRunTable.owner_pid })
            .from(WorkRunTable)
            .where(eq(WorkRunTable.status, "running"))
            .all()
            .pipe(Effect.orDie)
          const dead = rows.filter((row) => row.pid === null || !alive(row.pid)).map((row) => row.id)
          if (dead.length === 0) return []
          const recovered = yield* db
            .update(WorkRunTable)
            .set({ status: "error", error: INTERRUPTED, time_finished: Date.now() })
            .where(and(inArray(WorkRunTable.id, dead), eq(WorkRunTable.status, "running")))
            .returning()
            .all()
            .pipe(Effect.orDie)
          if (recovered.length > 0) yield* changed("run")
          return recovered.map(fromRun)
        }),
      },
      message: {
        list: Effect.fn("Work.message.list")(function* () {
          return (yield* db
            .select()
            .from(WorkMessageTable)
            .orderBy(desc(WorkMessageTable.time_created))
            .limit(100)
            .all()
            .pipe(Effect.orDie)).map(fromMessage)
        }),
        post: Effect.fn("Work.message.post")(function* (input: Work.MessageCreate) {
          const id = MessageID.create()
          yield* db
            .insert(WorkMessageTable)
            .values({
              id,
              deployment_id: input.deploymentID,
              run_id: input.runID,
              session_id: input.sessionID,
              title: input.title,
              body: input.body,
              priority: input.priority ?? "normal",
            })
            .run()
            .pipe(Effect.orDie)
          yield* changed("message", id)
          return (yield* getMessage(id))!
        }),
        update: Effect.fn("Work.message.update")(function* (id: MessageID, patch: Work.MessagePatch) {
          if (!(yield* getMessage(id))) return yield* missing("message", id)
          const now = Date.now()
          yield* db
            .update(WorkMessageTable)
            .set({
              ...(patch.read === undefined ? {} : { time_read: patch.read ? now : null }),
              ...(patch.done === undefined ? {} : { time_done: patch.done ? now : null }),
              ...(patch.done ? { time_read: now } : {}),
            })
            .where(eq(WorkMessageTable.id, id))
            .run()
            .pipe(Effect.orDie)
          yield* changed("message", id)
          return (yield* getMessage(id))!
        }),
        remove: Effect.fn("Work.message.remove")(function* (id: MessageID) {
          if (!(yield* getMessage(id))) return yield* missing("message", id)
          yield* db.delete(WorkMessageTable).where(eq(WorkMessageTable.id, id)).run().pipe(Effect.orDie)
          yield* changed("message", id)
        }),
        clear: Effect.fn("Work.message.clear")(function* (input: Work.MessageClear) {
          const removed = yield* db
            .delete(WorkMessageTable)
            .where(input.done ? isNotNull(WorkMessageTable.time_done) : undefined)
            .returning({ id: WorkMessageTable.id })
            .all()
            .pipe(Effect.orDie)
          if (removed.length > 0) yield* changed("message")
          return removed.length
        }),
      },
      todo: {
        list: Effect.fn("Work.todo.list")(function* () {
          return (yield* db
            .select()
            .from(WorkTodoTable)
            .orderBy(asc(WorkTodoTable.position))
            .all()
            .pipe(Effect.orDie)).map(fromTodo)
        }),
        add: Effect.fn("Work.todo.add")(function* (input: Work.TodoCreate) {
          const last = yield* db
            .select({ position: WorkTodoTable.position })
            .from(WorkTodoTable)
            .orderBy(desc(WorkTodoTable.position))
            .get()
            .pipe(Effect.orDie)
          const id = TodoID.create()
          yield* db
            .insert(WorkTodoTable)
            .values({
              id,
              content: input.content,
              source: input.source,
              deployment_id: input.deploymentID,
              position: (last?.position ?? -1) + 1,
            })
            .run()
            .pipe(Effect.orDie)
          yield* changed("todo", id)
          return (yield* getTodo(id))!
        }),
        update: Effect.fn("Work.todo.update")(function* (id: TodoID, patch: Work.TodoPatch) {
          if (!(yield* getTodo(id))) return yield* missing("todo", id)
          yield* db
            .update(WorkTodoTable)
            .set({
              content: patch.content,
              ...(patch.done === undefined ? {} : { time_done: patch.done ? Date.now() : null }),
            })
            .where(eq(WorkTodoTable.id, id))
            .run()
            .pipe(Effect.orDie)
          yield* changed("todo", id)
          return (yield* getTodo(id))!
        }),
        remove: Effect.fn("Work.todo.remove")(function* (id: TodoID) {
          if (!(yield* getTodo(id))) return yield* missing("todo", id)
          yield* db.delete(WorkTodoTable).where(eq(WorkTodoTable.id, id)).run().pipe(Effect.orDie)
          yield* changed("todo", id)
        }),
      },
      agenda: {
        list: Effect.fn("Work.agenda.list")(function* (range?: { readonly from: number; readonly until: number }) {
          return (yield* db
            .select()
            .from(WorkAgendaTable)
            .where(
              range
                ? and(gte(WorkAgendaTable.starts_at, range.from), lte(WorkAgendaTable.starts_at, range.until))
                : undefined,
            )
            .orderBy(asc(WorkAgendaTable.starts_at))
            .all()
            .pipe(Effect.orDie)).map(fromAgenda)
        }),
        add: Effect.fn("Work.agenda.add")(function* (input: Work.AgendaCreate) {
          const id = AgendaID.create()
          yield* db
            .insert(WorkAgendaTable)
            .values({
              id,
              title: input.title,
              starts_at: input.startsAt,
              ends_at: input.endsAt,
              space_id: input.spaceID,
              note: input.note,
            })
            .run()
            .pipe(Effect.orDie)
          yield* changed("agenda", id)
          return (yield* getAgenda(id))!
        }),
        update: Effect.fn("Work.agenda.update")(function* (id: AgendaID, patch: Work.AgendaPatch) {
          if (!(yield* getAgenda(id))) return yield* missing("agenda", id)
          yield* db
            .update(WorkAgendaTable)
            .set({
              title: patch.title,
              starts_at: patch.startsAt,
              ends_at: patch.endsAt,
              space_id: patch.spaceID,
              note: patch.note,
            })
            .where(eq(WorkAgendaTable.id, id))
            .run()
            .pipe(Effect.orDie)
          yield* changed("agenda", id)
          return (yield* getAgenda(id))!
        }),
        remove: Effect.fn("Work.agenda.remove")(function* (id: AgendaID) {
          if (!(yield* getAgenda(id))) return yield* missing("agenda", id)
          yield* db.delete(WorkAgendaTable).where(eq(WorkAgendaTable.id, id)).run().pipe(Effect.orDie)
          yield* changed("agenda", id)
        }),
      },
      memory: {
        list: Effect.fn("Work.memory.list")(function* () {
          return (yield* db
            .select()
            .from(WorkMemoryTable)
            .orderBy(desc(WorkMemoryTable.time_created))
            .all()
            .pipe(Effect.orDie)).map(fromMemory)
        }),
        save: Effect.fn("Work.memory.save")(function* (input: Work.MemoryCreate) {
          const id = MemoryID.create()
          yield* db
            .insert(WorkMemoryTable)
            .values({ id, content: input.content, source: input.source })
            .run()
            .pipe(Effect.orDie)
          yield* changed("memory", id)
          return (yield* getMemory(id))!
        }),
        remove: Effect.fn("Work.memory.remove")(function* (id: MemoryID) {
          if (!(yield* getMemory(id))) return yield* missing("memory", id)
          yield* db.delete(WorkMemoryTable).where(eq(WorkMemoryTable.id, id)).run().pipe(Effect.orDie)
          yield* changed("memory", id)
        }),
      },
      permission: {
        list: Effect.fn("Work.permission.list")(function* (directory?: string) {
          return (yield* db
            .select()
            .from(WorkPermissionTable)
            .where(directory === undefined ? undefined : eq(WorkPermissionTable.directory, directory))
            .orderBy(asc(WorkPermissionTable.time_created))
            .all()
            .pipe(Effect.orDie)).map(fromPermission)
        }),
        add: Effect.fn("Work.permission.add")(function* (input) {
          if (input.patterns.length === 0) return
          yield* db
            .insert(WorkPermissionTable)
            .values(
              input.patterns.map((pattern) => ({
                id: PermissionID.create(),
                directory: input.directory,
                permission: input.permission,
                pattern,
              })),
            )
            .onConflictDoNothing()
            .run()
            .pipe(Effect.orDie)
          yield* changed("settings", "permission")
        }),
        remove: Effect.fn("Work.permission.remove")(function* (id: PermissionID) {
          const removed = yield* db
            .delete(WorkPermissionTable)
            .where(eq(WorkPermissionTable.id, id))
            .returning({ id: WorkPermissionTable.id })
            .all()
            .pipe(Effect.orDie)
          if (removed.length === 0) return yield* missing("permission", id)
          yield* changed("settings", "permission")
        }),
      },
    })

    function getMessage(id: MessageID) {
      return db
        .select()
        .from(WorkMessageTable)
        .where(eq(WorkMessageTable.id, id))
        .get()
        .pipe(
          Effect.orDie,
          Effect.map((row) => (row ? fromMessage(row) : undefined)),
        )
    }

    function getTodo(id: TodoID) {
      return db
        .select()
        .from(WorkTodoTable)
        .where(eq(WorkTodoTable.id, id))
        .get()
        .pipe(
          Effect.orDie,
          Effect.map((row) => (row ? fromTodo(row) : undefined)),
        )
    }

    function getAgenda(id: AgendaID) {
      return db
        .select()
        .from(WorkAgendaTable)
        .where(eq(WorkAgendaTable.id, id))
        .get()
        .pipe(
          Effect.orDie,
          Effect.map((row) => (row ? fromAgenda(row) : undefined)),
        )
    }

    function getMemory(id: MemoryID) {
      return db
        .select()
        .from(WorkMemoryTable)
        .where(eq(WorkMemoryTable.id, id))
        .get()
        .pipe(
          Effect.orDie,
          Effect.map((row) => (row ? fromMemory(row) : undefined)),
        )
    }
  }),
)

export const node = makeGlobalNode({ service: Service, layer, deps: [Database.node, EventV2.node] })

function present<const K extends string, V>(key: K, value: V | null | undefined) {
  return (value === null || value === undefined ? {} : { [key]: value }) as { readonly [P in K]?: V }
}

function fromSpace(row: typeof WorkSpaceTable.$inferSelect): Work.Space {
  return {
    id: row.id,
    name: row.name,
    ...present("goal", row.goal),
    color: row.color,
    time: { created: row.time_created, updated: row.time_updated },
  }
}

function fromDeployment(row: typeof WorkDeploymentTable.$inferSelect): Work.Deployment {
  return {
    id: row.id,
    ...present("spaceID", row.space_id),
    title: row.title,
    task: row.task,
    directory: row.directory,
    agent: row.agent,
    ...present("model", row.model),
    ...present("skill", row.skill),
    schedule: row.schedule,
    access: row.access,
    status: row.status,
    ...present("nextRunAt", row.next_run_at),
    ...present("lastRunAt", row.last_run_at),
    ...present("runRequestedAt", row.run_requested_at),
    runCount: row.run_count,
    ...present("chatSessionID", row.chat_session_id),
    time: { created: row.time_created, updated: row.time_updated },
  }
}

function fromRun(row: typeof WorkRunTable.$inferSelect): Work.Run {
  return {
    id: row.id,
    deploymentID: row.deployment_id,
    number: row.number,
    status: row.status,
    trigger: row.trigger,
    ...present("sessionID", row.session_id),
    ...present("summary", row.summary),
    ...present("error", row.error),
    tokens: {
      input: row.tokens_input,
      output: row.tokens_output,
      reasoning: row.tokens_reasoning,
      cache: { read: row.tokens_cache_read, write: row.tokens_cache_write },
    },
    cost: row.cost,
    ...present("providerID", row.provider_id),
    ...present("modelID", row.model_id),
    time: { started: row.time_started, ...present("finished", row.time_finished) },
  }
}

function fromMessage(row: typeof WorkMessageTable.$inferSelect): Work.Message {
  return {
    id: row.id,
    ...present("deploymentID", row.deployment_id),
    ...present("runID", row.run_id),
    ...present("sessionID", row.session_id),
    title: row.title,
    body: row.body,
    priority: row.priority,
    time: { created: row.time_created, ...present("read", row.time_read), ...present("done", row.time_done) },
  }
}

function fromTodo(row: typeof WorkTodoTable.$inferSelect): Work.Todo {
  return {
    id: row.id,
    content: row.content,
    ...present("source", row.source),
    ...present("deploymentID", row.deployment_id),
    position: row.position,
    time: { created: row.time_created, ...present("done", row.time_done) },
  }
}

function fromAgenda(row: typeof WorkAgendaTable.$inferSelect): Work.Agenda {
  return {
    id: row.id,
    title: row.title,
    startsAt: row.starts_at,
    ...present("endsAt", row.ends_at),
    ...present("spaceID", row.space_id),
    ...present("note", row.note),
    time: { created: row.time_created },
  }
}

function fromPermission(row: typeof WorkPermissionTable.$inferSelect): Work.Permission {
  return {
    id: row.id,
    directory: row.directory,
    permission: row.permission,
    pattern: row.pattern,
    time: { created: row.time_created },
  }
}

function fromMemory(row: typeof WorkMemoryTable.$inferSelect): Work.Memory {
  return {
    id: row.id,
    content: row.content,
    ...present("source", row.source),
    time: { created: row.time_created },
  }
}
