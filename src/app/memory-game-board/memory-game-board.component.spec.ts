import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryGameBoardComponent } from './memory-game-board.component';

describe('MemoryGameBoardComponent', () => {
  let component: MemoryGameBoardComponent;
  let fixture: ComponentFixture<MemoryGameBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemoryGameBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoryGameBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
