import { didSomeoneWin } from './index';

// Basic grids
const EMPTY_GRID: any[][] = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]];
const DIAGONAL_WINNER_0: any[][] = [["RED", 0, 0, 0, 0, 0], [0, "RED", 0, 0, 0, 0], [0, 0, "RED", 0, 0, 0], [0, 0, 0, "RED", 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]];
const DIAGONAL_WINNER_1: any[][] = [["RED", 0, 0, 0, 0, 'YELLOW'], [0, "RED", 0, 0, 'YELLOW', 0], [0, 0, "RED", 'YELLOW', 0, 0], [0, 0, 'YELLOW', 0, 0, 0], [0, 0, 0, 'YELLOW', 0, 0], [0, 'YELLOW', 0, 0, 0, 0], ['YELLOW', 0, 0, 0, 0, 0]];
const VERTICAL_WINNER_0: any[][] = [[0, 0, 'RED', 'RED', 'RED', 'RED'], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]];
const HORIZONTAL_WINNER_0: any[][] = [[0, 0, 0, 0, 0, 'RED'], [0, 0, 0, 0, 0, 'RED'], [0, 0, 0, 0, 0, 'RED'], [0, 0, 0, 0, 0, 'RED'], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]];

// Real more complex grids
const NO_WINNER_1: any[][] = [[0, 0, 0, 0, 0, "RED"], ["RED", "YELLOW", "YELLOW", "RED", "RED", "YELLOW"], ["RED", "YELLOW", "YELLOW", "RED", "RED", "RED"], ["YELLOW", "RED", "YELLOW", "RED", "YELLOW", "YELLOW"], ["YELLOW", "RED", "RED", "YELLOW", "YELLOW", "RED"], [0, 0, 0, "YELLOW", "RED", "YELLOW"], ["RED", "YELLOW", "RED", "RED", "YELLOW", "YELLOW"]];

const NO_WINNER_2: any[][] = [[0, 0, 0, 0, 0, "YELLOW"], [0, 0, 0, "RED", "RED", "YELLOW"], [0, 0, "YELLOW", "RED", "RED", "YELLOW"], ["YELLOW", "RED", "RED", "RED", "YELLOW", "RED"], ["RED", "YELLOW", "RED", "YELLOW", "YELLOW", "YELLOW"], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, "YELLOW", "RED"]];

const NO_WINNER_3: any[][] = [[0, 0, "RED", "YELLOW", "RED", "RED"], [0, 0, 0, 0, 0, "YELLOW"], ["YELLOW", "RED", "YELLOW", "YELLOW", "RED", "RED"], ["RED", "YELLOW", "RED", "YELLOW", "YELLOW", "RED"], ["RED", "YELLOW", "YELLOW", "YELLOW", "RED", "YELLOW"], [0, "YELLOW", "YELLOW", "RED", "YELLOW", "RED"], [0, 0, 0, 0, "RED", "RED"]];

const VERTICAL_WINNER_1: any[][] = [[0, 0, "YELLOW", "RED", "RED", "RED"], [0, 0, "RED", "YELLOW", "RED", "YELLOW"], ["YELLOW", "RED", "RED", "RED", "YELLOW", "RED"], [0, 0, 0, "RED", "YELLOW", "RED"], [0, 0, "RED", "YELLOW", "RED", "YELLOW"], [0, 0, 0, "YELLOW", "RED", "YELLOW"], [0, 0, "YELLOW", "YELLOW", "YELLOW", "YELLOW"]];

const VERTICAL_WINNER_2: any[][] = [[0, 0, 0, 0, "RED", "YELLOW"], [0, 0, 0, 0, "RED", "RED"], [0, 0, 0, "YELLOW", "RED", "RED"], [0, 0, 0, "YELLOW", "RED", "RED"], [0, 0, 0, 0, "YELLOW", "YELLOW"], [0, 0, 0, 0, 0, "YELLOW"], [0, 0, 0, 0, 0, 0]];

