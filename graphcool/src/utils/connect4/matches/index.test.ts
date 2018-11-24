import { didSomeoneWin } from './index';


const EMPTY_GRID: any[][] = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]];
const VERTICAL_4: any[][] = [[0, 0, 'RED', 'RED', 'RED', 'RED'], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]];
const HORIZONTAL_4: any[][] = [[0, 0, 0, 0, 0, 'RED'], [0, 0, 0, 0, 0, 'RED'], [0, 0, 0, 0, 0, 'RED'], [0, 0, 0, 0, 0, 'RED'], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]];

const NO_WINNER_1: any[][] = [[0, 0, 0, 0, 0, "RED"], ["RED", "YELLOW", "YELLOW", "RED", "RED", "YELLOW"], ["RED", "YELLOW", "YELLOW", "RED", "RED", "RED"], ["YELLOW", "RED", "YELLOW", "RED", "YELLOW", "YELLOW"], ["YELLOW", "RED", "RED", "YELLOW", "YELLOW", "RED"], [0, 0, 0, "YELLOW", "RED", "YELLOW"], ["RED", "YELLOW", "RED", "RED", "YELLOW", "YELLOW"]];

const NO_WINNER_2: any[][] = [[0, 0, 0, 0, 0, "YELLOW"], [0, 0, 0, "RED", "RED", "YELLOW"], [0, 0, "YELLOW", "RED", "RED", "YELLOW"], ["YELLOW", "RED", "RED", "RED", "YELLOW", "RED"], ["RED", "YELLOW", "RED", "YELLOW", "YELLOW", "YELLOW"], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, "YELLOW", "RED"]];

const YELLOW_WINNER_1: any[][] = [[0, 0, "YELLOW", "RED", "RED", "RED"], [0, 0, "RED", "YELLOW", "RED", "YELLOW"], ["YELLOW", "RED", "RED", "RED", "YELLOW", "RED"], [0, 0, 0, "RED", "YELLOW", "RED"], [0, 0, "RED", "YELLOW", "RED", "YELLOW"], [0, 0, 0, "YELLOW", "RED", "YELLOW"], [0, 0, "YELLOW", "YELLOW", "YELLOW", "YELLOW"]];

const YELLOW_WINNER_2: any[][] = [[0, 0, "YELLOW", "RED", "RED", "RED"], [0, 0, 0, 0, "RED", "RED"], [0, 0, "RED", "YELLOW", "YELLOW", "YELLOW"], [0, "YELLOW", "RED", "RED", "YELLOW", "RED"], [0, "RED", "YELLOW", "YELLOW", "RED", "YELLOW"], [0, 0, "RED", "YELLOW", "YELLOW", "YELLOW"], [0, 0, 0, 0, "YELLOW", "RED"]];

const RED_WINNER_1: any[][] = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, "YELLOW"], [0, 0, 0, "YELLOW", "RED", "YELLOW"], [0, 0, "RED", "RED", "YELLOW", "RED"], [0, 0, "YELLOW", "RED", "YELLOW", "RED"], [0, 0, 0, 0, 0, "RED"], [0, 0, 0, 0, "YELLOW", "RED"]];

describe('Did someone win test', () => {
  test('didSomeoneWin returns false for an empty grid', () => {
    expect(didSomeoneWin(EMPTY_GRID)).toBe(false);
  });

  test('didSomeoneWin returns true for an vertical 4 grid', () => {
    expect(didSomeoneWin(VERTICAL_4)).toBe(true);
  });

  test('didSomeoneWin returns true for an horizontal 4 grid', () => {
    expect(didSomeoneWin(HORIZONTAL_4)).toBe(true);
  });

  test('didSomeoneWin returns false for no winner 1', () => {
    expect(didSomeoneWin(NO_WINNER_1)).toBe(false);
  });

  test('didSomeoneWin returns false for no winner 2', () => {
    expect(didSomeoneWin(NO_WINNER_2)).toBe(false);
  });

  test('didSomeoneWin returns true for yellow winner 1', () => {
    expect(didSomeoneWin(YELLOW_WINNER_1)).toBe(true);
  });

  test('didSomeoneWin returns true for yellow winner 2', () => {
    expect(didSomeoneWin(YELLOW_WINNER_2)).toBe(true);
  });

  test('didSomeoneWin returns true for red winner 1', () => {
    expect(didSomeoneWin(RED_WINNER_1)).toBe(true);
  });
});
