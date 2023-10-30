import { Component, OnInit } from '@angular/core';
import { MonacoEditorConstructionOptions, MonacoStandaloneCodeEditor } from '@materia-ui/ngx-monaco-editor';
import { RuntimeServiceService } from 'src/app/services/global/runtime-service.service';
import { ToastQueueService } from 'src/app/services/global/toast-queue.service';
import { Message, TestMessages } from 'src/app/models/message.interface';

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
    code = 'function x() {\nconsole.log("Hello world!");\n}'
    syntaxHighlightLanguage = 'javascript';
    language = 'javascript';
    consoleSubscription: any;
    outputSubscription: any;
    consoleList: Message[] = TestMessages;
    outputList: Message[] = TestMessages;

    constructor(private toastQueueService: ToastQueueService,
        private runtimeServiceService: RuntimeServiceService) { }

    sendCodeToRunner() {
        if (this.language == 'javascript') {
            this.runJavaScript();
        }
    }

    runJavaScript() {
        var code = "try {\n" + this.code + "\n} catch (error) {\nthis.runtimeServiceService.addConsoleSubject({ message: `${error}`, type: 'error', from: 'EditorCode' });\nconsole.error(error);\n}";
        try {
            eval(code);
        } catch (error) {
            console.error(error);
            var errorText = `${error}`;
            console.log("aaaaa")
            this.runtimeServiceService.addConsoleSubject({ message: errorText, type: 'error', from: 'EditorCode' });
            //this.toastQueueService.showToast(errorText, 'error', 0);
        }
    }

    syntaxHighlightLanguageChanged() {
        this.editorOptions = { ...this.editorOptions, language: this.syntaxHighlightLanguage };
    }

    ngOnInit(): void {
        this.consoleSubscription = this.runtimeServiceService.consoleSubjectValue$.subscribe((value) => {
            this.consoleList = value;
            this.consoleList = TestMessages;
        });
        this.outputSubscription = this.runtimeServiceService.outputSubjectValue$.subscribe((value) => {
            this.outputList = value;
            this.outputList = TestMessages;
        });
    }

    log() {
        var logText = '';
        this.code.split('\n').forEach((line, index) => {
            logText += `${line}\\n`;
        });
        console.log(logText);

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
