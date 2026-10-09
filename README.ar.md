<p align="center">
  <picture>
    <source srcset="docs/openwork/logo-dark.svg" media="(prefers-color-scheme: dark)">
    <source srcset="docs/openwork/logo-light.svg" media="(prefers-color-scheme: light)">
    <img src="docs/openwork/logo-light.svg" alt="شعار OpenWork" width="480">
  </picture>
</p>
<p align="center"><strong>انشر وكلاء في مجلداتك. يعملون وفق جدول زمني. وتقرأ النتائج في Your Day.</strong></p>
<p align="center">وضع عمل للطرفية، مبني على harness الخاص بـ opencode.</p>
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

[![OpenWork — شاشة Your Day في نافذة طرفية على Linux](docs/openwork/screenshots/01-your-day.png)](docs/openwork/README.md)

<p align="center"><sub>كل لقطات الشاشة هنا هي واجهة OpenWork الحقيقية في xfce4-terminal على Linux (Xfce، سمة Greybird)، تشغّل مساحة العمل التجريبية مع نموذج يعمل دون اتصال.</sub></p>

---

### ما هو OpenWork؟

يحوّل OpenWork واجهة الطرفية في opencode إلى مكان لإنجاز العمل، لا لكتابة الشيفرة فقط. صِف مهمة في جملة واحدة، مثل _«check the Half Moon Bay cam every 10m and tell me if it's sunny»_، فينشر OpenWork وكيلًا في مجلد محلي تختاره. يعمل الوكيل وفق جدوله في الخلفية دون إشراف، وكل ما يجده يصل إلى مكان واحد: **Your Day**، بجانب جدول أعمالك ومهامك و**Agent Inbox**.

ما زال تطبيق طرفية، وما زال يعمل على harness الخاص بـ opencode: الجلسات والأدوات والأذونات والمزوّدون والنماذج المحلية وskills وخوادم MCP نفسها. تُحفظ الوكلاء والتشغيلات وصندوق الوارد والمهام وجدول الأعمال والذاكرة محليًا في SQLite.

### أبرز المزايا

- **نشر فوري** — جملة واحدة ← مجلد ← space ← جدول ← صلاحيات. اضغط enter في كل خطوة، فيُنشر الوكيل ويبدأ العمل خلال ثوانٍ.
- **جداول بكلمات عادية** — بالإنجليزية أو البرتغالية: `every 10m` و`hourly` و`every morning at 8` و`daily at 7:30` و`at 5pm` و`now` و`a cada 15 minutos` و`todo dia às 8h`.
- **Your Day** — جدول الأعمال والمهام وAgent Inbox وكل الوكلاء مجمّعين حسب space، مع آخر نتيجة والتشغيل التالي.
- **Agent Calendar** — كل تشغيلات اليوم بالترتيب، ملوّنة حسب space، مع تكبير من بضع دقائق إلى اليوم كله، والتشغيل الجاري الآن محاط بإطار.
- **دون إشراف وبأمان** — لا تتوقف التشغيلات أبدًا لتسأل: كل ما قد يعرض طلب إذن يُرفض. لكل وكيل مستوى وصول: `read + network` أو `read + write + network` أو `full`.
- **سجلات حقيقية** — كل تشغيل جلسة opencode حقيقية يمكنك فتحها، مع استدعاءات الأدوات والرموز والتكلفة.
- **وكلاء يرفعون التقارير** — أدوات cowork وهي `inbox` و`user_todo` و`agenda` و`memory` و`deploy` تتيح للوكلاء النشر في صندوق الوارد وإضافة المهام وقراءة جدول أعمالك وتذكّر معلومات عنك. ويمكن لمحادثة أن تنشر وكلاء جددًا.
- **Spaces** — اجمع الوكلاء حول هدف أو حدث أو عميل.
- **نقل الوكلاء بين المساحات** — اضغط `m` في صفحة الوكيل، أو استخدم **+ Move an agent here...** في صفحة Spaces، أو اطلب ذلك في محادثة.
- **الذاكرة** — معلومات عنك تصل إلى كل محادثة وكل وكيل.
- **إحصاءات الرموز** — الرموز المحلية والسحابية تُحسب كلٌّ على حدة، مع معدل الاستهلاك وتوقّع يومي وما توفره لك النماذج المحلية.
- **لوحة المفاتيح والفأرة** — `alt+1` … `alt+8` للصفحات و`ctrl+p` لكل الأوامر؛ انقر على التنقل والأزرار والصفوف ومربعات الاختيار وتلميحات المفاتيح؛ ومرّر القوائم والتقويم بعجلة الفأرة.
- **ASCII من البداية إلى النهاية** — الشعار والمؤشرات والمخططات الحلقية مرسومة بأحرف الكتل في الطرفية.

