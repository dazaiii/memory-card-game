import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { CardData } from 'src/models/card.models';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit {

  @Input() 
  cardData: CardData;

  @Output() 
  cardClicked = new EventEmitter();

  public imageId: number = 1;

  public path: string = "assets/"

  public imagePath: string = "";

  constructor() { }

  ngOnInit(): void {
    this.createImagePath(this.cardData);
  }

  createImagePath(cardData: CardData): void {
    this.imagePath = this.path + this.cardData.imageId + '.jpeg';
  }
}
