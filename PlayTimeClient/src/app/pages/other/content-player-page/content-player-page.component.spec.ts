import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentPlayerPageComponent } from './content-player-page.component';

describe('ContentPlayerPageComponent', () => {
  let component: ContentPlayerPageComponent;
  let fixture: ComponentFixture<ContentPlayerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContentPlayerPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentPlayerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
