import { MarjinscriptInterperatorServiceService } from "../services/global/marjinscript-interperator-service.service";

export const PackageDescriptions: Record<string, Record<string, string>> = {
    "0": {
        "moduleName": "Main Module",
        "name": "mainFunctions",
        "description": "The mainFunctions package contains the most important functions for the MarjinScript language.",
        "id": "0"
    },
    "1": {
        "moduleName": "railroad Module",
        "name": "railroadFunctions",
        "description": "The railroadFunctions package contains the functions for the RailroadInk Page.",
        "id": "1"
    },
}

export const PackagesByPage: Record<string, number[]> = {
    "Editor": [0],
    "Railroad": [0, 1],
}


export class Packages {
    constructor(private marjinscriptInterperatorServiceService: MarjinscriptInterperatorServiceService) { }

    mainFunctions: Record<string, (args: any[], mode: number, line: number) => void> = {
        print: (args, mode, line) => {
            this.marjinscriptInterperatorServiceService.sendLogToConsole('Printing: ' + this.convertVars(args).join(', '), mode);
        },
        warning: (args, mode, line) => {
            this.marjinscriptInterperatorServiceService.sendWarnToConsole('Printing: ' + this.convertVars(args).join(', '), mode);
        },
        error: (args, mode, line) => {
            this.marjinscriptInterperatorServiceService.sendErrorToConsole('Printing: ' + this.convertVars(args).join(', '), mode);
        },
        combine: (args, mode, line) => {
            var variable = undefined;
            for (const arg of this.convertVars(args)) {
                if (variable == undefined) {
                    variable = arg;
                } else {
                    variable += arg;
                }
            }
            if (this.checkForVar(args[0])) {
                this.marjinscriptInterperatorServiceService.variables[args[0][2]] = variable;
            }
        },
        // Add more functions for other commands as needed.
    }

    railroadFunctions: Record<string, (args: any[], mode: number, line: number) => void> = {

        // Add more functions for other commands as needed.
    }

    libraries: Record<string, any>[] = [this.mainFunctions, this.railroadFunctions];

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