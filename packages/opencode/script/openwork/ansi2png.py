#!/usr/bin/env python3
"""Render a `tmux capture-pane -e` dump as a PNG framed like a terminal window.

    python3 -I ansi2png.py capture.ans out.png --title "OpenWork"

Block and box-drawing characters are drawn as shapes so bars, gauges and borders join seamlessly.
"""

import argparse
import re

from PIL import Image, ImageDraw, ImageFont

FONTS = "/usr/share/fonts/truetype/dejavu/"
SIZE = 26
CELL_W = 16
CELL_H = 34
DEFAULT_FG = (236, 236, 241)
DEFAULT_BG = (11, 11, 13)
ANSI = [
    (0, 0, 0), (205, 49, 49), (13, 188, 121), (229, 229, 16), (36, 114, 200), (188, 63, 188), (17, 168, 205),
    (229, 229, 229), (102, 102, 102), (241, 76, 76), (35, 209, 139), (245, 245, 67), (59, 142, 234),
    (214, 112, 214), (41, 184, 219), (255, 255, 255),
]

regular = ImageFont.truetype(FONTS + "DejaVuSansMono.ttf", SIZE)
bold = ImageFont.truetype(FONTS + "DejaVuSansMono-Bold.ttf", SIZE)
italic = ImageFont.truetype(FONTS + "DejaVuSansMono-Oblique.ttf", SIZE)
fallbacks = [
    ImageFont.truetype(FONTS + "DejaVuSans.ttf", SIZE - 2),
    ImageFont.truetype("/usr/share/fonts/truetype/libreoffice/opens___.ttf", SIZE - 2),
]
missing = bytes(regular.getmask("￿"))
title_font = ImageFont.truetype(FONTS + "DejaVuSans-Bold.ttf", 22)


