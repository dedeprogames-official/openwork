import { Match, Switch } from "solid-js"
import { useRoute } from "../context/route"
import { Toast } from "../ui/toast"
import { DayPage } from "./pages/day"
import { AgentsPage } from "./pages/agents"
import { AgentPage } from "./pages/agent"
import { SpacesPage } from "./pages/spaces"
import { ChatsPage } from "./pages/chats"
import { SkillsPage } from "./pages/skills"
import { MemoryPage } from "./pages/memory"
import { ModelsPage } from "./pages/models"
import { IntegrationsPage } from "./pages/integrations"

export function WorkPage() {
  const route = useRoute()
  const page = () => (route.data.type === "work" ? route.data.page : undefined)
  const id = () => (route.data.type === "work" ? route.data.id : undefined)
  return (
    <box flexGrow={1} minHeight={0}>
      <Switch>
        <Match when={page() === "day"}>
          <DayPage />
        </Match>
        <Match when={page() === "agents"}>
          <AgentsPage />
        </Match>
        <Match when={page() === "agent" && id()} keyed>
          {(deploymentID) => <AgentPage deploymentID={deploymentID} />}
        </Match>
        <Match when={page() === "spaces"}>
          <SpacesPage spaceID={id()} />
        </Match>
        <Match when={page() === "chats"}>
          <ChatsPage />
        </Match>
        <Match when={page() === "skills"}>
          <SkillsPage />
        </Match>
        <Match when={page() === "memory"}>
          <MemoryPage />
        </Match>
        <Match when={page() === "models"}>
          <ModelsPage />
        </Match>
        <Match when={page() === "integrations"}>
          <IntegrationsPage />
        </Match>
      </Switch>
      {/* Below the page header, whose action buttons sit in the top-right corner. */}
      <Toast top={4} />
    </box>
  )
}
