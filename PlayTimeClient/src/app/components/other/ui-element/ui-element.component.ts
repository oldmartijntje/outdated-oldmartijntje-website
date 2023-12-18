import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-ui-element',
    templateUrl: './ui-element.component.html',
    styleUrl: './ui-element.component.scss'
})
export class UiElementComponent {
    @Input() widthOfContent: string = '800px';
    @Input() maxWidthOfContent: string = 'none';

    isWideScreen: boolean = window.innerWidth >= 1024;

    constructor() {
        // Listen to window resize events to update the flag
        window.addEventListener('resize', () => {
            this.isWideScreen = window.innerWidth >= 1024;
        });
    }
}
