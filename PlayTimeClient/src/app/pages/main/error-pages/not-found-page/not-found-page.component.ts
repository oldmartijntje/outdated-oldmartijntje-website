import { Component } from '@angular/core';
import { LocalstorageHandlingService } from 'src/app/services/localstorage-handling.service';
import { ToastQueueService } from 'src/app/services/toast-queue.service';
// import { BackendServiceService } from 'src/app/services/backend-service.service';

@Component({
    selector: 'app-not-found-page',
    templateUrl: './not-found-page.component.html',
    styleUrls: ['./not-found-page.component.scss']
})
export class NotFoundPageComponent {
    doomed: boolean = false;

    // constructor(
    //     private backendService: BackendServiceService,
    // ) {
    //     this.backendService.addMessage("meow", "owo").subscribe(data => {
    //         this.backendService.getMessages().subscribe(data => {
    //             console.log(data)
    //         });
    //     });
    // }

    constructor(
        private localstorageHandlingService: LocalstorageHandlingService,
        private toastQueueService: ToastQueueService
    ) { }

    handleCustomEvent(data: any) {
        this.doomed = !this.doomed
        const handlerResponse = this.localstorageHandlingService.getLocalstorageHandler().checkAndLoad('easterEggs.404.EthernityNF')
        if (handlerResponse == null || handlerResponse == false) {
            this.localstorageHandlingService.addEditRequestToQueue(true, 'easterEggs.404.EthernityNF')
            this.localstorageHandlingService.immediatlyGoThroughQueue();
            this.toastQueueService.enqueueToast("You found the \"Ethernal Power!\" easter egg!", 'achievement', 69420)
        }
    }

}
