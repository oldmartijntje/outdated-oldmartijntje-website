import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FancyNotFoundPageComponent } from './fancy-not-found-page.component';

describe('FancyNotFoundPageComponent', () => {
  let component: FancyNotFoundPageComponent;
  let fixture: ComponentFixture<FancyNotFoundPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FancyNotFoundPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FancyNotFoundPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
