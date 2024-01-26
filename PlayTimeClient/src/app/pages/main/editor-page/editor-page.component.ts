import { Component, HostListener, OnInit } from '@angular/core';
import { MonacoEditorConstructionOptions, MonacoStandaloneCodeEditor } from '@materia-ui/ngx-monaco-editor';
import { Message } from 'src/app/models/message.interface';
import { DatePipe, NgFor } from '@angular/common';
import { PageCode } from 'src/app/data/settings';
import { NavigationEnd, Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { BuildData } from 'src/app/models/buildData';
import { ToastQueueService } from 'src/app/services/toast-queue.service';
import { RuntimeServiceService } from 'src/app/services/runtime-service.service';

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
    language = 'javascript';
    consoleList: Message[] = [
        { message: 'This featuere is removed', type: 'error', amount: 1},
        { message: 'You can still run js in this though.', type: 'info', amount: 1}
    ];
    outputList: Message[] = [
        { message: 'This featuere is removed', type: 'error', amount: 1},
        { message: 'This is a message to show off how it used to work.', type: 'warning', amount: 3}
    ];
    problemList: Message[] = [
        { message: 'This featuere is removed', type: 'error', amount: 1}
    ];
    consoleWindowInput = '';
    sandBoxMode = false;
    pagePath = "";

    @HostListener('window:keydown', ['$event'])
    onKeyPress(event: KeyboardEvent): void {
        // Check if the pressed key is F5
        if (event.key === 'F5' && event.shiftKey) {
            // Add your custom logic here
            // For example, prevent the default behavior to avoid browser refresh
            event.preventDefault();
        } else if (event.key === 'F5') {
            // Add your custom logic here
            // For example, prevent the default behavior to avoid browser refresh
            event.preventDefault();
            this.sendCodeToRunner();
        }
    }

    allComplete: boolean = false;

    constructor(private toastQueueService: ToastQueueService,
        private runtimeServiceService: RuntimeServiceService,
        private datePipe: DatePipe,
        private router: Router
    ) { }

    sendCodeToRunner(input: string = '', mode: number = 0, from: string = 'EditorCode') {
        if (this.language == 'javascript') {
            this.runJavaScript(input);
        } else if (this.language == 'MarjinScript' && (this.problemList.length == 0 || mode != 0)) {

        } else if (this.language == 'MarjinScript') {
            this.toastQueueService.showToast('Code has errors, please fix them first.', 'error', 0);
        }
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
            //this.toastQueueService.showToast(errorText, 'error', 0);
        }
    }

    syntaxHighlightLanguageChanged() {
        this.editorOptions = { ...this.editorOptions, language: this.syntaxHighlightLanguage };
    }

    ngOnInit(): void {
        if (localStorage.getItem('language') != null) {
            this.language = localStorage.getItem('language') || 'MarjinScript';
        }
        this.checkCode();
        this.router.events.subscribe(event => {
            // This event is triggered when the navigation is complete
            const currentUrl = this.router.url; // Get the full URL
            const currentPathWithoutQueryParams = currentUrl.split('?')[0].substring(1); // Extract the path
            if (currentPathWithoutQueryParams in PageCode) {
                this.code = PageCode[currentPathWithoutQueryParams][this.language];
            }
            this.checkCode();
            console.log(currentPathWithoutQueryParams);
            this.pagePath = currentPathWithoutQueryParams;
            this.checkCode(true);
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
            this.sendCodeToRunner(this.consoleWindowInput, 2, 'Console');
            this.consoleWindowInput = '';
        }
    }

    checkCode(overRule: boolean = false) {
        if (this.language == 'MarjinScript' && (this.lastCheckedCode != this.code || overRule == true)) {
            this.lastCheckedCode = this.code;
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

    routerNav(routeSegments: string[]): void {
        // Navigate to the specified route
        this.router.navigate(routeSegments);
    }

}
