import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Styling, DefaultScenes, DefaultStory } from '../../../data/media'
import { AudioPlayerService } from 'src/app/services/audio-player.service';

@Component({
    selector: 'app-visual-novel',
    templateUrl: './visual-novel.component.html',
    styleUrl: './visual-novel.component.scss'
})
export class VisualNovelComponent implements OnInit {
    @Input() scenes: any = DefaultScenes;
    @Input() story: any = DefaultStory;
    @Input() styling: any = Styling;
    @Input() currentSlide: string = "-1";
    @Input() variables: any = { ...DefaultStory["variables"] };

    @Output() savingEvent = new EventEmitter<any>();

    intro = true;
    slide: any;
    scene: any;
    showSaveIcon: boolean = this.story["showSaveButton"];
    defaultNumberForExceptions: string = "1";

    emitSavingEvent() {
        this.savingEvent.emit({ "variables": this.variables, "currentScene": this.currentSlide });
    }

    constructor(
        private audioPlayerService: AudioPlayerService
    ) { }

    removeIntro() {
        this.intro = false;
    }

    ngOnInit(): void {
        setTimeout(() => {
            this.removeIntro();
        }, 2000);
        if (this.currentSlide == "-1") {
            this.currentSlide = this.story.startSlide;
            if (this.currentSlide == "-1") {
                // if startscene is not defined
                this.currentSlide = this.defaultNumberForExceptions;
                this.slide = this.deepClone(this.story.slides[this.currentSlide]);
            } else {
                this.slide = this.deepClone(this.story.slides[this.currentSlide]);
            }
        } else {
            this.slide = this.story.slides[this.currentSlide];
        }
        console.log(this.slide);
        this.runNextSlide();
    }

    deepClone(obj: Record<string, any>): Record<string, any> {
        return JSON.parse(JSON.stringify(obj));
    }

    showChoices() {
        return this.slide.type == "choice";
    }

    getText() {
        return this.slide.text;
    }

    getAllChoices(): any {
        var choices = [...this.slide.choices]
        var allowedChoices = [];
        for (let index = 0; index < Object.keys(choices).length; index++) {
            var allowed = true;
            const element = choices[index];
            if (element["if"] != undefined) {
                allowed = false;
                if (element["if"]["typeOfCheck"] == "==" && this.variables[element["if"]["variable"]] == element["if"]["value"]) {
                    allowed = true;
                } else if (element["if"]["typeOfCheck"] == ">" && this.variables[element["if"]["variable"]] > element["if"]["value"]) {
                    allowed = true;
                } else if (element["if"]["typeOfCheck"] == "<" && this.variables[element["if"]["variable"]] < element["if"]["value"]) {
                    allowed = true;
                } else if (element["if"]["typeOfCheck"] == ">=" && this.variables[element["if"]["variable"]] >= element["if"]["value"]) {
                    allowed = true;
                } else if (element["if"]["typeOfCheck"] == "<=" && this.variables[element["if"]["variable"]] <= element["if"]["value"]) {
                    allowed = true;
                } else if (element["if"]["typeOfCheck"] == "!=" && this.variables[element["if"]["variable"]] != element["if"]["value"]) {
                    allowed = true;
                }
            }
            if (allowed) {
                element["enabled"] = true;
                allowedChoices.push(element);
            } else if (element["if"]["showAsDisabled"]) {
                element["enabled"] = false;
                allowedChoices.push(element);
            }

        }
        for (let index = 0; index < Object.keys(allowedChoices).length; index++) {
            try {
                if (allowedChoices[allowedChoices.length - index - 1]["if"]["autoClick"]) {
                    this.clickChoice(allowedChoices[allowedChoices.length - index - 1]);
                    break;
                }
                if (allowedChoices[allowedChoices.length - index - 1]["if"]["onlyOption"]) {
                    if (allowedChoices[allowedChoices.length - index - 1]["enabled"]) {
                        return [allowedChoices[allowedChoices.length - index - 1]];
                    }
                }
            } catch (error) {
            }
        }
        return allowedChoices;
    }

    clickChoice(option: any = { "next": "-1" }) {
        if (option.enabled == false) {
            return;
        }
        if (option.next == "-1") {
            this.currentSlide = this.slide.next;
        } else {
            this.currentSlide = option.next;
        }
        this.slide = this.deepClone(this.story.slides[this.currentSlide]);
        this.runNextSlide();
    }

    runNextSlide() {
        if (this.slide.scene != undefined) {
            this.scene = this.scenes[this.slide.scene];
        } else if (this.scene == undefined) {
            this.scene = this.scenes[this.defaultNumberForExceptions];
        }

        if (this.slide.type == "variable") {
            if (this.variables[this.slide.variable.name] == undefined) {
                this.variables[this.slide.variable.name] = 0;
            }
            if (this.slide.variable.type == "+") {
                this.variables[this.slide.variable.name] = this.variables[this.slide.variable.name] + this.slide.variable.value;
            } else if (this.slide.variable.type == "-") {
                this.variables[this.slide.variable.name] = this.variables[this.slide.variable.name] - this.slide.variable.value;
            } else if (this.slide.variable.type == "=") {
                this.variables[this.slide.variable.name] = this.slide.variable.value;
            }
            this.clickChoice();
        } else if (this.slide.type == "playSound") {
            this.setVolume(this.slide.volume);
            this.playAudio(this.slide.sound);
            this.clickChoice();
        } else if (this.slide.type == "choice") {
            this.getAllChoices();
        }
    }

    getStyling(option: any = "next"): { [key: string]: string | number } {
        if (option == "next") {
            if (this.slide["style"] != undefined) {
                return this.styling["styles"][this.slide["style"]];
            } else {
                return this.styling["styles"][this.styling["default"]["nextSlide"]];
            }
        } else if (option == "prompt") {
            if (this.slide["promptStyling"] != undefined) {
                return this.styling["styles"][this.slide["promptStyling"]];
            } else {
                return this.styling["styles"][this.styling["default"]["textBox"]];
            }
        } else {
            var style: { [key: string]: string | number } = {};
            if (option["style"] != undefined) {
                style = this.styling["styles"][option["style"]];
            } else {
                style = this.styling["styles"][this.styling["default"]["choices"]];
            }
            if (option["enabled"] != undefined && !option["enabled"]) {
                style = { ...style, ...this.styling["styles"][option["disabledStyle"]] };
            }
            return style;
        }
    }

    getTextForTextBox() {
        if (this.slide["nextSlideText"] != undefined) {
            return this.slide["nextSlideText"];
        } else {
            return this.story["defaultNextSlideText"];
        }
    }

    playAudio(url: string): void {
        this.audioPlayerService.playAudio(url);
    }

    pauseAudio(): void {
        this.audioPlayerService.pauseAudio();
    }

    setVolume(volume: number): void {
        this.audioPlayerService.setVolume(volume);
    }

    getVolume(): number {
        return this.audioPlayerService.getVolume();
    }
}
