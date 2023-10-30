import { Component, OnInit } from '@angular/core';
import { ToastQueueService } from './services/global/toast-queue.service';
import { EditorServiceService } from './services/global/editor-service.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'PlayTime';
    editorSubscription: any;
    showEditor: boolean = false;

    constructor(private toastQueueService: ToastQueueService,
        private editorServiceService: EditorServiceService) {

    }
    ngOnInit(): void {
        this.showToast('Hello World!', 'info', 0);
        this.showToast('Hello World!', 'warning', 0);
        this.showToast('Hello World!', 'error', 0);
        this.editorSubscription = this.editorServiceService.currentValue$.subscribe((value) => {
            this.showEditor = value;
        });


    }

    showToast(toastMessage: string = 'Default Toast: "Hello World!"', type: string = 'info', timeModifier: number = 0) {
        this.toastQueueService.enqueueToast(toastMessage, type, timeModifier);
    }
}
