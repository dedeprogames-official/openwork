<p align="center">
  <picture>
    <source srcset="docs/openwork/logo-dark.svg" media="(prefers-color-scheme: dark)">
    <source srcset="docs/openwork/logo-light.svg" media="(prefers-color-scheme: light)">
    <img src="docs/openwork/logo-light.svg" alt="OpenWork লোগো" width="480">
  </picture>
</p>
<p align="center"><strong>আপনার ফোল্ডারে এজেন্ট ডিপ্লয় করুন। তারা সময়সূচি মেনে কাজ করে। ফলাফল পড়ুন Your Day-তে।</strong></p>
<p align="center">টার্মিনালের জন্য একটি কাজের মোড, opencode harness-এর ওপর তৈরি।</p>
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

[![OpenWork — Linux-এ একটি টার্মিনাল উইন্ডোতে Your Day](docs/openwork/screenshots/01-your-day.png)](docs/openwork/README.md)

<p align="center"><sub>এখানের প্রতিটি স্ক্রিনশট Linux-এর xfce4-terminal-এ (Xfce, Greybird থিম) চলা আসল OpenWork TUI, যা অফলাইন মডেল দিয়ে ডেমো ওয়ার্কস্পেস চালাচ্ছে।</sub></p>

---

### OpenWork কী?

OpenWork opencode-এর টার্মিনাল ইন্টারফেসকে শুধু কোড নয়, কাজ শেষ করার জায়গায় পরিণত করে। এক বাক্যে একটি কাজ বর্ণনা করুন, যেমন _“check the Half Moon Bay cam every 10m and tell me if it's sunny”_, আর OpenWork আপনার বেছে নেওয়া একটি লোকাল ফোল্ডারে একটি এজেন্ট ডিপ্লয় করবে। এজেন্টটি তত্ত্বাবধান ছাড়াই ব্যাকগ্রাউন্ডে নিজের সময়সূচি মেনে চলে, আর যা কিছু খুঁজে পায় সব এক জায়গায় আসে: **Your Day**, আপনার এজেন্ডা, টুডু আর **Agent Inbox**-এর পাশে।

এটি এখনও একটি টার্মিনাল অ্যাপ এবং এখনও opencode harness-এর ওপর চলে: একই সেশন, টুল, অনুমতি, প্রোভাইডার, লোকাল মডেল, skills ও MCP সার্ভার। এজেন্ট, রান, ইনবক্স, টুডু, এজেন্ডা ও মেমরি লোকালি SQLite-এ সংরক্ষিত থাকে।

### মূল বৈশিষ্ট্য

