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

    shuffleListOrder(list: any[]): any[] {
        var currentIndex = list.length, temporaryValue, randomIndex;
        var returnList = list.slice();
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex--);

            // And swap it with the current element
            temporaryValue = returnList[currentIndex];
            returnList[currentIndex] = returnList[randomIndex];
            returnList[randomIndex] = temporaryValue;
        }

        return returnList;
    }
}