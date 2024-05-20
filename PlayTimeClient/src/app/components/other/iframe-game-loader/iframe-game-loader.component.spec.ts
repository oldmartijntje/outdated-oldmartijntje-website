import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IframeGameLoaderComponent } from './iframe-game-loader.component';

describe('IframeGameLoaderComponent', () => {
  let component: IframeGameLoaderComponent;
  let fixture: ComponentFixture<IframeGameLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IframeGameLoaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IframeGameLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
