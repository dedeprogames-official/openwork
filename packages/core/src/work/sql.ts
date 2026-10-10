import { index, integer, real, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core"
import { Timestamps } from "../database/schema.sql"
import type { Work } from "@opencode-ai/schema/work"

export const WorkSpaceTable = sqliteTable("work_space", {
  id: text().$type<Work.SpaceID>().primaryKey(),
  name: text().notNull(),
  goal: text(),
  color: text().$type<Work.Color>().notNull(),
  ...Timestamps,
})

export const WorkDeploymentTable = sqliteTable(
  "work_deployment",
  {
    id: text().$type<Work.DeploymentID>().primaryKey(),
    space_id: text()
      .$type<Work.SpaceID>()
      .references(() => WorkSpaceTable.id, { onDelete: "set null" }),
    title: text().notNull(),
    task: text().notNull(),
    directory: text().notNull(),
    agent: text().notNull(),
    model: text({ mode: "json" }).$type<Work.ModelRef>(),
    skill: text(),
    schedule: text({ mode: "json" }).$type<Work.Schedule>().notNull(),
    access: text().$type<Work.Access>().notNull(),
    status: text().$type<Work.DeploymentStatus>().notNull(),
    next_run_at: integer(),
    last_run_at: integer(),
    run_requested_at: integer(),
    run_count: integer().notNull().default(0),
    chat_session_id: text(),
    ...Timestamps,
  },
  (table) => [index("work_deployment_due_idx").on(table.status, table.next_run_at)],
)

export const WorkRunTable = sqliteTable(
  "work_run",
  {
    id: text().$type<Work.RunID>().primaryKey(),
    deployment_id: text()
      .$type<Work.DeploymentID>()
      .notNull()
      .references(() => WorkDeploymentTable.id, { onDelete: "cascade" }),
    number: integer().notNull(),
    status: text().$type<Work.RunStatus>().notNull(),
    trigger: text().$type<Work.RunTrigger>().notNull(),
    owner_pid: integer(),
    session_id: text(),
    summary: text(),
    error: text(),
    tokens_input: integer().notNull().default(0),
    tokens_output: integer().notNull().default(0),
    tokens_reasoning: integer().notNull().default(0),
    tokens_cache_read: integer().notNull().default(0),
    tokens_cache_write: integer().notNull().default(0),
    cost: real().notNull().default(0),
    provider_id: text(),
    model_id: text(),
    time_started: integer().notNull(),
    time_finished: integer(),
  },
  (table) => [
    index("work_run_deployment_idx").on(table.deployment_id, table.number),
    index("work_run_started_idx").on(table.time_started),
  ],
)

export const WorkMessageTable = sqliteTable("work_message", {
  id: text().$type<Work.MessageID>().primaryKey(),
  deployment_id: text()
    .$type<Work.DeploymentID>()
    .references(() => WorkDeploymentTable.id, { onDelete: "set null" }),
  run_id: text().$type<Work.RunID>(),
  session_id: text(),
  title: text().notNull(),
  body: text().notNull(),
  priority: text().$type<Work.Priority>().notNull(),
  time_read: integer(),
  time_done: integer(),
  ...Timestamps,
})

export const WorkTodoTable = sqliteTable("work_todo", {
  id: text().$type<Work.TodoID>().primaryKey(),
  content: text().notNull(),
  source: text(),
  deployment_id: text()
    .$type<Work.DeploymentID>()
    .references(() => WorkDeploymentTable.id, { onDelete: "set null" }),
  position: integer().notNull(),
  time_done: integer(),
  ...Timestamps,
})

export const WorkAgendaTable = sqliteTable(
  "work_agenda",
  {
    id: text().$type<Work.AgendaID>().primaryKey(),
    title: text().notNull(),
    starts_at: integer().notNull(),
    ends_at: integer(),
    space_id: text()
      .$type<Work.SpaceID>()
      .references(() => WorkSpaceTable.id, { onDelete: "set null" }),
    note: text(),
    ...Timestamps,
  },
  (table) => [index("work_agenda_starts_idx").on(table.starts_at)],
)

export const WorkMemoryTable = sqliteTable("work_memory", {
  id: text().$type<Work.MemoryID>().primaryKey(),
  content: text().notNull(),
  source: text(),
  ...Timestamps,
})

export const WorkSettingTable = sqliteTable("work_setting", {
  key: text().primaryKey(),
  value: text({ mode: "json" }).$type<unknown>().notNull(),
  ...Timestamps,
})

/** Sessions answering right now; rows whose process has died are picked up again on the next start. */
export const WorkResumeTable = sqliteTable("work_resume", {
  session_id: text().primaryKey(),
  owner_pid: integer().notNull(),
  ...Timestamps,
})

/** Permissions the user chose to always allow, per folder. */
export const WorkPermissionTable = sqliteTable(
  "work_permission",
  {
    id: text().$type<Work.PermissionID>().primaryKey(),
    directory: text().notNull(),
    permission: text().notNull(),
    pattern: text().notNull(),
    ...Timestamps,
  },
  (table) => [uniqueIndex("work_permission_rule_idx").on(table.directory, table.permission, table.pattern)],
)
