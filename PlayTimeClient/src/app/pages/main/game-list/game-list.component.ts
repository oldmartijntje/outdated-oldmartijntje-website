// game-list.component.ts
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { games, Game } from 'src/app/data/homescreenItems';
import { CommonModel } from 'src/app/models/commonModel';

@Component({
    selector: 'app-game-list',
    templateUrl: './game-list.component.html',
    styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {
    @ViewChild('gameList', { static: false }) scrollContainer!: ElementRef;

    private readonly minAmountOfSlots = 15;
    private readonly gridGap = 10;
    private readonly borderWidth = 2;
    private readonly offset = 200;

    emptyGameSlots: any[] = [];

    games: Game[] = games;

    selectedGameId: string = '';

    currentTime: string = '';
    amOrPm: string = '';

    wonderEffect: string = 'wonder-effect-false';

    settingsMenu: boolean = true;

    constructor(
        private router: Router
    ) { }

    ngOnInit(): void {
        const selectedGameId = localStorage.getItem('selectedGameId');
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
        if (this.games.length < this.minAmountOfSlots) {
            for (let i = 0; i < this.minAmountOfSlots - this.games.length; i++) {
                this.emptyGameSlots.push({ "id": "fakeSlot" + i });
            }
        }
        // Set the initial time
        this.updateTime();

        // Update the time every second
        setInterval(() => {
            this.updateTime();
        }, 30000);
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
                this.goToGame();
            } else if (event.key === 'x') {
                this.selectGame('');
            } else if (event.key === '+' && this.gameHasSettings(this.selectedGameId)) {
                this.settingsMenu = true;
            }
        } else if (this.selectedGameId !== '' && this.settingsMenu) {
            if (event.key === 'Escape' || event.key === 'b') {
                this.settingsMenu = false;
            }
        }
    }

    doesGameExist(gameId: string): boolean {
        return this.games.findIndex(game => game.id === gameId) !== -1;
    }

    gameHasSettings(gameId: string): boolean {
        const game = this.games.find(game => game.id === gameId);
        if (game) {
            return game.settings !== undefined;
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
        localStorage.setItem('selectedGameId', gameId);
    }

    isGameSelected(gameId: string): string {
        if (this.selectedGameId === gameId) {
            return 'selected';
        } else {
            return '';
        }
    }

    goToLink(link: string): void {
        CommonModel.navigateToLink(this.router, link);
    }

    goToGame(): void {
        var activGame: Game | undefined = this.games.find(game => game.id === this.selectedGameId);
        if (activGame) {
            CommonModel.navigateToLink(this.router, activGame.nav);
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
