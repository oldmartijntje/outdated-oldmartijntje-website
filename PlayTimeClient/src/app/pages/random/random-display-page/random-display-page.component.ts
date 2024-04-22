import { Component, OnInit } from '@angular/core';
import { RandomDisplayHandler, itemDisplay } from 'src/app/models/randomDisplayHandler';
import { LocalstorageHandlingService } from 'src/app/services/localstorage-handling.service';
import { ToastQueueService } from 'src/app/services/toast-queue.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-random-display-page',
    templateUrl: './random-display-page.component.html',
    styleUrl: './random-display-page.component.scss'
})
export class RandomDisplayPageComponent implements OnInit {
    displayItems: itemDisplay[] = [];
    randomDisplayHandler = new RandomDisplayHandler();
    amount = 0;
    development = !environment.production;

    constructor(
        private localstorageHandlingService: LocalstorageHandlingService,
        private toastQueue: ToastQueueService
    ) { }

    ngOnInit(): void {
        this.getItems(false);
        this.amount = this.randomDisplayHandler.getAmountOfItems();
    }

    getItems(manual: boolean): void {
        this.displayItems = this.randomDisplayHandler.getItems(8);
        if (manual) {
            const handlerResponse = this.localstorageHandlingService.getLocalstorageHandler().checkAndLoad('easterEggs.ItemDisplay.refreeeshh')
            if (handlerResponse == null || handlerResponse == false) {
                this.localstorageHandlingService.addEditRequestToQueue(true, 'easterEggs.ItemDisplay.refreeeshh')
                this.localstorageHandlingService.immediatlyGoThroughQueue();
                this.toastQueue.enqueueToast("You found the \"Birdz and the Beez.\" Achievement!", 'achievement', 69420)
            }
        }
    }

    getLatestItems(): void {
        this.displayItems = this.randomDisplayHandler.getLatestItems(8);
    }



}
