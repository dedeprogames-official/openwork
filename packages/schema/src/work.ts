export * as Work from "./work"

import { Schema } from "effect"
import { define, inventory } from "./event"
import { ascending } from "./identifier"
import { NonNegativeInt, optional, statics } from "./schema"

const id = <const Brand extends string>(prefix: string, brand: Brand) =>
  Schema.String.check(Schema.isStartsWith(prefix)).pipe(
    Schema.brand(brand),
    statics((schema) => ({ create: () => schema.make(prefix + ascending()) })),
  )

export const SpaceID = id("wsp_", "Work.SpaceID")
export type SpaceID = typeof SpaceID.Type
export const DeploymentID = id("wdp_", "Work.DeploymentID")
export type DeploymentID = typeof DeploymentID.Type
export const RunID = id("wrn_", "Work.RunID")
export type RunID = typeof RunID.Type
export const MessageID = id("wms_", "Work.MessageID")
export type MessageID = typeof MessageID.Type
export const TodoID = id("wtd_", "Work.TodoID")
export type TodoID = typeof TodoID.Type
export const AgendaID = id("wag_", "Work.AgendaID")
export type AgendaID = typeof AgendaID.Type
export const MemoryID = id("wmm_", "Work.MemoryID")
export type MemoryID = typeof MemoryID.Type
export const PermissionID = id("wpm_", "Work.PermissionID")
export type PermissionID = typeof PermissionID.Type

export const Color = Schema.Literals(["purple", "yellow", "blue", "green", "pink", "cyan", "orange"]).annotate({
  identifier: "Work.Color",
})
export type Color = typeof Color.Type
export const Colors = Color.literals

export const Schedule = Schema.Union([
  Schema.Struct({ type: Schema.Literal("manual") }),
  Schema.Struct({ type: Schema.Literal("once"), at: NonNegativeInt }),
  Schema.Struct({
    type: Schema.Literal("interval"),
    every: NonNegativeInt.annotate({ description: "Interval in milliseconds" }),
  }),
  Schema.Struct({
    type: Schema.Literal("daily"),
    at: Schema.String.annotate({ description: "Local time of day as HH:MM" }),
  }),
])
  .pipe(Schema.toTaggedUnion("type"))
  .annotate({ identifier: "Work.Schedule" })
export type Schedule = typeof Schedule.Type

export const Access = Schema.Literals(["read", "write", "full"]).annotate({ identifier: "Work.Access" })
export type Access = typeof Access.Type

export const DeploymentStatus = Schema.Literals(["active", "paused", "done"]).annotate({
  identifier: "Work.DeploymentStatus",
})
export type DeploymentStatus = typeof DeploymentStatus.Type

export const RunStatus = Schema.Literals(["running", "done", "error", "cancelled"]).annotate({
  identifier: "Work.RunStatus",
})
export type RunStatus = typeof RunStatus.Type

export const RunTrigger = Schema.Literals(["schedule", "manual"]).annotate({ identifier: "Work.RunTrigger" })
export type RunTrigger = typeof RunTrigger.Type

export const Priority = Schema.Literals(["normal", "high"]).annotate({ identifier: "Work.Priority" })
export type Priority = typeof Priority.Type

export const ModelRef = Schema.Struct({
  providerID: Schema.String,
  modelID: Schema.String,
}).annotate({ identifier: "Work.ModelRef" })
export interface ModelRef extends Schema.Schema.Type<typeof ModelRef> {}

export const Space = Schema.Struct({
  id: SpaceID,
  name: Schema.String,
  goal: optional(Schema.String),
  color: Color,
  time: Schema.Struct({ created: NonNegativeInt, updated: NonNegativeInt }),
}).annotate({ identifier: "Work.Space" })
export interface Space extends Schema.Schema.Type<typeof Space> {}

export const Deployment = Schema.Struct({
  id: DeploymentID,
  spaceID: optional(SpaceID),
  title: Schema.String,
  task: Schema.String,
  directory: Schema.String,
  agent: Schema.String,
  model: optional(ModelRef),
  skill: optional(Schema.String),
  schedule: Schedule,
  access: Access,
  status: DeploymentStatus,
  nextRunAt: optional(NonNegativeInt),
  lastRunAt: optional(NonNegativeInt),
  runRequestedAt: optional(NonNegativeInt),
  runCount: NonNegativeInt,
  chatSessionID: optional(Schema.String),
  time: Schema.Struct({ created: NonNegativeInt, updated: NonNegativeInt }),
}).annotate({ identifier: "Work.Deployment" })
export interface Deployment extends Schema.Schema.Type<typeof Deployment> {}

