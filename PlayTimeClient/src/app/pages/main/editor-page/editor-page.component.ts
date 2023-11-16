import { Component, HostListener, OnInit } from '@angular/core';
import { MonacoEditorConstructionOptions, MonacoStandaloneCodeEditor } from '@materia-ui/ngx-monaco-editor';
import { RuntimeServiceService } from 'src/app/services/global/runtime-service.service';
import { ToastQueueService } from 'src/app/services/global/toast-queue.service';
import { Message, TestMessages } from 'src/app/models/message.interface';
import { DatePipe, NgFor } from '@angular/common';
import { EditorServiceService } from 'src/app/services/global/editor-service.service';
import { MarjinscriptInterperatorServiceService } from 'src/app/services/global/marjinscript-interperator-service.service';
import { PageCode } from 'src/app/data/settings';
import { NavigationEnd, Router } from '@angular/router';
import { defaultPageVariables } from 'src/app/data/pageVariables';
import { ThemePalette } from '@angular/material/core';
import { PackagesByPage, PackageDescriptions, Packages } from 'src/app/data/packages';
import { BuildData } from 'src/app/models/buildData';

export interface Task {
    name: string;
    completed: boolean;
    color: ThemePalette;
    subtasks?: Task[];
}

@Component({
    selector: 'app-editor-page',
    templateUrl: './editor-page.component.html',
    styleUrls: ['./editor-page.component.scss'],
})
export class EditorPageComponent implements OnInit {
    versionNumber = BuildData["BuildNumber"];
    versionWord = "BuildId";

    editorOptions: MonacoEditorConstructionOptions = {
        theme: 'vs-dark',
        language: 'javascript',
        roundedSelection: true,
        autoIndent: 'full',
        automaticLayout: true
    };
    code = "";
    lastCheckedCode = '';
    syntaxHighlightLanguage = 'javascript';
    language = 'MarjinScript';
    consoleSubscription: any;
    outputSubscription: any;
    problemsSubscription: any;
    sandBoxModeSubscription: any;
    consoleList: Message[] = TestMessages;
    outputList: Message[] = TestMessages;
    problemList: Message[] = TestMessages;
    consoleWindowInput = '';
    sandBoxMode = false;
    runDefaultPageButton = false;
    pagePath = "";

    task: Task = {
        name: 'All Modules',
        completed: false,
        color: 'primary',
        subtasks: [
            { name: 'Primary Module', completed: true, color: 'primary' },
            { name: 'RailroadInk Module', completed: false, color: 'accent' },
            { name: 'Applink Module', completed: false, color: 'primary' },
        ],
    };

    @HostListener('window:keydown', ['$event'])
    onKeyPress(event: KeyboardEvent): void {
        // Check if the pressed key is F5
        if (event.key === 'F5' && event.shiftKey) {
            // Add your custom logic here
            // For example, prevent the default behavior to avoid browser refresh
            event.preventDefault();
            this.runDefaultPage();
        } else if (event.key === 'F5') {
            // Add your custom logic here
            // For example, prevent the default behavior to avoid browser refresh
            event.preventDefault();
            this.sendCodeToRunner();
        }
    }

    logBuildData() {
        this.log(BuildData)
    }

    updateAllComplete() {
        this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
    }

    someComplete(): boolean {
        if (this.task.subtasks == null) {
            return false;
        }
        return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
    }

    setAll(completed: boolean) {
        this.allComplete = completed;
        if (this.task.subtasks == null) {
            return;
        }
        this.task.subtasks.forEach(t => (t.completed = completed));
        this.checkCode(true);
    }

    allComplete: boolean = false;

    constructor(private toastQueueService: ToastQueueService,
        private runtimeServiceService: RuntimeServiceService,
        private editorServiceService: EditorServiceService,
        private marjinScriptInterperatorServiceService: MarjinscriptInterperatorServiceService,
        private datePipe: DatePipe,
        private router: Router
    ) { }

    sendCodeToRunner(input: string = '', mode: number = 0, from: string = 'EditorCode') {
        if (this.language == 'javascript') {
            this.runJavaScript(input);
        } else if (this.language == 'MarjinScript' && (this.problemList.length == 0 || mode != 0)) {
            this.runMarjinScript(input, mode, from);
        } else if (this.language == 'MarjinScript') {
            this.toastQueueService.showToast('Code has errors, please fix them first.', 'error', 0);
        }
    }

    runMarjinScript(input: string = '', mode: number = 0, from: string = 'EditorCode') {
        if (input == '') {
            input = this.code;
        }
        if (this.task.subtasks == undefined) {
            this.task.subtasks = [];
        }
        var packages: number[] = [];
        for (let index = 0; index < this.task.subtasks.length; index++) {
            if (this.task.subtasks[index].completed == true) {
                packages.push(index);
            }
        }
        this.marjinScriptInterperatorServiceService.interpretAndExecuteCode(input, mode, packages);
    }

    setLanguage(event: any) {
        this.language = event;
        localStorage.setItem('language', this.language);
    }

    runJavaScript(input: string = '') {
        if (input == '') {
            input = this.code;
        }
        var code = "try {\n" + input + "\n} catch (error) {\nthis.runtimeServiceService.addConsoleSubject({ message: `${error}`, type: 'error', from: 'EditorCode' });\nconsole.error(error);\n}";
        try {
            eval(code);
        } catch (error) {
            console.error(error);
            var errorText = `${error}`;
            this.runtimeServiceService.addConsoleSubject({ message: errorText, type: 'error', from: 'EditorCode', amount: 1 });
            //this.toastQueueService.showToast(errorText, 'error', 0);
        }
    }

