import { Injectable } from '@angular/core';
import { BackendServiceService } from './backend-service.service';

@Injectable({
    providedIn: 'root'
})
export class BackendMiddlemanService {
    pingCall: { [key: string]: any } = {
        "value": undefined,
        "date": undefined
    };
    messagesCall: { [key: string]: any } = {
        "value": undefined,
        "date": undefined
    };
    emojiCall: { [key: string]: any } = {
        "value": undefined,
        "date": undefined
    };
    messagesSinceCall: { [key: string]: any } = {
        "value": undefined,
        "date": undefined
    };

    constructor(
        private backendServiceService: BackendServiceService
    ) { }

    getPingCall(): Promise<boolean> {
        const performPing = () => {
            return this.backendServiceService.ping().toPromise()
                .then(() => {
                    this.pingCall["value"] = true;
                })
                .catch(() => {
                    this.pingCall["value"] = false;
                })
                .finally(() => {
                    this.pingCall["date"] = new Date();
                });
        };

        if (this.pingCall["value"] === undefined || this.isPingOlderThanXMinutes(5, this.pingCall)) {
            return performPing().then(() => Promise.resolve(this.pingCall["value"]));
        } else {
            return Promise.resolve(this.pingCall["value"]);
        }
    }

    isPingOlderThanXMinutes(minutes: number, variable: { [key: string]: any }): boolean {
        const fiveMinutesAgo = new Date();
        fiveMinutesAgo.setSeconds(fiveMinutesAgo.getSeconds() - (60 * minutes));
        return new Date(variable["date"]) < fiveMinutesAgo;
    }

    getMessagesSinceLastCall(force: boolean = false, id: number): Promise<any> {
        const performGetMessages = () => {
            try {
                const messages = this.backendServiceService.getMessagesSinceLastCall(id).toPromise();
                this.messagesSinceCall['value'] = messages; // Assuming messagesSinceCall is a property in your class to store the messages.
                return messages;
            } catch (error) {
                // Handle error if needed
                console.error("Error fetching messages:", error);
                throw error;
            } finally {
                this.messagesSinceCall['date'] = new Date();
            }
        };

        if (this.messagesSinceCall['value'] === undefined || this.isPingOlderThanXMinutes(0.1, this.messagesSinceCall) || force) {
            return performGetMessages().then(() => Promise.resolve(this.messagesSinceCall["value"]))
        } else {
            return this.messagesSinceCall['value'];
        }
    }

    getMessages(): Promise<any> {
        const performGetMessages = () => {
            try {
                const messages = this.backendServiceService.getMessages().toPromise();
                this.messagesCall['value'] = messages; // Assuming messagesCall is a property in your class to store the messages.
                return messages;
            } catch (error) {
                // Handle error if needed
                console.error("Error fetching messages:", error);
                throw error;
            } finally {
                this.messagesCall['date'] = new Date();
            }
        };

        if (this.messagesCall['value'] === undefined || this.isPingOlderThanXMinutes(1, this.messagesCall)) {
            return performGetMessages().then(() => Promise.resolve(this.messagesCall["value"]))
        } else {
            return this.messagesCall['value'];
        }
    }

    getEmoji(): Promise<any> {
        const performGetEmoji = () => {
            try {
                const emoji = this.backendServiceService.getEmoji().toPromise();
                this.emojiCall['value'] = emoji;
                return emoji;
            } catch (error) {
                // Handle error if needed
                console.error("Error fetching emoji:", error);
                throw error;
            }
        };

        if (this.emojiCall['value'] === undefined || this.isPingOlderThanXMinutes(60, this.emojiCall)) {
            return performGetEmoji().then(() => Promise.resolve(this.emojiCall["value"]))
        } else {
            return this.emojiCall['value'];
        }
    }


}
