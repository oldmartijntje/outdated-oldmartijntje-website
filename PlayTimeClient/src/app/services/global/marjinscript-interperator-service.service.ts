import { Injectable } from '@angular/core';
import { RuntimeServiceService } from './runtime-service.service';
import { DatePipe } from '@angular/common';
import { Message } from 'src/app/models/message.interface';
import { Packages } from 'src/app/data/packages';

@Injectable({
    providedIn: 'root'
})
export class MarjinscriptInterperatorServiceService {
    variables: { [key: string]: string | number } = {}

    constructor(
        private runtimeServiceService: RuntimeServiceService,
        private datePipe: DatePipe
    ) { }

    trimSpaces(inputString: string): string {
        return inputString.replace(/\s/g, '');
    }

    processList(arr: any[], line: number | undefined = undefined, mode: number = 0) {
        const processedArr = [];
        for (let item of arr) {
            if (typeof item === 'string') {
                // Check if the string has quotes and remove them
                if (item.startsWith('"') && item.endsWith('"')) {
                    processedArr.push(item.slice(1, -1));
                } else if (item.startsWith('\'') && item.endsWith('\'')) {
                    processedArr.push(item.slice(1, -1));
                } else if (item.startsWith('`') && item.endsWith('`')) {
                    processedArr.push(item.slice(1, -1));
                } else {
                    if (this.variables[item] != undefined) {
                        var variableRetrieved = this.processVariable(item);
                        processedArr.push(variableRetrieved);
                    } else {
                        this.sendErrorToConsole("Line " + line + ": Variable not found: " + item, mode);
                        processedArr.push(undefined);
                    }
                }
            } else if (!isNaN(item)) {
                // If it's a number or a string that can be converted to a number, convert it
                processedArr.push(Number(item));
            } else {
                // For other data types, add to the processed array as is
                processedArr.push(item);
            }
        }
        return processedArr;
    }

