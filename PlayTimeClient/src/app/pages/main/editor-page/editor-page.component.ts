import { Component, OnInit } from '@angular/core';
import { MonacoEditorConstructionOptions, MonacoStandaloneCodeEditor } from '@materia-ui/ngx-monaco-editor';
import { RuntimeServiceService } from 'src/app/services/global/runtime-service.service';
import { ToastQueueService } from 'src/app/services/global/toast-queue.service';
import { Message, TestMessages } from 'src/app/models/message.interface';
import { DatePipe } from '@angular/common';
import { EditorServiceService } from 'src/app/services/global/editor-service.service';
import { MarjinscriptInterperatorServiceService } from 'src/app/services/global/marjinscript-interperator-service.service';
import { PageCode } from 'src/app/data/settings';
import { NavigationEnd, Router } from '@angular/router';

@Component({
    selector: 'app-editor-page',
    templateUrl: './editor-page.component.html',
    styleUrls: ['./editor-page.component.scss']
})
export class EditorPageComponent implements OnInit {
    editorOptions: MonacoEditorConstructionOptions = {
        theme: 'vs-dark',
        language: 'javascript',
        roundedSelection: true,
        autoIndent: 'full',
        automaticLayout: true
    };
    code = "for(5){\n    print('henk', 'loop1')\n}\nprint('henk', 'noloop1')\nprint('henk', 'noloop2')\nfor(3) {\n    print('ss', 'loop2')\n    setValues(1, 2, 3, 4)\n    for(3) {\n        print('ss', 'loop2 subloop')\n        setValues(1, 2, 3, 4)\n    }\n}\n'123abc'\n6\n//cheeseI\nnoCommand(1)\n"
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
        this.marjinScriptInterperatorServiceService.interpretAndExecuteCode(input, mode);
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
            console.log("aaaaa")
            this.runtimeServiceService.addConsoleSubject({ message: errorText, type: 'error', from: 'EditorCode', amount: 1 });
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

    checkCode() {
        if (this.language == 'MarjinScript' && this.lastCheckedCode != this.code) {
            this.lastCheckedCode = this.code;
            this.runtimeServiceService.emptyProblemsSubject();
            this.sendCodeToRunner(this.code, 1);
        }
    }

    logCode() {
        var logText = '';
        this.code.split('\n').forEach((line, index) => {
            logText += `${line}\\n`;
        });
        console.log(logText);

    }

    log(value: string = "") {
        console.log(value);
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
