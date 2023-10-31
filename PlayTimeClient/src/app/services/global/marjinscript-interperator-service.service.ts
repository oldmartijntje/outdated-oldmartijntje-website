import { Injectable } from '@angular/core';
import { RuntimeServiceService } from './runtime-service.service';
import { DatePipe } from '@angular/common';
import { Message } from 'src/app/models/message.interface';

@Injectable({
    providedIn: 'root'
})
export class MarjinscriptInterperatorServiceService {
    functions: Record<string, (args: any[], mode: number, line: number) => void> = {
        print: (args, mode, line) => {
            this.sendLogToConsole('Printing: ' + args.join(', '), mode);
        },
        setValues: (args, mode, line) => {
            this.sendLogToConsole('Setting values: ' + args.join(', '), mode);
        },
        // Add more functions for other commands as needed.
    };

    constructor(
        private runtimeServiceService: RuntimeServiceService,
        private datePipe: DatePipe
    ) { }

    trimSpaces(inputString: string): string {
        return inputString.replace(/\s/g, '');
    }

    sendToConsole(text: string, type: string = "info", mode: number = 0, from: string = 'Interperator'): void {
        // mode 0 is normal mode, OUTPUT window
        // mode 1 is check mode and return errors, PROBLEMS window
        // mode 2 is console mode, CONSOLE window
        var message: Message = {
            message: text,
            type: type,
            from: from,
            amount: 1,
            datetimeTimestamp: this.datePipe.transform(Date.now(), 'HH:mm:ss.SSS')
        }
        if (mode == 0) {
            this.runtimeServiceService.addOutputSubject(message);
        } else if (mode == 1) {
            this.runtimeServiceService.addProblemsSubject(message);
        } else {
            this.runtimeServiceService.addConsoleSubject(message);
        }
    }

    sendErrorToConsole(text: string, mode: number = 0, from: string = 'Interperator'): void {
        if (mode != 1) {
            console.error(text);
        }
        this.sendToConsole(text, 'error', mode, from);
    }

    sendLogToConsole(text: string, mode: number = 0, from: string = 'Interperator'): void {
        console.log(text);
        this.sendToConsole(text, 'info', mode, from);

    }

    sendWarnToConsole(text: string, mode: number = 0, from: string = 'Interperator'): void {
        console.warn(text);
        this.sendToConsole(text, 'warning', mode, from);

    }

    runFunction(command: string, args: any[], line: number, mode: number = 0): void {

        const commandFunction = this.functions[command];

        if (typeof commandFunction === 'function') {
            commandFunction(args, mode, line);
        } else {
            this.sendErrorToConsole("Line " + line + ": Command not found: " + command, mode);
        }
    }

    checkFunction(command: string, line: number, mode: number = 0): void {

        const commandFunction = this.functions[command];

        if (typeof commandFunction === 'function') {
            // Do nothing
        } else {
            this.sendErrorToConsole("Line " + line + ": Command not found: " + command, mode);
        }
    }

    interpretAndExecuteCode(code: string, mode: number = 0): void {
        // mode 0 is normal mode
        // mode 1 is check mode and return errors
        const commandList = code.split('\n');
        const commandsToExecute: { command: string; arguments: any[], line: number }[] = [];
        var indentLevel = 0;
        var commandLine = []
        for (var i = 0; i < commandList.length + 1; i++) {
            commandLine.push(i);
        }
        const loopStack: { iterations: number; commands: string[]; indentLevel: number }[] = [];

        while (commandList.length > 0) {
            commandLine.shift();
            var command = commandList.shift();
            if (command == null) {
                continue;
            }
            const trimmedCommand = command.trim().replace(/^\s+|\s+$/g, '');

            if (trimmedCommand.startsWith("for(") && this.trimSpaces(trimmedCommand).endsWith("){")) {
                indentLevel++;
                var amount = trimmedCommand.match(/\d+/);
                if (amount == null) {
                    this.sendErrorToConsole("Line " + commandLine[0] + ": Invalid for loop format: '" + trimmedCommand + "'", mode);
                    return;
                }
                const iterations = parseInt(amount[0], 10);
                loopStack.push({ iterations, commands: [], indentLevel });
            } else if (trimmedCommand.includes("}")) {

                const indexToRemove = loopStack.findIndex(loop => loop.indentLevel === indentLevel);
                // Check if an item with matching iterations was found
                if (indexToRemove !== -1) {
                    indentLevel--;
                    // Remove the item at the found index
                    const loop = loopStack[indexToRemove];
                    loopStack.splice(indexToRemove, 1);
                    for (let i = 0; i < loop.iterations; i++) {
                        for (const loopCommand of [...loop.commands].reverse()) {
                            if (indentLevel > 1) {
                                const indexToAddTo = loopStack.findIndex(loop => loop.indentLevel === indentLevel);
                                if (indexToAddTo !== -1) {
                                    loopStack[indexToAddTo].commands.unshift(loopCommand);
                                }
                            } else {
                                commandList.unshift(loopCommand);
                                commandLine.unshift(commandLine[0])
                            }
                        }
                    }
                } else {
                    this.sendErrorToConsole("Line " + commandLine[0] + ": Unmatched '}' in code.", mode);
                }
            } else if (indentLevel > 0 && mode != 1) {
                // Add the command to the current loop.
                const index = loopStack.findIndex(loop => loop.indentLevel === indentLevel);
                if (index !== -1) {
                    loopStack[index].commands.push(trimmedCommand);
                }
            } else if (trimmedCommand == "" || trimmedCommand.startsWith("//")) {
                // Ignore empty lines.
                // Ignore comments.
            } else {
                // Execute individual commands.
                const pattern = /^([a-zA-Z]+)\(([^]*)\)$/; // Matches "command(value1, value2, ...)"
                const match = trimmedCommand.match(pattern);

                if (match) {
                    const commandName = match[1];
                    let valuesString = match[2];

                    valuesString = valuesString.replace(/\s+(?=(?:(?:[^"]*"){2})*[^"]*$)/g, '');

                    const values = valuesString.split(',').map(value => {
                        if (value.startsWith("'") && value.endsWith("'")) {
                            return value.slice(1, -1);
                        } else if (value.startsWith('"') && value.endsWith('"')) {
                            return value.slice(1, -1);
                        }
                        return value;
                    });

                    const numericValues = values.map(value => {
                        const parsedValue = parseFloat(value);
                        if (!isNaN(parsedValue)) {
                            return parsedValue;
                        }
                        return value;
                    });
                    commandsToExecute.push({ command: commandName as string, arguments: numericValues, line: commandLine[0] });
                } else {
                    this.sendErrorToConsole("Line " + commandLine[0] + ": Invalid command format: '" + trimmedCommand + "'", mode);
                }
            }
        }

        if (loopStack.length > 0) {
            this.sendErrorToConsole("Line " + commandLine[0] + ": Unmatched 'for' loop in code.", mode);
        }

        // Execute the commands.
        if (mode == 1) {
            this.runtimeServiceService.flushProblemsSubject();
            for (const cmd of commandsToExecute) {
                this.checkFunction(cmd.command, cmd.line, mode);
            }
            return;
        }
        for (const cmd of commandsToExecute) {
            this.runFunction(cmd.command, cmd.arguments, cmd.line, mode);
        }
    }
}
