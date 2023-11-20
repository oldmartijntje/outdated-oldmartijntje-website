import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Settings, PageInfo } from 'src/app/data/settings';
import { RuntimeServiceService } from 'src/app/services/global/runtime-service.service';

@Component({
    selector: 'app-mobile-bookmarks-page',
    templateUrl: './mobile-bookmarks-page.component.html',
    styleUrls: ['./mobile-bookmarks-page.component.scss']
})
export class MobileBookmarksPageComponent implements OnInit {
    divs: { left: string; top: string, id: number }[] = [];
    bookmarks: Record<string, any>[] = [];
    lastId: number = 0;
    randomX = 50;
    randomY = 50;
    showRouter: boolean = false;
    activePage = "";
    isBlockDraggable = false;
    pageInfo: Record<string, any>[] = [];
    mobileMode: { [key: string]: any } = {
        "MobileUser": false,
        "MobileMode": false
    };

    constructor(
        private router: Router,
        private runtimeServiceService: RuntimeServiceService,
    ) { }

    ngOnInit(): void {
        this.router.events.subscribe(event => {
            const currentUrl = this.router.url; // Get the full URL
            const currentPathWithoutQueryParams = currentUrl.split('?')[0].substring(1); // Extract the path
            this.activePage = currentPathWithoutQueryParams;
            if (Settings["inWindowsRouter"].includes(currentPathWithoutQueryParams)) {
                this.showRouter = true;
            } else {
                this.showRouter = false;
            }
        });
        this.runtimeServiceService.mobileModeSubjectValue$.subscribe((value) => {
            this.mobileMode = value;
        });
        this.pageInfo = PageInfo;
    }

    switchPage(newPage: string): void {
        this.activePage = newPage;
        this.router.navigate([newPage]);
    }

    goToWebPage(url: string): void {
        window.location.href = url;
    }

    routerNav(routeSegments: string[]): void {
        // Navigate to the specified route
        this.router.navigate(routeSegments);
    }

    setMobileMode(value: boolean) {
        localStorage.setItem("MobileMode", value.toString());
        this.runtimeServiceService.setMobileMode(value);
    }

    deleteLocalStorage() {
        localStorage.clear();
    }
}
