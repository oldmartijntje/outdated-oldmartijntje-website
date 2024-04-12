import { CommandHandler, deepcopy, pureCommand } from "../models/commandHandler";

type CommandFunction = (fullCommand: pureCommand, obj: CommandHandler) => void;

export interface argument {
    name: string;
    description: string;
    defaultValue: any;
}

export interface FullCommandFunction {
    functionToExecute: CommandFunction;
    description: string;
    arguments: argument[];
}

export function shuffleList<T>(list: T[]): T[] {
    // Create a copy of the original list to avoid modifying the original array
    const shuffledList = [...list];

    // Fisher-Yates algorithm for shuffling
    for (let i = shuffledList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledList[i], shuffledList[j]] = [shuffledList[j], shuffledList[i]];
    }

    return shuffledList;
}

export const commandFunctions: Record<string, FullCommandFunction> = {
    "help": {
        functionToExecute: (fullCommand: pureCommand, obj: CommandHandler) => {
            console.log(fullCommand);
            const maxCommands = Number(fullCommand.arguments['maxPerPage']);
            var commands = deepcopy(commandFunctions);
            var text = "";
            if (fullCommand.arguments['command'] != undefined && commandFunctions[fullCommand.arguments['command']] != undefined) {
                if (fullCommand.arguments['command'] == "help") {
                    fullCommand.arguments['-arg'] = true;
                }
                text = `${commands[fullCommand.arguments['command']].description}\n`;
                if (fullCommand.arguments['-arg']) {
                    text += `\nArguments:\n`;
                    for (let i = 0; i < commands[fullCommand.arguments['command']].arguments.length; i++) {
                        const arg = commands[fullCommand.arguments['command']].arguments[i];
                        if (fullCommand.arguments['-listOnly']) {
                            text += ` - '${arg.name}'\n`;
                        } else {
                            text += ` - '${arg.name}':   ${arg.description} Default = '${arg.defaultValue}'\n`;
                        }
                    }
                }
                text += '\n';
                obj.appendHistory({ text: text, type: "output" });
                return;
            }
            if (fullCommand.arguments['command'] != "undefined") {
                text = `Command '${fullCommand.arguments['command']}' not found.\n\n`;
                obj.appendHistory({ text: text, type: "output" });
                return;
            }
            var page = fullCommand.arguments['page'];
            var commandKeys = Object.keys(commands);
            // remove first 'page' * 10 commands
            page--;
            if (page < 1) {
                page = 0;
            }
            commandKeys.splice(0, page * maxCommands);
            // remove all commands after maxCommands
            commandKeys.splice(maxCommands, commandKeys.length);
            for (let i = 0; i < commandKeys.length; i++) {
                const command = commandKeys[i];
                if (fullCommand.arguments['-listOnly']) {
                    text += ` - ${command}\n`;
                } else {
                    text += ` - ${command}:   ${commands[command].description}\n`;
                }
            }
            text += '\nPage ' + (page + 1) + ' of ' + Math.ceil(Object.keys(commands).length / maxCommands) + '.\n';
            obj.appendHistory({ text: text, type: "output" });
            return;
        },
        description: "Displays all commands and their descriptions.\nCan also display the description and arguments for a specific command.",
        arguments: [
            {
                name: "command",
                description: "The command to get help for.",
                defaultValue: "undefined",
            },
            {
                name: "page",
                description: "The page of commands to display.",
                defaultValue: 1,
            },
            {
                name: "-arg",
                description: "Show all arguments for the given command.\nAlways true for the 'help' command.",
                defaultValue: true,
            },
            {
                name: "maxPerPage",
                description: "Amount of commands to display per page.",
                defaultValue: 10,
            },
            {
                name: "-listOnly",
                description: "Only show names of commands / arguments.",
                defaultValue: false,
            },
        ],
    },
    "color": {
        functionToExecute: (fullCommand: pureCommand, obj: CommandHandler) => {
            obj.writeMemory("color", fullCommand.arguments['color']);
        },
        description: "Sets the color of the terminal text.",
        arguments: [
            {
                name: "color",
                description: "The color to set the terminal text to. Can be any valid CSS color value.",
                defaultValue: "#ffffff",
            }
        ],
    },
    "clear": {
        functionToExecute: (fullCommand: pureCommand, obj: CommandHandler) => {
            obj.setHistory([]);
        },
        description: "Clears the terminal.",
        arguments: [],
    },
    "command.example": {
        functionToExecute: (fullCommand: pureCommand, obj: CommandHandler) => {
            var command = deepcopy(commandFunctions[fullCommand.arguments['command']]);
            var amount = 3;
            var text = "Example commands:\n";
            var keys = command.arguments;
            if (keys.length > 2) {
                amount = Math.floor(keys.length / 2) + 1;
            } else if (keys.length == 0) {
                amount = 0;
            }
            if (amount > 0) {
                var defaultExample = ` - '${fullCommand.arguments['command']}`;
                for (let j = 0; j < keys.length; j++) {
                    const key = keys[j];
                    defaultExample += ` "${key.defaultValue}"`;
                }
                text += defaultExample + ";'\n";
                defaultExample = ` - '${fullCommand.arguments['command']}`;
                for (let j = 0; j < keys.length; j++) {
                    const key = keys[j];
                    defaultExample += ` $${key.name}="${key.defaultValue}"`;
                }
                text += defaultExample + ";'\n";
                for (let i = 0; i < amount; i++) {
                    var example = ` - '${fullCommand.arguments['command']}`;
                    keys = shuffleList(keys);
                    for (let j = 0; j < keys.length; j++) {
                        const key = keys[j];
                        const randomValue = Math.random() * 3;
                        if (randomValue < 1) {
                            example += ` $${key.name}="${key.defaultValue}"`;
                        } else if (key.name.startsWith("-") && key.defaultValue == true) {
                            example += ` ${key.name}`;
                        } else {
                            example += ` $${key.name}="${key.defaultValue}"`;
                        }
                    }
                    text += example + ";'\n";
                }
                text += "\nThe above commands all execute the same way. (These are the default values)\n";
            } else {
                text += "\nThis command doesn't take any arguments."
            }
            obj.appendHistory({ text: text, type: "output" });

            console.log(keys);
        },
        description: "Shows a few example commands.",
        arguments: [
            {
                name: "command",
                description: "The command to get an example for.",
                defaultValue: "help",
            }
        ],
    },
    "cheese": {
        functionToExecute: (fullCommand: pureCommand, obj: CommandHandler) => {
            console.log("Executing command 1");
            var response = `⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡞⠉⠛⠶⢤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡴⠋⢰⠞⠛⢷⠀⠈⠙⠳⠦⣄⣀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⠞⠁⠀⠘⠒⠒⠋⠀⣠⣤⡀⠀⠀⠉⠛⢶⣤⣀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡼⠋⢀⡴⠖⠶⢦⠀⠀⠀⢧⣬⠇⣀⣠⠴⠞⠋⠁⡏
    ⠀⠀⠀⠀⠀⠀⠀⠀⣠⠟⠀⠀⠘⠧⣤⣀⡼⠀⢀⣀⡤⠶⢛⣩⣤⣀⠀⢠⡞⠋
    ⠀⠀⠀⠀⠀⠀⣠⠞⣁⣀⠀⠀⠀⠀⢀⣠⡴⠖⠋⠁⠀⠀⣿⠁⠀⣹⠀⠈⢷⡄
    ⠀⠀⠀⠀⣠⠞⠁⠀⠷⠿⣀⣤⠴⠚⠉⠁⠀⠀⠀⠀⠀⠀⠈⠓⠒⠃⠀⠀⠀⡇
    ⠀⠀⣠⠞⣁⣠⡤⠶⠚⠛⠉⠀⠀⠀⣀⡀⠀⠀⠀⠀⢀⡤⠶⠶⠦⣄⠀⠀⠀⡇
    ⠀⡾⠛⠋⢉⣤⢤⣀⠀⠀⠀⠀⣰⠞⠉⠙⠳⡄⠀⠀⡟⠀⠀⠀⠀⢸⡆⠀⠀⡇
    ⠀⡇⠀⢰⡏⠀⠀⢹⡆⠀⠀⠀⡇⠀⠀⠀⠀⣿⠀⠀⠳⣄⡀⠀⢀⣸⠇⠀⠀⡇
    ⠀⡇⠀⠀⢷⣤⣤⠞⠁⠀⠀⠀⢷⣀⣀⣠⡴⠃⠀⠀⠀⠈⠉⠉⠉⠁⣀⣠⠴⠇
    ⠀⠻⣆⠀⠀⠀⠀⢀⣀⣤⣀⠀⠀⠉⠉⠁⠀⠀⠀⠀⠀⢀⣠⡤⠖⠛⠉⠀⠀⠀
    ⠀⠀⡿⠀⠀⠀⢰⡏⠀⠀⢹⡆⠀⠀⠀⠀⠀⣀⣤⠶⠚⠉⠁⠀⠀⠀⠀⠀⠀⠀
    ⢰⠞⠁⠀⠀⠀⠀⢷⣄⣤⠞⠁⣀⣠⠴⠚⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⢸⡆⠀⠀⠀⠀⠀⠀⣀⡤⠖⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⢸⡇⠀⢀⣠⡴⠞⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠟⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`;
            obj.appendHistory({ text: response, type: "output" });
        },
        description: "Prints a block of cheese",
        arguments: [],
    },
    "echo": {
        functionToExecute: (fullCommand: pureCommand, obj: CommandHandler) => {
            const text = fullCommand.arguments['text'];
            const splittedText = text.split("\\n");
            for (let i = 0; i < splittedText.length; i++) {
                obj.appendHistory({ text: splittedText[i], type: "output" });
            }
        },
        description: "Replies with the given text.",
        arguments: [
            {
                name: "text",
                description: "The text to reply with.",
                defaultValue: "undefined",
            }
        ],
    },
    "chat.history": {
        functionToExecute: (fullCommand: pureCommand, obj: CommandHandler) => {
            obj.backendMiddlemanService.getMessages().then((data) => {
                for (let i = 0; i < data['data'].length; i++) {
                    const message = data['data'][i];
                    obj.appendHistory({ text: message.username + "#" + message.uid + ": " + message.content, type: "output" });
                }
            });
        },
        description: "Displays the chat history.",
        arguments: [],
    },
    "terminal.startup": {
        functionToExecute: (fullCommand: pureCommand, obj: CommandHandler) => {
            if (fullCommand.arguments['mode'] == "-set") {
                const command = fullCommand.arguments['command'].replace(/\|\:\|/g, ";").replace(/\|\~\|/g, "\"");
                obj.localstorageHandlingService.addEditRequestToQueue(command, "app.terminal.startupCommand");
                obj.appendHistory({ text: "Startup command set to: " + command, type: "output" });
                return;
            }
            if (fullCommand.arguments['mode'] == "-get") {
                const response = obj.localstorageHandlingService.getLocalstorageHandler().loadData("app.terminal.startupCommand");
                if (!response.success) {
                    // If no startup command is set, return the default command
                    response.data = commandFunctions[fullCommand.identifier].arguments[0].defaultValue;
                }
                if (response.data == null) {
                    response.data = response.data.replace(/;/g, "|:|").replace(/\"/g, "|~|").replace(/\n/g, "\\n");
                }
                obj.appendHistory({ text: "Current startup command: \"" + response.data + "\"", type: "output" });
                return;
            }
        },
        description: "Set a startup command for the terminal. \nIf you want to use ';' in your startup command, use '|:|' instead.\nIf you want to use double quotes inside of your startup command, use '|~|' instead.",
        arguments: [
            {
                name: "command",
                description: "The command to execute on startup.",
                defaultValue: "echo |~|Welcome to the Terminal\nType 'help' for a list of commands|~||:|",
            },
            {
                name: "mode",
                description: "-set: Set the startup command.\n-get: Get the current startup command.",
                defaultValue: "-set",
            }
        ],
    },
    "DoS": {
        functionToExecute: (fullCommand: pureCommand, obj: CommandHandler) => {
            if (fullCommand.arguments['-endless'] == 'true') {
                fullCommand.arguments['-endless'] = true;
            } else {
                fullCommand.arguments['-endless'] = false;
            }
            var succesfullJob = obj.backendServiceService.DoS(fullCommand.arguments['target'], fullCommand.arguments['amount'], fullCommand.arguments['-endless'], obj);
            succesfullJob.then((data) => {
                if (data == fullCommand.arguments['amount']) {
                    obj.appendHistory({ text: "Attack executed.", type: "output" });
                } else {
                    obj.appendHistory({ text: "Attack failed after " + data + " WebRequests.", type: "output" });
                }
            });
        },
        description: "Denial of Service attack.",
        arguments: [
            {
                name: "target",
                description: "The target of the attack.",
                defaultValue: "localhost:8080",
            },
            {
                name: "amount",
                description: "The amount of requests to send.",
                defaultValue: 1000,
            },
            {
                name: "-endless",
                description: "Keep sending requests until the server crashes. (or you run out of memory)",
                defaultValue: false,
            }
        ],
    },

};

export const experimentalCommands: Record<string, FullCommandFunction> = {
    "chat.msg": {
        functionToExecute: (fullCommand: pureCommand, obj: CommandHandler) => {
            obj.backendServiceService.addMessage(fullCommand.arguments['message'], fullCommand.arguments['nickname']).subscribe((data) => {
                obj.appendHistory({ text: "Message sent.", type: "output" });
            });
        },
        description: "Send a message to https://oldmartijntje.nl/Chat.",
        arguments: [
            {
                name: "message",
                description: "The message to send.",
                defaultValue: "",
            },
            {
                name: "nickname",
                description: "The name to send the message as.",
                defaultValue: "Terminal_Guy",
            }
        ],
    }
}
