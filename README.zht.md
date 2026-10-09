<p align="center">
  <picture>
    <source srcset="docs/openwork/logo-dark.svg" media="(prefers-color-scheme: dark)">
    <source srcset="docs/openwork/logo-light.svg" media="(prefers-color-scheme: light)">
    <img src="docs/openwork/logo-light.svg" alt="OpenWork 標誌" width="480">
  </picture>
</p>
<p align="center"><strong>把代理部署到你的資料夾裡。它們按排程工作。你在 Your Day 裡查看結果。</strong></p>
<p align="center">終端機裡的工作模式，建構在 opencode harness 之上。</p>
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

[![OpenWork — Linux 終端機視窗中的 Your Day](docs/openwork/screenshots/01-your-day.png)](docs/openwork/README.md)

<p align="center"><sub>這裡的每張截圖都是真實的 OpenWork TUI，執行於 Linux 的 xfce4-terminal 中（Xfce，Greybird 佈景主題），使用示範工作區和離線模型。</sub></p>

---

### OpenWork 是什麼？

OpenWork 把 opencode 的終端機介面變成完成工作的地方——不只是寫程式。用一句話描述任務，例如 _「check the Half Moon Bay cam every 10m and tell me if it's sunny」_，OpenWork 就會把一個代理部署到你選擇的本機資料夾。代理會在背景依排程無人值守地執行，它找到的一切都匯集到同一個地方：**Your Day**，旁邊是你的行程、待辦事項和 **Agent Inbox**。

它仍然是終端機應用程式，仍然執行在 opencode harness 之上：同樣的工作階段、工具、權限、供應商、本機模型、skills 和 MCP 伺服器。代理、執行紀錄、收件匣、待辦、行程和記憶都儲存在本機的 SQLite 中。

### 特色

- **即時部署**——一句話 → 資料夾 → space → 排程 → 權限。每一步按 Enter，幾秒內代理就部署完成並開始執行。
- **用自然語言寫排程**——英文或葡萄牙文：`every 10m`、`hourly`、`every morning at 8`、`daily at 7:30`、`at 5pm`、`now`、`a cada 15 minutos`、`todo dia às 8h`。
- **Your Day**——行程、待辦、Agent Inbox，以及依 space 分組的所有代理，附上最近結果和下次執行時間。
- **Agent Calendar**——當天每次執行依序排列，依 space 上色，可從幾分鐘縮放到一整天，正在執行的那次以外框標示。
- **無人值守且安全**——執行從不停下來詢問：任何會跳出權限請求的動作都會被拒絕。每個代理都有存取層級：`read + network`、`read + write + network` 或 `full`。
- **真實的紀錄**——每次執行都是一個可以開啟的真實 opencode 工作階段，包含工具呼叫、token 和費用。
- **會回報的代理**——cowork 工具 `inbox`、`user_todo`、`agenda`、`memory` 和 `deploy` 讓代理可以傳訊息到你的收件匣、新增待辦、讀取行程、記住關於你的事實。聊天也能部署新的代理。
- **Spaces**——圍繞一個目標、一個活動或一位客戶來組織代理。
- **記憶**——每個聊天和每個代理都會收到的、關於你的事實。
- **Token 統計**——本機與雲端 token 分開計算，消耗速率、每日預估，以及本機模型幫你省下多少。
- **鍵盤與滑鼠**——`alt+1` … `alt+8` 切換頁面，`ctrl+p` 開啟所有指令；可點擊導覽、按鈕、列、核取方塊和按鍵提示；用滾輪捲動清單和行事曆。
- **從頭到尾都是 ASCII**——標誌、儀表和環形圖都用終端機方塊字元繪製。

### 截圖

<table>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/03-agents.png" alt="Agents"><br><b>Agents</b>——token 儀表、消耗速率、節省金額和即時 Agent Calendar</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/04-agents-whole-day.png" alt="Agent Calendar 全天"><br>縮放到全天的 <b>Agent Calendar</b></td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/05-agent-detail.png" alt="代理"><br><b>代理</b>——最近一次執行的工具呼叫和結果</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/06-agent-running.png" alt="執行中的代理"><br>一個正在<b>執行</b>的代理</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/14-deploy.png" alt="部署代理"><br>用一句話<b>部署</b>代理</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/15-deploy-folder.png" alt="部署：選擇資料夾"><br>……接著選擇它工作的<b>資料夾</b></td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/07-spaces.png" alt="Spaces"><br><b>Spaces</b>——圍繞目標分組的代理</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/08-chat.png" alt="聊天"><br>在 shell 裡與 <code>work</code> 代理<b>聊天</b></td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/10-skills.png" alt="Skills"><br><b>Skills</b>——可重複使用的指示</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/11-memory.png" alt="記憶"><br><b>Memory</b>——每個聊天和代理對你的了解</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/12-models.png" alt="模型"><br><b>Models</b>——本機與雲端</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/13-integrations.png" alt="整合"><br><b>Integrations</b>——MCP 伺服器和帳號</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/02-your-day-focus.png" alt="隱藏代理欄的 Your Day"><br>隱藏代理欄的 <b>Your Day</b></td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/16-command-palette.png" alt="指令"><br>指令面板中的所有<b>指令</b>（<code>ctrl+p</code>）</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/17-new-chat.png" alt="新聊天"><br><b>New chat</b></td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/18-nav-collapsed.png" alt="收合的導覽"><br>收合的<b>導覽</b>（<code>ctrl+x w</code>）</td>
  </tr>
