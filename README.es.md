<p align="center">
  <picture>
    <source srcset="docs/openwork/logo-dark.svg" media="(prefers-color-scheme: dark)">
    <source srcset="docs/openwork/logo-light.svg" media="(prefers-color-scheme: light)">
    <img src="docs/openwork/logo-light.svg" alt="Logo de OpenWork" width="480">
  </picture>
</p>
<p align="center"><strong>Despliega agentes en tus carpetas. Trabajan según un horario. Tú lees los resultados en Your Day.</strong></p>
<p align="center">Un modo de trabajo para la terminal, construido sobre el harness de opencode.</p>
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

[![OpenWork — Your Day en una ventana de terminal en Linux](docs/openwork/screenshots/01-your-day.png)](docs/openwork/README.md)

<p align="center"><sub>Todas las capturas son el TUI real de OpenWork en xfce4-terminal sobre Linux (Xfce, tema Greybird), ejecutando el espacio de trabajo de demostración con un modelo sin conexión.</sub></p>

---

### ¿Qué es OpenWork?

OpenWork convierte la interfaz de terminal de opencode en un lugar para trabajar, no solo para programar. Describe una tarea en una frase, como _“check the Half Moon Bay cam every 10m and tell me if it's sunny”_, y OpenWork despliega un agente en la carpeta local que elijas. El agente se ejecuta según su horario en segundo plano, sin supervisión, y todo lo que encuentra llega a un solo lugar: **Your Day**, junto a tu agenda, tus tareas y la **Agent Inbox**.

Sigue siendo una aplicación de terminal y sigue funcionando sobre el harness de opencode: las mismas sesiones, herramientas, permisos, proveedores, modelos locales, skills y servidores MCP. Agentes, ejecuciones, bandeja, tareas, agenda y memoria se guardan localmente en SQLite.

### Lo más destacado

- **Despliegue instantáneo** — una frase → carpeta → espacio → horario → acceso. Pulsa enter en cada paso y el agente queda desplegado y ejecutándose en segundos.
- **Horarios en lenguaje natural** — en inglés o portugués: `every 10m`, `hourly`, `every morning at 8`, `daily at 7:30`, `at 5pm`, `now`, `a cada 15 minutos`, `todo dia às 8h`.
- **Your Day** — agenda, tareas, la Agent Inbox y todos los agentes agrupados por espacio, con su último resultado y su próxima ejecución.
- **Agent Calendar** — todas las ejecuciones del día en orden, coloreadas por espacio, con zoom desde unos minutos hasta el día entero, y la ejecución que está trabajando ahora resaltada con un contorno.
- **Sin supervisión y seguro** — las ejecuciones nunca se detienen a preguntar: todo lo que mostraría una solicitud de permiso se deniega. Cada agente tiene un nivel de acceso: `read + network`, `read + write + network` o `full`.
- **Transcripciones reales** — cada ejecución es una sesión real de opencode que puedes abrir, con sus llamadas a herramientas, tokens y coste.
- **Agentes que informan** — las herramientas de cowork `inbox`, `user_todo`, `agenda`, `memory` y `deploy` permiten a los agentes publicar en tu bandeja, añadir tareas, leer tu agenda y recordar datos sobre ti. Un chat puede desplegar nuevos agentes.
- **Spaces** — agrupa agentes en torno a un objetivo, un evento o un cliente.
- **Mueve agentes entre espacios** — pulsa `m` en la página del agente, usa **+ Move an agent here...** en la página Spaces o pídelo en un chat.
- **Memoria** — datos sobre ti que reciben todos los chats y todos los agentes.
- **Estadísticas de tokens** — tokens locales y en la nube contados por separado, ritmo de consumo, proyección diaria y cuánto te ahorran los modelos locales.
- **Teclado y ratón** — `alt+1` … `alt+8` para las páginas y `ctrl+p` para todos los comandos; haz clic en la navegación, botones, filas, casillas y atajos; desplaza listas y el calendario con la rueda.
- **ASCII de principio a fin** — el logo, los indicadores y los gráficos de anillo se dibujan con caracteres de bloque de la terminal.

### Capturas de pantalla

