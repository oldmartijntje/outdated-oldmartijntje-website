import { Injectable } from '@angular/core';
import { Toast } from '../models/toast.interface';

@Injectable({
    providedIn: 'root'
})
export class ToastQueueService {
    private queue: Toast[] = [];
    private currentId = 0;
    private messageSeconds = 3;
    private multipleMessagesSecondsModifier = 1;

    getToastQueue(): Toast[] {
        return this.queue;
    }

    /**
 * Enqueue a toast message with optional parameters.
 *
 * @param {string} message - The message to be displayed in the toast.
 * @param {string} [typeOfToast='info'] - The type of toast (e.g., 'info', 'success', 'warning', 'error').
 * @param {number} [timeModifier=0] - An optional time modifier for controlling the display time of the toast. 1 == extra 1 second. 0 == default time. 69420 disables the timeout.
 * @returns {void}
 */
    enqueueToast(message: string, typeOfToast: string = 'info', timeModifier: number = 0): void {
        const toast: Toast = { id: this.currentId++, message, timeoutId: null, type: typeOfToast, timeModifier: timeModifier };
        this.queue.push(toast);

        const baseDuration = this.messageSeconds * 1000; // Base duration for each toast
        const additionalDuration = this.multipleMessagesSecondsModifier * 1000; // Additional duration for every other toast

        let displayDuration = baseDuration;
        if (this.queue.length > 1) {
            const additionalDelay = additionalDuration * (this.queue.length - 1);
            displayDuration += additionalDelay;
        }

        if (timeModifier != 69420) {
            displayDuration += (timeModifier * 1000)
            toast.timeoutId = setTimeout(() => {
                this.dequeueToast(toast);
            }, displayDuration) as any;
        }

    }

    dequeueToast(toast: Toast): void {
        const index = this.queue.findIndex(t => t.id === toast.id);
        if (index !== -1) {
            this.queue.splice(index, 1);
        }
    }

    dequeueToastById(toastId: number): void {
        const index = this.queue.findIndex(toast => toast.id === toastId);
        if (index !== -1) {
            const removedToast = this.queue.splice(index, 1)[0];
            if (removedToast.timeoutId != null) {
                clearTimeout(removedToast.timeoutId);
            }
        }
    }

    showToast(toastMessage: string = 'Default Toast: "Hello World!"', type: string = 'info', timeModifier: number = 0) {
        this.enqueueToast(toastMessage, type, timeModifier);
    }

}
