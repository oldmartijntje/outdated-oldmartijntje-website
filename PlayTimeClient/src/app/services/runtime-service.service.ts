import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RuntimeServiceService {
    private mobileModeSubject: BehaviorSubject<{ [key: string]: any }> = new BehaviorSubject<{ [key: string]: any }>({ "MobileUser": false, "MobileMode": false });

    private volume: number = 0.3;
    private audio: HTMLAudioElement = new Audio();

    constructor() {
        this.audio.volume = this.volume;
    }

    mobileModeSubjectValue$: Observable<{ [key: string]: any }> = this.mobileModeSubject.asObservable();
    tempMobileMode: { [key: string]: any } = { "MobileUser": false, "MobileMode": false };

    setMobileMode(value: boolean) {
        this.tempMobileMode["MobileMode"] = value;
        this.mobileModeSubject.next(this.tempMobileMode);
    }

    setMobileUserType(value: boolean) {
        this.tempMobileMode["MobileUser"] = value;
        this.mobileModeSubject.next(this.tempMobileMode);
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