    runDefaultPage() {
        this.runtimeServiceService.setPageVariablesToEmpty();
        const pageVar = { ...defaultPageVariables }
        this.runtimeServiceService.setPageVariables(pageVar[this.pagePath]);
        this.runtimeServiceService.flushPageVariables();
    }

    syntaxHighlightLanguageChanged() {
        this.editorOptions = { ...this.editorOptions, language: this.syntaxHighlightLanguage };
    }

    ngOnInit(): void {
        if (localStorage.getItem('language') != null) {
            this.language = localStorage.getItem('language') || 'MarjinScript';
        }
        this.checkCode();
        this.consoleSubscription = this.runtimeServiceService.consoleSubjectValue$.subscribe((value) => {
            this.consoleList = [...value].reverse();
            // this.consoleList = TestMessages;
        });
        this.outputSubscription = this.runtimeServiceService.outputSubjectValue$.subscribe((value) => {
            this.outputList = [...value].reverse();
            // this.outputList = TestMessages;
        });
        this.problemsSubscription = this.runtimeServiceService.problemsSubjectValue$.subscribe((value) => {
            this.problemList = [...value].reverse();
            // this.outputList = TestMessages;
        });
        this.sandBoxModeSubscription = this.editorServiceService.sandboxValue$.subscribe((value) => {
            this.sandBoxMode = value;
            if (value == true) {
                this.language = 'MarjinScript';
            }
        });
        this.router.events.subscribe(event => {
            // This event is triggered when the navigation is complete
            const currentUrl = this.router.url; // Get the full URL
            const currentPathWithoutQueryParams = currentUrl.split('?')[0].substring(1); // Extract the path
            if (currentPathWithoutQueryParams in PageCode) {
                this.code = PageCode[currentPathWithoutQueryParams][this.language];
            }
            this.checkCode();
            if (currentPathWithoutQueryParams in defaultPageVariables) {
                this.runDefaultPageButton = true;
            } else {
                this.runDefaultPageButton = false;
            }
            console.log(currentPathWithoutQueryParams);
            this.pagePath = currentPathWithoutQueryParams;
            if (currentPathWithoutQueryParams in PackagesByPage) {
                if (this.task.subtasks == undefined) {
                    this.task.subtasks = [];
                }
                for (let index = 0; index < this.task.subtasks.length; index++) {
                    if (index in PackagesByPage[currentPathWithoutQueryParams]) {
                        this.task.subtasks[index].name = PackageDescriptions[PackagesByPage[currentPathWithoutQueryParams][index]]["moduleName"];
                        this.task.subtasks[index].completed = true;
                    } else {
                        this.task.subtasks[index].completed = false;
                    }
                }
            } else {

            }
            this.checkCode(true);
            this.runDefaultPage();
        });
    }

    saveCode() {
        localStorage.setItem('code', this.code);
    }

    loadCode() {
        this.code = localStorage.getItem('code') || '';
        this.checkCode();
    }

    onKeyDown(event: KeyboardEvent) {
        if (event.key === 'Enter' && !event.shiftKey) {
            this.runtimeServiceService.addConsoleSubject({ message: this.consoleWindowInput, type: 'info', from: 'Console Input', amount: 1 });
            this.sendCodeToRunner(this.consoleWindowInput, 2, 'Console');
            this.consoleWindowInput = '';
        }
    }

    checkCode(overRule: boolean = false) {
        if (this.language == 'MarjinScript' && (this.lastCheckedCode != this.code || overRule == true)) {
            this.lastCheckedCode = this.code;
            this.runtimeServiceService.emptyProblemsSubject();
            this.sendCodeToRunner(this.code, 1, undefined);
        }
    }

    logCode() {
        var logText = '';
        this.code.split('\n').forEach((line, index) => {
            logText += `${line}\\n`;
        });
        console.log(logText);

    }

    log(value: string | any = "") {
        console.log(value);
        if (typeof value != 'string') {
            value = JSON.stringify(value);
            value = value.replace(/,"/g, ', "').replace(/":"/g, '" : "');
        }
        this.runtimeServiceService.addConsoleSubject({ message: value, type: 'info', from: 'Log', datetimeTimestamp: this.datePipe.transform(Date.now(), 'HH:mm:ss.SSS'), amount: 1 });
    }

    warn(value: string = "") {
        console.warn(value);
        this.runtimeServiceService.addConsoleSubject({ message: value, type: 'warning', from: 'Warn', datetimeTimestamp: this.datePipe.transform(Date.now(), 'HH:mm:ss.SSS'), amount: 1 });
    }

    error(value: string = "") {
        console.error(value);
        this.runtimeServiceService.addConsoleSubject({ message: value, type: 'error', from: 'Error', datetimeTimestamp: this.datePipe.transform(Date.now(), 'HH:mm:ss.SSS'), amount: 1 });
    }

    formatMessage(message: Message, enableTimeAndFrom: boolean = true) {
        if (enableTimeAndFrom == false || (message.datetimeTimestamp == undefined || message.datetimeTimestamp == null || message.datetimeTimestamp == '')) {
            if (enableTimeAndFrom == false || message.from == undefined) {
                return `${message.message}`;
            }
            return `${message.from}: ${message.message}`;
        }
        else if (message.from == undefined) {
            return `${message.datetimeTimestamp} - ${message.message}`;
        }
        return `${message.datetimeTimestamp} - ${message.from}: ${message.message}`;
    }

    editorInit(editor: MonacoStandaloneCodeEditor) {
        // Programatic content selection example
        editor.setSelection({
            startLineNumber: 1,
            startColumn: 1,
            endColumn: 50,
            endLineNumber: 3
        });
    }

}