- **তাৎক্ষণিক ডিপ্লয়** — এক বাক্য → ফোল্ডার → space → সময়সূচি → অ্যাক্সেস। প্রতিটি ধাপে enter চাপুন, কয়েক সেকেন্ডেই এজেন্ট ডিপ্লয় হয়ে চলতে শুরু করবে।
- **সাধারণ ভাষায় সময়সূচি** — ইংরেজি বা পর্তুগিজে: `every 10m`, `hourly`, `every morning at 8`, `daily at 7:30`, `at 5pm`, `now`, `a cada 15 minutos`, `todo dia às 8h`।
- **Your Day** — এজেন্ডা, টুডু, Agent Inbox এবং space অনুযায়ী সাজানো সব এজেন্ট, তাদের সর্বশেষ ফলাফল ও পরের রানসহ।
- **Agent Calendar** — দিনের প্রতিটি রান ক্রমানুসারে, space অনুযায়ী রঙ করা, কয়েক মিনিট থেকে পুরো দিন পর্যন্ত জুম করা যায়, আর এই মুহূর্তে চলা রানটি ফ্রেম দিয়ে চিহ্নিত।
- **তত্ত্বাবধানহীন ও নিরাপদ** — রান কখনো প্রশ্ন করতে থামে না: অনুমতির অনুরোধ দেখাবে এমন সবকিছু প্রত্যাখ্যাত হয়। প্রতিটি এজেন্টের একটি অ্যাক্সেস স্তর আছে: `read + network`, `read + write + network` অথবা `full`।
- **আসল ট্রান্সক্রিপ্ট** — প্রতিটি রান একটি আসল opencode সেশন যা আপনি খুলতে পারেন, এতে টুল কল, টোকেন ও খরচ থাকে।
- **রিপোর্ট করা এজেন্ট** — cowork টুল `inbox`, `user_todo`, `agenda`, `memory` ও `deploy` দিয়ে এজেন্টরা আপনার ইনবক্সে পোস্ট করতে, টুডু যোগ করতে, এজেন্ডা পড়তে এবং আপনার সম্পর্কে তথ্য মনে রাখতে পারে। একটি চ্যাট থেকেও নতুন এজেন্ট ডিপ্লয় করা যায়।
- **Spaces** — একটি লক্ষ্য, ইভেন্ট বা ক্লায়েন্ট ঘিরে এজেন্টদের দলবদ্ধ করুন।
- **space-এর মধ্যে এজেন্ট সরান** — এজেন্টের পেজে `m` চাপুন, Spaces পেজে **+ Move an agent here...** ব্যবহার করুন, অথবা চ্যাটে বলুন।
- **মেমরি** — আপনার সম্পর্কে তথ্য যা প্রতিটি চ্যাট ও প্রতিটি এজেন্ট পায়।
- **টোকেন পরিসংখ্যান** — লোকাল ও ক্লাউড টোকেন আলাদাভাবে গোনা, খরচের হার, দৈনিক পূর্বাভাস এবং লোকাল মডেলে কত সাশ্রয় হলো।
- **কীবোর্ড ও মাউস** — পেজের জন্য `alt+1` … `alt+8` এবং সব কমান্ডের জন্য `ctrl+p`; নেভিগেশন, বোতাম, সারি, চেকবক্স ও কী-সংকেতে ক্লিক করুন; চাকা দিয়ে তালিকা ও ক্যালেন্ডার স্ক্রল করুন।
- **শুরু থেকে শেষ ASCII** — লোগো, গেজ ও ডোনাট চার্ট টার্মিনালের ব্লক অক্ষরে আঁকা।

### স্ক্রিনশট

<table>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/03-agents.png" alt="Agents"><br><b>Agents</b> — টোকেন গেজ, খরচের হার, সাশ্রয় এবং লাইভ Agent Calendar</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/04-agents-whole-day.png" alt="Agent Calendar, পুরো দিন"><br>পুরো দিনে জুম আউট করা <b>Agent Calendar</b></td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/05-agent-detail.png" alt="এজেন্ট"><br><b>এজেন্ট</b> — শেষ রানের টুল কল ও ফলাফল</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/06-agent-running.png" alt="চলমান এজেন্ট"><br>এই মুহূর্তে <b>চলছে</b> এমন একটি এজেন্ট</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/14-deploy.png" alt="এজেন্ট ডিপ্লয়"><br>এক বাক্যে একটি এজেন্ট <b>ডিপ্লয়</b> করুন</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/15-deploy-folder.png" alt="ডিপ্লয়: ফোল্ডার বাছাই"><br>…তারপর সে যে <b>ফোল্ডারে</b> কাজ করবে তা বাছুন</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/07-spaces.png" alt="Spaces"><br><b>Spaces</b> — একটি লক্ষ্য ঘিরে দলবদ্ধ এজেন্ট</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/08-chat.png" alt="চ্যাট"><br>শেলের ভেতরে <code>work</code> এজেন্টের সঙ্গে <b>চ্যাট</b></td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/10-skills.png" alt="Skills"><br><b>Skills</b> — পুনরায় ব্যবহারযোগ্য নির্দেশনা</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/11-memory.png" alt="মেমরি"><br><b>Memory</b> — প্রতিটি চ্যাট ও এজেন্ট আপনার সম্পর্কে যা জানে</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/12-models.png" alt="মডেল"><br><b>Models</b> — লোকাল ও ক্লাউড</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/13-integrations.png" alt="ইন্টিগ্রেশন"><br><b>Integrations</b> — MCP সার্ভার ও অ্যাকাউন্ট</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/02-your-day-focus.png" alt="এজেন্ট কলাম ছাড়া Your Day"><br>এজেন্ট কলাম লুকানো <b>Your Day</b></td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/16-command-palette.png" alt="কমান্ড"><br>প্যালেটে সব <b>কমান্ড</b> (<code>ctrl+p</code>)</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/17-new-chat.png" alt="নতুন চ্যাট"><br><b>New chat</b></td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/18-nav-collapsed.png" alt="গুটানো নেভিগেশন"><br>গুটানো <b>নেভিগেশন</b> (<code>ctrl+x w</code>)</td>
  </tr>
