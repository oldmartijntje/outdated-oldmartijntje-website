import { Component, Input, OnInit } from '@angular/core';
import { application, shortcuts } from 'src/app/data/applications';

@Component({
    selector: 'app-task-manager',
    templateUrl: './task-manager.component.html',
    styleUrls: ['./task-manager.component.scss']
})
export class TaskManagerComponent implements OnInit {
    @Input() application: Record<string, any> = {};
    dictionaryOfShurtcuts: Record<string, any>[] = [];
    selectedProcessId: number = -1;

    ngOnInit(): any {
        this.refreshProcesses()
    }

    getStylingIfTrue(condition: boolean, style: Record<string, string> = { 'background-color': '#99c6fd' }): Record<string, string> {
        if (condition) {
            return style;
        }
        return {};
    }

    refreshProcesses() {
        function getDictOfShurtcutIds(shortcuts: Record<string, any>[]): Record<string, any> {
            let dict: Record<string, any> = {};
            shortcuts.forEach(shortcut => {
                dict[shortcut['Id']] = 0;
            });
            return dict;
        }
        function getShortcutById(id: number): Record<string, any> {
            let shortcut = shortcuts.find(shortcut => shortcut['Id'] == id);
            if (shortcut == undefined) {
                return {};
            }
            return shortcut;
        }
        var dictOfShurtcutIds = getDictOfShurtcutIds(shortcuts);
        application.forEach((process: Record<string, any>) => {
            if (process['ParentId'] != undefined) {
                dictOfShurtcutIds[process['ParentId']]++;
            }
        });
        for (const key in dictOfShurtcutIds) {
            if (dictOfShurtcutIds.hasOwnProperty(key)) {
                const element = dictOfShurtcutIds[key];
                if (element == 0) {
                    delete dictOfShurtcutIds[key];
                }
            }
        }
        var dictOfShurtcuts: Record<string, any>[] = [];
        for (const key in dictOfShurtcutIds) {
            if (dictOfShurtcutIds.hasOwnProperty(key)) {
                const element = dictOfShurtcutIds[key];
                dictOfShurtcuts.push({
                    Id: parseInt(key),
                    Name: getShortcutById(parseInt(key))['Title'],
                    Count: element,
                    Icon: getShortcutById(parseInt(key))['Icon']
                })
            }
        }
        this.dictionaryOfShurtcuts = dictOfShurtcuts;

    }

    selectProcess(processId: number): void {
        this.selectedProcessId = processId;
    }

    deleteProcessesByParentId() {
        let index: number;
        while ((index = application.findIndex(process => process['ParentId'] === this.selectedProcessId)) !== -1) {
            application.splice(index, 1);
        }
        this.selectedProcessId = -1;
        this.refreshProcesses();
    }

    isThisProcessSelected(processId: number): boolean {
        return this.selectedProcessId == processId;
    }

    isActiveTab(tabId: string, application: any): boolean {
        return application['ActiveTabId'] == tabId;
    }

    setActiveTab(tabId: number, application: Record<string, any>): void {
        application["ActiveTabId"] = tabId;
    }

    comparePathToActiveTab(path: string, tab: Record<string, any>): boolean {
        return tab["Mode"].toLocaleLowerCase() == path.toLocaleLowerCase();
    }

    getCurrentTab(application: Record<string, any>): Record<string, any> {
        return application['Tabs'][application['ActiveTabId']]
    }
}
