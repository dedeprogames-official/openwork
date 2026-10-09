<p align="center">
  <picture>
    <source srcset="docs/openwork/logo-dark.svg" media="(prefers-color-scheme: dark)">
    <source srcset="docs/openwork/logo-light.svg" media="(prefers-color-scheme: light)">
    <img src="docs/openwork/logo-light.svg" alt="Logo do OpenWork" width="480">
  </picture>
</p>
<p align="center"><strong>Faça deploy de agentes nas suas pastas. Eles trabalham com agenda. Você lê os resultados no Your Day.</strong></p>
<p align="center">Um modo de trabalho para o terminal, construído sobre o harness do opencode.</p>
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

[![OpenWork — Your Day numa janela de terminal no Linux](docs/openwork/screenshots/01-your-day.png)](docs/openwork/README.md)

<p align="center"><sub>Todas as capturas aqui são o TUI real do OpenWork no xfce4-terminal, no Linux (Xfce, tema Greybird), rodando o workspace de demonstração com um modelo offline.</sub></p>

---

### O que é o OpenWork?

O OpenWork transforma a interface de terminal do opencode num lugar para trabalhar — não só para programar. Descreva uma tarefa numa frase, como _“check the Half Moon Bay cam every 10m and tell me if it's sunny”_, e o OpenWork faz o deploy de um agente numa pasta local à sua escolha. O agente roda na sua agenda em segundo plano, sem supervisão, e tudo o que encontra chega num só lugar: o **Your Day**, ao lado da sua agenda, dos seus todos e da **Agent Inbox**.

Continua sendo um app de terminal e continua rodando sobre o harness do opencode: as mesmas sessões, ferramentas, permissões, provedores, modelos locais, skills e servidores MCP. Agentes, execuções, inbox, todos, agenda e memória ficam guardados localmente em SQLite.

### Destaques

- **Deploy instantâneo** — uma frase → pasta → space → agenda → acesso. Aperte enter em cada passo e o agente está no ar e rodando em segundos.
- **Agendas em linguagem natural** — `every 10m`, `hourly`, `every morning at 8`, `at 5pm`, `now` — e em português: `a cada 15 minutos`, `todo dia às 8h`, `às 17h`, `agora`.
- **Your Day** — agenda, todos, a Agent Inbox e todos os agentes agrupados por space, com o último resultado e a próxima execução.
- **Agent Calendar** — todas as execuções do dia em ordem, coloridas por space, com zoom de poucos minutos até o dia inteiro, e a execução que está trabalhando agora destacada com contorno.
- **Sem supervisão e seguro** — execuções nunca param para perguntar: tudo que abriria um pedido de permissão é negado. Cada agente tem um nível de acesso: `read + network`, `read + write + network` ou `full`.
- **Transcrições reais** — cada execução é uma sessão real do opencode que você pode abrir, com chamadas de ferramentas, tokens e custo.
- **Agentes que dão retorno** — as ferramentas de cowork `inbox`, `user_todo`, `agenda`, `memory` e `deploy` deixam os agentes postar na sua inbox, adicionar todos, ler sua agenda e lembrar fatos sobre você. Um chat pode fazer deploy de novos agentes.
- **Spaces** — agrupe agentes em torno de um objetivo, um evento ou um cliente.
- **Mova agentes entre spaces** — aperte `m` na página do agente, use **+ Move an agent here...** na página Spaces ou peça num chat.
- **Memória** — fatos sobre você que todo chat e todo agente recebem.
- **Estatísticas de tokens** — tokens locais e de nuvem contados à parte, taxa de consumo, projeção diária e quanto os modelos locais economizam.
- **Teclado e mouse** — `alt+1` … `alt+8` para as páginas e `ctrl+p` para todos os comandos; clique na navegação, botões, linhas, caixas de seleção e dicas de teclas; role listas e o calendário com a roda do mouse.
- **ASCII do começo ao fim** — o logo, os medidores e os gráficos de rosca são desenhados com caracteres de bloco do terminal.

### Capturas de tela

