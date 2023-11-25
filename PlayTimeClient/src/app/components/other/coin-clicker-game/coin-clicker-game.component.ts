import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { MarioClicker } from 'src/app/data/gamesData';
import { Encryptor } from 'src/app/models/encryptor';
import { AudioPlayerService } from 'src/app/services/audio-player.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-coin-clicker-game',
    templateUrl: './coin-clicker-game.component.html',
    styleUrls: ['./coin-clicker-game.component.scss']
})
export class CoinClickerGameComponent implements OnInit, OnDestroy {
    private intervalId: any;
    logButton = !environment["production"];
    clickerGame: Record<string, any> = {}
    defaultClickerGame: Record<string, any> = { ...MarioClicker }
    rename: Record<string, any> = {
        "coin": "../../../../assets/icons/Retro-Coin-icon.png",
        "life": "../../../../assets/icons/1up.png",
        "heart": "../../../../assets/icons/marioHeart.png",
        "powerHeart": "../../../../assets/icons/marioPowerHeart.png",
        "rebirth": "../../../../assets/icons/flag.png",
        "better-rebirth": "../../../../assets/icons/flag2.png",
    }
    deleteButton = 0;
    exportTextbox: string = "";

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

    addCoin(amount: number = 1, byClick: boolean = false) {
        this.checkTimer();
        this.clickerGame['discovery']['click'] = true;
        this.clickerGame['currency']['coin']['amount'] += amount;
        if (this.clickerGame['currency']['coin']['amount'] >= this.getMaximum("coin")) {

            var overflow = Math.floor(this.clickerGame['currency']['coin']['amount'] / this.getMaximum("coin"));
            this.clickerGame['currency']['coin']['amount'] -= overflow * this.getMaximum("coin");
            this.addLife(overflow, byClick)
        }
    }

    import(pure: boolean = false) {
        var encr = new Encryptor();
        if (pure) {
            this.clickerGame = JSON.parse(this.exportTextbox);
        } else {
            this.clickerGame = JSON.parse(encr.decryptString(this.exportTextbox));
        }
        this.checkContent();
        this.clickerGame['autoSave'] = 0;
    }

    export(pure: boolean = false) {
        var encr = new Encryptor();
        if (pure) {
            this.exportTextbox = JSON.stringify(this.clickerGame);
        } else {
            this.exportTextbox = encr.encryptString(JSON.stringify(this.clickerGame));
        }
    }

    getMaximum(type: string = "coin") {
        return this.clickerGame['upgrades']['maximum'][type] + this.clickerGame['currency'][type]['max'];
    }

