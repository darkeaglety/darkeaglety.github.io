#!/usr/bin/env python3
"""
Flatten troop art onto the game canvas color (#0f0f1a) and save truecolor RGB PNGs.

Avoids alpha keying (fragile on AI art). Re-run after replacing files in public/troops/:

  python3 scripts/prepare-troop-pngs.py
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image

TROOPS_DIR = Path(__file__).resolve().parents[1] / "public" / "troops"
# Matches Phaser config backgroundColor / grid feel
GAME_BG = (15, 15, 26)


def flatten_to_rgb(path: Path) -> None:
    im = Image.open(path).convert("RGBA")
    bg = Image.new("RGBA", im.size, GAME_BG + (255,))
    flat = Image.alpha_composite(bg, im).convert("RGB")
    flat.save(path, "PNG", optimize=True, compress_level=9)


def main() -> None:
    if not TROOPS_DIR.is_dir():
        raise SystemExit(f"Missing {TROOPS_DIR}")
    for path in sorted(TROOPS_DIR.glob("*.png")):
        flatten_to_rgb(path)
        print(f"{path.name}: {path.stat().st_size} B RGB")


if __name__ == "__main__":
    main()
