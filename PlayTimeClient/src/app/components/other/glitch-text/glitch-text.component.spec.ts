import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlitchTextComponent } from './glitch-text.component';

describe('GlitchTextComponent', () => {
  let component: GlitchTextComponent;
  let fixture: ComponentFixture<GlitchTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlitchTextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GlitchTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
