<p align="center">
  <picture>
    <source srcset="docs/openwork/logo-dark.svg" media="(prefers-color-scheme: dark)">
    <source srcset="docs/openwork/logo-light.svg" media="(prefers-color-scheme: light)">
    <img src="docs/openwork/logo-light.svg" alt="OpenWork のロゴ" width="480">
  </picture>
</p>
<p align="center"><strong>エージェントをフォルダにデプロイ。スケジュールどおりに働き、結果は Your Day で読めます。</strong></p>
<p align="center">opencode の harness の上に作られた、ターミナルのためのワークモード。</p>
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

[![OpenWork — Linux のターミナルウィンドウに表示した Your Day](docs/openwork/screenshots/01-your-day.png)](docs/openwork/README.md)

<p align="center"><sub>ここにあるスクリーンショットはすべて、Linux の xfce4-terminal（Xfce、Greybird テーマ）で動く本物の OpenWork TUI で、デモ用ワークスペースをオフラインモデルで動かしています。</sub></p>

---

### OpenWork とは？

OpenWork は opencode のターミナル UI を、コードだけでなく仕事を片付ける場所に変えます。_「check the Half Moon Bay cam every 10m and tell me if it's sunny」_ のように一文で仕事を書くと、OpenWork は選んだローカルフォルダにエージェントをデプロイします。エージェントはバックグラウンドで無人のままスケジュールどおりに動き、見つけたものはすべて一か所に集まります。予定、ToDo、**Agent Inbox** と並ぶ **Your Day** です。

これまでどおりターミナルアプリで、opencode の harness の上で動きます。セッション、ツール、権限、プロバイダー、ローカルモデル、skills、MCP サーバーはすべて同じです。エージェント、実行履歴、受信箱、ToDo、予定、メモリーはローカルの SQLite に保存されます。

### 主な特長

- **即時デプロイ** — 一文 → フォルダ → space → スケジュール → アクセス。各ステップで Enter を押すだけで、数秒でエージェントがデプロイされて動き出します。
- **ふつうの言葉でスケジュール** — 英語かポルトガル語で：`every 10m`、`hourly`、`every morning at 8`、`daily at 7:30`、`at 5pm`、`now`、`a cada 15 minutos`、`todo dia às 8h`。
- **Your Day** — 予定、ToDo、Agent Inbox、そして space ごとにまとめたすべてのエージェントを、最新の結果と次の実行時刻つきで表示。
- **Agent Calendar** — その日のすべての実行を順番に、space ごとに色分けして表示。数分から一日全体までズームでき、いま動いている実行は枠で囲まれます。
- **無人で安全** — 実行は質問のために止まりません。権限確認が出る操作はすべて拒否されます。各エージェントにはアクセスレベルがあります：`read + network`、`read + write + network`、`full`。
- **本物のトランスクリプト** — 各実行は開いて確認できる本物の opencode セッションで、ツール呼び出し、トークン、コストが記録されます。
- **報告するエージェント** — cowork ツールの `inbox`、`user_todo`、`agenda`、`memory`、`deploy` により、エージェントは受信箱への投稿、ToDo の追加、予定の確認、あなたに関する事実の記憶ができます。チャットから新しいエージェントをデプロイすることもできます。
- **Spaces** — 目標、イベント、顧客ごとにエージェントをまとめます。
- **エージェントを space 間で移動** — エージェントのページで `m`、Spaces ページの **+ Move an agent here...**、またはチャットで頼むだけです。
- **メモリー** — すべてのチャットとエージェントに渡される、あなたについての事実。
- **トークン統計** — ローカルとクラウドのトークンを別々に集計し、消費ペース、1 日の予測、ローカルモデルによる節約額を表示。
- **キーボードとマウス** — ページは `alt+1` … `alt+8`、すべてのコマンドは `ctrl+p`。ナビゲーション、ボタン、行、チェックボックス、キーのヒントはクリックでき、リストとカレンダーはホイールでスクロールできます。
- **とことん ASCII** — ロゴ、ゲージ、ドーナツグラフはターミナルのブロック文字で描かれています。

### スクリーンショット

