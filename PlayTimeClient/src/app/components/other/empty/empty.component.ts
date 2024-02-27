import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModel } from 'src/app/models/commonModel';

@Component({
    selector: 'app-empty',
    templateUrl: './empty.component.html',
    styleUrl: './empty.component.scss'
})
export class EmptyComponent {
    lastKeys: any[] = [];

    constructor(
        private router: Router
    ) { }

    goToLink(link: string): void {
        CommonModel.navigateToLink(this.router, link);
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent): void {
        this.lastKeys.push(event.key);
        this.checkCombo();
    }

    click(): void {
        this.lastKeys.push('click');
        this.checkCombo();
    }

    checkCombo(): void {
        if (this.lastKeys.length > 3) {
            this.lastKeys.shift();
        }
        if (this.lastKeys[0] == this.lastKeys[1] && this.lastKeys[1] == this.lastKeys[2]) {
            this.goToLink('home')
        }
    }
}
