const SETTINGS_KEY = 'wb-settings';

function loadSettings() {
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const defaults = { mode: coarse ? 'touch' : 'keyboard', wacky: true, table: false };
  try {
    return { ...defaults, ...JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}') };
  } catch {
    return defaults;
  }
}

export function createUI(handlers) {
  const $ = (id) => document.getElementById(id);
  const settings = loadSettings();
  const menu = $('menu');
  const pause = $('pause');
  const over = $('gameover');
  const hud = $('hud');
  const modeBtns = menu.querySelectorAll('[data-mode]');
  const wacky = $('opt-wacky');
  const table = $('opt-table');

  const save = () => localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));

  const syncMenu = () => {
    modeBtns.forEach((b) => b.classList.toggle('selected', b.dataset.mode === settings.mode));
    wacky.checked = settings.wacky;
    table.checked = settings.table;
    menu.classList.toggle('mode-touch', settings.mode === 'touch');
  };

  modeBtns.forEach((b) =>
    b.addEventListener('click', () => {
      settings.mode = b.dataset.mode;
      save();
      syncMenu();
      handlers.onClick();
    }),
  );
  wacky.addEventListener('change', () => {
    settings.wacky = wacky.checked;
    save();
  });
  table.addEventListener('change', () => {
    settings.table = table.checked;
    save();
  });

  $('btn-play').addEventListener('click', () => handlers.onPlay({ ...settings }));
  $('btn-resume').addEventListener('click', handlers.onResume);
  $('btn-restart').addEventListener('click', handlers.onRestart);
  $('btn-quit').addEventListener('click', handlers.onMenu);
  $('btn-rematch').addEventListener('click', handlers.onRestart);
  $('btn-go-menu').addEventListener('click', handlers.onMenu);
  $('btn-pause').addEventListener('click', handlers.onPauseToggle);
  const muteBtn = $('btn-mute');
  muteBtn.addEventListener('click', () => {
    muteBtn.classList.toggle('off', handlers.onMute());
  });

  syncMenu();

  return {
    settings,
    setMuted(m) {
      muteBtn.classList.toggle('off', m);
    },
    showMenu() {
      menu.classList.add('show');
      pause.classList.remove('show');
      over.classList.remove('show');
      hud.classList.remove('live');
    },
    hideMenu() {
      menu.classList.remove('show');
      hud.classList.add('live');
    },
    showPause(v) {
      pause.classList.toggle('show', v);
    },
    showGameOver(team, scores) {
      $('go-title').textContent = `${team.name.toUpperCase()} WINS!`;
      $('go-title').style.color = team.color;
      $('go-score').textContent = `${scores[0]} - ${scores[1]}`;
      over.classList.add('show');
    },
    hideGameOver() {
      over.classList.remove('show');
    },
  };
}
