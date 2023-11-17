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

    constructor(
        private router: Router,
        private sanitizer: DomSanitizer
    ) { }

    ngOnInit(): void {
        this.bookmarks = bookmarks;
        for (let i = 0; i < bookmarks.length; i++) { // Change 10 to the number of divs you want
            this.bookmarks[i]["Id"] = i;
            this.lastId = i;
            if (this.bookmarks[i]["ActiveTabId"] == undefined) {
                this.bookmarks[i]["ActiveTabId"] = 0;
            }
            if (this.bookmarks[i]["Type"] == undefined) {
                this.bookmarks[i]["Type"] = "WinXP";
            }
            for (let j = 0; j < this.bookmarks[i]["Tabs"].length; j++) {
                this.bookmarks[i]["Tabs"][j]["Id"] = j;
            }
        }
        for (let i = 0; i < bookmarks.length; i++) { // Change 10 to the number of divs you want
            const left = `${Math.random() * 50}`; // Adjust the range as needed
            const top = `${Math.random() * 50}`; // Adjust the range as needed
            this.divs.push({ left, top, id: i });
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
        this.bookmarks.push({ ...bookmark });
        this.bookmarks[this.bookmarks.length - 1]["Id"] = this.lastId + 1;
        for (let i = 0; i < this.bookmarks[this.bookmarks.length - 1]["Tabs"].length; i++) {
            this.bookmarks[this.bookmarks.length - 1]["Tabs"][i]["Id"] = i;
        }
        const left = `${Math.random() * 50}`; // Adjust the range as needed
        const top = `${Math.random() * 50}`; // Adjust the range as needed
        this.divs.push({ left, top, id: this.lastId });
        this.lastId++;
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
        var div = this.divs.find(div => div.id === id);
        if (div == undefined) {
            return { left: "0", top: "0", id: 0 };
        }
        return div;
    }
}
