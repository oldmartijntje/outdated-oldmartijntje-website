import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinecraftPageComponent } from './minecraft-page.component';

describe('MinecraftPageComponent', () => {
  let component: MinecraftPageComponent;
  let fixture: ComponentFixture<MinecraftPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MinecraftPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinecraftPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
