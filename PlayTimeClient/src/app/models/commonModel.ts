import { Router } from "@angular/router";

export class CommonModel {

    constructor() { }

    static navigateToLink(router: Router, linkAddress: string = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"): void {
        if (linkAddress.startsWith("http")) {
            window.location.href = linkAddress;
        } else {
            router.navigate([linkAddress]);
        }
    }
}