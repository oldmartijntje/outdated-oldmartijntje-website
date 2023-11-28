import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BackendServiceService {
    apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

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
        return this.http.post(`${this.apiUrl}/messages/message.php`, body, { headers })
    }

    getMessages(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/messages/message.php`);
    }
}
