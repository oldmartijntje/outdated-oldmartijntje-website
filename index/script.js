// Define a context to store variables
const context = {};

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

function interpretCommand(commands, context) {
    const cleanedCommands = commands.replace(/\s+/g, '');

    const stack = [];
    let currentCommand = '';
    let i = 0;

    while (i < cleanedCommands.length) {
        const char = cleanedCommands[i];

        if (char === '{') {
            stack.push(currentCommand);
            currentCommand = '';
            i++;
        } else if (char === '}') {
            const block = currentCommand;
            currentCommand = stack.pop();
            i++;

            // Execute the block as a separate set of commands, passing the current context.
            interpretCommand(block, context);
        } else if (char === ';' || char === '\n') {
            i++;
        } else {
            currentCommand += char;
            i++;
        }
    }

    if (currentCommand) {
        const pattern = /^([a-zA-Z]+)\(([^)]*)\)$/; // Matches "command(value1, value2, ...)"
        const match = currentCommand.match(pattern);

        if (match) {
            const commandName = match[1];
            const valuesString = match[2];

            // Split the values string into individual values.
            const values = valuesString.split(',').map(value => value.trim());

            // Handle the 'loop' command.
            if (commandName === 'loop') {
                if (values.length !== 2) {
                    console.log("Invalid 'loop' command: " + currentCommand);
                } else {
                    const iterations = parseInt(values[0], 10);
                    const loopVar = values[1];

                    for (let i = 0; i < iterations; i++) {
                        context[loopVar] = i;
                        interpretCommand(valuesString, context);
                    }
                }
            } else {
                // Run other commands using runFunction.
                runFunction(commandName, values);
            }
        } else {
            console.log("Invalid command format: " + currentCommand);
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
console.log("--------------------");
interpretCommand(`
    loop(5, 'i') {
        print('Iteration: ' + i);
        setValues(i, 2, 3);
    }
`, context);