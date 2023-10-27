import { Component, OnInit } from '@angular/core';
import { MonacoEditorConstructionOptions, MonacoStandaloneCodeEditor } from '@materia-ui/ngx-monaco-editor';

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
    code = 'function x() { }\nvar aa = 12;\nfunction hwnn() {\nconsole.log("aaaa")\n}\n<a></a>\n<h1></h1>\nhenk = "sss"\nprint(f"{henk}")\na = input()\n\nfor x in range(2):\n    pass\n    # owo\n    // owo\n\n<?php\n// The next line contains a syntax error:\nif () {\n	return "The parser recovers from this type of syntax error";\n}\n?>\n\n#codeContent {\n    flex-grow: 1;\n    padding: 10px;\n}\n'
    height = 80;
    language = 'javascript';

    dragEndHorizontal({ sizes }: any) {
        console.log(sizes);
    }

    languageChanged() {
        this.editorOptions = { ...this.editorOptions, language: this.language };
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

    getCode() {
        return (
            // tslint:disable-next-line: max-line-length
            '<html><!-- // !!! Tokens can be inspected using F1 > Developer: Inspect Tokens !!! -->\n<head>\n	<!-- HTML comment -->\n	<style type="text/css">\n		/* CSS comment */\n	</style>\n	<script type="javascript">\n		// JavaScript comment\n	</' +
            'script>\n</head>\n<body></body>\n</html>'
        );
    }
}
