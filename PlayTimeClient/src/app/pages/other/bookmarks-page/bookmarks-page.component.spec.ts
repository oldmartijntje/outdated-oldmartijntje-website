import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarksPageComponent } from './bookmarks-page.component';

describe('BookmarksPageComponent', () => {
  let component: BookmarksPageComponent;
  let fixture: ComponentFixture<BookmarksPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookmarksPageComponent]
    });
    fixture = TestBed.createComponent(BookmarksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
