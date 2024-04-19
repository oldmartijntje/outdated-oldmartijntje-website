import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Links, Link, linkTooltip } from 'src/app/data/settings';
import { CommonModel } from 'src/app/models/commonModel';
import { BackendServiceService } from 'src/app/services/backend-service.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { ToastQueueService } from 'src/app/services/toast-queue.service';
import { LocalstorageHandlingService } from 'src/app/services/localstorage-handling.service';

@Component({
    selector: 'app-navigator-page',
    templateUrl: './navigator-page.component.html',
    styleUrl: './navigator-page.component.scss'
})
export class NavigatorPageComponent {

    admin: boolean = false;
    links: Link[] = [];
    showAnything: boolean = false;
    tooltip: string = linkTooltip;
    search: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private backendServiceService: BackendServiceService,
        private clipboard: Clipboard,
        private toastQueue: ToastQueueService,
        private localstorageHandlingService: LocalstorageHandlingService
    ) {
        this.route.queryParams.subscribe(params => {
            if (params['me']) {
                // window.location.href = params['url'];
                const url = Links.find(x => x.queryParam === params['me']);
                if (url) {
                    const params = this.getParams(url);
                    var skipNav = true;
                    if (url.setSkipLocationChange != undefined) {
                        skipNav = url.setSkipLocationChange;
                    }
                    if (params['/']) {
                        if (typeof url.link === "object") {
                            const slash = params['/'].split("/");
                            for (let i = 0; i < slash.length; i++) {
                                url.link.push(slash[i]);
                            }
                        }
                        else if (url.link.startsWith("http")) {
                            url.link += "/" + params['/'];
                        } else {
                            const slash = params['/'].split("/");
                            slash.unshift(url.link);
                            url.link = slash;
                        }
                        delete params['/'];

                    }
                    this.checkForAchievement();
                    CommonModel.navigateToLink(this.router, url.link, undefined, skipNav, params);
                } else {
                    CommonModel.navigateToLink(this.router, [], undefined, true, undefined);
                }
            } else {
                this.showAnything = true;
                console.log("No query params found");
                this.getLinksToShow()
            }
        });
    }

    getParams(url: Link | undefined): { [key: string]: string } {
        var params = { ...this.route.snapshot.queryParams };
        delete params['me'];
        if (!url) {
            return params;
        }
        var paramsFromLink = url.queryParamsInLink;
        if (paramsFromLink) {
            params = Object.assign(params, paramsFromLink);
        }
        return params;
    }

    getLinksToShow() {
        this.links = Links.filter(x => x.discoverable || this.admin);
    }

    // check for queryparams
    ngOnInit() {
        this.backendServiceService.addMessage("/admintest", "").subscribe((data) => {
            this.admin = true;
            this.getLinksToShow()
        },
            (error) => {
                this.admin = false;
                this.getLinksToShow()
            }
        );
    }

    navigateToLink(link: Link | undefined): void {
        if (!link) {
            this.clipboard.copy(this.tooltip.split('?')[0]);
            this.toastQueue.enqueueToast("Link copied to clipboard", "info");
            return;
        }
        if (!this.search) {
            this.checkForAchievement();
            const params = this.getParams(link);
            var skipNav = true;
            if (link.setSkipLocationChange != undefined) {
                skipNav = link.setSkipLocationChange;
            }
            CommonModel.navigateToLink(this.router, link.link, true, skipNav, params);
        } else {
            this.clipboard.copy(this.tooltip + link.queryParam);
            this.toastQueue.enqueueToast("Link copied to clipboard", "info");
        }
    }

    onCheckbox(event: any) {
        this.search = event.target.checked;
    }

    checkForAchievement() {
        const handlerResponse = this.localstorageHandlingService.getLocalstorageHandler().checkAndLoad('easterEggs.navigator.fastTravel')
        if (handlerResponse == null || handlerResponse == false) {
            this.localstorageHandlingService.addEditRequestToQueue(true, 'easterEggs.navigator.fastTravel')
            this.localstorageHandlingService.immediatlyGoThroughQueue();
            this.toastQueue.enqueueToast("You found the \"Fast Traval.\" Achievement!", 'achievement', 69420)
        }
        const handlerResponse2 = this.localstorageHandlingService.getLocalstorageHandler().checkAndLoad('easterEggs.navigator.fastTravelCounter')
        if (handlerResponse2 == null || handlerResponse == false) {
            this.localstorageHandlingService.addEditRequestToQueue(1, 'easterEggs.navigator.fastTravelCounter')
        } else if (handlerResponse2 < 10) {
            if (handlerResponse2 + 1 == 10) {
                this.toastQueue.enqueueToast("You found the \"Fast Maniac.\" Achievement!", 'achievement', 69420)
            }
            this.localstorageHandlingService.addEditRequestToQueue(handlerResponse2 + 1, 'easterEggs.navigator.fastTravelCounter');
            this.localstorageHandlingService.immediatlyGoThroughQueue();
        }

    }
}
