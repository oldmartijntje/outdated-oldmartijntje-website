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

    for (const command of commandList) {
        // Trim leading and trailing spaces on each line.
        const trimmedCommand = command.trim();

        const pattern = /^([a-zA-Z]+)\(([^]*)\)$/; // Matches "command(value1, value2, ...)"
        const match = trimmedCommand.match(pattern);

        if (match) {
            const commandName = match[1];
            let valuesString = match[2];

            // Trim spaces that are not within quotes.
            valuesString = valuesString.replace(/\s+(?=(?:(?:[^"]*"){2})*[^"]*$)/g, '');

            const values = valuesString.split(',').map(value => {
                // Remove single or double quotes around string values.
                if (value.startsWith("'") && value.endsWith("'")) {
                    return value.slice(1, -1);
                } else if (value.startsWith('"') && value.endsWith('"')) {
                    return value.slice(1, -1);
                }
                return value;
            });

            // Convert values to integers if they are numeric.
            const numericValues = values.map(value => {
                if (!isNaN(value)) {
                    return parseInt(value, 10);
                }
                return value;
            });

            commandsToExecute.push({ command: commandName, arguments: numericValues });
        } else if (trimmedCommand == "") {
            // Ignore empty lines.
        } else {
            console.error("Invalid command format: " + trimmedCommand);
        }
    }

    // Execute all accumulated commands.
    for (const cmd of commandsToExecute) {
        runFunction(cmd.command, cmd.arguments);
    }
}

// Example usage:
const code = `
    print('ss', '123abc')
    setValues(1, 2, 3, 4)
    anotherCommand('value with spaces', 'noSpaces')
`;

interpretAndExecuteCode(code);