import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MqttViewerComponent } from './mqtt-viewer.component';

describe('MqttViewerComponent', () => {
  let component: MqttViewerComponent;
  let fixture: ComponentFixture<MqttViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MqttViewerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MqttViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
