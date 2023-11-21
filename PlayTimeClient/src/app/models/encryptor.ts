import { environment } from "src/environments/environment";

export class Encryptor {


    stringToAsciiList(str: string): number[] {
        const asciiList: number[] = [];
        for (let i = 0; i < str.length; i++) {
            const asciiValue = str.charCodeAt(i);
            asciiList.push(asciiValue);
        }
        return asciiList;
    }

    // Function to convert a list of ASCII values to a string
    asciiListToString(asciiList: number[]): string {
        return asciiList.map(asciiValue => String.fromCharCode(asciiValue)).join('');
    }

    encryptString(inputString: string): string {
        const asciiList = this.stringToAsciiList(inputString);
        const encryptedList = asciiList.map(value => value * environment['encryptionKey']);
        return encryptedList.join(',');
    }

    decryptString(encryptedString: string): string {
        const encryptedList = encryptedString.split(',').map(value => parseInt(value, 10));
        const asciiList = encryptedList.map(value => value / environment['encryptionKey']);
        return this.asciiListToString(asciiList);
    }
}