<table>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/03-agents.png" alt="Agents"><br><b>Agents</b> — medidor de tokens, taxa de consumo, economia e o Agent Calendar ao vivo</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/04-agents-whole-day.png" alt="Agent Calendar, dia inteiro"><br><b>Agent Calendar</b> com zoom no dia inteiro</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/05-agent-detail.png" alt="Agente"><br><b>Agente</b> — chamadas de ferramentas e resultado da última execução</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/06-agent-running.png" alt="Agente rodando"><br>Um agente <b>rodando</b> agora mesmo</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/14-deploy.png" alt="Deploy de um agente"><br><b>Deploy</b> de um agente em uma frase</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/15-deploy-folder.png" alt="Deploy: escolher a pasta"><br>…e depois a <b>pasta</b> onde ele trabalha</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/07-spaces.png" alt="Spaces"><br><b>Spaces</b> — agentes agrupados em torno de um objetivo</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/08-chat.png" alt="Chat"><br>Um <b>chat</b> com o agente <code>work</code>, dentro do shell</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/10-skills.png" alt="Skills"><br><b>Skills</b> — instruções reutilizáveis</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/11-memory.png" alt="Memória"><br><b>Memory</b> — o que todo chat e agente sabe sobre você</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/12-models.png" alt="Modelos"><br><b>Models</b> — locais e na nuvem</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/13-integrations.png" alt="Integrações"><br><b>Integrations</b> — servidores MCP e contas</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/02-your-day-focus.png" alt="Your Day sem a coluna de agentes"><br><b>Your Day</b> com a coluna de agentes escondida</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/16-command-palette.png" alt="Comandos"><br>Todos os <b>comandos</b> na paleta (<code>ctrl+p</code>)</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/17-new-chat.png" alt="Novo chat"><br><b>New chat</b></td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/18-nav-collapsed.png" alt="Navegação recolhida"><br><b>Navegação</b> recolhida (<code>ctrl+x w</code>)</td>
  </tr>
</table>

---

### Primeiros passos

#### Instalação

```bash
# macOS e Linux
curl -fsSL https://github.com/dedeprogames-official/openwork/releases/latest/download/install | bash
```

```powershell
# Windows (PowerShell)
irm https://github.com/dedeprogames-official/openwork/releases/latest/download/install.ps1 | iex
```

```bash
# Qualquer sistema com Node.js 18+: o npx roda uma vez, o npm install -g deixa o comando openwork instalado
npx https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-cli.tgz
npm install -g https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-cli.tgz
```

Depois abra uma pasta e rode `openwork`. `openwork upgrade` atualiza para a versão mais recente e `openwork uninstall` remove.

#### Downloads

| Plataforma               | Download                                                                                                                                      |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Linux x64                | [`openwork-linux-x64.tar.gz`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-linux-x64.tar.gz)           |
| Linux arm64              | [`openwork-linux-arm64.tar.gz`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-linux-arm64.tar.gz)       |
| Linux x64 (musl, Alpine) | [`openwork-linux-x64-musl.tar.gz`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-linux-x64-musl.tar.gz) |
| macOS Apple Silicon      | [`openwork-darwin-arm64.zip`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-darwin-arm64.zip)           |
| macOS Intel              | [`openwork-darwin-x64.zip`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-darwin-x64.zip)               |
| Windows x64              | [`openwork-windows-x64.zip`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-windows-x64.zip)             |
| Windows arm64            | [`openwork-windows-arm64.zip`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-windows-arm64.zip)         |

