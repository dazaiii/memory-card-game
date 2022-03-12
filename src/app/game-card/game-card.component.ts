import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { CardData } from 'src/models/card.models';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
  animations: [
    trigger('cardFlip', [
      state(
        'default',
        style({
          transform: 'none',
        })
      ),
      state(
        'flipped',
        style({
          transform: 'rotateY(180deg)',
        })
      ),
      state(
        'matched',
        style({
          transform: 'scale(0.05)',
          opacity: 0,
        })
      ),
      transition('default => flipped', [animate('400ms')]),
      transition('flipped => default', [animate('400ms')]),
      transition('* => matched', [animate('400ms')]),
    ]),
  ],
})
export class GameCardComponent implements OnInit {
  @Input()
  cardData: CardData;

  @Output()
  cardClicked = new EventEmitter();

  private path: string = 'assets/';

  constructor() {}

  ngOnInit(): void {
    if (this.cardData) {
      this.createImagePath();
    }
  }

  createImagePath(): string {
    return this.path + this.cardData.imageId + '.jpeg';
  }
}
