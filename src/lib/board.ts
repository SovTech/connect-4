import GAME_CONFIG from './config';
import matches from './matches';

export default class Board {
  public nextPlayer: string;
  public isActive: boolean;
  private inserts: number;
  private grid: any[][];

  /**
   * Board constructor
   * @return {Void}
   */
  constructor() {

    /**
     * Multidimensional array containing our default empty grid
     * TODO create by looping over size instead of hard coded
     * @type {Array}
     */
    this.grid = [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ];

    /**
     * Keeping track of how many pieces have been inserted
     * @type {Number}
     */
    this.inserts = 0;

    /**
     * String containing next player
     * @type {String}
     */
    this.nextPlayer = refreshPlayer(this.inserts);

    /**
     * Board is active by default (disables when somebody wins)
     * @type {Boolean}
     */
    this.isActive = true;
  }

  /**
   * Adds piece to grid column
   * @param {Number} columnIndex
   * @param {String} piece
   */
  addPiece(columnIndex: number, piece: string) {

    // Column and piece index
    let column = this.grid[columnIndex];
    let cellIndex = -1;

    // Loops through column, looking for zeros (to determine next available cell)
    column.forEach((columnPiece, i) => {
      if (columnPiece === 0) {
        cellIndex = i;
      }
    });

    // Did we find an available cell?
    if (cellIndex >= 0) {

      // Adds piece to column cell
      column[cellIndex] = piece;

      // Increase inserts count
      this.inserts++;

      // Who's the next player?
      this.nextPlayer = refreshPlayer(this.inserts);

      // Makes board inactive if somebody won
      if (this.didSomebodyWin()) {
        this.isActive = false;
      }
    }
  }

  /**
   * Did somebody win?
   * @return {Bool} [description]
   */
  didSomebodyWin() {
    return matches(this.grid);

  }
}

/**
 * Whose turn is it to play?
 * @param  {Number} inserts
 * @return {String}
 */
function refreshPlayer(inserts: number) {
  return GAME_CONFIG.availablePlayers[inserts % 2];
}
