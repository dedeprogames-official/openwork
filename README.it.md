<p align="center">
  <picture>
    <source srcset="docs/openwork/logo-dark.svg" media="(prefers-color-scheme: dark)">
    <source srcset="docs/openwork/logo-light.svg" media="(prefers-color-scheme: light)">
    <img src="docs/openwork/logo-light.svg" alt="Logo di OpenWork" width="480">
  </picture>
</p>
<p align="center"><strong>Distribuisci agenti nelle tue cartelle. Lavorano secondo una pianificazione. Tu leggi i risultati in Your Day.</strong></p>
<p align="center">Una modalità di lavoro per il terminale, costruita sull'harness di opencode.</p>
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

[![OpenWork — Your Day in una finestra di terminale su Linux](docs/openwork/screenshots/01-your-day.png)](docs/openwork/README.md)

<p align="center"><sub>Tutte le schermate sono la vera TUI di OpenWork in xfce4-terminal su Linux (Xfce, tema Greybird), con lo spazio di lavoro demo e un modello offline.</sub></p>

---

### Che cos'è OpenWork?

OpenWork trasforma l'interfaccia da terminale di opencode in un posto dove lavorare, non solo programmare. Descrivi un compito in una frase, per esempio _“check the Half Moon Bay cam every 10m and tell me if it's sunny”_, e OpenWork distribuisce un agente nella cartella locale che scegli. L'agente gira secondo la sua pianificazione in background, senza supervisione, e tutto ciò che trova arriva in un unico posto: **Your Day**, accanto alla tua agenda, ai tuoi todo e alla **Agent Inbox**.

Resta un'app da terminale e continua a girare sull'harness di opencode: le stesse sessioni, strumenti, permessi, provider, modelli locali, skill e server MCP. Agenti, esecuzioni, inbox, todo, agenda e memoria sono salvati in locale in SQLite.

### In evidenza

- **Distribuzione istantanea** — una frase → cartella → space → pianificazione → accesso. Premi invio a ogni passo e l'agente è distribuito e in esecuzione in pochi secondi.
- **Pianificazioni in linguaggio naturale** — in inglese o portoghese: `every 10m`, `hourly`, `every morning at 8`, `daily at 7:30`, `at 5pm`, `now`, `a cada 15 minutos`, `todo dia às 8h`.
- **Your Day** — agenda, todo, la Agent Inbox e tutti gli agenti raggruppati per space, con l'ultimo risultato e la prossima esecuzione.
- **Agent Calendar** — ogni esecuzione della giornata in ordine, colorata per space, con zoom da pochi minuti all'intera giornata, e l'esecuzione attiva in questo momento evidenziata da un contorno.
- **Senza supervisione e sicuro** — le esecuzioni non si fermano mai a chiedere: tutto ciò che mostrerebbe una richiesta di permesso viene negato. Ogni agente ha un livello di accesso: `read + network`, `read + write + network` o `full`.
- **Trascrizioni reali** — ogni esecuzione è una vera sessione di opencode che puoi aprire, con chiamate agli strumenti, token e costo.
- **Agenti che riferiscono** — gli strumenti di cowork `inbox`, `user_todo`, `agenda`, `memory` e `deploy` permettono agli agenti di scrivere nella tua inbox, aggiungere todo, leggere la tua agenda e ricordare fatti su di te. Una chat può distribuire nuovi agenti.
- **Spaces** — raggruppa gli agenti attorno a un obiettivo, un evento o un cliente.
- **Memoria** — fatti su di te che ogni chat e ogni agente riceve.
- **Statistiche dei token** — token locali e cloud contati a parte, ritmo di consumo, proiezione giornaliera e quanto ti fanno risparmiare i modelli locali.
- **Tastiera e mouse** — `alt+1` … `alt+8` per le pagine e `ctrl+p` per tutti i comandi; clicca su navigazione, pulsanti, righe, caselle e suggerimenti dei tasti; scorri liste e calendario con la rotella.
- **ASCII dall'inizio alla fine** — logo, indicatori e grafici ad anello sono disegnati con i caratteri a blocchi del terminale.

