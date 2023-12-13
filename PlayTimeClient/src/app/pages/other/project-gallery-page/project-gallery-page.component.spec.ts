import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectGalleryPageComponent } from './project-gallery-page.component';

describe('ProjectGalleryPageComponent', () => {
  let component: ProjectGalleryPageComponent;
  let fixture: ComponentFixture<ProjectGalleryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectGalleryPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectGalleryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
