<p align="center">
  <picture>
    <source srcset="docs/openwork/logo-dark.svg" media="(prefers-color-scheme: dark)">
    <source srcset="docs/openwork/logo-light.svg" media="(prefers-color-scheme: light)">
    <img src="docs/openwork/logo-light.svg" alt="Logo OpenWork" width="480">
  </picture>
</p>
<p align="center"><strong>Wdrażaj agentów w swoich folderach. Pracują według harmonogramu. Wyniki czytasz w Your Day.</strong></p>
<p align="center">Tryb pracy dla terminala, zbudowany na harnessie opencode.</p>
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

[![OpenWork — Your Day w oknie terminala w Linuksie](docs/openwork/screenshots/01-your-day.png)](docs/openwork/README.md)

<p align="center"><sub>Wszystkie zrzuty ekranu to prawdziwy TUI OpenWork w xfce4-terminal w Linuksie (Xfce, motyw Greybird), z demonstracyjnym obszarem roboczym i modelem offline.</sub></p>

---

### Czym jest OpenWork?

OpenWork zamienia terminalowy interfejs opencode w miejsce do pracy — nie tylko do programowania. Opisz zadanie jednym zdaniem, na przykład _„check the Half Moon Bay cam every 10m and tell me if it's sunny”_, a OpenWork wdroży agenta w wybranym lokalnym folderze. Agent działa według harmonogramu w tle, bez nadzoru, a wszystko, co znajdzie, trafia w jedno miejsce: do **Your Day**, obok twojej agendy, listy zadań i **Agent Inbox**.

To nadal aplikacja terminalowa działająca na harnessie opencode: te same sesje, narzędzia, uprawnienia, dostawcy, modele lokalne, skille i serwery MCP. Agenci, uruchomienia, skrzynka, zadania, agenda i pamięć są przechowywane lokalnie w SQLite.

### Najważniejsze funkcje

- **Błyskawiczne wdrożenie** — jedno zdanie → folder → space → harmonogram → dostęp. Naciśnij enter na każdym kroku, a agent zostanie wdrożony i uruchomiony w kilka sekund.
- **Harmonogramy zwykłymi słowami** — po angielsku lub portugalsku: `every 10m`, `hourly`, `every morning at 8`, `daily at 7:30`, `at 5pm`, `now`, `a cada 15 minutos`, `todo dia às 8h`.
- **Your Day** — agenda, zadania, Agent Inbox i wszyscy agenci pogrupowani według space, z ostatnim wynikiem i następnym uruchomieniem.
- **Agent Calendar** — każde uruchomienie dnia po kolei, pokolorowane według space, z przybliżeniem od kilku minut do całego dnia i obramowanym uruchomieniem, które właśnie pracuje.
- **Bez nadzoru i bezpiecznie** — uruchomienia nigdy nie zatrzymują się, by pytać: wszystko, co wyświetliłoby prośbę o uprawnienia, jest odrzucane. Każdy agent ma poziom dostępu: `read + network`, `read + write + network` lub `full`.
- **Prawdziwe transkrypcje** — każde uruchomienie to prawdziwa sesja opencode, którą możesz otworzyć, z wywołaniami narzędzi, tokenami i kosztem.
- **Agenci, którzy raportują** — narzędzia cowork `inbox`, `user_todo`, `agenda`, `memory` i `deploy` pozwalają agentom pisać do twojej skrzynki, dodawać zadania, czytać agendę i zapamiętywać fakty o tobie. Czat może wdrażać nowych agentów.
- **Spaces** — grupuj agentów wokół celu, wydarzenia lub klienta.
- **Przenoszenie agentów między spaces** — naciśnij `m` na stronie agenta, użyj **+ Move an agent here...** na stronie Spaces albo poproś w czacie.
- **Pamięć** — fakty o tobie, które dostaje każdy czat i każdy agent.
- **Statystyki tokenów** — tokeny lokalne i chmurowe liczone osobno, tempo zużycia, prognoza dzienna i oszczędności dzięki modelom lokalnym.
- **Klawiatura i mysz** — `alt+1` … `alt+8` dla stron i `ctrl+p` dla wszystkich poleceń; klikaj nawigację, przyciski, wiersze, pola wyboru i podpowiedzi klawiszy; przewijaj listy i kalendarz kółkiem.
- **ASCII od początku do końca** — logo, wskaźniki i wykresy pierścieniowe są rysowane znakami blokowymi terminala.

