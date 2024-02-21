import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { terminalLine, CommandHandler } from 'src/app/models/commandHandler';

@Component({
    selector: 'app-terminal',
    templateUrl: './terminal.component.html',
    styleUrl: './terminal.component.scss'
})
export class TerminalComponent implements OnInit {
    mousePosition = {
        x: 0,
        y: 0
    };

    commandHandler = new CommandHandler();

    history: terminalLine[] = [
        { text: "Welcome to the PlayTime Terminal", type: "output" },
        { text: "Type 'help' for a list of commands", type: "output" }
    ];

    ngOnInit(): void {
        this.commandHandler.setHistory(this.history);
    }

    @ViewChild("terminalInput") terminalInputField: ElementRef | undefined = undefined;
    @ViewChild("terminalContainerDiv") container: ElementRef | undefined = undefined;


    focusInput() {
        if (this.terminalInputField) {
            this.terminalInputField.nativeElement.focus();
        }
    }

    onEnterPress() {
        if (this.terminalInputField && this.container) {
            const value = this.terminalInputField.nativeElement.value;
            this.history.push({ text: value, type: "input" });
            this.terminalInputField.nativeElement.value = "";

            // wait for the DOM to update
            setTimeout(() => {
                this.scrollDown();
            }, 0);
        }
    }

    scrollDown() {
        if (this.container) {
            this.container.nativeElement.scrollTop = this.container.nativeElement.scrollHeight;
        }
    }

    onMouseDown($event: MouseEvent) {
        this.mousePosition.x = $event.screenX;
        this.mousePosition.y = $event.screenY;
    }

    onClick($event: MouseEvent) {
        if (
            Math.abs(this.mousePosition.x - $event.screenX) <= 5 &&
            Math.abs(this.mousePosition.y - $event.screenY) <= 5
        ) {
            this.focusInput();
        } else {
        }
    }
}
