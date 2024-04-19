import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

interface Letter {
    value: string;
    angle: number;
    id: number;
    offset: [number, number];
    dropped: boolean;
}

@Component({
    selector: 'app-fancy-not-found-page',
    templateUrl: './fancy-not-found-page.component.html',
    styleUrl: './fancy-not-found-page.component.scss'
})
export class FancyNotFoundPageComponent {
    currentTheme: string = 'light-theme';
    letters1: Letter[] = [];
    letters2: Letter[] = [];
    readonly fullText1 = '404 Not Found!';
    readonly fullText2 = 'This page does not exist, oops!';

    constructor() { }

    ngOnInit() {
        // Generate random angles for each letter
        for (let i = 0; i < this.fullText1.length; i++) { // Adjust this number according to the number of letters
            this.letters1.push({ value: this.fullText1[i], angle: this.getRandomAngle(40, 20), id: i, offset: [this.getRandomAngle(6, 3), this.getRandomAngle(10, 5)], dropped: false });
        }
        for (let i = 0; i < this.fullText2.length; i++) { // Adjust this number according to the number of letters
            this.letters2.push({ value: this.fullText2[i], angle: this.getRandomAngle(40, 20), id: i, offset: [this.getRandomAngle(6, 3), this.getRandomAngle(10, 5)], dropped: false });
        }
    }

    getRandomAngle(range: number, offset: number): number {
        // Generate a random angle between -20 and 20 degrees
        return Math.random() * range - offset;
    }

    handleClick(letter: Letter) {
        console.log(letter);
        letter.dropped = true;
    }
}