export const Tokens = Schema.Struct({
  input: NonNegativeInt,
  output: NonNegativeInt,
  reasoning: NonNegativeInt,
  cache: Schema.Struct({ read: NonNegativeInt, write: NonNegativeInt }),
}).annotate({ identifier: "Work.Tokens" })
export interface Tokens extends Schema.Schema.Type<typeof Tokens> {}

export const Run = Schema.Struct({
  id: RunID,
  deploymentID: DeploymentID,
  number: NonNegativeInt,
  status: RunStatus,
  trigger: RunTrigger,
  sessionID: optional(Schema.String),
  summary: optional(Schema.String),
  error: optional(Schema.String),
  tokens: Tokens,
  cost: Schema.Finite,
  providerID: optional(Schema.String),
  modelID: optional(Schema.String),
  time: Schema.Struct({ started: NonNegativeInt, finished: optional(NonNegativeInt) }),
}).annotate({ identifier: "Work.Run" })
export interface Run extends Schema.Schema.Type<typeof Run> {}

export const Message = Schema.Struct({
  id: MessageID,
  deploymentID: optional(DeploymentID),
  runID: optional(RunID),
  sessionID: optional(Schema.String),
  title: Schema.String,
  body: Schema.String,
  priority: Priority,
  time: Schema.Struct({ created: NonNegativeInt, read: optional(NonNegativeInt), done: optional(NonNegativeInt) }),
}).annotate({ identifier: "Work.Message" })
export interface Message extends Schema.Schema.Type<typeof Message> {}

export const Todo = Schema.Struct({
  id: TodoID,
  content: Schema.String,
  source: optional(Schema.String),
  deploymentID: optional(DeploymentID),
  position: NonNegativeInt,
  time: Schema.Struct({ created: NonNegativeInt, done: optional(NonNegativeInt) }),
}).annotate({ identifier: "Work.Todo" })
export interface Todo extends Schema.Schema.Type<typeof Todo> {}

export const Agenda = Schema.Struct({
  id: AgendaID,
  title: Schema.String,
  startsAt: NonNegativeInt,
  endsAt: optional(NonNegativeInt),
  spaceID: optional(SpaceID),
  note: optional(Schema.String),
  time: Schema.Struct({ created: NonNegativeInt }),
}).annotate({ identifier: "Work.Agenda" })
export interface Agenda extends Schema.Schema.Type<typeof Agenda> {}

export const Memory = Schema.Struct({
  id: MemoryID,
  content: Schema.String,
  source: optional(Schema.String),
  time: Schema.Struct({ created: NonNegativeInt }),
}).annotate({ identifier: "Work.Memory" })
export interface Memory extends Schema.Schema.Type<typeof Memory> {}

export const Permission = Schema.Struct({
  id: PermissionID,
  directory: Schema.String.annotate({ description: "Folder the approval applies to" }),
  permission: Schema.String,
  pattern: Schema.String,
  time: Schema.Struct({ created: NonNegativeInt }),
}).annotate({ identifier: "Work.Permission", description: "A permission the user chose to always allow" })
export interface Permission extends Schema.Schema.Type<typeof Permission> {}

export const ProviderUsage = Schema.Struct({
  providerID: Schema.String,
  tokens: NonNegativeInt,
  cost: Schema.Finite,
}).annotate({ identifier: "Work.ProviderUsage" })
export interface ProviderUsage extends Schema.Schema.Type<typeof ProviderUsage> {}

export const Usage = Schema.Struct({
  today: Schema.Struct({ tokens: NonNegativeInt, cost: Schema.Finite }),
  hour: Schema.Struct({ tokens: NonNegativeInt, cost: Schema.Finite }),
  providers: Schema.Array(ProviderUsage),
  runsToday: NonNegativeInt,
  runsRemaining: NonNegativeInt,
}).annotate({ identifier: "Work.Usage" })
export interface Usage extends Schema.Schema.Type<typeof Usage> {}

export const Upcoming = Schema.Struct({
  deploymentID: DeploymentID,
  at: NonNegativeInt,
}).annotate({ identifier: "Work.Upcoming" })
export interface Upcoming extends Schema.Schema.Type<typeof Upcoming> {}

export const Defaults = Schema.Struct({
  access: Access.annotate({ description: "Access new agents get unless one is chosen" }),
  runOnDeploy: Schema.Boolean.annotate({ description: "Run new agents once right after they are deployed" }),
}).annotate({ identifier: "Work.Defaults" })
export interface Defaults extends Schema.Schema.Type<typeof Defaults> {}

