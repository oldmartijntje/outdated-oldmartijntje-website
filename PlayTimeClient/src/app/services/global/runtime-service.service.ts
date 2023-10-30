import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message } from 'src/app/models/message.interface';
import { EditorSettings } from 'src/app/data/settings';

@Injectable({
    providedIn: 'root'
})
export class RuntimeServiceService {
    private outputSubject: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);
    private consoleSubject: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);

    outputSubjectValue$: Observable<Message[]> = this.outputSubject.asObservable();
    consoleSubjectValue$: Observable<Message[]> = this.consoleSubject.asObservable();

    setOutputSubject(value: Message[]) {
        this.outputSubject.next(value);
        this.checkMaxLines();
    }

    setConsoleSubject(value: Message[]) {
        this.consoleSubject.next(value);
        this.checkMaxLines();
    }

    removeFirstOutputSubject() {
        var value = this.outputSubject.getValue();
        value.shift();
        this.outputSubject.next(value);
    }

    removeFirstConsoleSubject() {
        var value = this.consoleSubject.getValue();
        value.shift();
        this.consoleSubject.next(value);
    }

    addOutputSubject(value: Message) {
        var currentValue = this.outputSubject.getValue();
        currentValue.push(value);
        this.outputSubject.next(currentValue);
        this.checkMaxLines();
    }

    addConsoleSubject(value: Message) {
        var currentValue = this.consoleSubject.getValue();
        currentValue.push(value);
        this.consoleSubject.next(currentValue);
        this.checkMaxLines();
    }

    checkMaxLines() {
        while (this.consoleSubject.getValue().length > EditorSettings["MaxLines"]["Console"]) {
            this.removeFirstConsoleSubject();
        }
        while (this.outputSubject.getValue().length > EditorSettings["MaxLines"]["Output"]) {
            this.removeFirstOutputSubject();
        }
    }



}
