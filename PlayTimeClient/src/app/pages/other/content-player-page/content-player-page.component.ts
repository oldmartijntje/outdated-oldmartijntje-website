import { Component, OnInit } from '@angular/core';
import { Styling, DefaultScenes, DefaultStory } from '../../../data/media'
import { Discs, DiscType } from '../../../models/discs'
import { Encryptor } from 'src/app/models/encryptor';
import { ToastQueueService } from 'src/app/services/toast-queue.service';

@Component({
    selector: 'app-content-player-page',
    templateUrl: './content-player-page.component.html',
    styleUrl: './content-player-page.component.scss'
})
export class ContentPlayerPageComponent implements OnInit {
    styling = Styling;
    scenes = DefaultScenes;
    story = DefaultStory;
    variables = { ...this.story['variables'] }
    selectedADisc = -1;
    currentDiscDisplay = 1;
    firstDiscShowedId = 0;
    animateButtons = [
        false, false
    ]
    currentSlide: string = "-1";
    currentScene: string = "-1";
    editing: boolean = false;

    constructor(
        private toastQueue: ToastQueueService,
    ) { }

    ngOnInit(): void {
        var selected = localStorage.getItem('selected-disc');
        if (selected != null) {
            console.log(selected)
            this.selectOtherDisc(parseInt(selected));
        } else {
            this.selectOtherDisc(0)
        }
    }

    getTextOfSlide(slide: any) {
        if (slide[this.currentSlide] == undefined || this.currentSlide == "-1") {
            return undefined;
        } else {
            return slide[this.currentSlide]['text']
        }

    }

    handleSavingEvent(message: any) {
        console.log(message);
        var data = this.getLocalstorageDict('content-player');
        console.log(data);
        data[this.getSelectedData().name] = {
            "name": this.getSelectedData().name,
            "slide": message['currentSlide'],
            "scene": message['currentScene']["sceneId"],
            "variables": message['variables']
        };
        var encr = new Encryptor();
        var encrData = encr.encryptString(JSON.stringify(data), 1);
        localStorage.setItem('content-player', encrData);
        this.toastQueue.enqueueToast('Your progress has been saved', 'Info');
    }

    getLocalstorageDict(key: string): { [key: string]: any } {
        var data = localStorage.getItem(key);
        if (data == null) {
            return {};
        } else {
            try {
                var encr = new Encryptor();
                var decr = encr.decryptString(data, 1);
                return JSON.parse(decr);
            } catch (e) {
                console.error(e);
                return {};
            }

        }

    }

    getSelectedData() {
        return Discs[this.currentDiscDisplay];
    }

    handleExitEvent(message: any) {
        this.selectedADisc = -1;
        this.updateSelectedData();
    }

    getSelectedAssets() {

    }

    setAnimation(index: number) {
        this.animateButtons[index] = !this.animateButtons[index];
    }

    getDiscs(): DiscType[] {
        const displayedDiscs: DiscType[] = [];

        let firstDiscShowedId: number | null = null;

        if (this.currentDiscDisplay - 2 >= 0) {
            displayedDiscs.push(Discs[this.currentDiscDisplay - 2]);
            firstDiscShowedId = this.currentDiscDisplay - 2;
        }

        if (this.currentDiscDisplay - 1 >= 0) {
            displayedDiscs.push(Discs[this.currentDiscDisplay - 1]);
            if (firstDiscShowedId === null) {
                firstDiscShowedId = this.currentDiscDisplay - 1;
            }
        }

        displayedDiscs.push(Discs[this.currentDiscDisplay]);

        if (this.currentDiscDisplay + 1 < Discs.length) {
            displayedDiscs.push(Discs[this.currentDiscDisplay + 1]);
        }

        if (this.currentDiscDisplay + 2 < Discs.length) {
            displayedDiscs.push(Discs[this.currentDiscDisplay + 2]);
        }

        if (firstDiscShowedId !== null) {
            this.firstDiscShowedId = firstDiscShowedId;
        }

        return displayedDiscs;
    }

    selectDisc(disc: number, saveFileBoolean: boolean, editing: boolean = false) {
        this.selectedADisc = disc;
        this.styling = this.getSelectedData().styling;
        this.scenes = this.getSelectedData().scenes;
        this.story = this.getSelectedData().story;
        this.variables = { ...this.story['variables'] };

        if (saveFileBoolean) {
            var data = this.getLocalstorageDict('content-player');
            if (data[this.getSelectedData().name] != undefined) {
                this.currentSlide = data[this.getSelectedData().name]['slide'];
                this.currentScene = data[this.getSelectedData().name]["scene"];
            } else {
                this.currentSlide = "-1";
                this.currentScene = "-1";
            }
        } else {
            this.currentSlide = "-1";
            this.currentScene = "-1";
        }
        this.editing = editing;
    }

    deleteSaveFile() {
        var data = this.getLocalstorageDict('content-player');
        delete data[this.getSelectedData().name];
        var encr = new Encryptor();
        var encrData = encr.encryptString(JSON.stringify(data), 1);
        localStorage.setItem('content-player', encrData);
        this.toastQueue.enqueueToast('Your progress has been deleted', 'Info');
        this.updateSelectedData();
    }

    getSlides() {
        return this.story["slides"]
    }

    selectOtherDisc(disc: number) {
        if (disc == -1) {
            this.setAnimation(0);
            setTimeout(() => {
                this.setAnimation(0);
            }, 300)
            this.currentDiscDisplay = this.currentDiscDisplay - 1;
        } else if (disc == -2) {
            this.setAnimation(1);
            setTimeout(() => {
                this.setAnimation(1);
            }, 300)
            this.currentDiscDisplay = this.currentDiscDisplay + 1;
        } else {
            this.currentDiscDisplay = disc;
        }

        if (this.currentDiscDisplay > Discs.length - 1) {
            this.currentDiscDisplay = Discs.length - 1;
        } else if (this.currentDiscDisplay < 0) {
            this.currentDiscDisplay = 0;
        }
        this.updateSelectedData();

    }

    updateSelectedData() {
        this.story = this.getSelectedData().story;
        var data = this.getLocalstorageDict('content-player');
        if (data[this.getSelectedData().name] != undefined) {
            this.currentSlide = data[this.getSelectedData().name]['slide'];
            this.currentScene = data["scene"];
        } else {
            this.currentSlide = "-1";
            this.currentScene = "-1";
        }
        localStorage.setItem('selected-disc', this.currentDiscDisplay.toString());
    }
}
