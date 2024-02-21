export interface terminalLine {
    text: string;
    type: "input" | "output";
}

export interface command {
    identifier: string;
    arguments: { [key: string]: string };
    argumentOrder: string[];
}


export class CommandHandler {
    private history: terminalLine[] = [];
    private commands: Record<string, boolean> = {
        "help": true,
        "clear": true,
    };

    constructor() { }

    setHistory(history: terminalLine[]) {
        this.history = history;
    }

    getHistory() {
        return this.history;
    }

    splitCommand(command: string): command {
        function combineStrings(arr: string[]): string[] {
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
        // split the command into the identifier and the arguments
        // echo x=5 y=6 -> { identifier: "echo", arguments: { x: "5", y: "6" }, argumentOrder: ["x", "y"] }
        // echo aaa -> { identifier: "echo", arguments: { nameless1: "aaa" }, argumentOrder: ["nameless1"] }
        // echo a=5 x y=6 -> { identifier: "echo", arguments: { a: "5", nameless1: "x", y: "6" }, argumentOrder: ["a", "nameless1", "y"] }
        // echo a="henk de hopper" -> { identifier: "echo", arguments: { a: "henk de hopper" }, argumentOrder: ["a"] }
        // use regex
        // Regular expression to match arguments in the command
        const argRegex = /\s*(?:"([^"]*)"|([^"\s]+))\s*/g;

        // Extracting the identifier from the command
        const identifier = command.split(" ")[0];

        // Extracting the arguments from the command using regex
        var argsArray: string[] = command.match(argRegex) || [];
        argsArray.shift(); // Removing the first element which is the identifier
        // Creating an object to store arguments
        const argumentsObj: { [key: string]: string } = {};
        const argumentOrder: string[] = [];

        argsArray = combineStrings(argsArray);

        // Looping through the arguments array and extracting key-value pairs
        argsArray.forEach((arg) => {
            arg = arg.replace(/"/g, "");
            if (!arg.includes('"') && arg.includes('=')) {
                const [key, value] = arg.split("=");
                argumentsObj[key] = value.replace(/"/g, ""); // Removing quotes from the value
                argumentOrder.push(key);
            } else {
                argumentsObj[`nameless${argumentOrder.length + 1}`] = arg.replace(/"/g, ""); // Removing quotes from the value
                argumentOrder.push(`nameless${argumentOrder.length + 1}`);
            }
            // const [key, value] = arg.split("=");
            // argumentsObj[key] = value.replace(/"/g, ""); // Removing quotes from the value
            // argumentOrder.push(key);
            // argumentOrder.push(arg);
        });

        // for arguments in command type, check if the argument is called, if so, remove this argument
        // of all the arguments left of the command tipe, replace the first argument with the identifier
        // this way, 'echo a=y' will just be replaced with the first argument of the echo command
        return { identifier, arguments: argumentsObj, argumentOrder };
    }

    private findCommand(command: string): boolean {
        command = command.split(' ')[0];
        return this.commands.hasOwnProperty(command) ? this.commands[command] : false;
    }

    runCommand(command: string): void {
        console.log(this.splitCommand(command))
        this.history.push({ text: command, type: "input" });
        if (!this.findCommand(command)) {
            this.history.push({ text: "'" + command.split(' ')[0] + "' is not recognized as a command.", type: "output" });
            return;
        }



        return;
    }
}