import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModel } from 'src/app/models/commonModel';
import { LocalstorageHandlingService } from 'src/app/services/localstorage-handling.service';
import { RuntimeServiceService } from 'src/app/services/runtime-service.service';
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
    pageFound = false;
    letters1: Letter[] = [];
    letters2: Letter[] = [];
    readonly fullText1 = '404 Not Found!';
    readonly fullText2 = 'This page does not exist, oops!';

    constructor(
        private localstorageHandlingService: LocalstorageHandlingService,
        private toestQueueService: ToastQueueService,
        private router: Router,
        private runtimeService: RuntimeServiceService,
    ) { }

    goToLink(link: string | string[]): void {
        CommonModel.navigateToLink(this.router, link);
    }

    ngOnInit() {
        this.pageFound = false;
        this.letters1 = [];
        this.letters2 = [];
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
                this.localstorageHandlingService.immediatlyGoThroughQueue();
                this.toestQueueService.enqueueToast("You unlocked the \"404 Letters not found\" achievement!", 'achievement', 69420)
            }
            return;
        }
        const stringReturn2 = this.checkForCurrentSentence(false)
        if (stringReturn2.toLowerCase().includes(' sex ') || stringReturn == 'sex') {
            const handlerResponse = this.localstorageHandlingService.getLocalstorageHandler().checkAndLoad('easterEggs.Fancy404.theFunnyOne')
            if (handlerResponse == null || handlerResponse == false) {
                this.localstorageHandlingService.addEditRequestToQueue(true, 'easterEggs.Fancy404.theFunnyOne')
                this.localstorageHandlingService.immediatlyGoThroughQueue();
                this.toestQueueService.enqueueToast("You found the \"The Funny One\" easter egg!", 'achievement', 69420)
            }
        }
        if (!stringReturn.toLowerCase().includes('!') && !stringReturn.toLowerCase().includes(',')) {
            const handlerResponse = this.localstorageHandlingService.getLocalstorageHandler().checkAndLoad('easterEggs.Fancy404.noNeedToBeFormal')
            if (handlerResponse == null || handlerResponse == false) {
                this.localstorageHandlingService.addEditRequestToQueue(true, 'easterEggs.Fancy404.noNeedToBeFormal')
                this.localstorageHandlingService.immediatlyGoThroughQueue();
                this.toestQueueService.enqueueToast("You found the \"Who needs interpunction?\" easter egg!", 'achievement', 69420)
            }
        }
        if ((stringReturn.toLowerCase().startsWith('found') || stringReturn.toLowerCase().startsWith('404found')) && stringReturn.toLowerCase().includes('thispagedoesexist')) {
            this.pageFound = true;
            this.runtimeService.setVolume(0.2);
            this.runtimeService.playAudio('../../../assets/audio/can-we-get-much-higher-one-piece-meme.mp3');
            const handlerResponse = this.localstorageHandlingService.getLocalstorageHandler().checkAndLoad('easterEggs.Fancy404.OhWaitItDoesExist')
            if (handlerResponse == null || handlerResponse == false) {
                this.localstorageHandlingService.addEditRequestToQueue(true, 'easterEggs.Fancy404.OhWaitItDoesExist')
                this.localstorageHandlingService.immediatlyGoThroughQueue();
                this.toestQueueService.enqueueToast("You found the \"The One Page is real!\" easter egg!", 'achievement', 69420)
            }
        }

    }
}