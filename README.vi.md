<p align="center">
  <picture>
    <source srcset="docs/openwork/logo-dark.svg" media="(prefers-color-scheme: dark)">
    <source srcset="docs/openwork/logo-light.svg" media="(prefers-color-scheme: light)">
    <img src="docs/openwork/logo-light.svg" alt="Logo OpenWork" width="480">
  </picture>
</p>
<p align="center"><strong>Triển khai agent vào thư mục của bạn. Chúng làm việc theo lịch. Bạn đọc kết quả trong Your Day.</strong></p>
<p align="center">Một chế độ làm việc cho terminal, xây dựng trên harness của opencode.</p>
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

[![OpenWork — Your Day trong cửa sổ terminal trên Linux](docs/openwork/screenshots/01-your-day.png)](docs/openwork/README.md)

<p align="center"><sub>Mọi ảnh chụp màn hình ở đây đều là TUI OpenWork thật trong xfce4-terminal trên Linux (Xfce, giao diện Greybird), chạy không gian làm việc demo với một mô hình ngoại tuyến.</sub></p>

---

### OpenWork là gì?

OpenWork biến giao diện terminal của opencode thành nơi để hoàn thành công việc — không chỉ viết code. Mô tả một việc trong một câu, chẳng hạn _“check the Half Moon Bay cam every 10m and tell me if it's sunny”_, và OpenWork sẽ triển khai một agent vào thư mục cục bộ bạn chọn. Agent chạy theo lịch ở chế độ nền, không cần giám sát, và mọi thứ nó tìm được đều về một chỗ: **Your Day**, cạnh lịch trình, việc cần làm và **Agent Inbox** của bạn.

Nó vẫn là ứng dụng terminal và vẫn chạy trên harness của opencode: cùng phiên làm việc, công cụ, quyền, nhà cung cấp, mô hình cục bộ, skills và máy chủ MCP. Agent, lượt chạy, hộp thư, việc cần làm, lịch trình và bộ nhớ được lưu cục bộ trong SQLite.

### Điểm nổi bật

- **Triển khai tức thì** — một câu → thư mục → space → lịch → quyền truy cập. Nhấn enter ở mỗi bước và agent được triển khai và chạy trong vài giây.
- **Lịch bằng lời thường** — bằng tiếng Anh hoặc tiếng Bồ Đào Nha: `every 10m`, `hourly`, `every morning at 8`, `daily at 7:30`, `at 5pm`, `now`, `a cada 15 minutos`, `todo dia às 8h`.
- **Your Day** — lịch trình, việc cần làm, Agent Inbox và mọi agent nhóm theo space, kèm kết quả gần nhất và lượt chạy tiếp theo.
- **Agent Calendar** — mọi lượt chạy trong ngày theo thứ tự, tô màu theo space, phóng to từ vài phút đến cả ngày, và lượt đang chạy được viền khung.
- **Không giám sát và an toàn** — lượt chạy không bao giờ dừng lại để hỏi: mọi thứ sẽ hiện yêu cầu cấp quyền đều bị từ chối. Mỗi agent có một mức truy cập: `read + network`, `read + write + network` hoặc `full`.
- **Bản ghi thật** — mỗi lượt chạy là một phiên opencode thật mà bạn có thể mở, với các lệnh gọi công cụ, token và chi phí.
- **Agent biết báo cáo** — các công cụ cowork `inbox`, `user_todo`, `agenda`, `memory` và `deploy` cho phép agent gửi vào hộp thư, thêm việc cần làm, đọc lịch trình và ghi nhớ thông tin về bạn. Một cuộc trò chuyện có thể triển khai agent mới.
- **Spaces** — nhóm agent quanh một mục tiêu, một sự kiện hoặc một khách hàng.
- **Bộ nhớ** — những điều về bạn mà mọi cuộc trò chuyện và mọi agent đều nhận được.
- **Thống kê token** — token cục bộ và đám mây được tính riêng, tốc độ tiêu thụ, dự báo theo ngày và số tiền mô hình cục bộ giúp bạn tiết kiệm.
- **Bàn phím và chuột** — `alt+1` … `alt+8` cho các trang và `ctrl+p` cho mọi lệnh; nhấp vào điều hướng, nút, hàng, ô đánh dấu và gợi ý phím; cuộn danh sách và lịch bằng con lăn.
- **ASCII từ đầu đến cuối** — logo, đồng hồ đo và biểu đồ vòng được vẽ bằng ký tự khối của terminal.

