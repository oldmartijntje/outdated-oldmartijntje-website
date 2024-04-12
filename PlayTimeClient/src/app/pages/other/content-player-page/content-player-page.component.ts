import { Component, OnInit } from '@angular/core';
import { Styling, DefaultScenes, DefaultStory } from '../../../data/media'
import { Discs, DiscType } from '../../../models/discs'
import { ToastQueueService } from 'src/app/services/toast-queue.service';
import { UUID } from 'src/app/models/uuid';
import { LocalstorageHandlingService } from 'src/app/services/localstorage-handling.service';

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
    selectedADisc = -1; //set to -1 when done making the editor
    currentDiscDisplay = 1;
    firstDiscShowedId = 0;
    animateButtons = [
        false, false
    ]
    currentSlide: string = "-1";
    currentScene: string = "-1";
    editing: boolean = true; //set to false when done making the editor
    importedStory: { [key: string]: any } = {};
    playingImportedStory: boolean = false;
    importedStoryHasSaveFile: boolean = false;
    currentImportedSlide: string = "-1";
    clickedImport: boolean = false;

    constructor(
        private toastQueue: ToastQueueService,
        private localstorageHandlingService: LocalstorageHandlingService
    ) { }

    ngOnInit(): void {
        const handlingRespone = this.localstorageHandlingService.getLocalstorageHandler().loadData("app.Text-Adventures.selected-disc");
        if (handlingRespone.success) {
            this.highlightDisc(parseInt(handlingRespone.data));
        } else {
            this.highlightDisc(0)
        }
    }

    hasImportedStory(): boolean {
        return JSON.stringify(this.importedStory) != JSON.stringify({});
    }

    getTextOfSlide(slide: any, importedStory: boolean = false) {
        if (importedStory && this.hasImportedStory()) {
            if (slide[this.currentImportedSlide] == undefined || this.currentImportedSlide == "-1") {
                return undefined;
            } else {
                return slide[this.currentImportedSlide]['text']
            }
        } else {
            if (slide[this.currentSlide] == undefined || this.currentSlide == "-1") {
                return undefined;
            } else {
                return slide[this.currentSlide]['text']
            }
        }


    }

    handleSavingEvent(message: any) {
        if (this.editing) {
            if (message['FullStoryDict']["story"]["customStoryId"] == undefined) {
                message['FullStoryDict']["story"]["customStoryId"] = UUID.generate();
            }
            this.importedStory = message['FullStoryDict'];
            this.clickedImport = true;
            this.toastQueue.enqueueToast('Your Edits have been saved.', 'info');
        } else {
            var discName = this.getSelectedData().name;
            if (this.playingImportedStory) {
                discName = this.importedStory["story"]["customStoryId"];
            }
            console.log(message, discName);
            var data = this.getLocalstorageDict('content-player');
            console.log(data);
            data[discName] = {
                "name": discName,
                "slide": message['currentSlide'],
                "scene": message['currentScene']["sceneId"],
                "variables": message['variables']
            };
            var encrData = JSON.parse(JSON.stringify(data));
            this.localstorageHandlingService.addEditRequestToQueue(encrData, "app.Text-Adventures.content-player");
            this.toastQueue.enqueueToast('Your progress has been saved', 'info');
        }
    }

    handleErrorEvent(message: any) {
        if (message['errorCode'] != undefined) {
            message['text'] = message['errorCode'] + ": " + message['text'];
        }
        if (message.severity == "ERROR") {
            this.toastQueue.enqueueToast(message['text'], 'error');
        } else if (message.severity == "WARNING") {
            this.toastQueue.enqueueToast(message['text'], 'warning');
        } else if (message.severity == "INFO") {
            this.toastQueue.enqueueToast(message['text'], 'info');
        }
    }

    downloadFile(title: string, data: { [key: string]: any }) {
        const jsonContent = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonContent], { type: 'application/json' });

        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = title + '.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    onFileChange(event: any) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const content = e.target?.result as string;
                    var importedStory = JSON.parse(content);
                    if (importedStory["story"] != undefined && importedStory["scenes"] != undefined && importedStory["styling"] != undefined) {
                        console.log('File imported successfully:', importedStory);
                        this.importedStory = importedStory;
                        this.toastQueue.enqueueToast('File imported successfully', 'info');
                        this.checkForImportedSaveFile()
                    } else {
                        this.importedStory = {};
                        console.error('File imported unsuccessfully:', importedStory);
                        this.toastQueue.enqueueToast('File imported unsuccessfully', 'error', 5);
                        return;
                    }
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
            };
            reader.readAsText(file);
        }
    }

    getLocalstorageDict(key: string): { [key: string]: any } {
        const handlingRespone = this.localstorageHandlingService.getLocalstorageHandler().loadData("app.Text-Adventures." + key);
        if (!handlingRespone.success) {
            return {};
        } else {
            try {
                var decr = handlingRespone.data;
                return decr;
            } catch (e) {
                console.error(e);
                return {};
            }

        }

    }

    getSelectedData() {
        if (this.playingImportedStory) {
            return this.importedStory;
        }
        return Discs[this.currentDiscDisplay];
    }

    handleExitEvent(message: any) {
        this.playingImportedStory = false;
        this.selectedADisc = -1;
        this.updateSelectedData();
        this.checkForImportedSaveFile();

    }

    checkForImportedSaveFile() {
        if (this.hasImportedStory()) {
            var data = this.getLocalstorageDict('content-player');
            var discName = this.importedStory["story"]["customStoryId"];
            if (data[discName] != undefined) {
                this.importedStoryHasSaveFile = true;
                this.currentImportedSlide = data[discName]['slide'];
            } else {
                this.importedStoryHasSaveFile = false;
            }
        }
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

    selectDisc(disc: number, saveFileBoolean: boolean, editing: boolean = false, importedStory: boolean = false) {
        this.playingImportedStory = importedStory;
        this.selectedADisc = disc;
        this.styling = this.getSelectedData().styling;
        this.scenes = this.getSelectedData().scenes;
        this.story = this.getSelectedData().story;
        this.variables = { ...this.story['variables'] };

        if (saveFileBoolean) {
            var data = this.getLocalstorageDict('content-player');
            var discName = this.getSelectedData().name;
            if (importedStory) {
                discName = this.importedStory["story"]["customStoryId"];
            }
            if (data[discName] != undefined) {
                this.currentSlide = data[discName]['slide'];
                this.currentScene = data[discName]["scene"];
            } else {
                this.currentSlide = "-1";
                this.currentScene = "-1";
            }
            console.log(this.currentSlide, this.currentScene, data, discName);
        } else {
            this.currentSlide = "-1";
            this.currentScene = "-1";
        }
        this.editing = editing;
    }

    deleteSaveFile(importedStory: boolean = false) {
        var data = this.getLocalstorageDict('content-player');
        var discName = this.getSelectedData().name;
        if (importedStory) {
            discName = this.importedStory["story"]["customStoryId"];
        }
        delete data[discName];
        var encrData = JSON.parse(JSON.stringify(data));
        this.localstorageHandlingService.addEditRequestToQueue(encrData, "app.Text-Adventures.content-player");
        this.toastQueue.enqueueToast('Your progress has been deleted', 'info');
        this.updateSelectedData();
        this.checkForImportedSaveFile();
    }

    getSlides(importedStory: boolean = false) {
        if (importedStory && this.hasImportedStory()) {
            return this.importedStory["story"]["slides"];
        }
        return this.story["slides"]
    }

    highlightDisc(disc: number) {
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
        var discName = this.getSelectedData().name;
        // if (this.playingImportedStory) {
        //     discName = this.importedStory["story"]["customStoryId"];
        // }
        if (data[discName] != undefined) {
            this.currentSlide = data[discName]['slide'];
            this.currentScene = data["scene"];
        } else {
            this.currentSlide = "-1";
            this.currentScene = "-1";
        }
        this.localstorageHandlingService.addEditRequestToQueue(this.currentDiscDisplay.toString(), "app.Text-Adventures.selected-disc");
    }

    debug() {
        var data = this.getLocalstorageDict('content-player');
        console.log(data);
    }
}
