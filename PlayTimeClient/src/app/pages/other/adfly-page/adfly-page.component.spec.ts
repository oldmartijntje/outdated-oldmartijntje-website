import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdflyPageComponent } from './adfly-page.component';

describe('AdflyPageComponent', () => {
  let component: AdflyPageComponent;
  let fixture: ComponentFixture<AdflyPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdflyPageComponent]
    });
    fixture = TestBed.createComponent(AdflyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
