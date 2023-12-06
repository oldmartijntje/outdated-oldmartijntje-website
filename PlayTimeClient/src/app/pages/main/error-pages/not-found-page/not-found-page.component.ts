import { Component } from '@angular/core';
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

    handleCustomEvent(data: any) {
        this.doomed = !this.doomed
    }
}