    processVariable(code: string): number | string {
        var variable = this.variables[code];
        if (typeof variable === 'string' && !isNaN(Number(variable))) {
            // If the variable is a numeric string, convert it to a number
            return Number(variable);
        } else if (typeof variable === 'string') {
            // Check if the string has quotes and remove them
            if (
                (variable.startsWith('"') && variable.endsWith('"')) ||
                (variable.startsWith("'") && variable.endsWith("'")) ||
                (variable.startsWith('`') && variable.endsWith('`'))
            ) {
                return variable.slice(1, -1) as string;
            } else {
                // If the string doesn't have quotes, attempt to retrieve another variable
                return this.processVariable(variable);
            }
        } else {
            // If it's already a number, return it as is
            return variable as number;
        }
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

    runFunction(command: string | string[], args: any[], line: number, mode: number = 0, packageDict: Record<string, any> | null = {}): void {
        if (packageDict == null) {
            this.sendErrorToConsole("Line " + line + ": There are no code modules selected.", mode);
            return;
        }
        if (Array.isArray(command)) {
            this.variables[command[0]] = command[1];
            return;
        }
        const commandFunction = packageDict[command];

        if (typeof commandFunction === 'function') {
            commandFunction(this.processList(args, line, mode), mode, line);
        } else {
            this.sendErrorToConsole("Line " + line + ": Command not found: " + command, mode);
        }
    }

    checkFunction(command: string | string[], line: number, mode: number = 0, packageDict: Record<string, any> | null = {}): void {
        if (packageDict == null) {
            this.sendErrorToConsole("Line " + line + ": There are no code modules selected.", mode);
            return;
        }
        if (Array.isArray(command)) {
            this.variables[command[0]] = command[1];
            return;
        }
        const commandFunction = packageDict[command];

        if (typeof commandFunction === 'function') {
            // Do nothing
        } else {
            this.sendErrorToConsole("Line " + line + ": Command not found: " + command, mode);
        }
    }

    interpretAndExecuteCode(code: string, mode: number = 0, packages: number[] = [0]): void {
        // mode 0 is normal mode
        // mode 1 is check mode and return errors
        const commandList = code.split('\n');
        this.variables = {};
        const commandsToExecute: { command: string | string[]; arguments: any[], line: number }[] = [];
        var indentLevel = 0;
        var commandLine: number[] = []
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
                const pattern = /\(([^"'()]*)\)/;
                const match = trimmedCommand.match(pattern);
                if (amount != null) {
                    const iterations = parseInt(amount[0], 10);
                    loopStack.push({ iterations, commands: [], indentLevel });
                } else if (match && this.trimSpaces(match[1]) != "") {
                    const capturedText = match[1];
                    if (this.variables[capturedText] != undefined) {
                        const iterations = parseInt(this.variables[capturedText].toString(), 10);
                        loopStack.push({ iterations, commands: [], indentLevel });
                    } else {
                        this.sendErrorToConsole("Line " + commandLine[0] + ": Variable not found: " + capturedText, mode);
                    }
                } else {
                    this.sendErrorToConsole("Line " + commandLine[0] + ": Invalid for loop format: '" + trimmedCommand + "'", mode);
                }
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
                const variableMatch = trimmedCommand.match(/^(.*) = (.*)$/);

                if (match) {
                    const commandName = match[1];
                    let valuesString = match[2];

                    valuesString = valuesString.replace(/\s+(?=(?:(?:[^"]*"){2})*[^"]*$)/g, '');

                    const values = valuesString.split(',').map(value => {
                        if (value.startsWith("'") && value.endsWith("'")) {
                            // String with single quotes, keep as-is
                            return value;
                        } else if (value.startsWith('"') && value.endsWith('"')) {
                            // String with double quotes, keep as-is
                            return value;
                        } else {
                            const numericValue = Number(value);
                            if (!isNaN(numericValue)) {
                                // It's a valid number, convert to a number
                                return numericValue;
                            } else {
                                if (this.variables[value] != undefined) {
                                    return value;
                                } else {
                                    console.log("Variable '" + value + "' is not defined.", commandLine[0])
                                    this.sendErrorToConsole("Line " + commandLine[0] + ": Variable '" + value + "' is not defined.", mode);
                                    return undefined;
                                }
                            }
                        }
                    });
                    commandsToExecute.push({ command: commandName as string, arguments: values, line: commandLine[0] });
                } else if (variableMatch) {
                    const variableName = variableMatch[1].trim();
                    const value = variableMatch[2].trim();

                    // Store the variable in the variables object
                    if (this.isVariableName(value)) {
                        if (this.variables.hasOwnProperty(value)) {
                            commandsToExecute.push({ command: [variableName, value], arguments: [], line: commandLine[0] });
                            this.variables[variableName] = value;
                        } else {
                            console.log("Variable '" + value + "' is not defined.", commandLine[0])
                            this.sendErrorToConsole("Line " + commandLine[0] + ": Variable '" + value + "' is not defined.", mode);
                        }
                    } else {
                        commandsToExecute.push({ command: [variableName, value], arguments: [], line: commandLine[0] });
                        this.variables[variableName] = value;
                    }
                    this.processVariable(value);
                } else {
                    this.sendErrorToConsole("Line " + commandLine[0] + ": Invalid command format: '" + trimmedCommand + "'", mode);
                }
            }
        }

        if (loopStack.length > 0) {
            this.sendErrorToConsole("Line " + commandLine[0] + ": Unmatched 'for' loop in code.", mode);
        }

        // Execute the commands.
        var dict = new Packages(this).mergeDicts(packages);
        if (mode == 1) {
            this.runtimeServiceService.flushProblemsSubject();
            for (const cmd of commandsToExecute) {
                this.checkFunction(cmd.command, cmd.line, mode, dict);
            }
            return;
        }
        for (const cmd of commandsToExecute) {
            this.runFunction(cmd.command, cmd.arguments, cmd.line, mode, dict);
        }
    }

    isVariableName(str: string) {
        // Regular expression to match valid variable names
        const variableNameRegex = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
        return variableNameRegex.test(str);
    }
}
