import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RailroadinkPageComponent } from './railroadink-page.component';

describe('RailroadinkPageComponent', () => {
  let component: RailroadinkPageComponent;
  let fixture: ComponentFixture<RailroadinkPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RailroadinkPageComponent]
    });
    fixture = TestBed.createComponent(RailroadinkPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
