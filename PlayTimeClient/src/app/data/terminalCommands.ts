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

export const commandFunctions: Record<string, FullCommandFunction> = {
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
            obj.appendHistory({ text: fullCommand.arguments['text'], type: "output" });
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
    "help": {
        functionToExecute: (fullCommand: pureCommand, obj: CommandHandler) => {
            const maxCommands = Number(fullCommand.arguments['maxPerPage']);
            var commands = deepcopy(commandFunctions);
            var text = "";
            if (fullCommand.arguments['command'] != undefined && commandFunctions[fullCommand.arguments['command']] != undefined) {
                console.log(fullCommand.arguments['command'], commandFunctions[fullCommand.arguments['command']])
                if (fullCommand.arguments['command'] == "help") {
                    fullCommand.arguments['-arg'] = true;
                }
                text = `${commands[fullCommand.arguments['command']].description}\n`;
                if (fullCommand.arguments['-arg']) {
                    text += `\nArguments:\n`;
                    for (let i = 0; i < commands[fullCommand.arguments['command']].arguments.length; i++) {
                        const arg = commands[fullCommand.arguments['command']].arguments[i];
                        text += ` - '${arg.name}':   ${arg.description}, default = '${arg.defaultValue}'\n`;
                    }
                }
                text += '\n';
                obj.appendHistory({ text: text, type: "output" });
                return;
            }
            if (fullCommand.arguments['command'] != undefined) {
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
                text += ` - ${command}:   ${commands[command].description}\n`;
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
                defaultValue: undefined,
            },
            {
                name: "page",
                description: "The page of commands to display.",
                defaultValue: 1,
            },
            {
                name: "-arg",
                description: "Show all arguments for the given command.\nAlways true for the 'help' command.",
                defaultValue: false,
            },
            {
                name: "maxPerPage",
                description: "Amount of commands to display per page.",
                defaultValue: 10,
            }
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
};

export const experimentalCommands: Record<string, FullCommandFunction> = {
    "msg": {
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
