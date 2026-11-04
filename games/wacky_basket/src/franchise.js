import { TEAMS } from './constants.js';

const STORAGE_KEY = 'wb-franchise-v1';
const VERSION = 1;
export const REGULAR_GAMES = 8;
export const PLAYOFF_TEAMS = 8;
export const ROUND_NAMES = ['Quarterfinal', 'Semifinal', 'Final'];
export const BASE_LEVEL = { easy: 0.1, medium: 0.4, hard: 0.7 };
// Bracket seeding order so adjacent pairs meet each round (1v8 and 4v5 meet in the semis).
const SEED_ORDER = [0, 7, 3, 4, 1, 6, 2, 5];

const LEAGUE = [
  ['Bouncy Badgers', '#4ecdc4'],
  ['Noodle Arms', '#a78bfa'],
  ['Dunk Donkeys', '#60a5fa'],
  ['Slam Llamas', '#fbbf24'],
  ['Hoop Hippos', '#34d399'],
  ['Rim Rattlers', '#f472b6'],
  ['Wobble Wizards', '#818cf8'],
  ['Sneaker Sharks', '#38bdf8'],
  ['Jelly Jammers', '#c084fc'],
  ['Bonk Bandits', '#fb923c'],
  ['Swish Squids', '#2dd4bf'],
];

function shade(hex, f) {
  const n = parseInt(hex.slice(1), 16);
  const ch = (v) => Math.round(f < 1 ? v * f : v + (255 - v) * (f - 1));
  const r = ch((n >> 16) & 255);
  const g = ch((n >> 8) & 255);
  const b = ch(n & 255);
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

export function teamStyle(t) {
  return { name: t.name, color: t.color, dark: shade(t.color, 0.6), light: shade(t.color, 1.55) };
}

export function loadFranchise() {
  try {
    const f = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    return f && f.version === VERSION && Array.isArray(f.teams) ? f : null;
  } catch {
    return null;
  }
}

export function saveFranchise(f) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(f));
}

export function clearFranchise() {
  localStorage.removeItem(STORAGE_KEY);
}

export function newFranchise(difficulty, carry = {}) {
  const teams = [{ id: 0, name: 'Coral Crushers', color: TEAMS[0].color, rating: 0.5, w: 0, l: 0, pf: 0, pa: 0, you: true }];
  LEAGUE.forEach(([name, color], i) => {
    const rating = Math.min(1, Math.max(0.05, 0.08 + (i / (LEAGUE.length - 1)) * 0.85 + (Math.random() - 0.5) * 0.12));
    teams.push({ id: i + 1, name, color, rating, w: 0, l: 0, pf: 0, pa: 0 });
  });
  const cpu = teams.slice(1).sort((a, b) => a.rating - b.rating);
  const schedule = [];
  for (let i = 0; i < REGULAR_GAMES; i++) schedule.push(cpu[Math.round((i * (cpu.length - 1)) / (REGULAR_GAMES - 1))].id);
  const f = {
    version: VERSION,
    difficulty,
    season: carry.season ?? 1,
    titles: carry.titles ?? 0,
    teams,
    schedule,
    gameIndex: 0,
    phase: 'regular',
    bracket: null,
    lastResult: null,
  };
  saveFranchise(f);
  return f;
}

export function nextSeason(f) {
  return newFranchise(f.difficulty, { season: f.season + 1, titles: f.titles });
}

export function teamById(f, id) {
  return f.teams.find((t) => t.id === id);
}

export function standings(f) {
  return [...f.teams].sort((a, b) => b.w - a.w || b.pf - b.pa - (a.pf - a.pa) || b.rating - a.rating);
}

function currentPair(f) {
  const alive = f.bracket.alive;
  const i = alive.indexOf(0);
  if (i < 0) return null;
  return [alive[i - (i % 2)], alive[i - (i % 2) + 1]];
}

export function nextOpponent(f) {
  if (f.phase === 'regular') return teamById(f, f.schedule[f.gameIndex]);
  if (f.phase === 'playoffs') {
    const pair = currentPair(f);
    return teamById(f, pair[0] === 0 ? pair[1] : pair[0]);
  }
  return null;
}

