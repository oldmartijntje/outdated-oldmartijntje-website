import { HttpClient, HttpHeaders } from '@angular/common/http';
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
        const body = {
            content: content,
            username: username,
        };

        return this.http.post<any>(`${this.apiUrl}/messages/postMessage.php`, body);
    }

    getMessages(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/messages/getList.php`);
    }
}
