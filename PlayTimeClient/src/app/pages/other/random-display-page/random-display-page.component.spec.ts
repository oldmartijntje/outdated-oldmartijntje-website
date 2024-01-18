import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomDisplayPageComponent } from './random-display-page.component';

describe('RandomDisplayPageComponent', () => {
  let component: RandomDisplayPageComponent;
  let fixture: ComponentFixture<RandomDisplayPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RandomDisplayPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RandomDisplayPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