</table>

---

### শুরু করা

#### ইনস্টল

```bash
# macOS ও Linux
curl -fsSL https://github.com/dedeprogames-official/openwork/releases/latest/download/install | bash
```

```powershell
# Windows (PowerShell)
irm https://github.com/dedeprogames-official/openwork/releases/latest/download/install.ps1 | iex
```

```bash
# Node.js 18+ থাকা যেকোনো OS: npx একবার চালায়, npm install -g দিলে openwork কমান্ড থেকে যায়
npx https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-cli.tgz
npm install -g https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-cli.tgz
```

তারপর একটি ফোল্ডার খুলে `openwork` চালান। `openwork upgrade` সর্বশেষ রিলিজে আপডেট করে, আর `openwork uninstall` সরিয়ে দেয়।

#### ডাউনলোড

| প্ল্যাটফর্ম              | ডাউনলোড                                                                                                                                       |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Linux x64                | [`openwork-linux-x64.tar.gz`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-linux-x64.tar.gz)           |
| Linux arm64              | [`openwork-linux-arm64.tar.gz`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-linux-arm64.tar.gz)       |
| Linux x64 (musl, Alpine) | [`openwork-linux-x64-musl.tar.gz`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-linux-x64-musl.tar.gz) |
| macOS Apple Silicon      | [`openwork-darwin-arm64.zip`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-darwin-arm64.zip)           |
| macOS Intel              | [`openwork-darwin-x64.zip`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-darwin-x64.zip)               |
| Windows x64              | [`openwork-windows-x64.zip`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-windows-x64.zip)             |
| Windows arm64            | [`openwork-windows-arm64.zip`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-windows-arm64.zip)         |