### Schermate

<table>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/03-agents.png" alt="Agents"><br><b>Agents</b> — indicatore dei token, ritmo, risparmio e l'Agent Calendar dal vivo</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/04-agents-whole-day.png" alt="Agent Calendar, giornata intera"><br><b>Agent Calendar</b> sull'intera giornata</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/05-agent-detail.png" alt="Agente"><br><b>Agente</b> — chiamate agli strumenti e risultato dell'ultima esecuzione</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/06-agent-running.png" alt="Agente in esecuzione"><br>Un agente <b>in esecuzione</b> in questo momento</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/14-deploy.png" alt="Distribuire un agente"><br><b>Distribuisci</b> un agente con una frase</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/15-deploy-folder.png" alt="Distribuire: scegliere la cartella"><br>…poi scegli la <b>cartella</b> in cui lavora</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/07-spaces.png" alt="Spaces"><br><b>Spaces</b> — agenti raggruppati attorno a un obiettivo</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/08-chat.png" alt="Chat"><br>Una <b>chat</b> con l'agente <code>work</code>, dentro la shell</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/10-skills.png" alt="Skills"><br><b>Skills</b> — istruzioni riutilizzabili</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/11-memory.png" alt="Memoria"><br><b>Memory</b> — ciò che ogni chat e agente sa di te</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/12-models.png" alt="Modelli"><br><b>Models</b> — locali e cloud</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/13-integrations.png" alt="Integrazioni"><br><b>Integrations</b> — server MCP e account</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/02-your-day-focus.png" alt="Your Day senza la colonna degli agenti"><br><b>Your Day</b> con la colonna degli agenti nascosta</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/16-command-palette.png" alt="Comandi"><br>Tutti i <b>comandi</b> nella palette (<code>ctrl+p</code>)</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/17-new-chat.png" alt="Nuova chat"><br><b>New chat</b></td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/18-nav-collapsed.png" alt="Navigazione compressa"><br><b>Navigazione</b> compressa (<code>ctrl+x w</code>)</td>
  </tr>
</table>

---

### Per iniziare

