import { smallAd, smallAdList } from "../data/ads";

export class AdHandler {
    constructor() {
        this.smallAdList = smallAdList;
    }
    smallAdList: smallAd[];

    getSmallAdList(): smallAd[] {
        return this.smallAdList;
    }

    hasNonEmptyLink(ad: smallAd): boolean {
        return ad.link.trim() !== '';
    }

    sendToLink(ad: smallAd): void {
        if (this.hasNonEmptyLink(ad)) {
            if (ad.blank_) {
                window.open(ad.link, '_blank');
            } else {
                window.location.href = ad.link;
            }
        }
    }
}