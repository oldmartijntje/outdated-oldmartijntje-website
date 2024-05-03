import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModel } from 'src/app/models/commonModel';
import { RuntimeServiceService } from 'src/app/services/runtime-service.service';

@Component({
    selector: 'app-funky-css-page',
    templateUrl: './funky-css-page.component.html',
    styleUrl: './funky-css-page.component.scss'
})
export class FunkyCssPageComponent {
    character = 'mario';
    clicksOnThePointlessButton = 0;

    constructor(
        private runtimeService: RuntimeServiceService,
        private router: Router
    ) { }

    playAudio(url: string, volume: number = 0.5): void {
        this.setVolume(volume);
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

    selectPlayer(player: string): void {
        this.character = player;
        if (player == "mario") {
            this.playAudio('../../../../assets/audio/mario-64-here-we-go-voice.mp3', 0.5)
        } else if (player == "luigi") {
            this.playAudio('../../../../assets/audio/luigi-here-we-go.mp3', 0.5)
        }
    }

    switchToSwitchUI(): void {
        this.playAudio('../../../../assets/audio/enter-painting.mp3', 0.5)
        this.navigateToLink("Homepage")
    }

    navigateToLink(link: string): void {
        CommonModel.navigateToLink(this.router, link);
    }

    pointlessButtonclick(): void {
        this.clicksOnThePointlessButton += 1;
        if (this.clicksOnThePointlessButton == 50) {
            this.navigateToLink("void");
        }
    }
}
