import {Component, HostListener, OnInit,} from '@angular/core';
import {SetPlayersComponent} from './set-players/set-players.component';
import {MatDialog} from '@angular/material';
import {EndgameService} from './endgame.service';
import {SquareValue, Winner} from './models';



function EmptyBoard() {
  return [SquareValue.Empty, SquareValue.Empty, SquareValue.Empty, SquareValue.Empty, SquareValue.Empty, SquareValue.Empty,
    SquareValue.Empty, SquareValue.Empty, SquareValue.Empty]
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  public title = 'Tic Tac Toe';
  players: Array<string>;
  public currPlayerIdx = 0;
  public winner = Winner.Empty;
  public winningSequence: Array<number> = [];

  public board: Array<SquareValue> = EmptyBoard();
  public squareValueType = SquareValue;
  public winnerType = Winner;


  public constructor(private dialog: MatDialog, private endGameService: EndgameService) {}

  public ngOnInit(): void {
    this.openSetPlayersDialog();
  }

  public openSetPlayersDialog() {
    const dialogRef = this.dialog.open(SetPlayersComponent,  {
      width: '250px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(
      (res) => {
        this.players = [res.p1, res.p2];
      }
    );
  }

  public setSquareValue(idx: number): void {
    if (this.winner !== Winner.Empty) {
      return;
    }
    if (this.board[idx] === SquareValue.Empty && this.winner === Winner.Empty) {
      this.board[idx] = this.currPlayerIdx;
      this.checkGameState();
      this.switchPlayer();
    }
  }

  private switchPlayer(): void {
    this.currPlayerIdx = (this.currPlayerIdx + 1) % 2;
  }

  private checkGameState() {
      const result = this.endGameService.getGameResult(this.board, this.currPlayerIdx);
      this.winningSequence = !!result.winningSequence ? result.winningSequence : [];
      if (!!this.winningSequence.length) {
        this.winner = this.currPlayerIdx;
      } else {
        if (result.isDraw) {
          this.winner = Winner.Draw;
        }
      }
  }

  @HostListener('document:keypress', ['$event'])
  public resetGame(): void {
    if (this.winner !== Winner.Empty) {
      this.winner = Winner.Empty;
      this.board = EmptyBoard();
      this.winningSequence = [];
    }
  }
}
