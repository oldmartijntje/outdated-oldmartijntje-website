// game-list.component.ts
import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { games } from 'src/app/data/homescreenItems';
import { CommonModel } from 'src/app/models/commonModel';
import { Game, GameInfo, GameSettings } from 'src/app/models/homescreenItems.interface';

@Component({
    selector: 'app-game-list',
    templateUrl: './game-list.component.html',
    styleUrls: ['./game-list.component.scss'],
})
export class GameListComponent implements OnInit {
    @ViewChild('gameList', { static: false }) scrollContainer!: ElementRef;
    @Input() applicationList: Game[] = [];
    @Input() importedComponent: Boolean = false;

    private readonly minAmountOfSlots = 10;
    private readonly minAmountOfSlotsInGrid = 60;
    private readonly gridGap = 10;
    private readonly borderWidth = 2;
    private readonly offset = 200;
    private readonly defaultWidth = 300;
    public readonly moreGamesButtonId = 'MoreAppsFolder'

    infotabInsteadOfSettings: boolean = false;

    emptyGameSlots: any[] = [];

    games: Game[] = games;

    selectedGameId: string = ''; // sisu
    selectedTab: string = ''; // info, gallery, General
    // used for gallery
    selectedTabItem: number = 0; // for example: the image index in the gallery
    selectedAnTabItem: boolean = false; // did you select an image?

    currentTime: string = '';
    amOrPm: string = '';

    wonderEffect: string = 'wonder-effect-false';

    settingsMenu: boolean = false;


    constructor(
        private router: Router
    ) { }

    ngOnInit(): void {
        var selectedGameId: any = null;
        if (!this.importedComponent) {
            selectedGameId = localStorage.getItem('selectedGameId');
        } else {
            this.games = [...this.applicationList];
        }
        if (selectedGameId) {
            this.selectedGameId = selectedGameId;
            if (this.games.findIndex(game => game.id === selectedGameId) === -1) {
                this.selectedGameId = '';
            }

            const gameIndex = this.games.findIndex(game => game.id === selectedGameId);
            if (gameIndex !== -1) {
                const game = this.games.splice(gameIndex, 1);
                this.games.unshift(game[0]);
            }
        }
        var totalAmountOfSlots = 0;
        if (this.importedComponent) {
            totalAmountOfSlots = this.minAmountOfSlotsInGrid;
        } else {
            totalAmountOfSlots = this.minAmountOfSlots;
        }
        if (this.games.length < totalAmountOfSlots) {
            for (let i = 0; i < totalAmountOfSlots - this.games.length; i++) {
                this.emptyGameSlots.push({ "id": "fakeSlot" + i });
            }
        }
        // Set the initial time
        this.updateTime();

        // Update the time every second
        setInterval(() => {
            this.updateTime();
        }, 30000);

        this.openInfo();
        this.selectedTab = 'gallery';
        this.showImage(1);
    }

    getImageIndex(image: string): number {
        var images = this.getGameInformation(this.selectedGameId)['images']
        if (images && images.length > 0) {
            return images.indexOf(image);
        }
        return 0;
    }

    showImage(index: number) {
        var images = this.getGameInformation(this.selectedGameId)['images']
        if (images && images.length > 0) {
            this.selectedAnTabItem = true;
            this.selectedTabItem = index;
            return images[index];
        }
        this.selectedTabItem = 0;
        return undefined
    }

    getGameImage(): string {
        var images = this.getGameInformation(this.selectedGameId)['images']
        if (images && images.length > 0) {
            if (this.selectedTabItem < 0) {
                this.selectedTabItem = images.length - 1;
            }
            if (this.selectedTabItem >= images.length) {
                this.selectedTabItem = 0;
            }
            return images[this.selectedTabItem];
        }
        return '';
    }

