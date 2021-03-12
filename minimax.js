const COMPUTER = "X";
const HUMAN = "O";
const EMPTY = "-";

const MAX = 10;
const MIN = -10;

/**
 * Check if move is available.
 *
 * @param {Array} board
 */
function moveLeft(board) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === EMPTY) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Get score of players.
 *
 * @param {String} player
 */
function getScore(player) {
  if (player === COMPUTER) {
    return MAX;
  } else if (player === HUMAN) {
    return MIN;
  }
  return 0;
}

/**
 * Calcuate scores for players with winning cells.
 *
 * @param {Array} board
 */
function evaluate(board) {
  // rows
  for (let i = 0; i < 3; i++) {
    if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
      return {
        score: getScore(board[i][0]),
        cells: [
          [i, 0],
          [i, 1],
          [i, 2],
        ],
      };
    }
  }

  // columns
  for (let j = 0; j < 3; j++) {
    if (board[0][j] === board[1][j] && board[1][j] === board[2][j]) {
      return {
        score: getScore(board[0][j]),
        cells: [
          [0, j],
          [1, j],
          [2, j],
        ],
      };
    }
  }

  // diagonals
  if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
    return {
      score: getScore(board[0][0]),
      cells: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
    };
  }

  if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
    return {
      score: getScore(board[0][2]),
      cells: [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
    };
  }

  return 0;
}

/**
 * Implement MiniMax algorithm to determine score on each move.
 *
 * @param {Array} board
 * @param {Number} depth
 * @param {Boolean} maximizing
 */
function minimax(board, depth, maximizing) {
  let best;
  const score = evaluate(board).score;

  if (score === MAX || score === MIN) {
    return score;
  }

  if (!moveLeft(board)) {
    return 0;
  }

  if (maximizing) {
    best = -1000;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === EMPTY) {
          board[i][j] = COMPUTER;
          best = Math.max(best, minimax(board, depth + 1, !maximizing));
          board[i][j] = EMPTY;
        }
      }
    }
    return best;
  } else {
    best = 1000;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === EMPTY) {
          board[i][j] = HUMAN;
          best = Math.min(best, minimax(board, depth + 1, !maximizing));
          board[i][j] = EMPTY;
        }
      }
    }
    return best;
  }
}

/**
 * Return cell with maximum score.
 *
 * @param {Array} board
 */
function bestMove(board) {
  let bestValue = -1000;
  let row;
  let col;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == EMPTY) {
        board[i][j] = COMPUTER;

        const moveValue = minimax(board, 0, false);

        board[i][j] = EMPTY;

        if (moveValue > bestValue) {
          row = i;
          col = j;
          bestValue = moveValue;
        }
      }
    }
  }

  return [row, col];
}
