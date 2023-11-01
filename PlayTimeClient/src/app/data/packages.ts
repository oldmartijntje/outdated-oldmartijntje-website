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
            this.marjinscriptInterperatorServiceService.sendLogToConsole('Printing: ' + args.join(', '), mode);
        },
        setValues: (args, mode, line) => {
            this.marjinscriptInterperatorServiceService.sendLogToConsole('Setting values: ' + args.join(', '), mode);
        },
        // Add more functions for other commands as needed.
    }

    railroadFunctions: Record<string, (args: any[], mode: number, line: number) => void> = {
        print2: (args, mode, line) => {
            this.marjinscriptInterperatorServiceService.sendLogToConsole('Printing: ' + args.join(', '), mode);
        },
        setValues2: (args, mode, line) => {
            this.marjinscriptInterperatorServiceService.sendLogToConsole('Setting values: ' + args.join(', '), mode);
        },
        // Add more functions for other commands as needed.
    }

    libraries: Record<string, any>[] = [this.mainFunctions, this.railroadFunctions];

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