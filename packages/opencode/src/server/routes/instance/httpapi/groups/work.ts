import { Work } from "@opencode-ai/schema/work"
import { Schema } from "effect"
import { HttpApi, HttpApiEndpoint, HttpApiGroup, OpenApi } from "effect/unstable/httpapi"
import { ConflictError, InvalidRequestError, WorkNotFoundError } from "../errors"
import { described } from "./metadata"

const root = "/work"

export const WorkPaths = {
  state: `${root}/state`,
  version: `${root}/version`,
  pause: `${root}/pause`,
  defaults: `${root}/defaults`,
  demo: `${root}/demo`,
  deployments: `${root}/deployment`,
  deployment: `${root}/deployment/:deploymentID`,
  deploymentRun: `${root}/deployment/:deploymentID/run`,
  deploymentRuns: `${root}/deployment/:deploymentID/runs`,
  deploymentChat: `${root}/deployment/:deploymentID/chat`,
  spaces: `${root}/space`,
  space: `${root}/space/:spaceID`,
  message: `${root}/message/:messageID`,
  messagesClear: `${root}/message/clear`,
  todos: `${root}/todo`,
  todo: `${root}/todo/:todoID`,
  agendas: `${root}/agenda`,
  agenda: `${root}/agenda/:agendaID`,
  memories: `${root}/memory`,
  memory: `${root}/memory/:memoryID`,
  permission: `${root}/permission/:permissionID`,
  integrations: `${root}/integration`,
  integrationsSync: `${root}/integration/sync`,
  integration: `${root}/integration/:name`,
} as const

const DemoResult = Schema.Struct({
  spaces: Schema.Number,
  agents: Schema.Number,
  directory: Schema.String,
}).annotate({ identifier: "Work.DemoResult" })

const MessageClearResult = Schema.Struct({
  removed: Schema.Number,
}).annotate({ identifier: "Work.MessageClearResult" })

const annotate = (identifier: string, summary: string, description: string) =>
  OpenApi.annotations({ identifier, summary, description })