    showNeighbourImage(index: number) {
        var current = this.selectedTabItem + index;
        var images = this.getGameInformation(this.selectedGameId)['images']
        if (images && images.length > 0) {
            if (current < 0) {
                current = images.length - 1;
            }
            if (current >= images.length) {
                current = 0;
            }
            this.selectedAnTabItem = true;
            this.selectedTabItem = current;
            return images[current];
        }
        this.selectedTabItem = 0;
        return undefined
    }

    getGameInformation(gameId: string): GameInfo {
        const game = this.getGameData(gameId);
        if (game && game.info) {
            return game.info;
        } else {
            return {
                text: ''
            };
        }
    }

    getGameSettings(gameId: string): GameSettings | undefined {
        const game = this.getGameData(gameId);
        return game?.settings;
    }

    getSpecificInformation(gameId: string, data: keyof GameInfo): any {
        const game = this.getGameInformation(gameId);
        if (game) {
            return game[data];
        }
        return undefined;
    }

    getGridClass() {
        if (this.importedComponent) {
            return 'game-list-grid';
        } else {
            return 'game-list-row';
        }
    }

    getGameData(gameId: string): Game | undefined {
        return this.games.find(game => game.id === gameId);
    }

    getDataFromGame(game: Game | undefined, data: string): any {
        if (game) {
            return game[data];
        } else {
            return '';
        }
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent): void {
        if (this.selectedGameId !== '' && !this.settingsMenu) {
            // Check if the pressed key is 'a' (you can use 'A' for capital 'A' key)
            if (event.key === 'a') {
                // Call the goToGame() function when 'a' key is pressed
                this.goToGame({ 'blank': true });
            } else if (event.key === 'x') {
                this.selectGame('');
            } else if (event.key === '+' && this.gameHasSettings(this.selectedGameId)) {
                this.openSettings();
            } else if (event.key === 'i' && this.gameHasInfo(this.selectedGameId)) {
                this.openInfo();
            }
        } else if (this.selectedGameId !== '' && this.settingsMenu) {
            if (event.key == 'a' && this.infotabInsteadOfSettings && this.getGameInformation(this.selectedGameId)['demoUrl']) {
                this.goToGame({ "demoUrl": true, 'blank': true });
            } else if (event.key === 'Escape' || event.key === 'b') {
                this.settingsMenu = false;
            }
        }

    }

    doesGameExist(gameId: string): boolean {
        if (gameId === this.moreGamesButtonId) {
            return true;
        }
        return this.games.findIndex(game => game.id === gameId) !== -1;
    }

    gameHasSettings(gameId: string): boolean {
        const game = this.games.find(game => game.id === gameId);
        if (game) {
            return game.settings !== undefined;
        }
        return false;
    }

    openSettings(): void {
        this.selectedAnTabItem = false;
        this.selectedTab = 'General'
        this.settingsMenu = true;
        this.infotabInsteadOfSettings = false;
        console.log(this.getGameSettings(this.selectedGameId)?.tabs);
    }

    openInfo(): void {
        this.selectedAnTabItem = false;
        this.selectedTab = 'info'
        this.settingsMenu = true;
        this.infotabInsteadOfSettings = true;
    }

    isTabSelected(tab: string): string {
        if (this.selectedTab === tab) {
            return 'selected';
        } else {
            return '';
        }
    }

    getSettingsByTab(tab: string): any[] {
        const settings = this.getGameSettings(this.selectedGameId);
        if (settings) {
            return settings.items.filter(setting => setting.settingTab === tab);
        }
        return [];
    }

    closeSettingsOrInfo(): void {
        this.settingsMenu = false;
    }

    gameHasInfo(gameId: string): boolean {
        const game = this.games.find(game => game.id === gameId);
        if (game) {
            return game.info !== undefined;
        }
        return false;
    }

    updateTime() {
        const now = new Date();
        const hours = this.padZero(now.getHours());
        const minutes = this.padZero(now.getMinutes());
        const seconds = this.padZero(now.getSeconds());

        // Format the time as "hh:mm:ss"
        this.currentTime = `${hours}:${minutes}`;
        this.amOrPm = this.getAMPM(now);
    }

