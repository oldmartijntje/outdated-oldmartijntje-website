export interface terminalLine {
    text: string;
    type: "input" | "output";
}

export class CommandHandler {
    private history: terminalLine[] = [];

    constructor() { }

    setHistory(history: terminalLine[]) {
        this.history = history;
    }

    getHistory() {
        return this.history;
    }
}