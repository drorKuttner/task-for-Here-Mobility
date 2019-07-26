import {Component, Input} from '@angular/core';
import {SquareValue} from '../models';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.less']
})
export class SquareComponent {

  @Input() set value(val: SquareValue) {
      this.val = val;
  }
  @Input() isWinningSequence: boolean;

  public squareValueType = SquareValue;
  private val: SquareValue = SquareValue.Empty;
  constructor() { }
}