    addLife(amount: number = 1, byClick: boolean = false) {
        this.clickerGame['discovery']['1up'] = true;
        if (byClick) {
            var temp = this.getVolume();
            this.setVolume(0.1);
            this.playAudio("../../../../assets/audio/mario-1-up.mp3");
        }
        this.clickerGame['currency']['life']['amount'] += amount
        if (this.clickerGame['currency']['life']['amount'] > this.getMaximum("life")) {
            this.clickerGame['currency']['life']['amount'] = this.getMaximum("life");
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
        for (var i = 0; i < Object.keys(this.deepClone(this.defaultClickerGame)["specialBuys"]).length; i++) {
            if (!this.clickerGame['specialBuys'].hasOwnProperty(Object.keys(this.deepClone(this.defaultClickerGame)["specialBuys"])[i])) {
                this.clickerGame['specialBuys'][Object.keys(this.deepClone(this.defaultClickerGame)["specialBuys"])[i]] = this.deepClone(this.defaultClickerGame)["specialBuys"][Object.keys(this.deepClone(this.defaultClickerGame)["specialBuys"])[i]];
            }
        }
        for (var i = 0; i < Object.keys(this.deepClone(this.defaultClickerGame)).length; i++) {
            if (!this.clickerGame.hasOwnProperty(Object.keys(this.deepClone(this.defaultClickerGame))[i])) {
                this.clickerGame[Object.keys(this.deepClone(this.defaultClickerGame))[i]] = this.deepClone(this.defaultClickerGame)[Object.keys(this.deepClone(this.defaultClickerGame))[i]];
            }
        }
        for (var i = 0; i < Object.keys(this.deepClone(this.defaultClickerGame)['upgrades']).length; i++) {
            if (!this.clickerGame['upgrades'].hasOwnProperty(Object.keys(this.deepClone(this.defaultClickerGame)['upgrades'])[i])) {
                this.clickerGame['upgrades'][Object.keys(this.deepClone(this.defaultClickerGame)['upgrades'])[i]] = this.deepClone(this.defaultClickerGame)['upgrades'][Object.keys(this.deepClone(this.defaultClickerGame)['upgrades'])[i]];
            }
        }
        for (var i = 0; i < Object.keys(this.deepClone(this.defaultClickerGame)['rebirthSettings']).length; i++) {
            if (!this.clickerGame['rebirthSettings'].hasOwnProperty(Object.keys(this.deepClone(this.defaultClickerGame)['rebirthSettings'])[i])) {
                this.clickerGame['rebirthSettings'][Object.keys(this.deepClone(this.defaultClickerGame)['rebirthSettings'])[i]] = this.deepClone(this.defaultClickerGame)['rebirthSettings'][Object.keys(this.deepClone(this.defaultClickerGame)['rebirthSettings'])[i]];
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
        // 0 = save, 1 = load, 2 = reset, 3 = reset but not cookie
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
        } else if (mode == 3) {
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

    ngOnDestroy() {
        this.stopLoop();
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
            if (this.clickerGame['perSecond']['coin']['amount'] >= this.getMaximum("coin")) {
                var overflow = Math.floor(this.clickerGame['perSecond']['coin']['amount'] / this.getMaximum("coin"));
                this.clickerGame['perSecond']['coin']['amount'] -= overflow * this.getMaximum("coin");
                this.clickerGame['discovery']['1up'] = true;
                this.clickerGame['perSecond']['life']['amount'] += overflow;
            }
            this.addCoin(this.clickerGame['perSecond']['coin']['amount'])
        }
        if (this.clickerGame['perSecond']['life']['amount'] > 0) {
            if (this.clickerGame['perSecond']['life']['amount'] > this.getMaximum("life")) {
                this.clickerGame['perSecond']['life']['amount'] = this.getMaximum("life");
            }
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
            if (this.clickerGame[dir][item].hasOwnProperty('run') && this.clickerGame[dir][item]['run'] == "rebirth") {
                this.clickerDataHandler(0);
            }
            var type = this.clickerGame[dir][item]['cost']['type'];
            var amount = this.clickerGame[dir][item]['cost']['amount'];
            if (this.clickerGame[dir][item]['cost']['mode'] == "once" && this.clickerGame['currency'][type]['amount'] >= this.roundDownWithDiscount(amount)) {
                this.clickerGame['currency'][type]['amount'] -= this.roundDownWithDiscount(amount);
                this.clickerGame[dir][item]['amount']++;
                this.clickerGame[dir][item]['cost']['amount'] = this.clickerGame[dir][item]['cost']['amount'] * this.clickerGame[dir][item]['costMultiplier'];
                if (this.clickerGame[dir][item]['cost']['amount'] == 0) {
                    this.clickerGame[dir][item]['cost']['amount'] = this.clickerGame[dir][item]['costMultiplier']
                }
                if (this.clickerGame['discovery'].hasOwnProperty(item)) {
                    this.clickerGame['discovery'][item] = true;
                }
                if (this.clickerGame[dir][item]['gives'] != undefined) {
                    var typeGain = this.clickerGame[dir][item]['gives']['type'];
                    if (this.clickerGame[dir][item]['gives']['mode'] == "perSecond") {
                        this.clickerGame['perSecond'][typeGain]['amount'] += this.totalAmountOfCurrency(this.clickerGame[dir][item]['gives']['amount']);
                    } else if (this.clickerGame[dir][item]['gives']['mode'] == "once") {
                        this.clickerGame['currency'][typeGain]['amount'] += this.totalAmountOfCurrency(this.clickerGame[dir][item]['gives']['amount']);
                    }
                    if (this.clickerGame[dir][item]['gives']["extra"] != undefined) {
                        var amountExtra = 0;
                        amountExtra = this.clickerGame[dir][item]['gives']["extra"] * this.clickerGame['currency'][type]['amount'];
                        this.clickerGame['currency'][type]['amount'] = 0;
                        if (this.clickerGame[dir][item]['gives']['mode'] == "perSecond") {
                            this.clickerGame['perSecond'][typeGain]['amount'] += amountExtra;
                        } else if (this.clickerGame[dir][item]['gives']['mode'] == "once") {
                            this.clickerGame['currency'][typeGain]['amount'] += amountExtra;
                        }
                    }
                }
                if (this.clickerGame[dir][item].hasOwnProperty('run')) {
                    this.runFunction(this.clickerGame['specialBuys'][item]['run'])
                }

            } else if (this.clickerGame[dir][item]['cost']['mode'] == "perSecond" && this.clickerGame['perSecond'][type]['amount'] >= this.roundDownWithDiscount(amount)) {
                this.clickerGame['perSecond'][type]['amount'] -= this.roundDownWithDiscount(amount);
                this.clickerGame[dir][item]['amount']++;
                this.clickerGame[dir][item]['cost']['amount'] = this.clickerGame[dir][item]['cost']['amount'] * this.clickerGame[dir][item]['costMultiplier'];
                if (this.clickerGame['discovery'].hasOwnProperty(item)) {
                    this.clickerGame['discovery'][item] = true;
                }
                if (this.clickerGame[dir][item]['gives'] != undefined) {
                    var typeGain = this.clickerGame[dir][item]['gives']['type'];
                    if (this.clickerGame[dir][item]['gives']['mode'] == "perSecond") {
                        this.clickerGame['perSecond'][typeGain]['amount'] += this.totalAmountOfCurrency(this.clickerGame[dir][item]['gives']['amount']);
                    } else if (this.clickerGame[dir][item]['gives']['mode'] == "once") {
                        this.clickerGame['currency'][typeGain]['amount'] += this.totalAmountOfCurrency(this.clickerGame[dir][item]['gives']['amount']);
                    }
                    if (this.clickerGame[dir][item]['gives']["extra"] != undefined) {
                        var amountExtra = 0;
                        amountExtra = this.clickerGame[dir][item]['gives']["extra"] * this.clickerGame['perSecond'][type]['amount'];
                        this.clickerGame['perSecond'][type]['amount'] = 0;
                        if (this.clickerGame[dir][item]['gives']['mode'] == "perSecond") {
                            this.clickerGame['perSecond'][typeGain]['amount'] += amountExtra;
                        } else if (this.clickerGame[dir][item]['gives']['mode'] == "once") {
                            this.clickerGame['currency'][typeGain]['amount'] += amountExtra;
                        }
                    }
                }
                if (this.clickerGame[dir][item].hasOwnProperty('run')) {
                    this.runFunction(this.clickerGame['specialBuys'][item]['run'])
                }
            }

        }
    }

    runFunction(cmd: string) {
        if (cmd == "rebirth") {
            this.rebirth("rebirth");
        } else if (cmd == "maximum+1000") {
            this.maximum(1000, 'all');
        } else if (cmd == "maximum-coin-100") {
            this.maximum(-100, 'coin');
        } else if (cmd == "+1") {
            this.getExtra(1);
        } else if (cmd == "+10") {
            this.getExtra(10);
        }
    }

    getExtra(amount: number) {
        this.clickerGame['upgrades']['extraPerBuy'] += amount;
    }

    totalAmountOfCurrency(amount: number = 0) {
        amount += this.clickerGame['upgrades']['extraPerBuy'];
        return amount;
    }

    maximum(amount: number = 1000, type: string = "coin") {
        if (type == "all") {
            for (var i = 0; i < Object.keys(this.clickerGame['currency']).length; i++) {
                if (this.clickerGame['currency'][Object.keys(this.clickerGame['currency'])[i]]['max'] != undefined) {
                    this.clickerGame['upgrades']['maximum'][Object.keys(this.clickerGame['currency'])[i]] += amount;
                }
            }
        } else {
            this.clickerGame['upgrades']['maximum'][type] += amount;
        }
    }

    rebirth(type: string = "rebirth") {
        var newGame = this.deepClone(this.defaultClickerGame);
        console.log(this.deepClone(this.clickerGame))
        if (this.clickerGame['rebirthSettings'][type]['reset']['currency']) {
            for (var i = 0; i < Object.keys(this.clickerGame['currency']).length; i++) {
                if (this.clickerGame['rebirthSettings'][type]['reset']['ignoreKeys'].includes(Object.keys(this.clickerGame['currency'])[i])) {
                    newGame['currency'][Object.keys(this.clickerGame['currency'])[i]] = this.deepClone(this.clickerGame['currency'][Object.keys(this.clickerGame['currency'])[i]]);
                }
            }
        } else {
            newGame['currency'] = this.deepClone(this.clickerGame['currency']);
        }
        if (this.clickerGame['rebirthSettings'][type]['reset']['discovery']) {
            for (var i = 0; i < Object.keys(this.clickerGame['discovery']).length; i++) {
                if (this.clickerGame['rebirthSettings'][type]['reset']['ignoreKeys'].includes(Object.keys(this.clickerGame['discovery'])[i])) {
                    newGame['discovery'][Object.keys(this.clickerGame['discovery'])[i]] = this.deepClone(this.clickerGame['discovery'][Object.keys(this.clickerGame['discovery'])[i]]);
                }
            }
        } else {
            newGame['discovery'] = this.deepClone(this.clickerGame['discovery']);
        }
        if (this.clickerGame['rebirthSettings'][type]['reset']['buys']) {
            for (var i = 0; i < Object.keys(this.clickerGame['buys']).length; i++) {
                if (this.clickerGame['rebirthSettings'][type]['reset']['ignoreKeys'].includes(Object.keys(this.clickerGame['buys'])[i])) {
                    newGame['buys'][Object.keys(this.clickerGame['buys'])[i]] = this.deepClone(this.clickerGame['buys'][Object.keys(this.clickerGame['buys'])[i]]);
                }
            }
        } else {
            newGame['buys'] = this.deepClone(this.clickerGame['buys']);
        }
        if (this.clickerGame['rebirthSettings'][type]['reset']['specialBuys']) {
            for (var i = 0; i < Object.keys(this.clickerGame['specialBuys']).length; i++) {
                if (this.clickerGame['rebirthSettings'][type]['reset']['ignoreKeys'].includes(Object.keys(this.clickerGame['specialBuys'])[i])) {
                    newGame['specialBuys'][Object.keys(this.clickerGame['specialBuys'])[i]] = this.deepClone(this.clickerGame['specialBuys'][Object.keys(this.clickerGame['specialBuys'])[i]]);
                }
            }
        } else {
            newGame['specialBuys'] = this.deepClone(this.clickerGame['specialBuys']);
        }
        if (this.clickerGame['rebirthSettings'][type]['reset']['perSecond']) {
            for (var i = 0; i < Object.keys(this.clickerGame['perSecond']).length; i++) {
                if (this.clickerGame['rebirthSettings'][type]['reset']['ignoreKeys'].includes(Object.keys(this.clickerGame['perSecond'])[i])) {
                    newGame['perSecond'][Object.keys(this.clickerGame['perSecond'])[i]] = this.deepClone(this.clickerGame['perSecond'][Object.keys(this.clickerGame['perSecond'])[i]]);
                }
            }
        } else {
            newGame['perSecond'] = this.deepClone(this.clickerGame['perSecond']);
        }
        if (this.clickerGame['rebirthSettings'][type]['reset']['rebirthSettings']) {
            for (var i = 0; i < Object.keys(this.clickerGame['rebirthSettings']).length; i++) {
                if (this.clickerGame['rebirthSettings'][type]['reset']['ignoreKeys'].includes(Object.keys(this.clickerGame['rebirthSettings'])[i])) {
                    newGame['rebirthSettings'][Object.keys(this.clickerGame['rebirthSettings'])[i]] = this.deepClone(this.defaultClickerGame['rebirthSettings'][Object.keys(this.clickerGame['rebirthSettings'])[i]]);
                }
            }
        } else {
            newGame['rebirthSettings'] = this.deepClone(this.clickerGame['rebirthSettings']);
        }
        if (this.clickerGame['rebirthSettings'][type]['reset']['upgrades']) {
            for (var i = 0; i < Object.keys(this.clickerGame['upgrades']).length; i++) {
                if (this.clickerGame['rebirthSettings'][type]['reset']['ignoreKeys'].includes(Object.keys(this.clickerGame['upgrades'])[i])) {
                    newGame['upgrades'][Object.keys(this.clickerGame['upgrades'])[i]] = this.deepClone(this.clickerGame['upgrades'][Object.keys(this.clickerGame['upgrades'])[i]]);
                }
            }
        } else {
            newGame['upgrades'] = this.deepClone(this.clickerGame['upgrades']);
        }
        newGame["toolTip"] = this.deepClone(this.clickerGame["toolTip"]);
        this.clickerGame = this.deepClone(newGame);
    }

    checkTimer() {
        if (this.intervalId == undefined) {
            this.startLoop();
        }
    }

    roundDown(value: number): number {
        return Math.floor(value);
    }

    roundDownWithDiscount(value: number): number {
        const baseCost: number = value;  // Replace with your actual base cost
        let totalDiscountedCost: number = 0;

        // Loop through each rebirth type
        for (const type of Object.keys(this.clickerGame['rebirthSettings'])) {
            const discount: number = this.clickerGame['rebirthSettings'][type]['discount'];
            const rebirthCount: number = this.clickerGame['currency'][type]['amount'];

            // Quadratic function parameters
            const a: number = -0.001;  // Adjust this coefficient for the desired shape of the parabola
            const b: number = discount;

            // Calculate the discounted cost using the quadratic function for the current rebirth type
            const discountedCostForType: number = a * rebirthCount ** 2 + b * rebirthCount;

            // Add the discounted cost for the current rebirth type to the total
            totalDiscountedCost += discountedCostForType;
        }
        totalDiscountedCost += baseCost;

        // Ensure the total cost doesn't go below 0
        // console.log(Math.max(totalDiscountedCost, 0), value)
        return Math.max(Math.floor(totalDiscountedCost), 0);
    }

    getObjectKeys(obj: Record<string, any>): string[] {
        return Object.keys(obj);
    }

    areAllDiscoveriesMet(item: string[] | string): boolean {
        if (typeof item == "string") {
            item = [item];
        }
        for (var i = 0; i < item.length; i++) {
            if (!this.clickerGame['discovery'].hasOwnProperty(item[i])) {
                return false;
            }
            if (!this.clickerGame['discovery'][item[i]]) {
                return false;
            }
        }
        return true;
    }
}
