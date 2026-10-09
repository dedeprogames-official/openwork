<p align="center">
  <picture>
    <source srcset="docs/openwork/logo-dark.svg" media="(prefers-color-scheme: dark)">
    <source srcset="docs/openwork/logo-light.svg" media="(prefers-color-scheme: light)">
    <img src="docs/openwork/logo-light.svg" alt="Logo d'OpenWork" width="480">
  </picture>
</p>
<p align="center"><strong>Déployez des agents dans vos dossiers. Ils travaillent selon un planning. Vous lisez les résultats dans Your Day.</strong></p>
<p align="center">Un mode travail pour le terminal, construit sur le harness d'opencode.</p>
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

[![OpenWork — Your Day dans une fenêtre de terminal sous Linux](docs/openwork/screenshots/01-your-day.png)](docs/openwork/README.md)

<p align="center"><sub>Toutes les captures sont le vrai TUI d'OpenWork dans xfce4-terminal sous Linux (Xfce, thème Greybird), avec l'espace de démonstration et un modèle hors ligne.</sub></p>

---

### Qu'est-ce qu'OpenWork ?

OpenWork transforme l'interface terminal d'opencode en un endroit pour travailler, pas seulement pour coder. Décrivez une tâche en une phrase, par exemple _« check the Half Moon Bay cam every 10m and tell me if it's sunny »_, et OpenWork déploie un agent dans le dossier local de votre choix. L'agent s'exécute selon son planning en arrière-plan, sans surveillance, et tout ce qu'il trouve arrive au même endroit : **Your Day**, à côté de votre agenda, de vos tâches et de l'**Agent Inbox**.

C'est toujours une application de terminal qui tourne sur le harness d'opencode : les mêmes sessions, outils, permissions, fournisseurs, modèles locaux, skills et serveurs MCP. Agents, exécutions, boîte de réception, tâches, agenda et mémoire sont stockés localement dans SQLite.

### Points forts

- **Déploiement instantané** — une phrase → dossier → espace → planning → accès. Appuyez sur entrée à chaque étape et l'agent est déployé et en marche en quelques secondes.
- **Plannings en langage naturel** — en anglais ou en portugais : `every 10m`, `hourly`, `every morning at 8`, `daily at 7:30`, `at 5pm`, `now`, `a cada 15 minutos`, `todo dia às 8h`.
- **Your Day** — agenda, tâches, l'Agent Inbox et tous les agents regroupés par espace, avec leur dernier résultat et leur prochaine exécution.
- **Agent Calendar** — toutes les exécutions de la journée dans l'ordre, colorées par espace, zoomables de quelques minutes à la journée entière, avec l'exécution en cours entourée.
- **Sans surveillance et sûr** — les exécutions ne s'arrêtent jamais pour demander : tout ce qui afficherait une demande de permission est refusé. Chaque agent a un niveau d'accès : `read + network`, `read + write + network` ou `full`.
- **De vraies transcriptions** — chaque exécution est une vraie session opencode que vous pouvez ouvrir, avec ses appels d'outils, ses tokens et son coût.
- **Des agents qui rendent compte** — les outils de cowork `inbox`, `user_todo`, `agenda`, `memory` et `deploy` permettent aux agents de publier dans votre boîte, d'ajouter des tâches, de lire votre agenda et de retenir des faits sur vous. Un chat peut déployer de nouveaux agents.
- **Spaces** — regroupez des agents autour d'un objectif, d'un événement ou d'un client.
- **Déplacez des agents entre espaces** — appuyez sur `m` sur la page d'un agent, utilisez **+ Move an agent here...** sur la page Spaces ou demandez-le dans un chat.
- **Mémoire** — des faits sur vous que reçoivent chaque chat et chaque agent.
- **Statistiques de tokens** — tokens locaux et cloud comptés à part, rythme de consommation, projection quotidienne et économies grâce aux modèles locaux.
- **Clavier et souris** — `alt+1` … `alt+8` pour les pages et `ctrl+p` pour toutes les commandes ; cliquez sur la navigation, les boutons, les lignes, les cases et les raccourcis ; faites défiler les listes et le calendrier à la molette.
- **De l'ASCII partout** — le logo, les jauges et les graphiques en anneau sont dessinés avec des caractères de bloc du terminal.

### Captures d'écran

