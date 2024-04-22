import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModel } from 'src/app/models/commonModel';
import { LocalstorageHandlingService } from 'src/app/services/localstorage-handling.service';
import { ToastQueueService } from 'src/app/services/toast-queue.service';

@Component({
    selector: 'app-blue-screen',
    templateUrl: './blue-screen.component.html',
    styleUrl: './blue-screen.component.scss'
})
export class BlueScreenComponent {
    displayNumber = 0;
    ignoreMax = false;
    timeout: any; // store the timeout ID

    constructor(
        private route: ActivatedRoute,
        private toastQueueService: ToastQueueService,
        private router: Router,
        private localstorageHandlingService: LocalstorageHandlingService,
    ) { }

    navigateToPage() {
        CommonModel.navigateToLink(this.router, ['link'], false, false, { 'me': 'plainWebsite' });
    }

    ngOnInit(): void {
        this.checkForAchievements('visit')
        const interval = Math.floor(Math.random() * 5) * 1000 + 2000;
        this.timeout = setInterval(() => {
            this.loop();
        }, interval);
        this.route.queryParams.subscribe(params => {
            const max = params['ignoreMax'];
            if (max) {
                this.ignoreMax = max.toLowerCase() == 'true';
            } else {
                this.ignoreMax = false;
            }
        });
    }

    checkForAchievements(achievement: string) {
        if (achievement == 'visit') {
            const handlerResponse = this.localstorageHandlingService.getLocalstorageHandler().checkAndLoad('easterEggs.aprilfools.deathening')
            if (handlerResponse == null || handlerResponse == false) {
                this.localstorageHandlingService.addEditRequestToQueue(true, 'easterEggs.aprilfools.deathening')
                this.toastQueueService.enqueueToast("You found the \"Blue screen of death\" Achievement!", 'achievement', 69420)
            }
        } else if (achievement == '100%') {
            const handlerResponse = this.localstorageHandlingService.getLocalstorageHandler().checkAndLoad('easterEggs.aprilfools.deathening-pt2-electricBoogaloo')
            if (handlerResponse == null || handlerResponse == false) {
                this.localstorageHandlingService.addEditRequestToQueue(true, 'easterEggs.aprilfools.deathening-pt2-electricBoogaloo')
                this.localstorageHandlingService.immediatlyGoThroughQueue();
                this.toastQueueService.enqueueToast("You found the \"Blue screen of BORING\" Achievement!", 'achievement', 69420)
            }
        } else if (achievement == '420%') {
            const handlerResponse = this.localstorageHandlingService.getLocalstorageHandler().checkAndLoad('easterEggs.aprilfools.deathening-pt3-theReckoning')
            if (handlerResponse == null || handlerResponse == false) {
                this.localstorageHandlingService.addEditRequestToQueue(true, 'easterEggs.aprilfools.deathening-pt3-theReckoning')
                this.localstorageHandlingService.immediatlyGoThroughQueue();
                this.toastQueueService.enqueueToast("You found the \"Blue screen of patience\" Achievement!", 'achievement', 69420)
            }
        }
    }

    loop() {
        this.displayNumber += Math.floor(Math.random() * 7) + 1;
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        if (this.displayNumber > 100 && !this.ignoreMax) {
            this.displayNumber = 100;
            this.toastQueueService.enqueueToast('Nothing Happens..', 'info', 69420);
            this.toastQueueService.enqueueToast('To remove the cap of 100%, add "?ignoreMax=true" to the url', 'info', 69420);
            this.toastQueueService.enqueueToast('Click the :( or QR-code to go to the normal site.', 'info', 69420);
            return;
        }
        if (this.displayNumber >= 420) {
            this.checkForAchievements('420%')
        } else if (this.displayNumber >= 100) {
            this.checkForAchievements('100%')
        }

        const interval = Math.floor(Math.random() * 15) * 1000 + 1000;
        this.timeout = setInterval(() => {
            this.loop();
        }, interval);
        return;
    }
}
