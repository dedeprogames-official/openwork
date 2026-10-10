<p align="center">
  <picture>
    <source srcset="docs/openwork/logo-dark.svg" media="(prefers-color-scheme: dark)">
    <source srcset="docs/openwork/logo-light.svg" media="(prefers-color-scheme: light)">
    <img src="docs/openwork/logo-light.svg" alt="OpenWork logo" width="480">
  </picture>
</p>
<p align="center"><strong>Deploy agents into your folders. They work on a schedule. You read the results on Your Day.</strong></p>
<p align="center">A work mode for the terminal, built on the opencode harness.</p>
<p align="center">
  <a href="LICENSE"><img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-b49cff?style=flat-square" /></a>
  <img alt="Terminal UI" src="https://img.shields.io/badge/UI-terminal-0b0b0d?style=flat-square" />
  <img alt="Bun 1.3+" src="https://img.shields.io/badge/bun-1.3%2B-f2cf6b?style=flat-square" />
  <a href="https://github.com/anomalyco/opencode"><img alt="Built on opencode" src="https://img.shields.io/badge/built%20on-opencode-7aa7ff?style=flat-square" /></a>
</p>

<p align="center">
  <a href="README.md">English</a> |
  <a href="README.zh.md">简体中文</a> |
  <a href="README.zht.md">繁體中文</a> |
  <a href="README.ko.md">한국어</a> |
  <a href="README.de.md">Deutsch</a> |
  <a href="README.es.md">Español</a> |
  <a href="README.fr.md">Français</a> |
  <a href="README.it.md">Italiano</a> |
  <a href="README.da.md">Dansk</a> |
  <a href="README.ja.md">日本語</a> |
  <a href="README.pl.md">Polski</a> |
  <a href="README.ru.md">Русский</a> |
  <a href="README.bs.md">Bosanski</a> |
  <a href="README.ar.md">العربية</a> |
  <a href="README.no.md">Norsk</a> |
  <a href="README.br.md">Português (Brasil)</a> |
  <a href="README.th.md">ไทย</a> |
  <a href="README.tr.md">Türkçe</a> |
  <a href="README.uk.md">Українська</a> |
  <a href="README.bn.md">বাংলা</a> |
  <a href="README.gr.md">Ελληνικά</a> |
  <a href="README.vi.md">Tiếng Việt</a>
</p>

[![OpenWork — Your Day in a Linux terminal window](docs/openwork/screenshots/01-your-day.png)](docs/openwork/README.md)

<p align="center"><sub>Every screenshot here is the real OpenWork TUI in xfce4-terminal on Linux (Xfce, Greybird theme), running the demo workspace against an offline model.</sub></p>

---

### What is OpenWork?

OpenWork turns the opencode terminal UI into a place to get work done — not only code. Describe a job in one sentence, such as _“check the Half Moon Bay cam every 10m and tell me if it's sunny”_, and OpenWork deploys an agent into a local folder of your choice. The agent runs on its schedule in the background, unattended, and everything it finds lands in one place: **Your Day**, next to your agenda, your todos and the **Agent Inbox**.

It is still a terminal app and still runs on the opencode harness: the same sessions, tools, permissions, providers, local models, skills and MCP servers. Agents, runs, inbox, todos, agenda and memory are stored locally in SQLite.

### Highlights

- **Instant deploy** — one sentence → folder → space → schedule → access. Press enter at every step and the agent is deployed and running in seconds.
- **Schedules in plain words** — `every 10m`, `hourly`, `every morning at 8`, `daily at 7:30`, `at 5pm`, `now`. Portuguese works too: `a cada 15 minutos`, `todo dia às 8h`.
- **Your Day** — agenda, todos, the Agent Inbox and every agent grouped by space, with its last result and next run.
- **Agent Calendar** — every run of the day in order, colored by space, zoomable from a few minutes to the whole day, with the run that is working right now outlined.
- **Unattended and safe** — runs never stop to ask: anything that would show a permission prompt is denied. Each agent has an access level: `read + network`, `read + write + network` or `full`.
- **Real transcripts** — every run is a real opencode session you can open, with its tool calls, tokens and cost.
- **Agents that report back** — the cowork tools `inbox`, `user_todo`, `agenda`, `memory` and `deploy` let agents post to your inbox, add todos, read your agenda and remember facts about you. A chat can deploy new agents.
- **Spaces** — group agents around a goal, an event or a client.
- **Move agents between spaces** — press `m` on an agent's page, use **+ Move an agent here...** on the Spaces page, or ask in a chat.
- **Memory** — facts about you that every chat and every agent receives.
- **Token stats** — local and cloud tokens counted apart, burn rate, a daily projection and what local models save you.
- **Keyboard and mouse** — `alt+1` … `alt+8` for pages and `ctrl+p` for every command; click the navigation, buttons, rows, checkboxes and key hints; scroll lists and the calendar with the wheel.
- **ASCII all the way** — the logo, gauges and donut charts are drawn with terminal block characters.

