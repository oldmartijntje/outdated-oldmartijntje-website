// hover-glitch-text.component.ts

import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-hover-glitch-text',
    templateUrl: './hover-glitch-text.component.html',
    styleUrls: ['./hover-glitch-text.component.scss']
})
export class HoverGlitchTextComponent {
    @Input() displayText: string = '';
    @Input() displayTextStyle: { [key: string]: string } = {
        'padding': '0rem clamp(1rem, 2vw, 3rem)',
        'border-radius': 'clamp(0.4rem, 0.75vw, 1rem)',
        'font-size': 'clamp(3rem, 10vw, 10rem)'
    };
    private readonly letters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    private readonly ingoreCharacters: string = ' ,.!?:;()[]{}\'"';
    private interval: any = null;

    onMouseOver(event: MouseEvent): void {
        const dynamicIncrement = 1 / (33 / this.displayText.length);
        let iteration = 0 - dynamicIncrement * 15;

        clearInterval(this.interval);

        this.interval = setInterval(() => {
            (event.target as HTMLElement).innerText = (event.target as HTMLElement)
                .innerText.split('')
                .map((letter, index) => {
                    if (index < iteration) {
                        return this.displayText[index].toLocaleUpperCase();
                    }
                    if (this.ingoreCharacters.includes(this.displayText[index])) {
                        return this.displayText[index];
                    }

                    return this.letters[Math.floor(Math.random() * this.letters.length)].toLocaleUpperCase();
                })
                .join('');

            if (iteration >= this.displayText.length) {
                clearInterval(this.interval);
            }
            iteration += dynamicIncrement;
        }, 30);
    }
}
