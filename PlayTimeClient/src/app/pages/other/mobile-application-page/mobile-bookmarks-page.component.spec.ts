import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileApplicationPageComponent } from './mobile-bookmarks-page.component';

describe('MobileBookmarksPageComponent', () => {
    let component: MobileApplicationPageComponent;
    let fixture: ComponentFixture<MobileApplicationPageComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [MobileApplicationPageComponent]
        });
        fixture = TestBed.createComponent(MobileApplicationPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