<table>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/03-agents.png" alt="Agents"><br><b>Agents</b> — indicador de tokens, ritmo de consumo, ahorro y el Agent Calendar en vivo</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/04-agents-whole-day.png" alt="Agent Calendar, día entero"><br><b>Agent Calendar</b> con el día entero</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/05-agent-detail.png" alt="Agente"><br><b>Agente</b> — las llamadas a herramientas y el resultado de su última ejecución</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/06-agent-running.png" alt="Agente en ejecución"><br>Un agente <b>ejecutándose</b> ahora mismo</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/14-deploy.png" alt="Desplegar un agente"><br><b>Despliega</b> un agente con una frase</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/15-deploy-folder.png" alt="Desplegar: elegir carpeta"><br>…y elige la <b>carpeta</b> donde trabaja</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/07-spaces.png" alt="Spaces"><br><b>Spaces</b> — agentes agrupados en torno a un objetivo</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/08-chat.png" alt="Chat"><br>Un <b>chat</b> con el agente <code>work</code>, dentro del shell</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/10-skills.png" alt="Skills"><br><b>Skills</b> — instrucciones reutilizables</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/11-memory.png" alt="Memoria"><br><b>Memory</b> — lo que cada chat y agente sabe de ti</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/12-models.png" alt="Modelos"><br><b>Models</b> — locales y en la nube</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/13-integrations.png" alt="Integraciones"><br><b>Integrations</b> — servidores MCP y cuentas</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/02-your-day-focus.png" alt="Your Day sin la columna de agentes"><br><b>Your Day</b> con la columna de agentes oculta</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/16-command-palette.png" alt="Comandos"><br>Todos los <b>comandos</b> en la paleta (<code>ctrl+p</code>)</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/17-new-chat.png" alt="Nuevo chat"><br><b>New chat</b></td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/18-nav-collapsed.png" alt="Navegación contraída"><br><b>Navegación</b> contraída (<code>ctrl+x w</code>)</td>
  </tr>
</table>

---

### Primeros pasos

#### Instalación

```bash
# macOS y Linux
curl -fsSL https://github.com/dedeprogames-official/openwork/releases/latest/download/install | bash
```

```powershell
# Windows (PowerShell)
irm https://github.com/dedeprogames-official/openwork/releases/latest/download/install.ps1 | iex
```

```bash
# Cualquier sistema con Node.js 18+: npx lo ejecuta una vez, npm install -g deja instalado el comando openwork
npx https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-cli.tgz
npm install -g https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-cli.tgz
```

Después abre una carpeta y ejecuta `openwork`. `openwork upgrade` lo actualiza a la última versión y `openwork uninstall` lo elimina.

#### Descargas

| Plataforma               | Descarga                                                                                                                                      |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Linux x64                | [`openwork-linux-x64.tar.gz`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-linux-x64.tar.gz)           |
| Linux arm64              | [`openwork-linux-arm64.tar.gz`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-linux-arm64.tar.gz)       |
| Linux x64 (musl, Alpine) | [`openwork-linux-x64-musl.tar.gz`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-linux-x64-musl.tar.gz) |
| macOS Apple Silicon      | [`openwork-darwin-arm64.zip`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-darwin-arm64.zip)           |
| macOS Intel              | [`openwork-darwin-x64.zip`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-darwin-x64.zip)               |
| Windows x64              | [`openwork-windows-x64.zip`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-windows-x64.zip)             |
| Windows arm64            | [`openwork-windows-arm64.zip`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-windows-arm64.zip)         |

