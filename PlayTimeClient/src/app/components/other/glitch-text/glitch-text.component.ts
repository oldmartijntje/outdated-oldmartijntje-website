import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-glitch-text',
    templateUrl: './glitch-text.component.html',
    styleUrl: './glitch-text.component.scss'
})
export class GlitchTextComponent {
    @Input() text: string = "";
    @Input() href: string = "";
    @Input() styling: { [key: string]: string | number } = {};
    @Input() textStyling: { [key: string]: string | number } = {};
    @Input() locationStyling: { [key: string]: string | number } = {};

    firstChildStyling(): { [key: string]: string | number } {
        return {
            ...this.textStyling,
            ...this.locationStyling
        }
    }

    onclick() {
        if (this.href != "") {
            window.open(this.href, "_blank");
        }
    }
}
