import { Component, OnInit } from '@angular/core';
import { MonacoEditorConstructionOptions, MonacoStandaloneCodeEditor } from '@materia-ui/ngx-monaco-editor';
import { ToastQueueService } from 'src/app/services/global/toast-queue.service';

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
    height = 80;
    syntaxHighlightLanguage = 'javascript';
    language = 'javascript';

    constructor(private toastQueueService: ToastQueueService) { }

    sendCodeToRunner() {
        if (this.language == 'javascript') {
            this.runJavaScript();
        }
    }

    runJavaScript() {
        var code = "try {\n" + this.code + "\n} catch (error) {\nthis.toastQueueService.showToast( `${error}`, 'error', 0);\nconsole.error(error);\n}";
        try {
            eval(code);
        } catch (error) {
            console.error(error);
            var errorText = `${error}`;
            this.toastQueueService.showToast(errorText, 'error', 0);
        }
    }

    syntaxHighlightLanguageChanged() {
        this.editorOptions = { ...this.editorOptions, language: this.syntaxHighlightLanguage };
    }

    calculatedHeight(): number {
        return 100 / this.height * window.innerHeight;
    }

    ngOnInit(): void {
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
