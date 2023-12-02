import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { smallAd } from 'src/app/data/ads';
import { Settings, PageInfo } from 'src/app/data/settings';
import { AdHandler } from 'src/app/models/adHandler';
import { RuntimeServiceService } from 'src/app/services/runtime-service.service';

@Component({
    selector: 'app-mobile-application-page',
    templateUrl: './mobile-application-page.component.html',
    styleUrls: ['./mobile-application-page.component.scss']
})
export class MobileApplicationPageComponent implements OnInit {
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
        private runtimeServiceService: RuntimeServiceService
    ) { }

    ngOnInit(): void {
        this.router.events.subscribe(event => {
            const currentUrl = this.router.url; // Get the full URL
            const currentPathWithoutQueryParams = currentUrl.split('?')[0].substring(1); // Extract the path
            this.activePage = currentPathWithoutQueryParams;
            this.showRouter = true;
            // if (Settings["inWindowsRouter"].includes(currentPathWithoutQueryParams)) {
            //     this.showRouter = true;
            // } else {
            //     this.showRouter = false;
            // }
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

    goToWebPage(url: string, openInNewTab: boolean = false): void {
        if (openInNewTab) {
            window.open(url, '_blank');
        } else {
            window.location.href = url;
        }
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

    getListOfSmallAds(): smallAd[] {
        var adHandler = new AdHandler();
        return adHandler.getSmallAdList();
    }

    sendToLink(ad: smallAd): void {
        var adHandler = new AdHandler();
        adHandler.sendToLink(ad);
    }

    ngForScroll() {
        var adHandler = new AdHandler();
        return adHandler.ngForScroll();
    }

    calculateWidth(): string {
        var width = `${this.getListOfSmallAds().length * 88 * 3}`
        return width
    }

    hasNonEmptyLink(ad: smallAd): any {
        var adHandler = new AdHandler();
        if (adHandler.hasNonEmptyLink(ad)) {
            return { 'cursor': 'pointer' }
        }
    }
}
