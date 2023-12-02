import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-error-page',
    templateUrl: './error-page.component.html',
    styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent {
    @Input() ErrorTitle: string = "Unauthorised!";
    @Input() ErrorMessage: string = "You are not permitted to see this page!";
    @Input() ErrorNumber: number | string = 403;

    @Output() customEvent: EventEmitter<any> = new EventEmitter();

    get errorMessageLines(): string[] {
        return this.ErrorMessage.split('\n');
    }

    // Example method that triggers the custom event
    emitCustomEvent() {
        this.customEvent.emit('Custom event emitted!');
    }
}
