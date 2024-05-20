import { Component, Input } from '@angular/core';
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

    public sanitizedUrl: SafeResourceUrl = '';

    constructor(private sanitizer: DomSanitizer) { }

    ngOnInit(): void {
        this.sanitizedUrl = this.getSanitizedUrl(this.gameUrl);
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


}
