/** @typedef {{ x: number, y: number }} Point */

/**
 * @param {Point[]} points
 */
export function buildPathMeta(points) {
  /** @type {{ from: Point, to: Point, len: number, startDist: number }[]} */
  const segments = [];
  let total = 0;
  for (let i = 0; i < points.length - 1; i += 1) {
    const from = points[i];
    const to = points[i + 1];
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const len = Math.hypot(dx, dy);
    segments.push({ from, to, len, startDist: total });
    total += len;
  }
  return { segments, points, totalLength: total };
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function linear(a, b, t) {
  return a + (b - a) * t;
}

/**
 * @param {number} px
 * @param {number} py
 * @param {Point} a
 * @param {Point} b
 */
function distToSegmentSq(px, py, a, b) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const lenSq = dx * dx + dy * dy;
  const tRaw = lenSq === 0 ? 0 : ((px - a.x) * dx + (py - a.y) * dy) / lenSq;
  const t = clamp(tRaw, 0, 1);
  const nx = a.x + t * dx;
  const ny = a.y + t * dy;
  const ex = px - nx;
  const ey = py - ny;
  return ex * ex + ey * ey;
}

/**
 * @param {ReturnType<typeof buildPathMeta>} meta
 * @param {number} dist
 */
export function getPointAtDistance(meta, dist) {
  const last = meta.points[meta.points.length - 1];
  if (!meta.segments.length) {
    return { x: last.x, y: last.y, angle: 0 };
  }

  let d = clamp(dist, 0, meta.totalLength);
  for (let i = 0; i < meta.segments.length; i += 1) {
    const s = meta.segments[i];
    if (d <= s.len || i === meta.segments.length - 1) {
      const t = s.len === 0 ? 1 : Math.min(1, d / s.len);
      const x = linear(s.from.x, s.to.x, t);
      const y = linear(s.from.y, s.to.y, t);
      const angle = Math.atan2(s.to.y - s.from.y, s.to.x - s.from.x);
      return { x, y, angle };
    }
    d -= s.len;
  }
  const seg = meta.segments[meta.segments.length - 1];
  return {
    x: seg.to.x,
    y: seg.to.y,
    angle: Math.atan2(seg.to.y - seg.from.y, seg.to.x - seg.from.x),
  };
}

/**
 * @param {number} px
 * @param {number} py
 * @param {Point[]} points
 */
export function pointToPathDist(px, py, points) {
  let best = Infinity;
  for (let i = 0; i < points.length - 1; i += 1) {
    best = Math.min(best, Math.sqrt(distToSegmentSq(px, py, points[i], points[i + 1])));
  }
  return best;
}