export function cpuLevel(f) {
  const round = f.phase === 'playoffs' ? f.bracket.round : 0;
  return Math.min(0.98, BASE_LEVEL[f.difficulty] + f.gameIndex * 0.035 + round * 0.06 + (f.season - 1) * 0.05);
}

export function roundName(f) {
  return f.bracket ? ROUND_NAMES[Math.min(f.bracket.round, ROUND_NAMES.length - 1)] : '';
}

function simGame(a, b) {
  const pA = Math.min(0.9, Math.max(0.1, 0.5 + (a.rating - b.rating) * 0.6));
  const aWins = Math.random() < pA;
  const loserPts = 3 + Math.floor(Math.random() * 8);
  const [w, l] = aWins ? [a, b] : [b, a];
  return { winner: w, loser: l, wPts: 11, lPts: loserPts };
}

function applyResult(w, l, wPts, lPts) {
  w.w++;
  l.l++;
  w.pf += wPts;
  w.pa += lPts;
  l.pf += lPts;
  l.pa += wPts;
}

// Records the player's finished game, simulates the rest of the league, and advances the season.
// Returns an event string for the result screen: 'clinched', 'missed', 'advanced', 'eliminated', 'champion', or null.
export function recordGame(f, won, myScore, oppScore) {
  const me = teamById(f, 0);
  const opp = nextOpponent(f);
  f.lastResult = { won, myScore, oppScore, opp: opp.name };

  if (f.phase === 'regular') {
    if (won) applyResult(me, opp, myScore, oppScore);
    else applyResult(opp, me, oppScore, myScore);

    const others = f.teams.filter((t) => t.id !== 0 && t.id !== opp.id).sort(() => Math.random() - 0.5);
    for (let i = 0; i + 1 < others.length; i += 2) {
      const r = simGame(others[i], others[i + 1]);
      applyResult(r.winner, r.loser, r.wPts, r.lPts);
    }

    f.gameIndex++;
    if (f.gameIndex < REGULAR_GAMES) {
      saveFranchise(f);
      return null;
    }
    const top = standings(f).slice(0, PLAYOFF_TEAMS);
    if (!top.some((t) => t.id === 0)) {
      f.phase = 'eliminated';
      saveFranchise(f);
      return 'missed';
    }
    f.phase = 'playoffs';
    f.bracket = { round: 0, alive: SEED_ORDER.map((s) => top[s].id), rounds: [] };
    saveFranchise(f);
    return 'clinched';
  }

  if (f.phase === 'playoffs') {
    const alive = f.bracket.alive;
    const results = [];
    const winners = [];
    for (let i = 0; i < alive.length; i += 2) {
      const a = teamById(f, alive[i]);
      const b = teamById(f, alive[i + 1]);
      let winner;
      let score;
      if (a.id === 0 || b.id === 0) {
        const mine = a.id === 0 ? a : b;
        const theirs = a.id === 0 ? b : a;
        winner = won ? mine : theirs;
        score = won ? `${myScore}-${oppScore}` : `${oppScore}-${myScore}`;
      } else {
        const r = simGame(a, b);
        winner = r.winner;
        score = `${r.wPts}-${r.lPts}`;
      }
      results.push({ a: a.id, b: b.id, winner: winner.id, score });
      winners.push(winner.id);
    }
    f.bracket.rounds.push(results);
    f.bracket.alive = winners;
    if (!won) {
      f.phase = 'eliminated';
      simulateRemaining(f);
      saveFranchise(f);
      return 'eliminated';
    }
    f.bracket.round++;
    if (winners.length === 1) {
      f.phase = 'champion';
      f.titles++;
      saveFranchise(f);
      return 'champion';
    }
    saveFranchise(f);
    return 'advanced';
  }
  return null;
}

function simulateRemaining(f) {
  let alive = f.bracket.alive;
  while (alive.length > 1) {
    const results = [];
    const winners = [];
    for (let i = 0; i < alive.length; i += 2) {
      const r = simGame(teamById(f, alive[i]), teamById(f, alive[i + 1]));
      results.push({ a: alive[i], b: alive[i + 1], winner: r.winner.id, score: `${r.wPts}-${r.lPts}` });
      winners.push(r.winner.id);
    }
    f.bracket.rounds.push(results);
    alive = winners;
  }
  f.bracket.alive = alive;
}

export function record(f) {
  const me = teamById(f, 0);
  return `${me.w}-${me.l}`;
}
