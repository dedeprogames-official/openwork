# OpenWork

OpenWork turns the opencode terminal UI into a work mode: you deploy agents into local folders, they run on a
schedule in the background, and everything they find lands in one place — **Your Day**. It is still a terminal app
and still runs on the opencode harness (same sessions, tools, permissions, providers and MCP servers).

![Your Day](screenshots/01-your-day.png)

## Concepts

| Concept | What it is                                                                                                                                                                                   |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Agent   | A deployment: a task, a local folder to work in, a schedule (`every 10m`, `hourly`, `daily at 7:30`, once, or on demand), an access level and optionally a skill and model.                  |
| Run     | One unattended execution of an agent. Each run is a real opencode session (`<agent> · run #N`) you can open as a transcript. Runs never ask questions: anything that would prompt is denied. |
| Space   | A group of agents around a goal, an event or a client, with its own color.                                                                                                                   |
| Inbox   | Where agents report back. Agents post with the `inbox` tool; you mark items read or done.                                                                                                    |
| Todos   | Your own todo list. Agents can add items (for example "from meeting notes") with the `user_todo` tool.                                                                                       |
| Agenda  | A local agenda for today. Events link to a space, so Your Day shows how many of its agents already checked in.                                                                               |
| Memory  | Facts about you that every chat and agent gets in its system context. Saved from the Memory page or by agents with the `memory` tool.                                                        |
| Access  | `read` (read + network), `write` (read + write + network) or `full` (whatever the agent already allows).                                                                                     |

Chats use the new `work` agent: a knowledge-work persona (folders are workspaces, files are deliverables) that can use
the inbox, todo, agenda and memory tools and can **deploy other agents** with the `deploy` tool — "check the Half
Moon Bay cam every 10m and tell me if it's sunny" in a chat creates a scheduled agent.

## Installing it

```bash
curl -fsSL https://github.com/dedeprogames-official/openwork/releases/latest/download/install | bash      # macOS, Linux
irm https://github.com/dedeprogames-official/openwork/releases/latest/download/install.ps1 | iex          # Windows PowerShell
npx https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-cli.tgz           # any OS with Node.js 18+
```

The installers put `openwork` in `~/.openwork/bin` (`%USERPROFILE%\.openwork\bin` on Windows) and add it to your PATH. The
npm package is a small launcher that downloads the binary for your platform from the same release on first use.
OpenWork keeps its data in `~/.local/share/openwork` and its global config in `~/.config/openwork`, apart from any
opencode install, and `openwork upgrade` only ever installs OpenWork releases.

## Running it from source

```bash
bun install
bun dev            # or: openwork once installed
```

Inside the TUI:

- `/demo` loads a demo workspace (6 spaces, 17 agents, a day of run history, skills) — agents start paused, `/pause`
  lets them run.
- `/deploy <what and when>` or `ctrl+x d` deploys an agent: description → folder → space → schedule → access.
  Pressing enter at every step deploys in seconds and runs it once right away.
- `alt+1` … `alt+8` switch pages, `ctrl+x w` collapses the navigation, `ctrl+p` lists every command.
- `m` on an agent's page moves it to another space (or out of its space); on the Spaces page, `m` or
  **+ Move an agent here...** moves an agent into the selected space. In a chat, the `deploy` tool's `move` action does
  the same ("move the beach agent to Beach date").
- Everything also works with the mouse, as in opencode: click the navigation, buttons and the key hints at the
  bottom of each page; in lists the first click selects a row and a click on the selected row opens it (like
  enter); checkboxes toggle at once; the wheel scrolls lists and the agent calendar; the calendar's zoom and Live
  controls are clickable. Dragging to select text still copies it instead of clicking.

The scheduler runs inside the opencode server process (3 runs at a time, claims are atomic so several processes
never run the same agent twice). Set `OPENCODE_DISABLE_WORK_SCHEDULER=1` to turn it off.

## Pages

