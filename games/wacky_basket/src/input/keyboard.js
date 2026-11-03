import { DOUBLE_TAP_MS } from '../constants.js';

const KEY_MAPS = [
  { left: 'KeyA', right: 'KeyD', up: 'KeyW', down: 'KeyS' },
  { left: 'ArrowLeft', right: 'ArrowRight', up: 'ArrowUp', down: 'ArrowDown' },
];

export function attachKeyboard(states, { onPause, onToggleFps }) {
  const lastUp = [0, 0];
  const held = new Set();

  const lookup = new Map();
  KEY_MAPS.forEach((map, idx) => {
    for (const [action, code] of Object.entries(map)) lookup.set(code, { idx, action });
  });

  window.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' || e.code === 'KeyP') {
      onPause();
      return;
    }
    if (e.code === 'KeyF' && !e.repeat) {
      onToggleFps();
      return;
    }
    const hit = lookup.get(e.code);
    if (!hit) return;
    e.preventDefault();
    if (e.repeat || held.has(e.code)) return;
    held.add(e.code);

    const s = states[hit.idx];
    switch (hit.action) {
      case 'left':
        s.left = true;
        break;
      case 'right':
        s.right = true;
        break;
      case 'down':
        s.down = true;
        s.downPressed = true;
        break;
      case 'up': {
        const now = performance.now();
        if (now - lastUp[hit.idx] < DOUBLE_TAP_MS) {
          s.shootPressed = true;
          lastUp[hit.idx] = 0;
        } else {
          s.jumpPressed = true;
          lastUp[hit.idx] = now;
        }
        break;
      }
    }
  });

  window.addEventListener('keyup', (e) => {
    const hit = lookup.get(e.code);
    if (!hit) return;
    held.delete(e.code);
    const s = states[hit.idx];
    if (hit.action === 'left') s.left = false;
    else if (hit.action === 'right') s.right = false;
    else if (hit.action === 'down') s.down = false;
  });

  window.addEventListener('blur', () => {
    held.clear();
    for (const s of states) {
      s.left = s.right = s.down = false;
    }
  });
}
