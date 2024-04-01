import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModel } from 'src/app/models/commonModel';
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
        private router: Router
    ) { }

    navigateToPage() {
        CommonModel.navigateToLink(this.router, ['link'], false, false, { 'me': 'plainWebsite' });
    }

    ngOnInit(): void {
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

    loop() {
        this.displayNumber += Math.floor(Math.random() * 7) + 1;
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        if (this.displayNumber > 100 && !this.ignoreMax) {
            this.displayNumber = 100;
            this.toastQueueService.enqueueToast('Nothing Happens..', 'info', 69420);
            this.toastQueueService.enqueueToast('To remove the cap of 100%, add "?ignoreMax=true" to the url', 'info', 69420);
            return;
        }

        const interval = Math.floor(Math.random() * 15) * 1000 + 1000;
        this.timeout = setInterval(() => {
            this.loop();
        }, interval);
        return;
    }
}
