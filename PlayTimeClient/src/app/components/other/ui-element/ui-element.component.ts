import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AudioPlayerService } from 'src/app/services/audio-player.service';

@Component({
    selector: 'app-ui-element',
    templateUrl: './ui-element.component.html',
    styleUrl: './ui-element.component.scss'
})
export class UiElementComponent implements OnInit {
    @Input() widthOfContent: string = '800px';
    @Input() maxWidthOfContent: string = 'none';
    @Input() capAtVH: boolean = true;
    @Input() overflowY: string = 'hidden';

    gameTheory: { [key: string]: any } = {
        clickedOrder: [],
        class: { '1': '', '2': '', '3': '', '4': '' },
        secretClickOrder: ['1', '2', '3', '4', 'middle'],
        found: false,
        pageConvertor: { '1': 'game', '2': 'film', '3': 'food', '4': 'style', 'middle': 'middle' },
        audioConvertor: { '1': '../../../../assets/audio/simon tune1.mp3', '2': '../../../../assets/audio/simon tune1.mp3', '3': '../../../../assets/audio/simon tune2.mp3', '4': '../../../../assets/audio/simon tune2.mp3', 'middle': '../../../../assets/audio/simon tune3.mp3' }
    }

    heightOfContent: string = '100%';
    customWidthOfContent = this.widthOfContent;

    isWideScreen: boolean = window.innerWidth >= 1024;

    constructor(
        private router: Router,
        private audioService: AudioPlayerService
    ) { }

    ngOnInit() {
        this.customWidthOfContent = this.isBiggerThanMaxWidth();
        this.onResize(null);
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: Event | null) {
        this.isWideScreen = window.innerWidth >= 1024;
        if (this.isWideScreen) {
            this.heightOfContent = '100%';
        } else {
            this.heightOfContent = '90svh';
        }
        this.customWidthOfContent = this.isBiggerThanMaxWidth();
    }

    returnHeightClass(mode: number = 0): string {
        if (this.capAtVH && mode === 0) {
            return 'height-cap-vh';
        } else if (this.capAtVH && mode === 0) {
            return 'height-cap-percent';
        } else {
            return 'height-cap-none';
        }
    }

    isBiggerThanMaxWidth(): string {
        if (parseInt(this.maxWidthOfContent.split('px')[0]) > window.innerWidth) {
            return window.innerWidth + 'px';
        } else {
            return this.widthOfContent;
        }
    }

    goToWebPage(url: string, openInNewTab: boolean = false): void {
        if (openInNewTab) {
            window.open(url, '_blank');
        } else {
            window.location.href = url;
        }
    }

    gameTheoryClicked(id: string): void {
        if (this.gameTheory['found']) {
            this.gameTheory['found'] = false;
            var page = '';
            const tempVolume = this.audioService.getVolume();
            this.audioService.setVolume(0.1);
            this.audioService.playAudio('../../../../assets/audio/simon tune4.mp3');
            if (id == 'middle') {
                const tempText = `${Math.floor(Math.random() * 4) + 1}`
                page = this.gameTheory['pageConvertor'][tempText];
            } else {
                page = this.gameTheory['pageConvertor'][id];
            }
            setTimeout(() => {
                this.audioService.setVolume(tempVolume);
            }, 4000);
            this.router.navigate(['/simonGame', page]);
            return;
        }
        const tempVolume = this.audioService.getVolume();
        this.audioService.setVolume(0.1);
        this.audioService.playAudio(this.gameTheory['audioConvertor'][id]);
        setTimeout(() => {
            this.audioService.setVolume(tempVolume);
        }, 1000);
        this.gameTheory['clickedOrder'].push(id);
        if (this.gameTheory['clickedOrder'].length > 5) {
            this.gameTheory['clickedOrder'].shift();
        }
        for (let key in this.gameTheory['class']) {
            if (key !== id) {
                this.gameTheory['class'][key] = '';
            }
        }
        if (id != 'middle') {
            this.gameTheory['class'][id] = 'locked';
        } else if (JSON.stringify(this.gameTheory['clickedOrder']) === JSON.stringify(this.gameTheory['secretClickOrder'])) {
            for (let key in this.gameTheory['class']) {
                if (key !== id) {
                    this.gameTheory['class'][key] = 'locked';
                }
            }
            this.gameTheory['found'] = true;
        }
    }
}