export const WorkApi = HttpApi.make("work").add(
  HttpApiGroup.make("work")
    .add(
      HttpApiEndpoint.get("state", WorkPaths.state, {
        success: described(Work.State, "OpenWork dashboard state"),
      }).annotateMerge(
        annotate(
          "work.state",
          "Get OpenWork state",
          "Everything the OpenWork dashboard shows: spaces, deployed agents, today's runs, inbox, todos, agenda, memory and usage.",
        ),
      ),
      HttpApiEndpoint.get("version", WorkPaths.version, {
        success: described(Work.Version, "Installed and newest version"),
      }).annotateMerge(
        annotate("work.version", "Check for updates", "Compare the installed OpenWork with its newest GitHub release."),
      ),
      HttpApiEndpoint.post("pause", WorkPaths.pause, {
        payload: Work.PauseInput,
        success: described(Schema.Boolean, "Agents paused or resumed"),
      }).annotateMerge(annotate("work.pause", "Pause agents", "Pause or resume every scheduled agent.")),
      HttpApiEndpoint.patch("defaults", WorkPaths.defaults, {
        payload: Work.DefaultsPatch,
        success: described(Work.Defaults, "Agent defaults"),
      }).annotateMerge(
        annotate(
          "work.defaults",
          "Set agent defaults",
          "Change the access and run-on-deploy defaults for new agents, including ones the deploy tool creates.",
        ),
      ),
      HttpApiEndpoint.post("demo", WorkPaths.demo, {
        payload: Work.DemoInput,
        success: described(DemoResult, "Demo workspace created"),
        error: InvalidRequestError,
      }).annotateMerge(
        annotate("work.demo", "Load demo", "Seed a demo workspace with spaces, agents, runs, inbox, todos and agenda."),
      ),
      HttpApiEndpoint.post("deploymentCreate", WorkPaths.deployments, {
        payload: Work.DeploymentCreate,
        success: described(Work.Deployment, "Deployed agent"),
        error: [InvalidRequestError, WorkNotFoundError, ConflictError],
      }).annotateMerge(
        annotate(
          "work.deployment.create",
          "Deploy agent",
          "Deploy an agent that runs a task in a folder on a schedule.",
        ),
      ),
      HttpApiEndpoint.patch("deploymentUpdate", WorkPaths.deployment, {
        params: { deploymentID: Work.DeploymentID },
        payload: Work.DeploymentPatch,
        success: described(Work.Deployment, "Updated agent"),
        error: [InvalidRequestError, WorkNotFoundError],
      }).annotateMerge(annotate("work.deployment.update", "Update agent", "Edit, pause or resume a deployed agent.")),
      HttpApiEndpoint.delete("deploymentRemove", WorkPaths.deployment, {
        params: { deploymentID: Work.DeploymentID },
        success: described(Schema.Boolean, "Agent removed"),
        error: WorkNotFoundError,
      }).annotateMerge(annotate("work.deployment.remove", "Remove agent", "Remove a deployed agent and its runs.")),
      HttpApiEndpoint.post("deploymentRun", WorkPaths.deploymentRun, {
        params: { deploymentID: Work.DeploymentID },
        success: described(Work.Run, "Started run"),
        error: [WorkNotFoundError, ConflictError],
      }).annotateMerge(annotate("work.deployment.run", "Run agent now", "Start a run of a deployed agent right away.")),
      HttpApiEndpoint.get("deploymentRuns", WorkPaths.deploymentRuns, {
        params: { deploymentID: Work.DeploymentID },
        success: described(Schema.Array(Work.Run), "Recent runs, newest first"),
        error: WorkNotFoundError,
      }).annotateMerge(
        annotate("work.deployment.runs", "List agent runs", "List the 50 most recent runs of an agent."),
      ),
      HttpApiEndpoint.post("deploymentChat", WorkPaths.deploymentChat, {
        params: { deploymentID: Work.DeploymentID },
        success: described(Work.ChatResult, "Chat session for the agent"),
        error: [WorkNotFoundError, InvalidRequestError],
      }).annotateMerge(
        annotate(
          "work.deployment.chat",
          "Chat with agent",
          "Get or create the session used to ask a deployed agent about its work.",
        ),
      ),
      HttpApiEndpoint.post("spaceCreate", WorkPaths.spaces, {
        payload: Work.SpaceCreate,
        success: described(Work.Space, "Created space"),
      }).annotateMerge(annotate("work.space.create", "Create space", "Create a space that groups agents.")),
      HttpApiEndpoint.patch("spaceUpdate", WorkPaths.space, {
        params: { spaceID: Work.SpaceID },
        payload: Work.SpacePatch,
        success: described(Work.Space, "Updated space"),
        error: WorkNotFoundError,
      }).annotateMerge(annotate("work.space.update", "Update space", "Rename a space or change its goal or color.")),
      HttpApiEndpoint.delete("spaceRemove", WorkPaths.space, {
        params: { spaceID: Work.SpaceID },
        success: described(Schema.Boolean, "Space removed"),
        error: WorkNotFoundError,
      }).annotateMerge(annotate("work.space.remove", "Remove space", "Remove a space; its agents stay deployed.")),
      HttpApiEndpoint.patch("messageUpdate", WorkPaths.message, {
        params: { messageID: Work.MessageID },
        payload: Work.MessagePatch,
        success: described(Work.Message, "Updated inbox message"),
        error: WorkNotFoundError,
      }).annotateMerge(
        annotate("work.message.update", "Update inbox message", "Mark an Agent Inbox message as read or done."),
      ),
      HttpApiEndpoint.delete("messageRemove", WorkPaths.message, {
        params: { messageID: Work.MessageID },
        success: described(Schema.Boolean, "Inbox message removed"),
        error: WorkNotFoundError,
      }).annotateMerge(annotate("work.message.remove", "Remove inbox message", "Delete an Agent Inbox message.")),
      HttpApiEndpoint.post("messageClear", WorkPaths.messagesClear, {
        payload: Work.MessageClear,
        success: described(MessageClearResult, "Inbox cleared"),
      }).annotateMerge(
        annotate("work.message.clear", "Clear inbox", "Delete every Agent Inbox message, or only the done ones."),
      ),
      HttpApiEndpoint.post("todoCreate", WorkPaths.todos, {
        payload: Work.TodoCreate,
        success: described(Work.Todo, "Created todo"),
      }).annotateMerge(annotate("work.todo.create", "Add todo", "Add an item to the user's todo list.")),
      HttpApiEndpoint.patch("todoUpdate", WorkPaths.todo, {
        params: { todoID: Work.TodoID },
        payload: Work.TodoPatch,
        success: described(Work.Todo, "Updated todo"),
        error: WorkNotFoundError,
      }).annotateMerge(annotate("work.todo.update", "Update todo", "Edit a todo or mark it done.")),
      HttpApiEndpoint.delete("todoRemove", WorkPaths.todo, {
        params: { todoID: Work.TodoID },
        success: described(Schema.Boolean, "Todo removed"),
        error: WorkNotFoundError,
      }).annotateMerge(annotate("work.todo.remove", "Remove todo", "Delete a todo.")),
      HttpApiEndpoint.post("agendaCreate", WorkPaths.agendas, {
        payload: Work.AgendaCreate,
        success: described(Work.Agenda, "Created event"),
      }).annotateMerge(annotate("work.agenda.create", "Add event", "Add an event to the user's agenda.")),
      HttpApiEndpoint.patch("agendaUpdate", WorkPaths.agenda, {
        params: { agendaID: Work.AgendaID },
        payload: Work.AgendaPatch,
        success: described(Work.Agenda, "Updated event"),
        error: WorkNotFoundError,
      }).annotateMerge(annotate("work.agenda.update", "Update event", "Edit an agenda event.")),
      HttpApiEndpoint.delete("agendaRemove", WorkPaths.agenda, {
        params: { agendaID: Work.AgendaID },
        success: described(Schema.Boolean, "Event removed"),
        error: WorkNotFoundError,
      }).annotateMerge(annotate("work.agenda.remove", "Remove event", "Delete an agenda event.")),
      HttpApiEndpoint.post("memoryCreate", WorkPaths.memories, {
        payload: Work.MemoryCreate,
        success: described(Work.Memory, "Saved memory"),
      }).annotateMerge(annotate("work.memory.create", "Save memory", "Save a fact for every OpenWork chat and agent.")),
      HttpApiEndpoint.delete("memoryRemove", WorkPaths.memory, {
        params: { memoryID: Work.MemoryID },
        success: described(Schema.Boolean, "Memory removed"),
        error: WorkNotFoundError,
      }).annotateMerge(annotate("work.memory.remove", "Forget memory", "Delete a saved memory.")),
      HttpApiEndpoint.delete("permissionRemove", WorkPaths.permission, {
        params: { permissionID: Work.PermissionID },
        success: described(Schema.Boolean, "Permission removed"),
        error: WorkNotFoundError,
      }).annotateMerge(
        annotate(
          "work.permission.remove",
          "Forget allowed permission",
          "Stop always allowing a permission; OpenWork asks again next time.",
        ),
      ),
      HttpApiEndpoint.get("integrations", WorkPaths.integrations, {
        success: described(
          Schema.Array(Work.Integration),
          "Integrations added in OpenWork or the global opencode.json",
        ),
      }).annotateMerge(
        annotate(
          "work.integration.list",
          "List integrations",
          "The MCP servers of the global opencode.json and the ones OpenWork holds until it can write them there.",
        ),
      ),
      HttpApiEndpoint.post("integrationCreate", WorkPaths.integrations, {
        payload: Work.IntegrationCreate,
        success: described(Work.Integration, "Integration added"),
        error: InvalidRequestError,
      }).annotateMerge(
        annotate(
          "work.integration.create",
          "Add integration",
          "Save an MCP server. It is kept by OpenWork at once and written to the global opencode.json when OpenWork closes.",
        ),
      ),
      HttpApiEndpoint.post("integrationsSync", WorkPaths.integrationsSync, {
        success: described(Work.IntegrationSync, "Integrations written to opencode.json"),
      }).annotateMerge(
        annotate(
          "work.integration.sync",
          "Write integrations to opencode.json",
          "Move the integrations OpenWork holds into the global opencode.json. OpenWork does this when it closes.",
        ),
      ),
      HttpApiEndpoint.delete("integrationRemove", WorkPaths.integration, {
        params: { name: Schema.String },
        success: described(Schema.Boolean, "Integration removed"),
        error: InvalidRequestError,
      }).annotateMerge(
        annotate(
          "work.integration.remove",
          "Remove integration",
          "Delete an MCP server from OpenWork and from the global opencode.json.",
        ),
      ),
    )
    .annotateMerge(OpenApi.annotations({ title: "work", description: "OpenWork dashboard routes." })),
)
