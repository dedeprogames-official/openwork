<p align="center">
  <picture>
    <source srcset="docs/openwork/logo-dark.svg" media="(prefers-color-scheme: dark)">
    <source srcset="docs/openwork/logo-light.svg" media="(prefers-color-scheme: light)">
    <img src="docs/openwork/logo-light.svg" alt="โลโก้ OpenWork" width="480">
  </picture>
</p>
<p align="center"><strong>ส่งเอเจนต์ไปทำงานในโฟลเดอร์ของคุณ พวกมันทำงานตามตาราง และคุณอ่านผลลัพธ์ได้ที่ Your Day</strong></p>
<p align="center">โหมดทำงานสำหรับเทอร์มินัล สร้างบน harness ของ opencode</p>
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

[![OpenWork — Your Day ในหน้าต่างเทอร์มินัลบน Linux](docs/openwork/screenshots/01-your-day.png)](docs/openwork/README.md)

<p align="center"><sub>ภาพหน้าจอทุกภาพที่นี่คือ TUI จริงของ OpenWork ใน xfce4-terminal บน Linux (Xfce ธีม Greybird) ที่รันพื้นที่ทำงานเดโมกับโมเดลออฟไลน์</sub></p>

---

### OpenWork คืออะไร?

OpenWork เปลี่ยน UI เทอร์มินัลของ opencode ให้เป็นที่สำหรับทำงานให้เสร็จ — ไม่ใช่แค่เขียนโค้ด อธิบายงานในประโยคเดียว เช่น _“check the Half Moon Bay cam every 10m and tell me if it's sunny”_ แล้ว OpenWork จะส่งเอเจนต์ไปยังโฟลเดอร์ในเครื่องที่คุณเลือก เอเจนต์จะทำงานตามตารางในเบื้องหลังโดยไม่ต้องมีคนดูแล และทุกอย่างที่มันพบจะมารวมอยู่ที่เดียว: **Your Day** ข้าง ๆ วาระ งานที่ต้องทำ และ **Agent Inbox** ของคุณ

มันยังคงเป็นแอปเทอร์มินัลและยังทำงานบน harness ของ opencode: เซสชัน เครื่องมือ สิทธิ์ ผู้ให้บริการ โมเดลในเครื่อง skills และเซิร์ฟเวอร์ MCP ชุดเดิม เอเจนต์ การรัน กล่องข้อความ งาน วาระ และความจำถูกเก็บไว้ในเครื่องด้วย SQLite

### จุดเด่น

- **ส่งงานได้ทันที** — หนึ่งประโยค → โฟลเดอร์ → space → ตาราง → สิทธิ์ กด enter ทุกขั้นตอน แล้วเอเจนต์จะถูกส่งออกไปและเริ่มทำงานในไม่กี่วินาที
- **ตารางเวลาด้วยภาษาธรรมดา** — เป็นภาษาอังกฤษหรือโปรตุเกส: `every 10m`, `hourly`, `every morning at 8`, `daily at 7:30`, `at 5pm`, `now`, `a cada 15 minutos`, `todo dia às 8h`
- **Your Day** — วาระ งานที่ต้องทำ Agent Inbox และเอเจนต์ทั้งหมดจัดกลุ่มตาม space พร้อมผลลัพธ์ล่าสุดและการรันครั้งถัดไป
- **Agent Calendar** — ทุกการรันของวันเรียงตามลำดับ ใส่สีตาม space ซูมได้ตั้งแต่ไม่กี่นาทีจนถึงทั้งวัน และการรันที่กำลังทำงานอยู่จะมีกรอบล้อมรอบ
- **ไม่ต้องดูแลและปลอดภัย** — การรันไม่เคยหยุดเพื่อถาม: ทุกอย่างที่จะเปิดคำขอสิทธิ์จะถูกปฏิเสธ เอเจนต์แต่ละตัวมีระดับการเข้าถึง: `read + network`, `read + write + network` หรือ `full`
- **บันทึกจริง** — ทุกการรันคือเซสชัน opencode จริงที่คุณเปิดดูได้ พร้อมการเรียกเครื่องมือ โทเคน และค่าใช้จ่าย
- **เอเจนต์ที่รายงานกลับ** — เครื่องมือ cowork อย่าง `inbox`, `user_todo`, `agenda`, `memory` และ `deploy` ช่วยให้เอเจนต์โพสต์ลงกล่องข้อความ เพิ่มงาน อ่านวาระ และจำข้อมูลเกี่ยวกับคุณ แชตก็ส่งเอเจนต์ใหม่ได้
- **Spaces** — จัดกลุ่มเอเจนต์ตามเป้าหมาย งาน หรือลูกค้า
- **ความจำ** — ข้อมูลเกี่ยวกับคุณที่ทุกแชตและทุกเอเจนต์ได้รับ
- **สถิติโทเคน** — นับโทเคนในเครื่องและบนคลาวด์แยกกัน อัตราการใช้ คาดการณ์รายวัน และเงินที่โมเดลในเครื่องช่วยประหยัด
- **คีย์บอร์ดและเมาส์** — `alt+1` … `alt+8` สำหรับหน้าต่าง ๆ และ `ctrl+p` สำหรับทุกคำสั่ง คลิกการนำทาง ปุ่ม แถว ช่องทำเครื่องหมาย และคำแนะนำปุ่มได้ เลื่อนรายการและปฏิทินด้วยลูกกลิ้ง
- **ASCII ตลอดทาง** — โลโก้ มาตรวัด และแผนภูมิวงแหวนวาดด้วยอักขระบล็อกของเทอร์มินัล

