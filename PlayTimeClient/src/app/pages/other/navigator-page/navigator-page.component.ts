import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Links, Link, linkTooltip } from 'src/app/data/settings';
import { CommonModel } from 'src/app/models/commonModel';
import { BackendServiceService } from 'src/app/services/backend-service.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { ToastQueueService } from 'src/app/services/toast-queue.service';

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
        private toastQueue: ToastQueueService
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
        params['me'] = undefined;
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
}