export const DefaultsPatch = Schema.Struct({
  access: optional(Access),
  runOnDeploy: optional(Schema.Boolean),
}).annotate({ identifier: "Work.DefaultsPatch" })
export interface DefaultsPatch extends Schema.Schema.Type<typeof DefaultsPatch> {}

export const State = Schema.Struct({
  now: NonNegativeInt,
  paused: Schema.Boolean,
  defaults: Defaults,
  spaces: Schema.Array(Space),
  deployments: Schema.Array(Deployment),
  latest: Schema.Array(Run).annotate({ description: "Most recent run of each deployment" }),
  runs: Schema.Array(Run).annotate({ description: "Runs started today, oldest first" }),
  upcoming: Schema.Array(Upcoming).annotate({ description: "Scheduled runs still to come today" }),
  messages: Schema.Array(Message),
  todos: Schema.Array(Todo),
  agenda: Schema.Array(Agenda),
  memories: Schema.Array(Memory),
  permissions: Schema.Array(Permission).annotate({ description: "Permissions the user chose to always allow" }),
  usage: Usage,
}).annotate({ identifier: "Work.State" })
export interface State extends Schema.Schema.Type<typeof State> {}

export const DeploymentCreate = Schema.Struct({
  title: Schema.String,
  task: Schema.String,
  directory: Schema.String,
  spaceID: optional(SpaceID),
  agent: optional(Schema.String),
  model: optional(ModelRef),
  skill: optional(Schema.String),
  schedule: Schedule,
  access: optional(Access),
  runNow: optional(
    Schema.Boolean.annotate({ description: "Run once right away; defaults to the runOnDeploy setting" }),
  ),
}).annotate({ identifier: "Work.DeploymentCreate" })
export interface DeploymentCreate extends Schema.Schema.Type<typeof DeploymentCreate> {}

export const DeploymentPatch = Schema.Struct({
  title: optional(Schema.String),
  task: optional(Schema.String),
  directory: optional(Schema.String),
  spaceID: optional(Schema.NullOr(SpaceID)),
  agent: optional(Schema.String),
  model: optional(Schema.NullOr(ModelRef)),
  skill: optional(Schema.NullOr(Schema.String)),
  schedule: optional(Schedule),
  access: optional(Access),
  status: optional(DeploymentStatus),
}).annotate({ identifier: "Work.DeploymentPatch" })
export interface DeploymentPatch extends Schema.Schema.Type<typeof DeploymentPatch> {}

export const SpaceCreate = Schema.Struct({
  name: Schema.String,
  goal: optional(Schema.String),
  color: optional(Color),
}).annotate({ identifier: "Work.SpaceCreate" })
export interface SpaceCreate extends Schema.Schema.Type<typeof SpaceCreate> {}

export const SpacePatch = Schema.Struct({
  name: optional(Schema.String),
  goal: optional(Schema.String),
  color: optional(Color),
}).annotate({ identifier: "Work.SpacePatch" })
export interface SpacePatch extends Schema.Schema.Type<typeof SpacePatch> {}

export const MessageCreate = Schema.Struct({
  title: Schema.String,
  body: Schema.String,
  priority: optional(Priority),
  deploymentID: optional(DeploymentID),
  runID: optional(RunID),
  sessionID: optional(Schema.String),
}).annotate({ identifier: "Work.MessageCreate" })
export interface MessageCreate extends Schema.Schema.Type<typeof MessageCreate> {}

export const MessagePatch = Schema.Struct({
  read: optional(Schema.Boolean),
  done: optional(Schema.Boolean),
}).annotate({ identifier: "Work.MessagePatch" })
export interface MessagePatch extends Schema.Schema.Type<typeof MessagePatch> {}

export const MessageClear = Schema.Struct({
  // Only remove messages already marked done; otherwise the whole inbox is cleared.
  done: optional(Schema.Boolean),
}).annotate({ identifier: "Work.MessageClear" })
export interface MessageClear extends Schema.Schema.Type<typeof MessageClear> {}

export const TodoCreate = Schema.Struct({
  content: Schema.String,
  source: optional(Schema.String),
  deploymentID: optional(DeploymentID),
}).annotate({ identifier: "Work.TodoCreate" })
export interface TodoCreate extends Schema.Schema.Type<typeof TodoCreate> {}

export const TodoPatch = Schema.Struct({
  content: optional(Schema.String),
  done: optional(Schema.Boolean),
}).annotate({ identifier: "Work.TodoPatch" })
export interface TodoPatch extends Schema.Schema.Type<typeof TodoPatch> {}

