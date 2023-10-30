function runFunction(command, arguments) {
    const functions = {
        print: (args) => {
            console.log('Printing:', args);
        },
        setValues: (args) => {
            console.log('Setting values:', args);
        },
        // Add more functions for other commands as needed.
    };

    const commandFunction = functions[command];

    if (typeof commandFunction === 'function') {
        commandFunction(arguments);
    } else {
        console.log("Command not found: " + command);
    }
}

function interpretAndExecuteCode(code) {
    const commandList = code.split('\n');
    const commandsToExecute = [];

    const loopStack = [];

    for (const command of commandList) {
        const trimmedCommand = command.trim();

        if (trimmedCommand.startsWith("for(") && trimmedCommand.endsWith(") {")) {
            const iterations = parseInt(trimmedCommand.match(/\d+/)[0], 10);
            loopStack.push({ iterations, commands: [] });
        } else if (trimmedCommand === "}") {
            const loop = loopStack.pop();
            if (loop) {
                for (let i = 0; i < loop.iterations; i++) {
                    for (const loopCommand of loop.commands) {
                        interpretAndExecuteCode(loopCommand);
                    }
                }
            } else {
                console.error("Unmatched '}' in code.");
            }
        } else if (loopStack.length > 0) {
            loopStack[loopStack.length - 1].commands.push(trimmedCommand);
        } else if (trimmedCommand == "") {
            // Ignore empty lines.
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
                    if (!isNaN(value)) {
                        return parseInt(value, 10);
                    }
                    return value;
                });

                commandsToExecute.push({ command: commandName, arguments: numericValues });
            } else {
                console.error("Invalid command format: " + trimmedCommand);
            }
        }
    }

    if (loopStack.length > 0) {
        console.error("Unmatched 'for' loop in code.");
    }

    // Execute the commands.
    for (const cmd of commandsToExecute) {
        runFunction(cmd.command, cmd.arguments);
    }
}

// Example usage:
const code = `
    for(5) {
        print('henk', '123abc')
    }
    for(3) {
        print('ss', '123abc')
        setValues(1, 2, 3, 4)
    }
    
`;

interpretAndExecuteCode(code);