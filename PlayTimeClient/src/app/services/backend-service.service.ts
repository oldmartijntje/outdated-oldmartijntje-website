import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UUID } from '../models/uuid';

@Injectable({
    providedIn: 'root'
})
export class BackendServiceService {
    apiUrl = environment.apiUrl;
    sessionToken: string = '';

    constructor(private http: HttpClient) {
        var sessionToken = localStorage.getItem('sessionToken');
        if (sessionToken == null) {
            var uuid = UUID.generate();
            localStorage.setItem('sessionToken', uuid);
            this.sessionToken = uuid;
        } else {
            this.sessionToken = sessionToken;
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

    getMessages(): Observable<any> {
        // Convert sessionToken to a URL-safe format if needed
        const safeSessionToken = encodeURIComponent(this.sessionToken);

        return this.http.get<any>(`${this.apiUrl}/messages/message.php?sessionToken=${safeSessionToken}`);
    }

    ping(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/ping/ping.php`);
    }
}
