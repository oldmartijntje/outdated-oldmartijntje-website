import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationPageComponent } from './bookmarks-page.component';

describe('BookmarksPageComponent', () => {
    let component: ApplicationPageComponent;
    let fixture: ComponentFixture<ApplicationPageComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ApplicationPageComponent]
        });
        fixture = TestBed.createComponent(ApplicationPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
