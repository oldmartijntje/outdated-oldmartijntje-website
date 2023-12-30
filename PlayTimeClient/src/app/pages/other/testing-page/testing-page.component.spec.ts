import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingPageComponent } from './testing-page.component';

describe('TestingPageComponent', () => {
  let component: TestingPageComponent;
  let fixture: ComponentFixture<TestingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestingPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
