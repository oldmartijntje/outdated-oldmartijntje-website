export interface Shortcut {
    Icon: string;
    Title: string;
    Command: string;
    Link: string;
    Payload: any;
    Location: {
        X: number;
        Y: number;
    },
    Id?: number;
    // Add other properties if needed
}