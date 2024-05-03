import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunkyCssPageComponent } from './funky-css-page.component';

describe('FunkyCssPageComponent', () => {
  let component: FunkyCssPageComponent;
  let fixture: ComponentFixture<FunkyCssPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FunkyCssPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FunkyCssPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
