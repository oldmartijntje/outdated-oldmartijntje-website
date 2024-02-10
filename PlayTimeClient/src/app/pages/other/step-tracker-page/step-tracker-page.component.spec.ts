import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepTrackerPageComponent } from './step-tracker-page.component';

describe('StepTrackerPageComponent', () => {
  let component: StepTrackerPageComponent;
  let fixture: ComponentFixture<StepTrackerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StepTrackerPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StepTrackerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
