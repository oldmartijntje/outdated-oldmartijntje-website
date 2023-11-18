import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileBookmarksPageComponent } from './mobile-bookmarks-page.component';

describe('MobileBookmarksPageComponent', () => {
  let component: MobileBookmarksPageComponent;
  let fixture: ComponentFixture<MobileBookmarksPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobileBookmarksPageComponent]
    });
    fixture = TestBed.createComponent(MobileBookmarksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
