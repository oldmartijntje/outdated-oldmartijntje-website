import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-iframe-game-loader',
    templateUrl: './iframe-game-loader.component.html',
    styleUrl: './iframe-game-loader.component.scss'
})
export class IframeGameLoaderComponent {
    @Input() gameUrl: string = '';
    @Input() gameName: string = '';
    @Input() disclaimer: boolean = true;
    // mobile: boolean = this.isMobile();

    public sanitizedUrl: SafeResourceUrl = '';

    constructor(private sanitizer: DomSanitizer) { }

    @ViewChild('gameIframe', { static: false }) gameIframe?: ElementRef = undefined;

    focusIframe() {
        if (this.gameIframe && this.gameIframe.nativeElement) {
            this.gameIframe.nativeElement.focus();
        }
    }

    ngOnInit(): void {
        this.sanitizedUrl = this.getSanitizedUrl(this.gameUrl);
        // this.sanitizedUrl = this.getSanitizedUrl('https://isde-subsidie.nl/chatbot/');
    }

    getSanitizedUrl(url: string): SafeResourceUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    updateUrl(newUrl: string) {
        this.sanitizedUrl = this.getSanitizedUrl(newUrl);
    }

    hidePopup() {
        this.disclaimer = false;
    }

    // isMobile(): boolean {
    //     return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
    // }

    // sendKey(key: string) {
    //     if (this.gameIframe && this.gameIframe.nativeElement) {
    //         const iframeDocument = this.gameIframe.nativeElement.contentDocument;
    //         const eventInitDict: KeyboardEventInit = { key, bubbles: true };

    //         if (iframeDocument) {
    //             const keydownEvent = new KeyboardEvent('keydown', eventInitDict);
    //             const keyupEvent = new KeyboardEvent('keyup', eventInitDict);

    //             iframeDocument.dispatchEvent(keydownEvent);
    //             setTimeout(() => {
    //                 iframeDocument.dispatchEvent(keyupEvent);
    //             }, 1000);
    //         }
    //     }
    // }

}
