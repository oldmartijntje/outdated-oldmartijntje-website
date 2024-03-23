import { Router } from "@angular/router";

export class CommonModel {

    constructor() { }

    static navigateToLink(router: Router, linkAddress: string | string[] = "https://www.youtube.com/watch?v=dQw4w9WgXcQ", _blank: boolean = false): void {
        if (typeof linkAddress === "object") {
            router.navigate(linkAddress);
            return;
        }
        if (linkAddress.startsWith("http")) {
            if (_blank) {
                window.open(linkAddress, '_blank');
            } else {
                window.location.href = linkAddress;
            }
        } else {
            router.navigate([linkAddress]);
        }
    }
}