### Screenshots

<table>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/03-agents.png" alt="Agents"><br><b>Agents</b> — token gauge, burn rate, savings and the live Agent Calendar</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/04-agents-whole-day.png" alt="Agent Calendar, whole day"><br><b>Agent Calendar</b> zoomed out to the whole day</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/05-agent-detail.png" alt="Agent"><br><b>Agent</b> — the tool calls and result of its last run</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/06-agent-running.png" alt="Agent running"><br>An agent <b>running</b> right now</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/14-deploy.png" alt="Deploy an agent"><br><b>Deploy</b> an agent in one sentence</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/15-deploy-folder.png" alt="Deploy: pick a folder"><br>…then pick the <b>folder</b> it works in</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/07-spaces.png" alt="Spaces"><br><b>Spaces</b> — agents grouped around a goal</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/08-chat.png" alt="Chat"><br>A <b>chat</b> with the <code>work</code> agent, inside the shell</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/10-skills.png" alt="Skills"><br><b>Skills</b> — reusable instructions</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/11-memory.png" alt="Memory"><br><b>Memory</b> — what every chat and agent knows about you</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/12-models.png" alt="Models"><br><b>Models</b> — local and cloud</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/13-integrations.png" alt="Integrations"><br><b>Integrations</b> — MCP servers and accounts</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/02-your-day-focus.png" alt="Your Day without the agents column"><br><b>Your Day</b> with the agents column hidden</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/16-command-palette.png" alt="Commands"><br>Every <b>command</b> in the palette (<code>ctrl+p</code>)</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/17-new-chat.png" alt="New chat"><br><b>New chat</b></td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/18-nav-collapsed.png" alt="Navigation collapsed"><br><b>Navigation</b> collapsed (<code>ctrl+x w</code>)</td>
  </tr>
</table>

---

### Getting started

#### Install

```bash
# macOS and Linux
curl -fsSL https://github.com/dedeprogames-official/openwork/releases/latest/download/install | bash
```

```powershell
# Windows (PowerShell)
irm https://github.com/dedeprogames-official/openwork/releases/latest/download/install.ps1 | iex
```

```bash
# Any OS with Node.js 18+: npx runs it once, npm install -g keeps the openwork command
npx https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-cli.tgz
npm install -g https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-cli.tgz
```

Then open a folder and run `openwork`. `openwork upgrade` updates it to the latest release and `openwork uninstall` removes it.

#### Downloads

| Platform                 | Download                                                                                                                                      |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Linux x64                | [`openwork-linux-x64.tar.gz`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-linux-x64.tar.gz)           |
| Linux arm64              | [`openwork-linux-arm64.tar.gz`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-linux-arm64.tar.gz)       |
| Linux x64 (musl, Alpine) | [`openwork-linux-x64-musl.tar.gz`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-linux-x64-musl.tar.gz) |
| macOS Apple Silicon      | [`openwork-darwin-arm64.zip`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-darwin-arm64.zip)           |
| macOS Intel              | [`openwork-darwin-x64.zip`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-darwin-x64.zip)               |
| Windows x64              | [`openwork-windows-x64.zip`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-windows-x64.zip)             |
| Windows arm64            | [`openwork-windows-arm64.zip`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-windows-arm64.zip)         |

