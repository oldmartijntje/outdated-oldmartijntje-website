import { MarjinscriptInterperatorServiceService } from "../services/global/marjinscript-interperator-service.service";
import { RuntimeServiceService } from "../services/global/runtime-service.service";

export const PackageDescriptions: Record<string, Record<string, string>> = {
    "0": {
        "moduleName": "Main Module",
        "name": "mainFunctions",
        "description": "The mainFunctions package contains the most important functions for the MarjinScript language.",
        "id": "0",
        "version": "1",
    },
    "1": {
        "moduleName": "railroad Module",
        "name": "railroadFunctions",
        "description": "The railroadFunctions package contains the functions for the RailroadInk Page.",
        "id": "1",
        "version": "1"
    },
    "2": {
        "moduleName": "AppLink Module",
        "name": "applinkFunctions",
        "description": "The AppLink package contains the functions for linking the editor to the page.",
        "id": "2",
        "version": "1"
    },
}

export const PackagesByPage: Record<string, number[]> = {
    "Editor": [0],
    "Railroad": [0, 1, 2],
}


export class Packages {
    constructor(
        private marjinscriptInterperatorServiceService: MarjinscriptInterperatorServiceService,
        private runtimeServiceService: RuntimeServiceService
    ) { }

    mainFunctions: Record<string, (args: any[], mode: number, line: number) => void> = {
        print: (args, mode, line) => {
            this.marjinscriptInterperatorServiceService.sendLogToConsole('Printing: ' + this.convertVars(args).join(', '), mode);
        },
        warning: (args, mode, line) => {
            this.marjinscriptInterperatorServiceService.sendWarnToConsole('Warning: ' + this.convertVars(args).join(', '), mode);
        },
        error: (args, mode, line) => {
            this.marjinscriptInterperatorServiceService.sendErrorToConsole('Error: ' + this.convertVars(args).join(', '), mode);
        },
        clearConsole: (args, mode, line) => {
            this.runtimeServiceService.setConsoleSubject([]);
        },
        clear: (args, mode, line) => {
            this.runtimeServiceService.setOutputSubject([]);
        },
        // combine: (args, mode, line) => {
        //     var variable = undefined;
        //     for (const arg of this.convertVars(args)) {
        //         if (variable == undefined) {
        //             variable = arg;
        //         } else {
        //             variable += arg;
        //         }
        //     }
        //     if (this.checkForVar(args[0])) {
        //         this.marjinscriptInterperatorServiceService.variables[args[0][2]] = variable;
        //     }
        // },
        // Add more functions for other commands as needed.
    }

    railroadFunctions: Record<string, (args: any[], mode: number, line: number) => void> = {
        showDiceImage: (args, mode, line) => {
            this.marjinscriptInterperatorServiceService.addToPageVariable(["buttons", "image", "amount"], 1)
        },
        showDiceDeleteButton: (args, mode, line) => {
            this.marjinscriptInterperatorServiceService.addToPageVariable(["buttons", "delete", "amount"], 1)
        },
        showDiceRollButton: (args, mode, line) => {
            this.marjinscriptInterperatorServiceService.addToPageVariable(["buttons", "Roll", "amount"], 1)
        },
        showRollAllButton: (args, mode, line) => {
            this.marjinscriptInterperatorServiceService.addToPageVariable(["buttons", "RollAll", "amount"], 1)
        },
        showTypeButton: (args, mode, line) => {
            if (args.length < 1) {
                this.marjinscriptInterperatorServiceService.sendErrorToConsole("showTypeButton expects at least 1 argument", mode);
                return;
            }
            this.marjinscriptInterperatorServiceService.addToPageVariable(["buttons", args[0], "amount"], 1)
        },
        setNameOfTypeButton: (args, mode, line) => {
            if (args.length < 2) {
                this.marjinscriptInterperatorServiceService.sendErrorToConsole("setNameOfTypeButton expects at least 2 arguments", mode);
                return;
            }
            this.marjinscriptInterperatorServiceService.setPageVariable(["buttons", args[0], "name"], args[1])
        },
    }

    applinkFunctions: Record<string, (args: any[], mode: number, line: number) => void> = {
        synchroniseCodeToPage: (args, mode, line) => {
            this.runtimeServiceService.setPageVariables(this.marjinscriptInterperatorServiceService.readPageVariables());
        },
    }

    libraries: Record<string, any>[] = [this.mainFunctions, this.railroadFunctions, this.applinkFunctions];

    convertVars(vars: any[]) {
        //vars = (["var", variableRetrieved, item] || variableRetrieved)[]
        // i need to return a list of [variableRetrieved]
        var returnList: any[] = [];
        for (const variable of vars) {
            if (variable[0] === "var") {
                if (this.marjinscriptInterperatorServiceService.variables[variable[2]] === undefined) {
                    returnList.push(variable);
                } else {
                    returnList.push(this.marjinscriptInterperatorServiceService.processVariable(variable[2]));
                    //returnList.push(this.marjinscriptInterperatorServiceService.variables[variable[2]]);
                }
            } else {
                returnList.push(variable);
            }
        }
        return returnList;
    }

    checkForVar(variable: any) {
        if (variable[0] === "var") {
            return true;
        } else {
            return false;
        }
    }


    mergeDicts(args: number[]): Record<string, any> | null {
        if (Array.isArray(args) && args.length > 0) {
            const mergedDict: Record<string, any> = {};
            var chosenNumbers: Number[] = [];

            for (const arg of args) {
                if (arg >= 0 && arg < this.libraries.length && !chosenNumbers.includes(arg)) {
                    Object.assign(mergedDict, this.libraries[arg]);
                    chosenNumbers.push(arg);
                } else if (arg >= 0 && arg < this.libraries.length && chosenNumbers.includes(arg)) {
                    // ignore duplicate
                } else {
                    return null; // Index out of range
                }
            }
            return mergedDict;
        } else {
            return null; // Invalid arguments
        }
    }
}