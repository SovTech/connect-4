import GAME_CONFIG from '../config';

/**
 * Are there any diagonal matches?
 * @param  {Array}  grid Multidimensional array representing our grid
 * @return {Boolean}
 */
function isDiagonal(grid: Grid): boolean {
  return checkMainDiagonal(grid) || checkCounterDiagonal(grid);
}

/**
 * Found in top right?
 * @param  {Array}  grid
 *
 * @return {Boolean}
 */
function checkMainDiagonal(grid: Grid): boolean {
  for (let row = 0; row < GAME_CONFIG.rows - 3; row++) {
    for (let col = 0; col < GAME_CONFIG.columns - 3; col++) {
      let element = grid[row][col];
      if (element == grid[row + 1][col + 1] &&
        element == grid[row + 2][col + 2] &&
        element == grid[row + 3][col + 3]) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Are there any diagonal matches from top left?
 * @param  {Array}  grid
 *
 * @return {Boolean}
 */
function checkCounterDiagonal(grid: Grid): boolean {
  for (let row = 0; row < grid.length - 3; row++) {
    for (let col = 3; col < grid[row].length; col++) {
      const element = grid[row][col];
      if (element == grid[row + 1][col - 1] &&
        element == grid[row + 2][col - 2] &&
        element == grid[row + 3][col - 3]) {
        return true;
      }
    }
  }
  return false;
}

export default isDiagonal;
