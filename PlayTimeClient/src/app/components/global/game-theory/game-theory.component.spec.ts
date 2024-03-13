import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTheoryComponent } from './game-theory.component';

describe('GameTheoryComponent', () => {
  let component: GameTheoryComponent;
  let fixture: ComponentFixture<GameTheoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameTheoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameTheoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
