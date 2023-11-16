import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { bookmarks } from 'src/app/data/bookmarks';

@Component({
    selector: 'app-bookmarks-page',
    templateUrl: './bookmarks-page.component.html',
    styleUrls: ['./bookmarks-page.component.scss']
})
export class BookmarksPageComponent {
    divs: { left: string; top: string }[] = [];
    bookmarks = bookmarks;

    constructor(private router: Router) {
        for (let i = 0; i < bookmarks.length; i++) { // Change 10 to the number of divs you want
            const left = `${Math.random() * 50}vw`; // Adjust the range as needed
            const top = `${Math.random() * 50}vh`; // Adjust the range as needed
            this.divs.push({ left, top });
        }
    }


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
        const index = this.bookmarks.findIndex(bookmark => bookmark['Id'] === bookmarkId);

        if (index !== -1) {
            this.bookmarks.splice(index, 1);
        }
    }
}
