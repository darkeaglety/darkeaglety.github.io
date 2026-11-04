import {
  standings,
  nextOpponent,
  cpuLevel,
  roundName,
  teamById,
  record,
  REGULAR_GAMES,
  PLAYOFF_TEAMS,
  ROUND_NAMES,
} from './franchise.js';

const SETTINGS_KEY = 'wb-settings';

function loadSettings() {
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const defaults = { mode: coarse ? 'touch' : 'keyboard', wacky: true, table: false, players: 'versus', difficulty: 'medium' };
  try {
    return { ...defaults, ...JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}') };
  } catch {
    return defaults;
  }
}

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const stars = (level) => {
  const n = Math.max(1, Math.min(5, Math.round(1 + level * 4)));
  return '\u2605'.repeat(n) + '\u2606'.repeat(5 - n);
};

export function createUI(handlers) {
  const $ = (id) => document.getElementById(id);
  const settings = loadSettings();
  const menu = $('menu');
  const pause = $('pause');
  const over = $('gameover');
  const hub = $('franchise');
  const hud = $('hud');
  const modeBtns = menu.querySelectorAll('[data-mode]');
  const playerBtns = menu.querySelectorAll('[data-players]');
  const diffBtns = menu.querySelectorAll('[data-diff]');
  const wacky = $('opt-wacky');
  const table = $('opt-table');

  const save = () => localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));

  const syncMenu = () => {
    modeBtns.forEach((b) => b.classList.toggle('selected', b.dataset.mode === settings.mode));
    playerBtns.forEach((b) => b.classList.toggle('selected', b.dataset.players === settings.players));
    diffBtns.forEach((b) => b.classList.toggle('selected', b.dataset.diff === settings.difficulty));
    wacky.checked = settings.wacky;
    table.checked = settings.table;
    menu.classList.toggle('mode-touch', settings.mode === 'touch');
    menu.classList.toggle('players-solo', settings.players !== 'versus');

    const f = settings.players === 'franchise' ? handlers.getFranchise() : null;
    menu.classList.toggle('has-save', !!f);
    const status = $('franchise-status');
    status.style.display = settings.players === 'franchise' ? 'block' : 'none';
    status.textContent = f
      ? `Season ${f.season} \u00b7 ${record(f)} \u00b7 ${cap(f.difficulty)}${f.titles ? ` \u00b7 ${f.titles} title${f.titles > 1 ? 's' : ''}` : ''}`
      : 'New franchise: 8-game season, then a 3-round playoff. Opponents get tougher every game.';
    $('btn-play').textContent = settings.players === 'franchise' ? (f ? 'CONTINUE' : 'START FRANCHISE') : 'PLAY!';
  };

  const bindSeg = (btns, key, attr) =>
    btns.forEach((b) =>
      b.addEventListener('click', () => {
        settings[key] = b.dataset[attr];
        save();
        syncMenu();
        handlers.onClick();
      }),
    );
  bindSeg(modeBtns, 'mode', 'mode');
  bindSeg(playerBtns, 'players', 'players');
  bindSeg(diffBtns, 'difficulty', 'diff');

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
  $('btn-go-continue').addEventListener('click', handlers.onContinue);
  $('btn-pause').addEventListener('click', handlers.onPauseToggle);
  $('btn-fr-menu').addEventListener('click', handlers.onFranchiseMenu);

  let currentFranchise = null;
  $('btn-fr-play').addEventListener('click', () => {
    const f = currentFranchise;
    if (f && (f.phase === 'regular' || f.phase === 'playoffs')) handlers.onFranchisePlay();
    else handlers.onNextSeason();
  });

  const resetBtn = $('btn-fr-reset');
  let resetArmed = 0;
  resetBtn.addEventListener('click', () => {
    if (performance.now() - resetArmed < 3000) {
      resetArmed = 0;
      resetBtn.textContent = 'Reset';
      handlers.onFranchiseReset();
      return;
    }
    resetArmed = performance.now();
    resetBtn.textContent = 'Tap again to reset';
    setTimeout(() => {
      if (performance.now() - resetArmed >= 3000) resetBtn.textContent = 'Reset';
    }, 3100);
  });

  const muteBtn = $('btn-mute');
  muteBtn.addEventListener('click', () => {
    muteBtn.classList.toggle('off', handlers.onMute());
  });

  function renderFranchise(f) {
    currentFranchise = f;
    $('fr-title').textContent = `Season ${f.season} \u00b7 ${cap(f.difficulty)}`;
    $('fr-sub').textContent = `Record ${record(f)}${f.titles ? ` \u00b7 Titles: ${f.titles}` : ''}`;

    const opp = nextOpponent(f);
    const next = $('fr-next');
    if (opp) {
      const label = f.phase === 'playoffs' ? `Playoffs \u00b7 ${roundName(f)}` : `Game ${f.gameIndex + 1} of ${REGULAR_GAMES}`;
      next.innerHTML = `
        <div class="fr-label">${label}</div>
        <div class="fr-opp">
          <span class="dot big" style="background:${opp.color}"></span>
          <div><div class="fr-opp-name">${opp.name}</div>
          <div class="fr-stars" title="Opponent difficulty">${stars(cpuLevel(f))}</div></div>
        </div>`;
      $('btn-fr-play').textContent = 'PLAY';
    } else {
      const msg =
        f.phase === 'champion'
          ? `<div class="fr-banner gold">CHAMPIONS!</div><div>You won the Season ${f.season} title.</div>`
          : `<div class="fr-banner">SEASON OVER</div><div>${f.bracket ? 'Knocked out of the playoffs.' : 'Missed the playoffs.'} Run it back!</div>`;
      next.innerHTML = msg;
      $('btn-fr-play').textContent = `START SEASON ${f.season + 1}`;
    }

    const rows = standings(f)
      .map((t, i) => {
        const diff = t.pf - t.pa;
        const cls = [t.you ? 'you' : '', i === PLAYOFF_TEAMS - 1 ? 'cut' : ''].join(' ');
        return `<tr class="${cls}"><td>${i + 1}</td><td><span class="dot" style="background:${t.color}"></span>${t.name}</td><td>${t.w}-${t.l}</td><td>${diff > 0 ? '+' : ''}${diff}</td></tr>`;
      })
      .join('');
    $('fr-table').innerHTML = `<thead><tr><th>#</th><th>Team</th><th>W-L</th><th>+/-</th></tr></thead><tbody>${rows}</tbody>`;

    const bracket = $('fr-bracket');
    if (f.bracket) {
      const name = (id) => teamById(f, id).name;
      const rounds = f.bracket.rounds.map(
        (games, r) =>
          `<div class="fr-round"><div class="fr-label">${ROUND_NAMES[r]}</div>${games
            .map(
              (g) =>
                `<div class="fr-match ${g.a === 0 || g.b === 0 ? 'mine' : ''}"><b>${name(g.winner)}</b> def. ${name(g.winner === g.a ? g.b : g.a)} <span>${g.score}</span></div>`,
            )
            .join('')}</div>`,
      );
      if (f.phase === 'playoffs') {
        const alive = f.bracket.alive;
        const pairs = [];
        for (let i = 0; i < alive.length; i += 2) {
          pairs.push(`<div class="fr-match ${alive[i] === 0 || alive[i + 1] === 0 ? 'mine' : ''}">${name(alive[i])} vs ${name(alive[i + 1])}</div>`);
        }
        rounds.push(`<div class="fr-round"><div class="fr-label">${roundName(f)} (up next)</div>${pairs.join('')}</div>`);
      }
      bracket.innerHTML = `<div class="label">Playoff bracket</div>${rounds.join('')}`;
    } else {
      bracket.innerHTML = '';
    }
  }

  syncMenu();

  return {
    settings,
    setMuted(m) {
      muteBtn.classList.toggle('off', m);
    },
    showMenu() {
      syncMenu();
      menu.classList.add('show');
      pause.classList.remove('show');
      over.classList.remove('show');
      hub.classList.remove('show');
      hud.classList.remove('live');
    },
    hideMenu() {
      menu.classList.remove('show');
      hud.classList.add('live');
    },
    showPause(v) {
      pause.classList.toggle('show', v);
    },
    showFranchise(f) {
      renderFranchise(f);
      resetArmed = 0;
      resetBtn.textContent = 'Reset';
      hub.classList.add('show');
      hud.classList.remove('live');
    },
    hideFranchise() {
      hub.classList.remove('show');
    },
    showGameOver(team, scores, opts = {}) {
      const title = $('go-title');
      const note = $('go-note');
      let text = `${team.name.toUpperCase()} WINS!`;
      let noteText = '';
      if (opts.franchise) {
        const f = opts.franchise;
        const won = f.lastResult?.won;
        text = opts.event === 'champion' ? 'CHAMPIONS!' : won ? 'YOU WIN!' : `${team.name.toUpperCase()} WIN`;
        const notes = {
          clinched: 'PLAYOFFS CLINCHED! You made the top 8.',
          missed: 'Missed the playoffs. Season over.',
          advanced: `On to the ${roundName(f)}!`,
          eliminated: 'Eliminated from the playoffs.',
          champion: `Season ${f.season} title won! That's title #${f.titles}.`,
        };
        noteText = notes[opts.event] || `Record: ${record(f)}`;
      } else if (opts.solo) {
        text = opts.youWon ? 'YOU WIN!' : 'CPU WINS!';
      }
      title.textContent = text;
      title.style.color = team.color;
      note.textContent = noteText;
      note.classList.toggle('gold', opts.event === 'champion' || opts.event === 'clinched');
      $('go-score').textContent = `${scores[0]} - ${scores[1]}`;
      over.classList.toggle('franchise-result', !!opts.franchise);
      over.classList.add('show');
    },
    hideGameOver() {
      over.classList.remove('show');
    },
  };
}
