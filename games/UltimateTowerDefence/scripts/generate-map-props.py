#!/usr/bin/env python3
"""
Export map decoration PNGs (optional — the game also builds these textures at runtime).

  python3 scripts/generate-map-props.py

Outputs: public/map-props/<map>/<name>.png
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1] / "public" / "map-props"


def save(path: Path, size: tuple[int, int], draw_fn) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    im = Image.new("RGBA", size, (0, 0, 0, 0))
    draw_fn(ImageDraw.Draw(im))
    im.save(path, "PNG", optimize=True)


def meadow_tree(d: ImageDraw.ImageDraw) -> None:
    d.rounded_rectangle((22, 38, 34, 68), radius=4, fill=(78, 52, 46))
    d.ellipse((6, 6, 50, 50), fill=(46, 125, 50))
    d.ellipse((4, 18, 32, 46), fill=(56, 142, 60))
    d.ellipse((24, 14, 52, 44), fill=(56, 142, 60))
    d.ellipse((16, 8, 40, 32), fill=(102, 187, 106))


def desert_cactus(d: ImageDraw.ImageDraw) -> None:
    d.rounded_rectangle((16, 20, 26, 60), radius=4, fill=(51, 105, 30))
    d.rounded_rectangle((6, 28, 16, 50), radius=4, fill=(51, 105, 30))
    d.rounded_rectangle((26, 32, 36, 50), radius=4, fill=(51, 105, 30))


def ice_spike(d: ImageDraw.ImageDraw) -> None:
    d.polygon([(18, 4), (8, 52), (28, 52)], fill=(179, 229, 252))
    d.polygon([(18, 4), (14, 52), (24, 48)], fill=(225, 245, 254))


def main() -> None:
    save(ROOT / "meadow" / "tree.png", (56, 72), meadow_tree)
    save(ROOT / "desert" / "cactus.png", (40, 64), desert_cactus)
    save(ROOT / "ice" / "spike.png", (36, 56), ice_spike)
    print(f"Wrote props under {ROOT}")


if __name__ == "__main__":
    main()
