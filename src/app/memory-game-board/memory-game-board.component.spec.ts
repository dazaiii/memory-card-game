import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { CardData, CardStatus } from 'src/models/card.models';
import { GameStatus } from 'src/models/game.models';

import { MemoryGameBoardComponent } from './memory-game-board.component';

describe('MemoryGameBoardComponent', () => {
  let component: MemoryGameBoardComponent;
  let fixture: ComponentFixture<MemoryGameBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MemoryGameBoardComponent],
      imports: [BrowserAnimationsModule, NoopAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoryGameBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not stop the timer', () => {
    component.gameStatus = GameStatus.DuringTheGame;
    expect(component.stopTimer()).toBe(false);
  });

  it('should stop the timer', () => {
    component.gameStatus = GameStatus.GameCompleted;
    expect(component.stopTimer()).toBe(true);
  });

  it('should start the game again', () => {
    component.matched = 4;
    component.flippedCount = 1;
    component.rounds = 1;
    component.gameStatus = GameStatus.GameCompleted;

    component.playAgain();

    expect(component.matched).toEqual(0);
    expect(component.flippedCount).toEqual(0);
    expect(component.rounds).toEqual(2);
    expect(component.gameStatus).toEqual(GameStatus.DuringTheGame);
  });

  it('game status should be during the game', () => {
    component.matched = 4;
    component.checkGameStatus();
    expect(component.gameStatus).toEqual(GameStatus.DuringTheGame);
  });

  it('game status should be game completed', () => {
    component.matched = 18;
    component.checkGameStatus();
    expect(component.gameStatus).toEqual(GameStatus.GameCompleted);
  });

  it('should add images', () => {
    component.chosenImages = [];
    component.addImages();
    expect(component.images.length).toEqual(9);
    expect(component.chosenImages.length).toEqual(9);
  });

  it('should add cards', () => {
    component.cards = [];
    component.addCards();
    expect(component.cards.length).toEqual(18);
  });

  it('should change status to flipped after clicking the card', () => {
    let card: CardData = {
      imageId: 'card1',
      status: CardStatus.Default,
    };
    component.flippedCount = 0;
    component.cardClicked(card);
    expect(card.status).toEqual(CardStatus.Flipped);
  });

  it('should match cards', () => {
    component.matched = 0;
    component.flippedCount = 2;
    component.cards = [
      {
        imageId: 'card1',
        status: CardStatus.Default,
      },
      {
        imageId: 'card2',
        status: CardStatus.Flipped,
      },
      {
        imageId: 'card2',
        status: CardStatus.Flipped,
      },
      {
        imageId: 'card3',
        status: CardStatus.Default,
      },
    ];

    component.matchCards();

    expect(component.cards).toEqual([
      {
        imageId: 'card1',
        status: CardStatus.Default,
      },
      {
        imageId: 'card2',
        status: CardStatus.Matched,
      },
      {
        imageId: 'card2',
        status: CardStatus.Matched,
      },
      {
        imageId: 'card3',
        status: CardStatus.Default,
      },
    ]);
    expect(component.matched).toEqual(2);
    expect(component.flippedCount).toEqual(0);
  });

  it(
    'not find a match',
    <any>fakeAsync((): void => {
      component.matched = 0;
      component.flippedCount = 2;
      component.cards = [
        {
          imageId: 'card1',
          status: CardStatus.Default,
        },
        {
          imageId: 'card2',
          status: CardStatus.Flipped,
        },
        {
          imageId: 'card3',
          status: CardStatus.Flipped,
        },
        {
          imageId: 'card4',
          status: CardStatus.Default,
        },
      ];

      component.matchCards();
      tick(400);

      expect(component.cards).toEqual([
        {
          imageId: 'card1',
          status: CardStatus.Default,
        },
        {
          imageId: 'card2',
          status: CardStatus.Default,
        },
        {
          imageId: 'card3',
          status: CardStatus.Default,
        },
        {
          imageId: 'card4',
          status: CardStatus.Default,
        },
      ]);
      expect(component.matched).toEqual(0);
      expect(component.flippedCount).toEqual(0);
    })
  );
});
