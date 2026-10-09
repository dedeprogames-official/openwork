<p align="center">
  <picture>
    <source srcset="docs/openwork/logo-dark.svg" media="(prefers-color-scheme: dark)">
    <source srcset="docs/openwork/logo-light.svg" media="(prefers-color-scheme: light)">
    <img src="docs/openwork/logo-light.svg" alt="Логотип OpenWork" width="480">
  </picture>
</p>
<p align="center"><strong>Розгортайте агентів у своїх теках. Вони працюють за розкладом. Результати ви читаєте в Your Day.</strong></p>
<p align="center">Робочий режим для термінала, побудований на harness opencode.</p>
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

[![OpenWork — Your Day у вікні термінала в Linux](docs/openwork/screenshots/01-your-day.png)](docs/openwork/README.md)

<p align="center"><sub>Усі знімки екрана тут — справжній TUI OpenWork у xfce4-terminal у Linux (Xfce, тема Greybird) з демо-простором і офлайн-моделлю.</sub></p>

---

### Що таке OpenWork?

OpenWork перетворює термінальний інтерфейс opencode на місце для роботи — не лише для коду. Опишіть завдання одним реченням, наприклад _«check the Half Moon Bay cam every 10m and tell me if it's sunny»_, і OpenWork розгорне агента у вибраній вами локальній теці. Агент працює за своїм розкладом у фоні, без нагляду, і все, що він знаходить, потрапляє в одне місце: **Your Day**, поруч із вашим порядком денним, завданнями та **Agent Inbox**.

Це й далі термінальний застосунок, що працює на harness opencode: ті самі сесії, інструменти, дозволи, провайдери, локальні моделі, skills і MCP-сервери. Агенти, запуски, вхідні, завдання, порядок денний і пам'ять зберігаються локально в SQLite.

### Головне

- **Миттєве розгортання** — одне речення → тека → space → розклад → доступ. Натискайте enter на кожному кроці, і агент розгорнутий і працює за секунди.
- **Розклад звичайними словами** — англійською або португальською: `every 10m`, `hourly`, `every morning at 8`, `daily at 7:30`, `at 5pm`, `now`, `a cada 15 minutos`, `todo dia às 8h`.
- **Your Day** — порядок денний, завдання, Agent Inbox і всі агенти, згруповані за space, з останнім результатом і наступним запуском.
- **Agent Calendar** — усі запуски дня по порядку, розфарбовані за space, з масштабом від кількох хвилин до цілого дня; запуск, що працює просто зараз, обведено рамкою.
- **Без нагляду й безпечно** — запуски ніколи не зупиняються, щоб спитати: усе, що викликало б запит дозволу, відхиляється. Кожен агент має рівень доступу: `read + network`, `read + write + network` або `full`.
- **Справжні транскрипти** — кожен запуск — це справжня сесія opencode, яку можна відкрити, з викликами інструментів, токенами й вартістю.
- **Агенти, що звітують** — cowork-інструменти `inbox`, `user_todo`, `agenda`, `memory` і `deploy` дають агентам змогу писати у вхідні, додавати завдання, читати порядок денний і запам'ятовувати факти про вас. Чат може розгортати нових агентів.
- **Spaces** — групуйте агентів довкола мети, події чи клієнта.
- **Перенесення агентів між spaces** — натисніть `m` на сторінці агента, скористайтеся **+ Move an agent here...** на сторінці Spaces або попросіть у чаті.
- **Пам'ять** — факти про вас, які отримує кожен чат і кожен агент.
- **Статистика токенів** — локальні й хмарні токени рахуються окремо, швидкість витрат, денний прогноз і скільки заощаджують локальні моделі.
- **Клавіатура й миша** — `alt+1` … `alt+8` для сторінок і `ctrl+p` для всіх команд; клацайте навігацію, кнопки, рядки, прапорці й підказки клавіш; прокручуйте списки й календар коліщатком.
- **ASCII від початку до кінця** — логотип, індикатори й кільцеві діаграми намальовано блоковими символами термінала.

### Знімки екрана

