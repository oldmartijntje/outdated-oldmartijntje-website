import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievementCollectionPageComponent } from './achievement-collection-page.component';

describe('AchievementCollectionPageComponent', () => {
  let component: AchievementCollectionPageComponent;
  let fixture: ComponentFixture<AchievementCollectionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AchievementCollectionPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AchievementCollectionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