সব ভার্সন আছে [রিলিজ পেজে](https://github.com/dedeprogames-official/openwork/releases)। প্রতিটি আর্কাইভে `openwork` বাইনারি থাকে; `-baseline` বিল্ড AVX2 ছাড়া x64 CPU-র জন্য আর `-musl` বিল্ড Alpine-এর জন্য, এবং ইনস্টলার নিজেই ঠিকটি বেছে নেয়। macOS বাইনারিগুলো ad hoc সাইন করা, notarize করা নয়: ব্রাউজারে zip ডাউনলোড করলে একবার `xattr -d com.apple.quarantine openwork` চালান।

#### Windows

PowerShell ইনস্টলার `openwork.exe`-কে `%USERPROFILE%\.openwork\bin`-এ রাখে এবং আপনার PATH-এ যোগ করে: একটি নতুন টার্মিনাল খুলে `openwork` চালান। Windows Terminal-এ সবচেয়ে ভালো চলে (truecolor ও মাউস)। চাইলে `openwork-windows-x64.zip` যেকোনো জায়গায় আনজিপ করে `openwork.exe` চালাতে পারেন, অথবা ওপরের মতো `npx` ব্যবহার করতে পারেন।

#### সোর্স থেকে চালানো

**প্রয়োজনীয়তা:** [Bun](https://bun.sh) 1.3 বা নতুনতর, git এবং truecolor ও মাউস সমর্থিত একটি টার্মিনাল (xfce4-terminal, GNOME Terminal, Konsole, kitty, WezTerm, Ghostty, iTerm2, Windows Terminal…)। মডেলের জন্য: opencode সমর্থিত যেকোনো প্রোভাইডার, অথবা Ollama, LM Studio, llama.cpp বা vLLM দিয়ে চালানো একটি লোকাল মডেল।

```bash
git clone https://github.com/dedeprogames-official/openwork.git
cd openwork
bun install
bun dev ~/work        # যে ফোল্ডারে OpenWork খুলবে
```

`bun dev .` বর্তমান ফোল্ডার খোলে; শুধু `bun dev` খোলে `packages/opencode`।

#### একটি স্বতন্ত্র বাইনারি তৈরি

```bash
./packages/opencode/script/build.ts --single
./packages/opencode/dist/opencode-linux-x64/bin/opencode    # অথবা opencode-darwin-arm64, …
```

প্যাকেজটি একই বাইনারি `opencode` ও `openwork` দুই নামেই ইনস্টল করে।

#### আপনার প্রথম পাঁচ মিনিট

1. **একটি মডেল যুক্ত করুন** — `/connect`, অথবা **Models** (`alt+7`) খুলে `c` চাপুন। লোকাল মডেলের জন্য দেখুন [লোকাল মডেল](#local-models)।
2. **ডেমো লোড করুন** — `/demo` তৈরি করে 6টি space, 17টি এজেন্ট, এক দিনের রান ইতিহাস, skills, ইনবক্স বার্তা, টুডু ও একটি এজেন্ডা। টোকেন যাতে খরচ না হয় তাই এজেন্টরা থামানো অবস্থায় শুরু হয়; `/pause` তাদের চলতে দেয়।
3. **নিজের এজেন্ট ডিপ্লয় করুন** — `ctrl+x d`, অথবা লিখুন `/deploy check the weather in Lisbon every morning at 7 and tell me if I need an umbrella` (সময়সূচি ইংরেজি বা পর্তুগিজে; কাজটি যেকোনো ভাষায়)।
4. **Your Day পড়ুন** — `alt+1`। ফলাফল আসে Agent Inbox-এ; একটি এজেন্ট খুলে তার রানগুলো দেখুন বা তার কাজ নিয়ে চ্যাট করুন।

### এজেন্ট ডিপ্লয় করা

একটি এজেন্ট মানে একটি কাজ, কাজ করার একটি ফোল্ডার, একটি সময়সূচি ও একটি অ্যাক্সেস স্তর, চাইলে একটি skill-ও। ডিপ্লয়ের সময় যে মডেল বাছাই করা ছিল তাতেই এটি চলে। ডিপ্লয় করুন `ctrl+x d`, `/deploy <কী এবং কখন>`, Agents পেজের **+ Create Agent** বোতাম, একটি space থেকে, অথবা চ্যাটে অনুরোধ করে।

| আপনি লেখেন                                                              | সময়সূচি                                                   |
| ----------------------------------------------------------------------- | ---------------------------------------------------------- |
| `every 10m`, `every 2 hours`, `a cada 15 minutos`                       | প্রতি N মিনিট, ঘণ্টা বা দিন পরপর (কমপক্ষে 1 মিনিট)         |
| `hourly`, `every hour`, `every minute`                                  | প্রতি ঘণ্টায় বা প্রতি মিনিটে                              |
| `daily at 9am`, `every morning at 8`, `every evening`, `todo dia às 8h` | প্রতিদিন সেই সময়ে (সকাল 08:00, সন্ধ্যা 18:00, নইলে 09:00) |
| `at 5pm`, `às 17h`                                                      | একবার, পরের 17:00-এ                                        |
| `now`, `once` — অথবা কোনো সময়সূচক শব্দ ছাড়াই                          | একবার, সঙ্গে সঙ্গে                                         |

সময়সূচির ধাপে **on demand**-ও আছে: আপনি **Run now** চাপলেই কেবল এজেন্ট চলে।

| অ্যাক্সেস                | এজেন্ট যা করতে পারে                                  |
| ------------------------ | ---------------------------------------------------- |
| `read + network`         | ফাইল পড়া, ওয়েব ব্রাউজ করা, আপনার ইনবক্সে পোস্ট করা |
| `read + write + network` | এছাড়া নিজের ফোল্ডারে ফাইল তৈরি ও সম্পাদনা           |
| `full`                   | আপনার অনুমোদিত সব টুল ব্যবহার, শেল কমান্ডসহ          |

রানগুলো তত্ত্বাবধানহীন: প্রশ্ন এবং অনুমতির অনুরোধ দেখাবে এমন সবকিছু প্রত্যাখ্যাত হয়, আর একটি রান 15 মিনিট পরে থেমে যায়। প্রতিটি রান `<এজেন্ট> · run #N` নামের একটি সেশন; ট্রান্সক্রিপ্ট খুলতে এজেন্টের পেজে `o` চাপুন।

### পেজ

| পেজ          | কী      | দেখায়                                                                                                      |
| ------------ | ------- | ----------------------------------------------------------------------------------------------------------- |
| Your Day     | `alt+1` | এজেন্ডা, টুডু, Agent Inbox, একটি চ্যাট প্রম্পট এবং space অনুযায়ী সাজানো সব এজেন্ট, তাদের শেষ ও পরের রানসহ। |
| Chats        | `alt+2` | আপনার চ্যাট; এজেন্টের রান তালিকার বাইরে থাকে।                                                               |
| Spaces       | `alt+3` | Spaces, তাদের এজেন্ট ও এজেন্ডা আইটেমসহ।                                                                     |
| Agents       | `alt+4` | টোকেন গেজ, খরচের হার, সাশ্রয়, টোকেন কোথায় যায় এবং Agent Calendar।                                        |
| Agent        | `enter` | একটি এজেন্ট: কাজ, সময়সূচি, অ্যাক্সেস, প্রতিটি রানের টুল কল ও ফলাফল, ইতিহাস এবং তার নিজের চ্যাট।            |
| Skills       | `alt+5` | `.opencode/skills` ও `~/.agents/skills` থেকে skills।                                                        |
| Memory       | `alt+6` | চ্যাট ও এজেন্টরা আপনার সম্পর্কে যা জানে।                                                                    |
| Models       | `alt+7` | লোকাল ও ক্লাউড মডেল; লোকাল টোকেন Usage কার্ডে আলাদাভাবে গোনা হয়।                                           |
| Integrations | `alt+8` | MCP সার্ভার ও সংযুক্ত অ্যাকাউন্ট।                                                                           |

### কীবোর্ড ও মাউস

| কী                | কাজ                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------ |
| `alt+1` … `alt+8` | পেজ বদলানো                                                                           |
| `ctrl+x d`        | একটি এজেন্ট ডিপ্লয়                                                                  |
| `ctrl+x w`        | নেভিগেশন গুটানো বা খোলা                                                              |
| `m`               | এজেন্টকে অন্য space-এ সরানো (তার পেজে) বা নির্বাচিত space-এ একটি এজেন্ট আনা (Spaces) |
| `ctrl+p`          | কমান্ড প্যালেট                                                                       |
| `c`               | চ্যাট প্রম্পটে ফোকাস (`esc` দিয়ে বের হন)                                            |
| `esc`             | পেছনে                                                                                |

প্রতিটি পেজ নিচে নিজের কী দেখায়। স্ল্যাশ কমান্ড: `/day`, `/chats`, `/spaces`, `/agents`, `/skills`, `/memory`, `/models`, `/integrations`, `/deploy <টেক্সট>`, `/pause`, `/demo`, `/connect`।

সবকিছু মাউস দিয়েও চলে: নেভিগেশন, বোতাম ও কী-সংকেতে ক্লিক করুন; তালিকায় প্রথম ক্লিক একটি সারি বাছে, দ্বিতীয় ক্লিক সেটি খোলে; চেকবক্স সঙ্গে সঙ্গে বদলায়; চাকা তালিকা ও Agent Calendar স্ক্রল করে। টেনে নিলে আগের মতোই টেক্সট নির্বাচন ও কপি হয়।

<a id="local-models"></a>

### লোকাল মডেল

`localhost`-এ চলা যেকোনো OpenAI-সামঞ্জস্যপূর্ণ সার্ভার লোকাল হিসেবে গণ্য হয়, `ollama`, `lmstudio`, `llamacpp` ও `vllm` প্রোভাইডারও তাই। যেমন Ollama দিয়ে, `opencode.json`-এ (আপনার ফোল্ডারে বা `~/.config/openwork/`-এ):

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

### কীভাবে কাজ করে

- শিডিউলার OpenWork সার্ভার প্রসেসের ভেতরে থাকে। প্রতি 5 সেকেন্ডে এটি চালানোর সময় হওয়া এজেন্ট খোঁজে এবং একসঙ্গে সর্বোচ্চ 3টি চালায়। দাবি করা SQLite-এ অ্যাটমিক, তাই একাধিক OpenWork উইন্ডো কখনো একই এজেন্ট দুবার চালায় না, আর ক্র্যাশের পর পড়ে থাকা রান বাধাপ্রাপ্ত হিসেবে চিহ্নিত হয়। `OPENCODE_DISABLE_WORK_SCHEDULER=1` এটি বন্ধ করে।
- প্রতিটি রান `work` এজেন্টসহ একটি opencode সেশন — জ্ঞানভিত্তিক কাজের একটি পারসোনা, যার কাছে ফোল্ডার মানে কর্মক্ষেত্র আর ফাইল মানে ডেলিভারেবল — সিস্টেম কনটেক্সটে আপনার মেমরি ও এজেন্টের সাম্প্রতিক ফলাফলসহ, এবং তার অ্যাক্সেস স্তর অনুযায়ী তত্ত্বাবধানহীন অনুমতিসহ।
- OpenWork opencode-এর কনফিগারেশন রেখে দেয়: `opencode.json`, `.opencode/`, `OPENCODE_*` ভেরিয়েবল, প্রোভাইডার, MCP সার্ভার ও skills আগের মতোই কাজ করে।
- OpenWork নিজের ডেটা রাখে `~/.local/share/openwork`-এ আর গ্লোবাল কনফিগ `~/.config/openwork`-এ, যেকোনো opencode ইনস্টল থেকে আলাদা, এবং শুধু নিজের GitHub রিলিজ থেকেই আপডেট হয়।

| কোথায়                                                  | কী                                                      |
| ------------------------------------------------------- | ------------------------------------------------------- |
| `packages/schema/src/work.ts`                           | রেকর্ড, ইনপুট ও `work.updated` ইভেন্ট                   |
| `packages/core/src/work.ts`, `packages/core/src/work/`  | SQLite টেবিল, `Work` স্টোর ও সময়সূচি পার্সিং           |
| `packages/opencode/src/work/`                           | শিডিউলার, তত্ত্বাবধানহীন অনুমতি, রান কনটেক্সট, ডেমো     |
| `packages/opencode/src/tool/`                           | `inbox`, `user_todo`, `agenda`, `memory` ও `deploy` টুল |
| `packages/opencode/src/server/routes/instance/httpapi/` | `/work/*` HTTP API                                      |
| `packages/tui/src/work/`                                | শেল, নেভিগেশন, পেজ ও ডিপ্লয় ডায়ালগ                    |

পূর্ণ নির্দেশিকা আছে [docs/openwork](docs/openwork/README.md)-এ।

### ডেভেলপমেন্ট

```bash
bun install
bun dev ~/work

# চেক চালান প্যাকেজ ডিরেক্টরি থেকে, কখনো রিপোর রুট থেকে নয়
(cd packages/tui && bun typecheck && bun test)
(cd packages/opencode && bun typecheck && bun test test/work)
```

স্ক্রিনশটগুলো আসল TUI থেকে অফলাইন মডেল দিয়ে আবার তৈরি হয়। `--window linux` দিলে প্রতিটি একটি আসল X11 উইন্ডোর ছবি হয় (Xvfb, xfwm4 উইন্ডো ম্যানেজার ও xfce4-terminal):

```bash
sudo apt-get install tmux python3-pil xvfb dbus-x11 xfwm4 xfce4-terminal greybird-gtk-theme xdotool imagemagick fonts-dejavu-core
cd packages/opencode
TZ=Europe/London bun script/openwork/screenshots.ts --window linux --out ../../docs/openwork/screenshots
```

এমন একটি `TZ` বাছুন যেখানে এখন বিকেলের শেষভাগ: ডেমোর রান ইতিহাস স্থানীয় সময় 06:00-এ শুরু হয়।

### কৃতজ্ঞতা ও লাইসেন্স

OpenWork [opencode](https://github.com/anomalyco/opencode)-এর ওপর তৈরি এবং এর [MIT লাইসেন্স](LICENSE) বজায় রাখে। এটি opencode দল তৈরি করেনি এবং তাদের সঙ্গে যুক্তও নয়। অবদান স্বাগত — দেখুন [CONTRIBUTING.md](CONTRIBUTING.md)।