<table>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/03-agents.png" alt="Agents"><br><b>Agents</b> — індикатор токенів, швидкість витрат, заощадження й живий Agent Calendar</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/04-agents-whole-day.png" alt="Agent Calendar, увесь день"><br><b>Agent Calendar</b> у масштабі всього дня</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/05-agent-detail.png" alt="Агент"><br><b>Агент</b> — виклики інструментів і результат останнього запуску</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/06-agent-running.png" alt="Агент працює"><br>Агент, який <b>працює</b> просто зараз</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/14-deploy.png" alt="Розгорнути агента"><br><b>Розгорніть</b> агента одним реченням</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/15-deploy-folder.png" alt="Розгортання: вибір теки"><br>…потім виберіть <b>теку</b>, де він працює</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/07-spaces.png" alt="Spaces"><br><b>Spaces</b> — агенти, згруповані довкола мети</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/08-chat.png" alt="Чат"><br><b>Чат</b> з агентом <code>work</code> усередині оболонки</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/10-skills.png" alt="Skills"><br><b>Skills</b> — інструкції для повторного використання</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/11-memory.png" alt="Пам'ять"><br><b>Memory</b> — що кожен чат і агент знає про вас</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/12-models.png" alt="Моделі"><br><b>Models</b> — локальні й хмарні</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/13-integrations.png" alt="Інтеграції"><br><b>Integrations</b> — MCP-сервери й облікові записи</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/02-your-day-focus.png" alt="Your Day без колонки агентів"><br><b>Your Day</b> із прихованою колонкою агентів</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/16-command-palette.png" alt="Команди"><br>Усі <b>команди</b> в палітрі (<code>ctrl+p</code>)</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/17-new-chat.png" alt="Новий чат"><br><b>New chat</b></td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/18-nav-collapsed.png" alt="Згорнута навігація"><br>Згорнута <b>навігація</b> (<code>ctrl+x w</code>)</td>
  </tr>
</table>

---

### Початок роботи

#### Встановлення

```bash
# macOS і Linux
curl -fsSL https://github.com/dedeprogames-official/openwork/releases/latest/download/install | bash
```

```powershell
# Windows (PowerShell)
irm https://github.com/dedeprogames-official/openwork/releases/latest/download/install.ps1 | iex
```

```bash
# Будь-яка ОС з Node.js 18+: npx запускає один раз, npm install -g залишає команду openwork
npx https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-cli.tgz
npm install -g https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-cli.tgz
```

Потім відкрийте теку й запустіть `openwork`. `openwork upgrade` оновлює до останнього релізу, а `openwork uninstall` видаляє його.

#### Завантаження

| Платформа                | Файл                                                                                                                                          |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Linux x64                | [`openwork-linux-x64.tar.gz`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-linux-x64.tar.gz)           |
| Linux arm64              | [`openwork-linux-arm64.tar.gz`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-linux-arm64.tar.gz)       |
| Linux x64 (musl, Alpine) | [`openwork-linux-x64-musl.tar.gz`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-linux-x64-musl.tar.gz) |
| macOS Apple Silicon      | [`openwork-darwin-arm64.zip`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-darwin-arm64.zip)           |
| macOS Intel              | [`openwork-darwin-x64.zip`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-darwin-x64.zip)               |
| Windows x64              | [`openwork-windows-x64.zip`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-windows-x64.zip)             |
| Windows arm64            | [`openwork-windows-arm64.zip`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-windows-arm64.zip)         |

