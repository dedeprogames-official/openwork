<p align="center">
  <picture>
    <source srcset="docs/openwork/logo-dark.svg" media="(prefers-color-scheme: dark)">
    <source srcset="docs/openwork/logo-light.svg" media="(prefers-color-scheme: light)">
    <img src="docs/openwork/logo-light.svg" alt="OpenWork-logo" width="480">
  </picture>
</p>
<p align="center"><strong>Udrul agenter i dine mapper. De arbejder efter en tidsplan. Du læser resultaterne i Your Day.</strong></p>
<p align="center">En arbejdstilstand til terminalen, bygget på opencode-harnessen.</p>
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

[![OpenWork — Your Day i et terminalvindue på Linux](docs/openwork/screenshots/01-your-day.png)](docs/openwork/README.md)

<p align="center"><sub>Alle skærmbilleder her er den rigtige OpenWork-TUI i xfce4-terminal på Linux (Xfce, Greybird-tema), med demo-arbejdsområdet og en offline-model.</sub></p>

---

### Hvad er OpenWork?

OpenWork gør opencodes terminalbrugerflade til et sted, hvor man får arbejde fra hånden — ikke kun kode. Beskriv en opgave i én sætning, fx _“check the Half Moon Bay cam every 10m and tell me if it's sunny”_, og OpenWork udruller en agent i en lokal mappe efter eget valg. Agenten kører efter sin tidsplan i baggrunden, uden opsyn, og alt hvad den finder, lander ét sted: **Your Day**, ved siden af din kalender, dine todos og **Agent Inbox**.

Det er stadig en terminal-app og kører stadig på opencode-harnessen: de samme sessioner, værktøjer, tilladelser, udbydere, lokale modeller, skills og MCP-servere. Agenter, kørsler, indbakke, todos, kalender og hukommelse gemmes lokalt i SQLite.

### Højdepunkter

- **Øjeblikkelig udrulning** — én sætning → mappe → space → tidsplan → adgang. Tryk enter ved hvert trin, og agenten er udrullet og kører på få sekunder.
- **Tidsplaner i almindelige ord** — på engelsk eller portugisisk: `every 10m`, `hourly`, `every morning at 8`, `daily at 7:30`, `at 5pm`, `now`, `a cada 15 minutos`, `todo dia às 8h`.
- **Your Day** — kalender, todos, Agent Inbox og alle agenter grupperet efter space, med seneste resultat og næste kørsel.
- **Agent Calendar** — alle dagens kørsler i rækkefølge, farvet efter space, med zoom fra få minutter til hele dagen og den kørsel, der arbejder lige nu, markeret med en ramme.
- **Uden opsyn og sikkert** — kørsler stopper aldrig for at spørge: alt, der ville vise en tilladelsesanmodning, afvises. Hver agent har et adgangsniveau: `read + network`, `read + write + network` eller `full`.
- **Rigtige transskriptioner** — hver kørsel er en rigtig opencode-session, du kan åbne, med værktøjskald, tokens og pris.
- **Agenter, der melder tilbage** — cowork-værktøjerne `inbox`, `user_todo`, `agenda`, `memory` og `deploy` lader agenter skrive i din indbakke, tilføje todos, læse din kalender og huske fakta om dig. En chat kan udrulle nye agenter.
- **Spaces** — saml agenter om et mål, en begivenhed eller en kunde.
- **Hukommelse** — fakta om dig, som hver chat og hver agent får med.
- **Token-statistik** — lokale og cloud-tokens talt hver for sig, forbrugshastighed, en dagsprognose og hvad lokale modeller sparer dig.
- **Tastatur og mus** — `alt+1` … `alt+8` til siderne og `ctrl+p` til alle kommandoer; klik på navigation, knapper, rækker, afkrydsningsfelter og tastetips; rul i lister og kalenderen med hjulet.
- **ASCII hele vejen** — logoet, målerne og ringdiagrammerne er tegnet med terminalens blokketegn.

### Skærmbilleder

<table>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/03-agents.png" alt="Agents"><br><b>Agents</b> — token-måler, forbrugshastighed, besparelse og den levende Agent Calendar</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/04-agents-whole-day.png" alt="Agent Calendar, hele dagen"><br><b>Agent Calendar</b> zoomet ud til hele dagen</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/05-agent-detail.png" alt="Agent"><br><b>Agent</b> — værktøjskald og resultat fra seneste kørsel</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/06-agent-running.png" alt="Agent i gang"><br>En agent, der <b>kører</b> lige nu</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/14-deploy.png" alt="Udrul en agent"><br><b>Udrul</b> en agent med én sætning</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/15-deploy-folder.png" alt="Udrulning: vælg mappe"><br>…og vælg så den <b>mappe</b>, den arbejder i</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/07-spaces.png" alt="Spaces"><br><b>Spaces</b> — agenter samlet om et mål</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/08-chat.png" alt="Chat"><br>En <b>chat</b> med agenten <code>work</code>, inde i skallen</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/10-skills.png" alt="Skills"><br><b>Skills</b> — genbrugelige instruktioner</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/11-memory.png" alt="Hukommelse"><br><b>Memory</b> — hvad hver chat og agent ved om dig</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/12-models.png" alt="Modeller"><br><b>Models</b> — lokale og i skyen</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/13-integrations.png" alt="Integrationer"><br><b>Integrations</b> — MCP-servere og konti</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/02-your-day-focus.png" alt="Your Day uden agentkolonnen"><br><b>Your Day</b> med agentkolonnen skjult</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/16-command-palette.png" alt="Kommandoer"><br>Alle <b>kommandoer</b> i paletten (<code>ctrl+p</code>)</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/17-new-chat.png" alt="Ny chat"><br><b>New chat</b></td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/18-nav-collapsed.png" alt="Sammenklappet navigation"><br>Sammenklappet <b>navigation</b> (<code>ctrl+x w</code>)</td>
  </tr>
