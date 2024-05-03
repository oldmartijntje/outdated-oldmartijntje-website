import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { terminalLine, CommandHandler } from 'src/app/models/commandHandler';
import { BackendMiddlemanService } from 'src/app/services/backend-middleman.service';
import { BackendServiceService } from 'src/app/services/backend-service.service';
import { LocalstorageHandlingService } from 'src/app/services/localstorage-handling.service';
import { ToastQueueService } from 'src/app/services/toast-queue.service';

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
        private backendServiceService: BackendServiceService,
        private backendMiddlemanService: BackendMiddlemanService,
        private localstorageHandlingService: LocalstorageHandlingService,
        private toastQueue: ToastQueueService
    ) { }

    commandHandler = new CommandHandler(this.backendServiceService, this.backendMiddlemanService, this.localstorageHandlingService);

    history: terminalLine[] = [];

    ngOnInit(): void {
        const handlerResponse = this.localstorageHandlingService.getLocalstorageHandler().loadData("app.terminal.startupCommand");
        if (handlerResponse.success) {
            console.log("Running startup command: " + handlerResponse.data);
            this.runCommand(handlerResponse.data, true, false);
        } else {
            console.log("No startup command found");
            const defaultStartupCommand = "echo \"Welcome to the Terminal\nType 'help' for a list of commands\""
            this.runCommand(defaultStartupCommand, true, false);
        }
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

    runCommand(command: string, silent: boolean = false, manualInput: boolean = false) {
        if (manualInput) {
            const handlerResponse = this.localstorageHandlingService.getLocalstorageHandler().checkAndLoad('easterEggs.chat.terminal')
            if (handlerResponse == null || handlerResponse == false) {
                this.localstorageHandlingService.addEditRequestToQueue(true, 'easterEggs.chat.terminal')
                this.localstorageHandlingService.immediatlyGoThroughQueue();
                this.toastQueue.enqueueToast("You found the \"Hacktor\" Achievement!", 'achievement', 69420)
            }
        }
        this.commandHandler.runCommand(command, silent);
        this.history = this.commandHandler.getHistory();
        this.terminalInputValue = "";
        this.textColor = this.commandHandler.readMemory("color");

        // wait for the DOM to update
        setTimeout(() => {
            this.scrollDown();
        }, 0);
    }

    onEnterPress() {
        if (this.terminalInputField && this.container) {
            this.runCommand(this.terminalInputValue, false, true);
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
