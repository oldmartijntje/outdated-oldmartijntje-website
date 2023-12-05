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

        if (this.pingCall["value"] === undefined || this.isPingOlderThan5Minutes()) {
            return performPing().then(() => Promise.resolve(this.pingCall["value"]));
        } else {
            return Promise.resolve(this.pingCall["value"]);
        }
    }

    isPingOlderThan5Minutes(): boolean {
        const fiveMinutesAgo = new Date();
        fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);
        return new Date(this.pingCall["date"]) < fiveMinutesAgo;
    }


}
