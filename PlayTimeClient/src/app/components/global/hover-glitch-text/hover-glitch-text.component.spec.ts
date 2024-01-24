import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoverGlitchTextComponent } from './hover-glitch-text.component';

describe('HoverGlitchTextComponent', () => {
  let component: HoverGlitchTextComponent;
  let fixture: ComponentFixture<HoverGlitchTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HoverGlitchTextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HoverGlitchTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
