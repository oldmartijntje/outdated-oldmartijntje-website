import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { bookmarks } from 'src/app/data/bookmarks';

@Component({
    selector: 'app-bookmarks-page',
    templateUrl: './bookmarks-page.component.html',
    styleUrls: ['./bookmarks-page.component.scss']
})
export class BookmarksPageComponent {

    constructor(private router: Router) { }

    bookmarks = bookmarks;

    routerNav(routeSegments: string[]): void {
        // Navigate to the specified route
        this.router.navigate(routeSegments);
    }

    setActiveTab(tabId: number, bookmarkId: number): void {
        this.bookmarks[bookmarkId]["ActiveTabId"] = tabId;
    }

    isActiveTab(tabId: string, bookmarkId: string, bookmark: any): boolean {
        return bookmark['ActiveTabId'] == tabId;
    }

    deleteBookmark(bookmarkId: number): void {
        this.bookmarks.splice(bookmarkId, 1);
    }
}