### Ảnh chụp màn hình

<table>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/03-agents.png" alt="Agents"><br><b>Agents</b> — đồng hồ token, tốc độ tiêu thụ, tiết kiệm và Agent Calendar trực tiếp</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/04-agents-whole-day.png" alt="Agent Calendar cả ngày"><br><b>Agent Calendar</b> thu nhỏ cho cả ngày</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/05-agent-detail.png" alt="Agent"><br><b>Agent</b> — các lệnh gọi công cụ và kết quả của lượt chạy gần nhất</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/06-agent-running.png" alt="Agent đang chạy"><br>Một agent <b>đang chạy</b> ngay lúc này</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/14-deploy.png" alt="Triển khai agent"><br><b>Triển khai</b> agent bằng một câu</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/15-deploy-folder.png" alt="Triển khai: chọn thư mục"><br>…rồi chọn <b>thư mục</b> nơi nó làm việc</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/07-spaces.png" alt="Spaces"><br><b>Spaces</b> — agent nhóm quanh một mục tiêu</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/08-chat.png" alt="Trò chuyện"><br>Một cuộc <b>trò chuyện</b> với agent <code>work</code>, ngay trong shell</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/10-skills.png" alt="Skills"><br><b>Skills</b> — chỉ dẫn dùng lại được</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/11-memory.png" alt="Bộ nhớ"><br><b>Memory</b> — những gì mọi cuộc trò chuyện và agent biết về bạn</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/12-models.png" alt="Mô hình"><br><b>Models</b> — cục bộ và đám mây</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/13-integrations.png" alt="Tích hợp"><br><b>Integrations</b> — máy chủ MCP và tài khoản</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/02-your-day-focus.png" alt="Your Day không có cột agent"><br><b>Your Day</b> khi ẩn cột agent</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/16-command-palette.png" alt="Lệnh"><br>Mọi <b>lệnh</b> trong bảng lệnh (<code>ctrl+p</code>)</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/17-new-chat.png" alt="Cuộc trò chuyện mới"><br><b>New chat</b></td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/18-nav-collapsed.png" alt="Điều hướng thu gọn"><br><b>Điều hướng</b> thu gọn (<code>ctrl+x w</code>)</td>
  </tr>
</table>

---

### Bắt đầu

