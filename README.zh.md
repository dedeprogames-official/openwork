<p align="center">
  <picture>
    <source srcset="docs/openwork/logo-dark.svg" media="(prefers-color-scheme: dark)">
    <source srcset="docs/openwork/logo-light.svg" media="(prefers-color-scheme: light)">
    <img src="docs/openwork/logo-light.svg" alt="OpenWork 标志" width="480">
  </picture>
</p>
<p align="center"><strong>把智能体部署到你的文件夹里。它们按计划工作。你在 Your Day 里查看结果。</strong></p>
<p align="center">一个终端里的工作模式，构建在 opencode harness 之上。</p>
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

[![OpenWork — Linux 终端窗口中的 Your Day](docs/openwork/screenshots/01-your-day.png)](docs/openwork/README.md)

<p align="center"><sub>这里的每张截图都是真实的 OpenWork TUI，运行在 Linux 的 xfce4-terminal 中（Xfce，Greybird 主题），使用演示工作区和离线模型。</sub></p>

---

### OpenWork 是什么？

OpenWork 把 opencode 的终端界面变成一个完成工作的地方——不只是写代码。用一句话描述任务，例如 _“check the Half Moon Bay cam every 10m and tell me if it's sunny”_，OpenWork 就会把一个智能体部署到你选择的本地文件夹。智能体在后台按计划无人值守地运行，它发现的一切都汇集到一个地方：**Your Day**，旁边是你的日程、待办和 **Agent Inbox**。

它依然是终端应用，依然运行在 opencode harness 之上：同样的会话、工具、权限、提供商、本地模型、skills 和 MCP 服务器。智能体、运行记录、收件箱、待办、日程和记忆都保存在本地的 SQLite 中。

### 亮点

- **即时部署**——一句话 → 文件夹 → space → 计划 → 权限。每一步按回车，几秒内智能体就部署并开始运行。
- **用自然语言写计划**——英语或葡萄牙语：`every 10m`、`hourly`、`every morning at 8`、`daily at 7:30`、`at 5pm`、`now`、`a cada 15 minutos`、`todo dia às 8h`。
- **Your Day**——日程、待办、Agent Inbox，以及按 space 分组的所有智能体，附带最近结果和下次运行时间。
- **Agent Calendar**——当天的每次运行按顺序排列，按 space 着色，可从几分钟缩放到一整天，正在运行的那次用边框标出。
- **无人值守且安全**——运行从不停下来询问：任何会弹出权限请求的操作都会被拒绝。每个智能体都有访问级别：`read + network`、`read + write + network` 或 `full`。
- **真实的记录**——每次运行都是一个可以打开的真实 opencode 会话，包含工具调用、token 和费用。
- **会汇报的智能体**——cowork 工具 `inbox`、`user_todo`、`agenda`、`memory` 和 `deploy` 让智能体可以发消息到你的收件箱、添加待办、读取日程、记住关于你的事实。聊天也可以部署新的智能体。
- **Spaces**——围绕一个目标、一个活动或一个客户来组织智能体。
- **在 space 之间移动智能体**——在智能体页面按 `m`，在 Spaces 页面使用 **+ Move an agent here...**，或在聊天中提出。
- **记忆**——每个聊天和每个智能体都会收到的关于你的事实。
- **Token 统计**——本地与云端 token 分开统计，消耗速率、每日预估，以及本地模型为你省下多少。
- **键盘和鼠标**——`alt+1` … `alt+8` 切换页面，`ctrl+p` 打开所有命令；可点击导航、按钮、行、复选框和按键提示；用滚轮滚动列表和日历。
- **彻头彻尾的 ASCII**——标志、仪表和环形图都用终端方块字符绘制。

### 截图