Todas las versiones están en la [página de releases](https://github.com/dedeprogames-official/openwork/releases). Cada archivo contiene el binario `openwork`; las builds `-baseline` son para CPU x64 sin AVX2 y las `-musl` para Alpine, y los instaladores eligen la adecuada. Los binarios de macOS están firmados ad hoc, sin notarizar: tras descargar un zip con el navegador, ejecuta `xattr -d com.apple.quarantine openwork` una vez.

#### Windows

El instalador de PowerShell coloca `openwork.exe` en `%USERPROFILE%\.openwork\bin` y lo añade a tu PATH: abre una terminal nueva y ejecuta `openwork`. Windows Terminal da el mejor resultado (truecolor y ratón). También puedes descomprimir `openwork-windows-x64.zip` donde quieras y ejecutar `openwork.exe`, o usar `npx` como arriba.

#### Ejecutar desde el código fuente

**Requisitos:** [Bun](https://bun.sh) 1.3 o posterior, git y una terminal con truecolor y soporte de ratón (xfce4-terminal, GNOME Terminal, Konsole, kitty, WezTerm, Ghostty, iTerm2, Windows Terminal…). Para los modelos: cualquier proveedor compatible con opencode, o un modelo local servido por Ollama, LM Studio, llama.cpp o vLLM.

```bash
git clone https://github.com/dedeprogames-official/openwork.git
cd openwork
bun install
bun dev ~/work        # la carpeta en la que se abre OpenWork
```

`bun dev .` abre la carpeta actual; `bun dev` solo abre `packages/opencode`.

#### Compilar un binario independiente

```bash
./packages/opencode/script/build.ts --single
./packages/opencode/dist/opencode-linux-x64/bin/opencode    # u opencode-darwin-arm64, …
```

El paquete instala el mismo binario como `opencode` y como `openwork`.

#### Tus primeros cinco minutos

1. **Conecta un modelo** — `/connect`, o abre **Models** (`alt+7`) y pulsa `c`. Para modelos locales consulta [Modelos locales](#local-models).
2. **Carga la demo** — `/demo` crea 6 espacios, 17 agentes, un día de historial de ejecuciones, skills, mensajes en la bandeja, tareas y una agenda. Sus agentes empiezan en pausa para no gastar tokens; `/pause` los deja ejecutarse.
3. **Despliega el tuyo** — `ctrl+x d`, o escribe `/deploy check the weather in Lisbon every morning at 7 and tell me if I need an umbrella` (el horario se escribe en inglés o portugués; la tarea, en cualquier idioma).
4. **Lee Your Day** — `alt+1`. Los resultados llegan a la Agent Inbox; abre un agente para ver sus ejecuciones o para hablar de su trabajo.

### Desplegar agentes

Un agente es una tarea, una carpeta donde trabajar, un horario y un nivel de acceso, y opcionalmente una skill. Se ejecuta con el modelo que estaba seleccionado cuando lo desplegaste. Despliega con `ctrl+x d`, `/deploy <qué y cuándo>`, el botón **+ Create Agent** de la página Agents, desde un espacio o pidiéndolo en un chat.

| Escribes                                                                | Horario                                                      |
| ----------------------------------------------------------------------- | ------------------------------------------------------------ |
| `every 10m`, `every 2 hours`, `a cada 15 minutos`                       | cada N minutos, horas o días (mínimo 1 minuto)               |
| `hourly`, `every hour`, `every minute`                                  | cada hora o cada minuto                                      |
| `daily at 9am`, `every morning at 8`, `every evening`, `todo dia às 8h` | cada día a esa hora (mañana 08:00, tarde 18:00, si no 09:00) |
| `at 5pm`, `às 17h`                                                      | una vez, en las próximas 17:00                               |
| `now`, `once` — o ninguna palabra de tiempo                             | una vez, enseguida                                           |

El paso del horario también ofrece **on demand**: el agente solo se ejecuta cuando pulsas **Run now**.

| Acceso                   | El agente puede                                                       |
| ------------------------ | --------------------------------------------------------------------- |
| `read + network`         | leer archivos, navegar por la web, publicar en tu bandeja             |
| `read + write + network` | además crear y editar archivos en su carpeta                          |
| `full`                   | usar todas las herramientas que permitas, incluidos comandos de shell |

Las ejecuciones no tienen supervisión: las preguntas y todo lo que mostraría una solicitud de permiso se deniegan, y una ejecución se detiene a los 15 minutos. Cada ejecución es una sesión llamada `<agente> · run #N`; pulsa `o` en la página del agente para abrir su transcripción.

### Páginas

| Página       | Tecla   | Muestra                                                                                                                      |
| ------------ | ------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Your Day     | `alt+1` | Agenda, tareas, Agent Inbox, un prompt de chat y todos los agentes agrupados por espacio con su última y próxima ejecución.  |
| Chats        | `alt+2` | Tus chats; las ejecuciones de agentes quedan fuera de la lista.                                                              |
| Spaces       | `alt+3` | Espacios con sus agentes y elementos de agenda.                                                                              |
| Agents       | `alt+4` | Indicador de tokens, ritmo de consumo, ahorro, a dónde van los tokens y el Agent Calendar.                                   |
| Agent        | `enter` | Un agente: tarea, horario, acceso, las llamadas a herramientas y el resultado de cada ejecución, historial y su propio chat. |
| Skills       | `alt+5` | Skills de `.opencode/skills` y `~/.agents/skills`.                                                                           |
| Memory       | `alt+6` | Lo que los chats y los agentes saben de ti.                                                                                  |
| Models       | `alt+7` | Modelos locales y en la nube; los tokens locales se cuentan aparte en la tarjeta Usage.                                      |
| Integrations | `alt+8` | Servidores MCP y cuentas conectadas.                                                                                         |

### Teclado y ratón

| Teclas            | Acción                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------ |
| `alt+1` … `alt+8` | cambiar de página                                                                          |
| `ctrl+x d`        | desplegar un agente                                                                        |
| `ctrl+x w`        | contraer o expandir la navegación                                                          |
| `m`               | mover el agente a otro espacio (en su página) o traer uno al espacio seleccionado (Spaces) |
| `ctrl+p`          | paleta de comandos                                                                         |
| `c`               | enfocar el prompt de chat (`esc` lo deja)                                                  |
| `esc`             | volver                                                                                     |

Cada página muestra sus propias teclas abajo. Comandos de barra: `/day`, `/chats`, `/spaces`, `/agents`, `/skills`, `/memory`, `/models`, `/integrations`, `/deploy <texto>`, `/pause`, `/demo`, `/connect`.

Todo funciona también con el ratón: haz clic en la navegación, los botones y los atajos; en las listas el primer clic selecciona una fila y el segundo la abre; las casillas cambian al instante; la rueda desplaza listas y el Agent Calendar. Arrastrar sigue seleccionando y copiando texto.

<a id="local-models"></a>

### Modelos locales

Cualquier servidor compatible con OpenAI en `localhost` cuenta como local, igual que los proveedores `ollama`, `lmstudio`, `llamacpp` y `vllm`. Por ejemplo, con Ollama, en `opencode.json` (en tu carpeta o en `~/.config/openwork/`):

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

### Cómo funciona

- El planificador vive en el proceso del servidor de OpenWork. Busca agentes pendientes cada 5 segundos y ejecuta hasta 3 a la vez. Las reservas son atómicas en SQLite, así que varias ventanas de OpenWork nunca ejecutan el mismo agente dos veces, y las ejecuciones que deja un fallo se marcan como interrumpidas. `OPENCODE_DISABLE_WORK_SCHEDULER=1` lo desactiva.
- Cada ejecución es una sesión de opencode con el agente `work` — una persona de trabajo del conocimiento donde las carpetas son espacios de trabajo y los archivos son entregables — con tu memoria y los resultados recientes del agente en su contexto de sistema, y permisos sin supervisión según su nivel de acceso.
- OpenWork conserva la configuración de opencode: `opencode.json`, `.opencode/`, las variables `OPENCODE_*`, proveedores, servidores MCP y skills funcionan como antes.
- OpenWork guarda sus datos en `~/.local/share/openwork` y su configuración global en `~/.config/openwork`, aparte de cualquier instalación de opencode, y solo se actualiza desde sus propios releases de GitHub.

| Dónde                                                   | Qué                                                                  |
| ------------------------------------------------------- | -------------------------------------------------------------------- |
| `packages/schema/src/work.ts`                           | registros, entradas y el evento `work.updated`                       |
| `packages/core/src/work.ts`, `packages/core/src/work/`  | tablas SQLite, el store `Work` y el análisis de horarios             |
| `packages/opencode/src/work/`                           | planificador, permisos sin supervisión, contexto de ejecución, demo  |
| `packages/opencode/src/tool/`                           | las herramientas `inbox`, `user_todo`, `agenda`, `memory` y `deploy` |
| `packages/opencode/src/server/routes/instance/httpapi/` | la API HTTP `/work/*`                                                |
| `packages/tui/src/work/`                                | el shell, la navegación, las páginas y el diálogo de despliegue      |

La guía completa está en [docs/openwork](docs/openwork/README.md).

### Desarrollo

```bash
bun install
bun dev ~/work

# las comprobaciones se ejecutan desde el directorio de un paquete, nunca desde la raíz del repositorio
(cd packages/tui && bun typecheck && bun test)
(cd packages/opencode && bun typecheck && bun test test/work)
```

Las capturas se regeneran a partir del TUI real con un modelo sin conexión. Con `--window linux` cada una es una foto de una ventana X11 real (Xvfb, el gestor de ventanas xfwm4 y xfce4-terminal):

```bash
sudo apt-get install tmux python3-pil xvfb dbus-x11 xfwm4 xfce4-terminal greybird-gtk-theme xdotool imagemagick fonts-dejavu-core
cd packages/opencode
TZ=Europe/London bun script/openwork/screenshots.ts --window linux --out ../../docs/openwork/screenshots
```

Elige un `TZ` en el que sea media tarde: el historial de ejecuciones de la demo empieza a las 06:00 hora local.

### Créditos y licencia

OpenWork está construido sobre [opencode](https://github.com/anomalyco/opencode) y mantiene su [licencia MIT](LICENSE). No lo desarrolla el equipo de opencode ni está afiliado a él. Las contribuciones son bienvenidas — consulta [CONTRIBUTING.md](CONTRIBUTING.md).