const HORIZONTAL_WINNER_1: any[][] = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, "YELLOW"], [0, 0, 0, "YELLOW", "RED", "YELLOW"], [0, 0, "RED", "RED", "YELLOW", "RED"], [0, 0, "YELLOW", "RED", "YELLOW", "RED"], [0, 0, 0, 0, 0, "RED"], [0, 0, 0, 0, "YELLOW", "RED"]];

const DIAGONAL_WINNER_2: any[][] = [[0, 0, "YELLOW", "RED", "RED", "RED"], [0, 0, 0, 0, "RED", "RED"], [0, 0, "RED", "YELLOW", "YELLOW", "YELLOW"], [0, "YELLOW", "RED", "RED", "YELLOW", "RED"], [0, "RED", "YELLOW", "YELLOW", "RED", "YELLOW"], [0, 0, "RED", "YELLOW", "YELLOW", "YELLOW"], [0, 0, 0, 0, "YELLOW", "RED"]];

const DIAGONAL_WINNER_3: any[][] = [[0, "RED", "YELLOW", "RED", "YELLOW", "RED"], [0, "RED", "YELLOW", "YELLOW", "YELLOW", "RED"], [0, 0, 0, "YELLOW", "RED", "YELLOW"], [0, 0, 0, 0, "YELLOW", "YELLOW"], [0, 0, 0, 0, "RED", "YELLOW"], [0, "YELLOW", "RED", "RED", "YELLOW", "RED"], [0, 0, "YELLOW", "RED", "RED", "RED"]];

const DIAGONAL_WINNER_4: any[][] = [[0, 0, 0, 0, 0, "RED"], ["YELLOW", "RED", "RED", "YELLOW", "RED", "YELLOW"], [0, "YELLOW", "RED", "YELLOW", "YELLOW", "RED"], [0, 0, 0, "RED", "YELLOW", "RED"], [0, 0, 0, "YELLOW", "RED", "YELLOW"], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]];

describe('Did someone win test', () => {
  test('didSomeoneWin returns false for an empty grid', () => {
    expect(didSomeoneWin(EMPTY_GRID)).toBe(false);
  });

  test('didSomeoneWin returns true for an vertical 4 grid', () => {
    expect(didSomeoneWin(VERTICAL_WINNER_0)).toBe(true);
  });

  test('didSomeoneWin returns true for an horizontal 4 grid', () => {
    expect(didSomeoneWin(HORIZONTAL_WINNER_0)).toBe(true);
  });

  test('didSomeoneWin returns true for an diagonal winner 0', () => {
    expect(didSomeoneWin(DIAGONAL_WINNER_0)).toBe(true);
  });

  test('didSomeoneWin returns true for an diagonal winner 1', () => {
    expect(didSomeoneWin(DIAGONAL_WINNER_1)).toBe(true);
  });

  test('didSomeoneWin returns false for no winner 1', () => {
    expect(didSomeoneWin(NO_WINNER_1)).toBe(false);
  });

  test('didSomeoneWin returns false for no winner 2', () => {
    expect(didSomeoneWin(NO_WINNER_2)).toBe(false);
  });

  test('didSomeoneWin returns false for no winner 3', () => {
    expect(didSomeoneWin(NO_WINNER_3)).toBe(false);
  });

  test('didSomeoneWin returns true for yellow winner 1', () => {
    expect(didSomeoneWin(VERTICAL_WINNER_1)).toBe(true);
  });

  test('didSomeoneWin returns true for vertical winner 2', () => {
    expect(didSomeoneWin(VERTICAL_WINNER_2)).toBe(true);
  });

  test('didSomeoneWin returns true for horizontal winner 2', () => {
    expect(didSomeoneWin(HORIZONTAL_WINNER_1)).toBe(true);
  });

  test('didSomeoneWin returns true for diagonal winner 2', () => {
    expect(didSomeoneWin(DIAGONAL_WINNER_2)).toBe(true);
  });

  test('didSomeoneWin returns true for diagonal winner 3', () => {
    expect(didSomeoneWin(DIAGONAL_WINNER_3)).toBe(true);
  });

  test('didSomeoneWin returns true for diagonal winner 4', () => {
    expect(didSomeoneWin(DIAGONAL_WINNER_4)).toBe(true);
  });

});
