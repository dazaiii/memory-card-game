import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';

import { GameCardComponent } from './game-card.component';

import { CardData, CardStatus } from 'src/models/card.models';

describe('GameCardComponent', () => {
  let component: GameCardComponent;
  let fixture: ComponentFixture<GameCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameCardComponent],
      imports: [BrowserAnimationsModule, NoopAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create image path', () => {
    let cardData: CardData = {
      imageId: 'card1',
      status: CardStatus.Default,
    };
    component.cardData = cardData;
    expect(component.createImagePath()).toEqual('assets/card1.jpeg');
  });
});
