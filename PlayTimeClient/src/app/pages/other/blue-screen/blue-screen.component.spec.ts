import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueScreenComponent } from './blue-screen.component';

describe('BlueScreenComponent', () => {
  let component: BlueScreenComponent;
  let fixture: ComponentFixture<BlueScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlueScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlueScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
