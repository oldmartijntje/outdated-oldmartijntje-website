import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-ui-element',
    templateUrl: './ui-element.component.html',
    styleUrl: './ui-element.component.scss'
})
export class UiElementComponent implements OnInit {
    @Input() widthOfContent: string = '800px';
    @Input() maxWidthOfContent: string = 'none';

    heightOfContent: string = '100%';
    customWidthOfContent = this.widthOfContent;

    isWideScreen: boolean = window.innerWidth >= 1024;

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
            this.heightOfContent = '90%';
        }
        this.customWidthOfContent = this.isBiggerThanMaxWidth();
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
}
