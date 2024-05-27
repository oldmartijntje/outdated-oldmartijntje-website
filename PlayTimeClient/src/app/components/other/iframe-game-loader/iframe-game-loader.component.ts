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
    mobile: boolean = this.isMobile();

    public sanitizedUrl: SafeResourceUrl = '';

    constructor(private sanitizer: DomSanitizer) { }


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
    @ViewChild('gameIframe', { static: false }) gameIframe?: ElementRef;

    isMobile(): boolean {
        return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
    }

    focusIframe() {
        if (this.gameIframe && this.gameIframe.nativeElement) {
            this.gameIframe.nativeElement.focus();
            this.gameIframe.nativeElement.contentWindow.focus();
        }
    }

    sendKey(key: string) {
        console.log(this.gameIframe);
        if (this.gameIframe && this.gameIframe.nativeElement) {
            this.focusIframe();
            console.log('Sending key: ', key);
            const iframeDocument = this.gameIframe.nativeElement.contentDocument || this.gameIframe.nativeElement.contentWindow.document;

            if (iframeDocument) {
                const eventInitDict: KeyboardEventInit = {
                    key,
                    code: `Key${key.toUpperCase()}`,
                    keyCode: key.toUpperCase().charCodeAt(0),
                    bubbles: true,
                    cancelable: true
                };

                const keydownEvent = new KeyboardEvent('keydown', eventInitDict);
                const keyupEvent = new KeyboardEvent('keyup', eventInitDict);

                const activeElement = iframeDocument.activeElement || iframeDocument.body;

                activeElement.dispatchEvent(keydownEvent);
                setTimeout(() => {
                    activeElement.dispatchEvent(keyupEvent);
                }, 100);
            }
        }
    }

}
