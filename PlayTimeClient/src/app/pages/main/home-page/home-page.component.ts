import { Component, NgZone } from '@angular/core';
import { Settings } from 'src/app/data/settings';
import { BuildData } from 'src/app/models/buildData';
import { AudioPlayerService } from 'src/app/services/global/audio-player.service';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
    clickerGame = {
        "coin": 0,
        "life": 0,
        "discovery": {
            "1up": false,
            "goomba": false
        },
        "buys": {
            "goomba": {
                "cost": 1,
                "amount": 0,
                "multiplier": 1.25
            }
        },
        "perSecond": 0,
    }
    versionNumber = BuildData["BuildNumber"];
    versionWord = "BuildId";

    constructor(
        private audioPlayerService: AudioPlayerService,
        private ngZone: NgZone
    ) {

    }

    logBuildData() {
        console.log(BuildData);
    }

    addCoin(amount: number = 1) {
        this.clickerGame['coin'] += amount;
        if (this.clickerGame['coin'] > 99) {
            this.clickerGame['coin'] -= 100;
            this.clickerGame['discovery']['1up'] = true;
            var temp = this.getVolume();
            this.setVolume(0.1);
            this.playAudio("../../../../assets/audio/mario-1-up.mp3");
            if (this.clickerGame['life'] < 99) {
                this.clickerGame['life']++;
            }
        }
    }

    playAudio(url: string): void {
        this.audioPlayerService.playAudio(url);
    }

    pauseAudio(): void {
        this.audioPlayerService.pauseAudio();
    }

    setVolume(volume: number): void {
        this.audioPlayerService.setVolume(volume);
    }

    getVolume(): number {
        return this.audioPlayerService.getVolume();
    }

    saveClickerData() {

    }

    startLoop() {
        setInterval(() => {
            this.ngZone.run(() => {
                this.myFunction();
            });
        }, 1000);
    }

    myFunction() {
        // Your function logic goes here
        this.addCoin(this.clickerGame['perSecond'])
        console.log('Function executed');
    }
}
