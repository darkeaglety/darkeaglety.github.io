/**
 * @typedef {{ t: 'c', x: number, z: number, r: number }} CircleObs
 * @typedef {{ t: 'b', x: number, z: number, hw: number, hd: number }} BoxObs
 * @typedef {{ minX: number, maxX: number, minZ: number, maxZ: number }} Bounds
 */

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

/**
 * Push a circle (pos.x / pos.z, radius r) out of obstacles and keep it in bounds.
 * @param {{ x: number, z: number }} pos
 * @param {number} r
 * @param {(CircleObs | BoxObs)[]} obstacles
 * @param {Bounds} bounds
 */
export function pushOut(pos, r, obstacles, bounds) {
  for (const o of obstacles) {
    if (o.t === 'c') {
      let dx = pos.x - o.x;
      let dz = pos.z - o.z;
      let d = Math.hypot(dx, dz);
      const min = o.r + r;
      if (d < min) {
        if (d < 1e-4) {
          dx = 1;
          dz = 0;
          d = 1;
        }
        pos.x = o.x + (dx / d) * min;
        pos.z = o.z + (dz / d) * min;
      }
    } else {
      const cx = clamp(pos.x, o.x - o.hw, o.x + o.hw);
      const cz = clamp(pos.z, o.z - o.hd, o.z + o.hd);
      const dx = pos.x - cx;
      const dz = pos.z - cz;
      const d2 = dx * dx + dz * dz;
      if (d2 < r * r) {
        if (d2 > 1e-8) {
          const d = Math.sqrt(d2);
          pos.x = cx + (dx / d) * r;
          pos.z = cz + (dz / d) * r;
        } else {
          const px = o.hw - Math.abs(pos.x - o.x);
          const pz = o.hd - Math.abs(pos.z - o.z);
          if (px < pz) pos.x = o.x + (Math.sign(pos.x - o.x) || 1) * (o.hw + r);
          else pos.z = o.z + (Math.sign(pos.z - o.z) || 1) * (o.hd + r);
        }
      }
    }
  }
  pos.x = clamp(pos.x, bounds.minX + r, bounds.maxX - r);
  pos.z = clamp(pos.z, bounds.minZ + r, bounds.maxZ - r);
}