**Yêu cầu:** [Bun](https://bun.sh) 1.3 trở lên, git và một terminal hỗ trợ truecolor và chuột (xfce4-terminal, GNOME Terminal, Konsole, kitty, WezTerm, Ghostty, iTerm2, Windows Terminal…). Về mô hình: bất kỳ nhà cung cấp nào opencode hỗ trợ, hoặc mô hình cục bộ chạy bằng Ollama, LM Studio, llama.cpp hay vLLM.

#### Chạy từ mã nguồn

```bash
git clone https://github.com/dedeprogames-official/openwork.git
cd openwork
bun install
bun dev ~/work        # thư mục OpenWork sẽ mở
```

`bun dev .` mở thư mục hiện tại; chỉ `bun dev` thì mở `packages/opencode`.

#### Build một tệp thực thi độc lập

```bash
./packages/opencode/script/build.ts --single
./packages/opencode/dist/opencode-linux-x64/bin/opencode    # hoặc opencode-darwin-arm64, …
```

Gói cài cùng một tệp thực thi dưới cả hai tên `opencode` và `openwork`.

#### Năm phút đầu tiên

1. **Kết nối mô hình** — `/connect`, hoặc mở **Models** (`alt+7`) rồi nhấn `c`. Với mô hình cục bộ, xem [Mô hình cục bộ](#local-models).
2. **Tải bản demo** — `/demo` tạo 6 space, 17 agent, một ngày lịch sử chạy, skills, tin nhắn trong hộp thư, việc cần làm và lịch trình. Các agent bắt đầu ở trạng thái tạm dừng để không tốn token; `/pause` cho chúng chạy.
3. **Triển khai agent của bạn** — `ctrl+x d`, hoặc gõ `/deploy check the weather in Lisbon every morning at 7 and tell me if I need an umbrella` (lịch viết bằng tiếng Anh hoặc tiếng Bồ Đào Nha; nhiệm vụ viết bằng ngôn ngữ nào cũng được).
4. **Đọc Your Day** — `alt+1`. Kết quả về Agent Inbox; mở một agent để xem các lượt chạy hoặc trò chuyện về công việc của nó.

### Triển khai agent

Một agent gồm một nhiệm vụ, một thư mục làm việc, một lịch và một mức truy cập, có thể kèm một skill. Nó chạy trên mô hình được chọn lúc bạn triển khai. Triển khai bằng `ctrl+x d`, `/deploy <làm gì và khi nào>`, nút **+ Create Agent** trên trang Agents, từ một space hoặc bằng cách nhờ trong cuộc trò chuyện.

| Bạn viết                                                                | Lịch                                                       |
| ----------------------------------------------------------------------- | ---------------------------------------------------------- |
| `every 10m`, `every 2 hours`, `a cada 15 minutos`                       | mỗi N phút, giờ hoặc ngày (ít nhất 1 phút)                 |
| `hourly`, `every hour`, `every minute`                                  | mỗi giờ hoặc mỗi phút                                      |
| `daily at 9am`, `every morning at 8`, `every evening`, `todo dia às 8h` | mỗi ngày vào giờ đó (sáng 08:00, tối 18:00, còn lại 09:00) |
| `at 5pm`, `às 17h`                                                      | một lần, vào 17:00 kế tiếp                                 |
| `now`, `once` — hoặc không có từ chỉ thời gian                          | một lần, ngay lập tức                                      |

Bước chọn lịch cũng có **on demand**: agent chỉ chạy khi bạn nhấn **Run now**.

| Quyền truy cập           | Agent được phép                                 |
| ------------------------ | ----------------------------------------------- |
| `read + network`         | đọc tệp, duyệt web, gửi vào hộp thư của bạn     |
| `read + write + network` | thêm việc tạo và sửa tệp trong thư mục của nó   |
| `full`                   | dùng mọi công cụ bạn cho phép, kể cả lệnh shell |

Lượt chạy không có giám sát: câu hỏi và mọi thứ sẽ hiện yêu cầu cấp quyền đều bị từ chối, và một lượt chạy dừng sau 15 phút. Mỗi lượt chạy là một phiên tên `<agent> · run #N`; nhấn `o` trên trang của agent để mở bản ghi.

### Các trang

| Trang        | Phím    | Hiển thị                                                                                                                            |
| ------------ | ------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Your Day     | `alt+1` | Lịch trình, việc cần làm, Agent Inbox, ô trò chuyện và mọi agent nhóm theo space cùng lượt chạy trước và kế tiếp.                   |
| Chats        | `alt+2` | Các cuộc trò chuyện của bạn; lượt chạy của agent không nằm trong danh sách.                                                         |
| Spaces       | `alt+3` | Các space cùng agent và mục lịch trình của chúng.                                                                                   |
| Agents       | `alt+4` | Đồng hồ token, tốc độ tiêu thụ, tiết kiệm, token đi đâu và Agent Calendar.                                                          |
| Agent        | `enter` | Một agent: nhiệm vụ, lịch, quyền truy cập, lệnh gọi công cụ và kết quả của từng lượt chạy, lịch sử và cuộc trò chuyện riêng của nó. |
| Skills       | `alt+5` | Skills từ `.opencode/skills` và `~/.agents/skills`.                                                                                 |
| Memory       | `alt+6` | Những gì các cuộc trò chuyện và agent biết về bạn.                                                                                  |
| Models       | `alt+7` | Mô hình cục bộ và đám mây; token cục bộ được tính riêng trong thẻ Usage.                                                            |
| Integrations | `alt+8` | Máy chủ MCP và tài khoản đã kết nối.                                                                                                |

### Bàn phím và chuột

| Phím              | Thao tác                               |
| ----------------- | -------------------------------------- |
| `alt+1` … `alt+8` | chuyển trang                           |
| `ctrl+x d`        | triển khai agent                       |
| `ctrl+x w`        | thu gọn hoặc mở rộng điều hướng        |
| `ctrl+p`          | bảng lệnh                              |
| `c`               | chuyển tới ô trò chuyện (`esc` để rời) |
| `esc`             | quay lại                               |

Mỗi trang hiển thị phím riêng ở dưới cùng. Lệnh gạch chéo: `/day`, `/chats`, `/spaces`, `/agents`, `/skills`, `/memory`, `/models`, `/integrations`, `/deploy <văn bản>`, `/pause`, `/demo`, `/connect`.

Mọi thứ cũng dùng được bằng chuột: nhấp vào điều hướng, nút và gợi ý phím; trong danh sách, cú nhấp đầu chọn một hàng và cú nhấp thứ hai mở nó; ô đánh dấu đổi ngay; con lăn cuộn danh sách và Agent Calendar. Kéo chuột vẫn chọn và sao chép văn bản như trước.

<a id="local-models"></a>

### Mô hình cục bộ

Mọi máy chủ tương thích OpenAI trên `localhost` đều được tính là cục bộ, cũng như các nhà cung cấp `ollama`, `lmstudio`, `llamacpp` và `vllm`. Ví dụ với Ollama, trong `opencode.json` (trong thư mục của bạn hoặc trong `~/.config/opencode/`):

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

### Cách hoạt động

- Bộ lập lịch nằm trong tiến trình máy chủ OpenWork. Cứ 5 giây nó tìm các agent đến hạn và chạy tối đa 3 agent cùng lúc. Việc giành lượt chạy là nguyên tử trong SQLite, nên nhiều cửa sổ OpenWork không bao giờ chạy cùng một agent hai lần, và các lượt chạy bị bỏ lại sau sự cố được đánh dấu là bị gián đoạn. `OPENCODE_DISABLE_WORK_SCHEDULER=1` tắt nó.
- Mỗi lượt chạy là một phiên opencode với agent `work` — một persona làm việc tri thức coi thư mục là không gian làm việc và tệp là sản phẩm — với bộ nhớ của bạn và các kết quả gần đây của agent trong ngữ cảnh hệ thống, cùng quyền không giám sát theo mức truy cập của nó.
- OpenWork giữ nguyên cấu hình của opencode: `opencode.json`, `.opencode/`, các biến `OPENCODE_*`, nhà cung cấp, máy chủ MCP và skills vẫn hoạt động như trước.

| Ở đâu                                                   | Là gì                                                            |
| ------------------------------------------------------- | ---------------------------------------------------------------- |
| `packages/schema/src/work.ts`                           | bản ghi, đầu vào và sự kiện `work.updated`                       |
| `packages/core/src/work.ts`, `packages/core/src/work/`  | bảng SQLite, kho `Work` và phân tích lịch                        |
| `packages/opencode/src/work/`                           | bộ lập lịch, quyền không giám sát, ngữ cảnh lượt chạy, demo      |
| `packages/opencode/src/tool/`                           | các công cụ `inbox`, `user_todo`, `agenda`, `memory` và `deploy` |
| `packages/opencode/src/server/routes/instance/httpapi/` | HTTP API `/work/*`                                               |
| `packages/tui/src/work/`                                | shell, điều hướng, các trang và hộp thoại triển khai             |

Hướng dẫn đầy đủ nằm trong [docs/openwork](docs/openwork/README.md).

### Phát triển

```bash
bun install
bun dev ~/work

# chạy kiểm tra từ thư mục của một gói, không bao giờ từ gốc repo
(cd packages/tui && bun typecheck && bun test)
(cd packages/opencode && bun typecheck && bun test test/work)
```

Ảnh chụp màn hình được tạo lại từ TUI thật với một mô hình ngoại tuyến. Với `--window linux`, mỗi ảnh là một bức ảnh chụp cửa sổ X11 thật (Xvfb, trình quản lý cửa sổ xfwm4 và xfce4-terminal):

```bash
sudo apt-get install tmux python3-pil xvfb dbus-x11 xfwm4 xfce4-terminal greybird-gtk-theme xdotool imagemagick fonts-dejavu-core
cd packages/opencode
TZ=Europe/London bun script/openwork/screenshots.ts --window linux --out ../../docs/openwork/screenshots
```

Chọn một `TZ` đang là cuối buổi chiều: lịch sử chạy của bản demo bắt đầu lúc 06:00 giờ địa phương.

### Ghi công và giấy phép

OpenWork được xây dựng trên [opencode](https://github.com/anomalyco/opencode) và giữ [giấy phép MIT](LICENSE) của nó. Dự án không do nhóm opencode phát triển và không liên kết với họ. Mọi đóng góp đều được hoan nghênh — xem [CONTRIBUTING.md](CONTRIBUTING.md).
