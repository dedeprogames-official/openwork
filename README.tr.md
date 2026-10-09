<p align="center">
  <picture>
    <source srcset="docs/openwork/logo-dark.svg" media="(prefers-color-scheme: dark)">
    <source srcset="docs/openwork/logo-light.svg" media="(prefers-color-scheme: light)">
    <img src="docs/openwork/logo-light.svg" alt="OpenWork logosu" width="480">
  </picture>
</p>
<p align="center"><strong>Ajanları klasörlerine yerleştir. Bir programa göre çalışırlar. Sonuçları Your Day'de okursun.</strong></p>
<p align="center">opencode harness'i üzerine kurulu, terminal için bir çalışma modu.</p>
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

[![OpenWork — Linux'ta bir terminal penceresinde Your Day](docs/openwork/screenshots/01-your-day.png)](docs/openwork/README.md)

<p align="center"><sub>Buradaki tüm ekran görüntüleri, Linux'ta xfce4-terminal içinde (Xfce, Greybird teması) demo çalışma alanını çevrimdışı bir modelle çalıştıran gerçek OpenWork TUI'sidir.</sub></p>

---

### OpenWork nedir?

OpenWork, opencode'un terminal arayüzünü yalnızca kod için değil, iş bitirmek için bir yere dönüştürür. Bir işi tek cümleyle anlat, örneğin _“check the Half Moon Bay cam every 10m and tell me if it's sunny”_; OpenWork seçtiğin yerel bir klasöre bir ajan yerleştirir. Ajan programına göre arka planda, gözetimsiz çalışır ve bulduğu her şey tek bir yere gelir: ajandanın, yapılacaklarının ve **Agent Inbox**'ın yanında **Your Day**.

Hâlâ bir terminal uygulamasıdır ve hâlâ opencode harness'i üzerinde çalışır: aynı oturumlar, araçlar, izinler, sağlayıcılar, yerel modeller, skill'ler ve MCP sunucuları. Ajanlar, çalıştırmalar, gelen kutusu, yapılacaklar, ajanda ve hafıza yerel olarak SQLite'ta saklanır.

### Öne çıkanlar

- **Anında yerleştirme** — bir cümle → klasör → space → program → erişim. Her adımda enter'a bas; ajan saniyeler içinde yerleşir ve çalışır.
- **Gündelik dille programlar** — İngilizce veya Portekizce: `every 10m`, `hourly`, `every morning at 8`, `daily at 7:30`, `at 5pm`, `now`, `a cada 15 minutos`, `todo dia às 8h`.
- **Your Day** — ajanda, yapılacaklar, Agent Inbox ve space'e göre gruplanmış tüm ajanlar; son sonuçları ve bir sonraki çalıştırmalarıyla.
- **Agent Calendar** — günün tüm çalıştırmaları sırayla, space'e göre renklendirilmiş, birkaç dakikadan bütün güne kadar yakınlaştırılabilir; şu an çalışan çalıştırma çerçeveli.
- **Gözetimsiz ve güvenli** — çalıştırmalar asla soru sormak için durmaz: izin isteği gösterecek her şey reddedilir. Her ajanın bir erişim düzeyi vardır: `read + network`, `read + write + network` veya `full`.
- **Gerçek dökümler** — her çalıştırma, araç çağrıları, token'ları ve maliyetiyle açabileceğin gerçek bir opencode oturumudur.
- **Rapor veren ajanlar** — `inbox`, `user_todo`, `agenda`, `memory` ve `deploy` cowork araçları ajanların gelen kutuna yazmasını, yapılacak eklemesini, ajandanı okumasını ve seninle ilgili bilgileri hatırlamasını sağlar. Bir sohbet yeni ajanlar yerleştirebilir.
- **Spaces** — ajanları bir hedef, bir etkinlik ya da bir müşteri etrafında grupla.
- **Hafıza** — her sohbetin ve her ajanın aldığı, seninle ilgili bilgiler.
- **Token istatistikleri** — yerel ve bulut token'ları ayrı sayılır, tüketim hızı, günlük tahmin ve yerel modellerin sana ne kadar kazandırdığı.
- **Klavye ve fare** — sayfalar için `alt+1` … `alt+8`, tüm komutlar için `ctrl+p`; gezinmeye, düğmelere, satırlara, onay kutularına ve tuş ipuçlarına tıkla; listeleri ve takvimi tekerlekle kaydır.
- **Baştan sona ASCII** — logo, göstergeler ve halka grafikler terminalin blok karakterleriyle çizilir.

### Ekran görüntüleri

<table>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/03-agents.png" alt="Agents"><br><b>Agents</b> — token göstergesi, tüketim hızı, tasarruf ve canlı Agent Calendar</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/04-agents-whole-day.png" alt="Agent Calendar, bütün gün"><br>Bütün güne uzaklaştırılmış <b>Agent Calendar</b></td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/05-agent-detail.png" alt="Ajan"><br><b>Ajan</b> — son çalıştırmasının araç çağrıları ve sonucu</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/06-agent-running.png" alt="Çalışan ajan"><br>Şu anda <b>çalışan</b> bir ajan</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/14-deploy.png" alt="Ajan yerleştir"><br>Tek cümleyle bir ajan <b>yerleştir</b></td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/15-deploy-folder.png" alt="Yerleştirme: klasör seç"><br>…sonra çalışacağı <b>klasörü</b> seç</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/07-spaces.png" alt="Spaces"><br><b>Spaces</b> — bir hedef etrafında gruplanan ajanlar</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/08-chat.png" alt="Sohbet"><br>Kabuğun içinde <code>work</code> ajanıyla bir <b>sohbet</b></td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/10-skills.png" alt="Skills"><br><b>Skills</b> — yeniden kullanılabilir talimatlar</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/11-memory.png" alt="Hafıza"><br><b>Memory</b> — her sohbetin ve ajanın seninle ilgili bildikleri</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/12-models.png" alt="Modeller"><br><b>Models</b> — yerel ve bulut</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/13-integrations.png" alt="Entegrasyonlar"><br><b>Integrations</b> — MCP sunucuları ve hesaplar</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/02-your-day-focus.png" alt="Ajan sütunu olmadan Your Day"><br>Ajan sütunu gizlenmiş <b>Your Day</b></td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/16-command-palette.png" alt="Komutlar"><br>Paletteki tüm <b>komutlar</b> (<code>ctrl+p</code>)</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/17-new-chat.png" alt="Yeni sohbet"><br><b>New chat</b></td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/18-nav-collapsed.png" alt="Daraltılmış gezinme"><br>Daraltılmış <b>gezinme</b> (<code>ctrl+x w</code>)</td>
  </tr>
</table>

---

### Başlarken

**Gereksinimler:** [Bun](https://bun.sh) 1.3 veya üstü, git ve truecolor ile fare desteği olan bir terminal (xfce4-terminal, GNOME Terminal, Konsole, kitty, WezTerm, Ghostty, iTerm2, Windows Terminal…). Modeller için: opencode'un desteklediği herhangi bir sağlayıcı ya da Ollama, LM Studio, llama.cpp veya vLLM ile sunulan yerel bir model.

#### Kaynaktan çalıştırma

```bash
git clone https://github.com/dedeprogames-official/openwork.git
cd openwork
bun install
bun dev ~/work        # OpenWork'ün açılacağı klasör
```

`bun dev .` geçerli klasörü açar; yalnızca `bun dev` ise `packages/opencode`'u açar.

#### Bağımsız bir ikili dosya derleme

```bash
./packages/opencode/script/build.ts --single
./packages/opencode/dist/opencode-linux-x64/bin/opencode    # veya opencode-darwin-arm64, …
```

Paket aynı ikili dosyayı hem `opencode` hem de `openwork` olarak kurar.

#### İlk beş dakikan

1. **Bir model bağla** — `/connect`, ya da **Models**'i aç (`alt+7`) ve `c`'ye bas. Yerel modeller için [Yerel modeller](#local-models) bölümüne bak.
2. **Demoyu yükle** — `/demo` 6 space, 17 ajan, bir günlük çalıştırma geçmişi, skill'ler, gelen kutusu mesajları, yapılacaklar ve bir ajanda oluşturur. Ajanları token harcamasın diye duraklatılmış başlar; `/pause` çalışmalarına izin verir.
3. **Kendi ajanını yerleştir** — `ctrl+x d`, ya da `/deploy check the weather in Lisbon every morning at 7 and tell me if I need an umbrella` yaz (program İngilizce veya Portekizce; görev herhangi bir dilde).
4. **Your Day'i oku** — `alt+1`. Sonuçlar Agent Inbox'a gelir; çalıştırmalarını görmek ya da işini konuşmak için bir ajanı aç.

### Ajan yerleştirme

Bir ajan; bir görev, çalışacağı bir klasör, bir program ve bir erişim düzeyidir, istersen bir skill de eklenir. Yerleştirdiğin anda seçili olan modelle çalışır. `ctrl+x d`, `/deploy <ne ve ne zaman>`, Agents sayfasındaki **+ Create Agent** düğmesi, bir space ya da bir sohbette isteyerek yerleştirebilirsin.

| Yazdığın                                                                | Program                                                  |
| ----------------------------------------------------------------------- | -------------------------------------------------------- |
| `every 10m`, `every 2 hours`, `a cada 15 minutos`                       | her N dakikada, saatte veya günde bir (en az 1 dakika)   |
| `hourly`, `every hour`, `every minute`                                  | her saat veya her dakika                                 |
| `daily at 9am`, `every morning at 8`, `every evening`, `todo dia às 8h` | her gün o saatte (sabah 08:00, akşam 18:00, yoksa 09:00) |
| `at 5pm`, `às 17h`                                                      | bir kez, bir sonraki 17:00'de                            |
| `now`, `once` — ya da hiç zaman ifadesi olmadan                         | bir kez, hemen                                           |

Program adımı **on demand** seçeneğini de sunar: ajan yalnızca **Run now**'a bastığında çalışır.

| Erişim                   | Ajan şunları yapabilir                                      |
| ------------------------ | ----------------------------------------------------------- |
| `read + network`         | dosya okumak, web'de gezinmek, gelen kutuna yazmak          |
| `read + write + network` | ayrıca kendi klasöründe dosya oluşturmak ve düzenlemek      |
| `full`                   | izin verdiğin tüm araçları kullanmak, kabuk komutları dahil |

Çalıştırmalar gözetimsizdir: sorular ve izin isteği gösterecek her şey reddedilir ve bir çalıştırma 15 dakika sonra durur. Her çalıştırma `<ajan> · run #N` adlı bir oturumdur; dökümünü açmak için ajanın sayfasında `o`'ya bas.

### Sayfalar

| Sayfa        | Tuş     | Gösterdikleri                                                                                                                 |
| ------------ | ------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Your Day     | `alt+1` | Ajanda, yapılacaklar, Agent Inbox, bir sohbet alanı ve space'e göre gruplanmış tüm ajanlar; son ve sonraki çalıştırmalarıyla. |
| Chats        | `alt+2` | Sohbetlerin; ajan çalıştırmaları listede yer almaz.                                                                           |
| Spaces       | `alt+3` | Ajanları ve ajanda öğeleriyle space'ler.                                                                                      |
| Agents       | `alt+4` | Token göstergesi, tüketim hızı, tasarruf, token'ların nereye gittiği ve Agent Calendar.                                       |
| Agent        | `enter` | Tek bir ajan: görev, program, erişim, her çalıştırmanın araç çağrıları ve sonucu, geçmiş ve kendi sohbeti.                    |
| Skills       | `alt+5` | `.opencode/skills` ve `~/.agents/skills` içindeki skill'ler.                                                                  |
| Memory       | `alt+6` | Sohbetlerin ve ajanların seninle ilgili bildikleri.                                                                           |
| Models       | `alt+7` | Yerel ve bulut modeller; yerel token'lar Usage kartında ayrı sayılır.                                                         |
| Integrations | `alt+8` | MCP sunucuları ve bağlı hesaplar.                                                                                             |

### Klavye ve fare

| Tuşlar            | İşlem                                  |
| ----------------- | -------------------------------------- |
| `alt+1` … `alt+8` | sayfa değiştir                         |
| `ctrl+x d`        | ajan yerleştir                         |
| `ctrl+x w`        | gezinmeyi daralt veya genişlet         |
| `ctrl+p`          | komut paleti                           |
| `c`               | sohbet alanına odaklan (`esc` ile çık) |
| `esc`             | geri                                   |

Her sayfa kendi tuşlarını altta gösterir. Eğik çizgi komutları: `/day`, `/chats`, `/spaces`, `/agents`, `/skills`, `/memory`, `/models`, `/integrations`, `/deploy <metin>`, `/pause`, `/demo`, `/connect`.

Her şey fareyle de çalışır: gezinmeye, düğmelere ve tuş ipuçlarına tıkla; listelerde ilk tıklama bir satırı seçer, ikinci tıklama açar; onay kutuları anında değişir; tekerlek listeleri ve Agent Calendar'ı kaydırır. Sürüklemek hâlâ metni seçer ve kopyalar.

<a id="local-models"></a>

### Yerel modeller

`localhost` üzerindeki OpenAI uyumlu her sunucu yerel sayılır; `ollama`, `lmstudio`, `llamacpp` ve `vllm` sağlayıcıları da öyle. Örneğin Ollama ile, `opencode.json` içinde (klasöründe ya da `~/.config/opencode/` içinde):

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

### Nasıl çalışır

- Zamanlayıcı OpenWork sunucu sürecinde yaşar. Her 5 saniyede bir zamanı gelen ajanları arar ve aynı anda en fazla 3 tane çalıştırır. Rezervasyonlar SQLite'ta atomiktir; böylece birden çok OpenWork penceresi aynı ajanı asla iki kez çalıştırmaz ve bir çökmeden geriye kalan çalıştırmalar kesildi olarak işaretlenir. `OPENCODE_DISABLE_WORK_SCHEDULER=1` onu kapatır.
- Her çalıştırma, `work` ajanıyla bir opencode oturumudur — klasörlerin çalışma alanı, dosyaların teslimat olduğu bir bilgi işçisi kişiliği — sistem bağlamında hafızan ve ajanın son sonuçlarıyla, erişim düzeyine göre gözetimsiz izinlerle.
- OpenWork opencode yapılandırmasını korur: `opencode.json`, `.opencode/`, `OPENCODE_*` değişkenleri, sağlayıcılar, MCP sunucuları ve skill'ler eskisi gibi çalışır.

| Nerede                                                  | Ne                                                            |
| ------------------------------------------------------- | ------------------------------------------------------------- |
| `packages/schema/src/work.ts`                           | kayıtlar, girdiler ve `work.updated` olayı                    |
| `packages/core/src/work.ts`, `packages/core/src/work/`  | SQLite tabloları, `Work` deposu ve program ayrıştırma         |
| `packages/opencode/src/work/`                           | zamanlayıcı, gözetimsiz izinler, çalıştırma bağlamı, demo     |
| `packages/opencode/src/tool/`                           | `inbox`, `user_todo`, `agenda`, `memory` ve `deploy` araçları |
| `packages/opencode/src/server/routes/instance/httpapi/` | `/work/*` HTTP API'si                                         |
| `packages/tui/src/work/`                                | kabuk, gezinme, sayfalar ve yerleştirme penceresi             |

Kılavuzun tamamı [docs/openwork](docs/openwork/README.md) içinde.

### Geliştirme

```bash
bun install
bun dev ~/work

# kontroller bir paket dizininden çalıştırılır, asla depo kökünden değil
(cd packages/tui && bun typecheck && bun test)
(cd packages/opencode && bun typecheck && bun test test/work)
```

Ekran görüntüleri gerçek TUI'den çevrimdışı bir modelle yeniden üretilir. `--window linux` ile her biri gerçek bir X11 penceresinin fotoğrafıdır (Xvfb, xfwm4 pencere yöneticisi ve xfce4-terminal):

```bash
sudo apt-get install tmux python3-pil xvfb dbus-x11 xfwm4 xfce4-terminal greybird-gtk-theme xdotool imagemagick fonts-dejavu-core
cd packages/opencode
TZ=Europe/London bun script/openwork/screenshots.ts --window linux --out ../../docs/openwork/screenshots
```

Öğleden sonranın geç saatlerinin yaşandığı bir `TZ` seç: demonun çalıştırma geçmişi yerel saatle 06:00'da başlar.

### Teşekkürler ve lisans

OpenWork, [opencode](https://github.com/anomalyco/opencode) üzerine kuruludur ve onun [MIT lisansını](LICENSE) korur. opencode ekibi tarafından geliştirilmez ve onlarla bağlantılı değildir. Katkılar memnuniyetle karşılanır — bkz. [CONTRIBUTING.md](CONTRIBUTING.md).