<table>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/03-agents.png" alt="Agents"><br><b>Agents</b> — トークンゲージ、消費ペース、節約額、ライブの Agent Calendar</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/04-agents-whole-day.png" alt="Agent Calendar（一日全体）"><br>一日全体にズームアウトした <b>Agent Calendar</b></td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/05-agent-detail.png" alt="エージェント"><br><b>エージェント</b> — 最新の実行のツール呼び出しと結果</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/06-agent-running.png" alt="実行中のエージェント"><br>いま<b>実行中</b>のエージェント</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/14-deploy.png" alt="エージェントのデプロイ"><br>一文でエージェントを<b>デプロイ</b></td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/15-deploy-folder.png" alt="デプロイ：フォルダの選択"><br>…次に作業する<b>フォルダ</b>を選択</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/07-spaces.png" alt="Spaces"><br><b>Spaces</b> — 目標ごとにまとめたエージェント</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/08-chat.png" alt="チャット"><br>シェルの中で <code>work</code> エージェントと<b>チャット</b></td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/10-skills.png" alt="Skills"><br><b>Skills</b> — 再利用できる指示</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/11-memory.png" alt="メモリー"><br><b>Memory</b> — すべてのチャットとエージェントが知っているあなたのこと</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/12-models.png" alt="モデル"><br><b>Models</b> — ローカルとクラウド</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/13-integrations.png" alt="連携"><br><b>Integrations</b> — MCP サーバーとアカウント</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/02-your-day-focus.png" alt="エージェント列を隠した Your Day"><br>エージェント列を隠した <b>Your Day</b></td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/16-command-palette.png" alt="コマンド"><br>パレットのすべての<b>コマンド</b>（<code>ctrl+p</code>）</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/17-new-chat.png" alt="新しいチャット"><br><b>New chat</b></td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/18-nav-collapsed.png" alt="折りたたんだナビゲーション"><br>折りたたんだ<b>ナビゲーション</b>（<code>ctrl+x w</code>）</td>
  </tr>
</table>

---

### はじめに

#### インストール

```bash
# macOS と Linux
curl -fsSL https://github.com/dedeprogames-official/openwork/releases/latest/download/install | bash
```

```powershell
# Windows（PowerShell）
irm https://github.com/dedeprogames-official/openwork/releases/latest/download/install.ps1 | iex
```

```bash
# Node.js 18+ が入った任意の OS：npx は一度だけ実行、npm install -g なら openwork コマンドが残ります
npx https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-cli.tgz
npm install -g https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-cli.tgz
```

あとはフォルダを開いて `openwork` を実行します。`openwork upgrade` で最新リリースに更新、`openwork uninstall` で削除できます。

#### ダウンロード

| プラットフォーム         | ダウンロード                                                                                                                                  |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Linux x64                | [`openwork-linux-x64.tar.gz`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-linux-x64.tar.gz)           |
| Linux arm64              | [`openwork-linux-arm64.tar.gz`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-linux-arm64.tar.gz)       |
| Linux x64 (musl, Alpine) | [`openwork-linux-x64-musl.tar.gz`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-linux-x64-musl.tar.gz) |
| macOS Apple Silicon      | [`openwork-darwin-arm64.zip`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-darwin-arm64.zip)           |
| macOS Intel              | [`openwork-darwin-x64.zip`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-darwin-x64.zip)               |
| Windows x64              | [`openwork-windows-x64.zip`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-windows-x64.zip)             |
| Windows arm64            | [`openwork-windows-arm64.zip`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-windows-arm64.zip)         |