<table>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/03-agents.png" alt="Agents"><br><b>Agents</b> — jauge de tokens, rythme, économies et l'Agent Calendar en direct</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/04-agents-whole-day.png" alt="Agent Calendar, journée entière"><br><b>Agent Calendar</b> sur la journée entière</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/05-agent-detail.png" alt="Agent"><br><b>Agent</b> — les appels d'outils et le résultat de sa dernière exécution</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/06-agent-running.png" alt="Agent en cours"><br>Un agent <b>en cours d'exécution</b></td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/14-deploy.png" alt="Déployer un agent"><br><b>Déployer</b> un agent en une phrase</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/15-deploy-folder.png" alt="Déployer : choisir un dossier"><br>…puis choisir le <b>dossier</b> où il travaille</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/07-spaces.png" alt="Spaces"><br><b>Spaces</b> — des agents regroupés autour d'un objectif</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/08-chat.png" alt="Chat"><br>Un <b>chat</b> avec l'agent <code>work</code>, dans le shell</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/10-skills.png" alt="Skills"><br><b>Skills</b> — des instructions réutilisables</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/11-memory.png" alt="Mémoire"><br><b>Memory</b> — ce que chaque chat et agent sait de vous</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/12-models.png" alt="Modèles"><br><b>Models</b> — locaux et cloud</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/13-integrations.png" alt="Intégrations"><br><b>Integrations</b> — serveurs MCP et comptes</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/02-your-day-focus.png" alt="Your Day sans la colonne des agents"><br><b>Your Day</b> avec la colonne des agents masquée</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/16-command-palette.png" alt="Commandes"><br>Toutes les <b>commandes</b> dans la palette (<code>ctrl+p</code>)</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/17-new-chat.png" alt="Nouveau chat"><br><b>New chat</b></td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/18-nav-collapsed.png" alt="Navigation réduite"><br><b>Navigation</b> réduite (<code>ctrl+x w</code>)</td>
  </tr>
</table>

---

### Démarrage

#### Installation

```bash
# macOS et Linux
curl -fsSL https://github.com/dedeprogames-official/openwork/releases/latest/download/install | bash
```

```powershell
# Windows (PowerShell)
irm https://github.com/dedeprogames-official/openwork/releases/latest/download/install.ps1 | iex
```

```bash
# Tout système avec Node.js 18+ : npx le lance une fois, npm install -g garde la commande openwork
npx https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-cli.tgz
npm install -g https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-cli.tgz
```

Ouvrez ensuite un dossier et lancez `openwork`. `openwork upgrade` le met à jour vers la dernière version et `openwork uninstall` le supprime.

#### Téléchargements

| Plateforme               | Téléchargement                                                                                                                                |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Linux x64                | [`openwork-linux-x64.tar.gz`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-linux-x64.tar.gz)           |
| Linux arm64              | [`openwork-linux-arm64.tar.gz`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-linux-arm64.tar.gz)       |
| Linux x64 (musl, Alpine) | [`openwork-linux-x64-musl.tar.gz`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-linux-x64-musl.tar.gz) |
| macOS Apple Silicon      | [`openwork-darwin-arm64.zip`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-darwin-arm64.zip)           |
| macOS Intel              | [`openwork-darwin-x64.zip`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-darwin-x64.zip)               |
| Windows x64              | [`openwork-windows-x64.zip`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-windows-x64.zip)             |
| Windows arm64            | [`openwork-windows-arm64.zip`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-windows-arm64.zip)         |