<table>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/03-agents.png" alt="Agents"><br><b>Agents</b>——token 仪表、消耗速率、节省金额和实时 Agent Calendar</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/04-agents-whole-day.png" alt="Agent Calendar 全天"><br>缩放到全天的 <b>Agent Calendar</b></td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/05-agent-detail.png" alt="智能体"><br><b>智能体</b>——最近一次运行的工具调用和结果</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/06-agent-running.png" alt="运行中的智能体"><br>一个正在<b>运行</b>的智能体</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/14-deploy.png" alt="部署智能体"><br>用一句话<b>部署</b>智能体</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/15-deploy-folder.png" alt="部署：选择文件夹"><br>……然后选择它工作的<b>文件夹</b></td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/07-spaces.png" alt="Spaces"><br><b>Spaces</b>——围绕目标分组的智能体</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/08-chat.png" alt="聊天"><br>在 shell 里与 <code>work</code> 智能体<b>聊天</b></td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/10-skills.png" alt="Skills"><br><b>Skills</b>——可复用的指令</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/11-memory.png" alt="记忆"><br><b>Memory</b>——每个聊天和智能体对你的了解</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/12-models.png" alt="模型"><br><b>Models</b>——本地与云端</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/13-integrations.png" alt="集成"><br><b>Integrations</b>——MCP 服务器和账号</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/02-your-day-focus.png" alt="隐藏智能体栏的 Your Day"><br>隐藏智能体栏的 <b>Your Day</b></td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/16-command-palette.png" alt="命令"><br>命令面板中的所有<b>命令</b>（<code>ctrl+p</code>）</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/17-new-chat.png" alt="新聊天"><br><b>New chat</b></td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/18-nav-collapsed.png" alt="收起的导航"><br>收起的<b>导航</b>（<code>ctrl+x w</code>）</td>
  </tr>
</table>

---

### 快速开始

#### 安装

```bash
# macOS 和 Linux
curl -fsSL https://github.com/dedeprogames-official/openwork/releases/latest/download/install | bash
```

```powershell
# Windows（PowerShell）
irm https://github.com/dedeprogames-official/openwork/releases/latest/download/install.ps1 | iex
```

```bash
# 任何装有 Node.js 18+ 的系统：npx 运行一次，npm install -g 保留 openwork 命令
npx https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-cli.tgz
npm install -g https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-cli.tgz
```

然后打开一个文件夹并运行 `openwork`。`openwork upgrade` 更新到最新版本，`openwork uninstall` 将其移除。

#### 下载

| 平台                     | 下载                                                                                                                                          |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Linux x64                | [`openwork-linux-x64.tar.gz`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-linux-x64.tar.gz)           |
| Linux arm64              | [`openwork-linux-arm64.tar.gz`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-linux-arm64.tar.gz)       |
| Linux x64 (musl, Alpine) | [`openwork-linux-x64-musl.tar.gz`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-linux-x64-musl.tar.gz) |
| macOS Apple Silicon      | [`openwork-darwin-arm64.zip`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-darwin-arm64.zip)           |
| macOS Intel              | [`openwork-darwin-x64.zip`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-darwin-x64.zip)               |
| Windows x64              | [`openwork-windows-x64.zip`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-windows-x64.zip)             |
| Windows arm64            | [`openwork-windows-arm64.zip`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-windows-arm64.zip)         |