### ภาพหน้าจอ

<table>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/03-agents.png" alt="Agents"><br><b>Agents</b> — มาตรวัดโทเคน อัตราการใช้ เงินที่ประหยัด และ Agent Calendar แบบสด</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/04-agents-whole-day.png" alt="Agent Calendar ทั้งวัน"><br><b>Agent Calendar</b> แบบซูมออกทั้งวัน</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/05-agent-detail.png" alt="เอเจนต์"><br><b>เอเจนต์</b> — การเรียกเครื่องมือและผลลัพธ์ของการรันล่าสุด</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/06-agent-running.png" alt="เอเจนต์ที่กำลังรัน"><br>เอเจนต์ที่<b>กำลังรัน</b>อยู่ตอนนี้</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/14-deploy.png" alt="ส่งเอเจนต์"><br><b>ส่ง</b>เอเจนต์ด้วยประโยคเดียว</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/15-deploy-folder.png" alt="ส่งเอเจนต์: เลือกโฟลเดอร์"><br>…แล้วเลือก<b>โฟลเดอร์</b>ที่มันทำงาน</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/07-spaces.png" alt="Spaces"><br><b>Spaces</b> — เอเจนต์ที่จัดกลุ่มตามเป้าหมาย</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/08-chat.png" alt="แชต"><br><b>แชต</b>กับเอเจนต์ <code>work</code> ภายในเชลล์</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/10-skills.png" alt="Skills"><br><b>Skills</b> — คำสั่งที่ใช้ซ้ำได้</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/11-memory.png" alt="ความจำ"><br><b>Memory</b> — สิ่งที่ทุกแชตและเอเจนต์รู้เกี่ยวกับคุณ</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/12-models.png" alt="โมเดล"><br><b>Models</b> — ในเครื่องและบนคลาวด์</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/13-integrations.png" alt="การเชื่อมต่อ"><br><b>Integrations</b> — เซิร์ฟเวอร์ MCP และบัญชี</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/02-your-day-focus.png" alt="Your Day แบบซ่อนคอลัมน์เอเจนต์"><br><b>Your Day</b> แบบซ่อนคอลัมน์เอเจนต์</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/16-command-palette.png" alt="คำสั่ง"><br>ทุก<b>คำสั่ง</b>ในพาเลต (<code>ctrl+p</code>)</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/17-new-chat.png" alt="แชตใหม่"><br><b>New chat</b></td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/18-nav-collapsed.png" alt="การนำทางแบบย่อ"><br><b>การนำทาง</b>แบบย่อ (<code>ctrl+x w</code>)</td>
  </tr>
</table>

---

### เริ่มต้นใช้งาน

