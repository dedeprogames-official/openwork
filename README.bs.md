<p align="center">
  <picture>
    <source srcset="docs/openwork/logo-dark.svg" media="(prefers-color-scheme: dark)">
    <source srcset="docs/openwork/logo-light.svg" media="(prefers-color-scheme: light)">
    <img src="docs/openwork/logo-light.svg" alt="OpenWork logo" width="480">
  </picture>
</p>
<p align="center"><strong>Postavi agente u svoje foldere. Rade po rasporedu. Rezultate čitaš u Your Day.</strong></p>
<p align="center">Radni režim za terminal, izgrađen na opencode harnessu.</p>
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

[![OpenWork — Your Day u prozoru terminala na Linuxu](docs/openwork/screenshots/01-your-day.png)](docs/openwork/README.md)

<p align="center"><sub>Svi snimci ekrana ovdje su pravi OpenWork TUI u xfce4-terminalu na Linuxu (Xfce, tema Greybird), s demo radnim prostorom i offline modelom.</sub></p>

---

### Šta je OpenWork?

OpenWork pretvara terminalsko sučelje opencodea u mjesto za rad — ne samo za kod. Opiši zadatak jednom rečenicom, na primjer _„check the Half Moon Bay cam every 10m and tell me if it's sunny”_, i OpenWork postavlja agenta u lokalni folder po tvom izboru. Agent radi po svom rasporedu u pozadini, bez nadzora, a sve što pronađe stiže na jedno mjesto: **Your Day**, pored tvoje agende, tvojih zadataka i **Agent Inboxa**.

I dalje je terminalska aplikacija i i dalje radi na opencode harnessu: iste sesije, alati, dozvole, provajderi, lokalni modeli, skillovi i MCP serveri. Agenti, pokretanja, inbox, zadaci, agenda i memorija čuvaju se lokalno u SQLiteu.

### Istaknuto

- **Trenutno postavljanje** — jedna rečenica → folder → space → raspored → pristup. Pritisni enter na svakom koraku i agent je postavljen i radi za nekoliko sekundi.
- **Rasporedi običnim riječima** — na engleskom ili portugalskom: `every 10m`, `hourly`, `every morning at 8`, `daily at 7:30`, `at 5pm`, `now`, `a cada 15 minutos`, `todo dia às 8h`.
- **Your Day** — agenda, zadaci, Agent Inbox i svi agenti grupisani po spaceu, s posljednjim rezultatom i sljedećim pokretanjem.
- **Agent Calendar** — svako pokretanje u danu redom, obojeno po spaceu, sa zumom od nekoliko minuta do cijelog dana, a pokretanje koje upravo radi je uokvireno.
- **Bez nadzora i sigurno** — pokretanja nikad ne staju da pitaju: sve što bi prikazalo zahtjev za dozvolu biva odbijeno. Svaki agent ima nivo pristupa: `read + network`, `read + write + network` ili `full`.
- **Pravi transkripti** — svako pokretanje je prava opencode sesija koju možeš otvoriti, s pozivima alata, tokenima i cijenom.
- **Agenti koji javljaju** — cowork alati `inbox`, `user_todo`, `agenda`, `memory` i `deploy` omogućavaju agentima da pišu u tvoj inbox, dodaju zadatke, čitaju tvoju agendu i pamte činjenice o tebi. Chat može postaviti nove agente.
- **Spaces** — grupiši agente oko cilja, događaja ili klijenta.
- **Memorija** — činjenice o tebi koje dobija svaki chat i svaki agent.
- **Statistika tokena** — lokalni i cloud tokeni brojani odvojeno, brzina potrošnje, dnevna projekcija i koliko ti lokalni modeli štede.
- **Tastatura i miš** — `alt+1` … `alt+8` za stranice i `ctrl+p` za sve komande; klikni navigaciju, dugmad, redove, polja za označavanje i savjete za tipke; skroluj liste i kalendar kotačićem.
- **ASCII od početka do kraja** — logo, mjerači i kružni grafikoni nacrtani su blok-znakovima terminala.