### لقطات الشاشة

<table>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/03-agents.png" alt="Agents"><br><b>Agents</b> — مؤشر الرموز ومعدل الاستهلاك والتوفير وAgent Calendar المباشر</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/04-agents-whole-day.png" alt="Agent Calendar لليوم كله"><br><b>Agent Calendar</b> مصغّرًا لعرض اليوم كله</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/05-agent-detail.png" alt="الوكيل"><br><b>الوكيل</b> — استدعاءات الأدوات ونتيجة آخر تشغيل</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/06-agent-running.png" alt="وكيل قيد التشغيل"><br>وكيل <b>يعمل</b> الآن</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/14-deploy.png" alt="نشر وكيل"><br><b>انشر</b> وكيلًا بجملة واحدة</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/15-deploy-folder.png" alt="النشر: اختيار المجلد"><br>…ثم اختر <b>المجلد</b> الذي يعمل فيه</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/07-spaces.png" alt="Spaces"><br><b>Spaces</b> — وكلاء مجمّعون حول هدف</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/08-chat.png" alt="محادثة"><br><b>محادثة</b> مع الوكيل <code>work</code> داخل الواجهة</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/10-skills.png" alt="Skills"><br><b>Skills</b> — تعليمات قابلة لإعادة الاستخدام</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/11-memory.png" alt="الذاكرة"><br><b>Memory</b> — ما تعرفه كل محادثة وكل وكيل عنك</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/12-models.png" alt="النماذج"><br><b>Models</b> — محلية وسحابية</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/13-integrations.png" alt="التكاملات"><br><b>Integrations</b> — خوادم MCP والحسابات</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/02-your-day-focus.png" alt="Your Day دون عمود الوكلاء"><br><b>Your Day</b> مع إخفاء عمود الوكلاء</td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/16-command-palette.png" alt="الأوامر"><br>كل <b>الأوامر</b> في اللوحة (<code>ctrl+p</code>)</td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/17-new-chat.png" alt="محادثة جديدة"><br><b>New chat</b></td>
    <td width="50%" align="center"><img src="docs/openwork/screenshots/18-nav-collapsed.png" alt="تنقل مطوي"><br><b>التنقل</b> مطويًا (<code>ctrl+x w</code>)</td>
  </tr>
</table>

---

### البدء

#### التثبيت

```bash
# macOS وLinux
curl -fsSL https://github.com/dedeprogames-official/openwork/releases/latest/download/install | bash
```

```powershell
# Windows (PowerShell)
irm https://github.com/dedeprogames-official/openwork/releases/latest/download/install.ps1 | iex
```

```bash
# أي نظام فيه Node.js 18+: يشغّله npx مرة واحدة، ويُبقي npm install -g الأمر openwork
npx https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-cli.tgz
npm install -g https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-cli.tgz
```

ثم افتح مجلدًا وشغّل `openwork`. يحدّثه `openwork upgrade` إلى أحدث إصدار، ويزيله `openwork uninstall`.

#### التنزيلات

| المنصة                   | التنزيل                                                                                                                                       |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Linux x64                | [`openwork-linux-x64.tar.gz`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-linux-x64.tar.gz)           |
| Linux arm64              | [`openwork-linux-arm64.tar.gz`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-linux-arm64.tar.gz)       |
| Linux x64 (musl, Alpine) | [`openwork-linux-x64-musl.tar.gz`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-linux-x64-musl.tar.gz) |
| macOS Apple Silicon      | [`openwork-darwin-arm64.zip`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-darwin-arm64.zip)           |
| macOS Intel              | [`openwork-darwin-x64.zip`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-darwin-x64.zip)               |
| Windows x64              | [`openwork-windows-x64.zip`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-windows-x64.zip)             |
| Windows arm64            | [`openwork-windows-arm64.zip`](https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-windows-arm64.zip)         |