**สิ่งที่ต้องมี:** [Bun](https://bun.sh) 1.3 ขึ้นไป, git และเทอร์มินัลที่รองรับ truecolor และเมาส์ (xfce4-terminal, GNOME Terminal, Konsole, kitty, WezTerm, Ghostty, iTerm2, Windows Terminal…) สำหรับโมเดล: ผู้ให้บริการใดก็ได้ที่ opencode รองรับ หรือโมเดลในเครื่องผ่าน Ollama, LM Studio, llama.cpp หรือ vLLM

#### รันจากซอร์สโค้ด

```bash
git clone https://github.com/dedeprogames-official/openwork.git
cd openwork
bun install
bun dev ~/work        # โฟลเดอร์ที่ OpenWork จะเปิด
```

`bun dev .` เปิดโฟลเดอร์ปัจจุบัน ส่วน `bun dev` อย่างเดียวจะเปิด `packages/opencode`

#### สร้างไฟล์ไบนารีแบบสแตนด์อโลน

```bash
./packages/opencode/script/build.ts --single
./packages/opencode/dist/opencode-linux-x64/bin/opencode    # หรือ opencode-darwin-arm64, …
```

แพ็กเกจจะติดตั้งไบนารีตัวเดียวกันทั้งในชื่อ `opencode` และ `openwork`

#### ห้านาทีแรกของคุณ

1. **เชื่อมต่อโมเดล** — `/connect` หรือเปิด **Models** (`alt+7`) แล้วกด `c` สำหรับโมเดลในเครื่อง ดู[โมเดลในเครื่อง](#local-models)
2. **โหลดเดโม** — `/demo` สร้าง 6 spaces, 17 เอเจนต์, ประวัติการรันหนึ่งวัน, skills, ข้อความในกล่อง, งาน และวาระ เอเจนต์เริ่มต้นในสถานะหยุดชั่วคราวเพื่อไม่ให้ใช้โทเคน ส่วน `/pause` จะปล่อยให้พวกมันทำงาน
3. **ส่งเอเจนต์ของคุณเอง** — `ctrl+x d` หรือพิมพ์ `/deploy check the weather in Lisbon every morning at 7 and tell me if I need an umbrella` (เขียนตารางเวลาเป็นภาษาอังกฤษหรือโปรตุเกส ส่วนงานเขียนเป็นภาษาใดก็ได้)
4. **อ่าน Your Day** — `alt+1` ผลลัพธ์จะมาที่ Agent Inbox เปิดเอเจนต์เพื่อดูการรันของมันหรือแชตเกี่ยวกับงานของมัน

### การส่งเอเจนต์

เอเจนต์ประกอบด้วยงาน โฟลเดอร์ที่ทำงาน ตารางเวลา และระดับการเข้าถึง และอาจมี skill ด้วย มันทำงานบนโมเดลที่ถูกเลือกไว้ตอนส่ง ส่งได้จาก `ctrl+x d`, `/deploy <อะไรและเมื่อไร>`, ปุ่ม **+ Create Agent** ในหน้า Agents, จาก space หรือขอในแชต

| คุณเขียน                                                                | ตารางเวลา                                                |
| ----------------------------------------------------------------------- | -------------------------------------------------------- |
| `every 10m`, `every 2 hours`, `a cada 15 minutos`                       | ทุก N นาที ชั่วโมง หรือวัน (อย่างน้อย 1 นาที)            |
| `hourly`, `every hour`, `every minute`                                  | ทุกชั่วโมงหรือทุกนาที                                    |
| `daily at 9am`, `every morning at 8`, `every evening`, `todo dia às 8h` | ทุกวันในเวลานั้น (เช้า 08:00, เย็น 18:00, นอกนั้น 09:00) |
| `at 5pm`, `às 17h`                                                      | ครั้งเดียว ตอน 17:00 ครั้งถัดไป                          |
| `now`, `once` — หรือไม่มีคำบอกเวลาเลย                                   | ครั้งเดียว ทันที                                         |

ขั้นตอนตารางเวลามีตัวเลือก **on demand** ด้วย: เอเจนต์จะรันเฉพาะตอนที่คุณกด **Run now**

| สิทธิ์                   | เอเจนต์ทำได้                                   |
| ------------------------ | ---------------------------------------------- |
| `read + network`         | อ่านไฟล์ ท่องเว็บ โพสต์ลงกล่องข้อความของคุณ    |
| `read + write + network` | สร้างและแก้ไขไฟล์ในโฟลเดอร์ของมันได้ด้วย       |
| `full`                   | ใช้ทุกเครื่องมือที่คุณอนุญาต รวมถึงคำสั่งเชลล์ |

การรันไม่มีคนดูแล: คำถามและทุกอย่างที่จะเปิดคำขอสิทธิ์จะถูกปฏิเสธ และการรันจะหยุดหลัง 15 นาที แต่ละการรันคือเซสชันชื่อ `<เอเจนต์> · run #N` กด `o` ในหน้าของเอเจนต์เพื่อเปิดบันทึก

### หน้า

| หน้า         | ปุ่ม    | แสดง                                                                                                     |
| ------------ | ------- | -------------------------------------------------------------------------------------------------------- |
| Your Day     | `alt+1` | วาระ งาน Agent Inbox ช่องแชต และเอเจนต์ทั้งหมดจัดกลุ่มตาม space พร้อมการรันครั้งล่าสุดและครั้งถัดไป      |
| Chats        | `alt+2` | แชตของคุณ โดยไม่รวมการรันของเอเจนต์                                                                      |
| Spaces       | `alt+3` | Spaces พร้อมเอเจนต์และรายการวาระ                                                                         |
| Agents       | `alt+4` | มาตรวัดโทเคน อัตราการใช้ เงินที่ประหยัด โทเคนไปที่ไหน และ Agent Calendar                                 |
| Agent        | `enter` | เอเจนต์หนึ่งตัว: งาน ตารางเวลา สิทธิ์ การเรียกเครื่องมือและผลลัพธ์ของแต่ละการรัน ประวัติ และแชตของมันเอง |
| Skills       | `alt+5` | Skills จาก `.opencode/skills` และ `~/.agents/skills`                                                     |
| Memory       | `alt+6` | สิ่งที่แชตและเอเจนต์รู้เกี่ยวกับคุณ                                                                      |
| Models       | `alt+7` | โมเดลในเครื่องและบนคลาวด์ โทเคนในเครื่องนับแยกในการ์ด Usage                                              |
| Integrations | `alt+8` | เซิร์ฟเวอร์ MCP และบัญชีที่เชื่อมต่อ                                                                     |

### คีย์บอร์ดและเมาส์

| ปุ่ม              | การทำงาน                      |
| ----------------- | ----------------------------- |
| `alt+1` … `alt+8` | สลับหน้า                      |
| `ctrl+x d`        | ส่งเอเจนต์                    |
| `ctrl+x w`        | ย่อหรือขยายการนำทาง           |
| `ctrl+p`          | พาเลตคำสั่ง                   |
| `c`               | โฟกัสช่องแชต (`esc` เพื่อออก) |
| `esc`             | ย้อนกลับ                      |

แต่ละหน้าแสดงปุ่มของตัวเองไว้ด้านล่าง คำสั่งสแลช: `/day`, `/chats`, `/spaces`, `/agents`, `/skills`, `/memory`, `/models`, `/integrations`, `/deploy <ข้อความ>`, `/pause`, `/demo`, `/connect`

ทุกอย่างใช้เมาส์ได้ด้วย: คลิกการนำทาง ปุ่ม และคำแนะนำปุ่ม ในรายการ คลิกแรกเลือกแถว คลิกที่สองเปิดแถวนั้น ช่องทำเครื่องหมายสลับทันที ลูกกลิ้งเลื่อนรายการและ Agent Calendar การลากยังคงเลือกและคัดลอกข้อความได้ตามเดิม

<a id="local-models"></a>

### โมเดลในเครื่อง

เซิร์ฟเวอร์ที่เข้ากันได้กับ OpenAI บน `localhost` ทุกตัวนับเป็นโมเดลในเครื่อง รวมถึงผู้ให้บริการ `ollama`, `lmstudio`, `llamacpp` และ `vllm` ตัวอย่างเช่นกับ Ollama ใน `opencode.json` (ในโฟลเดอร์ของคุณหรือใน `~/.config/opencode/`):

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

### การทำงานเบื้องหลัง

- ตัวจัดตารางอยู่ในโปรเซสเซิร์ฟเวอร์ของ OpenWork มันตรวจหาเอเจนต์ที่ถึงเวลาทุก 5 วินาทีและรันพร้อมกันได้สูงสุด 3 ตัว การจองเป็นแบบอะตอมิกใน SQLite หน้าต่าง OpenWork หลายหน้าต่างจึงไม่มีทางรันเอเจนต์ตัวเดียวกันซ้ำ และการรันที่ค้างจากการแครชจะถูกทำเครื่องหมายว่าถูกขัดจังหวะ `OPENCODE_DISABLE_WORK_SCHEDULER=1` ใช้ปิดมัน
- แต่ละการรันคือเซสชัน opencode ที่ใช้เอเจนต์ `work` — เพอร์โซนาสำหรับงานความรู้ที่มองโฟลเดอร์เป็นพื้นที่ทำงานและไฟล์เป็นผลงาน — โดยมีความจำของคุณและผลลัพธ์ล่าสุดของเอเจนต์อยู่ในบริบทระบบ และใช้สิทธิ์แบบไม่มีคนดูแลตามระดับการเข้าถึง
- OpenWork ใช้การตั้งค่าของ opencode ตามเดิม: `opencode.json`, `.opencode/`, ตัวแปร `OPENCODE_*`, ผู้ให้บริการ เซิร์ฟเวอร์ MCP และ skills ทำงานเหมือนเดิม

| ที่ไหน                                                  | อะไร                                                             |
| ------------------------------------------------------- | ---------------------------------------------------------------- |
| `packages/schema/src/work.ts`                           | เรคคอร์ด อินพุต และอีเวนต์ `work.updated`                        |
| `packages/core/src/work.ts`, `packages/core/src/work/`  | ตาราง SQLite สโตร์ `Work` และการแปลงตารางเวลา                    |
| `packages/opencode/src/work/`                           | ตัวจัดตาราง สิทธิ์แบบไม่มีคนดูแล บริบทการรัน เดโม                |
| `packages/opencode/src/tool/`                           | เครื่องมือ `inbox`, `user_todo`, `agenda`, `memory` และ `deploy` |
| `packages/opencode/src/server/routes/instance/httpapi/` | HTTP API `/work/*`                                               |
| `packages/tui/src/work/`                                | เชลล์ การนำทาง หน้า และกล่องโต้ตอบการส่งเอเจนต์                  |

คู่มือฉบับเต็มอยู่ที่ [docs/openwork](docs/openwork/README.md)

### การพัฒนา

```bash
bun install
bun dev ~/work

# รันการตรวจสอบจากไดเรกทอรีของแพ็กเกจ ไม่ใช่จากรากของรีโป
(cd packages/tui && bun typecheck && bun test)
(cd packages/opencode && bun typecheck && bun test test/work)
```

ภาพหน้าจอสร้างใหม่จาก TUI จริงด้วยโมเดลออฟไลน์ เมื่อใช้ `--window linux` แต่ละภาพคือภาพถ่ายของหน้าต่าง X11 จริง (Xvfb, ตัวจัดการหน้าต่าง xfwm4 และ xfce4-terminal):

```bash
sudo apt-get install tmux python3-pil xvfb dbus-x11 xfwm4 xfce4-terminal greybird-gtk-theme xdotool imagemagick fonts-dejavu-core
cd packages/opencode
TZ=Europe/London bun script/openwork/screenshots.ts --window linux --out ../../docs/openwork/screenshots
```

เลือก `TZ` ที่เป็นช่วงบ่ายแก่ ๆ: ประวัติการรันของเดโมเริ่มเวลา 06:00 ตามเวลาท้องถิ่น

### เครดิตและสัญญาอนุญาต

OpenWork สร้างบน [opencode](https://github.com/anomalyco/opencode) และใช้ [สัญญาอนุญาต MIT](LICENSE) ตามเดิม ไม่ได้สร้างโดยทีม opencode และไม่ได้มีส่วนเกี่ยวข้องกับทีมนั้น ยินดีรับการมีส่วนร่วม — ดู [CONTRIBUTING.md](CONTRIBUTING.md)
