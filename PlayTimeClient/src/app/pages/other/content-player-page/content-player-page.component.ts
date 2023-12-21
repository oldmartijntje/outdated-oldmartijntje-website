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

    messageFromChild: any;

    handleSavingEvent(message: any) {
        this.messageFromChild = message;
        console.log(this.messageFromChild);
    }

    getSelectedData() {
        console.log(this.currentDiscDisplay);
        return Discs[this.currentDiscDisplay];
    }

    handleExitEvent(message: any) {
        this.selectedADisc = -1;
    }

    getSelectedAssets() {

    }

    getDiscs(): DiscType[] {
        const displayedDiscs: DiscType[] = [];
        var found = false;
        this.firstDiscShowedId
        if (this.currentDiscDisplay > 0 && this.currentDiscDisplay - 1 < Discs.length) {
            displayedDiscs.push(Discs[this.currentDiscDisplay - 1]);
            this.firstDiscShowedId = this.currentDiscDisplay - 1;
            found = true;
        }

        if (this.currentDiscDisplay < Discs.length) {
            displayedDiscs.push(Discs[this.currentDiscDisplay]);
            if (!found) {
                this.firstDiscShowedId = this.currentDiscDisplay;
            }
        }

        if (this.currentDiscDisplay + 1 < Discs.length) {
            displayedDiscs.push(Discs[this.currentDiscDisplay + 1]);
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
        this.currentDiscDisplay = this.currentDiscDisplay + disc;
        if (this.currentDiscDisplay > Discs.length - 1) {
            this.currentDiscDisplay = Discs.length - 1;
        } else if (this.currentDiscDisplay < 0) {
            this.currentDiscDisplay = 0;
        }
    }
}
