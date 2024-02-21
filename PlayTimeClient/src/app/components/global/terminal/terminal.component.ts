import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { terminalLine, CommandHandler } from 'src/app/models/commandHandler';
import { BackendServiceService } from 'src/app/services/backend-service.service';

@Component({
    selector: 'app-terminal',
    templateUrl: './terminal.component.html',
    styleUrl: './terminal.component.scss'
})
export class TerminalComponent implements OnInit {
    private clickTimeout: any;
    mousePosition = {
        x: 0,
        y: 0
    };

    textColor: string = "#ffffff";

    terminalInputValue = "";

    constructor(
        public backendServiceService: BackendServiceService
    ) { }

    commandHandler = new CommandHandler(this.backendServiceService);

    history: terminalLine[] = [
        { text: "Welcome to the Terminal", type: "output" },
        { text: "Type 'help' for a list of commands", type: "output" }
    ];

    ngOnInit(): void {
        this.commandHandler.setHistory(this.history);
        // this.commandHandler.runCommand("help");
        // this.history = this.commandHandler.getHistory();
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
            this.commandHandler.runCommand(this.terminalInputValue);
            this.history = this.commandHandler.getHistory();
            this.terminalInputValue = "";
            this.textColor = this.commandHandler.readMemory("color");

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





    onClick($event: MouseEvent): void {
        // Clear any existing timeout to handle double click
        clearTimeout(this.clickTimeout);

        // Set a timeout to handle single click after a short delay
        this.clickTimeout = setTimeout(() => {
            if (
                Math.abs(this.mousePosition.x - $event.screenX) <= 5 &&
                Math.abs(this.mousePosition.y - $event.screenY) <= 5
            ) {
                this.focusInput();
            }
        }, 200);
    }

    onDoubleClick(event: MouseEvent): void {
        // Clear the timeout to prevent the single click logic from executing
        clearTimeout(this.clickTimeout);

        // Your double click logic here
        console.log('Double click');
    }
}
