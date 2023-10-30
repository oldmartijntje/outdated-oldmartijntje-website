export interface Toast {
    id: number;
    message: string;
    timeoutId: number | null;
    type: string;
    timeModifier: number;
}
