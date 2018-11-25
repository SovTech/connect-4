/**
 * Adds piece to grid column
 * @param grid
 * @param {Number} columnIndex
 * @param {String} piece
 */
export function addPiece(grid: any, columnIndex: number, piece: string): Grid {
  const column = grid[columnIndex];
  let cellIndex = -1;

  // Loops through column, looking for zeros (to determine next available cell)
  column.forEach((columnPiece: any, i: number) => {
    if (columnPiece === 0) {
      cellIndex = i;
    }
  });

  // Did we find an available cell?
  if (cellIndex >= 0) {

    // Adds piece to column cell
    column[cellIndex] = piece;
  }
  return grid;
}
