import { Injectable } from '@angular/core';
import { LocalStorageHandler, QueueItem, QueueEditOptions, HandlerRespone } from '../models/localStorageHandler';

@Injectable({
    providedIn: 'root'
})
export class LocalstorageHandlingService {
    private localStorageHandler: LocalStorageHandler = new LocalStorageHandler("appData.oldmartijntje.nl");
    private queue: QueueItem[][] = [[]];
    private active: boolean = false;
    private queueCleanerTimout: any;
    readonly queueCleanerTimeoutTime: number = 15; // in seconds

    constructor() {
        this.tick();
    }

    immediatlyGoThroughQueue(): HandlerRespone {
        if (!this.active) {
            this.goThroughQueue();
            return { success: true, message: 'Queue has been processed' };
        }
        return { success: false, message: 'Queue cleaner is already active' };
    }

    addEditRequestToQueue(data: any, subKey: string, mainKeyOverride: string | undefined = undefined): void {
        this.queue[0].push({
            data: data,
            subKey: subKey,
            mainKeyOverride: mainKeyOverride,
            date: new Date(),
            type: QueueEditOptions.ADD
        });
        if (this.queueCleanerTimout == undefined) {
            this.tick();
        }
    }

    getLocalstorageHandler(): LocalStorageHandler {
        return this.localStorageHandler;
    }

    addDeleteRequestToQueue(subKey: string, mainKeyOverride: string | undefined = undefined): void {
        this.queue[0].push({
            data: null,
            subKey: subKey,
            mainKeyOverride: mainKeyOverride,
            date: new Date(),
            type: QueueEditOptions.REMOVE
        });
        if (this.queueCleanerTimout == undefined) {
            this.tick();
        }
    }

    private tick(): void {
        if (this.queue[0].length > 0) {
            if (!this.active) {
                this.goThroughQueue();
            }
        }
        if (this.queueCleanerTimout != undefined) {
            clearTimeout(this.queueCleanerTimout);
        }
        this.queueCleanerTimout = setTimeout(() => {
            this.tick();
        }, this.queueCleanerTimeoutTime * 1000);
    }

    private goThroughQueue(): void {
        this.active = true;
        this.queue.unshift([])
        const queueCopy = [...this.queue[1]];
        this.queue.pop();
        var queueBasedOnMainKey: { [key: string]: QueueItem[] } = {};
        queueCopy.forEach((item: QueueItem) => {
            if (!queueBasedOnMainKey[item.mainKeyOverride!]) {
                queueBasedOnMainKey[item.mainKeyOverride!] = [];
            }
            queueBasedOnMainKey[item.mainKeyOverride!].push(item);
        });
        for (var key in queueBasedOnMainKey) {
            queueBasedOnMainKey[key] = this.findDuplicateSubkeys(queueBasedOnMainKey[key]);
            if (key == 'undefined') {
                this.localStorageHandler.editSnapshotQueue(queueBasedOnMainKey[key], undefined);
            } else {
                this.localStorageHandler.editSnapshotQueue(queueBasedOnMainKey[key], key);
            }
        }
        this.active = false;
    }

    /**
     * looks through all subkeys. If a subkey has been foiund multiple times, remove the ones that are older than the newest one.
     * @param queue 
     * @returns queue
     */
    private findDuplicateSubkeys(queue: QueueItem[]): QueueItem[] {
        var subkeys: { [key: string]: QueueItem[] } = {};
        queue.forEach((item: QueueItem) => {
            if (!subkeys[item.subKey]) {
                subkeys[item.subKey] = [];
            }
            subkeys[item.subKey].push(item);
        });

        var result: QueueItem[] = [];
        for (const key in subkeys) {
            if (Object.prototype.hasOwnProperty.call(subkeys, key)) {
                const element = subkeys[key];
                if (element.length > 1) {
                    element.sort((a, b) => {
                        return a.date.getTime() - b.date.getTime();
                    });
                    result.push(element[element.length - 1]);
                } else {
                    result.push(element[0]);
                }
            }
        }
        return result;
    }

}
