import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-ui-element',
    templateUrl: './ui-element.component.html',
    styleUrl: './ui-element.component.scss'
})
export class UiElementComponent implements OnInit {
    @Input() widthOfContent: string = '800px';
    @Input() maxWidthOfContent: string = 'none';
    @Input() capAtVH: boolean = true;
    @Input() overflowY: string = 'hidden';

    gameTheory: { [key: string]: any } = {
        clickedOrder: [],
        class: { '1': '', '2': '', '3': '', '4': '' },
        secretClickOrder: ['1', '2', '3', '4', 'middle'],
        found: false,
        convertor: { '1': 'game', '2': 'film', '3': 'food', '4': 'style', 'middle': 'middle' }
    }

    heightOfContent: string = '100%';
    customWidthOfContent = this.widthOfContent;

    isWideScreen: boolean = window.innerWidth >= 1024;

    constructor(
        private router: Router,
    ) { }

    ngOnInit() {
        this.customWidthOfContent = this.isBiggerThanMaxWidth();
        this.onResize(null);
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: Event | null) {
        this.isWideScreen = window.innerWidth >= 1024;
        if (this.isWideScreen) {
            this.heightOfContent = '100%';
        } else {
            this.heightOfContent = '90svh';
        }
        this.customWidthOfContent = this.isBiggerThanMaxWidth();
    }

    returnHeightClass(mode: number = 0): string {
        if (this.capAtVH && mode === 0) {
            return 'height-cap-vh';
        } else if (this.capAtVH && mode === 0) {
            return 'height-cap-percent';
        } else {
            return 'height-cap-none';
        }
    }

    isBiggerThanMaxWidth(): string {
        if (parseInt(this.maxWidthOfContent.split('px')[0]) > window.innerWidth) {
            return window.innerWidth + 'px';
        } else {
            return this.widthOfContent;
        }
    }

    goToWebPage(url: string, openInNewTab: boolean = false): void {
        if (openInNewTab) {
            window.open(url, '_blank');
        } else {
            window.location.href = url;
        }
    }

    gameTheoryClicked(id: string): void {
        if (this.gameTheory['found']) {
            this.gameTheory['found'] = false;
            var page = this.gameTheory['convertor'][id];
            if (page == 'middle') {
                page = this.gameTheory['convertor'][`${Math.floor(Math.random() * 4) + 1}`];
            }
            this.router.navigate(['/simonGame', page]);
        }
        this.gameTheory['clickedOrder'].push(id);
        if (this.gameTheory['clickedOrder'].length > 5) {
            this.gameTheory['clickedOrder'].shift();
        }
        for (let key in this.gameTheory['class']) {
            if (key !== id) {
                this.gameTheory['class'][key] = '';
            }
        }
        if (id != 'middle') {
            this.gameTheory['class'][id] = 'locked';
        } else if (JSON.stringify(this.gameTheory['clickedOrder']) === JSON.stringify(this.gameTheory['secretClickOrder'])) {
            for (let key in this.gameTheory['class']) {
                if (key !== id) {
                    this.gameTheory['class'][key] = 'locked';
                }
            }
            this.gameTheory['found'] = true;
        }
    }
}