Todas as versões estão na [página de releases](https://github.com/dedeprogames-official/openwork/releases). Cada arquivo traz o binário `openwork`; as builds `-baseline` são para CPUs x64 sem AVX2 e as `-musl` para Alpine, e os instaladores escolhem a certa para você. Os binários de macOS são assinados ad hoc, sem notarização: depois de baixar um zip pelo navegador, rode `xattr -d com.apple.quarantine openwork` uma vez.

#### Windows

O instalador de PowerShell coloca o `openwork.exe` em `%USERPROFILE%\.openwork\bin` e o adiciona ao seu PATH: abra um terminal novo e rode `openwork`. O Windows Terminal dá o melhor resultado (truecolor e mouse). Você também pode descompactar o `openwork-windows-x64.zip` em qualquer pasta e rodar `openwork.exe`, ou usar o `npx` como acima.

#### Rodar a partir do código

**Requisitos:** [Bun](https://bun.sh) 1.3 ou mais recente, git e um terminal com truecolor e suporte a mouse (xfce4-terminal, GNOME Terminal, Konsole, kitty, WezTerm, Ghostty, iTerm2, Windows Terminal…). Para modelos: qualquer provedor que o opencode suporta, ou um modelo local servido por Ollama, LM Studio, llama.cpp ou vLLM.

```bash
git clone https://github.com/dedeprogames-official/openwork.git
cd openwork
bun install
bun dev ~/work        # a pasta em que o OpenWork abre
```

`bun dev .` abre a pasta atual; só `bun dev` abre `packages/opencode`.

#### Compilar um binário independente

```bash
./packages/opencode/script/build.ts --single
./packages/opencode/dist/opencode-linux-x64/bin/opencode    # ou opencode-darwin-arm64, …
```

O pacote instala o mesmo binário como `opencode` e como `openwork`.

#### Seus primeiros cinco minutos

1. **Conecte um modelo** — `/connect`, ou abra **Models** (`alt+7`) e aperte `c`. Para modelos locais veja [Modelos locais](#local-models).
2. **Carregue a demo** — `/demo` cria 6 spaces, 17 agentes, um dia de histórico de execuções, skills, mensagens na inbox, todos e uma agenda. Os agentes começam pausados para não gastar tokens; `/pause` deixa eles rodarem.
3. **Faça deploy do seu** — `ctrl+x d`, ou digite `/deploy veja a previsão do tempo em Lisboa todo dia às 7h e me diga se preciso de guarda-chuva`.
4. **Leia o Your Day** — `alt+1`. Os resultados chegam na Agent Inbox; abra um agente para ver as execuções dele ou conversar sobre o trabalho dele.

### Deploy de agentes

Um agente é uma tarefa, uma pasta para trabalhar, uma agenda e um nível de acesso, e opcionalmente uma skill. Ele roda no modelo que estava selecionado quando você fez o deploy. Faça deploy com `ctrl+x d`, `/deploy <o quê e quando>`, o botão **+ Create Agent** na página Agents, a partir de um space, ou pedindo num chat.

| Você escreve                                                            | Agenda                                                         |
| ----------------------------------------------------------------------- | -------------------------------------------------------------- |
| `every 10m`, `every 2 hours`, `a cada 15 minutos`                       | a cada N minutos, horas ou dias (no mínimo 1 minuto)           |
| `hourly`, `every hour`, `every minute`                                  | a cada hora ou a cada minuto                                   |
| `daily at 9am`, `every morning at 8`, `every evening`, `todo dia às 8h` | todo dia nesse horário (manhã 08:00, noite 18:00, senão 09:00) |
| `at 5pm`, `às 17h`                                                      | uma vez, no próximo 17:00                                      |
| `now`, `once` — ou nenhuma palavra de tempo                             | uma vez, na hora                                               |

O passo de agenda também oferece **on demand**: o agente só roda quando você aperta **Run now**.

| Acesso                   | O agente pode                                                            |
| ------------------------ | ------------------------------------------------------------------------ |
| `read + network`         | ler arquivos, navegar na web, postar na sua inbox                        |
| `read + write + network` | também criar e editar arquivos na pasta dele                             |
| `full`                   | usar todas as ferramentas que você permitir, inclusive comandos de shell |

As execuções não têm supervisão: perguntas e tudo que abriria um pedido de permissão são negados, e uma execução para depois de 15 minutos. Cada execução é uma sessão chamada `<agente> · run #N`; aperte `o` na página do agente para abrir a transcrição.

### Páginas

| Página       | Tecla   | Mostra                                                                                                                  |
| ------------ | ------- | ----------------------------------------------------------------------------------------------------------------------- |
| Your Day     | `alt+1` | Agenda, todos, Agent Inbox, um prompt de chat e todos os agentes agrupados por space com a última e a próxima execução. |
| Chats        | `alt+2` | Seus chats; execuções de agentes ficam fora da lista.                                                                   |
| Spaces       | `alt+3` | Spaces com seus agentes e itens de agenda.                                                                              |
| Agents       | `alt+4` | Medidor de tokens, taxa de consumo, economia, para onde vão os tokens e o Agent Calendar.                               |
| Agent        | `enter` | Um agente: tarefa, agenda, acesso, chamadas de ferramentas e resultado de cada execução, histórico e o chat dele.       |
| Skills       | `alt+5` | Skills de `.opencode/skills` e `~/.agents/skills`.                                                                      |
| Memory       | `alt+6` | O que chats e agentes sabem sobre você.                                                                                 |
| Models       | `alt+7` | Modelos locais e na nuvem; tokens locais são contados à parte no card Usage.                                            |
| Integrations | `alt+8` | Servidores MCP e contas conectadas.                                                                                     |

### Teclado e mouse

| Teclas            | Ação                                                                                            |
| ----------------- | ----------------------------------------------------------------------------------------------- |
| `alt+1` … `alt+8` | trocar de página                                                                                |
| `ctrl+x d`        | fazer deploy de um agente                                                                       |
| `ctrl+x w`        | recolher ou expandir a navegação                                                                |
| `m`               | mover o agente para outro space (na página dele) ou trazer um para o space selecionado (Spaces) |
| `ctrl+p`          | paleta de comandos                                                                              |
| `c`               | focar o prompt de chat (`esc` sai)                                                              |
| `esc`             | voltar                                                                                          |

Cada página mostra as próprias teclas no rodapé. Comandos de barra: `/day`, `/chats`, `/spaces`, `/agents`, `/skills`, `/memory`, `/models`, `/integrations`, `/deploy <texto>`, `/pause`, `/demo`, `/connect`.

Tudo também funciona com o mouse: clique na navegação, nos botões e nas dicas de teclas; nas listas o primeiro clique seleciona uma linha e o segundo abre; caixas de seleção alternam na hora; a roda rola listas e o Agent Calendar. Arrastar continua selecionando e copiando texto.

<a id="local-models"></a>

### Modelos locais

Qualquer servidor compatível com OpenAI em `localhost` conta como local, assim como os provedores `ollama`, `lmstudio`, `llamacpp` e `vllm`. Por exemplo, com Ollama, no `opencode.json` (na sua pasta ou em `~/.config/openwork/`):

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

### Como funciona

- O agendador vive no processo do servidor do OpenWork. Ele procura agentes vencidos a cada 5 segundos e roda até 3 ao mesmo tempo. As reservas são atômicas no SQLite, então várias janelas do OpenWork nunca rodam o mesmo agente duas vezes, e execuções deixadas para trás por uma falha são marcadas como interrompidas. `OPENCODE_DISABLE_WORK_SCHEDULER=1` desliga o agendador.
- Cada execução é uma sessão do opencode com o agente `work` — uma persona de trabalho do conhecimento em que pastas são espaços de trabalho e arquivos são entregáveis — com a sua memória e os resultados recentes do agente no contexto de sistema, e permissões sem supervisão para o nível de acesso dele.
- O OpenWork mantém a configuração do opencode: `opencode.json`, `.opencode/`, variáveis `OPENCODE_*`, provedores, servidores MCP e skills funcionam como antes.
- O OpenWork guarda os próprios dados em `~/.local/share/openwork` e a configuração global em `~/.config/openwork`, separados de qualquer instalação do opencode, e só se atualiza pelos releases dele no GitHub.

| Onde                                                    | O quê                                                              |
| ------------------------------------------------------- | ------------------------------------------------------------------ |
| `packages/schema/src/work.ts`                           | registros, entradas e o evento `work.updated`                      |
| `packages/core/src/work.ts`, `packages/core/src/work/`  | tabelas SQLite, o store `Work` e a leitura de agendas              |
| `packages/opencode/src/work/`                           | agendador, permissões sem supervisão, contexto das execuções, demo |
| `packages/opencode/src/tool/`                           | as ferramentas `inbox`, `user_todo`, `agenda`, `memory` e `deploy` |
| `packages/opencode/src/server/routes/instance/httpapi/` | a API HTTP `/work/*`                                               |
| `packages/tui/src/work/`                                | o shell, a navegação, as páginas e o diálogo de deploy             |

O guia completo está em [docs/openwork](docs/openwork/README.md).

### Desenvolvimento

```bash
bun install
bun dev ~/work

# as verificações rodam a partir do diretório de um pacote, nunca da raiz do repositório
(cd packages/tui && bun typecheck && bun test)
(cd packages/opencode && bun typecheck && bun test test/work)
```

As capturas são geradas a partir do TUI real com um modelo offline. Com `--window linux` cada uma é uma foto de uma janela X11 de verdade (Xvfb, o gerenciador de janelas xfwm4 e o xfce4-terminal):

```bash
sudo apt-get install tmux python3-pil xvfb dbus-x11 xfwm4 xfce4-terminal greybird-gtk-theme xdotool imagemagick fonts-dejavu-core
cd packages/opencode
TZ=Europe/London bun script/openwork/screenshots.ts --window linux --out ../../docs/openwork/screenshots
```

Escolha um `TZ` em que seja fim de tarde: o histórico de execuções da demo começa às 06:00 no horário local.

### Créditos e licença

O OpenWork é construído sobre o [opencode](https://github.com/anomalyco/opencode) e mantém a [licença MIT](LICENSE) dele. Não é feito pela equipe do opencode nem é afiliado a ela. Contribuições são bem-vindas — veja o [CONTRIBUTING.md](CONTRIBUTING.md).
