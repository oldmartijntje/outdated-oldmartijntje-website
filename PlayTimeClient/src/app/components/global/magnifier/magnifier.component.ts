import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
    selector: 'app-magnifier',
    templateUrl: './magnifier.component.html',
    styleUrl: './magnifier.component.scss'
})
export class MagnifierComponent {
    @Input() image: string = '';
    @Input() imageStyling: any = {};
    @Input() scale: number = 2;

    @ViewChild('container') container!: ElementRef;

    isHovered: boolean = false;
    magnifierX: number = 0;
    magnifierY: number = 0;
    magnifierImageX: number = 0;
    magnifierImageY: number = 0;

    constructor() { }

    toggleHover(value: boolean): void {
        this.isHovered = value;
        // this.isHovered = true;
    }

    showMagnifier(event: MouseEvent): void {
        if (this.isHovered) {
            const rect = this.container.nativeElement.getBoundingClientRect();
            const offsetX = event.clientX - rect.left;
            const offsetY = event.clientY - rect.top;
            this.magnifierX = offsetX - 75; // adjust to center the magnifier
            this.magnifierY = offsetY - 75; // adjust to center the magnifier
            this.magnifierImageX = (offsetX * this.scale * -1) + 75;
            this.magnifierImageY = (offsetY * this.scale * -1) + 75;
        }
    }
}
