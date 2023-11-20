import { Component, NgZone, OnInit } from '@angular/core';
import { Settings } from 'src/app/data/settings';
import { BuildData } from 'src/app/models/buildData';
import { AudioPlayerService } from 'src/app/services/global/audio-player.service';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
    private intervalId: any;
    logButton = false;
    clickerGame: Record<string, any> = {}
    defaultClickerGame: Record<string, any> = {
        "coin": 0,
        "life": 0,
        "heart": 0,
        "powerHeart": 0,
        "discovery": {
            "click": false,
            "1up": false,
            "mini goomba": false,
            "goomba": false,
            "koopa": false,
            "para-koopa": false,
            "dry-bones": false,
            "para-dry-bones": false,

        },
        "buys": {
            "mini goomba": {
                "cost": {
                    "amount": 1,
                    "type": "life",
                    "mode": "once"
                },
                "amount": 0,
                "costMultiplier": 1.25,
                "gives": {
                    "amount": 1,
                    "type": "coin",
                    "mode": "perSecond"
                },
                "requires": "1up"
            },
            "goomba": {
                "cost": {
                    "amount": 5,
                    "type": "life",
                    "mode": "once"
                },
                "amount": 0,
                "costMultiplier": 1.25,
                "gives": {
                    "amount": 10,
                    "type": "coin",
                    "mode": "perSecond"
                },
                "requires": "mini goomba"
            },
            "koopa": {
                "cost": {
                    "amount": 69,
                    "type": "life",
                    "mode": "once"
                },
                "amount": 0,
                "costMultiplier": 1.25,
                "gives": {
                    "amount": 1,
                    "type": "life",
                    "mode": "perSecond"
                },
                "requires": "goomba"
            },
            "para-koopa": {
                "cost": {
                    "amount": 50,
                    "type": "life",
                    "mode": "once"
                },
                "amount": 0,
                "costMultiplier": 1.05,
                "gives": {
                    "amount": 1,
                    "type": "heart",
                    "mode": "once"
                },
                "requires": "goomba"
            },
            "dry-bones": {
                "cost": {
                    "amount": 5,
                    "type": "heart",
                    "mode": "once"
                },
                "amount": 0,
                "costMultiplier": 1.05,
                "gives": {
                    "amount": 10,
                    "type": "life",
                    "mode": "perSecond"
                },
                "requires": "para-koopa"
            },
            "para-dry-bones": {
                "cost": {
                    "amount": 10,
                    "type": "heart",
                    "mode": "once"
                },
                "amount": 0,
                "costMultiplier": 1.1,
                "gives": {
                    "amount": 20,
                    "type": "life",
                    "mode": "perSecond"
                },
                "requires": "dry-bones"
            },
            "hammer-Bro": {
                "cost": {
                    "amount": 10,
                    "type": "life",
                    "mode": "perSecond"
                },
                "amount": 0,
                "costMultiplier": 1.15,
                "gives": {
                    "amount": 1,
                    "type": "heart",
                    "mode": "perSecond"
                },
                "requires": "dry-bones"
            },
        },
        "perSecond": {
            "coin": 0,
            "life": 0,
            "heart": 0,
            "powerHeart": 0,
        },
        "autoSave": 0
    }
    rename: Record<string, any> = {
        "coin": "../../../../assets/icons/Retro-Coin-icon.png",
        "life": "../../../../assets/icons/1up.png",
        "heart": "../../../../assets/icons/marioHeart.png",
        "powerHeart": "../../../../assets/icons/marioPowerHeart.png",
    }
    versionNumber = BuildData["BuildNumber"];
    versionWord = "BuildId";

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
        this.clickerGame['coin'] += amount;
        while (this.clickerGame['coin'] >= 100) {
            this.clickerGame['coin'] -= 100;
            this.clickerGame['discovery']['1up'] = true;
            if (byClick) {
                var temp = this.getVolume();
                this.setVolume(0.1);
                this.playAudio("../../../../assets/audio/mario-1-up.mp3");
            }
            if (this.clickerGame['life'] < 99) {
                this.clickerGame['life']++;
            }
        }
    }

    addLife(amount: number = 1, byClick: boolean = false) {
        this.clickerGame['discovery']['1up'] = true;
        if (byClick) {
            var temp = this.getVolume();
            this.setVolume(0.1);
            this.playAudio("../../../../assets/audio/mario-1-up.mp3");
        }
        this.clickerGame['life'] += amount
        if (this.clickerGame['life'] > 999) {
            this.clickerGame['life'] = 999;
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
        for (var i = 0; i < Object.keys(this.defaultClickerGame["buys"]).length; i++) {
            if (!this.clickerGame['buys'].hasOwnProperty(Object.keys(this.defaultClickerGame["buys"])[i])) {
                this.clickerGame['buys'][Object.keys(this.defaultClickerGame["buys"])[i]] = this.defaultClickerGame["buys"][Object.keys(this.defaultClickerGame["buys"])[i]];
            }
        }
        for (var i = 0; i < Object.keys(this.defaultClickerGame).length; i++) {
            if (!this.clickerGame.hasOwnProperty(Object.keys(this.defaultClickerGame)[i])) {
                this.clickerGame[Object.keys(this.defaultClickerGame)[i]] = this.defaultClickerGame[Object.keys(this.defaultClickerGame)[i]];
            }
        }
    }

    clickerDataHandler(mode: number = 0) {
        // 0 = save, 1 = load, 2 = reset
        if (mode == 0) {
            localStorage.setItem("clickerGame", JSON.stringify(this.clickerGame));
            this.clickerGame['autoSave'] = 0;
        } else if (mode == 1) {
            var data = localStorage.getItem("clickerGame")
            if (data != null) {
                this.clickerGame = JSON.parse(data);
                this.checkContent();
            } else {
                this.clickerGame = this.defaultClickerGame;
            }
            this.clickerGame['autoSave'] = 0;
        } else if (mode == 2) {
            this.clickerGame = this.defaultClickerGame;
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
        if (this.rename.hasOwnProperty(type)) {
            return this.rename[type];
        } else {
            return false;
        }
    }

    perSecond() {
        if (this.clickerGame['perSecond']['coin'] > 0) {
            while (this.clickerGame['perSecond']['coin'] >= 100) {
                this.clickerGame['perSecond']['coin'] -= 100;
                this.clickerGame['discovery']['1up'] = true;
                if (this.clickerGame['perSecond']['life'] < 99) {
                    this.clickerGame['perSecond']['life']++;
                }
            }
            this.addCoin(this.clickerGame['perSecond']['coin'])
        }
        if (this.clickerGame['perSecond']['life'] > 0) {
            this.addLife(this.clickerGame['perSecond']['life'])
        }
        if (this.clickerGame['autoSave'] >= 120) {
            this.clickerDataHandler(0);
        }
        this.clickerGame['autoSave']++;
    }

    buyItem(item: string) {
        if (this.clickerGame['buys'].hasOwnProperty(item)) {
            var type = this.clickerGame['buys'][item]['cost']['type'];
            var amount = this.clickerGame['buys'][item]['cost']['amount'];
            if (this.clickerGame['buys'][item]['cost']['mode'] == "once" && this.clickerGame[type] >= Math.floor(amount)) {
                this.clickerGame[type] -= Math.floor(amount);
                this.clickerGame['buys'][item]['amount']++;
                this.clickerGame['buys'][item]['cost']['amount'] = this.clickerGame['buys'][item]['cost']['amount'] * this.clickerGame['buys'][item]['costMultiplier'];
                var typeGain = this.clickerGame['buys'][item]['gives']['type'];
                if (this.clickerGame['buys'][item]['gives']['mode'] == "perSecond") {
                    this.clickerGame['perSecond'][typeGain] += this.clickerGame['buys'][item]['gives']['amount'];
                } else if (this.clickerGame['buys'][item]['gives']['mode'] == "once") {
                    this.clickerGame[typeGain] += this.clickerGame['buys'][item]['gives']['amount'];
                }
                if (this.clickerGame['discovery'].hasOwnProperty(item)) {
                    this.clickerGame['discovery'][item] = true;
                }
            } else if (this.clickerGame['buys'][item]['cost']['mode'] == "once" && this.clickerGame['perSecond'][type] >= Math.floor(amount)) {
                this.clickerGame['perSecond'][type] -= Math.floor(amount);
                this.clickerGame['buys'][item]['amount']++;
                this.clickerGame['buys'][item]['cost']['amount'] = this.clickerGame['buys'][item]['cost']['amount'] * this.clickerGame['buys'][item]['costMultiplier'];
                var typeGain = this.clickerGame['buys'][item]['gives']['type'];
                if (this.clickerGame['buys'][item]['gives']['mode'] == "perSecond") {
                    this.clickerGame['perSecond'][typeGain] += this.clickerGame['buys'][item]['gives']['amount'];
                } else if (this.clickerGame['buys'][item]['gives']['mode'] == "once") {
                    this.clickerGame[typeGain] += this.clickerGame['buys'][item]['gives']['amount'];
                }
                if (this.clickerGame['discovery'].hasOwnProperty(item)) {
                    this.clickerGame['discovery'][item] = true;
                }
            }

        }
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
