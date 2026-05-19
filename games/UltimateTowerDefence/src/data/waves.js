/** @param {unknown[]} deck */
export function shuffleInPlace(deck) {
  for (let i = deck.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = deck[i];
    deck[i] = deck[j];
    deck[j] = tmp;
  }
}

/**
 * @param {number} wave
 * @returns {string[]}
 */
export function buildWaveComposition(wave) {
  /** @type {string[]} */
  const out = [];

  const gruntCount = Math.min(42, Math.max(3, Math.floor(3 + wave * 1.25)));
  for (let i = 0; i < gruntCount; i += 1) {
    out.push('grunt');
  }

  const runnerCount = wave >= 2 ? Math.min(16, Math.floor(1 + wave / 2)) : 0;
  for (let i = 0; i < runnerCount; i += 1) {
    out.push('runner');
  }

  const wraithCount = wave >= 4 ? Math.min(11, Math.floor((wave - 2) / 3)) : 0;
  for (let i = 0; i < wraithCount; i += 1) {
    out.push('wraith');
  }

  const bruteCount = wave >= 3 ? Math.min(12, Math.floor(1 + (wave - 2) / 4)) : 0;
  for (let i = 0; i < bruteCount; i += 1) {
    out.push('brute');
  }

  const tankerCount = wave >= 6 ? Math.min(10, Math.floor((wave - 4) / 5)) : 0;
  for (let i = 0; i < tankerCount; i += 1) {
    out.push('tanker');
  }

  /** Elite line-breaker — only from wave 10 onward (stronger than tanker). */
  const dreadnoughtCount =
    wave >= 10 ? Math.min(16, Math.max(2, Math.floor((wave - 4) / 3))) : 0;
  for (let i = 0; i < dreadnoughtCount; i += 1) {
    out.push('dreadnought');
  }

  /** Blitz elite — only from wave 15 onward. */
  const speedsterCount = wave >= 15 ? Math.min(8, Math.max(1, Math.floor((wave - 13) / 3))) : 0;
  for (let i = 0; i < speedsterCount; i += 1) {
    out.push('speedster');
  }

  shuffleInPlace(out);
  return out;
}