**Requisiti:** [Bun](https://bun.sh) 1.3 o successivo, git e un terminale con truecolor e supporto al mouse (xfce4-terminal, GNOME Terminal, Konsole, kitty, WezTerm, Ghostty, iTerm2, Windows Terminal…). Per i modelli: qualsiasi provider supportato da opencode, oppure un modello locale servito da Ollama, LM Studio, llama.cpp o vLLM.

#### Avviare dal codice sorgente

```bash
git clone https://github.com/dedeprogames-official/openwork.git
cd openwork
bun install
bun dev ~/work        # la cartella in cui si apre OpenWork
```

`bun dev .` apre la cartella corrente; `bun dev` da solo apre `packages/opencode`.

#### Compilare un binario autonomo

```bash
./packages/opencode/script/build.ts --single
./packages/opencode/dist/opencode-linux-x64/bin/opencode    # oppure opencode-darwin-arm64, …
```

Il pacchetto installa lo stesso binario sia come `opencode` sia come `openwork`.

#### I tuoi primi cinque minuti

1. **Collega un modello** — `/connect`, oppure apri **Models** (`alt+7`) e premi `c`. Per i modelli locali vedi [Modelli locali](#local-models).
2. **Carica la demo** — `/demo` crea 6 space, 17 agenti, una giornata di storico delle esecuzioni, skill, messaggi in inbox, todo e un'agenda. I suoi agenti partono in pausa per non consumare token; `/pause` li lascia girare.
3. **Distribuisci il tuo** — `ctrl+x d`, oppure scrivi `/deploy check the weather in Lisbon every morning at 7 and tell me if I need an umbrella` (la pianificazione in inglese o portoghese; il compito in qualsiasi lingua).
4. **Leggi Your Day** — `alt+1`. I risultati arrivano nella Agent Inbox; apri un agente per vedere le sue esecuzioni o per parlare del suo lavoro.

### Distribuire agenti

Un agente è un compito, una cartella in cui lavorare, una pianificazione e un livello di accesso, più eventualmente una skill. Gira sul modello selezionato al momento della distribuzione. Distribuisci con `ctrl+x d`, `/deploy <cosa e quando>`, il pulsante **+ Create Agent** nella pagina Agents, da uno space o chiedendolo in una chat.

| Scrivi                                                                  | Pianificazione                                                        |
| ----------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `every 10m`, `every 2 hours`, `a cada 15 minutos`                       | ogni N minuti, ore o giorni (almeno 1 minuto)                         |
| `hourly`, `every hour`, `every minute`                                  | ogni ora o ogni minuto                                                |
| `daily at 9am`, `every morning at 8`, `every evening`, `todo dia às 8h` | ogni giorno a quell'ora (mattina 08:00, sera 18:00, altrimenti 09:00) |
| `at 5pm`, `às 17h`                                                      | una volta, alle prossime 17:00                                        |
| `now`, `once` — o nessuna indicazione di tempo                          | una volta, subito                                                     |

Il passo della pianificazione offre anche **on demand**: l'agente gira solo quando premi **Run now**.

| Accesso                  | L'agente può                                                        |
| ------------------------ | ------------------------------------------------------------------- |
| `read + network`         | leggere file, navigare sul web, scrivere nella tua inbox            |
| `read + write + network` | anche creare e modificare file nella sua cartella                   |
| `full`                   | usare tutti gli strumenti che consenti, compresi i comandi di shell |

Le esecuzioni sono senza supervisione: le domande e tutto ciò che mostrerebbe una richiesta di permesso vengono negati, e un'esecuzione si ferma dopo 15 minuti. Ogni esecuzione è una sessione chiamata `<agente> · run #N`; premi `o` nella pagina dell'agente per aprirne la trascrizione.

### Pagine

| Pagina       | Tasto   | Mostra                                                                                                                       |
| ------------ | ------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Your Day     | `alt+1` | Agenda, todo, Agent Inbox, un prompt di chat e tutti gli agenti raggruppati per space con l'ultima e la prossima esecuzione. |
| Chats        | `alt+2` | Le tue chat; le esecuzioni degli agenti restano fuori dall'elenco.                                                           |
| Spaces       | `alt+3` | Gli space con i loro agenti e gli elementi dell'agenda.                                                                      |
| Agents       | `alt+4` | Indicatore dei token, ritmo, risparmio, dove vanno i token e l'Agent Calendar.                                               |
| Agent        | `enter` | Un agente: compito, pianificazione, accesso, chiamate agli strumenti e risultato di ogni esecuzione, storico e la sua chat.  |
| Skills       | `alt+5` | Skill da `.opencode/skills` e `~/.agents/skills`.                                                                            |
| Memory       | `alt+6` | Ciò che chat e agenti sanno di te.                                                                                           |
| Models       | `alt+7` | Modelli locali e cloud; i token locali sono contati a parte nella scheda Usage.                                              |
| Integrations | `alt+8` | Server MCP e account collegati.                                                                                              |

### Tastiera e mouse

| Tasti             | Azione                                               |
| ----------------- | ---------------------------------------------------- |
| `alt+1` … `alt+8` | cambiare pagina                                      |
| `ctrl+x d`        | distribuire un agente                                |
| `ctrl+x w`        | comprimere o espandere la navigazione                |
| `ctrl+p`          | palette dei comandi                                  |
| `c`               | mettere a fuoco il prompt di chat (`esc` per uscire) |
| `esc`             | indietro                                             |

Ogni pagina mostra i propri tasti in basso. Comandi slash: `/day`, `/chats`, `/spaces`, `/agents`, `/skills`, `/memory`, `/models`, `/integrations`, `/deploy <testo>`, `/pause`, `/demo`, `/connect`.

Tutto funziona anche con il mouse: clicca su navigazione, pulsanti e suggerimenti dei tasti; nelle liste il primo clic seleziona una riga e il secondo la apre; le caselle cambiano subito; la rotella scorre le liste e l'Agent Calendar. Trascinare continua a selezionare e copiare il testo.

<a id="local-models"></a>

### Modelli locali

Qualsiasi server compatibile con OpenAI su `localhost` conta come locale, così come i provider `ollama`, `lmstudio`, `llamacpp` e `vllm`. Per esempio, con Ollama, in `opencode.json` (nella tua cartella o in `~/.config/opencode/`):

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

### Come funziona

- Lo scheduler vive nel processo server di OpenWork. Cerca gli agenti da eseguire ogni 5 secondi e ne esegue fino a 3 alla volta. Le prenotazioni sono atomiche in SQLite, quindi più finestre di OpenWork non eseguono mai due volte lo stesso agente, e le esecuzioni lasciate da un crash vengono segnate come interrotte. `OPENCODE_DISABLE_WORK_SCHEDULER=1` lo disattiva.
- Ogni esecuzione è una sessione di opencode con l'agente `work` — una persona da lavoro intellettuale per cui le cartelle sono spazi di lavoro e i file sono consegne — con la tua memoria e i risultati recenti dell'agente nel contesto di sistema, e permessi senza supervisione secondo il suo livello di accesso.
- OpenWork mantiene la configurazione di opencode: `opencode.json`, `.opencode/`, le variabili `OPENCODE_*`, provider, server MCP e skill funzionano come prima.

| Dove                                                    | Cosa                                                                    |
| ------------------------------------------------------- | ----------------------------------------------------------------------- |
| `packages/schema/src/work.ts`                           | record, input e l'evento `work.updated`                                 |
| `packages/core/src/work.ts`, `packages/core/src/work/`  | tabelle SQLite, lo store `Work` e l'analisi delle pianificazioni        |
| `packages/opencode/src/work/`                           | scheduler, permessi senza supervisione, contesto delle esecuzioni, demo |
| `packages/opencode/src/tool/`                           | gli strumenti `inbox`, `user_todo`, `agenda`, `memory` e `deploy`       |
| `packages/opencode/src/server/routes/instance/httpapi/` | l'API HTTP `/work/*`                                                    |
| `packages/tui/src/work/`                                | la shell, la navigazione, le pagine e la finestra di distribuzione      |

La guida completa è in [docs/openwork](docs/openwork/README.md).

### Sviluppo

```bash
bun install
bun dev ~/work

# i controlli si lanciano dalla cartella di un pacchetto, mai dalla radice del repository
(cd packages/tui && bun typecheck && bun test)
(cd packages/opencode && bun typecheck && bun test test/work)
```

Le schermate vengono rigenerate dalla vera TUI con un modello offline. Con `--window linux` ognuna è la foto di una vera finestra X11 (Xvfb, il window manager xfwm4 e xfce4-terminal):

```bash
sudo apt-get install tmux python3-pil xvfb dbus-x11 xfwm4 xfce4-terminal greybird-gtk-theme xdotool imagemagick fonts-dejavu-core
cd packages/opencode
TZ=Europe/London bun script/openwork/screenshots.ts --window linux --out ../../docs/openwork/screenshots
```

Scegli un `TZ` in cui sia tardo pomeriggio: lo storico delle esecuzioni della demo inizia alle 06:00 ora locale.

### Crediti e licenza

OpenWork è costruito su [opencode](https://github.com/anomalyco/opencode) e ne mantiene la [licenza MIT](LICENSE). Non è sviluppato dal team di opencode né affiliato con esso. I contributi sono benvenuti — vedi [CONTRIBUTING.md](CONTRIBUTING.md).
