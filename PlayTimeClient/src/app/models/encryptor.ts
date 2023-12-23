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

    addAsciiList(asciiList: number[], adder: number): number[] {
        return asciiList.map(asciiValue => asciiValue + adder);
    }

    subtractAsciiList(asciiList: number[], subtractor: number): number[] {
        return asciiList.map(asciiValue => asciiValue - subtractor);
    }

    encryptString(inputString: string, mode: number = 0): string {
        if (mode == 1) {
            const asciiList = this.addAsciiList(this.stringToAsciiList(inputString), environment.encryptionKey[0]);
            var tempString = asciiList.join(',');
            return tempString;
        }
        const secret = this.getRandomNumber(0, 10000);
        const asciiList = this.multiplyAsciiList(this.stringToAsciiList(inputString), secret);
        // console.log(asciiList)
        const encryptedList = this.multiplyAsciiList(asciiList, environment.encryptionKey[0]);
        // console.log(secret)
        // console.log(encryptedList)
        encryptedList.push(parseInt(`${secret * secret}${environment.encryptionKey[1]}`));
        var length = encryptedList.length;
        // console.log(encryptedList)
        var temp = this.multiplyAsciiList(encryptedList, length);
        temp = this.addAsciiList(temp, environment.encryptionKey[2]);
        // console.log(temp)
        var tempString = temp.join(',');
        return tempString;
    }

    getRandomNumber(min: number, max: number): number {
        if (min >= max) {
            return -1;
        }
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    removeSuffix(input: string): string {
        if (input.length >= environment.encryptionKey[1].toString().length) {
            return input.substring(0, input.length - environment.encryptionKey[1].toString().length);
        } else {
            return "Invalid input";
        }
    }

    decryptString(encryptedString: string, mode: number = 0): string {
        if (mode == 1) {
            var encryptedList = encryptedString.split(',').map(value => parseInt(value, 10));
            const asciiList = this.subtractAsciiList(encryptedList, environment.encryptionKey[0]);
            return this.asciiListToString(asciiList);
        }
        var encryptedList = encryptedString.split(',').map(value => parseInt(value, 10));
        // console.log(encryptedList)
        encryptedList = this.subtractAsciiList(encryptedList, environment.encryptionKey[2])
        var length = encryptedList.length;
        encryptedList = this.devideAsciiList(encryptedList, length);
        // console.log(encryptedList)
        var data = this.removeLastElement(encryptedList);
        data[1] = this.removeSuffix(data[1]);
        // console.log(data[0])
        const root: number = Math.sqrt(parseInt(data[1]));
        // console.log(root)
        var devidedData = this.devideAsciiList(data[0], root);
        // console.log(devidedData)
        const asciiList = this.devideAsciiList(devidedData, environment.encryptionKey[0]);
        return this.asciiListToString(asciiList);
    }

    simpleToAscii(inputString: string): string {
        const asciiList = this.stringToAsciiList(inputString);
        return asciiList.join(',');
    }

    asciiToSimple(inputString: string): string {
        const asciiList = inputString
            .split(',')
            .map(value => parseInt(value, 10))
            .filter(value => !isNaN(value) && value >= 0 && value <= 127); // Check if valid ASCII

        if (asciiList.length === 0) {
            return ''; // Return empty string for invalid ASCII
        }

        return this.asciiListToString(asciiList);
    }

    removeLastElement(input: number[]): [number[], string] {
        // Check if the array is not empty
        if (input.length > 0) {
            // Use slice to create a new array without the last element
            const newArray = input.slice(0, input.length - 1);
            // Get the last element
            const removedElement = input[input.length - 1];
            return [newArray, `${removedElement}`];
        } else {
            // If the array is empty, return an empty array for the new list and null for the removed element
            return [[], ''];
        }
    }
}