### Snimci ekrana

<table>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/03-agents.png" alt="Agents"><br><b>Agents</b> — mjerač tokena, brzina potrošnje, ušteda i Agent Calendar uživo</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/04-agents-whole-day.png" alt="Agent Calendar, cijeli dan"><br><b>Agent Calendar</b> odzumiran na cijeli dan</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/05-agent-detail.png" alt="Agent"><br><b>Agent</b> — pozivi alata i rezultat posljednjeg pokretanja</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/06-agent-running.png" alt="Agent koji radi"><br>Agent koji upravo <b>radi</b></td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/14-deploy.png" alt="Postavljanje agenta"><br><b>Postavi</b> agenta jednom rečenicom</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/15-deploy-folder.png" alt="Postavljanje: izbor foldera"><br>…pa izaberi <b>folder</b> u kojem radi</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/07-spaces.png" alt="Spaces"><br><b>Spaces</b> — agenti grupisani oko cilja</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/08-chat.png" alt="Chat"><br><b>Chat</b> s agentom <code>work</code>, unutar shella</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/10-skills.png" alt="Skills"><br><b>Skills</b> — upute za višekratnu upotrebu</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/11-memory.png" alt="Memorija"><br><b>Memory</b> — šta svaki chat i agent zna o tebi</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/12-models.png" alt="Modeli"><br><b>Models</b> — lokalni i u cloudu</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/13-integrations.png" alt="Integracije"><br><b>Integrations</b> — MCP serveri i računi</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/02-your-day-focus.png" alt="Your Day bez kolone agenata"><br><b>Your Day</b> sa skrivenom kolonom agenata</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/16-command-palette.png" alt="Komande"><br>Sve <b>komande</b> u paleti (<code>ctrl+p</code>)</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/17-new-chat.png" alt="Novi chat"><br><b>New chat</b></td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/18-nav-collapsed.png" alt="Skupljena navigacija"><br>Skupljena <b>navigacija</b> (<code>ctrl+x w</code>)</td>
  </tr>
</table>

---

### Početak

