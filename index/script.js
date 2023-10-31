function trimSpaces(inputString) {
    return inputString.replace(/\s/g, '');
}

function runFunction(command, arguments) {
    console.log(command)
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
    var indentLevel = 0;

    const loopStack = [];

    while (commandList.length > 0) {
        var command = commandList.shift();
        const trimmedCommand = command.trim().replace(/^\s+|\s+$/g, '');

        if (trimmedCommand.startsWith("for(") && trimSpaces(trimmedCommand).endsWith("){")) {
            indentLevel++;
            const iterations = parseInt(trimmedCommand.match(/\d+/)[0], 10);
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
                    for (const loopCommand of loop.commands) {
                        commandList.unshift(loopCommand);
                    }
                }
            } else {
                console.error("Unmatched '}' in code.");
            }
        } else if (indentLevel > 0) {
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
    for(5){
        print('henk', 'loop1')
    }
    print('henk', 'noloop1')
    print('henk', 'noloop2')
    for(3) {
        print('ss', 'loop2')
        setValues(1, 2, 3, 4)
        for(3) {
            print('ss', 'loop2 subloop')
            setValues(1, 2, 3, 4)
        }
    }
    '123abc'
    6
    //cheese
    noCommand(1)
`;
console.log(code)

interpretAndExecuteCode(code);