export interface GameOver {
  winningSequence?: number[];
  isDraw: boolean;
}

export const WINNING_SEQUENCES: Array<number[]> = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

export enum SquareValue {
  Empty = -1,
  X,
  O,
}

export enum Winner {
  Empty = -2,
  Draw,
  Player1,
  Player2
}
