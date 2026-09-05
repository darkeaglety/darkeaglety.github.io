/**
 * Hot-seat tic-tac-toe: first click places O, second X, then O, etc.
 */

/**
 * @typedef {{
 *   board: ('' | 'O' | 'X')[],
 *   nextMark: 'O' | 'X',
 *   winner: '' | 'O' | 'X' | 'draw',
 * }} TicTacToeState
 */

/** @returns {TicTacToeState} */
export function createTicTacToe() {
  return {
    board: Array(9).fill(''),
    nextMark: 'O',
    winner: '',
  };
}

/**
 * @param {TicTacToeState} state
 * @param {number} index 0–8
 * @returns {boolean} whether the move was applied
 */
export function playTicTacToeMove(state, index) {
  if (state.winner) return false;
  if (index < 0 || index > 8) return false;
  if (state.board[index]) return false;

  state.board[index] = state.nextMark;
  state.nextMark = state.nextMark === 'O' ? 'X' : 'O';
  state.winner = checkTicTacToeWinner(state.board);
  return true;
}

/**
 * @param {( '' | 'O' | 'X')[]} board
 * @returns {'' | 'O' | 'X' | 'draw'}
 */
export function checkTicTacToeWinner(board) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  if (board.every((cell) => cell)) return 'draw';
  return '';
}

/** @param {TicTacToeState} state */
export function resetTicTacToe(state) {
  state.board = Array(9).fill('');
  state.nextMark = 'O';
  state.winner = '';
}

/**
 * @param {TicTacToeState} state
 * @returns {string}
 */
export function ticTacToeStatus(state) {
  if (state.winner === 'draw') return 'Draw! Tap reset for another round.';
  if (state.winner === 'O') return 'O wins!';
  if (state.winner === 'X') return 'X wins!';
  return `Next: ${state.nextMark}`;
}
