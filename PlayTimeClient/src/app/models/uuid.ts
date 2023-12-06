export class UUID {
    static generate(): string {
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            // tslint:disable-next-line: no-bitwise
            var r = Math.random() * 16 | 0;
            // tslint:disable-next-line: no-bitwise
            var v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });

        return uuid;
    }
}