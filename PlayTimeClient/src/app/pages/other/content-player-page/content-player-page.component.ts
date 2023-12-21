import { Component } from '@angular/core';
import { Styling, DefaultScenes, DefaultStory } from '../../../data/media'
import { Discs, DiscType } from '../../../models/discs'

@Component({
    selector: 'app-content-player-page',
    templateUrl: './content-player-page.component.html',
    styleUrl: './content-player-page.component.scss'
})
export class ContentPlayerPageComponent {
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

    messageFromChild: any;

    handleSavingEvent(message: any) {
        this.messageFromChild = message;
        console.log(this.messageFromChild);
    }

    getSelectedData() {
        return Discs[this.currentDiscDisplay];
    }

    handleExitEvent(message: any) {
        this.selectedADisc = -1;
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

    selectDisc(disc: number) {
        this.selectedADisc = disc;
        this.styling = this.getSelectedData().styling;
        this.scenes = this.getSelectedData().scenes;
        this.story = this.getSelectedData().story;
        this.variables = { ...this.story['variables'] };
    }

    selectOtherDisc(disc: number) {
        if (disc == -1) {
            this.setAnimation(0);
            setTimeout(() => {
                this.setAnimation(0);
            }, 300)
        } else if (disc == 1) {
            this.setAnimation(1);
            setTimeout(() => {
                this.setAnimation(1);
            }, 300)
        }
        this.currentDiscDisplay = this.currentDiscDisplay + disc;
        if (this.currentDiscDisplay > Discs.length - 1) {
            this.currentDiscDisplay = Discs.length - 1;
        } else if (this.currentDiscDisplay < 0) {
            this.currentDiscDisplay = 0;
        }
    }
}
