module.exports = function solveSudoku(matrix) {
  copy = matrix.concat();
  resolve(copy, 0, 0);
  return copy;
};

function resolve(field, row, col) {
  let N = field.length;
  if (row == N - 1 && col == N) return true;
  if (col == N) {
    row++;
    col = 0;
  }

  if (field[row][col] != 0) {
    return resolve(field, row, col + 1);
  }

  for (let num = 1; num <= 9; num++) {
    if (checkValid(field, row, col, num)) {
      field[row][col] = num;

      if (resolve(field, row, col + 1)) {
        return true;
      }
    }

    field[row][col] = 0;
  }
  return false;
}

function checkValid(field, row, col, num) {
  for (let k = 0; k < 9; k++) {
    if (field[row][k] == num) {
      return false;
    }
  }

  for (let k = 0; k < 9; k++) {
    if (field[k][col] == num) {
      return false;
    }
  }

  let startRow = row - (row % 3);
  let startCol = col - (col % 3);

  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
      if (field[i + startRow][j + startCol] == num) return false;
  return true;
}
