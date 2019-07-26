import {Injectable} from '@angular/core';
import {GameOver, SquareValue, WINNING_SEQUENCES} from './models';


@Injectable({
  providedIn: 'root'
})
export class EndgameService {

  constructor() { }

  public getGameResult(board: Array<number>, valueType: SquareValue): GameOver {
    return {
      winningSequence: this.getWinningSequence(board, valueType),
      isDraw: this.isDraw(board)
    };
  }

  // is draw - true if no player will be able to win this match - match should be stopped
  private isDraw(board: Array<number>): boolean {
    // every sequence has both X and O
    return WINNING_SEQUENCES.every(
      (seq: number[]) => {
        return seq.some((n: number) => board[n] === SquareValue.X) &&
        seq.some((m: number) => board[m] === SquareValue.O)
      }) || // or the one free sequence left will necessarily contain both X and O
        (board.filter((square: number) => square === SquareValue.Empty).length <= 2 &&
          WINNING_SEQUENCES.some((seq: number[]) =>
            this.howManyOfTypeInSequence(board, seq, SquareValue.Empty) >= 2) &&
            // and there is more then one step to complete victory in every sequence
          !(WINNING_SEQUENCES.some((seq: number[]) =>
            this.howManyOfTypeInSequence(board, seq, SquareValue.Empty) === 1 &&
            (this.howManyOfTypeInSequence(board, seq, SquareValue.X) === 2 ||
            this.howManyOfTypeInSequence(board, seq, SquareValue.O) === 2)
          ))
        );
  }

  // checks if the current player just won and returns the winning sequence indexes if so
  private getWinningSequence(board: Array<number>, valueType: SquareValue): Array<number> {
    let winningSequence: number[] = [];
    WINNING_SEQUENCES.forEach((seq: number[]) => {
      if (seq.every((n: number) => board[n] === valueType)) {
        winningSequence = seq;
        return;
      }
    });
    return winningSequence;
  }

  private howManyOfTypeInSequence(board: Array<number>, sequence: Array<number>, value: SquareValue) {
    return board.filter((square, index) => sequence.includes(index) && square === value).length;
  }
}
