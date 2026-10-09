<p align="center">
  <picture>
    <source srcset="docs/openwork/logo-dark.svg" media="(prefers-color-scheme: dark)">
    <source srcset="docs/openwork/logo-light.svg" media="(prefers-color-scheme: light)">
    <img src="docs/openwork/logo-light.svg" alt="OpenWork-Logo" width="480">
  </picture>
</p>
<p align="center"><strong>Setze Agenten in deinen Ordnern ein. Sie arbeiten nach Zeitplan. Du liest die Ergebnisse in Your Day.</strong></p>
<p align="center">Ein Arbeitsmodus für das Terminal, gebaut auf dem opencode-Harness.</p>
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

[![OpenWork — Your Day in einem Terminalfenster unter Linux](docs/openwork/screenshots/01-your-day.png)](docs/openwork/README.md)

<p align="center"><sub>Alle Screenshots zeigen die echte OpenWork-TUI in xfce4-terminal unter Linux (Xfce, Greybird-Theme) mit dem Demo-Workspace und einem Offline-Modell.</sub></p>

---

### Was ist OpenWork?

OpenWork macht aus der Terminal-Oberfläche von opencode einen Ort zum Arbeiten — nicht nur zum Programmieren. Beschreibe eine Aufgabe in einem Satz, etwa _„check the Half Moon Bay cam every 10m and tell me if it's sunny“_, und OpenWork setzt einen Agenten in einem lokalen Ordner deiner Wahl ein. Der Agent läuft nach seinem Zeitplan im Hintergrund, unbeaufsichtigt, und alles, was er findet, landet an einem Ort: **Your Day**, neben deiner Agenda, deinen Todos und der **Agent Inbox**.

Es bleibt eine Terminal-App und läuft weiterhin auf dem opencode-Harness: dieselben Sitzungen, Werkzeuge, Berechtigungen, Anbieter, lokalen Modelle, Skills und MCP-Server. Agenten, Läufe, Inbox, Todos, Agenda und Gedächtnis werden lokal in SQLite gespeichert.

### Highlights

- **Sofortiger Einsatz** — ein Satz → Ordner → Space → Zeitplan → Zugriff. Drücke bei jedem Schritt Enter, und der Agent ist in Sekunden eingesetzt und läuft.
- **Zeitpläne in normaler Sprache** — auf Englisch oder Portugiesisch: `every 10m`, `hourly`, `every morning at 8`, `daily at 7:30`, `at 5pm`, `now`, `a cada 15 minutos`, `todo dia às 8h`.
- **Your Day** — Agenda, Todos, die Agent Inbox und alle Agenten nach Space gruppiert, mit letztem Ergebnis und nächstem Lauf.
- **Agent Calendar** — jeder Lauf des Tages der Reihe nach, nach Space eingefärbt, zoombar von wenigen Minuten bis zum ganzen Tag, der gerade laufende umrandet.
- **Unbeaufsichtigt und sicher** — Läufe halten nie an, um zu fragen: alles, was eine Berechtigungsabfrage zeigen würde, wird abgelehnt. Jeder Agent hat eine Zugriffsstufe: `read + network`, `read + write + network` oder `full`.
- **Echte Transkripte** — jeder Lauf ist eine echte opencode-Sitzung, die du öffnen kannst, mit Werkzeugaufrufen, Tokens und Kosten.
- **Agenten, die berichten** — die Cowork-Werkzeuge `inbox`, `user_todo`, `agenda`, `memory` und `deploy` lassen Agenten in deine Inbox posten, Todos anlegen, deine Agenda lesen und sich Fakten über dich merken. Ein Chat kann neue Agenten einsetzen.
- **Spaces** — gruppiere Agenten um ein Ziel, ein Ereignis oder einen Kunden.
- **Gedächtnis** — Fakten über dich, die jeder Chat und jeder Agent erhält.
- **Token-Statistiken** — lokale und Cloud-Tokens getrennt gezählt, Verbrauchsrate, Tagesprognose und was dir lokale Modelle sparen.
- **Tastatur und Maus** — `alt+1` … `alt+8` für die Seiten und `ctrl+p` für alle Befehle; klicke auf Navigation, Buttons, Zeilen, Checkboxen und Tastenhinweise; scrolle Listen und den Kalender mit dem Mausrad.
- **Durchgehend ASCII** — Logo, Anzeigen und Ringdiagramme sind mit Blockzeichen des Terminals gezeichnet.