| Page         | Shows                                                                                                                                |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| Your Day     | Agenda, todos, Agent Inbox, a chat prompt and every agent grouped by space with its last result and next run.                        |
| Chats        | Your chats (agent runs are kept out of the list).                                                                                    |
| Spaces       | Spaces with their agents and agenda items.                                                                                           |
| Agents       | Token gauge, burn rate, local-vs-cloud savings, a donut of where tokens go and the **Agent Calendar** of every run today (zoomable). |
| Agent        | One agent: task, schedule, access, the tool calls and result of each run, run history, and a chat bound to that agent.               |
| Skills       | Skills from `.opencode/skills` and `~/.agents/skills`.                                                                               |
| Memory       | What chats and agents know about you.                                                                                                |
| Models       | Local and cloud models; local tokens are counted separately in the Usage card.                                                       |
| Integrations | MCP servers and connected accounts.                                                                                                  |

## Screenshots

All screenshots are photos of a real Linux window — xfce4-terminal under the xfwm4 window manager (Greybird theme) on
a headless X server — showing the real TUI running against an offline model. They are regenerated with:

```bash
sudo apt-get install tmux python3-pil xvfb dbus-x11 xfwm4 xfce4-terminal greybird-gtk-theme xdotool imagemagick fonts-dejavu-core
cd packages/opencode
TZ=Europe/London bun script/openwork/screenshots.ts --window linux --out ../../docs/openwork/screenshots
```

Without `--window linux` the script renders the terminal contents itself (`ansi2png.py`), which only needs tmux and
Pillow. Pick a `TZ` where it is late afternoon when you run it: the demo's run history starts at 06:00 local time, so
the day only looks full later on.

|                                                            |                                                                          |
| ---------------------------------------------------------- | ------------------------------------------------------------------------ |
| ![Your Day](screenshots/01-your-day.png)                   | ![Your Day without the agents column](screenshots/02-your-day-focus.png) |
| ![Agents](screenshots/03-agents.png)                       | ![Agents, whole day](screenshots/04-agents-whole-day.png)                |
| ![Agent detail](screenshots/05-agent-detail.png)           | ![Agent running](screenshots/06-agent-running.png)                       |
| ![Spaces](screenshots/07-spaces.png)                       | ![Chat](screenshots/08-chat.png)                                         |
| ![Chats](screenshots/09-chats.png)                         | ![Skills](screenshots/10-skills.png)                                     |
| ![Memory](screenshots/11-memory.png)                       | ![Models](screenshots/12-models.png)                                     |
| ![Integrations](screenshots/13-integrations.png)           | ![Deploy an agent](screenshots/14-deploy.png)                            |
| ![Deploy: pick a folder](screenshots/15-deploy-folder.png) | ![Commands](screenshots/16-command-palette.png)                          |
| ![New chat](screenshots/17-new-chat.png)                   | ![Navigation collapsed](screenshots/18-nav-collapsed.png)                |

## Releases

Pushing a tag such as `v0.1.0` runs `.github/workflows/openwork-release.yml`: it cross-compiles every target on Linux
with `packages/opencode/script/build.ts`, signs the macOS binaries ad hoc and smoke-tests them on a Mac, smoke-tests the
Windows binary, then `packages/opencode/script/openwork/release.ts` packages `openwork-<target>` archives, the install
scripts, the npm launcher (`openwork-cli.tgz`) and `SHA256SUMS` into the GitHub release. The same workflow can be run by
hand with a version.

## Architecture

- `packages/schema/src/work.ts` — records, inputs and the `work.updated` event.
- `packages/core/src/work.ts`, `packages/core/src/work/` — SQLite tables, the `Work` store and schedule math
  (`WorkSchedule.parse` understands English and Portuguese: "every 10m", "a cada 15 minutos", "todo dia às 8h").
- `packages/opencode/src/work/` — scheduler, unattended permissions, run prompt and system context, demo seed.
- `packages/opencode/src/tool/{inbox,user-todo,agenda,memory,deploy}.ts` — the cowork tools.
- `packages/opencode/src/server/routes/instance/httpapi/{groups,handlers}/work.ts` — the `/work/*` HTTP API.
- `packages/tui/src/work/` — the shell, navigation and pages.
