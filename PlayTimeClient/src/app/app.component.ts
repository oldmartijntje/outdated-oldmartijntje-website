import { Component, Inject, OnInit } from '@angular/core';
import { ToastQueueService } from './services/toast-queue.service';
import { Router } from '@angular/router';
import { Settings } from './data/settings';
import { RuntimeServiceService } from './services/runtime-service.service';
import { DOCUMENT, PlatformLocation } from '@angular/common';
import { LocalstorageHandlingService } from './services/localstorage-handling.service';
import { BuildData } from './models/buildData';

interface LocalStorageDictionary {
    [key: string]: string | null;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'PlayTime';
    editorSubscription: any;
    showWindows: boolean = false;
    mobileMode: { [key: string]: any } = {
        "MobileUser": false,
        "MobileMode": false
    };
    mobileModePopup: boolean = true;
    ignoreDisclaimer: boolean = false;

    constructor(
        private toastQueueService: ToastQueueService,
        private runtimeServiceService: RuntimeServiceService,
        private router: Router,
        private localstorageHandlingService: LocalstorageHandlingService,
        @Inject(DOCUMENT) private document: Document,
    ) {

    }

    extractLocalStorage(): LocalStorageDictionary {
        const localStorageDict: LocalStorageDictionary = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key) {
                localStorageDict[key] = localStorage.getItem(key);
            }
        }
        return localStorageDict;
    }

    ngOnInit(): void {
        const oldSessionToken = localStorage.getItem("sessionToken");
        if (oldSessionToken != null) {
            console.warn("Old session token found, moving to new storage");
            const localStorageData = this.extractLocalStorage()
            localStorage.clear();
            delete localStorageData["sessionToken"];
            if (localStorageData["appData.oldmartijntje.nl"]) {
                console.warn("Old data found, moving to new storage");
                localStorage.setItem("appData.oldmartijntje.nl", localStorageData["appData.oldmartijntje.nl"]);
                delete localStorageData["appData.oldmartijntje.nl"];
            }
            this.localstorageHandlingService.addEditRequestToQueue(oldSessionToken, "private.userAccountKey");
            this.localstorageHandlingService.addEditRequestToQueue(localStorageData, "oldData.extraction.Build" + BuildData.BuildNumber);
            this.localstorageHandlingService.immediatlyGoThroughQueue();
            console.log("Old data moved to new storage");
        }
        // this.toastQueueService.showToast('Hello World!', 'info', 0);
        // this.toastQueueService.showToast('Hello World!', 'warning', 0);
        // this.toastQueueService.showToast('Hello World!', 'error', 0);
        this.router.events.subscribe(event => {
            const currentUrl = this.router.url; // Get the full URL
            const currentPathWithoutQueryParams = currentUrl.split('?')[0].substring(1); // Extract the path
            currentPathWithoutQueryParams;
            if (Settings["inWindowsRouter"].includes(currentPathWithoutQueryParams)) {
                this.showWindows = true;
            } else {
                this.showWindows = false;
            }
            if (Settings["ignoreDisclaimer"].includes(currentPathWithoutQueryParams)) {
                this.ignoreDisclaimer = true;
            } else {
                this.ignoreDisclaimer = false;
            }
        });
        this.runtimeServiceService.mobileModeSubjectValue$.subscribe((value) => {
            this.mobileMode = value;
        });
        if (this.isMobileDevice()) {
            this.runtimeServiceService.setMobileMode(true);
            this.runtimeServiceService.setMobileUserType(true);
        } else {
            const HandlerRespone = this.localstorageHandlingService.getLocalstorageHandler().loadData("layout.mobileMode");
            if (HandlerRespone.success) {
                this.runtimeServiceService.setMobileMode(JSON.parse(HandlerRespone.data || ""));
            }
        }


    }

    isMobileDevice(): boolean {
        const userAgent = this.document.defaultView?.navigator?.userAgent || '';
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    }


}