### Screenshots

<table>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/03-agents.png" alt="Agents"><br><b>Agents</b> — Token-Anzeige, Verbrauchsrate, Ersparnis und der Live-Agent-Calendar</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/04-agents-whole-day.png" alt="Agent Calendar, ganzer Tag"><br><b>Agent Calendar</b> auf den ganzen Tag herausgezoomt</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/05-agent-detail.png" alt="Agent"><br><b>Agent</b> — Werkzeugaufrufe und Ergebnis des letzten Laufs</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/06-agent-running.png" alt="Laufender Agent"><br>Ein Agent, der gerade <b>läuft</b></td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/14-deploy.png" alt="Agent einsetzen"><br>Einen Agenten in einem Satz <b>einsetzen</b></td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/15-deploy-folder.png" alt="Einsetzen: Ordner wählen"><br>…dann den <b>Ordner</b> wählen, in dem er arbeitet</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/07-spaces.png" alt="Spaces"><br><b>Spaces</b> — Agenten um ein Ziel gruppiert</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/08-chat.png" alt="Chat"><br>Ein <b>Chat</b> mit dem Agenten <code>work</code>, in der Shell</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/10-skills.png" alt="Skills"><br><b>Skills</b> — wiederverwendbare Anweisungen</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/11-memory.png" alt="Gedächtnis"><br><b>Memory</b> — was jeder Chat und Agent über dich weiß</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/12-models.png" alt="Modelle"><br><b>Models</b> — lokal und in der Cloud</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/13-integrations.png" alt="Integrationen"><br><b>Integrations</b> — MCP-Server und Konten</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/02-your-day-focus.png" alt="Your Day ohne Agentenspalte"><br><b>Your Day</b> mit ausgeblendeter Agentenspalte</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/16-command-palette.png" alt="Befehle"><br>Alle <b>Befehle</b> in der Palette (<code>ctrl+p</code>)</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/17-new-chat.png" alt="Neuer Chat"><br><b>New chat</b></td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/18-nav-collapsed.png" alt="Eingeklappte Navigation"><br>Eingeklappte <b>Navigation</b> (<code>ctrl+x w</code>)</td>
  </tr>
</table>

---

### Erste Schritte