Усі версії — на [сторінці релізів](https://github.com/dedeprogames-official/openwork/releases). У кожному архіві є бінарник `openwork`; збірки `-baseline` — для x64-процесорів без AVX2, `-musl` — для Alpine, і інсталятори обирають потрібну самі. Бінарники для macOS підписані ad hoc, без нотаризації: після завантаження zip через браузер один раз виконайте `xattr -d com.apple.quarantine openwork`.

#### Windows

Інсталятор для PowerShell кладе `openwork.exe` у `%USERPROFILE%\.openwork\bin` і додає теку до PATH: відкрийте новий термінал і запустіть `openwork`. Найкраще працює у Windows Terminal (truecolor і миша). Можна також розпакувати `openwork-windows-x64.zip` будь-куди й запустити `openwork.exe` або скористатися `npx`, як вище.

#### Запуск із вихідного коду

**Вимоги:** [Bun](https://bun.sh) 1.3 або новіший, git і термінал з truecolor та підтримкою миші (xfce4-terminal, GNOME Terminal, Konsole, kitty, WezTerm, Ghostty, iTerm2, Windows Terminal…). Моделі: будь-який провайдер, якого підтримує opencode, або локальна модель через Ollama, LM Studio, llama.cpp чи vLLM.

```bash
git clone https://github.com/dedeprogames-official/openwork.git
cd openwork
bun install
bun dev ~/work        # тека, у якій відкриється OpenWork
```

`bun dev .` відкриває поточну теку; просто `bun dev` відкриває `packages/opencode`.

#### Збирання автономного бінарника

```bash
./packages/opencode/script/build.ts --single
./packages/opencode/dist/opencode-linux-x64/bin/opencode    # або opencode-darwin-arm64, …
```

Пакет встановлює той самий бінарник під іменами `opencode` і `openwork`.

#### Перші п'ять хвилин

1. **Підключіть модель** — `/connect` або відкрийте **Models** (`alt+7`) і натисніть `c`. Про локальні моделі — у розділі [Локальні моделі](#local-models).
2. **Завантажте демо** — `/demo` створює 6 spaces, 17 агентів, день історії запусків, skills, повідомлення у вхідних, завдання й порядок денний. Агенти стартують на паузі, щоб не витрачати токени; `/pause` дозволяє їм працювати.
3. **Розгорніть свого** — `ctrl+x d` або введіть `/deploy check the weather in Lisbon every morning at 7 and tell me if I need an umbrella` (розклад — англійською чи португальською, завдання — будь-якою мовою).
4. **Читайте Your Day** — `alt+1`. Результати надходять в Agent Inbox; відкрийте агента, щоб побачити його запуски або обговорити його роботу в чаті.

### Розгортання агентів

Агент — це завдання, тека для роботи, розклад і рівень доступу, а за бажанням ще й skill. Він працює на моделі, вибраній у момент розгортання. Розгортайте через `ctrl+x d`, `/deploy <що і коли>`, кнопку **+ Create Agent** на сторінці Agents, зі space або попросивши про це в чаті.

| Ви пишете                                                               | Розклад                                                  |
| ----------------------------------------------------------------------- | -------------------------------------------------------- |
| `every 10m`, `every 2 hours`, `a cada 15 minutos`                       | кожні N хвилин, годин або днів (щонайменше 1 хвилина)    |
| `hourly`, `every hour`, `every minute`                                  | щогодини або щохвилини                                   |
| `daily at 9am`, `every morning at 8`, `every evening`, `todo dia às 8h` | щодня в цей час (ранок 08:00, вечір 18:00, інакше 09:00) |
| `at 5pm`, `às 17h`                                                      | один раз, найближчої 17:00                               |
| `now`, `once` — або без слів про час                                    | один раз, одразу                                         |

Крок розкладу пропонує й **on demand**: агент запускається, лише коли ви натискаєте **Run now**.

| Доступ                   | Агент може                                                               |
| ------------------------ | ------------------------------------------------------------------------ |
| `read + network`         | читати файли, користуватися інтернетом, писати у вхідні                  |
| `read + write + network` | також створювати й редагувати файли у своїй теці                         |
| `full`                   | використовувати всі дозволені вами інструменти, зокрема команди оболонки |

Запуски йдуть без нагляду: запитання й усе, що викликало б запит дозволу, відхиляються, а запуск зупиняється через 15 хвилин. Кожен запуск — це сесія з назвою `<агент> · run #N`; натисніть `o` на сторінці агента, щоб відкрити транскрипт.

### Сторінки

| Сторінка     | Клавіша | Показує                                                                                                                  |
| ------------ | ------- | ------------------------------------------------------------------------------------------------------------------------ |
| Your Day     | `alt+1` | Порядок денний, завдання, Agent Inbox, поле чату й усіх агентів, згрупованих за space, з останнім і наступним запуском.  |
| Chats        | `alt+2` | Ваші чати; запуски агентів до списку не потрапляють.                                                                     |
| Spaces       | `alt+3` | Spaces з їхніми агентами й пунктами порядку денного.                                                                     |
| Agents       | `alt+4` | Індикатор токенів, швидкість витрат, заощадження, куди йдуть токени, і Agent Calendar.                                   |
| Agent        | `enter` | Одного агента: завдання, розклад, доступ, виклики інструментів і результат кожного запуску, історію та його власний чат. |
| Skills       | `alt+5` | Skills з `.opencode/skills` і `~/.agents/skills`.                                                                        |
| Memory       | `alt+6` | Що чати й агенти знають про вас.                                                                                         |
| Models       | `alt+7` | Локальні й хмарні моделі; локальні токени рахуються окремо в картці Usage.                                               |
| Integrations | `alt+8` | MCP-сервери й підключені облікові записи.                                                                                |

### Клавіатура й миша

| Клавіші           | Дія                                                                                             |
| ----------------- | ----------------------------------------------------------------------------------------------- |
| `alt+1` … `alt+8` | перемикання сторінок                                                                            |
| `ctrl+x d`        | розгорнути агента                                                                               |
| `ctrl+x w`        | згорнути або розгорнути навігацію                                                               |
| `m`               | перенести агента в інший space (на його сторінці) або додати агента до вибраного space (Spaces) |
| `ctrl+p`          | палітра команд                                                                                  |
| `c`               | фокус на полі чату (`esc` — вихід)                                                              |
| `esc`             | назад                                                                                           |

Кожна сторінка показує свої клавіші внизу. Слеш-команди: `/day`, `/chats`, `/spaces`, `/agents`, `/skills`, `/memory`, `/models`, `/integrations`, `/deploy <текст>`, `/pause`, `/demo`, `/connect`.

Усе працює й мишею: клацайте навігацію, кнопки й підказки клавіш; у списках перше клацання вибирає рядок, друге відкриває його; прапорці перемикаються одразу; коліщатко прокручує списки й Agent Calendar. Перетягування, як і раніше, виділяє й копіює текст.

<a id="local-models"></a>

### Локальні моделі

Будь-який OpenAI-сумісний сервер на `localhost` вважається локальним, як і провайдери `ollama`, `lmstudio`, `llamacpp` і `vllm`. Наприклад, з Ollama, в `opencode.json` (у вашій теці або в `~/.config/openwork/`):

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

### Як це працює

- Планувальник живе в серверному процесі OpenWork. Кожні 5 секунд він шукає агентів, яким час запускатися, і виконує до 3 одночасно. Захоплення запуску атомарне в SQLite, тому кілька вікон OpenWork ніколи не запустять одного агента двічі, а запуски, що лишилися після збою, позначаються як перервані. `OPENCODE_DISABLE_WORK_SCHEDULER=1` вимикає його.
- Кожен запуск — це сесія opencode з агентом `work` — персоною для інтелектуальної роботи, для якої теки — це робочі простори, а файли — результати, — з вашою пам'яттю й нещодавніми результатами агента в системному контексті та дозволами без нагляду для його рівня доступу.
- OpenWork зберігає конфігурацію opencode: `opencode.json`, `.opencode/`, змінні `OPENCODE_*`, провайдери, MCP-сервери й skills працюють як раніше.
- OpenWork зберігає свої дані в `~/.local/share/openwork`, а глобальну конфігурацію — в `~/.config/openwork`, окремо від встановленого opencode, і оновлюється лише з власних релізів на GitHub.

| Де                                                      | Що                                                              |
| ------------------------------------------------------- | --------------------------------------------------------------- |
| `packages/schema/src/work.ts`                           | записи, вхідні дані й подія `work.updated`                      |
| `packages/core/src/work.ts`, `packages/core/src/work/`  | таблиці SQLite, сховище `Work` і розбір розкладів               |
| `packages/opencode/src/work/`                           | планувальник, дозволи без нагляду, контекст запусків, демо      |
| `packages/opencode/src/tool/`                           | інструменти `inbox`, `user_todo`, `agenda`, `memory` і `deploy` |
| `packages/opencode/src/server/routes/instance/httpapi/` | HTTP API `/work/*`                                              |
| `packages/tui/src/work/`                                | оболонка, навігація, сторінки й діалог розгортання              |

Повний посібник — у [docs/openwork](docs/openwork/README.md).

### Розробка

```bash
bun install
bun dev ~/work

# перевірки запускаються з теки пакета, ніколи з кореня репозиторію
(cd packages/tui && bun typecheck && bun test)
(cd packages/opencode && bun typecheck && bun test test/work)
```

Знімки екрана генеруються зі справжнього TUI з офлайн-моделлю. З `--window linux` кожен — це фото справжнього вікна X11 (Xvfb, віконний менеджер xfwm4 і xfce4-terminal):

```bash
sudo apt-get install tmux python3-pil xvfb dbus-x11 xfwm4 xfce4-terminal greybird-gtk-theme xdotool imagemagick fonts-dejavu-core
cd packages/opencode
TZ=Europe/London bun script/openwork/screenshots.ts --window linux --out ../../docs/openwork/screenshots
```

Виберіть `TZ`, де зараз кінець дня: історія запусків демо починається о 06:00 за місцевим часом.

### Подяки й ліцензія

OpenWork побудовано на [opencode](https://github.com/anomalyco/opencode), і він зберігає його [ліцензію MIT](LICENSE). Його не розробляє команда opencode, і він з нею не пов'язаний. Внески вітаються — див. [CONTRIBUTING.md](CONTRIBUTING.md).
