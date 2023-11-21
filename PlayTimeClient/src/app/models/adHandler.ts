import { smallAd, smallAdList } from "../data/ads";

export class adHandler {
    constructor() {
        this.smallAdList = smallAdList;
    }
    smallAdList: smallAd[];

    getSmallAdList() {
        return this.smallAdList;
    }

    hasNonEmptyLink(ad: smallAd): boolean {
        return ad.link.trim() !== '';
    }
}