Every version is on the [releases page](https://github.com/dedeprogames-official/openwork/releases). Each archive holds the `openwork` binary; `-baseline` builds are for x64 CPUs without AVX2 and `-musl` builds for Alpine, and the installers pick the right one for you. The macOS binaries are signed ad hoc, not notarized: after downloading a zip with a browser, run `xattr -d com.apple.quarantine openwork` once.

#### Windows

The PowerShell installer puts `openwork.exe` in `%USERPROFILE%\.openwork\bin` and adds it to your PATH: open a new terminal and run `openwork`. Windows Terminal gives the best results (truecolor and mouse). You can also unzip `openwork-windows-x64.zip` anywhere and run `openwork.exe`, or use `npx` as above.

#### Run from source

**Requirements:** [Bun](https://bun.sh) 1.3 or newer, git, and a terminal with truecolor and mouse support (xfce4-terminal, GNOME Terminal, Konsole, kitty, WezTerm, Ghostty, iTerm2, Windows Terminal…). For models: any provider opencode supports, or a local model served by Ollama, LM Studio, llama.cpp or vLLM.

```bash
git clone https://github.com/dedeprogames-official/openwork.git
cd openwork
bun install
bun dev ~/work        # the folder OpenWork opens in
```

`bun dev .` opens the current folder; `bun dev` alone opens `packages/opencode`.

#### Build a standalone binary

```bash
./packages/opencode/script/build.ts --single
./packages/opencode/dist/opencode-linux-x64/bin/opencode    # or opencode-darwin-arm64, …
```

The package installs the same binary as both `opencode` and `openwork`.

#### Your first five minutes

1. **Connect a model** — `/connect`, or open **Models** (`alt+7`) and press `c`. For local models see [Local models](#local-models).
2. **Load the demo** — `/demo` creates 6 spaces, 17 agents, a day of run history, skills, inbox messages, todos and an agenda. Its agents start paused so nothing spends tokens; `/pause` lets them run.
3. **Deploy your own** — `ctrl+x d`, or type `/deploy check the weather in Lisbon every morning at 7 and tell me if I need an umbrella`.
4. **Read Your Day** — `alt+1`. Results arrive in the Agent Inbox; open an agent to see its runs or to chat about its work.

### Deploying agents

An agent is a task, a folder to work in, a schedule and an access level, plus optionally a skill. It runs on the model that was selected when you deployed it. Deploy from `ctrl+x d`, `/deploy <what and when>`, the **+ Create Agent** button on the Agents page, a space, or by asking in a chat.

| You write                                                               | Schedule                                                               |
| ----------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `every 10m`, `every 2 hours`, `a cada 15 minutos`                       | every N minutes, hours or days (at least 1 minute)                     |
| `hourly`, `every hour`, `every minute`                                  | every hour or every minute                                             |
| `daily at 9am`, `every morning at 8`, `every evening`, `todo dia às 8h` | every day at that time (morning 08:00, evening 18:00, otherwise 09:00) |
| `at 5pm`, `às 17h`                                                      | once, at the next 17:00                                                |
| `now`, `once` — or no timing words at all                               | once, right away                                                       |

The schedule step also offers **on demand**: the agent only runs when you press **Run now**.

| Access                   | The agent may                                      |
| ------------------------ | -------------------------------------------------- |
| `read + network`         | read files, browse the web, post to your inbox     |
| `read + write + network` | also create and edit files in its folder           |
| `full`                   | use every tool you allow, including shell commands |

Runs are unattended: questions and anything that would show a permission prompt are denied, and a run stops after 15 minutes. Each run is a session named `<agent> · run #N`; press `o` on an agent's page to open its transcript.

### Pages

| Page         | Key     | Shows                                                                                                  |
| ------------ | ------- | ------------------------------------------------------------------------------------------------------ |
| Your Day     | `alt+1` | Agenda, todos, Agent Inbox, a chat prompt and every agent grouped by space with its last and next run. |
| Chats        | `alt+2` | Your chats; agent runs stay out of the list.                                                           |
| Spaces       | `alt+3` | Spaces with their agents and agenda items.                                                             |
| Agents       | `alt+4` | Token gauge, burn rate, savings, where the tokens go, and the Agent Calendar.                          |
| Agent        | `enter` | One agent: task, schedule, access, each run's tool calls and result, run history and its own chat.     |
| Skills       | `alt+5` | Skills from `.opencode/skills` and `~/.agents/skills`.                                                 |
| Memory       | `alt+6` | What chats and agents know about you.                                                                  |
| Models       | `alt+7` | Local and cloud models; local tokens are counted apart in the Usage section.                              |
| Integrations | `alt+8` | MCP servers and connected accounts.                                                                    |

### Keyboard and mouse

| Keys              | Action                                                                                |
| ----------------- | ------------------------------------------------------------------------------------- |
| `alt+1` … `alt+8` | switch pages                                                                          |
| `ctrl+x d`        | deploy an agent                                                                       |
| `ctrl+x w`        | collapse or expand the navigation                                                     |
| `m`               | move the agent to another space (on its page) or one into the selected space (Spaces) |
| `ctrl+p`          | command palette                                                                       |
| `c`               | focus the chat prompt (`esc` leaves it)                                               |
| `esc`             | back                                                                                  |

Each page lists its own keys at the bottom. Slash commands: `/day`, `/chats`, `/spaces`, `/agents`, `/skills`, `/memory`, `/models`, `/integrations`, `/deploy <text>`, `/pause`, `/demo`, `/connect`.

Everything also works with the mouse: click the navigation, buttons and key hints; in lists the first click selects a row and a second click opens it; checkboxes toggle at once; the wheel scrolls lists and the Agent Calendar. Dragging still selects and copies text.

<a id="local-models"></a>

### Local models

Any OpenAI-compatible server on `localhost` counts as local, as do the `ollama`, `lmstudio`, `llamacpp` and `vllm` providers. For example, with Ollama, in `opencode.json` (in your folder or in `~/.config/openwork/`):

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "ollama": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "Ollama",
      "options": { "baseURL": "http://localhost:11434/v1" },
      "models": { "qwen3:8b": { "name": "Qwen3 8B" } }
    }
  },
  "model": "ollama/qwen3:8b"
}
```

### How it works

- The scheduler lives in the OpenWork server process. It checks for due agents every 5 seconds and runs up to 3 at a time. Claims are atomic in SQLite, so several OpenWork windows never run the same agent twice, and runs left behind by a crash are marked as interrupted. `OPENCODE_DISABLE_WORK_SCHEDULER=1` turns it off.
- Each run is an opencode session with the `work` agent — a knowledge-work persona where folders are workspaces and files are deliverables — with your memory and the agent's recent results in its system context, and unattended permissions for its access level.
- OpenWork keeps the opencode configuration: `opencode.json`, `.opencode/`, `OPENCODE_*` variables, providers, MCP servers and skills all work as before.
- OpenWork keeps its own data in `~/.local/share/openwork` and its global config in `~/.config/openwork`, apart from any opencode install, and updates itself only from its own GitHub releases.

| Where                                                   | What                                                            |
| ------------------------------------------------------- | --------------------------------------------------------------- |
| `packages/schema/src/work.ts`                           | records, inputs and the `work.updated` event                    |
| `packages/core/src/work.ts`, `packages/core/src/work/`  | SQLite tables, the `Work` store and schedule parsing            |
| `packages/opencode/src/work/`                           | scheduler, unattended permissions, run context, demo            |
| `packages/opencode/src/tool/`                           | the `inbox`, `user_todo`, `agenda`, `memory` and `deploy` tools |
| `packages/opencode/src/server/routes/instance/httpapi/` | the `/work/*` HTTP API                                          |
| `packages/tui/src/work/`                                | the shell, navigation, pages and deploy dialog                  |

The full guide is in [docs/openwork](docs/openwork/README.md).

### Development

```bash
bun install
bun dev ~/work

# checks run from a package directory, never from the repo root
(cd packages/tui && bun typecheck && bun test)
(cd packages/opencode && bun typecheck && bun test test/work)
```

The screenshots are regenerated from the real TUI with an offline model. With `--window linux` each one is a photo of a real X11 window (Xvfb, the xfwm4 window manager and xfce4-terminal):

```bash
sudo apt-get install tmux python3-pil xvfb dbus-x11 xfwm4 xfce4-terminal greybird-gtk-theme xdotool imagemagick fonts-dejavu-core
cd packages/opencode
TZ=Europe/London bun script/openwork/screenshots.ts --window linux --out ../../docs/openwork/screenshots
```

Pick a `TZ` where it is late afternoon: the demo's run history starts at 06:00 local time.

### Credits and license

OpenWork is built on [opencode](https://github.com/anomalyco/opencode) and keeps its [MIT license](LICENSE). It is not built by the opencode team and is not affiliated with them. Contributions are welcome — see [CONTRIBUTING.md](CONTRIBUTING.md).
