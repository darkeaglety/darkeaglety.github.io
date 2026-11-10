import { DOUBLE_TAP_MS } from '../constants.js';

const KEY_MAPS = [
  { left: 'KeyA', right: 'KeyD', up: 'KeyW', down: 'KeyS' },
  { left: 'ArrowLeft', right: 'ArrowRight', up: 'ArrowUp', down: 'ArrowDown' },
];

export function attachKeyboard(states, { onPause, onToggleFps }) {
  const held = new Set();
  const lastTap = new Map();
  let singlePlayer = false;

  const lookup = new Map();
  KEY_MAPS.forEach((map, idx) => {
    for (const [action, code] of Object.entries(map)) lookup.set(code, { idx, action });
  });

  // In one-player mode both key sets drive player 1.
  const target = (hit) => (singlePlayer ? 0 : hit.idx);

  const refreshHeld = () => {
    for (const s of states) s.left = s.right = s.down = false;
    for (const code of held) {
      const hit = lookup.get(code);
      const s = states[target(hit)];
      if (hit.action === 'left') s.left = true;
      else if (hit.action === 'right') s.right = true;
      else if (hit.action === 'down') s.down = true;
    }
  };

  const isDoubleTap = (code) => {
    const now = performance.now();
    if (now - (lastTap.get(code) || 0) < DOUBLE_TAP_MS) {
      lastTap.set(code, 0);
      return true;
    }
    lastTap.set(code, now);
    return false;
  };

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
    refreshHeld();

    const s = states[target(hit)];
    switch (hit.action) {
      case 'down':
        s.downPressed = true;
        s.stealToBall = true;
        break;
      case 'up':
        if (isDoubleTap(e.code)) s.shootPressed = true;
        else s.jumpPressed = true;
        break;
    }
  });

  window.addEventListener('keyup', (e) => {
    if (!lookup.has(e.code)) return;
    held.delete(e.code);
    refreshHeld();
  });

  window.addEventListener('blur', () => {
    held.clear();
    refreshHeld();
  });

  return {
    setSinglePlayer(v) {
      singlePlayer = v;
      held.clear();
      refreshHeld();
    },
  };
}