def palette(index):
    if index < 16:
        return ANSI[index]
    if index < 232:
        index -= 16
        steps = [0, 95, 135, 175, 215, 255]
        return (steps[index // 36], steps[(index // 6) % 6], steps[index % 6])
    value = 8 + (index - 232) * 10
    return (value, value, value)


def parse(text, cols):
    rows = []
    for raw in text.split("\n"):
        state = {"fg": None, "bg": None, "bold": False, "dim": False, "italic": False, "under": False,
                 "strike": False, "inverse": False}
        cells = []
        index = 0
        while index < len(raw):
            match = re.match(r"\x1b\[([0-9;:]*)([A-Za-z])", raw[index:])
            if match:
                if match.group(2) == "m":
                    apply(state, match.group(1))
                index += len(match.group(0))
                continue
            if raw[index] == "\x1b":
                index += 1
                continue
            cells.append((raw[index], dict(state)))
            index += 1
        rows.append(cells[:cols])
    return rows


def apply(state, params):
    codes = [int(part) if part else 0 for part in re.split(r"[;:]", params)] if params else [0]
    index = 0
    while index < len(codes):
        code = codes[index]
        if code == 0:
            state.update(fg=None, bg=None, bold=False, dim=False, italic=False, under=False, strike=False,
                         inverse=False)
        elif code == 1:
            state["bold"] = True
        elif code == 2:
            state["dim"] = True
        elif code == 3:
            state["italic"] = True
        elif code == 4:
            state["under"] = True
        elif code == 7:
            state["inverse"] = True
        elif code == 9:
            state["strike"] = True
        elif code == 22:
            state["bold"] = state["dim"] = False
        elif code == 23:
            state["italic"] = False
        elif code == 24:
            state["under"] = False
        elif code == 27:
            state["inverse"] = False
        elif code == 29:
            state["strike"] = False
        elif 30 <= code <= 37:
            state["fg"] = ANSI[code - 30]
        elif 90 <= code <= 97:
            state["fg"] = ANSI[code - 90 + 8]
        elif 40 <= code <= 47:
            state["bg"] = ANSI[code - 40]
        elif 100 <= code <= 107:
            state["bg"] = ANSI[code - 100 + 8]
        elif code == 39:
            state["fg"] = None
        elif code == 49:
            state["bg"] = None
        elif code in (38, 48) and index + 1 < len(codes):
            key = "fg" if code == 38 else "bg"
            if codes[index + 1] == 2 and index + 4 < len(codes):
                state[key] = tuple(codes[index + 2:index + 5])
                index += 4
            elif codes[index + 1] == 5 and index + 2 < len(codes):
                state[key] = palette(codes[index + 2])
                index += 2
        index += 1


def mix(a, b, amount):
    return tuple(round(a[i] * (1 - amount) + b[i] * amount) for i in range(3))


BLOCKS = {
    "█": (0, 0, 1, 1), "▀": (0, 0, 1, 0.5), "▄": (0, 0.5, 1, 1), "▌": (0, 0, 0.5, 1), "▐": (0.5, 0, 1, 1),
    "▁": (0, 0.875, 1, 1), "▂": (0, 0.75, 1, 1), "▃": (0, 0.625, 1, 1), "▅": (0, 0.375, 1, 1),
    "▆": (0, 0.25, 1, 1), "▇": (0, 0.125, 1, 1), "▉": (0, 0, 0.875, 1), "▊": (0, 0, 0.75, 1), "▋": (0, 0, 0.625, 1),
    "▍": (0, 0, 0.375, 1), "▎": (0, 0, 0.25, 1), "▏": (0, 0, 0.125, 1),
}
# (left, right, up, down) arms; 1 = light, 2 = heavy
LINES = {
    "─": (1, 1, 0, 0), "│": (0, 0, 1, 1), "━": (2, 2, 0, 0), "┃": (0, 0, 2, 2),
    "┌": (0, 1, 0, 1), "┐": (1, 0, 0, 1), "└": (0, 1, 1, 0), "┘": (1, 0, 1, 0),
    "╭": (0, 1, 0, 1), "╮": (1, 0, 0, 1), "╰": (0, 1, 1, 0), "╯": (1, 0, 1, 0),
    "┏": (0, 2, 0, 2), "┓": (2, 0, 0, 2), "┗": (0, 2, 2, 0), "┛": (2, 0, 2, 0),
    "├": (0, 1, 1, 1), "┤": (1, 0, 1, 1), "┬": (1, 1, 0, 1), "┴": (1, 1, 1, 0), "┼": (1, 1, 1, 1),
    "╹": (0, 0, 2, 0), "╻": (0, 0, 0, 2), "╸": (2, 0, 0, 0), "╺": (0, 2, 0, 0),
}


def draw_line(draw, x, y, arms, color):
    cx = x + CELL_W // 2
    cy = y + CELL_H // 2
    for index, weight in enumerate(arms):
        if not weight:
            continue
        half = 1 if weight == 1 else 2
        if index == 0:
            draw.rectangle([x, cy - half + 1, cx + half - 1, cy + half - 1], fill=color)
        if index == 1:
            draw.rectangle([cx - half + 1, cy - half + 1, x + CELL_W - 1, cy + half - 1], fill=color)
        if index == 2:
            draw.rectangle([cx - half + 1, y, cx + half - 1, cy + half - 1], fill=color)
        if index == 3:
            draw.rectangle([cx - half + 1, cy - half + 1, cx + half - 1, y + CELL_H - 1], fill=color)


def font_for(char, style):
    font = bold if style["bold"] else italic if style["italic"] else regular
    if bytes(font.getmask(char)) != missing or char == " ":
        return font
    for candidate in fallbacks:
        if bytes(candidate.getmask(char)) != bytes(candidate.getmask("￿")):
            return candidate
    return font


def render(rows, cols, out, title, background):
    width = cols * CELL_W
    height = len(rows) * CELL_H
    screen = Image.new("RGB", (width, height), background)
    draw = ImageDraw.Draw(screen)
    for row, cells in enumerate(rows):
        for col, (char, style) in enumerate(cells):
            x = col * CELL_W
            y = row * CELL_H
            fg = style["fg"] or DEFAULT_FG
            bg = style["bg"] or background
            if style["inverse"]:
                fg, bg = bg, fg
            if style["dim"]:
                fg = mix(fg, bg, 0.45)
            if bg != background:
                draw.rectangle([x, y, x + CELL_W - 1, y + CELL_H - 1], fill=bg)
            if char in BLOCKS:
                left, top, right, bottom = BLOCKS[char]
                draw.rectangle(
                    [x + round(left * CELL_W), y + round(top * CELL_H), x + round(right * CELL_W) - 1,
                     y + round(bottom * CELL_H) - 1],
                    fill=fg,
                )
            elif char in LINES:
                draw_line(draw, x, y, LINES[char], fg)
            elif char != " ":
                font = font_for(char, style)
                box = font.getbbox(char)
                glyph = box[2] - box[0]
                offset = max(0, (CELL_W - glyph) // 2 - box[0]) if glyph > CELL_W - 2 or font in fallbacks else 0
                draw.text((x + offset, y + 2), char, font=font, fill=fg)
            if style["under"]:
                draw.line([x, y + CELL_H - 4, x + CELL_W, y + CELL_H - 4], fill=fg, width=2)
            if style["strike"]:
                draw.line([x, y + CELL_H // 2 + 1, x + CELL_W, y + CELL_H // 2 + 1], fill=fg, width=2)

    pad = 44
    bar = 52
    frame = Image.new("RGB", (width + pad * 2, height + bar + pad * 2), (24, 24, 32))
    fdraw = ImageDraw.Draw(frame)
    for step in range(frame.height):
        shade = mix((38, 32, 58), (14, 14, 20), step / frame.height)
        fdraw.line([0, step, frame.width, step], fill=shade)
    window = [pad - 2, pad - 2, pad + width + 1, pad + bar + height + 1]
    fdraw.rounded_rectangle(window, radius=16, fill=background, outline=(60, 60, 72), width=2)
    fdraw.rectangle([pad, pad + bar - 1, pad + width, pad + bar - 1], fill=(40, 40, 48))
    for index, color in enumerate([(255, 95, 86), (255, 189, 46), (39, 201, 63)]):
        cx = pad + 26 + index * 26
        fdraw.ellipse([cx - 8, pad + bar // 2 - 8, cx + 8, pad + bar // 2 + 8], fill=color)
    text_width = fdraw.textlength(title, font=title_font)
    fdraw.text((pad + (width - text_width) / 2, pad + bar // 2 - 13), title, font=title_font, fill=(170, 170, 182))
    frame.paste(screen, (pad, pad + bar))
    frame.save(out, optimize=True)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("input")
    parser.add_argument("output")
    parser.add_argument("--title", default="OpenWork")
    parser.add_argument("--cols", type=int, default=160)
    parser.add_argument("--rows", type=int, default=45)
    parser.add_argument("--background", default="0b0b0d")
    args = parser.parse_args()
    with open(args.input, encoding="utf-8", errors="replace") as handle:
        rows = parse(handle.read().rstrip("\n"), args.cols)[: args.rows]
    background = tuple(int(args.background[i:i + 2], 16) for i in (0, 2, 4))
    render(rows, args.cols, args.output, args.title, background)


if __name__ == "__main__":
    main()
