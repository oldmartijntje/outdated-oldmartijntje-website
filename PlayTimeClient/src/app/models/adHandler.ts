import { displayAd, smallAdList, mediumAdList, bigAdList } from "../data/ads";

export class AdHandler {
    constructor() {
        this.smallAdList = smallAdList;
        this.bigAdList = bigAdList;
        this.mediumAdList = mediumAdList;
    }
    smallAdList: displayAd[];
    bigAdList: displayAd[];
    mediumAdList: displayAd[];

    getSmallAdList(): displayAd[] {
        return this.smallAdList;
    }

    getMediumAdList(): displayAd[] {
        return this.mediumAdList;
    }

    getBigAdList(): displayAd[] {
        return this.bigAdList;
    }

    hasNonEmptyLink(ad: displayAd): boolean {
        return ad.link.trim() !== '';
    }

    sendToLink(ad: displayAd): void {
        if (this.hasNonEmptyLink(ad)) {
            if (ad.blank_) {
                window.open(ad.link, '_blank');
            } else {
                window.location.href = ad.link;
            }
        }
    }

    ngForScroll(): any[] {
        return [0, 0, 0]
    }
}