</table>

---

### 快速開始

**需求：**[Bun](https://bun.sh) 1.3 或更新版本、git，以及支援全彩和滑鼠的終端機（xfce4-terminal、GNOME Terminal、Konsole、kitty、WezTerm、Ghostty、iTerm2、Windows Terminal……）。模型方面：任何 opencode 支援的供應商，或由 Ollama、LM Studio、llama.cpp、vLLM 提供的本機模型。

#### 從原始碼執行

```bash
git clone https://github.com/dedeprogames-official/openwork.git
cd openwork
bun install
bun dev ~/work        # OpenWork 開啟的資料夾
```

`bun dev .` 開啟目前的資料夾；只執行 `bun dev` 會開啟 `packages/opencode`。

#### 建置獨立執行檔

```bash
./packages/opencode/script/build.ts --single
./packages/opencode/dist/opencode-linux-x64/bin/opencode    # 或 opencode-darwin-arm64，……
```

此套件會以 `opencode` 和 `openwork` 兩個名稱安裝同一個執行檔。

#### 最初的五分鐘

1. **連接模型**——`/connect`，或開啟 **Models**（`alt+7`）並按 `c`。本機模型請參閱[本機模型](#local-models)。
2. **載入示範**——`/demo` 會建立 6 個 space、17 個代理、一天的執行歷史、skills、收件匣訊息、待辦和行程。示範代理一開始是暫停的，不會消耗 token；`/pause` 讓它們開始執行。
3. **部署你自己的**——`ctrl+x d`，或輸入 `/deploy check the weather in Lisbon every morning at 7 and tell me if I need an umbrella`（排程用英文或葡萄牙文撰寫；任務可以用任何語言）。
4. **查看 Your Day**——`alt+1`。結果會進入 Agent Inbox；開啟一個代理即可查看它的執行紀錄，或針對它的工作聊天。

### 部署代理

一個代理由任務、工作資料夾、排程和存取層級組成，也可以附帶一個 skill。它會使用部署時所選的模型執行。可以透過 `ctrl+x d`、`/deploy <做什麼、什麼時候>`、Agents 頁面上的 **+ Create Agent** 按鈕、某個 space，或在聊天中提出請求來部署。

| 你寫                                                                    | 排程                                               |
| ----------------------------------------------------------------------- | -------------------------------------------------- |
| `every 10m`, `every 2 hours`, `a cada 15 minutos`                       | 每 N 分鐘、小時或天（至少 1 分鐘）                 |
| `hourly`, `every hour`, `every minute`                                  | 每小時或每分鐘                                     |
| `daily at 9am`, `every morning at 8`, `every evening`, `todo dia às 8h` | 每天在該時間（早上 08:00，晚上 18:00，否則 09:00） |
| `at 5pm`, `às 17h`                                                      | 一次，在下一個 17:00                               |
| `now`, `once` — 或完全不寫時間詞                                        | 一次，立即                                         |

排程步驟也提供 **on demand**：只有在你按下 **Run now** 時代理才會執行。

| 存取層級                 | 代理可以                               |
| ------------------------ | -------------------------------------- |
| `read + network`         | 讀取檔案、瀏覽網頁、傳訊息到你的收件匣 |
| `read + write + network` | 還能在自己的資料夾裡建立和編輯檔案     |
| `full`                   | 使用你允許的所有工具，包括 shell 指令  |

執行是無人值守的：提問和任何會跳出權限請求的動作都會被拒絕，單次執行 15 分鐘後停止。每次執行都是一個名為 `<代理> · run #N` 的工作階段；在代理頁面按 `o` 可開啟它的紀錄。

### 頁面

| 頁面         | 按鍵    | 內容                                                                                 |
| ------------ | ------- | ------------------------------------------------------------------------------------ |
| Your Day     | `alt+1` | 行程、待辦、Agent Inbox、聊天輸入框，以及依 space 分組、附上次與下次執行的所有代理。 |
| Chats        | `alt+2` | 你的聊天；代理的執行不會出現在清單中。                                               |
| Spaces       | `alt+3` | 各個 space 及其代理和行程項目。                                                      |
| Agents       | `alt+4` | token 儀表、消耗速率、節省、token 去向，以及 Agent Calendar。                        |
| Agent        | `enter` | 單一代理：任務、排程、權限、每次執行的工具呼叫和結果、歷史以及它自己的聊天。         |
| Skills       | `alt+5` | 來自 `.opencode/skills` 和 `~/.agents/skills` 的 skills。                            |
| Memory       | `alt+6` | 聊天和代理對你的了解。                                                               |
| Models       | `alt+7` | 本機和雲端模型；本機 token 在 Usage 卡片中另外計算。                                 |
| Integrations | `alt+8` | MCP 伺服器和已連結的帳號。                                                           |

### 鍵盤與滑鼠

| 按鍵              | 動作                         |
| ----------------- | ---------------------------- |
| `alt+1` … `alt+8` | 切換頁面                     |
| `ctrl+x d`        | 部署代理                     |
| `ctrl+x w`        | 收合或展開導覽               |
| `ctrl+p`          | 指令面板                     |
| `c`               | 聚焦聊天輸入框（`esc` 離開） |
| `esc`             | 返回                         |

每個頁面都會在底部列出自己的按鍵。斜線指令：`/day`、`/chats`、`/spaces`、`/agents`、`/skills`、`/memory`、`/models`、`/integrations`、`/deploy <文字>`、`/pause`、`/demo`、`/connect`。

一切也都能用滑鼠操作：點擊導覽、按鈕和按鍵提示；在清單中第一次點擊選取一列，第二次點擊開啟它；核取方塊立即切換；滾輪捲動清單和 Agent Calendar。拖曳仍然會選取並複製文字。

<a id="local-models"></a>

### 本機模型

任何執行在 `localhost` 上的 OpenAI 相容伺服器都算本機，`ollama`、`lmstudio`、`llamacpp` 和 `vllm` 供應商也是。例如使用 Ollama 時，在 `opencode.json` 中（放在你的資料夾或 `~/.config/opencode/` 裡）：

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

### 運作方式

- 排程器執行在 OpenWork 伺服器程序中。它每 5 秒檢查一次到期的代理，同時最多執行 3 個。認領在 SQLite 中是原子操作，所以多個 OpenWork 視窗絕不會把同一個代理執行兩次，當機遺留的執行會被標記為已中斷。`OPENCODE_DISABLE_WORK_SCHEDULER=1` 可以關閉它。
- 每次執行都是一個使用 `work` 代理的 opencode 工作階段——這是知識工作者角色，把資料夾當作工作區、把檔案當作交付成果——系統脈絡中帶有你的記憶和該代理最近的結果，並依其存取層級使用無人值守權限。
- OpenWork 保留 opencode 的設定：`opencode.json`、`.opencode/`、`OPENCODE_*` 變數、供應商、MCP 伺服器和 skills 都照常運作。

| 位置                                                    | 內容                                                      |
| ------------------------------------------------------- | --------------------------------------------------------- |
| `packages/schema/src/work.ts`                           | 紀錄、輸入和 `work.updated` 事件                          |
| `packages/core/src/work.ts`, `packages/core/src/work/`  | SQLite 資料表、`Work` 儲存和排程解析                      |
| `packages/opencode/src/work/`                           | 排程器、無人值守權限、執行脈絡、示範                      |
| `packages/opencode/src/tool/`                           | `inbox`、`user_todo`、`agenda`、`memory` 和 `deploy` 工具 |
| `packages/opencode/src/server/routes/instance/httpapi/` | `/work/*` HTTP API                                        |
| `packages/tui/src/work/`                                | 外殼、導覽、頁面和部署對話框                              |

完整指南請見 [docs/openwork](docs/openwork/README.md)。

### 開發

```bash
bun install
bun dev ~/work

# 檢查要在套件目錄中執行，不要在儲存庫根目錄執行
(cd packages/tui && bun typecheck && bun test)
(cd packages/opencode && bun typecheck && bun test test/work)
```

截圖由真實的 TUI 搭配離線模型重新產生。使用 `--window linux` 時，每張都是真實 X11 視窗的照片（Xvfb、xfwm4 視窗管理員和 xfce4-terminal）：

```bash
sudo apt-get install tmux python3-pil xvfb dbus-x11 xfwm4 xfce4-terminal greybird-gtk-theme xdotool imagemagick fonts-dejavu-core
cd packages/opencode
TZ=Europe/London bun script/openwork/screenshots.ts --window linux --out ../../docs/openwork/screenshots
```

選擇一個正值傍晚的 `TZ`：示範的執行歷史從當地時間 06:00 開始。

### 致謝與授權

OpenWork 建構在 [opencode](https://github.com/anomalyco/opencode) 之上，並沿用其 [MIT 授權](LICENSE)。它不是由 opencode 團隊開發，也與他們沒有關聯。歡迎貢獻——請參閱 [CONTRIBUTING.md](CONTRIBUTING.md)。