すべてのバージョンは[リリースページ](https://github.com/dedeprogames-official/openwork/releases)にあります。各アーカイブには `openwork` バイナリが入っています。`-baseline` は AVX2 のない x64 CPU 向け、`-musl` は Alpine 向けで、インストーラーが適切なものを選びます。macOS のバイナリは ad hoc 署名で公証されていません。ブラウザで zip をダウンロードした場合は一度 `xattr -d com.apple.quarantine openwork` を実行してください。

#### Windows

PowerShell インストーラーは `openwork.exe` を `%USERPROFILE%\.openwork\bin` に置き、PATH に追加します。新しいターミナルを開いて `openwork` を実行してください。Windows Terminal が最適です（トゥルーカラーとマウス）。`openwork-windows-x64.zip` を好きな場所に展開して `openwork.exe` を実行するか、上のように `npx` を使うこともできます。

#### ソースから実行

**必要なもの：** [Bun](https://bun.sh) 1.3 以降、git、トゥルーカラーとマウスに対応したターミナル（xfce4-terminal、GNOME Terminal、Konsole、kitty、WezTerm、Ghostty、iTerm2、Windows Terminal など）。モデルは opencode が対応する任意のプロバイダー、または Ollama、LM Studio、llama.cpp、vLLM で動かすローカルモデル。

```bash
git clone https://github.com/dedeprogames-official/openwork.git
cd openwork
bun install
bun dev ~/work        # OpenWork が開くフォルダ
```

`bun dev .` は現在のフォルダを開きます。`bun dev` だけだと `packages/opencode` を開きます。

#### 単体のバイナリをビルド

```bash
./packages/opencode/script/build.ts --single
./packages/opencode/dist/opencode-linux-x64/bin/opencode    # または opencode-darwin-arm64 など
```

パッケージは同じバイナリを `opencode` と `openwork` の両方の名前でインストールします。

#### 最初の 5 分

1. **モデルを接続** — `/connect`、または **Models**（`alt+7`）を開いて `c` を押します。ローカルモデルは[ローカルモデル](#local-models)を参照してください。
2. **デモを読み込む** — `/demo` は 6 つの space、17 のエージェント、1 日分の実行履歴、skills、受信箱のメッセージ、ToDo、予定を作成します。トークンを使わないようにエージェントは一時停止の状態で始まり、`/pause` で動き出します。
3. **自分のエージェントをデプロイ** — `ctrl+x d`、または `/deploy check the weather in Lisbon every morning at 7 and tell me if I need an umbrella` と入力します（スケジュールは英語かポルトガル語、タスクは何語でも構いません）。
4. **Your Day を読む** — `alt+1`。結果は Agent Inbox に届きます。エージェントを開くと実行履歴を見たり、その仕事についてチャットしたりできます。

### エージェントのデプロイ

エージェントは、タスク、作業フォルダ、スケジュール、アクセスレベル、そして必要なら skill でできています。デプロイしたときに選ばれていたモデルで動きます。`ctrl+x d`、`/deploy <何をいつ>`、Agents ページの **+ Create Agent** ボタン、space から、あるいはチャットで頼んでデプロイできます。

| 書き方                                                                  | スケジュール                                               |
| ----------------------------------------------------------------------- | ---------------------------------------------------------- |
| `every 10m`, `every 2 hours`, `a cada 15 minutos`                       | N 分・時間・日ごと（最短 1 分）                            |
| `hourly`, `every hour`, `every minute`                                  | 1 時間ごと、または 1 分ごと                                |
| `daily at 9am`, `every morning at 8`, `every evening`, `todo dia às 8h` | 毎日その時刻（朝は 08:00、夕方は 18:00、それ以外は 09:00） |
| `at 5pm`, `às 17h`                                                      | 1 回だけ、次の 17:00 に                                    |
| `now`, `once` — または時間の言葉なし                                    | 1 回だけ、すぐに                                           |

スケジュールのステップでは **on demand** も選べます。**Run now** を押したときだけ実行されます。

| アクセス                 | エージェントにできること                           |
| ------------------------ | -------------------------------------------------- |
| `read + network`         | ファイルの読み取り、Web の閲覧、受信箱への投稿     |
| `read + write + network` | さらに自分のフォルダでのファイル作成と編集         |
| `full`                   | シェルコマンドを含む、許可したすべてのツールの使用 |

実行は無人です。質問や権限確認が出る操作はすべて拒否され、実行は 15 分で止まります。各実行は `<エージェント> · run #N` という名前のセッションで、エージェントのページで `o` を押すとトランスクリプトを開けます。

### ページ

| ページ       | キー    | 内容                                                                                                         |
| ------------ | ------- | ------------------------------------------------------------------------------------------------------------ |
| Your Day     | `alt+1` | 予定、ToDo、Agent Inbox、チャット入力欄、そして space ごとにまとめたすべてのエージェントと前回・次回の実行。 |
| Chats        | `alt+2` | あなたのチャット。エージェントの実行は一覧に出ません。                                                       |
| Spaces       | `alt+3` | space と、そのエージェントや予定。                                                                           |
| Agents       | `alt+4` | トークンゲージ、消費ペース、節約額、トークンの内訳、Agent Calendar。                                         |
| Agent        | `enter` | 1 つのエージェント：タスク、スケジュール、アクセス、各実行のツール呼び出しと結果、履歴、専用のチャット。     |
| Skills       | `alt+5` | `.opencode/skills` と `~/.agents/skills` の skills。                                                         |
| Memory       | `alt+6` | チャットとエージェントが知っているあなたのこと。                                                             |
| Models       | `alt+7` | ローカルとクラウドのモデル。ローカルのトークンは Usage カードで別に集計されます。                            |
| Integrations | `alt+8` | MCP サーバーと接続済みアカウント。                                                                           |

### キーボードとマウス

| キー              | 操作                                                                                   |
| ----------------- | -------------------------------------------------------------------------------------- |
| `alt+1` … `alt+8` | ページ切り替え                                                                         |
| `ctrl+x d`        | エージェントをデプロイ                                                                 |
| `ctrl+x w`        | ナビゲーションの折りたたみ・展開                                                       |
| `m`               | エージェントを別の space へ移動（そのページで）、または選択中の space へ移動（Spaces） |
| `ctrl+p`          | コマンドパレット                                                                       |
| `c`               | チャット入力欄にフォーカス（`esc` で離れる）                                           |
| `esc`             | 戻る                                                                                   |

各ページの下部にそのページのキーが表示されます。スラッシュコマンド：`/day`、`/chats`、`/spaces`、`/agents`、`/skills`、`/memory`、`/models`、`/integrations`、`/deploy <テキスト>`、`/pause`、`/demo`、`/connect`。

すべてマウスでも操作できます。ナビゲーション、ボタン、キーのヒントをクリックでき、リストでは 1 回目のクリックで行を選択、2 回目で開きます。チェックボックスはすぐに切り替わり、ホイールでリストと Agent Calendar をスクロールできます。ドラッグすると今までどおりテキストを選択してコピーできます。

<a id="local-models"></a>

### ローカルモデル

`localhost` 上の OpenAI 互換サーバーはすべてローカルとして扱われます。`ollama`、`lmstudio`、`llamacpp`、`vllm` プロバイダーも同様です。たとえば Ollama なら、`opencode.json`（作業フォルダか `~/.config/openwork/`）に次のように書きます：

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

### しくみ

- スケジューラーは OpenWork のサーバープロセスの中にあります。5 秒ごとに実行時刻が来たエージェントを探し、同時に最大 3 つ実行します。実行の確保は SQLite でアトミックに行われるため、複数の OpenWork ウィンドウが同じエージェントを二重に動かすことはなく、クラッシュで残った実行は中断済みとして記録されます。`OPENCODE_DISABLE_WORK_SCHEDULER=1` で無効にできます。
- 各実行は `work` エージェントによる opencode セッションです。`work` はフォルダを作業場所、ファイルを成果物として扱うナレッジワーク向けのペルソナで、システムコンテキストにはあなたのメモリーとそのエージェントの最近の結果が入り、アクセスレベルに応じた無人用の権限で動きます。
- OpenWork は opencode の設定をそのまま使います。`opencode.json`、`.opencode/`、`OPENCODE_*` 環境変数、プロバイダー、MCP サーバー、skills はこれまでどおり動きます。
- OpenWork はデータを `~/.local/share/openwork`、グローバル設定を `~/.config/openwork` に置き、opencode のインストールとは分けて管理します。更新は自身の GitHub リリースからのみ行います。

| 場所                                                    | 内容                                                      |
| ------------------------------------------------------- | --------------------------------------------------------- |
| `packages/schema/src/work.ts`                           | レコード、入力、`work.updated` イベント                   |
| `packages/core/src/work.ts`, `packages/core/src/work/`  | SQLite のテーブル、`Work` ストア、スケジュールの解析      |
| `packages/opencode/src/work/`                           | スケジューラー、無人用の権限、実行コンテキスト、デモ      |
| `packages/opencode/src/tool/`                           | `inbox`、`user_todo`、`agenda`、`memory`、`deploy` ツール |
| `packages/opencode/src/server/routes/instance/httpapi/` | `/work/*` HTTP API                                        |
| `packages/tui/src/work/`                                | シェル、ナビゲーション、ページ、デプロイダイアログ        |

詳しいガイドは [docs/openwork](docs/openwork/README.md) にあります。

### 開発

```bash
bun install
bun dev ~/work

# チェックはリポジトリのルートではなく、パッケージのディレクトリで実行します
(cd packages/tui && bun typecheck && bun test)
(cd packages/opencode && bun typecheck && bun test test/work)
```

スクリーンショットは本物の TUI とオフラインモデルから再生成されます。`--window linux` を付けると、それぞれが本物の X11 ウィンドウ（Xvfb、ウィンドウマネージャーの xfwm4、xfce4-terminal）の写真になります：

```bash
sudo apt-get install tmux python3-pil xvfb dbus-x11 xfwm4 xfce4-terminal greybird-gtk-theme xdotool imagemagick fonts-dejavu-core
cd packages/opencode
TZ=Europe/London bun script/openwork/screenshots.ts --window linux --out ../../docs/openwork/screenshots
```

夕方になっている `TZ` を選んでください。デモの実行履歴は現地時間の 06:00 から始まります。

### クレジットとライセンス

OpenWork は [opencode](https://github.com/anomalyco/opencode) の上に作られており、その [MIT ライセンス](LICENSE)を引き継いでいます。opencode チームが開発したものではなく、提携もしていません。コントリビューション歓迎です。[CONTRIBUTING.md](CONTRIBUTING.md) をご覧ください。
