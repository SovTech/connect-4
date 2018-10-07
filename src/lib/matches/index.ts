export default Matches;

import isDiagonal from './diagonal';
import isHorizontal from './horizontal';
import isVertical from './vertical';

/**
 * Does this grid contain any matches?
 * @param {Array} grid    6x7 muldimentional array containing our grid
 */
function Matches(grid: any[][]) {
  return isHorizontal(grid) || isVertical(grid) || isDiagonal(grid);
}