كل الإصدارات موجودة في [صفحة الإصدارات](https://github.com/dedeprogames-official/openwork/releases). يحتوي كل أرشيف على الملف التنفيذي `openwork`؛ إصدارات `-baseline` لمعالجات x64 بلا AVX2 وإصدارات `-musl` لـ Alpine، ويختار المثبّت الإصدار المناسب. الملفات التنفيذية لـ macOS موقّعة توقيعًا مؤقتًا (ad hoc) وغير موثّقة: بعد تنزيل ملف zip من المتصفح شغّل `xattr -d com.apple.quarantine openwork` مرة واحدة.

#### Windows

يضع مثبّت PowerShell الملف `openwork.exe` في `%USERPROFILE%\.openwork\bin` ويضيفه إلى PATH: افتح طرفية جديدة وشغّل `openwork`. أفضل النتائج مع Windows Terminal (ألوان كاملة وفأرة). يمكنك أيضًا فك ضغط `openwork-windows-x64.zip` في أي مكان وتشغيل `openwork.exe`، أو استخدام `npx` كما سبق.

#### التشغيل من الشيفرة المصدرية

**المتطلبات:** [Bun](https://bun.sh) الإصدار 1.3 أو أحدث، وgit، وطرفية تدعم الألوان الكاملة والفأرة (xfce4-terminal وGNOME Terminal وKonsole وkitty وWezTerm وGhostty وiTerm2 وWindows Terminal…). للنماذج: أي مزوّد يدعمه opencode، أو نموذج محلي عبر Ollama أو LM Studio أو llama.cpp أو vLLM.

```bash
git clone https://github.com/dedeprogames-official/openwork.git
cd openwork
bun install
bun dev ~/work        # المجلد الذي يفتح فيه OpenWork
```

`bun dev .` يفتح المجلد الحالي؛ و`bun dev` وحده يفتح `packages/opencode`.

#### بناء ملف تنفيذي مستقل

```bash
./packages/opencode/script/build.ts --single
./packages/opencode/dist/opencode-linux-x64/bin/opencode    # أو opencode-darwin-arm64، …
```

تثبّت الحزمة الملف التنفيذي نفسه باسمَي `opencode` و`openwork`.

#### دقائقك الخمس الأولى

1. **اربط نموذجًا** — `/connect`، أو افتح **Models** (`alt+7`) واضغط `c`. للنماذج المحلية راجع [النماذج المحلية](#local-models).
2. **حمّل العرض التجريبي** — `/demo` ينشئ 6 spaces و17 وكيلًا ويومًا من سجل التشغيل وskills ورسائل في صندوق الوارد ومهام وجدول أعمال. يبدأ الوكلاء متوقفين مؤقتًا حتى لا تُستهلك رموز؛ و`/pause` يتركهم يعملون.
3. **انشر وكيلك** — `ctrl+x d`، أو اكتب `/deploy check the weather in Lisbon every morning at 7 and tell me if I need an umbrella` (يُكتب الجدول بالإنجليزية أو البرتغالية، والمهمة بأي لغة).
4. **اقرأ Your Day** — `alt+1`. تصل النتائج إلى Agent Inbox؛ افتح وكيلًا لترى تشغيلاته أو لتتحدث عن عمله.

### نشر الوكلاء

الوكيل هو مهمة ومجلد يعمل فيه وجدول ومستوى وصول، ومعها skill اختياريًا. يعمل على النموذج الذي كان محددًا عند نشره. انشر عبر `ctrl+x d`، أو `/deploy <ماذا ومتى>`، أو زر **+ Create Agent** في صفحة Agents، أو من space، أو بطلب ذلك في محادثة.

| ما تكتبه                                                                | الجدول                                                       |
| ----------------------------------------------------------------------- | ------------------------------------------------------------ |
| `every 10m`, `every 2 hours`, `a cada 15 minutos`                       | كل N دقيقة أو ساعة أو يوم (دقيقة واحدة على الأقل)            |
| `hourly`, `every hour`, `every minute`                                  | كل ساعة أو كل دقيقة                                          |
| `daily at 9am`, `every morning at 8`, `every evening`, `todo dia às 8h` | كل يوم في ذلك الوقت (الصباح 08:00، المساء 18:00، وإلا 09:00) |
| `at 5pm`, `às 17h`                                                      | مرة واحدة، عند الساعة 17:00 التالية                          |
| `now`, `once` — أو دون أي كلمات توقيت                                   | مرة واحدة، فورًا                                             |

تقدّم خطوة الجدول أيضًا خيار **on demand**: لا يعمل الوكيل إلا عندما تضغط **Run now**.

| الوصول                   | يستطيع الوكيل                                           |
| ------------------------ | ------------------------------------------------------- |
| `read + network`         | قراءة الملفات وتصفح الويب والنشر في صندوق الوارد        |
| `read + write + network` | وأيضًا إنشاء الملفات وتعديلها في مجلده                  |
| `full`                   | استخدام كل الأدوات التي تسمح بها، بما فيها أوامر الصدفة |

التشغيلات دون إشراف: تُرفض الأسئلة وكل ما قد يعرض طلب إذن، ويتوقف التشغيل بعد 15 دقيقة. كل تشغيل جلسة باسم `<الوكيل> · run #N`؛ اضغط `o` في صفحة الوكيل لفتح سجله.

### الصفحات

| الصفحة       | المفتاح | تعرض                                                                                              |
| ------------ | ------- | ------------------------------------------------------------------------------------------------- |
| Your Day     | `alt+1` | جدول الأعمال والمهام وAgent Inbox وحقل محادثة وكل الوكلاء مجمّعين حسب space مع آخر تشغيل والتالي. |
| Chats        | `alt+2` | محادثاتك؛ تشغيلات الوكلاء لا تظهر في القائمة.                                                     |
| Spaces       | `alt+3` | المساحات مع وكلائها وعناصر جدول أعمالها.                                                          |
| Agents       | `alt+4` | مؤشر الرموز ومعدل الاستهلاك والتوفير وأين تذهب الرموز وAgent Calendar.                            |
| Agent        | `enter` | وكيل واحد: المهمة والجدول والوصول واستدعاءات الأدوات ونتيجة كل تشغيل والسجل ومحادثته الخاصة.      |
| Skills       | `alt+5` | skills من `.opencode/skills` و`~/.agents/skills`.                                                 |
| Memory       | `alt+6` | ما تعرفه المحادثات والوكلاء عنك.                                                                  |
| Models       | `alt+7` | النماذج المحلية والسحابية؛ تُحسب الرموز المحلية على حدة في بطاقة Usage.                           |
| Integrations | `alt+8` | خوادم MCP والحسابات المتصلة.                                                                      |

### لوحة المفاتيح والفأرة

| المفاتيح          | الإجراء                                                                       |
| ----------------- | ----------------------------------------------------------------------------- |
| `alt+1` … `alt+8` | التنقل بين الصفحات                                                            |
| `ctrl+x d`        | نشر وكيل                                                                      |
| `ctrl+x w`        | طي التنقل أو توسيعه                                                           |
| `m`               | نقل الوكيل إلى مساحة أخرى (في صفحته) أو نقل وكيل إلى المساحة المحددة (Spaces) |
| `ctrl+p`          | لوحة الأوامر                                                                  |
| `c`               | التركيز على حقل المحادثة (`esc` للخروج)                                       |
| `esc`             | رجوع                                                                          |

تعرض كل صفحة مفاتيحها في الأسفل. أوامر الشرطة المائلة: `/day` و`/chats` و`/spaces` و`/agents` و`/skills` و`/memory` و`/models` و`/integrations` و`/deploy <نص>` و`/pause` و`/demo` و`/connect`.

كل شيء يعمل بالفأرة أيضًا: انقر على التنقل والأزرار وتلميحات المفاتيح؛ في القوائم تحدد النقرة الأولى صفًا وتفتحه الثانية؛ تتبدل مربعات الاختيار فورًا؛ وتمرّر العجلة القوائم وAgent Calendar. ويظل السحب يحدد النص وينسخه.

<a id="local-models"></a>

### النماذج المحلية

يُعدّ أي خادم متوافق مع OpenAI على `localhost` محليًا، وكذلك المزوّدون `ollama` و`lmstudio` و`llamacpp` و`vllm`. مثلًا مع Ollama، في `opencode.json` (في مجلدك أو في `~/.config/openwork/`):

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

### كيف يعمل

- يعيش المجدول داخل عملية خادم OpenWork. يبحث كل 5 ثوانٍ عن الوكلاء الذين حان وقتهم ويشغّل حتى 3 في الوقت نفسه. الحجز ذرّي في SQLite، فلا تشغّل نوافذ OpenWork المتعددة الوكيل نفسه مرتين أبدًا، والتشغيلات التي يتركها تعطل مفاجئ تُعلَّم بأنها مقطوعة. `OPENCODE_DISABLE_WORK_SCHEDULER=1` يوقفه.
- كل تشغيل جلسة opencode مع الوكيل `work` — شخصية لعمل المعرفة ترى المجلدات مساحات عمل والملفات مخرجات — مع ذاكرتك وأحدث نتائج الوكيل في سياق النظام، وأذونات دون إشراف وفق مستوى وصوله.
- يحتفظ OpenWork بإعدادات opencode: `opencode.json` و`.opencode/` ومتغيرات `OPENCODE_*` والمزوّدون وخوادم MCP وskills تعمل كما كانت.
- يحفظ OpenWork بياناته في `~/.local/share/openwork` وإعداداته العامة في `~/.config/openwork`، بعيدًا عن أي تثبيت لـ opencode، ولا يحدّث نفسه إلا من إصداراته على GitHub.

| أين                                                     | ماذا                                                          |
| ------------------------------------------------------- | ------------------------------------------------------------- |
| `packages/schema/src/work.ts`                           | السجلات والمدخلات والحدث `work.updated`                       |
| `packages/core/src/work.ts`, `packages/core/src/work/`  | جداول SQLite ومخزن `Work` وتحليل الجداول الزمنية              |
| `packages/opencode/src/work/`                           | المجدول وأذونات العمل دون إشراف وسياق التشغيل والعرض التجريبي |
| `packages/opencode/src/tool/`                           | الأدوات `inbox` و`user_todo` و`agenda` و`memory` و`deploy`    |
| `packages/opencode/src/server/routes/instance/httpapi/` | واجهة HTTP البرمجية `/work/*`                                 |
| `packages/tui/src/work/`                                | الواجهة والتنقل والصفحات ونافذة النشر                         |

الدليل الكامل موجود في [docs/openwork](docs/openwork/README.md).

### التطوير

```bash
bun install
bun dev ~/work

# تُشغَّل الفحوص من مجلد حزمة، لا من جذر المستودع أبدًا
(cd packages/tui && bun typecheck && bun test)
(cd packages/opencode && bun typecheck && bun test test/work)
```

تُعاد توليد لقطات الشاشة من الواجهة الحقيقية مع نموذج يعمل دون اتصال. مع `--window linux` تصبح كل لقطة صورة لنافذة X11 حقيقية (Xvfb ومدير النوافذ xfwm4 وxfce4-terminal):

```bash
sudo apt-get install tmux python3-pil xvfb dbus-x11 xfwm4 xfce4-terminal greybird-gtk-theme xdotool imagemagick fonts-dejavu-core
cd packages/opencode
TZ=Europe/London bun script/openwork/screenshots.ts --window linux --out ../../docs/openwork/screenshots
```

اختر `TZ` يكون فيها الوقت آخر العصر: يبدأ سجل تشغيلات العرض التجريبي عند 06:00 بالتوقيت المحلي.

### الشكر والترخيص

OpenWork مبني على [opencode](https://github.com/anomalyco/opencode) ويحتفظ بـ[ترخيص MIT](LICENSE) الخاص به. لا يطوّره فريق opencode وليس تابعًا له. المساهمات مرحّب بها — راجع [CONTRIBUTING.md](CONTRIBUTING.md).
