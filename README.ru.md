<p align="center">
  <picture>
    <source srcset="docs/openwork/logo-dark.svg" media="(prefers-color-scheme: dark)">
    <source srcset="docs/openwork/logo-light.svg" media="(prefers-color-scheme: light)">
    <img src="docs/openwork/logo-light.svg" alt="Логотип OpenWork" width="480">
  </picture>
</p>
<p align="center"><strong>Разворачивайте агентов в своих папках. Они работают по расписанию. Результаты вы читаете в Your Day.</strong></p>
<p align="center">Рабочий режим для терминала, построенный на harness opencode.</p>
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

[![OpenWork — Your Day в окне терминала в Linux](docs/openwork/screenshots/01-your-day.png)](docs/openwork/README.md)

<p align="center"><sub>Все скриншоты здесь — настоящий TUI OpenWork в xfce4-terminal в Linux (Xfce, тема Greybird) с демо-пространством и офлайн-моделью.</sub></p>

---

### Что такое OpenWork?

OpenWork превращает терминальный интерфейс opencode в место для работы — не только для кода. Опишите задачу одним предложением, например _«check the Half Moon Bay cam every 10m and tell me if it's sunny»_, и OpenWork развернёт агента в выбранной вами локальной папке. Агент работает по своему расписанию в фоне, без присмотра, и всё, что он находит, попадает в одно место: **Your Day**, рядом с вашей повесткой, задачами и **Agent Inbox**.

Это по-прежнему терминальное приложение, работающее на harness opencode: те же сессии, инструменты, разрешения, провайдеры, локальные модели, skills и MCP-серверы. Агенты, запуски, входящие, задачи, повестка и память хранятся локально в SQLite.

### Главное

- **Мгновенное развёртывание** — одно предложение → папка → space → расписание → доступ. Нажимайте enter на каждом шаге, и агент развёрнут и работает за секунды.
- **Расписание обычными словами** — на английском или португальском: `every 10m`, `hourly`, `every morning at 8`, `daily at 7:30`, `at 5pm`, `now`, `a cada 15 minutos`, `todo dia às 8h`.
- **Your Day** — повестка, задачи, Agent Inbox и все агенты, сгруппированные по space, с последним результатом и следующим запуском.
- **Agent Calendar** — все запуски дня по порядку, раскрашенные по space, с масштабом от нескольких минут до целого дня; запуск, который работает прямо сейчас, обведён рамкой.
- **Без присмотра и безопасно** — запуски никогда не останавливаются, чтобы спросить: всё, что вызвало бы запрос разрешения, отклоняется. У каждого агента есть уровень доступа: `read + network`, `read + write + network` или `full`.
- **Настоящие транскрипты** — каждый запуск — это настоящая сессия opencode, которую можно открыть, с вызовами инструментов, токенами и стоимостью.
- **Агенты, которые отчитываются** — cowork-инструменты `inbox`, `user_todo`, `agenda`, `memory` и `deploy` позволяют агентам писать во входящие, добавлять задачи, читать повестку и запоминать факты о вас. Чат может разворачивать новых агентов.
- **Spaces** — группируйте агентов вокруг цели, события или клиента.
- **Память** — факты о вас, которые получает каждый чат и каждый агент.
- **Статистика токенов** — локальные и облачные токены считаются отдельно, скорость расхода, дневной прогноз и сколько экономят локальные модели.
- **Клавиатура и мышь** — `alt+1` … `alt+8` для страниц и `ctrl+p` для всех команд; кликайте по навигации, кнопкам, строкам, флажкам и подсказкам клавиш; прокручивайте списки и календарь колёсиком.
- **ASCII от начала до конца** — логотип, индикаторы и кольцевые диаграммы нарисованы блочными символами терминала.

### Скриншоты

<table>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/03-agents.png" alt="Agents"><br><b>Agents</b> — индикатор токенов, скорость расхода, экономия и живой Agent Calendar</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/04-agents-whole-day.png" alt="Agent Calendar, весь день"><br><b>Agent Calendar</b> в масштабе всего дня</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/05-agent-detail.png" alt="Агент"><br><b>Агент</b> — вызовы инструментов и результат последнего запуска</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/06-agent-running.png" alt="Агент в работе"><br>Агент, который <b>работает</b> прямо сейчас</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/14-deploy.png" alt="Развернуть агента"><br><b>Разверните</b> агента одним предложением</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/15-deploy-folder.png" alt="Развёртывание: выбор папки"><br>…затем выберите <b>папку</b>, где он работает</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/07-spaces.png" alt="Spaces"><br><b>Spaces</b> — агенты, сгруппированные вокруг цели</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/08-chat.png" alt="Чат"><br><b>Чат</b> с агентом <code>work</code> внутри оболочки</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/10-skills.png" alt="Skills"><br><b>Skills</b> — переиспользуемые инструкции</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/11-memory.png" alt="Память"><br><b>Memory</b> — что каждый чат и агент знает о вас</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/12-models.png" alt="Модели"><br><b>Models</b> — локальные и облачные</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/13-integrations.png" alt="Интеграции"><br><b>Integrations</b> — MCP-серверы и аккаунты</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/02-your-day-focus.png" alt="Your Day без колонки агентов"><br><b>Your Day</b> со скрытой колонкой агентов</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/16-command-palette.png" alt="Команды"><br>Все <b>команды</b> в палитре (<code>ctrl+p</code>)</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/17-new-chat.png" alt="Новый чат"><br><b>New chat</b></td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/18-nav-collapsed.png" alt="Свёрнутая навигация"><br>Свёрнутая <b>навигация</b> (<code>ctrl+x w</code>)</td>
  </tr>