export const AgendaCreate = Schema.Struct({
  title: Schema.String,
  startsAt: NonNegativeInt,
  endsAt: optional(NonNegativeInt),
  spaceID: optional(SpaceID),
  note: optional(Schema.String),
}).annotate({ identifier: "Work.AgendaCreate" })
export interface AgendaCreate extends Schema.Schema.Type<typeof AgendaCreate> {}

export const AgendaPatch = Schema.Struct({
  title: optional(Schema.String),
  startsAt: optional(NonNegativeInt),
  endsAt: optional(Schema.NullOr(NonNegativeInt)),
  spaceID: optional(Schema.NullOr(SpaceID)),
  note: optional(Schema.NullOr(Schema.String)),
}).annotate({ identifier: "Work.AgendaPatch" })
export interface AgendaPatch extends Schema.Schema.Type<typeof AgendaPatch> {}

export const MemoryCreate = Schema.Struct({
  content: Schema.String,
  source: optional(Schema.String),
}).annotate({ identifier: "Work.MemoryCreate" })
export interface MemoryCreate extends Schema.Schema.Type<typeof MemoryCreate> {}

export const PauseInput = Schema.Struct({ paused: Schema.Boolean }).annotate({ identifier: "Work.PauseInput" })
export interface PauseInput extends Schema.Schema.Type<typeof PauseInput> {}

export const DemoInput = Schema.Struct({
  directory: optional(Schema.String.annotate({ description: "Folder the demo agents work in" })),
}).annotate({ identifier: "Work.DemoInput" })
export interface DemoInput extends Schema.Schema.Type<typeof DemoInput> {}

export const Version = Schema.Struct({
  current: Schema.String.annotate({ description: "Installed version, or local for a development build" }),
  latest: optional(Schema.String.annotate({ description: "Newest release on GitHub, when it could be checked" })),
  available: Schema.Boolean.annotate({ description: "A newer release can be installed with openwork upgrade" }),
}).annotate({ identifier: "Work.Version" })
export interface Version extends Schema.Schema.Type<typeof Version> {}

export const IntegrationCreate = Schema.Struct({
  name: Schema.String.annotate({ description: "Name of the integration; its tools are prefixed with it" }),
  type: Schema.Literals(["remote", "local"]).annotate({
    description: "remote connects to a URL, local starts a command on this computer",
  }),
  url: optional(Schema.String.annotate({ description: "URL of the MCP server (remote)" })),
  headers: optional(
    Schema.Record(Schema.String, Schema.String).annotate({ description: "Headers sent with every request (remote)" }),
  ),
  command: optional(Schema.Array(Schema.String).annotate({ description: "Command and its arguments (local)" })),
  environment: optional(
    Schema.Record(Schema.String, Schema.String).annotate({ description: "Environment variables of the command (local)" }),
  ),
}).annotate({ identifier: "Work.IntegrationCreate" })
export interface IntegrationCreate extends Schema.Schema.Type<typeof IntegrationCreate> {}

export const Integration = Schema.Struct({
  name: Schema.String,
  type: Schema.Literals(["remote", "local"]),
  target: Schema.String.annotate({
    description: "Where it connects: the URL without its query, or the program a local command starts",
  }),
  file: Schema.Boolean.annotate({
    description: "Already in the global opencode.json; false means OpenWork keeps it until it can write the file",
  }),
}).annotate({ identifier: "Work.Integration", description: "An integration added in OpenWork or the global opencode.json" })
export interface Integration extends Schema.Schema.Type<typeof Integration> {}

export const IntegrationSync = Schema.Struct({
  written: Schema.Array(Schema.String).annotate({ description: "Integrations written to the global opencode.json" }),
  warning: optional(Schema.String.annotate({ description: "Why the file could not be written, when it could not" })),
}).annotate({ identifier: "Work.IntegrationSync" })
export interface IntegrationSync extends Schema.Schema.Type<typeof IntegrationSync> {}

export const ChatResult = Schema.Struct({ sessionID: Schema.String }).annotate({ identifier: "Work.ChatResult" })
export interface ChatResult extends Schema.Schema.Type<typeof ChatResult> {}

export const Kind = Schema.Literals(["space", "deployment", "run", "message", "todo", "agenda", "memory", "settings"])
export type Kind = typeof Kind.Type

const Updated = define({
  type: "work.updated",
  schema: {
    kind: Kind,
    id: optional(Schema.String),
  },
})
export const Event = { Updated, Definitions: inventory(Updated) }
