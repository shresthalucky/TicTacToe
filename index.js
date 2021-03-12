let board = [
  ["-", "-", "-"],
  ["-", "-", "-"],
  ["-", "-", "-"],
];

const table = document.getElementById("board");

/**
 * Util function to check if array contains sub-array.
 *
 * @param {Array} array
 * @param {Array} subArray
 */
function hasSubArray(array, subArray) {
  let isAvaiable;

  for (let i = 0; i < array.length; i++) {
    isAvaiable = false;
    for (let j = 0; j < array[i].length; j++) {
      if (array[i][j] === subArray[j]) {
        isAvaiable = true;
      } else {
        isAvaiable = false;
        break;
      }
    }
    if (isAvaiable) {
      break;
    }
  }
  return isAvaiable;
}

/**
 * Render board to DOM.
 *
 * @param {Array} winningCells
 */
function drawBoard(winningCells = []) {
  table.innerHTML = "";

  for (let i = 0; i < 3; i++) {
    const tr = document.createElement("tr");
    table.appendChild(tr);

    for (let j = 0; j < 3; j++) {
      const td = document.createElement("td");
      td.setAttribute("data-row", i);
      td.setAttribute("data-col", j);
      td.innerText = board[i][j];

      if (hasSubArray(winningCells, [i, j])) {
        td.classList.add("win");
      }

      tr.appendChild(td);
    }
  }
}

/**
 * Callback to handle board cell click event.
 *
 * @param {Event} event
 */
function cellClickHandler(event) {
  const cell = event.target;
  const row = parseInt(cell.dataset.row);
  const col = parseInt(cell.dataset.col);

  if (board[row][col] !== EMPTY) {
    return;
  }

  board[row][col] = HUMAN;

  if (moveLeft(board)) {
    const [cRow, cCol] = bestMove(board);

    board[cRow][cCol] = COMPUTER;
  } else {
    table.removeEventListener("click", cellClickHandler);
  }

  const { score, cells } = evaluate(board);

  if (score === MAX) {
    drawBoard(cells);
    table.removeEventListener("click", cellClickHandler);
  } else {
    drawBoard();
  }
}

drawBoard();

table.addEventListener("click", cellClickHandler);
