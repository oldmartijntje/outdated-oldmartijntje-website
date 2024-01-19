import { randomWebsites } from '../data/websiteDispleyItems';

export interface itemDisplay {
    title: string;
    url: string;
    image?: string;
    description?: string;
    bannerText: string;
    myOwn?: boolean;
    nsfw?: boolean;

}

function deepcopy(object: any) {
    return JSON.parse(JSON.stringify(object));
}

export class RandomDisplayHandler {
    randomWebsites = deepcopy(randomWebsites);

    constructor() { 
        for (let i = this.randomWebsites.length - 1; i > 0; i--) {
            if (this.randomWebsites[i].url == "") {
                this.randomWebsites.splice(i, 1);
            }
        }
    }

    getItems(amount: number = 8): itemDisplay[] {
        // Shuffle the array using Fisher-Yates algorithm
        for (let i = this.randomWebsites.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.randomWebsites[i], this.randomWebsites[j]] = [this.randomWebsites[j], this.randomWebsites[i]];
        }

        // Return the requested amount of items
        return this.randomWebsites.slice(0, amount);
    }

    getAmountOfItems() {
        return this.randomWebsites.length;
    }

    getLatestItems(amount: number = 8): itemDisplay[] {
        this.randomWebsites = deepcopy(randomWebsites);
        for (let i = this.randomWebsites.length - 1; i > 0; i--) {
            if (this.randomWebsites[i].url == "") {
                this.randomWebsites.splice(i, 1);
            }
        }

        const latestItems = this.randomWebsites.slice(this.randomWebsites.length - amount, this.randomWebsites.length);
        return latestItems;
    }
}

