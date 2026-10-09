#!/usr/bin/env bun
/**
 * Packages the OpenWork release assets from the binaries script/build.ts left in dist/:
 *
 * - openwork-<target>.tar.gz (Linux) or .zip (macOS, Windows), each holding the `openwork` binary
 * - install and install.ps1, so the one-line installers can always fetch them from the latest release
 * - openwork-cli.tgz, the npm launcher behind `npx <url>` and `npm install -g <url>`
 * - SHA256SUMS, and dist/release-notes.md for the release body
 *
 * Run from packages/opencode after the build:
 *
 *   OPENCODE_VERSION=0.1.0 bun script/build.ts
 *   OPENCODE_VERSION=0.1.0 bun script/openwork/release.ts
 */
import { $ } from "bun"
import fs from "fs/promises"
import path from "path"

const version = process.env.OPENCODE_VERSION
if (!version) throw new Error("Set OPENCODE_VERSION, for example 0.1.0")
const root = path.resolve(import.meta.dir, "../../../..")
const dist = path.resolve(import.meta.dir, "../../dist")
const out = path.join(dist, "release")
const work = path.join(dist, "release-work")
const repo = "https://github.com/dedeprogames-official/openwork"

const builds = (await fs.readdir(dist)).filter((name) => name.startsWith("opencode-")).sort()
if (builds.length === 0) throw new Error(`No builds in ${dist}: run script/build.ts first`)
await fs.rm(out, { recursive: true, force: true })
await fs.rm(work, { recursive: true, force: true })
await fs.mkdir(out, { recursive: true })

for (const build of builds) {
  const target = build.slice("opencode-".length)
  const exe = target.startsWith("windows") ? ".exe" : ""
  const staging = path.join(work, target)
  await fs.mkdir(staging, { recursive: true })
  await fs.copyFile(path.join(dist, build, "bin", `opencode${exe}`), path.join(staging, `openwork${exe}`))
  // CI artifacts drop the executable bit between jobs.
  await fs.chmod(path.join(staging, `openwork${exe}`), 0o755)
  if (target.startsWith("linux")) await $`tar -czf ${path.join(out, `openwork-${target}.tar.gz`)} openwork`.cwd(staging)
  else await $`zip -q -X ${path.join(out, `openwork-${target}.zip`)} openwork${exe}`.cwd(staging)
  console.log(`packaged openwork-${target}`)
}

await fs.copyFile(path.join(root, "install"), path.join(out, "install"))
await fs.copyFile(path.join(root, "install.ps1"), path.join(out, "install.ps1"))

const npm = path.join(work, "npm")
await fs.cp(path.join(import.meta.dir, "npm"), npm, { recursive: true })
const pkg = await Bun.file(path.join(npm, "package.json")).json()
await Bun.write(path.join(npm, "package.json"), JSON.stringify({ ...pkg, version }, null, 2) + "\n")
await $`npm pack --silent --pack-destination ${work}`.cwd(npm)
await fs.rename(path.join(work, `openwork-cli-${version}.tgz`), path.join(out, "openwork-cli.tgz"))
await fs.rm(work, { recursive: true, force: true })

const assets = (await fs.readdir(out)).sort()
const sums = await Promise.all(
  assets.map(
    async (name) =>
      `${new Bun.CryptoHasher("sha256").update(await Bun.file(path.join(out, name)).arrayBuffer()).digest("hex")}  ${name}`,
  ),
)
await Bun.write(path.join(out, "SHA256SUMS"), sums.join("\n") + "\n")

const download = (asset: string) => `[\`${asset}\`](${repo}/releases/download/v${version}/${asset})`
await Bun.write(
  path.join(dist, "release-notes.md"),
  [
    `OpenWork ${version}: deploy agents into your folders, let them work on a schedule and read the results on Your Day — in the terminal.`,
    "",
    "### Install",
    "",
    "```bash",
    "# macOS and Linux",
    `curl -fsSL ${repo}/releases/latest/download/install | bash`,
    "```",
    "",
    "```powershell",
    "# Windows (PowerShell)",
    `irm ${repo}/releases/latest/download/install.ps1 | iex`,
    "```",
    "",
    "```bash",
    "# Any OS with Node.js 18+: run it once with npx, or install the openwork command with npm",
    `npx ${repo}/releases/latest/download/openwork-cli.tgz`,
    `npm install -g ${repo}/releases/latest/download/openwork-cli.tgz`,
    "```",
    "",
    "Then open a folder, run `openwork`, `/connect` a model and `/deploy` an agent. `/demo` loads an example workspace.",
    "",
    "### Downloads",
    "",
    "| System | Download |",
    "| --- | --- |",
    `| Linux x64 | ${download("openwork-linux-x64.tar.gz")} |`,
    `| Linux arm64 | ${download("openwork-linux-arm64.tar.gz")} |`,
    `| Linux x64 (musl, Alpine) | ${download("openwork-linux-x64-musl.tar.gz")} |`,
    `| macOS Apple Silicon | ${download("openwork-darwin-arm64.zip")} |`,
    `| macOS Intel | ${download("openwork-darwin-x64.zip")} |`,
    `| Windows x64 | ${download("openwork-windows-x64.zip")} |`,
    `| Windows arm64 | ${download("openwork-windows-arm64.zip")} |`,
    "",
    "Each archive holds the `openwork` binary. `-baseline` builds are for x64 CPUs without AVX2; the installers pick them automatically. Checksums are in `SHA256SUMS`.",
    "",
    "The macOS binaries are signed ad hoc, not notarized: if you download the zip with a browser, run `xattr -d com.apple.quarantine openwork` once (the installers do not need this).",
    "",
    `OpenWork keeps its own data in \`~/.local/share/openwork\` and its config in \`~/.config/openwork\`, apart from any opencode install. Full guide: ${repo}#readme`,
    "",
  ].join("\n"),
)

console.log(`${assets.length + 1} assets in ${out}`)
