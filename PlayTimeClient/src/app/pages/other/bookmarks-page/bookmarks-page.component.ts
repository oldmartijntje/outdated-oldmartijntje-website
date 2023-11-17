import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { bookmarks } from 'src/app/data/bookmarks';

@Component({
    selector: 'app-bookmarks-page',
    templateUrl: './bookmarks-page.component.html',
    styleUrls: ['./bookmarks-page.component.scss']
})
export class BookmarksPageComponent implements OnInit {
    divs: { left: string; top: string, id: number }[] = [];
    bookmarks: Record<string, any>[] = [];
    lastId: number = 0;
    randomX = 50;
    randomY = 50;

    constructor(
        private router: Router,
        private sanitizer: DomSanitizer
    ) { }

    ngOnInit(): void {
        this.bookmarks = bookmarks;
        for (let i = 0; i < bookmarks.length; i++) {
            this.lastId = i;
            this.checkBookmarkForMissingData(this.bookmarks[i]);
        }
        for (let i = 0; i < bookmarks.length; i++) {
            const left = `${Math.random() * this.randomX}`; // Adjust the range as needed
            const top = `${Math.random() * this.randomY}`; // Adjust the range as needed
            this.divs.push({ left, top, id: i });
        }
    }

    checkBookmarkForMissingData(bookmark: Record<string, any>): void {
        console.log(this.lastId);
        bookmark["Id"] = this.lastId;
        if (bookmark["ActiveTabId"] == undefined) {
            bookmark["ActiveTabId"] = 0;
        }
        if (bookmark["CloseButton"] == undefined) {
            bookmark["CloseButton"] = {
                "Command": "close",
                "Link": ""
            };
        }
        if (bookmark["Size"] == undefined) {
            bookmark["Size"] = {
                "Width": "400px"
            };
        }
        if (bookmark["Type"] == undefined) {
            bookmark["Type"] = "WinXP";
        }
        for (let j = 0; j < bookmark["Tabs"].length; j++) {
            bookmark["Tabs"][j]["Id"] = j;
        }
    }

    trustHTML(html: string): any {
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }

    executeCommand(button: any, bookmark: Record<string, any>): void {
        if (button['Command'].toLocaleLowerCase() == "close") {
            this.deleteBookmark(bookmark["Id"]);
        } else if (button['Command'].toLocaleLowerCase() == "nav") {
            window.open(button['Link'], "_blank");
        } else if (button['Command'].toLocaleLowerCase() == "virus") {
            this.virus(bookmark)
        } else if (button['Command'].toLocaleLowerCase() == "opennewtab") {
            this.reCreateBookmark(button['Payload'])
        }
    }

    virus(bookmark: Record<string, any>): void {
        var calcAmount = 0;
        if (this.lastId == 0) {
            calcAmount = 1;
        } else if (this.lastId > 10) {
            calcAmount = 10;
        } else {
            calcAmount = this.lastId;
        }
        const amount = calcAmount;
        for (let index = 0; index < amount; index++) {
            this.reCreateBookmark(bookmark)

        }
    }

    reCreateBookmark(bookmark: Record<string, any>): void {
        this.lastId++;
        var newBookmark = { ...bookmark };
        this.checkBookmarkForMissingData(newBookmark);
        this.bookmarks.push({ ...newBookmark });
        const left = `${Math.random() * this.randomX}`; // Adjust the range as needed
        const top = `${Math.random() * this.randomY}`; // Adjust the range as needed
        this.divs.push({ left, top, id: this.lastId });
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
        const divs = this.divs.findIndex(bookmark => bookmark.id === bookmarkId);

        if (divs !== -1) {
            this.divs.splice(divs, 1);
        }
        console.log(this.bookmarks);
        console.log(this.divs);
    }

    getDivById(id: number): { left: string; top: string, id: number } {
        var divFound = this.divs.find(div => div.id === id);
        if (divFound == undefined) {
            return { left: `${Math.random() * 50}`, top: `${Math.random() * 50}`, id: 0 };
        }
        return { ...divFound };
    }
}
