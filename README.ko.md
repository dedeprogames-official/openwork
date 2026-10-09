<p align="center">
  <picture>
    <source srcset="docs/openwork/logo-dark.svg" media="(prefers-color-scheme: dark)">
    <source srcset="docs/openwork/logo-light.svg" media="(prefers-color-scheme: light)">
    <img src="docs/openwork/logo-light.svg" alt="OpenWork 로고" width="480">
  </picture>
</p>
<p align="center"><strong>에이전트를 폴더에 배포하세요. 일정에 맞춰 일하고, 결과는 Your Day에서 읽습니다.</strong></p>
<p align="center">opencode harness 위에 만든 터미널용 작업 모드.</p>
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

[![OpenWork — Linux 터미널 창의 Your Day](docs/openwork/screenshots/01-your-day.png)](docs/openwork/README.md)

<p align="center"><sub>여기 있는 모든 스크린샷은 Linux의 xfce4-terminal(Xfce, Greybird 테마)에서 데모 작업 공간을 오프라인 모델로 실행한 실제 OpenWork TUI입니다.</sub></p>

---

### OpenWork란?

OpenWork는 opencode의 터미널 UI를 코드만이 아니라 일을 끝내는 곳으로 바꿉니다. _“check the Half Moon Bay cam every 10m and tell me if it's sunny”_ 처럼 한 문장으로 일을 설명하면, OpenWork가 원하는 로컬 폴더에 에이전트를 배포합니다. 에이전트는 백그라운드에서 사람 없이 일정대로 실행되고, 찾은 모든 것은 한곳에 모입니다. 바로 일정, 할 일, **Agent Inbox** 옆의 **Your Day**입니다.

여전히 터미널 앱이고 여전히 opencode harness 위에서 동작합니다. 세션, 도구, 권한, 제공자, 로컬 모델, skills, MCP 서버가 모두 같습니다. 에이전트, 실행 기록, 받은 편지함, 할 일, 일정, 메모리는 로컬 SQLite에 저장됩니다.

### 주요 기능

- **즉시 배포** — 한 문장 → 폴더 → space → 일정 → 접근 권한. 단계마다 Enter만 누르면 몇 초 만에 에이전트가 배포되어 실행됩니다.
- **자연어 일정** — 영어 또는 포르투갈어로: `every 10m`, `hourly`, `every morning at 8`, `daily at 7:30`, `at 5pm`, `now`, `a cada 15 minutos`, `todo dia às 8h`.
- **Your Day** — 일정, 할 일, Agent Inbox, 그리고 space별로 묶인 모든 에이전트를 최근 결과와 다음 실행 시각과 함께 보여 줍니다.
- **Agent Calendar** — 하루의 모든 실행을 순서대로, space별 색으로 보여 주며 몇 분에서 하루 전체까지 확대·축소할 수 있고, 지금 실행 중인 항목은 테두리로 표시됩니다.
- **무인 실행과 안전** — 실행은 질문하려고 멈추지 않습니다. 권한 요청이 뜰 만한 동작은 모두 거부됩니다. 에이전트마다 접근 수준이 있습니다: `read + network`, `read + write + network`, `full`.
- **실제 기록** — 모든 실행은 열어 볼 수 있는 실제 opencode 세션이며, 도구 호출, 토큰, 비용이 담겨 있습니다.
- **보고하는 에이전트** — cowork 도구 `inbox`, `user_todo`, `agenda`, `memory`, `deploy`로 에이전트가 받은 편지함에 글을 남기고, 할 일을 추가하고, 일정을 읽고, 사용자에 대한 사실을 기억합니다. 채팅에서 새 에이전트를 배포할 수도 있습니다.
- **Spaces** — 목표, 이벤트, 고객을 중심으로 에이전트를 묶습니다.
- **space 간 에이전트 이동** — 에이전트 페이지에서 `m`을 누르거나, Spaces 페이지의 <b>+ Move an agent here...</b>를 쓰거나, 채팅으로 요청하세요.
- **메모리** — 모든 채팅과 모든 에이전트가 받는 사용자에 대한 사실.
- **토큰 통계** — 로컬과 클라우드 토큰을 따로 집계하고, 소비 속도, 하루 예상치, 로컬 모델로 아낀 금액을 보여 줍니다.
- **키보드와 마우스** — 페이지는 `alt+1` … `alt+8`, 모든 명령은 `ctrl+p`. 내비게이션, 버튼, 행, 체크박스, 키 힌트를 클릭할 수 있고, 목록과 캘린더는 휠로 스크롤합니다.
- **처음부터 끝까지 ASCII** — 로고, 게이지, 도넛 차트를 터미널 블록 문자로 그립니다.

