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

    multiplyAsciiList(asciiList: number[], multiplier: number): number[] {
        return asciiList.map(asciiValue => asciiValue * multiplier);
    }

    devideAsciiList(asciiList: number[], divisor: number): number[] {
        return asciiList.map(asciiValue => asciiValue / divisor);
    }

    encryptString(inputString: string): string {
        const secret = this.getRandomNumber(0, 10000);
        const asciiList = this.multiplyAsciiList(this.stringToAsciiList(inputString), secret);
        const encryptedList = asciiList.map(value => value * environment['encryptionKey']);
        var temp = encryptedList.join(',');
        temp += `,${secret * secret}${environment.encryptionModifier}`;
        return temp;
    }

    getRandomNumber(min: number, max: number): number {
        if (min >= max) {
            return -1;
        }

        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    removeSuffix(input: string): string {
        // Check if the input has at least 4 characters before attempting to remove the suffix
        if (input.length >= environment.encryptionModifier.toString().length) {
            // Use substring to remove the last 4 characters
            return input.substring(0, input.length - environment.encryptionModifier.toString().length);
        } else {
            // Handle the case where the input has fewer than 4 characters (optional)
            return "Invalid input";
        }
    }

    decryptString(encryptedString: string): string {
        var data = this.splitLastComma(encryptedString);
        data[1] = this.removeSuffix(data[1]);
        const root: number = Math.sqrt(parseInt(data[1]));
        const encryptedList = data[0].split(',').map(value => parseInt(value, 10));
        var devidedData = this.devideAsciiList(encryptedList, root);
        const asciiList = devidedData.map(value => value / environment['encryptionKey']);
        return this.asciiListToString(asciiList);
    }

    splitLastComma(input: string): string[] {
        const lastCommaIndex = input.lastIndexOf(',');

        if (lastCommaIndex !== -1) {
            const firstPart = input.substring(0, lastCommaIndex);
            const secondPart = input.substring(lastCommaIndex + 1);
            return [firstPart, secondPart];
        } else {
            // If there is no comma, return the whole string as the first part and an empty string as the second part
            return [input, ''];
        }
    }
}