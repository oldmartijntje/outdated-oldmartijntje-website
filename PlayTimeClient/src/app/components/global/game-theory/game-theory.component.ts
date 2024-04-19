import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageHandlingService } from 'src/app/services/localstorage-handling.service';
import { RuntimeServiceService } from 'src/app/services/runtime-service.service';
import { ToastQueueService } from 'src/app/services/toast-queue.service';

@Component({
    selector: 'app-game-theory',
    templateUrl: './game-theory.component.html',
    styleUrl: './game-theory.component.scss'
})
export class GameTheoryComponent {
    gameTheory: { [key: string]: any } = {
        clickedOrder: [],
        class: { '1': '', '2': '', '3': '', '4': '', 'trophy': '' },
        secretClickOrder: ['1', '2', '3', '4', 'middle'],
        found: false,
        pageConvertor: { '1': 'game', '2': 'film', '3': 'food', '4': 'style', 'middle': 'middle' },
        audioConvertor: { '1': '../../../../assets/audio/simon tune1.mp3', '2': '../../../../assets/audio/simon tune1.mp3', '3': '../../../../assets/audio/simon tune2.mp3', '4': '../../../../assets/audio/simon tune2.mp3', 'middle': '../../../../assets/audio/simon tune3.mp3' }
    }

    constructor(
        private router: Router,
        private runtimeService: RuntimeServiceService,
        private localstorageHandlingService: LocalstorageHandlingService,
        private toestQueueService: ToastQueueService,
    ) { }

    gameTheoryClicked(id: string): void {
        if (this.gameTheory['found']) {
            this.gameTheory['found'] = false;
            var page = '';
            this.runtimeService.setVolume(0.1);
            this.runtimeService.playAudio('../../../../assets/audio/simon tune4.mp3');
            if (id == 'middle') {
                const tempText = `${Math.floor(Math.random() * 4) + 1}`
                page = this.gameTheory['pageConvertor'][tempText];
            } else {
                page = this.gameTheory['pageConvertor'][id];
            }
            const handlerResponse = this.localstorageHandlingService.getLocalstorageHandler().checkAndLoad('easterEggs.matpatCircle')
            if (handlerResponse == null || handlerResponse == false) {
                this.localstorageHandlingService.addEditRequestToQueue(true, 'easterEggs.matpatCircle')
                this.toestQueueService.enqueueToast("You unlocked the \"It's just a theory!\" achievement!", 'achievement', 69420)
            }
            this.router.navigate(['/simonGame', page]);
            return;
        }
        this.runtimeService.setVolume(0.1);
        this.runtimeService.playAudio(this.gameTheory['audioConvertor'][id]);
        this.gameTheory['clickedOrder'].push(id);
        if (this.gameTheory['clickedOrder'].length > 5) {
            this.gameTheory['clickedOrder'].shift();
        }
        for (let key in this.gameTheory['class']) {
            if (key !== id) {
                this.gameTheory['class'][key] = '';
            }
        }
        if (id == 'middle') {
            for (let key in this.gameTheory['class']) {
                if (key !== id && key !== 'trophy') {
                    this.gameTheory['class'][key] = 'locked';
                }
            }
        }
        if (id != 'middle') {
            this.gameTheory['class'][id] = 'locked';
        } else if (JSON.stringify(this.gameTheory['clickedOrder']) === JSON.stringify(this.gameTheory['secretClickOrder'])) {
            this.gameTheory['found'] = true;
            this.gameTheory['class']['trophy'] = 'locked';
        }
    }
}