### 스크린샷

<table>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/03-agents.png" alt="Agents"><br><b>Agents</b> — 토큰 게이지, 소비 속도, 절약액, 실시간 Agent Calendar</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/04-agents-whole-day.png" alt="Agent Calendar 하루 전체"><br>하루 전체로 축소한 <b>Agent Calendar</b></td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/05-agent-detail.png" alt="에이전트"><br><b>에이전트</b> — 마지막 실행의 도구 호출과 결과</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/06-agent-running.png" alt="실행 중인 에이전트"><br>지금 <b>실행 중</b>인 에이전트</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/14-deploy.png" alt="에이전트 배포"><br>한 문장으로 에이전트 <b>배포</b></td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/15-deploy-folder.png" alt="배포: 폴더 선택"><br>…이어서 일할 <b>폴더</b> 선택</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/07-spaces.png" alt="Spaces"><br><b>Spaces</b> — 목표별로 묶인 에이전트</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/08-chat.png" alt="채팅"><br>셸 안에서 <code>work</code> 에이전트와 <b>채팅</b></td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/10-skills.png" alt="Skills"><br><b>Skills</b> — 재사용 가능한 지침</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/11-memory.png" alt="메모리"><br><b>Memory</b> — 모든 채팅과 에이전트가 아는 사용자 정보</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/12-models.png" alt="모델"><br><b>Models</b> — 로컬과 클라우드</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/13-integrations.png" alt="연동"><br><b>Integrations</b> — MCP 서버와 계정</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/02-your-day-focus.png" alt="에이전트 열을 숨긴 Your Day"><br>에이전트 열을 숨긴 <b>Your Day</b></td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/16-command-palette.png" alt="명령"><br>팔레트의 모든 <b>명령</b> (<code>ctrl+p</code>)</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/17-new-chat.png" alt="새 채팅"><br><b>New chat</b></td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/18-nav-collapsed.png" alt="접힌 내비게이션"><br>접힌 <b>내비게이션</b> (<code>ctrl+x w</code>)</td>
  </tr>
</table>

---

### 시작하기

#### 설치

```bash
# macOS와 Linux
curl -fsSL https://github.com/dedeprogames-official/openwork/releases/latest/download/install | bash
```

```powershell
# Windows (PowerShell)
irm https://github.com/dedeprogames-official/openwork/releases/latest/download/install.ps1 | iex
```

```bash
# Node.js 18+가 있는 모든 OS: npx는 한 번 실행하고, npm install -g는 openwork 명령을 남깁니다
npx https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-cli.tgz
npm install -g https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-cli.tgz
```

그다음 폴더를 열고 `openwork`를 실행하세요. `openwork upgrade`는 최신 릴리스로 업데이트하고 `openwork uninstall`은 제거합니다.

#### 다운로드

| 플랫폼                   | 다운로드                                                                                                                                      |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Linux x64                | [`openwork-linux-x64.tar.gz`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-linux-x64.tar.gz)           |
| Linux arm64              | [`openwork-linux-arm64.tar.gz`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-linux-arm64.tar.gz)       |
| Linux x64 (musl, Alpine) | [`openwork-linux-x64-musl.tar.gz`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-linux-x64-musl.tar.gz) |
| macOS Apple Silicon      | [`openwork-darwin-arm64.zip`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-darwin-arm64.zip)           |
| macOS Intel              | [`openwork-darwin-x64.zip`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-darwin-x64.zip)               |
| Windows x64              | [`openwork-windows-x64.zip`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-windows-x64.zip)             |
| Windows arm64            | [`openwork-windows-arm64.zip`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-windows-arm64.zip)         |