所有版本都在[发布页面](https://github.com/dedeprogames-official/openwork/releases)。每个压缩包里都有 `openwork` 可执行文件；`-baseline` 版本用于不支持 AVX2 的 x64 CPU，`-musl` 版本用于 Alpine，安装脚本会自动选择合适的版本。macOS 可执行文件为 ad hoc 签名，未经公证：用浏览器下载 zip 后，请运行一次 `xattr -d com.apple.quarantine openwork`。

#### Windows

PowerShell 安装脚本会把 `openwork.exe` 放进 `%USERPROFILE%\.openwork\bin` 并加入你的 PATH：打开一个新终端并运行 `openwork`。在 Windows Terminal 中效果最好（真彩色和鼠标）。你也可以把 `openwork-windows-x64.zip` 解压到任意位置后运行 `openwork.exe`，或像上面那样使用 `npx`。

#### 从源码运行

**要求：**[Bun](https://bun.sh) 1.3 或更新版本、git，以及支持真彩色和鼠标的终端（xfce4-terminal、GNOME Terminal、Konsole、kitty、WezTerm、Ghostty、iTerm2、Windows Terminal……）。模型方面：任何 opencode 支持的提供商，或由 Ollama、LM Studio、llama.cpp、vLLM 提供的本地模型。

```bash
git clone https://github.com/dedeprogames-official/openwork.git
cd openwork
bun install
bun dev ~/work        # OpenWork 打开的文件夹
```

`bun dev .` 打开当前文件夹；只运行 `bun dev` 会打开 `packages/opencode`。

#### 构建独立二进制文件

```bash
./packages/opencode/script/build.ts --single
./packages/opencode/dist/opencode-linux-x64/bin/opencode    # 或 opencode-darwin-arm64，……
```

该包会以 `opencode` 和 `openwork` 两个名字安装同一个二进制文件。

#### 最初的五分钟

1. **连接模型**——`/connect`，或打开 **Models**（`alt+7`）并按 `c`。本地模型请参阅[本地模型](#local-models)。
2. **加载演示**——`/demo` 会创建 6 个 space、17 个智能体、一天的运行历史、skills、收件箱消息、待办和日程。演示的智能体一开始是暂停的，不会消耗 token；`/pause` 让它们开始运行。
3. **部署你自己的**——`ctrl+x d`，或输入 `/deploy check the weather in Lisbon every morning at 7 and tell me if I need an umbrella`（计划用英语或葡萄牙语书写；任务可以用任何语言）。
4. **查看 Your Day**——`alt+1`。结果会进入 Agent Inbox；打开一个智能体可查看它的运行记录，或就它的工作进行聊天。

### 部署智能体

一个智能体由任务、工作文件夹、计划和访问级别组成，还可以附带一个 skill。它使用部署时所选的模型运行。可以通过 `ctrl+x d`、`/deploy <做什么、什么时候>`、Agents 页面上的 **+ Create Agent** 按钮、某个 space，或在聊天中提出请求来部署。

| 你写                                                                    | 计划                                               |
| ----------------------------------------------------------------------- | -------------------------------------------------- |
| `every 10m`, `every 2 hours`, `a cada 15 minutos`                       | 每 N 分钟、小时或天（至少 1 分钟）                 |
| `hourly`, `every hour`, `every minute`                                  | 每小时或每分钟                                     |
| `daily at 9am`, `every morning at 8`, `every evening`, `todo dia às 8h` | 每天在该时间（早上 08:00，晚上 18:00，否则 09:00） |
| `at 5pm`, `às 17h`                                                      | 一次，在下一个 17:00                               |
| `now`, `once` — 或完全不写时间词                                        | 一次，立即                                         |

计划步骤还提供 **on demand**：只有你按下 **Run now** 时智能体才会运行。

| 访问级别                 | 智能体可以                             |
| ------------------------ | -------------------------------------- |
| `read + network`         | 读取文件、浏览网页、向你的收件箱发消息 |
| `read + write + network` | 还能在自己的文件夹里创建和编辑文件     |
| `full`                   | 使用你允许的所有工具，包括 shell 命令  |

运行是无人值守的：提问和任何会弹出权限请求的操作都会被拒绝，单次运行 15 分钟后停止。每次运行都是一个名为 `<智能体> · run #N` 的会话；在智能体页面按 `o` 可打开它的记录。

### 页面

| 页面         | 按键    | 内容                                                                                     |
| ------------ | ------- | ---------------------------------------------------------------------------------------- |
| Your Day     | `alt+1` | 日程、待办、Agent Inbox、聊天输入框，以及按 space 分组、附带上次和下次运行的所有智能体。 |
| Chats        | `alt+2` | 你的聊天；智能体的运行不会出现在列表中。                                                 |
| Spaces       | `alt+3` | 各个 space 及其智能体和日程项。                                                          |
| Agents       | `alt+4` | token 仪表、消耗速率、节省、token 去向，以及 Agent Calendar。                            |
| Agent        | `enter` | 单个智能体：任务、计划、权限、每次运行的工具调用和结果、历史以及它自己的聊天。           |
| Skills       | `alt+5` | 来自 `.opencode/skills` 和 `~/.agents/skills` 的 skills。                                |
| Memory       | `alt+6` | 聊天和智能体对你的了解。                                                                 |
| Models       | `alt+7` | 本地和云端模型；本地 token 在 Usage 卡片中单独统计。                                     |
| Integrations | `alt+8` | MCP 服务器和已连接的账号。                                                               |

### 键盘和鼠标

| 按键              | 操作                                                                       |
| ----------------- | -------------------------------------------------------------------------- |
| `alt+1` … `alt+8` | 切换页面                                                                   |
| `ctrl+x d`        | 部署智能体                                                                 |
| `ctrl+x w`        | 收起或展开导航                                                             |
| `m`               | 把智能体移到另一个 space（在其页面）或把一个智能体移入所选 space（Spaces） |
| `ctrl+p`          | 命令面板                                                                   |
| `c`               | 聚焦聊天输入框（`esc` 离开）                                               |
| `esc`             | 返回                                                                       |

每个页面都会在底部列出自己的按键。斜杠命令：`/day`、`/chats`、`/spaces`、`/agents`、`/skills`、`/memory`、`/models`、`/integrations`、`/deploy <文本>`、`/pause`、`/demo`、`/connect`。

一切也都可以用鼠标操作：点击导航、按钮和按键提示；在列表中第一次点击选中一行，第二次点击打开它；复选框立即切换；滚轮滚动列表和 Agent Calendar。拖动仍然会选中并复制文本。

<a id="local-models"></a>

### 本地模型

任何运行在 `localhost` 上的 OpenAI 兼容服务器都算作本地，`ollama`、`lmstudio`、`llamacpp` 和 `vllm` 提供商也是。例如使用 Ollama 时，在 `opencode.json` 中（放在你的文件夹或 `~/.config/openwork/` 里）：

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

### 工作原理

- 调度器运行在 OpenWork 服务器进程中。它每 5 秒检查一次到期的智能体，同时最多运行 3 个。认领在 SQLite 中是原子的，所以多个 OpenWork 窗口绝不会把同一个智能体运行两次，崩溃遗留的运行会被标记为已中断。`OPENCODE_DISABLE_WORK_SCHEDULER=1` 可以关闭它。
- 每次运行都是一个使用 `work` 智能体的 opencode 会话——这是一个知识工作者角色，把文件夹当作工作区、把文件当作交付物——系统上下文里带有你的记忆和该智能体最近的结果，并按其访问级别使用无人值守权限。
- OpenWork 保留 opencode 的配置：`opencode.json`、`.opencode/`、`OPENCODE_*` 变量、提供商、MCP 服务器和 skills 都照常工作。
- OpenWork 把自己的数据放在 `~/.local/share/openwork`，全局配置放在 `~/.config/openwork`，与任何 opencode 安装分开，并且只从自己的 GitHub 发布更新。

| 位置                                                    | 内容                                                      |
| ------------------------------------------------------- | --------------------------------------------------------- |
| `packages/schema/src/work.ts`                           | 记录、输入和 `work.updated` 事件                          |
| `packages/core/src/work.ts`, `packages/core/src/work/`  | SQLite 表、`Work` 存储和计划解析                          |
| `packages/opencode/src/work/`                           | 调度器、无人值守权限、运行上下文、演示                    |
| `packages/opencode/src/tool/`                           | `inbox`、`user_todo`、`agenda`、`memory` 和 `deploy` 工具 |
| `packages/opencode/src/server/routes/instance/httpapi/` | `/work/*` HTTP API                                        |
| `packages/tui/src/work/`                                | 外壳、导航、页面和部署对话框                              |

完整指南见 [docs/openwork](docs/openwork/README.md)。

### 开发

```bash
bun install
bun dev ~/work

# 检查要在包目录中运行，不要在仓库根目录运行
(cd packages/tui && bun typecheck && bun test)
(cd packages/opencode && bun typecheck && bun test test/work)
```

截图由真实的 TUI 配合离线模型重新生成。使用 `--window linux` 时，每张都是一个真实 X11 窗口的照片（Xvfb、xfwm4 窗口管理器和 xfce4-terminal）：

```bash
sudo apt-get install tmux python3-pil xvfb dbus-x11 xfwm4 xfce4-terminal greybird-gtk-theme xdotool imagemagick fonts-dejavu-core
cd packages/opencode
TZ=Europe/London bun script/openwork/screenshots.ts --window linux --out ../../docs/openwork/screenshots
```

选择一个正值傍晚的 `TZ`：演示的运行历史从当地时间 06:00 开始。

### 致谢与许可证

OpenWork 构建在 [opencode](https://github.com/anomalyco/opencode) 之上，并沿用其 [MIT 许可证](LICENSE)。它不是由 opencode 团队开发的，也与他们没有关联。欢迎贡献——参见 [CONTRIBUTING.md](CONTRIBUTING.md)。
