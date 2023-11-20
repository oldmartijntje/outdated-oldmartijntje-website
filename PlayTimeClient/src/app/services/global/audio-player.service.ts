import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AudioPlayerService {
    private volume: number = 0.3;
    private audio: HTMLAudioElement = new Audio();

    constructor() {
        this.audio.volume = this.volume;
    }

    playAudio(url: string): void {
        this.audio.src = url;
        this.audio.load();
        this.audio.play();
    }

    pauseAudio(): void {
        this.audio.pause();
    }

    setVolume(volume: number): void {
        if (volume >= 0 && volume <= 1) {
            this.volume = volume;
            this.audio.volume = volume;
        }
    }

    getVolume(): number {
        return this.volume;
    }
}