</table>

---

### Kom i gang

**Krav:** [Bun](https://bun.sh) 1.3 eller nyere, git og en terminal med truecolor og musestøtte (xfce4-terminal, GNOME Terminal, Konsole, kitty, WezTerm, Ghostty, iTerm2, Windows Terminal…). Til modeller: enhver udbyder, opencode understøtter, eller en lokal model via Ollama, LM Studio, llama.cpp eller vLLM.

#### Kør fra kildekoden

```bash
git clone https://github.com/dedeprogames-official/openwork.git
cd openwork
bun install
bun dev ~/work        # mappen OpenWork åbner i
```

`bun dev .` åbner den aktuelle mappe; `bun dev` alene åbner `packages/opencode`.

#### Byg en selvstændig binærfil

```bash
./packages/opencode/script/build.ts --single
./packages/opencode/dist/opencode-linux-x64/bin/opencode    # eller opencode-darwin-arm64, …
```

Pakken installerer den samme binærfil som både `opencode` og `openwork`.

#### Dine første fem minutter

1. **Forbind en model** — `/connect`, eller åbn **Models** (`alt+7`) og tryk `c`. Se [Lokale modeller](#local-models) for lokale modeller.
2. **Indlæs demoen** — `/demo` opretter 6 spaces, 17 agenter, en dags kørselshistorik, skills, beskeder i indbakken, todos og en kalender. Agenterne starter på pause, så intet bruger tokens; `/pause` lader dem køre.
3. **Udrul din egen** — `ctrl+x d`, eller skriv `/deploy check the weather in Lisbon every morning at 7 and tell me if I need an umbrella` (tidsplanen på engelsk eller portugisisk; opgaven på et hvilket som helst sprog).
4. **Læs Your Day** — `alt+1`. Resultaterne lander i Agent Inbox; åbn en agent for at se dens kørsler eller chatte om dens arbejde.

### Udrul agenter

En agent er en opgave, en mappe at arbejde i, en tidsplan og et adgangsniveau, og eventuelt en skill. Den kører på den model, der var valgt, da du udrullede den. Udrul med `ctrl+x d`, `/deploy <hvad og hvornår>`, knappen **+ Create Agent** på siden Agents, fra et space eller ved at spørge i en chat.

| Du skriver                                                              | Tidsplan                                                            |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `every 10m`, `every 2 hours`, `a cada 15 minutos`                       | hvert N. minut, time eller døgn (mindst 1 minut)                    |
| `hourly`, `every hour`, `every minute`                                  | hver time eller hvert minut                                         |
| `daily at 9am`, `every morning at 8`, `every evening`, `todo dia às 8h` | hver dag på det tidspunkt (morgen 08:00, aften 18:00, ellers 09:00) |
| `at 5pm`, `às 17h`                                                      | én gang, næste gang klokken er 17:00                                |
| `now`, `once` — eller ingen tidsord overhovedet                         | én gang, med det samme                                              |

Tidsplantrinnet tilbyder også **on demand**: agenten kører kun, når du trykker **Run now**.

| Adgang                   | Agenten må                                               |
| ------------------------ | -------------------------------------------------------- |
| `read + network`         | læse filer, søge på nettet, skrive i din indbakke        |
| `read + write + network` | også oprette og redigere filer i sin mappe               |
| `full`                   | bruge alle værktøjer, du tillader, også shell-kommandoer |

Kørsler er uden opsyn: spørgsmål og alt, der ville vise en tilladelsesanmodning, afvises, og en kørsel stopper efter 15 minutter. Hver kørsel er en session ved navn `<agent> · run #N`; tryk `o` på agentens side for at åbne dens transskription.

### Sider

| Side         | Tast    | Viser                                                                                                           |
| ------------ | ------- | --------------------------------------------------------------------------------------------------------------- |
| Your Day     | `alt+1` | Kalender, todos, Agent Inbox, en chat-prompt og alle agenter grupperet efter space med seneste og næste kørsel. |
| Chats        | `alt+2` | Dine chats; agentkørsler holdes ude af listen.                                                                  |
| Spaces       | `alt+3` | Spaces med deres agenter og kalenderpunkter.                                                                    |
| Agents       | `alt+4` | Token-måler, forbrugshastighed, besparelse, hvor tokens går hen, og Agent Calendar.                             |
| Agent        | `enter` | Én agent: opgave, tidsplan, adgang, værktøjskald og resultat for hver kørsel, historik og dens egen chat.       |
| Skills       | `alt+5` | Skills fra `.opencode/skills` og `~/.agents/skills`.                                                            |
| Memory       | `alt+6` | Hvad chats og agenter ved om dig.                                                                               |
| Models       | `alt+7` | Lokale og cloud-modeller; lokale tokens tælles for sig i Usage-kortet.                                          |
| Integrations | `alt+8` | MCP-servere og forbundne konti.                                                                                 |

### Tastatur og mus

| Taster            | Handling                                   |
| ----------------- | ------------------------------------------ |
| `alt+1` … `alt+8` | skift side                                 |
| `ctrl+x d`        | udrul en agent                             |
| `ctrl+x w`        | klap navigationen sammen eller ud          |
| `ctrl+p`          | kommandopalet                              |
| `c`               | fokusér chat-prompten (`esc` forlader den) |
| `esc`             | tilbage                                    |

Hver side viser sine egne taster nederst. Slash-kommandoer: `/day`, `/chats`, `/spaces`, `/agents`, `/skills`, `/memory`, `/models`, `/integrations`, `/deploy <tekst>`, `/pause`, `/demo`, `/connect`.

Alt virker også med musen: klik på navigationen, knapperne og tastetipsene; i lister vælger første klik en række, og andet klik åbner den; afkrydsningsfelter skifter med det samme; hjulet ruller lister og Agent Calendar. Træk markerer og kopierer stadig tekst.

<a id="local-models"></a>

### Lokale modeller

Enhver OpenAI-kompatibel server på `localhost` tæller som lokal, ligesom udbyderne `ollama`, `lmstudio`, `llamacpp` og `vllm`. For eksempel med Ollama, i `opencode.json` (i din mappe eller i `~/.config/opencode/`):

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

### Sådan virker det

- Planlæggeren bor i OpenWork-serverprocessen. Den leder efter agenter, der skal køre, hvert 5. sekund og kører op til 3 ad gangen. Reservationer er atomare i SQLite, så flere OpenWork-vinduer aldrig kører den samme agent to gange, og kørsler efterladt af et nedbrud markeres som afbrudte. `OPENCODE_DISABLE_WORK_SCHEDULER=1` slår den fra.
- Hver kørsel er en opencode-session med agenten `work` — en vidensarbejder-persona, hvor mapper er arbejdsområder og filer er leverancer — med din hukommelse og agentens seneste resultater i systemkonteksten og tilladelser uden opsyn til dens adgangsniveau.
- OpenWork beholder opencode-konfigurationen: `opencode.json`, `.opencode/`, `OPENCODE_*`-variabler, udbydere, MCP-servere og skills virker som før.

| Hvor                                                    | Hvad                                                             |
| ------------------------------------------------------- | ---------------------------------------------------------------- |
| `packages/schema/src/work.ts`                           | poster, input og hændelsen `work.updated`                        |
| `packages/core/src/work.ts`, `packages/core/src/work/`  | SQLite-tabeller, `Work`-lageret og fortolkning af tidsplaner     |
| `packages/opencode/src/work/`                           | planlægger, tilladelser uden opsyn, kørselskontekst, demo        |
| `packages/opencode/src/tool/`                           | værktøjerne `inbox`, `user_todo`, `agenda`, `memory` og `deploy` |
| `packages/opencode/src/server/routes/instance/httpapi/` | HTTP-API'et `/work/*`                                            |
| `packages/tui/src/work/`                                | skallen, navigationen, siderne og udrulningsdialogen             |

Den fulde guide ligger i [docs/openwork](docs/openwork/README.md).

### Udvikling

```bash
bun install
bun dev ~/work

# tjek køres fra en pakkemappe, aldrig fra roden af repoet
(cd packages/tui && bun typecheck && bun test)
(cd packages/opencode && bun typecheck && bun test test/work)
```

Skærmbillederne genereres fra den rigtige TUI med en offline-model. Med `--window linux` er hvert billede et foto af et rigtigt X11-vindue (Xvfb, vinduesmanageren xfwm4 og xfce4-terminal):

```bash
sudo apt-get install tmux python3-pil xvfb dbus-x11 xfwm4 xfce4-terminal greybird-gtk-theme xdotool imagemagick fonts-dejavu-core
cd packages/opencode
TZ=Europe/London bun script/openwork/screenshots.ts --window linux --out ../../docs/openwork/screenshots
```

Vælg en `TZ`, hvor det er sen eftermiddag: demoens kørselshistorik starter kl. 06:00 lokal tid.

### Tak og licens

OpenWork er bygget på [opencode](https://github.com/anomalyco/opencode) og beholder dets [MIT-licens](LICENSE). Det er ikke lavet af opencode-holdet og er ikke tilknyttet dem. Bidrag er velkomne — se [CONTRIBUTING.md](CONTRIBUTING.md).
