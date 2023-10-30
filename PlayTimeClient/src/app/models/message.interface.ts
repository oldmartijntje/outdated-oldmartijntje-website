export interface Message {
    message: string;
    type: string; // "error" | "info" | "warning"
    from?: string;
}

export const TestMessages: Message[] = [
    { message: 'Hello world!', type: 'info', from: 'EditorCode' },
    { message: 'ReferenceError: fsdgfsdgdsgdsfgs is not defined at eval (eval at runJavaScript', type: 'error' },
    { message: 'Hello world!', type: 'warning' },
    { message: 'Hello world!', type: 'error', from: 'EditorCode' },
    { message: 'Hello world!', type: 'info' },
    { message: 'Hello world!', type: 'error' },
    { message: 'Hello world!', type: 'info' },
    { message: 'Hello world!', type: 'error' },
    { message: 'Hello world!', type: 'warning' },
    { message: 'Hello world!', type: 'warning', from: 'EditorCode' },
];