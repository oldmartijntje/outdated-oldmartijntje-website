import { Component, NgZone, OnInit } from '@angular/core';
import { Settings } from 'src/app/data/settings';
import { BuildData } from 'src/app/models/buildData';
import { AudioPlayerService } from 'src/app/services/audio-player.service';
import { MarioClickerMain } from 'src/app/data/gamesData';
import { environment } from 'src/environments/environment';
import { AdHandler } from 'src/app/models/adHandler';
import { Encryptor } from 'src/app/models/encryptor';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
    private intervalId: any;
    logButton = !environment["production"];
    clickerGame: Record<string, any> = {}
    defaultClickerGame: Record<string, any> = { ...MarioClickerMain }
    rename: Record<string, any> = {
        "coin": "../../../../assets/icons/Retro-Coin-icon.png",
        "life": "../../../../assets/icons/1up.png",
        "heart": "../../../../assets/icons/marioHeart.png",
        "powerHeart": "../../../../assets/icons/marioPowerHeart.png",
        "rebirth": "../../../../assets/icons/flag.png",
    }
    versionNumber = BuildData["BuildNumber"];
    versionWord = "BuildId";
    deleteButton = 0;

    constructor(
        private audioPlayerService: AudioPlayerService,
        private ngZone: NgZone
    ) {

    }
    ngOnInit(): void {
        this.clickerDataHandler(1);
        this.checkContent();
        if (this.clickerGame['discovery']['click']) {
            this.startLoop();
        }
        // var encr = new Encryptor();
        // var a = encr.encryptString("test");
        // console.log(a);
        // console.log(encr.decryptString(a));
    }




    getObjectKeys(obj: Record<string, any>): string[] {
        return Object.keys(obj);
    }

    ngOnDestroy() {
        this.stopLoop();
    }

    logBuildData() {
        console.log(BuildData);
    }

    addCoin(amount: number = 1, byClick: boolean = false) {
        this.checkTimer();
        this.clickerGame['discovery']['click'] = true;
        this.clickerGame['currency']['coin']['amount'] += amount;
        if (this.clickerGame['currency']['coin']['amount'] >= this.clickerGame['currency']['coin']['max']) {

            var overflow = Math.floor(this.clickerGame['currency']['coin']['amount'] / this.clickerGame['currency']['coin']['max']);
            this.clickerGame['currency']['coin']['amount'] -= overflow * this.clickerGame['currency']['coin']['max'];
            this.addLife(overflow, byClick)
        }
    }

    addLife(amount: number = 1, byClick: boolean = false) {
        this.clickerGame['discovery']['1up'] = true;
        if (byClick) {
            var temp = this.getVolume();
            this.setVolume(0.1);
            this.playAudio("../../../../assets/audio/mario-1-up.mp3");
        }
        this.clickerGame['currency']['life']['amount'] += amount
        if (this.clickerGame['currency']['life']['amount'] > this.clickerGame['currency']['life']['max']) {
            this.clickerGame['currency']['life']['amount'] = this.clickerGame['currency']['life']['max'];
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

    checkContent() {
        for (var i = 0; i < Object.keys(this.deepClone(this.defaultClickerGame)["buys"]).length; i++) {
            if (!this.clickerGame['buys'].hasOwnProperty(Object.keys(this.deepClone(this.defaultClickerGame)["buys"])[i])) {
                this.clickerGame['buys'][Object.keys(this.deepClone(this.defaultClickerGame)["buys"])[i]] = this.deepClone(this.defaultClickerGame)["buys"][Object.keys(this.deepClone(this.defaultClickerGame)["buys"])[i]];
            }
        }
        for (var i = 0; i < Object.keys(this.deepClone(this.defaultClickerGame)).length; i++) {
            if (!this.clickerGame.hasOwnProperty(Object.keys(this.deepClone(this.defaultClickerGame))[i])) {
                this.clickerGame[Object.keys(this.deepClone(this.defaultClickerGame))[i]] = this.deepClone(this.defaultClickerGame)[Object.keys(this.deepClone(this.defaultClickerGame))[i]];
            }
        }
    }

    deepClone(obj: Record<string, any>): Record<string, any> {
        return JSON.parse(JSON.stringify(obj));
    }

    resetGame() {
        this.deleteButton += 5;
        if (this.deleteButton > 5) {
            this.clickerDataHandler(2);
        }
    }

    clickerDataHandler(mode: number = 0) {
        // 0 = save, 1 = load, 2 = reset
        var encr = new Encryptor();
        if (mode == 0) {
            localStorage.setItem("clickerGame", encr.encryptString(JSON.stringify(this.clickerGame)));
            this.clickerGame['autoSave'] = 0;
        } else if (mode == 1) {
            var data = localStorage.getItem("clickerGame")
            if (data != null) {
                try {
                    this.clickerGame = JSON.parse(encr.decryptString(data));
                    this.checkContent();
                } catch (error) {
                    console.error("The save file is corrupted, resetting the save file...\nIt's not overwritten yet, so save it whilst you can!\n" + error);
                    this.clickerGame = this.deepClone(this.defaultClickerGame);
                }

            } else {
                this.clickerGame = this.deepClone(this.defaultClickerGame);
            }
            this.clickerGame['autoSave'] = 0;
        } else if (mode == 2) {
            localStorage.removeItem("clickerGame");
            this.clickerGame = this.deepClone(this.defaultClickerGame);
            this.clickerGame['autoSave'] = 0;
        }
    }

    logGame() {
        console.log(this.clickerGame);
    }

    startLoop() {
        this.intervalId = setInterval(() => {
            this.ngZone.run(() => {
                this.perSecond();
            });
        }, 1000);
    }

    stopLoop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    getIcon(type: string): string | boolean {
        if (this.rename.hasOwnProperty(type.toLocaleLowerCase())) {
            return this.rename[type];
        } else {
            return false;
        }
    }

    addCurrency(amount: number = 1, type: string = "heart") {
        this.clickerGame['currency'][type]['amount'] += amount;
    }

    perSecond() {
        if (this.deleteButton > 0) {
            this.deleteButton--;
        }
        if (this.clickerGame['perSecond']['coin']['amount'] > 0) {
            if (this.clickerGame['perSecond']['coin']['amount'] >= this.clickerGame['currency']['coin']['max']) {
                var overflow = Math.floor(this.clickerGame['perSecond']['coin']['amount'] / this.clickerGame['currency']['coin']['max']);
                this.clickerGame['perSecond']['coin']['amount'] -= overflow * this.clickerGame['currency']['coin']['max'];
                this.clickerGame['discovery']['1up'] = true;
                this.clickerGame['perSecond']['life']['amount'] += overflow;
                if (this.clickerGame['perSecond']['life']['amount'] > this.clickerGame['perSecond']['life']['max']) {
                    this.clickerGame['perSecond']['life']['amount'] = this.clickerGame['perSecond']['life']['max'];
                }
            }
            this.addCoin(this.clickerGame['perSecond']['coin']['amount'])
        }
        if (this.clickerGame['perSecond']['life']['amount'] > 0) {
            this.addLife(this.clickerGame['perSecond']['life']['amount'])
        }
        if (this.clickerGame['perSecond']['heart']['amount'] > 0) {
            this.addCurrency(this.clickerGame['perSecond']['heart']['amount'], 'heart')
        }
        if (this.clickerGame['perSecond']['powerHeart']['amount'] > 0) {
            this.addCurrency(this.clickerGame['perSecond']['powerHeart']['amount'], 'powerHeart')
        }
        if (this.clickerGame['autoSave'] >= this.clickerGame['autoSaveCooldwon']) {
            this.clickerDataHandler(0);
        }
        this.clickerGame['autoSave']++;
    }

    buyItem(item: string) {
        var dir = "";
        if (this.clickerGame['buys'].hasOwnProperty(item)) {
            dir = "buys";
        } else if (this.clickerGame['specialBuys'].hasOwnProperty(item)) {
            dir = "specialBuys";
        }
        if (dir != "") {
            var type = this.clickerGame[dir][item]['cost']['type'];
            var amount = this.clickerGame[dir][item]['cost']['amount'];
            if (this.clickerGame[dir][item]['cost']['mode'] == "once" && this.clickerGame['currency'][type]['amount'] >= this.roundDown(amount)) {
                this.clickerGame['currency'][type]['amount'] -= this.roundDown(amount);
                this.clickerGame[dir][item]['amount']++;
                this.clickerGame[dir][item]['cost']['amount'] = this.clickerGame[dir][item]['cost']['amount'] * this.clickerGame[dir][item]['costMultiplier'];
                var typeGain = this.clickerGame[dir][item]['gives']['type'];
                if (this.clickerGame[dir][item]['gives']['mode'] == "perSecond") {
                    this.clickerGame['perSecond'][typeGain]['amount'] += this.clickerGame[dir][item]['gives']['amount'];
                } else if (this.clickerGame[dir][item]['gives']['mode'] == "once") {
                    this.clickerGame['currency'][typeGain]['amount'] += this.clickerGame[dir][item]['gives']['amount'];
                }
                if (this.clickerGame['discovery'].hasOwnProperty(item)) {
                    this.clickerGame['discovery'][item] = true;
                }
            } else if (this.clickerGame[dir][item]['cost']['mode'] == "perSecond" && this.clickerGame['perSecond'][type]['amount'] >= this.roundDown(amount)) {
                this.clickerGame['perSecond'][type]['amount'] -= this.roundDown(amount);
                this.clickerGame[dir][item]['amount']++;
                this.clickerGame[dir][item]['cost']['amount'] = this.clickerGame[dir][item]['cost']['amount'] * this.clickerGame[dir][item]['costMultiplier'];
                var typeGain = this.clickerGame[dir][item]['gives']['type'];
                if (this.clickerGame[dir][item]['gives']['mode'] == "perSecond") {
                    this.clickerGame['perSecond'][typeGain]['amount'] += this.clickerGame[dir][item]['gives']['amount'];
                } else if (this.clickerGame[dir][item]['gives']['mode'] == "once") {
                    this.clickerGame['currency'][typeGain]['amount'] += this.clickerGame[dir][item]['gives']['amount'];
                }
                if (this.clickerGame['discovery'].hasOwnProperty(item)) {
                    this.clickerGame['discovery'][item] = true;
                }
            }
            if (dir == "specialBuys" && this.clickerGame['specialBuys'][item].hasOwnProperty('run')) {
                this.runFunction(this.clickerGame['specialBuys'][item]['run'])
            }
        }
    }

    runFunction(cmd: string) {
        if (cmd == "rebirth") {
            this.rebirth();
        }
    }

    rebirth() {

    }

    checkTimer() {
        if (this.intervalId == undefined) {
            this.startLoop();
        }
    }

    roundDown(value: number): number {
        return Math.floor(value);
    }
}
