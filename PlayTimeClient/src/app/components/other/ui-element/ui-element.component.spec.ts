import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiElementComponent } from './ui-element.component';

describe('UiElementComponent', () => {
  let component: UiElementComponent;
  let fixture: ComponentFixture<UiElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UiElementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UiElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
