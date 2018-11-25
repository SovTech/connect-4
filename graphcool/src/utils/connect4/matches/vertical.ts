import GAME_CONFIG from '../config';

/**
 * Are there matches found vertically?
 * @return {Boolean}
 */
function isVertical(grid: Grid): boolean {
  let found = 0;
  let foundPiece;

  for (let column of grid) {
    for (let piece of column) {

      // Reset things if piece is 0
      if (piece === 0) {
        found = 0;
        foundPiece = 0;
        continue;
      }

      if (piece !== foundPiece) {
        found = 1;
        foundPiece = piece;
        continue;
      }

      // Increase number of found pieces
      found++;

      // More than 4 found pieces in a column?
      if (found >= GAME_CONFIG.matchesRequired) {
        return true;
      }
    }
  }

  // Nothing was found in the same row
  return false;
}

export default isVertical;
