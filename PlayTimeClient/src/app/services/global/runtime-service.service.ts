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
    private problemsSubject: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);
    private pageVariablesSubject: BehaviorSubject<{ [key: string]: any }> = new BehaviorSubject<{ [key: string]: any }>({});

    outputSubjectValue$: Observable<Message[]> = this.outputSubject.asObservable();
    pageVariables$: Observable<{ [key: string]: any }> = this.pageVariablesSubject.asObservable();
    problemsSubjectValue$: Observable<Message[]> = this.problemsSubject.asObservable();
    consoleSubjectValue$: Observable<Message[]> = this.consoleSubject.asObservable();
    setProblems: Message[] = [];
    tempPageVariables: { [key: string]: any } = {};

    emptyProblemsSubject() {
        this.setProblems = [];
    }

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
        currentValue = this.checkForCopyMessage(value, currentValue);
        this.outputSubject.next(currentValue);
        this.checkMaxLines();
    }

    addProblemsSubject(value: Message) {
        var currentValue = this.problemsSubject.getValue();
        this.setProblems = this.checkForCopyMessage(value, this.setProblems);
        this.problemsSubject.next(currentValue);
    }

    flushProblemsSubject() {
        this.problemsSubject.next(this.setProblems);
    }

    addConsoleSubject(value: Message) {
        var currentValue = this.consoleSubject.getValue();
        currentValue = this.checkForCopyMessage(value, currentValue);
        this.consoleSubject.next(currentValue);
        this.checkMaxLines();
    }

    checkForCopyMessage(value: Message, whole: Message[]) {
        const length = whole.length - 1;
        if (whole.length == 0) {
            whole.push(value);
        } else if (whole[length].message == value.message && whole[length].type == value.type && whole[length].from == value.from) {
            if (value.datetimeTimestamp != undefined) {
                whole[length].datetimeTimestamp = value.datetimeTimestamp;
            }
            whole[length].amount++;
        } else {
            whole.push(value);
        }
        return whole;
    }

    checkMaxLines() {
        while (this.consoleSubject.getValue().length > EditorSettings["MaxLines"]["Console"]) {
            this.removeFirstConsoleSubject();
        }
        while (this.outputSubject.getValue().length > EditorSettings["MaxLines"]["Output"]) {
            this.removeFirstOutputSubject();
        }
    }

    setPageVariablesToEmpty() {
        this.pageVariablesSubject.next({});
        this.tempPageVariables = {};
    }

    setPageVariable(key: string, value: any) {
        this.tempPageVariables[key] = value;
    }

    flushPageVariables() {
        this.pageVariablesSubject.next(this.tempPageVariables);
    }

    resetTempPageVariables() {
        this.tempPageVariables = {};
    }

    readPageVariable(key: string) {
        return this.pageVariablesSubject.getValue()[key];
    }

    readPageVariables() {
        return this.pageVariablesSubject.getValue();
    }

    readTempPageVariables() {
        return this.tempPageVariables;
    }



}
