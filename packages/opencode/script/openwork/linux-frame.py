"""Cuts a window out of a full-screen capture and puts it back on the wallpaper with a soft drop shadow.

The window is found by diffing the capture against the bare wallpaper, so it works for any window manager theme.

    python3 linux-frame.py capture.png wallpaper.png out.png [margin]
"""

import sys

from PIL import Image, ImageChops, ImageDraw, ImageFilter

capture_path, wallpaper_path, out_path = sys.argv[1:4]
margin = int(sys.argv[4]) if len(sys.argv) > 4 else 56

capture = Image.open(capture_path).convert("RGB")
wallpaper = Image.open(wallpaper_path).convert("RGB").resize(capture.size)
mask = ImageChops.difference(capture, wallpaper).convert("L").point(lambda value: 255 if value > 6 else 0)
box = mask.getbbox()
if box is None:
    sys.exit("no window on screen")

left, top, right, bottom = box
area = (
    max(0, left - margin),
    max(0, top - margin),
    min(capture.width, right + margin),
    min(capture.height, bottom + margin),
)
canvas = wallpaper.crop(area).convert("RGBA")
shadow = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
ImageDraw.Draw(shadow).rectangle(
    (left - area[0], top - area[1] + 10, right - area[0], bottom - area[1] + 10), fill=(0, 0, 0, 150)
)
canvas = Image.alpha_composite(canvas, shadow.filter(ImageFilter.GaussianBlur(16)))
canvas.paste(capture.crop(box), (left - area[0], top - area[1]))
canvas.convert("RGB").save(out_path, optimize=True)
