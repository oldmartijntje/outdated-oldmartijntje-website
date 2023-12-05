import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { displayAd } from 'src/app/data/ads';
import { AdHandler } from 'src/app/models/adHandler';
import { Encryptor } from 'src/app/models/encryptor';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
    selector: 'app-adfly-page',
    templateUrl: './adfly-page.component.html',
    styleUrls: ['./adfly-page.component.scss']
})
export class AdflyPageComponent implements OnInit {
    createMode: boolean = false;
    navigation: string = "";
    textToFormat: string = "";
    madeUrl: string = "";
    error = false;
    static startUrl = "https://oldmartijntje.nl/AdBee?nav=";
    adSizeOrder = [0, 1, 2];
    adSizeStyling = [{ 'width': '88px', 'height': '31px' }, { 'width': '264px', 'height': '62px' }, { 'width': '264px', 'height': '93px' }]

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private clipboard: Clipboard
    ) { }

    getRightStyling(index: number): any {
        return this.adSizeStyling[index];
    }

    navigateToLink(): void {
        if (this.navigation == "") {
            this.error = true;
        } else {
            this.error = false;
            window.location.href = this.navigation;
        }
    }

    ngOnInit(): void {
        this.route.queryParamMap.subscribe(params => {
            // Get the value of the 'nav' query parameter
            const navQueryParam = params.get('nav');
            if (navQueryParam == null) {
                this.createMode = true;
            } else {
                this.createMode = false;
                this.navigation = this.formatTextFromParams(navQueryParam)
            }
        });
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

    createURL(): void {
        this.madeUrl = AdflyPageComponent.startUrl + this.formatTextToParams(this.textToFormat);
    }

    getListOfdisplayAds(size: number = 0): displayAd[] {
        var adHandler = new AdHandler();
        switch (size) {
            case 0:
                return adHandler.getSmallAdList();
            case 1:
                return adHandler.getMediumAdList();
            case 2:
                return adHandler.getBigAdList();
            default:
                return adHandler.getSmallAdList();
        }
    }

    sendToLink(ad: displayAd): void {
        var adHandler = new AdHandler();
        adHandler.sendToLink(ad);
    }

    hasNonEmptyLink(ad: displayAd): any {
        var adHandler = new AdHandler();
        if (adHandler.hasNonEmptyLink(ad)) {
            return { 'cursor': 'pointer' }
        }
    }

    getStyling(ad: displayAd, adType: number): any {
        var dict1 = this.getRightStyling(adType);
        var dict2 = this.hasNonEmptyLink(ad);
        return { ...dict1, ...dict2 };

    }

    formatTextToParams(inputText: string): string {
        var encr = new Encryptor();
        var formattedText = encr.simpleToAscii(inputText);
        return formattedText;
    }

    formatTextFromParams(inputText: string): string {
        var encr = new Encryptor();
        var formattedText = encr.asciiToSimple(inputText);
        return formattedText;
    }

    removeUselessSpaces(input: string): string {
        // Trim leading and trailing spaces, and replace consecutive spaces with a single space
        return input.trim().replace(/\s+/g, ' ');
    }

    removeQueryParamAndReload() {
        const currentUrl = this.router.url;
        const urlTree = this.router.parseUrl(currentUrl);
        const queryParams = { ...urlTree.queryParams };

        // Remove the "nav" query parameter
        delete queryParams['nav'];

        // Navigate to the same route without the "nav" query parameter
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams,
            queryParamsHandling: '', // Remove all existing query parameters
        });
    }

    copyURL() {
        this.clipboard.copy(this.madeUrl);
    }
}
