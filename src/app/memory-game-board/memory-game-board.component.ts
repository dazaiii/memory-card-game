import { Component, OnInit } from '@angular/core';
import { CardData, CardStatus } from 'src/models/card.models';
import { timer } from 'rxjs';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { GameStatus } from 'src/models/game.models';

@Component({
  selector: 'app-memory-game-board',
  templateUrl: './memory-game-board.component.html',
  styleUrls: ['./memory-game-board.component.scss'],
  animations: [
    trigger('gameStatus', [
      state(
        'DuringTheGame',
        style({
          transform: 'none',
          opacity: 0,
        })
      ),
      state(
        'GameCompleted',
        style({
          opacity: 1,
        })
      ),
      transition('DuringTheGame => GameCompleted', [animate('400ms')]),
      transition('GameCompleted => DuringTheGame', [animate('400ms')]),
    ]),
  ],
})
export class MemoryGameBoardComponent implements OnInit {
  images: string[] = [];

  cards: CardData[] = [];

  flippedCount: number = 0;

  readonly imagesAmount: number = 9;

  matched: number = 0;

  chosenImages: number[] = [];

  startTime: Date;

  gameStatus: GameStatus;

  rounds: number = 0;

  ngOnInit(): void {
    this.playAgain();
  }

  playAgain(): void {
    this.matched = 0;
    this.flippedCount = 0;
    this.chosenImages = [];
    this.addImages();
    this.addCards();
    this.startTime = new Date(Date.now());
    if (this.gameStatus === GameStatus.GameCompleted) {
      this.rounds += 1;
    }
    this.gameStatus = GameStatus.DuringTheGame;
  }

  checkGameStatus(): void {
    if (this.matched !== 2 * this.imagesAmount) {
      this.gameStatus = GameStatus.DuringTheGame;
    }
    if (this.matched === 2 * this.imagesAmount) {
      this.gameStatus = GameStatus.GameCompleted;
    }
  }

  addImages(): void {
    this.images = [];
    let number;
    while (this.chosenImages.length < this.imagesAmount) {
      number = this.randomize(1, 20);
      if (!this.chosenImages.includes(number)) {
        this.images.push('card' + number);
        this.chosenImages.push(number);
      }
    }
  }

  addCards(): void {
    this.cards = [];
    this.images.forEach((image) => {
      const cardData: CardData = {
        imageId: image,
        status: CardStatus.Default,
      };
      this.cards.push({ ...cardData });
      this.cards.push({ ...cardData });
    });
    this.cards = this.shuffleArray(this.cards);
  }

  shuffleArray(anArray: any[]): any[] {
    return anArray
      .map((a) => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map((a) => a[1]);
  }

  randomize(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  cardClicked(card: CardData): void {
    if (card.status === CardStatus.Default && this.flippedCount < 2) {
      card.status = CardStatus.Flipped;
      this.flippedCount += 1;
    }
    if (this.flippedCount === 2) {
      timer(400).subscribe(() => {
        this.matchCards();
      });
    }
  }

  matchCards(): void {
    const cardsToMatch: CardData[] = [];
    this.cards.forEach((card) => {
      if (card.status === CardStatus.Flipped) {
        cardsToMatch.push(card);
      }
    });
    if (cardsToMatch[0] && cardsToMatch[1]) {
      if (cardsToMatch[0].imageId === cardsToMatch[1].imageId) {
        this.cards.forEach((card) => {
          if (card.imageId === cardsToMatch[0].imageId) {
            card.status = CardStatus.Matched;
            this.matched += 1;
          }
        });
      } else {
        timer(400).subscribe(() => {
          this.cards.forEach((card) => {
            if (
              card.imageId === cardsToMatch[0].imageId ||
              card.imageId === cardsToMatch[1].imageId
            ) {
              card.status = CardStatus.Default;
            }
          });
        });
      }
    }
    this.flippedCount = 0;
    this.checkGameStatus();
  }

  stopTimer(): boolean {
    return this.gameStatus === GameStatus.GameCompleted ? true : false;
  }
}
