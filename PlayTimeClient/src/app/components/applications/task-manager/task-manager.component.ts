import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-task-manager',
    templateUrl: './task-manager.component.html',
    styleUrls: ['./task-manager.component.scss']
})
export class TaskManagerComponent {
    @Input() bookmark: Record<string, any> = {};



    isActiveTab(tabId: string, bookmark: any): boolean {
        return bookmark['ActiveTabId'] == tabId;
    }

    setActiveTab(tabId: number, bookmark: Record<string, any>): void {
        bookmark["ActiveTabId"] = tabId;
    }

    comparePathToActiveTab(path: string, tab: Record<string, any>): boolean {
        return tab["Mode"].toLocaleLowerCase() == path.toLocaleLowerCase();
    }

    getCurrentTab(bookmark: Record<string, any>): Record<string, any> {
        return bookmark['Tabs'][bookmark['ActiveTabId']]
    }
}
