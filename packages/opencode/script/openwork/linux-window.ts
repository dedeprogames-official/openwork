/**
 * A real Linux window for screenshots: a headless X server (Xvfb) with the xfwm4 window manager (Greybird theme) and
 * xfce4-terminal attached to the tmux session that screenshots.ts drives. Captures are photos of that X11 window, title
 * bar and all, on a wallpaper.
 *
 * Needs: Xvfb, dbus-x11, xfwm4, xfconf, xfce4-terminal, greybird-gtk-theme, xdotool and ImageMagick. On Debian/Ubuntu:
 *   apt-get install xvfb dbus-x11 xfwm4 xfce4-terminal greybird-gtk-theme xdotool imagemagick fonts-dejavu-core
 */
import { $ } from "bun"
import fs from "fs/promises"
import path from "path"

const SCREEN = { width: 1920, height: 1200 }

export async function startLinuxWindow(input: {
  root: string
  attach: string
  title: string
  cols: number
  rows: number
  font: string
}) {
  const home = path.join(input.root, "desktop")
  const display = `:${70 + Math.floor(Math.random() * 20)}`
  await fs.mkdir(path.join(home, ".config/gtk-3.0"), { recursive: true })
  await fs.mkdir(path.join(home, ".config/xfce4/terminal"), { recursive: true })
  await Bun.write(
    path.join(home, ".config/gtk-3.0/settings.ini"),
    "[Settings]\ngtk-theme-name=Greybird-dark\ngtk-font-name=DejaVu Sans 10\n",
  )
  await Bun.write(
    path.join(home, ".config/xfce4/terminal/terminalrc"),
    [
      "[Configuration]",
      `FontName=${input.font}`,
      "MiscMenubarDefault=FALSE",
      "MiscToolbarDefault=FALSE",
      "ScrollingBar=TERMINAL_SCROLLBAR_NONE",
      "ColorForeground=#e6e6ea",
      "ColorBackground=#0b0b0d",
      "MiscCursorBlinks=FALSE",
      "MiscConfirmClose=FALSE",
      "",
    ].join("\n"),
  )
  const env: Record<string, string> = {
    PATH: process.env.PATH ?? "/usr/bin:/bin",
    HOME: home,
    XDG_CONFIG_HOME: path.join(home, ".config"),
    DISPLAY: display,
    LANG: "C.UTF-8",
    LC_ALL: "C.UTF-8",
  }
  const processes: ReturnType<typeof Bun.spawn>[] = []
  const spawn = (command: string[]) => {
    const child = Bun.spawn(command, { env, stdout: "ignore", stderr: "ignore" })
    processes.push(child)
    return child
  }

  spawn(["Xvfb", display, "-screen", "0", `${SCREEN.width}x${SCREEN.height}x24`, "+extension", "Composite"])
  await waitFor(() =>
    fs.stat(`/tmp/.X11-unix/X${display.slice(1)}`).then(
      () => true,
      () => false,
    ),
  )
  const bus = (await $`dbus-launch --sh-syntax`.env(env).quiet().text()).match(/DBUS_SESSION_BUS_ADDRESS='([^']+)'/)
  if (bus) env.DBUS_SESSION_BUS_ADDRESS = bus[1]
  spawn(["/usr/lib/x86_64-linux-gnu/xfce4/xfconf/xfconfd"])
  await Bun.sleep(500)
  for (const [property, type, value] of [
    ["/general/theme", "string", "Greybird-dark"],
    ["/general/title_font", "string", "DejaVu Sans Bold 10"],
    ["/general/button_layout", "string", "O|HMC"],
    // Xvfb draws compositor shadows as solid black, so linux-frame.py adds the shadow instead.
    ["/general/use_compositing", "bool", "false"],
    // Open every window centred, so captures share one framing without moving windows (which leaves trails on Xvfb).
    ["/general/placement_mode", "string", "center"],
    ["/general/placement_ratio", "int", "100"],
  ])
    await $`xfconf-query -c xfwm4 -p ${property} -n -t ${type} -s ${value}`.env(env).quiet().nothrow()
  const wallpaper = path.join(home, "wallpaper.png")
  await $`convert -size ${SCREEN.width}x${SCREEN.height} radial-gradient:#5a4a9c-#100e1a ${wallpaper}`.quiet()
  await $`display -window root ${wallpaper}`.env(env).quiet().nothrow()
  spawn(["xfwm4", "--compositor=off"])
  await Bun.sleep(1500)

  spawn([
    "xfce4-terminal",
    "--disable-server",
    "--hide-menubar",
    "--hide-toolbar",
    "--hide-scrollbar",
    `--geometry=${input.cols}x${input.rows}`,
    `--title=${input.title}`,
    `--command=${input.attach}`,
  ])
  // xfce4-terminal also maps a tiny client-leader window; the terminal is the large one.
  await waitFor(async () => {
    const ids = (await $`xdotool search --class xfce4-terminal`.env(env).quiet().nothrow().text()).trim().split("\n")
    const sized = await Promise.all(ids.filter(Boolean).map(async (item) => ({ item, ...(await geometry(env, item)) })))
    return sized.find((item) => item.width > 200)?.item
  })
  await Bun.sleep(800)

  return {
    /** Photographs the window with its title bar, on the wallpaper with a soft shadow. */
    async capture(file: string) {
      const raw = `${file}.root.png`
      await $`import -window root ${raw}`.env(env).quiet()
      await $`python3 -I ${path.join(import.meta.dir, "linux-frame.py")} ${raw} ${wallpaper} ${file}`.quiet()
      await fs.rm(raw, { force: true })
    },
    async stop() {
      for (const child of processes.toReversed()) child.kill()
    },
  }
}

async function geometry(env: Record<string, string>, id: string) {
  const shell = await $`xdotool getwindowgeometry --shell ${id}`.env(env).quiet().text()
  const value = (name: string) => Number(shell.match(new RegExp(`${name}=(\\d+)`))?.[1] ?? 0)
  return { x: value("X"), y: value("Y"), width: value("WIDTH"), height: value("HEIGHT") }
}

async function waitFor<T>(probe: () => Promise<T | undefined | false>, timeout = 20_000) {
  const start = Date.now()
  while (Date.now() - start < timeout) {
    const value = await probe()
    if (value) return value
    await Bun.sleep(150)
  }
  throw new Error("timed out starting the Linux window")
}
