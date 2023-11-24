import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinClickerGameComponent } from './coin-clicker-game.component';

describe('CoinClickerGameComponent', () => {
  let component: CoinClickerGameComponent;
  let fixture: ComponentFixture<CoinClickerGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoinClickerGameComponent]
    });
    fixture = TestBed.createComponent(CoinClickerGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