### Zrzuty ekranu

<table>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/03-agents.png" alt="Agents"><br><b>Agents</b> — wskaźnik tokenów, tempo zużycia, oszczędności i Agent Calendar na żywo</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/04-agents-whole-day.png" alt="Agent Calendar, cały dzień"><br><b>Agent Calendar</b> oddalony do całego dnia</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/05-agent-detail.png" alt="Agent"><br><b>Agent</b> — wywołania narzędzi i wynik ostatniego uruchomienia</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/06-agent-running.png" alt="Działający agent"><br>Agent <b>działający</b> w tej chwili</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/14-deploy.png" alt="Wdrażanie agenta"><br><b>Wdróż</b> agenta jednym zdaniem</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/15-deploy-folder.png" alt="Wdrażanie: wybór folderu"><br>…a potem wybierz <b>folder</b>, w którym pracuje</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/07-spaces.png" alt="Spaces"><br><b>Spaces</b> — agenci pogrupowani wokół celu</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/08-chat.png" alt="Czat"><br><b>Czat</b> z agentem <code>work</code>, wewnątrz powłoki</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/10-skills.png" alt="Skills"><br><b>Skills</b> — instrukcje wielokrotnego użytku</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/11-memory.png" alt="Pamięć"><br><b>Memory</b> — co każdy czat i agent wie o tobie</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/12-models.png" alt="Modele"><br><b>Models</b> — lokalne i w chmurze</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/13-integrations.png" alt="Integracje"><br><b>Integrations</b> — serwery MCP i konta</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/02-your-day-focus.png" alt="Your Day bez kolumny agentów"><br><b>Your Day</b> z ukrytą kolumną agentów</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/16-command-palette.png" alt="Polecenia"><br>Wszystkie <b>polecenia</b> w palecie (<code>ctrl+p</code>)</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/17-new-chat.png" alt="Nowy czat"><br><b>New chat</b></td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/18-nav-collapsed.png" alt="Zwinięta nawigacja"><br>Zwinięta <b>nawigacja</b> (<code>ctrl+x w</code>)</td>
  </tr>
</table>

---

### Pierwsze kroki

#### Instalacja

```bash
# macOS i Linux
curl -fsSL https://github.com/dedeprogames-official/openwork/releases/latest/download/install | bash
```

```powershell
# Windows (PowerShell)
irm https://github.com/dedeprogames-official/openwork/releases/latest/download/install.ps1 | iex
```

```bash
# Dowolny system z Node.js 18+: npx uruchamia raz, npm install -g zostawia polecenie openwork
npx https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-cli.tgz
npm install -g https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-cli.tgz
```

Potem otwórz folder i uruchom `openwork`. `openwork upgrade` aktualizuje do najnowszego wydania, a `openwork uninstall` usuwa program.

#### Pobieranie

| Platforma                | Plik                                                                                                                                          |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Linux x64                | [`openwork-linux-x64.tar.gz`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-linux-x64.tar.gz)           |
| Linux arm64              | [`openwork-linux-arm64.tar.gz`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-linux-arm64.tar.gz)       |
| Linux x64 (musl, Alpine) | [`openwork-linux-x64-musl.tar.gz`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-linux-x64-musl.tar.gz) |
| macOS Apple Silicon      | [`openwork-darwin-arm64.zip`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-darwin-arm64.zip)           |
| macOS Intel              | [`openwork-darwin-x64.zip`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-darwin-x64.zip)               |
| Windows x64              | [`openwork-windows-x64.zip`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-windows-x64.zip)             |
| Windows arm64            | [`openwork-windows-arm64.zip`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-windows-arm64.zip)         |

