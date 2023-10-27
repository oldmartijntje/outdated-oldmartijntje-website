import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastPopupComponent } from './toast-popup.component';

describe('ToastPopupComponent', () => {
  let component: ToastPopupComponent;
  let fixture: ComponentFixture<ToastPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToastPopupComponent]
    });
    fixture = TestBed.createComponent(ToastPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