Toutes les versions sont sur la [page des releases](https://github.com/dedeprogames-official/openwork/releases). Chaque archive contient le binaire `openwork` ; les builds `-baseline` visent les CPU x64 sans AVX2 et les `-musl` Alpine, et les installeurs choisissent la bonne. Les binaires macOS sont signés ad hoc, sans notarisation : après avoir téléchargé un zip avec un navigateur, lancez `xattr -d com.apple.quarantine openwork` une fois.

#### Windows

L'installeur PowerShell place `openwork.exe` dans `%USERPROFILE%\.openwork\bin` et l'ajoute à votre PATH : ouvrez un nouveau terminal et lancez `openwork`. Windows Terminal donne le meilleur résultat (truecolor et souris). Vous pouvez aussi décompresser `openwork-windows-x64.zip` où vous voulez et lancer `openwork.exe`, ou utiliser `npx` comme ci-dessus.

#### Lancer depuis les sources

**Prérequis :** [Bun](https://bun.sh) 1.3 ou plus récent, git et un terminal avec truecolor et prise en charge de la souris (xfce4-terminal, GNOME Terminal, Konsole, kitty, WezTerm, Ghostty, iTerm2, Windows Terminal…). Pour les modèles : n'importe quel fournisseur pris en charge par opencode, ou un modèle local servi par Ollama, LM Studio, llama.cpp ou vLLM.

```bash
git clone https://github.com/dedeprogames-official/openwork.git
cd openwork
bun install
bun dev ~/work        # le dossier où s'ouvre OpenWork
```

`bun dev .` ouvre le dossier courant ; `bun dev` seul ouvre `packages/opencode`.

#### Compiler un binaire autonome

```bash
./packages/opencode/script/build.ts --single
./packages/opencode/dist/opencode-linux-x64/bin/opencode    # ou opencode-darwin-arm64, …
```

Le paquet installe le même binaire sous les noms `opencode` et `openwork`.

#### Vos cinq premières minutes

1. **Connectez un modèle** — `/connect`, ou ouvrez **Models** (`alt+7`) et appuyez sur `c`. Pour les modèles locaux, voir [Modèles locaux](#local-models).
2. **Chargez la démo** — `/demo` crée 6 espaces, 17 agents, une journée d'historique d'exécutions, des skills, des messages, des tâches et un agenda. Ses agents démarrent en pause pour ne dépenser aucun token ; `/pause` les laisse tourner.
3. **Déployez le vôtre** — `ctrl+x d`, ou tapez `/deploy check the weather in Lisbon every morning at 7 and tell me if I need an umbrella` (le planning s'écrit en anglais ou en portugais ; la tâche, dans n'importe quelle langue).
4. **Lisez Your Day** — `alt+1`. Les résultats arrivent dans l'Agent Inbox ; ouvrez un agent pour voir ses exécutions ou discuter de son travail.

### Déployer des agents

Un agent, c'est une tâche, un dossier où travailler, un planning et un niveau d'accès, plus éventuellement une skill. Il tourne sur le modèle sélectionné au moment du déploiement. Déployez avec `ctrl+x d`, `/deploy <quoi et quand>`, le bouton **+ Create Agent** de la page Agents, depuis un espace ou en le demandant dans un chat.

| Vous écrivez                                                            | Planning                                                         |
| ----------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `every 10m`, `every 2 hours`, `a cada 15 minutos`                       | toutes les N minutes, heures ou jours (1 minute minimum)         |
| `hourly`, `every hour`, `every minute`                                  | toutes les heures ou toutes les minutes                          |
| `daily at 9am`, `every morning at 8`, `every evening`, `todo dia às 8h` | chaque jour à cette heure (matin 08:00, soir 18:00, sinon 09:00) |
| `at 5pm`, `às 17h`                                                      | une fois, au prochain 17:00                                      |
| `now`, `once` — ou aucun mot de temps                                   | une fois, tout de suite                                          |

L'étape du planning propose aussi **on demand** : l'agent ne tourne que lorsque vous appuyez sur **Run now**.

| Accès                    | L'agent peut                                                               |
| ------------------------ | -------------------------------------------------------------------------- |
| `read + network`         | lire des fichiers, naviguer sur le web, publier dans votre boîte           |
| `read + write + network` | aussi créer et modifier des fichiers dans son dossier                      |
| `full`                   | utiliser tous les outils que vous autorisez, y compris les commandes shell |

Les exécutions sont sans surveillance : les questions et tout ce qui afficherait une demande de permission sont refusés, et une exécution s'arrête après 15 minutes. Chaque exécution est une session nommée `<agent> · run #N` ; appuyez sur `o` sur la page de l'agent pour ouvrir sa transcription.

### Pages

| Page         | Touche  | Affiche                                                                                                                           |
| ------------ | ------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Your Day     | `alt+1` | Agenda, tâches, Agent Inbox, un prompt de chat et tous les agents regroupés par espace avec leur dernière et prochaine exécution. |
| Chats        | `alt+2` | Vos chats ; les exécutions d'agents restent hors de la liste.                                                                     |
| Spaces       | `alt+3` | Les espaces avec leurs agents et leurs éléments d'agenda.                                                                         |
| Agents       | `alt+4` | Jauge de tokens, rythme, économies, la répartition des tokens et l'Agent Calendar.                                                |
| Agent        | `enter` | Un agent : tâche, planning, accès, appels d'outils et résultat de chaque exécution, historique et son propre chat.                |
| Skills       | `alt+5` | Les skills de `.opencode/skills` et `~/.agents/skills`.                                                                           |
| Memory       | `alt+6` | Ce que les chats et les agents savent de vous.                                                                                    |
| Models       | `alt+7` | Modèles locaux et cloud ; les tokens locaux sont comptés à part dans la carte Usage.                                              |
| Integrations | `alt+8` | Serveurs MCP et comptes connectés.                                                                                                |

### Clavier et souris

| Touches           | Action                                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------------------------ |
| `alt+1` … `alt+8` | changer de page                                                                                        |
| `ctrl+x d`        | déployer un agent                                                                                      |
| `ctrl+x w`        | réduire ou déplier la navigation                                                                       |
| `m`               | déplacer l'agent vers un autre espace (sur sa page) ou en amener un dans l'espace sélectionné (Spaces) |
| `ctrl+p`          | palette de commandes                                                                                   |
| `c`               | activer le prompt de chat (`esc` pour en sortir)                                                       |
| `esc`             | retour                                                                                                 |

Chaque page affiche ses propres touches en bas. Commandes slash : `/day`, `/chats`, `/spaces`, `/agents`, `/skills`, `/memory`, `/models`, `/integrations`, `/deploy <texte>`, `/pause`, `/demo`, `/connect`.

Tout fonctionne aussi à la souris : cliquez sur la navigation, les boutons et les raccourcis ; dans les listes, le premier clic sélectionne une ligne et le second l'ouvre ; les cases basculent immédiatement ; la molette fait défiler les listes et l'Agent Calendar. Faire glisser sélectionne et copie toujours le texte.

<a id="local-models"></a>

### Modèles locaux

Tout serveur compatible OpenAI sur `localhost` compte comme local, de même que les fournisseurs `ollama`, `lmstudio`, `llamacpp` et `vllm`. Par exemple, avec Ollama, dans `opencode.json` (dans votre dossier ou dans `~/.config/openwork/`) :

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

### Fonctionnement

- Le planificateur vit dans le processus serveur d'OpenWork. Il cherche les agents à lancer toutes les 5 secondes et en exécute jusqu'à 3 à la fois. Les réservations sont atomiques dans SQLite : plusieurs fenêtres OpenWork n'exécutent jamais deux fois le même agent, et les exécutions laissées par un plantage sont marquées comme interrompues. `OPENCODE_DISABLE_WORK_SCHEDULER=1` le désactive.
- Chaque exécution est une session opencode avec l'agent `work` — une persona de travail intellectuel pour qui les dossiers sont des espaces de travail et les fichiers des livrables — avec votre mémoire et les résultats récents de l'agent dans son contexte système, et des permissions sans surveillance selon son niveau d'accès.
- OpenWork conserve la configuration d'opencode : `opencode.json`, `.opencode/`, les variables `OPENCODE_*`, les fournisseurs, les serveurs MCP et les skills fonctionnent comme avant.
- OpenWork garde ses données dans `~/.local/share/openwork` et sa configuration globale dans `~/.config/openwork`, à l'écart de toute installation d'opencode, et ne se met à jour que depuis ses propres releases GitHub.

| Où                                                      | Quoi                                                                      |
| ------------------------------------------------------- | ------------------------------------------------------------------------- |
| `packages/schema/src/work.ts`                           | enregistrements, entrées et l'événement `work.updated`                    |
| `packages/core/src/work.ts`, `packages/core/src/work/`  | tables SQLite, le store `Work` et l'analyse des plannings                 |
| `packages/opencode/src/work/`                           | planificateur, permissions sans surveillance, contexte d'exécution, démo  |
| `packages/opencode/src/tool/`                           | les outils `inbox`, `user_todo`, `agenda`, `memory` et `deploy`           |
| `packages/opencode/src/server/routes/instance/httpapi/` | l'API HTTP `/work/*`                                                      |
| `packages/tui/src/work/`                                | le shell, la navigation, les pages et la boîte de dialogue de déploiement |

Le guide complet se trouve dans [docs/openwork](docs/openwork/README.md).

### Développement

```bash
bun install
bun dev ~/work

# les vérifications se lancent depuis le dossier d'un paquet, jamais depuis la racine du dépôt
(cd packages/tui && bun typecheck && bun test)
(cd packages/opencode && bun typecheck && bun test test/work)
```

Les captures sont régénérées à partir du vrai TUI avec un modèle hors ligne. Avec `--window linux`, chacune est une photo d'une vraie fenêtre X11 (Xvfb, le gestionnaire de fenêtres xfwm4 et xfce4-terminal) :

```bash
sudo apt-get install tmux python3-pil xvfb dbus-x11 xfwm4 xfce4-terminal greybird-gtk-theme xdotool imagemagick fonts-dejavu-core
cd packages/opencode
TZ=Europe/London bun script/openwork/screenshots.ts --window linux --out ../../docs/openwork/screenshots
```

Choisissez un `TZ` où c'est la fin d'après-midi : l'historique de la démo commence à 06:00 heure locale.

### Crédits et licence

OpenWork est construit sur [opencode](https://github.com/anomalyco/opencode) et conserve sa [licence MIT](LICENSE). Il n'est ni développé par l'équipe d'opencode ni affilié à elle. Les contributions sont les bienvenues — voir [CONTRIBUTING.md](CONTRIBUTING.md).
