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

export class RandomDisplayHandler {
    getItems(amount: number = 8): itemDisplay[] {
        // Shuffle the array using Fisher-Yates algorithm
        for (let i = randomWebsites.length - 1; i > 0; i--) {
            if (randomWebsites[i].url == "") {
                randomWebsites.splice(i, 1);
            }
        }
        for (let i = randomWebsites.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [randomWebsites[i], randomWebsites[j]] = [randomWebsites[j], randomWebsites[i]];
        }

        // Return the requested amount of items
        return randomWebsites.slice(0, amount);
    }

    getAmountOfItems() {
        return randomWebsites.length;
    }
}

