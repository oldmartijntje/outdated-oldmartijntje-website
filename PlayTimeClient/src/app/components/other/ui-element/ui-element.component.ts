import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-ui-element',
    templateUrl: './ui-element.component.html',
    styleUrl: './ui-element.component.scss'
})
export class UiElementComponent {
    @Input() disabled: boolean = true;
}
