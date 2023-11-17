import { Component, OnInit } from '@angular/core';
import { ToastQueueService } from './services/global/toast-queue.service';
import { EditorServiceService } from './services/global/editor-service.service';
import { Router } from '@angular/router';
import { Settings } from './data/settings';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'PlayTime';
    editorSubscription: any;
    showEditor: boolean = false;
    showWindows: boolean = false;

    constructor(
        private toastQueueService: ToastQueueService,
        private editorServiceService: EditorServiceService,
        private router: Router
    ) {

    }
    ngOnInit(): void {
        // this.toastQueueService.showToast('Hello World!', 'info', 0);
        // this.toastQueueService.showToast('Hello World!', 'warning', 0);
        // this.toastQueueService.showToast('Hello World!', 'error', 0);
        this.editorSubscription = this.editorServiceService.currentValue$.subscribe((value) => {
            this.showEditor = value;
        });
        this.router.events.subscribe(event => {
            const currentUrl = this.router.url; // Get the full URL
            const currentPathWithoutQueryParams = currentUrl.split('?')[0].substring(1); // Extract the path
            currentPathWithoutQueryParams;
            if (Settings["inWindowsRouter"].includes(currentPathWithoutQueryParams)) {
                this.showWindows = true;
            } else {
                this.showWindows = false;
            }
        });


    }


}