모든 버전은 [릴리스 페이지](https://github.com/dedeprogames-official/openwork/releases)에 있습니다. 각 압축 파일에는 `openwork` 바이너리가 들어 있습니다. `-baseline` 빌드는 AVX2가 없는 x64 CPU용, `-musl` 빌드는 Alpine용이며 설치 스크립트가 알맞은 것을 고릅니다. macOS 바이너리는 ad hoc 서명이며 공증되지 않았습니다. 브라우저로 zip을 받았다면 `xattr -d com.apple.quarantine openwork`를 한 번 실행하세요.

#### Windows

PowerShell 설치 스크립트는 `openwork.exe`를 `%USERPROFILE%\.openwork\bin`에 두고 PATH에 추가합니다. 새 터미널을 열고 `openwork`를 실행하세요. Windows Terminal에서 가장 잘 동작합니다(트루컬러와 마우스). `openwork-windows-x64.zip`을 아무 곳에나 풀고 `openwork.exe`를 실행하거나, 위처럼 `npx`를 써도 됩니다.

#### 소스에서 실행

**요구 사항:** [Bun](https://bun.sh) 1.3 이상, git, 트루컬러와 마우스를 지원하는 터미널(xfce4-terminal, GNOME Terminal, Konsole, kitty, WezTerm, Ghostty, iTerm2, Windows Terminal 등). 모델은 opencode가 지원하는 모든 제공자 또는 Ollama, LM Studio, llama.cpp, vLLM으로 띄운 로컬 모델.

```bash
git clone https://github.com/dedeprogames-official/openwork.git
cd openwork
bun install
bun dev ~/work        # OpenWork가 열릴 폴더
```

`bun dev .`는 현재 폴더를 엽니다. `bun dev`만 실행하면 `packages/opencode`를 엽니다.

#### 단독 실행 파일 빌드

```bash
./packages/opencode/script/build.ts --single
./packages/opencode/dist/opencode-linux-x64/bin/opencode    # 또는 opencode-darwin-arm64 등
```

패키지는 같은 실행 파일을 `opencode`와 `openwork` 두 이름으로 설치합니다.

#### 처음 5분

1. **모델 연결** — `/connect`를 입력하거나 **Models**(`alt+7`)를 열고 `c`를 누릅니다. 로컬 모델은 [로컬 모델](#local-models)을 참고하세요.
2. **데모 불러오기** — `/demo`는 space 6개, 에이전트 17개, 하루치 실행 기록, skills, 받은 편지함 메시지, 할 일, 일정을 만듭니다. 토큰을 쓰지 않도록 에이전트는 일시 정지 상태로 시작하며, `/pause`로 실행을 허용합니다.
3. **직접 배포** — `ctrl+x d`를 누르거나 `/deploy check the weather in Lisbon every morning at 7 and tell me if I need an umbrella`를 입력합니다(일정은 영어나 포르투갈어로, 작업은 어떤 언어로든 쓸 수 있습니다).
4. **Your Day 읽기** — `alt+1`. 결과는 Agent Inbox에 도착합니다. 에이전트를 열면 실행 기록을 보거나 그 작업에 대해 채팅할 수 있습니다.

### 에이전트 배포

에이전트는 작업, 작업 폴더, 일정, 접근 수준, 그리고 선택적으로 skill로 이루어집니다. 배포할 때 선택된 모델로 실행됩니다. `ctrl+x d`, `/deploy <무엇을 언제>`, Agents 페이지의 **+ Create Agent** 버튼, space에서, 또는 채팅으로 요청해 배포할 수 있습니다.

| 입력                                                                    | 일정                                              |
| ----------------------------------------------------------------------- | ------------------------------------------------- |
| `every 10m`, `every 2 hours`, `a cada 15 minutos`                       | N분·시간·일마다(최소 1분)                         |
| `hourly`, `every hour`, `every minute`                                  | 매시간 또는 매분                                  |
| `daily at 9am`, `every morning at 8`, `every evening`, `todo dia às 8h` | 매일 그 시각(아침 08:00, 저녁 18:00, 그 외 09:00) |
| `at 5pm`, `às 17h`                                                      | 한 번, 다음 17:00에                               |
| `now`, `once` — 또는 시간 표현 없음                                     | 한 번, 바로                                       |

일정 단계에서는 **on demand**도 고를 수 있습니다. **Run now**를 누를 때만 실행됩니다.

| 접근 권한                | 에이전트가 할 수 있는 일                    |
| ------------------------ | ------------------------------------------- |
| `read + network`         | 파일 읽기, 웹 탐색, 받은 편지함에 글 남기기 |
| `read + write + network` | 자기 폴더에서 파일 만들기와 수정까지        |
| `full`                   | 셸 명령을 포함해 허용한 모든 도구 사용      |

실행은 무인으로 진행됩니다. 질문이나 권한 요청이 뜰 만한 동작은 모두 거부되고, 실행은 15분 후에 멈춥니다. 각 실행은 `<에이전트> · run #N`이라는 세션이며, 에이전트 페이지에서 `o`를 누르면 기록을 열 수 있습니다.

### 페이지

| 페이지       | 키      | 보여 주는 것                                                                                 |
| ------------ | ------- | -------------------------------------------------------------------------------------------- |
| Your Day     | `alt+1` | 일정, 할 일, Agent Inbox, 채팅 입력창, 그리고 space별로 묶인 모든 에이전트와 지난·다음 실행. |
| Chats        | `alt+2` | 내 채팅. 에이전트 실행은 목록에 나오지 않습니다.                                             |
| Spaces       | `alt+3` | space와 그 에이전트, 일정 항목.                                                              |
| Agents       | `alt+4` | 토큰 게이지, 소비 속도, 절약액, 토큰 사용처, Agent Calendar.                                 |
| Agent        | `enter` | 에이전트 하나: 작업, 일정, 접근 권한, 실행마다의 도구 호출과 결과, 기록, 전용 채팅.          |
| Skills       | `alt+5` | `.opencode/skills`와 `~/.agents/skills`의 skills.                                            |
| Memory       | `alt+6` | 채팅과 에이전트가 아는 사용자 정보.                                                          |
| Models       | `alt+7` | 로컬과 클라우드 모델. 로컬 토큰은 Usage 카드에서 따로 집계됩니다.                            |
| Integrations | `alt+8` | MCP 서버와 연결된 계정.                                                                      |

### 키보드와 마우스

| 키                | 동작                                                                                    |
| ----------------- | --------------------------------------------------------------------------------------- |
| `alt+1` … `alt+8` | 페이지 전환                                                                             |
| `ctrl+x d`        | 에이전트 배포                                                                           |
| `ctrl+x w`        | 내비게이션 접기·펼치기                                                                  |
| `m`               | 에이전트를 다른 space로 이동(해당 페이지) 또는 선택한 space로 에이전트 가져오기(Spaces) |
| `ctrl+p`          | 명령 팔레트                                                                             |
| `c`               | 채팅 입력창에 포커스(`esc`로 나가기)                                                    |
| `esc`             | 뒤로                                                                                    |

각 페이지 하단에 그 페이지의 키가 표시됩니다. 슬래시 명령: `/day`, `/chats`, `/spaces`, `/agents`, `/skills`, `/memory`, `/models`, `/integrations`, `/deploy <텍스트>`, `/pause`, `/demo`, `/connect`.

모든 것을 마우스로도 할 수 있습니다. 내비게이션, 버튼, 키 힌트를 클릭하고, 목록에서는 첫 클릭으로 행을 선택하고 두 번째 클릭으로 엽니다. 체크박스는 바로 바뀌고, 휠로 목록과 Agent Calendar를 스크롤합니다. 드래그하면 예전처럼 텍스트를 선택해 복사합니다.

<a id="local-models"></a>

### 로컬 모델

`localhost`에서 도는 OpenAI 호환 서버는 모두 로컬로 집계되며, `ollama`, `lmstudio`, `llamacpp`, `vllm` 제공자도 마찬가지입니다. 예를 들어 Ollama라면 `opencode.json`(작업 폴더나 `~/.config/openwork/`)에 다음처럼 씁니다:

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

### 동작 방식

- 스케줄러는 OpenWork 서버 프로세스 안에 있습니다. 5초마다 실행할 때가 된 에이전트를 찾아 동시에 최대 3개까지 실행합니다. 실행 확보는 SQLite에서 원자적으로 이루어지므로 여러 OpenWork 창이 같은 에이전트를 두 번 실행하는 일은 없고, 충돌로 남은 실행은 중단됨으로 표시됩니다. `OPENCODE_DISABLE_WORK_SCHEDULER=1`로 끌 수 있습니다.
- 각 실행은 `work` 에이전트를 쓰는 opencode 세션입니다. `work`는 폴더를 작업 공간으로, 파일을 결과물로 보는 지식 노동용 페르소나이며, 시스템 컨텍스트에 사용자 메모리와 그 에이전트의 최근 결과가 들어가고, 접근 수준에 맞는 무인 권한으로 실행됩니다.
- OpenWork는 opencode 설정을 그대로 유지합니다. `opencode.json`, `.opencode/`, `OPENCODE_*` 변수, 제공자, MCP 서버, skills가 모두 전과 같이 동작합니다.
- OpenWork는 데이터를 `~/.local/share/openwork`, 전역 설정을 `~/.config/openwork`에 두어 opencode 설치와 분리하며, 자신의 GitHub 릴리스로만 업데이트합니다.

| 위치                                                    | 내용                                                    |
| ------------------------------------------------------- | ------------------------------------------------------- |
| `packages/schema/src/work.ts`                           | 레코드, 입력, `work.updated` 이벤트                     |
| `packages/core/src/work.ts`, `packages/core/src/work/`  | SQLite 테이블, `Work` 스토어, 일정 해석                 |
| `packages/opencode/src/work/`                           | 스케줄러, 무인 권한, 실행 컨텍스트, 데모                |
| `packages/opencode/src/tool/`                           | `inbox`, `user_todo`, `agenda`, `memory`, `deploy` 도구 |
| `packages/opencode/src/server/routes/instance/httpapi/` | `/work/*` HTTP API                                      |
| `packages/tui/src/work/`                                | 셸, 내비게이션, 페이지, 배포 대화상자                   |

전체 가이드는 [docs/openwork](docs/openwork/README.md)에 있습니다.

### 개발

```bash
bun install
bun dev ~/work

# 검사는 저장소 루트가 아니라 패키지 디렉터리에서 실행합니다
(cd packages/tui && bun typecheck && bun test)
(cd packages/opencode && bun typecheck && bun test test/work)
```

스크린샷은 실제 TUI와 오프라인 모델로 다시 만듭니다. `--window linux`를 쓰면 각 스크린샷이 실제 X11 창(Xvfb, xfwm4 창 관리자, xfce4-terminal)의 사진이 됩니다:

```bash
sudo apt-get install tmux python3-pil xvfb dbus-x11 xfwm4 xfce4-terminal greybird-gtk-theme xdotool imagemagick fonts-dejavu-core
cd packages/opencode
TZ=Europe/London bun script/openwork/screenshots.ts --window linux --out ../../docs/openwork/screenshots
```

늦은 오후인 `TZ`를 고르세요. 데모의 실행 기록은 현지 시각 06:00에 시작합니다.

### 크레딧과 라이선스

OpenWork는 [opencode](https://github.com/anomalyco/opencode) 위에 만들어졌으며 그 [MIT 라이선스](LICENSE)를 그대로 따릅니다. opencode 팀이 만든 것이 아니며 그들과 관련이 없습니다. 기여를 환영합니다 — [CONTRIBUTING.md](CONTRIBUTING.md)를 참고하세요.
