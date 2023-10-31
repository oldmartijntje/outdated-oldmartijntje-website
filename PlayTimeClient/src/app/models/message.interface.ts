export interface Message {
    message: string;
    type: string; // "error" | "info" | "warning"
    from?: string;
    datetimeTimestamp?: string | null;
    amount: number;
}

export const TestMessages: Message[] = [
    { message: 'Hello world!', type: 'info', from: 'EditorCode', amount: 1 },
    { message: 'ReferenceError: fsdgfsdgdsgdsfgs is not defined at eval (eval at runJavaScript', type: 'error', amount: 10 },
    { message: 'Hello world!', type: 'warning', amount: 1 },
    { message: 'Hello world!', type: 'error', from: 'EditorCode', amount: 1 },
    { message: 'Hello world!', type: 'info', amount: 1 },
    { message: 'Hello world!', type: 'error', amount: 1 },
    { message: 'Hello world!', type: 'info', amount: 4 },
    { message: 'Hello world!', type: 'error', amount: 2 },
    { message: 'Hello world!', type: 'warning', amount: 1 },
    { message: 'Hello world!', type: 'warning', from: 'EditorCode', amount: 1 },
];