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

function interpretCommand(commands) {
    // Split the input into individual commands based on newlines.
    const commandList = commands.split('\n');

    for (const command of commandList) {
        // Use a regular expression to match the command pattern.
        const pattern = /^([a-zA-Z]+)\(([^)]*)\)$/; // Matches "command(value1, value2, ...)"
        const match = command.match(pattern);

        if (match) {
            const commandName = match[1];
            const valuesString = match[2];

            // Split the values string into individual values.
            const values = valuesString.split(',').map(value => value.trim());

            // Run the associated function using runFunction.
            runFunction(commandName, values);
        } else {
            console.log("Invalid command format: " + command);
        }
    }
}

// Example usage:
interpretCommand("print()"); // Command: print, Value: null
interpretCommand("print('ss', '123abc')"); // Command: print, Value: 'ss', '123abc'
interpretCommand("setVariable(42)"); // Command: setVariable, Value: 42
interpretCommand("invalidCommand"); // Invalid command format: invalidCommand
interpretCommand("print()\nsetValues(42)"); // Command: print, Value: null (and) Setting values: 42
interpretCommand("print('ss', '123abc')");
// Output: Printing: 'ss', '123abc'

interpretCommand("setValues(1, 2, 3, 4)");
// Output: Setting values: 1, 2, 3, 4

interpretCommand("nonExistentCommand()");
// Output: Command not found: nonExistentCommand
console.log("--------------------")
interpretCommand(`
    loop(5, 'i') {
        print('Iteration: ' + i);
        setValues(i, 2, 3);
    }
`);