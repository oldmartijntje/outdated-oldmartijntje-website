import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { MarioClicker } from 'src/app/data/gamesData';
import { LocalstorageHandlingService } from 'src/app/services/localstorage-handling.service';
import { RuntimeServiceService } from 'src/app/services/runtime-service.service';
import { ToastQueueService } from 'src/app/services/toast-queue.service';
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
        "coin": "https://oldmartijntje.github.io/outdated-oldmartijntje-website/assets/icons/Retro-Coin-icon.png",
        "life": "https://oldmartijntje.github.io/outdated-oldmartijntje-website/assets/icons/1up.png",
        "heart": "https://oldmartijntje.github.io/outdated-oldmartijntje-website/assets/icons/marioHeart.png",
        "powerHeart": "https://oldmartijntje.github.io/outdated-oldmartijntje-website/assets/icons/marioPowerHeart.png",
        "rebirth": "https://oldmartijntje.github.io/outdated-oldmartijntje-website/assets/icons/flag.png",
        "better-rebirth": "https://oldmartijntje.github.io/outdated-oldmartijntje-website/assets/icons/flag2.png",
    }
    deleteButton = 0;
    exportTextbox: string = "";

    constructor(
        private runtimeService: RuntimeServiceService,
        private ngZone: NgZone,
        private localstorageHandlingService: LocalstorageHandlingService,
        private toastQueueService: ToastQueueService
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
            const handlerResponse = this.localstorageHandlingService.getLocalstorageHandler().checkAndLoad('easterEggs.ClickerGame.1up')
            if (handlerResponse == null || handlerResponse == false) {
                this.localstorageHandlingService.addEditRequestToQueue(true, 'easterEggs.ClickerGame.1up')
                this.localstorageHandlingService.immediatlyGoThroughQueue();
                this.toastQueueService.enqueueToast("You found the \"What a deal!\" Achievement!", 'achievement', 69420)
            }
        }
    }

    import() {
        if (this.exportTextbox == "") {
            return;
        }
        this.clickerGame = JSON.parse(this.exportTextbox);
        this.checkContent();
        this.clickerGame['autoSave'] = 0;
        this.exportTextbox = "";
    }

    export() {

        this.exportTextbox = JSON.stringify(this.clickerGame);

    }

    getMaximum(type: string = "coin") {
        return this.clickerGame['upgrades']['maximum'][type] + this.clickerGame['currency'][type]['max'];
    }

    addLife(amount: number = 1, byClick: boolean = false) {
        this.clickerGame['discovery']['1up'] = true;
        if (byClick) {
            var temp = this.getVolume();
            this.setVolume(0.1);
            this.playAudio("https://oldmartijntje.github.io/outdated-oldmartijntje-website/assets/audio/mario-1-up.mp3");
        }
        this.clickerGame['currency']['life']['amount'] += amount
        if (this.clickerGame['currency']['life']['amount'] > this.getMaximum("life")) {
            this.clickerGame['currency']['life']['amount'] = this.getMaximum("life");
        }
    }

    playAudio(url: string): void {
        this.runtimeService.playAudio(url);
    }

    pauseAudio(): void {
        this.runtimeService.pauseAudio();
    }

    setVolume(volume: number): void {
        this.runtimeService.setVolume(volume);
    }

    getVolume(): number {
        return this.runtimeService.getVolume();
    }

    checkContent() {
        const check = ["currency", "discovery", "buys", "specialBuys", "perSecond", "rebirthSettings", "upgrades"];
        for (var i = 0; i < check.length; i++) {
            if (!this.clickerGame.hasOwnProperty(check[i])) {
                for (var i = 0; i < Object.keys(this.deepClone(this.defaultClickerGame)[check[i]]).length; i++) {
                    if (!this.clickerGame[check[i]].hasOwnProperty(Object.keys(this.deepClone(this.defaultClickerGame)[check[i]])[i])) {
                        this.clickerGame[check[i]][Object.keys(this.deepClone(this.defaultClickerGame)[check[i]])[i]] = this.deepClone(this.defaultClickerGame)[check[i]][Object.keys(this.deepClone(this.defaultClickerGame)[check[i]])[i]];
                    }
                }
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
        // 0 = save, 1 = load, 2 = reset, 3 = reset but not cookie
        if (mode == 0) {

            this.localstorageHandlingService.addEditRequestToQueue(this.clickerGame, "data", "ClickerGame.appData.oldmartijntje.nl");
            this.localstorageHandlingService.immediatlyGoThroughQueue();
            this.clickerGame['autoSave'] = 0;
        } else if (mode == 1) {
            const response = this.localstorageHandlingService.getLocalstorageHandler().loadData("data", "ClickerGame.appData.oldmartijntje.nl");
            if (response.success) {
                try {
                    this.clickerGame = response.data;
                    this.checkContent();
                } catch (error) {
                    console.error("The save file is corrupted, resetting the save file...\nIt's not overwritten yet, so save it whilst you can!\n" + error);
                    this.clickerGame = this.deepClone(this.defaultClickerGame);
                }

                const handlerResponse = this.localstorageHandlingService.getLocalstorageHandler().checkAndLoad('easterEggs.ClickerGame.welcomeBack')
                if (handlerResponse == null || handlerResponse == false) {
                    this.localstorageHandlingService.addEditRequestToQueue(true, 'easterEggs.ClickerGame.welcomeBack')
                    this.localstorageHandlingService.immediatlyGoThroughQueue();
                    this.toastQueueService.enqueueToast("You found the \"I shall return!\" Achievement!", 'achievement', 69420)
                }

            } else {
                this.clickerGame = this.deepClone(this.defaultClickerGame);
            }
            this.clickerGame['autoSave'] = 0;
        } else if (mode == 2) {
            this.localstorageHandlingService.addDeleteRequestToQueue("data", "ClickerGame.appData.oldmartijntje.nl");

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
            var buyType = "";
            if (this.clickerGame[dir][item]['cost']['mode'] == "once" && this.clickerGame['currency'][type]['amount'] >= this.roundDownWithDiscount(amount)) {
                buyType = "currency";
            } else if (this.clickerGame[dir][item]['cost']['mode'] == "perSecond" && this.clickerGame['perSecond'][type]['amount'] >= this.roundDownWithDiscount(amount)) {
                buyType = "perSecond";
            }
            if (buyType == "") {
                return;
            }
            this.checkForAchievement();
            this.clickerGame[buyType][type]['amount'] -= this.roundDownWithDiscount(amount);
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
                    this.clickerGame[buyType][typeGain]['amount'] += this.totalAmountOfCurrency(this.clickerGame[dir][item]['gives']['amount']);
                }
                if (this.clickerGame[dir][item]['gives']["extra"] != undefined) {
                    var amountExtra = 0;
                    amountExtra = this.clickerGame[dir][item]['gives']["extra"] * this.clickerGame[buyType][type]['amount'];
                    this.clickerGame[buyType][type]['amount'] = 0;
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
        const check = ["currency", "discovery", "buys", "specialBuys", "perSecond", "rebirthSettings", "upgrades"];
        for (var i = 0; i < check.length; i++) {
            if (!this.clickerGame.hasOwnProperty(check[i])) {
                for (var i = 0; i < Object.keys(this.deepClone(this.defaultClickerGame)[check[i]]).length; i++) {
                    if (!this.clickerGame[check[i]].hasOwnProperty(Object.keys(this.deepClone(this.defaultClickerGame)[check[i]])[i])) {
                        this.clickerGame[check[i]][Object.keys(this.deepClone(this.defaultClickerGame)[check[i]])[i]] = this.deepClone(this.defaultClickerGame)[check[i]][Object.keys(this.deepClone(this.defaultClickerGame)[check[i]])[i]];
                    }
                }
            } else {
                newGame[check[i]] = this.deepClone(this.clickerGame[check[i]]);
            }
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
        try {
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
        } catch (error) {
            return value;
        }

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

    checkForAchievement() {
        const handlerResponse2 = this.localstorageHandlingService.getLocalstorageHandler().checkAndLoad('easterEggs.ClickerGame.shopaholic')
        if (handlerResponse2 == null || handlerResponse2 == false) {
            this.localstorageHandlingService.addEditRequestToQueue(1, 'easterEggs.ClickerGame.shopaholic')
        } else if (handlerResponse2 < 50) {
            if (handlerResponse2 + 1 == 50) {
                this.toastQueueService.enqueueToast("You found the \"Shopaholic\" Achievement!", 'achievement', 69420)
            }
            this.localstorageHandlingService.addEditRequestToQueue(handlerResponse2 + 1, 'easterEggs.ClickerGame.shopaholic');
            this.localstorageHandlingService.immediatlyGoThroughQueue();
        }

    }
}
