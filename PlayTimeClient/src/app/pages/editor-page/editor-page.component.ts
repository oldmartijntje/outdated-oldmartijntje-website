import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-editor-page',
    templateUrl: './editor-page.component.html',
    styleUrls: ['./editor-page.component.scss']
})
export class EditorPageComponent implements OnInit {
    code: string = ''; // Code content
    codeLines: string[] = ['']; // Array to hold lines

    ngOnInit(): void {
        this.updateCodeLines()
    }

    // Update codeLines array when code content changes
    updateCodeLines() {
        this.codeLines = this.code.split('\n');

    }
}
