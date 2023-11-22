import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-task-manager',
    templateUrl: './task-manager.component.html',
    styleUrls: ['./task-manager.component.scss']
})
export class TaskManagerComponent {
    @Input() bookmark: Record<string, any> = {};
}