    padZero(value: number): string {
        return value < 10 ? `0${value}` : `${value}`;
    }

    getAMPM(date: Date): string {
        return date.getHours() >= 12 ? 'PM' : 'AM';
    }

    selectGame(gameId: string, settings: any = {}): void {
        this.selectedGameId = gameId;
        if (!this.importedComponent) {
            localStorage.setItem('selectedGameId', gameId);
        }
    }

    isGameSelected(gameId: string): string {
        if (this.selectedGameId === gameId) {
            return 'selected';
        } else {
            return '';
        }
    }

    hasHREF(gameId: string): boolean {
        const game = this.games.find(game => game.id === gameId);
        if (game) {
            return game.nav !== '' && game.nav !== undefined;
        }
        return false;
    }

    goToLink(link: string): void {
        CommonModel.navigateToLink(this.router, link);
    }

    goToGame(settings = {}): void {
        if (this.selectedGameId == this.moreGamesButtonId) {
            CommonModel.navigateToLink(this.router, '/Projects');
        }
        var activGame: Game | undefined = this.games.find(game => game.id === this.selectedGameId);
        var url = activGame?.nav;
        if ("demoUrl" in settings && settings["demoUrl"] == true) {
            url = activGame?.info?.demoUrl;
        } else if ('githubRepo' in settings && settings['githubRepo'] == true) {
            url = activGame?.info?.githubRepo;
        }
        var blank: boolean = false;
        if ('blank' in settings && settings['blank'] == true) {
            blank = true;
        }
        console.log(url)
        if (activGame && url !== '' && url !== undefined) {
            CommonModel.navigateToLink(this.router, url, blank);
        }
    }

    snapToItem(event: MouseEvent) {
        var clickedItem = event.target as HTMLElement;
        if (clickedItem.classList.contains('game-list')) {
            return;
        }
        if (clickedItem.classList.contains('closing')) {
            const parentElement = clickedItem.parentNode as HTMLElement;
            clickedItem = parentElement.firstChild as HTMLElement;
        }
        // Ensure that clickedItem.parentNode is not null
        if (clickedItem.parentNode) {

            const parentElement = clickedItem.parentNode as HTMLElement;

            // Check if the parent element is an anchor (<a>) element
            if (parentElement.tagName.toLowerCase() === 'a') {
                clickedItem = parentElement.parentNode as HTMLElement;
            }
        }
        if (clickedItem.classList.contains('more-software') && clickedItem.parentNode) {
            const index = Array.from(clickedItem.parentNode.children).indexOf(clickedItem);
            const scrollLeftPosition = index * this.defaultWidth;
            this.scrollContainer.nativeElement.scrollLeft = scrollLeftPosition;
            return;
        }
        if (clickedItem.parentNode) {
            // Find the index of the clicked item
            const index = Array.from(clickedItem.parentNode.children).indexOf(clickedItem);
            var calculatedOffset = 0;
            if (this.scrollContainer.nativeElement.scrollLeft > 0) {
                calculatedOffset = this.offset;
            }

            // Calculate the scrollLeft position to snap to the clicked item
            const scrollLeftPosition = index * clickedItem.offsetWidth;

            // Check if the clicked item is not fully visible
            const amountOfItemsOnScreen = Math.floor(this.scrollContainer.nativeElement.clientWidth / clickedItem.offsetWidth)
            if (
                scrollLeftPosition < this.scrollContainer.nativeElement.scrollLeft ||
                scrollLeftPosition + clickedItem.offsetWidth + (this.gridGap * amountOfItemsOnScreen) + (amountOfItemsOnScreen * this.borderWidth * 2) >
                this.scrollContainer.nativeElement.scrollLeft + this.scrollContainer.nativeElement.clientWidth - calculatedOffset
            ) {
                // Set the scrollLeft property of the container to scroll to the clicked item
                this.scrollContainer.nativeElement.scrollLeft = scrollLeftPosition;
            }
        }
    }


}
