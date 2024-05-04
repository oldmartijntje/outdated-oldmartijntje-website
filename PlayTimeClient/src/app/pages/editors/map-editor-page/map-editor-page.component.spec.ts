import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapEditorPageComponent } from './map-editor-page.component';

describe('MapEditorPageComponent', () => {
  let component: MapEditorPageComponent;
  let fixture: ComponentFixture<MapEditorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapEditorPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MapEditorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
