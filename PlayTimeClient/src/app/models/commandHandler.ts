import { commandFunctions } from '../data/terminalCommands';

export interface terminalLine {
    text: string;
    type: "input" | "output";
}

export interface command {
    identifier: string;
    arguments: { [key: string]: string };
    argumentOrder: string[];
}

export interface pureCommand {
    identifier: string;
    arguments: { [key: string]: any };
}

export function deepcopy(obj: any): any {
    return JSON.parse(JSON.stringify(obj));
}


export class CommandHandler {
    private history: terminalLine[] = [];
    private memory: { [key: string]: any } = {};

    constructor() {
        this.writeMemory("color", '#ffffff');
    }

    private runFunction(command: command): void {
        var pureCommand = this.alignArguments(command);
        const commandFunction = commandFunctions[command.identifier].functionToExecute;
        if (commandFunction) {
            commandFunction(pureCommand, this);
        } else {
            console.error(`Unknown command: ${pureCommand}`);
            this.history.push({ text: "'" + pureCommand.identifier + "' is not recognized as a command.", type: "output" });
        }
    }

    private alignArguments(command: command): pureCommand {
        var newArguments: { [key: string]: string | boolean } = {};
        var args = deepcopy(commandFunctions[command.identifier].arguments);
        for (let i = 0; i < args.length; i++) {
            var arg = args[i];
            if (command.argumentOrder.includes(arg.name)) {
                args.splice(i, 1);
                i--;
                var x = command.argumentOrder.indexOf(arg.name);
                command.argumentOrder.splice(x, 1);
                newArguments[arg.name] = command.arguments[arg.name];
            }
        }
        for (let i = 0; i < args.length; i++) {
            var arg = args[i];
            if (command.argumentOrder.length > 0) {
                var key = command.argumentOrder[0];
                newArguments[arg.name] = command.arguments[key];
                command.argumentOrder.shift();
            } else {
                newArguments[arg.name] = arg.defaultValue;
            }
        }
        console.log(newArguments, command);
        return { identifier: command.identifier, arguments: newArguments };
    }

    readMemory(key: string): any {
        return this.memory[key];
    }

    writeMemory(key: string, value: any): void {
        this.memory[key] = value;
    }

    isThisInMemory(key: string): boolean {
        return this.memory.hasOwnProperty(key);
    }

    setHistory(history: terminalLine[]) {
        this.history = history;
    }

    appendHistory(history: terminalLine) {
        this.history.push(history);
    }

    getHistory() {
        return this.history;
    }

    private combineStrings(arr: string[]): string[] {
        const result: string[] = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].endsWith(' ')) {
                arr[i] = arr[i].slice(0, -1); // Remove the trailing space
            }
            // Check if the current string ends with '=' and the next one starts with '"'
            if (arr[i].endsWith('=') && i + 1 < arr.length && arr[i + 1].startsWith('"')) {
                // Combine the two strings and add to the result
                result.push(arr[i] + arr[i + 1].slice(1)); // Slice to exclude the double quote from the next string
                i++; // Skip the next string since it's already combined
            } else {
                // If no combination is needed, simply add the current string to the result
                result.push(arr[i]);
            }
        }

        return result;
    }

    private splitCommand(commandToSplit: string): command[] {
        var commandList: command[] = []
        var commands = commandToSplit.split(';');
        commands.forEach(command => {
            if (command.startsWith(' ')) {
                command = command.slice(1);
            }
            const argRegex = /\s*(?:"([^"]*)"|([^"\s]+))\s*/g;
            // Extracting the identifier from the command
            const identifier = command.split(" ")[0];
            // Extracting the arguments from the command using regex
            var argsArray: string[] = command.match(argRegex) || [];
            argsArray.shift(); // Removing the first element which is the identifier
            // Creating an object to store arguments
            const argumentsObj: { [key: string]: string } = {};
            const argumentOrder: string[] = [];
            argsArray = this.combineStrings(argsArray);
            // Looping through the arguments array and extracting key-value pairs
            argsArray.forEach((arg) => {
                arg = arg.replace(/"/g, "");
                if (!arg.includes('"') && arg.includes('=')) {
                    const [key, value] = arg.split("=");
                    argumentsObj[key] = value;
                    argumentOrder.push(key);
                } else if (arg.startsWith('-')) {
                    argumentsObj[arg] = 'true';
                    argumentOrder.push(arg);
                } else {
                    argumentsObj[`nameless${argumentOrder.length + 1}`] = arg;
                    argumentOrder.push(`nameless${argumentOrder.length + 1}`);
                }
            });
            // for arguments in command type, check if the argument is called, if so, remove this argument
            // of all the arguments left of the command tipe, replace the first argument with the identifier
            // this way, 'echo a=y' will just be replaced with the first argument of the echo command
            commandList.push({ identifier, arguments: argumentsObj, argumentOrder });
        });
        return commandList;
    }

    private findCommand(command: command): boolean {
        var commandIdentifier = command.identifier;
        return commandFunctions.hasOwnProperty(commandIdentifier);
    }

    runCommand(command: string): void {
        console.log(this.splitCommand(command))
        var splittedCommands = this.splitCommand(command);
        this.history.push({ text: command, type: "input" });
        for (let i = 0; i < splittedCommands.length; i++) {
            if (!this.findCommand(splittedCommands[i])) {
                this.history.push({ text: "'" + splittedCommands[i].identifier + "' is not recognized as a command.", type: "output" });
                continue;
            }
            this.runFunction(splittedCommands[i]);
            continue;
        }



        return;
    }
}