import { Router } from "@angular/router";

export class CommonModel {

    constructor() { }

    /**
     * Navigate to a link
     * @param router 
     * @param linkAddress 
     * @param _blank 
     * @param skipLocationChange 
     * @param queryParams
     * @returns 
     */
    static navigateToLink(router: Router, linkAddress: string | string[] = "https://www.youtube.com/watch?v=dQw4w9WgXcQ", _blank: boolean = false, skipLocationChange: boolean = false, queryParams: { [key: string]: string } = {}): void {
        if (typeof linkAddress === "object") {
            if (skipLocationChange) {
                router.navigate(linkAddress, { skipLocationChange: true, queryParams: queryParams });
                return;
            }
            router.navigate(linkAddress, { skipLocationChange: false, queryParams: queryParams });
            return;
        }
        if (linkAddress.startsWith("http")) {
            if (_blank) {
                window.open(linkAddress, '_blank');
            } else {
                window.location.href = linkAddress;
            }
        } else {
            if (skipLocationChange) {
                router.navigate([linkAddress], { skipLocationChange: true, queryParams: queryParams });
                return;
            }
            router.navigate([linkAddress], { queryParams: queryParams });
            return;
        }
    }
}