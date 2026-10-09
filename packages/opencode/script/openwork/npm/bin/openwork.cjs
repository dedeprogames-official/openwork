#!/usr/bin/env node
// OpenWork from npm or npx. The package only carries this launcher: on first use it downloads the binary for this
// version and platform from the GitHub release into ~/.openwork/npm/<version>/<target>, then every run executes it.
//
//   npx https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-cli.tgz
//   npm install -g https://github.com/dedeprogames-official/openwork/releases/latest/download/openwork-cli.tgz
//
// OPENWORK_RELEASES_URL replaces https://github.com/dedeprogames-official/openwork/releases/download (mirrors, tests).

const childProcess = require("child_process")
const fs = require("fs")
const os = require("os")
const path = require("path")
const version = require("../package.json").version

main().catch((error) => {
  console.error(`openwork: ${error instanceof Error ? error.message : String(error)}`)
  process.exit(1)
})

async function main() {
  const target = detectTarget()
  const binary = path.join(os.homedir(), ".openwork", "npm", version, target, exe("openwork"))
  if (!fs.existsSync(binary)) await download(target, binary)
  const result = childProcess.spawnSync(binary, process.argv.slice(2), { stdio: "inherit" })
  if (result.error) throw result.error
  if (result.signal) process.kill(process.pid, result.signal)
  process.exit(result.status ?? 1)
}

/** Same names as the release assets: openwork-<os>-<arch>[-baseline][-musl]. */
function detectTarget() {
  const platform = { linux: "linux", darwin: "darwin", win32: "windows" }[process.platform]
  const arch = { x64: "x64", arm64: "arm64" }[process.arch]
  if (!platform || !arch) throw new Error(`no OpenWork build for ${process.platform}-${process.arch}`)
  const baseline = arch === "x64" && !hasAvx2(platform)
  const musl = platform === "linux" && !process.report?.getReport().header.glibcVersionRuntime
  return [platform, arch, baseline ? "baseline" : "", musl ? "musl" : ""].filter(Boolean).join("-")
}

function hasAvx2(platform) {
  // Unknown counts as AVX2: the regular build runs on every x64 CPU from the last decade.
  const run = (command, args) => childProcess.spawnSync(command, args, { encoding: "utf8" }).stdout ?? ""
  if (platform === "linux")
    return !fs.existsSync("/proc/cpuinfo") || /\bavx2\b/i.test(fs.readFileSync("/proc/cpuinfo", "utf8"))
  if (platform === "darwin") return run("sysctl", ["-n", "hw.optional.avx2_0"]).trim() !== "0"
  const script =
    "(Add-Type -MemberDefinition '[DllImport(\"kernel32.dll\")] public static extern bool IsProcessorFeaturePresent(int f);' -Name K -Namespace OpenWorkNpm -PassThru)::IsProcessorFeaturePresent(40)"
  return run("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", script]).trim().toLowerCase() !== "false"
}

async function download(target, binary) {
  const asset = `openwork-${target}${target.startsWith("linux") ? ".tar.gz" : ".zip"}`
  const base =
    process.env.OPENWORK_RELEASES_URL || "https://github.com/dedeprogames-official/openwork/releases/download"
  const url = `${base}/v${version}/${asset}`
  console.error(`Downloading OpenWork ${version} (${target})…`)
  const response = await fetch(url)
  if (!response.ok) throw new Error(`could not download ${url}: HTTP ${response.status}`)

  // Unpack next to the final location and move the binary in last, so an interrupted download never looks installed.
  const dir = path.dirname(binary)
  fs.mkdirSync(dir, { recursive: true })
  const staging = fs.mkdtempSync(path.join(path.dirname(dir), `.${target}-`))
  try {
    const archive = path.join(staging, asset)
    fs.writeFileSync(archive, Buffer.from(await response.arrayBuffer()))
    // tar unpacks .tar.gz everywhere, and .zip too where it is bsdtar (macOS, Windows 10 and later).
    const result = childProcess.spawnSync("tar", ["-xf", archive, "-C", staging], { stdio: "inherit" })
    if (result.status !== 0) throw new Error(`could not unpack ${asset}`)
    fs.chmodSync(path.join(staging, exe("openwork")), 0o755)
    fs.renameSync(path.join(staging, exe("openwork")), binary)
  } finally {
    fs.rmSync(staging, { recursive: true, force: true })
  }
}

function exe(name) {
  return process.platform === "win32" ? `${name}.exe` : name
}
