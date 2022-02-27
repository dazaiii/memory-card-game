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
          visibility: 'false',
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

  public imageId: number = 1;

  public path: string = 'assets/';

  public imagePath: string = '';

  constructor() {}

  ngOnInit(): void {
    this.createImagePath(this.cardData);
  }

  createImagePath(cardData: CardData): void {
    this.imagePath = this.path + this.cardData.imageId + '.jpeg';
  }
}
