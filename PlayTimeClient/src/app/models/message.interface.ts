export interface Message {
    message: string;
    type: string; // "error" | "info" | "warning"
    from?: string;
    datetimeTimestamp?: string | null;
    amount: number;
}