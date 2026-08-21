#!/usr/bin/env python3
"""
Rasterise the cargopete mark into the PNG and ICO sizes a browser actually asks
for. The SVG in public/favicon.svg is the source of truth; this reproduces the
same geometry with a small analytic rasteriser, because there is no SVG
rasteriser on this machine and adding one for a 180px square is not a trade
worth making.

    python3 scripts/make-favicon.py

Writes public/apple-touch-icon.png, public/icon-192.png, public/favicon.ico.
No dependencies beyond the standard library.
"""

import struct
import zlib
from pathlib import Path

BG = (0x17, 0x16, 0x14)      # --bg
FG = (0x8b, 0xb8, 0xdc)      # --accent

# Geometry in the SVG's 64-unit box: a rounded plate, a chevron, an underscore.
RADIUS = 14.0
STROKE = 7.0
CHEVRON = [(15.0, 18.0), (28.0, 32.0), (15.0, 46.0)]
UNDERSCORE = [(35.0, 46.0), (50.0, 46.0)]
SS = 4                        # supersampling factor per axis


def seg_distance(px, py, ax, ay, bx, by):
    """Distance from a point to a line segment - round caps and joins fall out
    of this for free, which is what the SVG asks for."""
    vx, vy = bx - ax, by - ay
    wx, wy = px - ax, py - ay
    denom = vx * vx + vy * vy
    t = 0.0 if denom == 0 else max(0.0, min(1.0, (wx * vx + wy * vy) / denom))
    dx, dy = wx - t * vx, wy - t * vy
    return (dx * dx + dy * dy) ** 0.5


def rounded_box_contains(px, py, size, r):
    """Inside the rounded plate?"""
    qx = abs(px - size / 2) - (size / 2 - r)
    qy = abs(py - size / 2) - (size / 2 - r)
    # Inside the straight cross of the plate, either component is negative and
    # the point is in. Only when both are positive are we out in a corner, and
    # only there does the corner radius decide.
    if qx <= 0 or qy <= 0:
        return True
    return (qx * qx + qy * qy) ** 0.5 <= r


def render(size):
    """Return raw RGB rows for one square icon at `size` pixels."""
    scale = 64.0 / size
    half = STROKE / 2
    strokes = [CHEVRON[0:2], CHEVRON[1:3], UNDERSCORE]
    rows = []
    for y in range(size):
        row = bytearray()
        for x in range(size):
            hits_plate = 0
            hits_ink = 0
            for sy in range(SS):
                for sx in range(SS):
                    # sample at the subpixel centre, in SVG units
                    ux = (x + (sx + 0.5) / SS) * scale
                    uy = (y + (sy + 0.5) / SS) * scale
                    if not rounded_box_contains(ux, uy, 64.0, RADIUS):
                        continue
                    hits_plate += 1
                    for (ax, ay), (bx, by) in strokes:
                        if seg_distance(ux, uy, ax, ay, bx, by) <= half:
                            hits_ink += 1
                            break
            total = SS * SS
            if hits_plate == 0:
                row += bytes((0, 0, 0))          # fully transparent below
                continue
            ink = hits_ink / total
            plate = hits_plate / total
            # composite ink over plate, then plate over nothing
            px = tuple(
                int(round((FG[i] * ink + BG[i] * (plate - ink)) / plate))
                for i in range(3)
            )
            row += bytes(px)
        rows.append((row, y, size, scale))
    return rows


def alpha_for(x, y, size, scale):
    """Plate coverage, reused as the alpha channel so the corners are round."""
    hits = 0
    for sy in range(SS):
        for sx in range(SS):
            ux = (x + (sx + 0.5) / SS) * scale
            uy = (y + (sy + 0.5) / SS) * scale
            if rounded_box_contains(ux, uy, 64.0, RADIUS):
                hits += 1
    return int(round(255 * hits / (SS * SS)))


def png_bytes(size):
    scale = 64.0 / size
    raw = bytearray()
    rgb_rows = render(size)
    for y in range(size):
        raw.append(0)                             # filter type 0
        row = rgb_rows[y][0]
        for x in range(size):
            raw += row[x * 3:x * 3 + 3]
            raw.append(alpha_for(x, y, size, scale))

    def chunk(tag, data):
        return (struct.pack('>I', len(data)) + tag + data
                + struct.pack('>I', zlib.crc32(tag + data) & 0xffffffff))

    ihdr = struct.pack('>IIBBBBB', size, size, 8, 6, 0, 0, 0)   # 8-bit RGBA
    return (b'\x89PNG\r\n\x1a\n'
            + chunk(b'IHDR', ihdr)
            + chunk(b'IDAT', zlib.compress(bytes(raw), 9))
            + chunk(b'IEND', b''))


def ico_bytes(pngs):
    """ICO with PNG-encoded entries, which every browser since IE11 accepts."""
    header = struct.pack('<HHH', 0, 1, len(pngs))
    offset = 6 + 16 * len(pngs)
    entries, blobs = b'', b''
    for size, data in pngs:
        entries += struct.pack('<BBBBHHII',
                               size if size < 256 else 0,
                               size if size < 256 else 0,
                               0, 0, 1, 32, len(data), offset)
        blobs += data
        offset += len(data)
    return header + entries + blobs


def main():
    out = Path(__file__).resolve().parent.parent / 'public'
    apple = png_bytes(180)
    (out / 'apple-touch-icon.png').write_bytes(apple)
    print(f'apple-touch-icon.png   180x180  {len(apple):>6} bytes')

    p192 = png_bytes(192)
    (out / 'icon-192.png').write_bytes(p192)
    print(f'icon-192.png           192x192  {len(p192):>6} bytes')

    ico = ico_bytes([(s, png_bytes(s)) for s in (16, 32, 48)])
    (out / 'favicon.ico').write_bytes(ico)
    print(f'favicon.ico          16/32/48  {len(ico):>6} bytes')


if __name__ == '__main__':
    main()
