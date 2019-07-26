import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-set-players',
  templateUrl: './set-players.component.html',
  styleUrls: ['./set-players.component.less']
})
export class SetPlayersComponent {

  public players = {
    p1: '',
    p2: ''
  };

  constructor(public dialogRef: MatDialogRef<SetPlayersComponent>) {}

  public done() {
    this.dialogRef.close(this.players);
  }
}
