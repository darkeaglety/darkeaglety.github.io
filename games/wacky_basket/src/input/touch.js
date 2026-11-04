const GROUP_HTML = `
  <div class="t-move">
    <span class="t-arrow t-left">&#9664;</span>
    <span class="t-arrow t-right">&#9654;</span>
  </div>
  <div class="t-buttons">
    <button type="button" class="t-btn t-steal" data-act="steal">STEAL</button>
    <button type="button" class="t-btn t-jump" data-act="jump">JUMP</button>
    <button type="button" class="t-btn t-shoot" data-act="shoot">SHOOT</button>
  </div>
`;

export function attachTouch(root, states) {
  const groups = states.map((state, idx) => {
    const g = document.createElement('div');
    g.className = `t-group t-p${idx + 1}`;
    g.innerHTML = GROUP_HTML;
    root.appendChild(g);
    bindMovePad(g.querySelector('.t-move'), state);
    g.querySelectorAll('.t-btn').forEach((btn) => bindButton(btn, state));
    return g;
  });

  root.addEventListener('contextmenu', (e) => e.preventDefault());

  return {
    setVisible(v) {
      root.classList.toggle('show', v);
      if (!v) for (const s of states) s.left = s.right = false;
    },
    setSinglePlayer(v) {
      root.classList.toggle('solo', v);
    },
    bottomReserve() {
      if (!root.classList.contains('show')) return 0;
      const table = root.classList.contains('table');
      let top = window.innerHeight;
      const solo = root.classList.contains('solo');
      groups.forEach((g, i) => {
        if ((table || solo) && i === 1) return;
        top = Math.min(top, g.getBoundingClientRect().top);
      });
      return window.innerHeight - top;
    },
    setTableMode(v) {
      root.classList.toggle('table', v);
      groups[1].querySelector('.t-move').classList.toggle('flip', v);
    },
    groups,
  };
}

function bindMovePad(el, state) {
  const pointers = new Map();
  const leftEl = el.querySelector('.t-left');
  const rightEl = el.querySelector('.t-right');

  const refresh = () => {
    let l = false;
    let r = false;
    for (const dir of pointers.values()) {
      if (dir < 0) l = true;
      else r = true;
    }
    state.left = l;
    state.right = r;
    leftEl.classList.toggle('on', el.classList.contains('flip') ? r : l);
    rightEl.classList.toggle('on', el.classList.contains('flip') ? l : r);
  };

  // Screen-space halves, so a 180deg-rotated pad still maps its visual left to screen left.
  const dirFor = (e) => {
    const rect = el.getBoundingClientRect();
    return e.clientX - rect.left < rect.width / 2 ? -1 : 1;
  };

  el.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    el.setPointerCapture(e.pointerId);
    pointers.set(e.pointerId, dirFor(e));
    refresh();
  });
  el.addEventListener('pointermove', (e) => {
    if (!pointers.has(e.pointerId)) return;
    pointers.set(e.pointerId, dirFor(e));
    refresh();
  });
  const end = (e) => {
    if (!pointers.delete(e.pointerId)) return;
    refresh();
  };
  el.addEventListener('pointerup', end);
  el.addEventListener('pointercancel', end);
  el.addEventListener('lostpointercapture', end);
}

function bindButton(btn, state) {
  const act = btn.dataset.act;
  const pointers = new Set();
  btn.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    btn.setPointerCapture(e.pointerId);
    pointers.add(e.pointerId);
    btn.classList.add('on');
    if (act === 'jump') state.jumpPressed = true;
    else if (act === 'shoot') state.shootPressed = true;
    else {
      // One button does both: crossover with the ball, steal toward the ball without it.
      state.downPressed = true;
      state.stealToBall = true;
    }
  });
  const end = (e) => {
    if (!pointers.delete(e.pointerId)) return;
    if (pointers.size === 0) btn.classList.remove('on');
  };
  btn.addEventListener('pointerup', end);
  btn.addEventListener('pointercancel', end);
  btn.addEventListener('lostpointercapture', end);
}