Wszystkie wersje są na [stronie wydań](https://github.com/dedeprogames-official/openwork/releases). Każde archiwum zawiera plik `openwork`; buildy `-baseline` są dla procesorów x64 bez AVX2, a `-musl` dla Alpine — instalatory same wybierają właściwy. Pliki dla macOS są podpisane ad hoc, bez notaryzacji: po pobraniu zipa w przeglądarce uruchom raz `xattr -d com.apple.quarantine openwork`.

#### Windows

Instalator PowerShell umieszcza `openwork.exe` w `%USERPROFILE%\.openwork\bin` i dodaje ten folder do PATH: otwórz nowy terminal i uruchom `openwork`. Najlepiej działa w Windows Terminal (truecolor i mysz). Możesz też rozpakować `openwork-windows-x64.zip` w dowolnym miejscu i uruchomić `openwork.exe` albo użyć `npx` jak wyżej.

#### Uruchamianie ze źródeł

**Wymagania:** [Bun](https://bun.sh) 1.3 lub nowszy, git i terminal z truecolor i obsługą myszy (xfce4-terminal, GNOME Terminal, Konsole, kitty, WezTerm, Ghostty, iTerm2, Windows Terminal…). Modele: dowolny dostawca obsługiwany przez opencode albo model lokalny udostępniany przez Ollama, LM Studio, llama.cpp lub vLLM.

```bash
git clone https://github.com/dedeprogames-official/openwork.git
cd openwork
bun install
bun dev ~/work        # folder, w którym otwiera się OpenWork
```

`bun dev .` otwiera bieżący folder; samo `bun dev` otwiera `packages/opencode`.

#### Budowanie samodzielnego pliku wykonywalnego

```bash
./packages/opencode/script/build.ts --single
./packages/opencode/dist/opencode-linux-x64/bin/opencode    # lub opencode-darwin-arm64, …
```

Pakiet instaluje ten sam plik wykonywalny jako `opencode` i jako `openwork`.

#### Twoje pierwsze pięć minut

1. **Podłącz model** — `/connect` albo otwórz **Models** (`alt+7`) i naciśnij `c`. Modele lokalne opisano w sekcji [Modele lokalne](#local-models).
2. **Wczytaj demo** — `/demo` tworzy 6 spaces, 17 agentów, dzień historii uruchomień, skille, wiadomości w skrzynce, zadania i agendę. Jego agenci startują wstrzymani, żeby nie zużywać tokenów; `/pause` pozwala im działać.
3. **Wdróż własnego** — `ctrl+x d` albo wpisz `/deploy check the weather in Lisbon every morning at 7 and tell me if I need an umbrella` (harmonogram po angielsku lub portugalsku; zadanie w dowolnym języku).
4. **Przeczytaj Your Day** — `alt+1`. Wyniki trafiają do Agent Inbox; otwórz agenta, by zobaczyć jego uruchomienia albo porozmawiać o jego pracy.

### Wdrażanie agentów

Agent to zadanie, folder roboczy, harmonogram i poziom dostępu, opcjonalnie także skill. Działa na modelu wybranym w chwili wdrożenia. Wdrażaj przez `ctrl+x d`, `/deploy <co i kiedy>`, przycisk **+ Create Agent** na stronie Agents, ze space albo prosząc o to w czacie.

| Piszesz                                                                 | Harmonogram                                                            |
| ----------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `every 10m`, `every 2 hours`, `a cada 15 minutos`                       | co N minut, godzin lub dni (co najmniej 1 minuta)                      |
| `hourly`, `every hour`, `every minute`                                  | co godzinę lub co minutę                                               |
| `daily at 9am`, `every morning at 8`, `every evening`, `todo dia às 8h` | codziennie o tej godzinie (rano 08:00, wieczorem 18:00, inaczej 09:00) |
| `at 5pm`, `às 17h`                                                      | raz, o najbliższej 17:00                                               |
| `now`, `once` — lub bez żadnych słów o czasie                           | raz, od razu                                                           |

Krok harmonogramu oferuje też **on demand**: agent działa tylko wtedy, gdy naciśniesz **Run now**.

| Dostęp                   | Agent może                                                            |
| ------------------------ | --------------------------------------------------------------------- |
| `read + network`         | czytać pliki, przeglądać sieć, pisać do twojej skrzynki               |
| `read + write + network` | dodatkowo tworzyć i edytować pliki w swoim folderze                   |
| `full`                   | używać wszystkich narzędzi, na które pozwolisz, także poleceń powłoki |

Uruchomienia odbywają się bez nadzoru: pytania i wszystko, co wyświetliłoby prośbę o uprawnienia, są odrzucane, a uruchomienie kończy się po 15 minutach. Każde uruchomienie to sesja o nazwie `<agent> · run #N`; naciśnij `o` na stronie agenta, aby otworzyć jej transkrypcję.

### Strony

| Strona       | Klawisz | Pokazuje                                                                                                                       |
| ------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Your Day     | `alt+1` | Agendę, zadania, Agent Inbox, pole czatu i wszystkich agentów pogrupowanych według space z ostatnim i następnym uruchomieniem. |
| Chats        | `alt+2` | Twoje czaty; uruchomienia agentów nie trafiają na listę.                                                                       |
| Spaces       | `alt+3` | Spaces z ich agentami i pozycjami agendy.                                                                                      |
| Agents       | `alt+4` | Wskaźnik tokenów, tempo zużycia, oszczędności, na co idą tokeny i Agent Calendar.                                              |
| Agent        | `enter` | Jednego agenta: zadanie, harmonogram, dostęp, wywołania narzędzi i wynik każdego uruchomienia, historię i jego własny czat.    |
| Skills       | `alt+5` | Skille z `.opencode/skills` i `~/.agents/skills`.                                                                              |
| Memory       | `alt+6` | Co czaty i agenci wiedzą o tobie.                                                                                              |
| Models       | `alt+7` | Modele lokalne i chmurowe; tokeny lokalne są liczone osobno w karcie Usage.                                                    |
| Integrations | `alt+8` | Serwery MCP i połączone konta.                                                                                                 |

### Klawiatura i mysz

| Klawisze          | Działanie                                                                                                  |
| ----------------- | ---------------------------------------------------------------------------------------------------------- |
| `alt+1` … `alt+8` | przełączanie stron                                                                                         |
| `ctrl+x d`        | wdrożenie agenta                                                                                           |
| `ctrl+x w`        | zwinięcie lub rozwinięcie nawigacji                                                                        |
| `m`               | przeniesienie agenta do innego space (na jego stronie) lub wybranego agenta do zaznaczonego space (Spaces) |
| `ctrl+p`          | paleta poleceń                                                                                             |
| `c`               | aktywacja pola czatu (`esc` z niego wychodzi)                                                              |
| `esc`             | wstecz                                                                                                     |

Każda strona pokazuje swoje klawisze na dole. Polecenia z ukośnikiem: `/day`, `/chats`, `/spaces`, `/agents`, `/skills`, `/memory`, `/models`, `/integrations`, `/deploy <tekst>`, `/pause`, `/demo`, `/connect`.

Wszystko działa też myszą: klikaj nawigację, przyciski i podpowiedzi klawiszy; na listach pierwsze kliknięcie zaznacza wiersz, a drugie go otwiera; pola wyboru przełączają się od razu; kółko przewija listy i Agent Calendar. Przeciąganie nadal zaznacza i kopiuje tekst.

<a id="local-models"></a>

### Modele lokalne

Każdy serwer zgodny z OpenAI na `localhost` liczy się jako lokalny, podobnie jak dostawcy `ollama`, `lmstudio`, `llamacpp` i `vllm`. Na przykład z Ollama, w `opencode.json` (w twoim folderze lub w `~/.config/openwork/`):

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

### Jak to działa

- Harmonogram działa w procesie serwera OpenWork. Co 5 sekund sprawdza, którzy agenci powinni ruszyć, i uruchamia do 3 naraz. Rezerwacje są atomowe w SQLite, więc kilka okien OpenWork nigdy nie uruchomi tego samego agenta dwa razy, a uruchomienia pozostawione przez awarię są oznaczane jako przerwane. `OPENCODE_DISABLE_WORK_SCHEDULER=1` go wyłącza.
- Każde uruchomienie to sesja opencode z agentem `work` — personą do pracy umysłowej, dla której foldery są obszarami roboczymi, a pliki rezultatami — z twoją pamięcią i ostatnimi wynikami agenta w kontekście systemowym oraz uprawnieniami bez nadzoru dla jego poziomu dostępu.
- OpenWork zachowuje konfigurację opencode: `opencode.json`, `.opencode/`, zmienne `OPENCODE_*`, dostawcy, serwery MCP i skille działają jak dotąd.
- OpenWork trzyma swoje dane w `~/.local/share/openwork`, a globalną konfigurację w `~/.config/openwork`, osobno od instalacji opencode, i aktualizuje się wyłącznie z własnych wydań na GitHubie.

| Gdzie                                                   | Co                                                              |
| ------------------------------------------------------- | --------------------------------------------------------------- |
| `packages/schema/src/work.ts`                           | rekordy, dane wejściowe i zdarzenie `work.updated`              |
| `packages/core/src/work.ts`, `packages/core/src/work/`  | tabele SQLite, magazyn `Work` i parsowanie harmonogramów        |
| `packages/opencode/src/work/`                           | harmonogram, uprawnienia bez nadzoru, kontekst uruchomień, demo |
| `packages/opencode/src/tool/`                           | narzędzia `inbox`, `user_todo`, `agenda`, `memory` i `deploy`   |
| `packages/opencode/src/server/routes/instance/httpapi/` | API HTTP `/work/*`                                              |
| `packages/tui/src/work/`                                | powłoka, nawigacja, strony i okno wdrażania                     |

Pełny przewodnik znajduje się w [docs/openwork](docs/openwork/README.md).

### Rozwój

```bash
bun install
bun dev ~/work

# sprawdzenia uruchamia się z katalogu pakietu, nigdy z katalogu głównego repozytorium
(cd packages/tui && bun typecheck && bun test)
(cd packages/opencode && bun typecheck && bun test test/work)
```

Zrzuty ekranu są generowane z prawdziwego TUI z modelem offline. Z `--window linux` każdy jest zdjęciem prawdziwego okna X11 (Xvfb, menedżer okien xfwm4 i xfce4-terminal):

```bash
sudo apt-get install tmux python3-pil xvfb dbus-x11 xfwm4 xfce4-terminal greybird-gtk-theme xdotool imagemagick fonts-dejavu-core
cd packages/opencode
TZ=Europe/London bun script/openwork/screenshots.ts --window linux --out ../../docs/openwork/screenshots
```

Wybierz `TZ`, w której jest późne popołudnie: historia uruchomień demo zaczyna się o 06:00 czasu lokalnego.

### Podziękowania i licencja

OpenWork jest zbudowany na [opencode](https://github.com/anomalyco/opencode) i zachowuje jego [licencję MIT](LICENSE). Nie jest tworzony przez zespół opencode ani z nim powiązany. Wkład jest mile widziany — zobacz [CONTRIBUTING.md](CONTRIBUTING.md).
