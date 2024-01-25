// game-list.component.ts
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { games, Game } from 'src/app/data/homescreenItems';
import { CommonModel } from 'src/app/models/commonModel';

@Component({
    selector: 'app-game-list',
    templateUrl: './game-list.component.html',
    styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {
    private readonly minAmountOfSlots = 15;

    emptyGameSlots: any[] = [];

    games: Game[] = games;

    selectedGameId: string = '';

    currentTime: string = '';
    amOrPm: string = '';

    wonderEffect: string = 'wonder-effect-false';

    settingsMenu: boolean = false;

    constructor(
        private router: Router
    ) { }

    ngOnInit(): void {
        const selectedGameId = localStorage.getItem('selectedGameId');
        if (selectedGameId) {
            this.selectedGameId = selectedGameId;

            const gameIndex = this.games.findIndex(game => game.id === selectedGameId);
            if (gameIndex !== -1) {
                const game = this.games.splice(gameIndex, 1);
                this.games.unshift(game[0]);
            }
        }
        if (this.games.length < this.minAmountOfSlots) {
            for (let i = 0; i < this.minAmountOfSlots - this.games.length; i++) {
                this.emptyGameSlots.push({});
            }
        }
        // Set the initial time
        this.updateTime();

        // Update the time every second
        setInterval(() => {
            this.updateTime();
        }, 30000);
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent): void {
        // Check if the pressed key is 'a' (you can use 'A' for capital 'A' key)
        if (event.key === 'a') {
            // Call the goToGame() function when 'a' key is pressed
            this.goToGame();
        } else if (event.key === 'x') {
            this.selectGame('');
        }
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

    selectGame(gameId: string): void {
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


}
