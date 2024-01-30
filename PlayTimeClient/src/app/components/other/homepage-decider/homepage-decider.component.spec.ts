import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageDeciderComponent } from './homepage-decider.component';

describe('HomepageDeciderComponent', () => {
  let component: HomepageDeciderComponent;
  let fixture: ComponentFixture<HomepageDeciderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomepageDeciderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomepageDeciderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
