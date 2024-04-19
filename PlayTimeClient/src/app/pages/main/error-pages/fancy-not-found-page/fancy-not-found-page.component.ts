import { Component, OnInit } from '@angular/core';
import { LocalstorageHandlingService } from 'src/app/services/localstorage-handling.service';
import { ToastQueueService } from 'src/app/services/toast-queue.service';

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
    letters1: Letter[] = [];
    letters2: Letter[] = [];
    readonly fullText1 = '404 Not Found!';
    readonly fullText2 = 'This page does not exist, oops!';

    constructor(
        private localstorageHandlingService: LocalstorageHandlingService,
        private toestQueueService: ToastQueueService,
    ) { }

    ngOnInit() {
        // Generate random angles for each letter
        for (let i = 0; i < this.fullText1.length; i++) { // Adjust this number according to the number of letters
            this.letters1.push({ value: this.fullText1[i], angle: this.getRandomAngle(40, 20), id: i, offset: [this.getRandomAngle(6, 3), this.getRandomAngle(10, 5)], dropped: false });
        }
        for (let i = 0; i < this.fullText2.length; i++) { // Adjust this number according to the number of letters
            this.letters2.push({ value: this.fullText2[i], angle: this.getRandomAngle(40, 20), id: i, offset: [this.getRandomAngle(6, 3), this.getRandomAngle(10, 5)], dropped: false });
        }
    }

    checkForCurrentSentence(ignoreSpaces: boolean): string {
        // adds letters1 and letters2 which are not dropped to a string
        let sentence = '';
        const lists = [this.letters1, this.letters2];

        for (let list of lists) {
            for (let i = 0; i < list.length; i++) {
                if ((ignoreSpaces || sentence.endsWith(' ')) && list[i].value === ' ') {
                    continue;
                }
                if (list[i].dropped) {
                    continue;
                }
                sentence += list[i].value;
            }
        }
        return sentence;
    }

    getRandomAngle(range: number, offset: number): number {
        // Generate a random angle between -20 and 20 degrees
        return Math.random() * range - offset;
    }

    handleClick(letter: Letter) {
        letter.dropped = true;
        const stringReturn = this.checkForCurrentSentence(true)
        if (stringReturn.length == 0) {
            const handlerResponse = this.localstorageHandlingService.getLocalstorageHandler().checkAndLoad('easterEggs.Fancy404.LettersNotFound')
            if (handlerResponse == null || handlerResponse == false) {
                this.localstorageHandlingService.addEditRequestToQueue(true, 'easterEggs.Fancy404.LettersNotFound')
                this.toestQueueService.enqueueToast("You found the '404 Letters not found' easter egg!", 'info', 5)
            }
            return;
        }
        const stringReturn2 = this.checkForCurrentSentence(false)
        if (stringReturn2.toLowerCase().includes(' sex ') || stringReturn == 'sex') {
            const handlerResponse = this.localstorageHandlingService.getLocalstorageHandler().checkAndLoad('easterEggs.Fancy404.theFunnyOne')
            if (handlerResponse == null || handlerResponse == false) {
                this.localstorageHandlingService.addEditRequestToQueue(true, 'easterEggs.Fancy404.theFunnyOne')
                this.toestQueueService.enqueueToast("You found the 'The Funny One' easter egg!", 'info', 5)
            }
        }
        if (!stringReturn.toLowerCase().includes('!') && !stringReturn.toLowerCase().includes(',')) {
            const handlerResponse = this.localstorageHandlingService.getLocalstorageHandler().checkAndLoad('easterEggs.Fancy404.noNeedToBeFormal')
            if (handlerResponse == null || handlerResponse == false) {
                this.localstorageHandlingService.addEditRequestToQueue(true, 'easterEggs.Fancy404.noNeedToBeFormal')
                this.toestQueueService.enqueueToast("You found the 'Who needs interpunction?' easter egg!", 'info', 5)
            }
        }

    }
}