</table>

---

### Начало работы

**Требования:** [Bun](https://bun.sh) 1.3 или новее, git и терминал с truecolor и поддержкой мыши (xfce4-terminal, GNOME Terminal, Konsole, kitty, WezTerm, Ghostty, iTerm2, Windows Terminal…). Модели: любой провайдер, который поддерживает opencode, или локальная модель через Ollama, LM Studio, llama.cpp или vLLM.

#### Запуск из исходников

```bash
git clone https://github.com/dedeprogames-official/openwork.git
cd openwork
bun install
bun dev ~/work        # папка, в которой откроется OpenWork
```

`bun dev .` открывает текущую папку; просто `bun dev` открывает `packages/opencode`.

#### Сборка автономного бинарника

```bash
./packages/opencode/script/build.ts --single
./packages/opencode/dist/opencode-linux-x64/bin/opencode    # или opencode-darwin-arm64, …
```

Пакет устанавливает один и тот же бинарник под именами `opencode` и `openwork`.

#### Первые пять минут

1. **Подключите модель** — `/connect` или откройте **Models** (`alt+7`) и нажмите `c`. Про локальные модели — в разделе [Локальные модели](#local-models).
2. **Загрузите демо** — `/demo` создаёт 6 spaces, 17 агентов, день истории запусков, skills, сообщения во входящих, задачи и повестку. Агенты стартуют на паузе, чтобы не тратить токены; `/pause` позволяет им работать.
3. **Разверните своего** — `ctrl+x d` или наберите `/deploy check the weather in Lisbon every morning at 7 and tell me if I need an umbrella` (расписание — на английском или португальском, задача — на любом языке).
4. **Читайте Your Day** — `alt+1`. Результаты приходят в Agent Inbox; откройте агента, чтобы увидеть его запуски или обсудить его работу в чате.

### Развёртывание агентов

Агент — это задача, папка для работы, расписание и уровень доступа, а также, по желанию, skill. Он работает на модели, выбранной в момент развёртывания. Разворачивайте через `ctrl+x d`, `/deploy <что и когда>`, кнопку **+ Create Agent** на странице Agents, из space или попросив об этом в чате.

| Вы пишете                                                               | Расписание                                                     |
| ----------------------------------------------------------------------- | -------------------------------------------------------------- |
| `every 10m`, `every 2 hours`, `a cada 15 minutos`                       | каждые N минут, часов или дней (минимум 1 минута)              |
| `hourly`, `every hour`, `every minute`                                  | каждый час или каждую минуту                                   |
| `daily at 9am`, `every morning at 8`, `every evening`, `todo dia às 8h` | каждый день в это время (утро 08:00, вечер 18:00, иначе 09:00) |
| `at 5pm`, `às 17h`                                                      | один раз, в ближайшие 17:00                                    |
| `now`, `once` — или без слов о времени                                  | один раз, сразу                                                |

Шаг расписания предлагает и **on demand**: агент запускается, только когда вы нажимаете **Run now**.

| Доступ                   | Агент может                                                             |
| ------------------------ | ----------------------------------------------------------------------- |
| `read + network`         | читать файлы, пользоваться интернетом, писать во входящие               |
| `read + write + network` | также создавать и редактировать файлы в своей папке                     |
| `full`                   | использовать все разрешённые вами инструменты, включая команды оболочки |

Запуски идут без присмотра: вопросы и всё, что вызвало бы запрос разрешения, отклоняются, а запуск останавливается через 15 минут. Каждый запуск — это сессия с именем `<агент> · run #N`; нажмите `o` на странице агента, чтобы открыть транскрипт.

### Страницы

| Страница     | Клавиша | Показывает                                                                                                                 |
| ------------ | ------- | -------------------------------------------------------------------------------------------------------------------------- |
| Your Day     | `alt+1` | Повестку, задачи, Agent Inbox, поле чата и всех агентов, сгруппированных по space, с последним и следующим запуском.       |
| Chats        | `alt+2` | Ваши чаты; запуски агентов в список не попадают.                                                                           |
| Spaces       | `alt+3` | Spaces с их агентами и пунктами повестки.                                                                                  |
| Agents       | `alt+4` | Индикатор токенов, скорость расхода, экономию, куда уходят токены, и Agent Calendar.                                       |
| Agent        | `enter` | Одного агента: задачу, расписание, доступ, вызовы инструментов и результат каждого запуска, историю и его собственный чат. |
| Skills       | `alt+5` | Skills из `.opencode/skills` и `~/.agents/skills`.                                                                         |
| Memory       | `alt+6` | Что чаты и агенты знают о вас.                                                                                             |
| Models       | `alt+7` | Локальные и облачные модели; локальные токены считаются отдельно в карточке Usage.                                         |
| Integrations | `alt+8` | MCP-серверы и подключённые аккаунты.                                                                                       |

### Клавиатура и мышь

| Клавиши           | Действие                           |
| ----------------- | ---------------------------------- |
| `alt+1` … `alt+8` | переключение страниц               |
| `ctrl+x d`        | развернуть агента                  |
| `ctrl+x w`        | свернуть или развернуть навигацию  |
| `ctrl+p`          | палитра команд                     |
| `c`               | фокус на поле чата (`esc` — выход) |
| `esc`             | назад                              |

Каждая страница показывает свои клавиши внизу. Слэш-команды: `/day`, `/chats`, `/spaces`, `/agents`, `/skills`, `/memory`, `/models`, `/integrations`, `/deploy <текст>`, `/pause`, `/demo`, `/connect`.

Всё работает и мышью: кликайте по навигации, кнопкам и подсказкам клавиш; в списках первый клик выбирает строку, второй открывает её; флажки переключаются сразу; колёсико прокручивает списки и Agent Calendar. Перетаскивание по-прежнему выделяет и копирует текст.

<a id="local-models"></a>

### Локальные модели

Любой OpenAI-совместимый сервер на `localhost` считается локальным, как и провайдеры `ollama`, `lmstudio`, `llamacpp` и `vllm`. Например, с Ollama, в `opencode.json` (в вашей папке или в `~/.config/opencode/`):

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

### Как это работает

- Планировщик живёт в серверном процессе OpenWork. Каждые 5 секунд он ищет агентов, которым пора запускаться, и выполняет до 3 одновременно. Захват запуска атомарен в SQLite, поэтому несколько окон OpenWork никогда не запустят одного агента дважды, а запуски, оставшиеся после сбоя, помечаются как прерванные. `OPENCODE_DISABLE_WORK_SCHEDULER=1` отключает его.
- Каждый запуск — это сессия opencode с агентом `work` — персоной для интеллектуальной работы, для которой папки — это рабочие пространства, а файлы — результаты, — с вашей памятью и недавними результатами агента в системном контексте и разрешениями без присмотра для его уровня доступа.
- OpenWork сохраняет конфигурацию opencode: `opencode.json`, `.opencode/`, переменные `OPENCODE_*`, провайдеры, MCP-серверы и skills работают как прежде.

| Где                                                     | Что                                                             |
| ------------------------------------------------------- | --------------------------------------------------------------- |
| `packages/schema/src/work.ts`                           | записи, входные данные и событие `work.updated`                 |
| `packages/core/src/work.ts`, `packages/core/src/work/`  | таблицы SQLite, хранилище `Work` и разбор расписаний            |
| `packages/opencode/src/work/`                           | планировщик, разрешения без присмотра, контекст запусков, демо  |
| `packages/opencode/src/tool/`                           | инструменты `inbox`, `user_todo`, `agenda`, `memory` и `deploy` |
| `packages/opencode/src/server/routes/instance/httpapi/` | HTTP API `/work/*`                                              |
| `packages/tui/src/work/`                                | оболочка, навигация, страницы и диалог развёртывания            |

Полное руководство — в [docs/openwork](docs/openwork/README.md).

### Разработка

```bash
bun install
bun dev ~/work

# проверки запускаются из каталога пакета, никогда из корня репозитория
(cd packages/tui && bun typecheck && bun test)
(cd packages/opencode && bun typecheck && bun test test/work)
```

Скриншоты генерируются из настоящего TUI с офлайн-моделью. С `--window linux` каждый — это фотография настоящего окна X11 (Xvfb, оконный менеджер xfwm4 и xfce4-terminal):

```bash
sudo apt-get install tmux python3-pil xvfb dbus-x11 xfwm4 xfce4-terminal greybird-gtk-theme xdotool imagemagick fonts-dejavu-core
cd packages/opencode
TZ=Europe/London bun script/openwork/screenshots.ts --window linux --out ../../docs/openwork/screenshots
```

Выберите `TZ`, где сейчас конец дня: история запусков демо начинается в 06:00 по местному времени.

### Благодарности и лицензия

OpenWork построен на [opencode](https://github.com/anomalyco/opencode) и сохраняет его [лицензию MIT](LICENSE). Он не разрабатывается командой opencode и не связан с ней. Вклад приветствуется — см. [CONTRIBUTING.md](CONTRIBUTING.md).