**Preduslovi:** [Bun](https://bun.sh) 1.3 ili noviji, git i terminal s truecolor bojama i podrškom za miš (xfce4-terminal, GNOME Terminal, Konsole, kitty, WezTerm, Ghostty, iTerm2, Windows Terminal…). Za modele: bilo koji provajder koji opencode podržava ili lokalni model preko Ollame, LM Studija, llama.cpp-a ili vLLM-a.

#### Pokretanje iz izvornog koda

```bash
git clone https://github.com/dedeprogames-official/openwork.git
cd openwork
bun install
bun dev ~/work        # folder u kojem se OpenWork otvara
```

`bun dev .` otvara trenutni folder; samo `bun dev` otvara `packages/opencode`.

#### Izgradnja samostalne binarne datoteke

```bash
./packages/opencode/script/build.ts --single
./packages/opencode/dist/opencode-linux-x64/bin/opencode    # ili opencode-darwin-arm64, …
```

Paket instalira istu binarnu datoteku i kao `opencode` i kao `openwork`.

#### Tvojih prvih pet minuta

1. **Poveži model** — `/connect`, ili otvori **Models** (`alt+7`) i pritisni `c`. Za lokalne modele pogledaj [Lokalni modeli](#local-models).
2. **Učitaj demo** — `/demo` pravi 6 spaceova, 17 agenata, dan historije pokretanja, skillove, poruke u inboxu, zadatke i agendu. Agenti kreću pauzirani da ništa ne troši tokene; `/pause` ih pušta da rade.
3. **Postavi svog** — `ctrl+x d`, ili upiši `/deploy check the weather in Lisbon every morning at 7 and tell me if I need an umbrella` (raspored na engleskom ili portugalskom; zadatak na bilo kojem jeziku).
4. **Čitaj Your Day** — `alt+1`. Rezultati stižu u Agent Inbox; otvori agenta da vidiš njegova pokretanja ili da razgovaraš o njegovom radu.

### Postavljanje agenata

Agent je zadatak, folder u kojem radi, raspored i nivo pristupa, a po želji i skill. Radi na modelu koji je bio izabran kad si ga postavio. Postavljaj preko `ctrl+x d`, `/deploy <šta i kada>`, dugmeta **+ Create Agent** na stranici Agents, iz spacea ili tražeći to u chatu.

| Ti pišeš                                                                | Raspored                                                      |
| ----------------------------------------------------------------------- | ------------------------------------------------------------- |
| `every 10m`, `every 2 hours`, `a cada 15 minutos`                       | svakih N minuta, sati ili dana (najmanje 1 minuta)            |
| `hourly`, `every hour`, `every minute`                                  | svaki sat ili svake minute                                    |
| `daily at 9am`, `every morning at 8`, `every evening`, `todo dia às 8h` | svaki dan u to vrijeme (jutro 08:00, veče 18:00, inače 09:00) |
| `at 5pm`, `às 17h`                                                      | jednom, u sljedećih 17:00                                     |
| `now`, `once` — ili bez ikakvih riječi o vremenu                        | jednom, odmah                                                 |

Korak rasporeda nudi i **on demand**: agent radi samo kad pritisneš **Run now**.

| Pristup                  | Agent smije                                                  |
| ------------------------ | ------------------------------------------------------------ |
| `read + network`         | čitati datoteke, pretraživati web, pisati u tvoj inbox       |
| `read + write + network` | i praviti i uređivati datoteke u svom folderu                |
| `full`                   | koristiti sve alate koje dozvoliš, uključujući shell komande |

Pokretanja su bez nadzora: pitanja i sve što bi prikazalo zahtjev za dozvolu bivaju odbijeni, a pokretanje staje nakon 15 minuta. Svako pokretanje je sesija nazvana `<agent> · run #N`; pritisni `o` na stranici agenta da otvoriš transkript.

### Stranice

| Stranica     | Tipka   | Prikazuje                                                                                                               |
| ------------ | ------- | ----------------------------------------------------------------------------------------------------------------------- |
| Your Day     | `alt+1` | Agendu, zadatke, Agent Inbox, polje za chat i sve agente grupisane po spaceu s posljednjim i sljedećim pokretanjem.     |
| Chats        | `alt+2` | Tvoje chatove; pokretanja agenata ostaju van liste.                                                                     |
| Spaces       | `alt+3` | Spaceove s njihovim agentima i stavkama agende.                                                                         |
| Agents       | `alt+4` | Mjerač tokena, brzinu potrošnje, uštedu, kamo idu tokeni i Agent Calendar.                                              |
| Agent        | `enter` | Jednog agenta: zadatak, raspored, pristup, pozive alata i rezultat svakog pokretanja, historiju i njegov vlastiti chat. |
| Skills       | `alt+5` | Skillove iz `.opencode/skills` i `~/.agents/skills`.                                                                    |
| Memory       | `alt+6` | Šta chatovi i agenti znaju o tebi.                                                                                      |
| Models       | `alt+7` | Lokalne i cloud modele; lokalni tokeni se broje odvojeno u kartici Usage.                                               |
| Integrations | `alt+8` | MCP servere i povezane račune.                                                                                          |

### Tastatura i miš

| Tipke             | Radnja                                |
| ----------------- | ------------------------------------- |
| `alt+1` … `alt+8` | promjena stranice                     |
| `ctrl+x d`        | postavljanje agenta                   |
| `ctrl+x w`        | skupljanje ili širenje navigacije     |
| `ctrl+p`          | paleta komandi                        |
| `c`               | fokus na polje za chat (`esc` izlazi) |
| `esc`             | nazad                                 |

Svaka stranica prikazuje svoje tipke na dnu. Slash komande: `/day`, `/chats`, `/spaces`, `/agents`, `/skills`, `/memory`, `/models`, `/integrations`, `/deploy <tekst>`, `/pause`, `/demo`, `/connect`.

Sve radi i mišem: klikni navigaciju, dugmad i savjete za tipke; u listama prvi klik bira red, a drugi ga otvara; polja za označavanje se mijenjaju odmah; kotačić skroluje liste i Agent Calendar. Prevlačenje i dalje označava i kopira tekst.

<a id="local-models"></a>

### Lokalni modeli

Svaki server kompatibilan s OpenAI-jem na `localhost` računa se kao lokalni, kao i provajderi `ollama`, `lmstudio`, `llamacpp` i `vllm`. Na primjer, s Ollamom, u `opencode.json` (u tvom folderu ili u `~/.config/opencode/`):

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

### Kako radi

- Planer živi u procesu OpenWork servera. Svakih 5 sekundi traži agente koje treba pokrenuti i pokreće do 3 istovremeno. Rezervacije su atomske u SQLiteu, pa više OpenWork prozora nikad ne pokrene istog agenta dvaput, a pokretanja koja ostanu nakon pada označavaju se kao prekinuta. `OPENCODE_DISABLE_WORK_SCHEDULER=1` ga isključuje.
- Svako pokretanje je opencode sesija s agentom `work` — personom za intelektualni rad kojoj su folderi radni prostori, a datoteke isporuke — s tvojom memorijom i nedavnim rezultatima agenta u sistemskom kontekstu, i dozvolama bez nadzora za njegov nivo pristupa.
- OpenWork zadržava opencode konfiguraciju: `opencode.json`, `.opencode/`, varijable `OPENCODE_*`, provajderi, MCP serveri i skillovi rade kao i prije.

| Gdje                                                    | Šta                                                       |
| ------------------------------------------------------- | --------------------------------------------------------- |
| `packages/schema/src/work.ts`                           | zapisi, ulazi i događaj `work.updated`                    |
| `packages/core/src/work.ts`, `packages/core/src/work/`  | SQLite tabele, `Work` skladište i čitanje rasporeda       |
| `packages/opencode/src/work/`                           | planer, dozvole bez nadzora, kontekst pokretanja, demo    |
| `packages/opencode/src/tool/`                           | alati `inbox`, `user_todo`, `agenda`, `memory` i `deploy` |
| `packages/opencode/src/server/routes/instance/httpapi/` | HTTP API `/work/*`                                        |
| `packages/tui/src/work/`                                | shell, navigacija, stranice i dijalog za postavljanje     |

Cijeli vodič je u [docs/openwork](docs/openwork/README.md).

### Razvoj

```bash
bun install
bun dev ~/work

# provjere se pokreću iz direktorija paketa, nikad iz korijena repozitorija
(cd packages/tui && bun typecheck && bun test)
(cd packages/opencode && bun typecheck && bun test test/work)
```

Snimci ekrana se generišu iz pravog TUI-ja s offline modelom. Uz `--window linux` svaki je fotografija pravog X11 prozora (Xvfb, upravitelj prozora xfwm4 i xfce4-terminal):

```bash
sudo apt-get install tmux python3-pil xvfb dbus-x11 xfwm4 xfce4-terminal greybird-gtk-theme xdotool imagemagick fonts-dejavu-core
cd packages/opencode
TZ=Europe/London bun script/openwork/screenshots.ts --window linux --out ../../docs/openwork/screenshots
```

Izaberi `TZ` u kojoj je kasno popodne: historija pokretanja u demu počinje u 06:00 po lokalnom vremenu.

### Zasluge i licenca

OpenWork je izgrađen na [opencodeu](https://github.com/anomalyco/opencode) i zadržava njegovu [MIT licencu](LICENSE). Ne pravi ga opencode tim niti je s njim povezan. Doprinosi su dobrodošli — pogledaj [CONTRIBUTING.md](CONTRIBUTING.md).