**Voraussetzungen:** [Bun](https://bun.sh) 1.3 oder neuer, git und ein Terminal mit Truecolor und Mausunterstützung (xfce4-terminal, GNOME Terminal, Konsole, kitty, WezTerm, Ghostty, iTerm2, Windows Terminal…). Für Modelle: jeder Anbieter, den opencode unterstützt, oder ein lokales Modell über Ollama, LM Studio, llama.cpp oder vLLM.

#### Aus dem Quellcode starten

```bash
git clone https://github.com/dedeprogames-official/openwork.git
cd openwork
bun install
bun dev ~/work        # der Ordner, in dem OpenWork startet
```

`bun dev .` öffnet den aktuellen Ordner; `bun dev` allein öffnet `packages/opencode`.

#### Eine eigenständige Binärdatei bauen

```bash
./packages/opencode/script/build.ts --single
./packages/opencode/dist/opencode-linux-x64/bin/opencode    # oder opencode-darwin-arm64, …
```

Das Paket installiert dieselbe Binärdatei als `opencode` und als `openwork`.

#### Deine ersten fünf Minuten

1. **Modell verbinden** — `/connect`, oder öffne **Models** (`alt+7`) und drücke `c`. Für lokale Modelle siehe [Lokale Modelle](#local-models).
2. **Demo laden** — `/demo` legt 6 Spaces, 17 Agenten, einen Tag Laufhistorie, Skills, Inbox-Nachrichten, Todos und eine Agenda an. Die Agenten starten pausiert, damit keine Tokens verbraucht werden; `/pause` lässt sie laufen.
3. **Eigenen Agenten einsetzen** — `ctrl+x d`, oder tippe `/deploy check the weather in Lisbon every morning at 7 and tell me if I need an umbrella` (den Zeitplan auf Englisch oder Portugiesisch, die Aufgabe in jeder Sprache).
4. **Your Day lesen** — `alt+1`. Ergebnisse landen in der Agent Inbox; öffne einen Agenten, um seine Läufe zu sehen oder über seine Arbeit zu chatten.

### Agenten einsetzen

Ein Agent besteht aus einer Aufgabe, einem Arbeitsordner, einem Zeitplan und einer Zugriffsstufe, optional mit einem Skill. Er läuft auf dem Modell, das beim Einsetzen ausgewählt war. Einsetzen kannst du mit `ctrl+x d`, `/deploy <was und wann>`, dem Button **+ Create Agent** auf der Seite Agents, aus einem Space heraus oder per Bitte im Chat.

| Du schreibst                                                            | Zeitplan                                                             |
| ----------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `every 10m`, `every 2 hours`, `a cada 15 minutos`                       | alle N Minuten, Stunden oder Tage (mindestens 1 Minute)              |
| `hourly`, `every hour`, `every minute`                                  | jede Stunde oder jede Minute                                         |
| `daily at 9am`, `every morning at 8`, `every evening`, `todo dia às 8h` | täglich zu dieser Uhrzeit (morgens 08:00, abends 18:00, sonst 09:00) |
| `at 5pm`, `às 17h`                                                      | einmal, um das nächste 17:00                                         |
| `now`, `once` — oder gar keine Zeitangabe                               | einmal, sofort                                                       |

Der Zeitplan-Schritt bietet auch **on demand**: Der Agent läuft nur, wenn du **Run now** drückst.

| Zugriff                  | Der Agent darf                                             |
| ------------------------ | ---------------------------------------------------------- |
| `read + network`         | Dateien lesen, im Web suchen, in deine Inbox posten        |
| `read + write + network` | außerdem Dateien in seinem Ordner anlegen und bearbeiten   |
| `full`                   | alle Werkzeuge nutzen, die du erlaubst, auch Shell-Befehle |

Läufe sind unbeaufsichtigt: Fragen und alles, was eine Berechtigungsabfrage zeigen würde, werden abgelehnt, und ein Lauf endet nach 15 Minuten. Jeder Lauf ist eine Sitzung namens `<Agent> · run #N`; drücke `o` auf der Seite des Agenten, um sein Transkript zu öffnen.

### Seiten

| Seite        | Taste   | Zeigt                                                                                                            |
| ------------ | ------- | ---------------------------------------------------------------------------------------------------------------- |
| Your Day     | `alt+1` | Agenda, Todos, Agent Inbox, ein Chat-Prompt und alle Agenten nach Space gruppiert mit letztem und nächstem Lauf. |
| Chats        | `alt+2` | Deine Chats; Agentenläufe bleiben außen vor.                                                                     |
| Spaces       | `alt+3` | Spaces mit ihren Agenten und Agenda-Einträgen.                                                                   |
| Agents       | `alt+4` | Token-Anzeige, Verbrauchsrate, Ersparnis, wohin die Tokens gehen, und der Agent Calendar.                        |
| Agent        | `enter` | Ein Agent: Aufgabe, Zeitplan, Zugriff, Werkzeugaufrufe und Ergebnis jedes Laufs, Historie und sein eigener Chat. |
| Skills       | `alt+5` | Skills aus `.opencode/skills` und `~/.agents/skills`.                                                            |
| Memory       | `alt+6` | Was Chats und Agenten über dich wissen.                                                                          |
| Models       | `alt+7` | Lokale und Cloud-Modelle; lokale Tokens werden in der Usage-Karte getrennt gezählt.                              |
| Integrations | `alt+8` | MCP-Server und verbundene Konten.                                                                                |

### Tastatur und Maus

| Tasten            | Aktion                                       |
| ----------------- | -------------------------------------------- |
| `alt+1` … `alt+8` | Seite wechseln                               |
| `ctrl+x d`        | einen Agenten einsetzen                      |
| `ctrl+x w`        | Navigation ein- oder ausklappen              |
| `ctrl+p`          | Befehlspalette                               |
| `c`               | Chat-Prompt fokussieren (`esc` verlässt ihn) |
| `esc`             | zurück                                       |

Jede Seite zeigt unten ihre eigenen Tasten. Slash-Befehle: `/day`, `/chats`, `/spaces`, `/agents`, `/skills`, `/memory`, `/models`, `/integrations`, `/deploy <Text>`, `/pause`, `/demo`, `/connect`.

Alles funktioniert auch mit der Maus: klicke auf Navigation, Buttons und Tastenhinweise; in Listen wählt der erste Klick eine Zeile aus und der zweite öffnet sie; Checkboxen schalten sofort um; das Mausrad scrollt Listen und den Agent Calendar. Ziehen markiert und kopiert weiterhin Text.

<a id="local-models"></a>

### Lokale Modelle

Jeder OpenAI-kompatible Server auf `localhost` gilt als lokal, ebenso die Anbieter `ollama`, `lmstudio`, `llamacpp` und `vllm`. Zum Beispiel mit Ollama, in `opencode.json` (in deinem Ordner oder in `~/.config/opencode/`):

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

### So funktioniert es

- Der Scheduler lebt im OpenWork-Serverprozess. Er sucht alle 5 Sekunden nach fälligen Agenten und führt bis zu 3 gleichzeitig aus. Die Reservierung ist in SQLite atomar, sodass mehrere OpenWork-Fenster nie denselben Agenten doppelt ausführen, und von einem Absturz hinterlassene Läufe werden als unterbrochen markiert. `OPENCODE_DISABLE_WORK_SCHEDULER=1` schaltet ihn ab.
- Jeder Lauf ist eine opencode-Sitzung mit dem Agenten `work` — einer Wissensarbeits-Persona, für die Ordner Arbeitsbereiche und Dateien Ergebnisse sind — mit deinem Gedächtnis und den letzten Ergebnissen des Agenten im Systemkontext und unbeaufsichtigten Berechtigungen für seine Zugriffsstufe.
- OpenWork behält die opencode-Konfiguration: `opencode.json`, `.opencode/`, `OPENCODE_*`-Variablen, Anbieter, MCP-Server und Skills funktionieren wie bisher.

| Wo                                                      | Was                                                                 |
| ------------------------------------------------------- | ------------------------------------------------------------------- |
| `packages/schema/src/work.ts`                           | Datensätze, Eingaben und das Ereignis `work.updated`                |
| `packages/core/src/work.ts`, `packages/core/src/work/`  | SQLite-Tabellen, der `Work`-Store und das Parsen von Zeitplänen     |
| `packages/opencode/src/work/`                           | Scheduler, unbeaufsichtigte Berechtigungen, Laufkontext, Demo       |
| `packages/opencode/src/tool/`                           | die Werkzeuge `inbox`, `user_todo`, `agenda`, `memory` und `deploy` |
| `packages/opencode/src/server/routes/instance/httpapi/` | die HTTP-API `/work/*`                                              |
| `packages/tui/src/work/`                                | Shell, Navigation, Seiten und Einsatzdialog                         |

Die vollständige Anleitung steht in [docs/openwork](docs/openwork/README.md).

### Entwicklung

```bash
bun install
bun dev ~/work

# Prüfungen laufen aus einem Paketverzeichnis, nie aus dem Repo-Stamm
(cd packages/tui && bun typecheck && bun test)
(cd packages/opencode && bun typecheck && bun test test/work)
```

Die Screenshots werden aus der echten TUI mit einem Offline-Modell erzeugt. Mit `--window linux` ist jeder ein Foto eines echten X11-Fensters (Xvfb, der Fenstermanager xfwm4 und xfce4-terminal):

```bash
sudo apt-get install tmux python3-pil xvfb dbus-x11 xfwm4 xfce4-terminal greybird-gtk-theme xdotool imagemagick fonts-dejavu-core
cd packages/opencode
TZ=Europe/London bun script/openwork/screenshots.ts --window linux --out ../../docs/openwork/screenshots
```

Wähle eine `TZ`, in der es später Nachmittag ist: Die Laufhistorie der Demo beginnt um 06:00 Ortszeit.

### Danksagung und Lizenz

OpenWork baut auf [opencode](https://github.com/anomalyco/opencode) auf und behält dessen [MIT-Lizenz](LICENSE). Es wird nicht vom opencode-Team entwickelt und ist nicht mit ihm verbunden. Beiträge sind willkommen — siehe [CONTRIBUTING.md](CONTRIBUTING.md).
