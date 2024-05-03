import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Styling, DefaultScenes, DefaultStory, DefaultIdentifierForExceptions } from '../../../data/media'
import { FormControl } from '@angular/forms';
import { RuntimeServiceService } from 'src/app/services/runtime-service.service';

interface ComboboxOption {
    value: string;
    viewValue: string;
}

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
    @Input() currentScene: string = "-1";
    @Input() editing: boolean = false;
    @Input() variables: any = { ...DefaultStory["variables"] };

    @Output() savingEvent = new EventEmitter<any>();
    @Output() exitEvent = new EventEmitter<any>();
    @Output() errorEvent = new EventEmitter<any>();

    intro = true;
    slide: any;
    scene: any;
    showSaveIcon: boolean = this.story["showSaveButton"];
    showExitButton: boolean = this.story["showExitButton"];
    runtimeError: boolean = false;

    // editor variables
    editorValues: { [key: string]: ComboboxOption[] } = {
        "slideModes": [
            { value: "prompt", viewValue: "Prompt" },
            { value: "choice", viewValue: "Choices" },
            { value: "playSound", viewValue: "Play Sound" },
            { value: "variable", viewValue: "Variable" },
        ],
        "variableModifier": [
            { value: "+", viewValue: "Add" },
            { value: "-", viewValue: "Subtract" },
            { value: "=", viewValue: "Set to" }
        ],
        "editorPage": [
            { value: "slide", viewValue: "Edit Slides" },
            { value: "scene", viewValue: "Edit Scenes" },
            { value: "style", viewValue: "Edit styling" },
            { value: "default", viewValue: "Edit Default data" }
        ],
    }
    createNewSlideButton: boolean = false;
    currentAutocompleteValue: string = "";
    changesMade: boolean = false;
    currentEditorPage: string = "slide";
    // Autocomplete variables
    searchControl = new FormControl();
    filteredData: { id: string; type: any; }[] = [];
    confirmDelete: boolean = false;
    currentWarnings: { [key: string]: string | number }[] = [];
    hiddenWarnings: boolean = true;

    emitSavingEvent(): void {
        if (this.editing) {
            this.saveEditing('slide')
            this.saveEditing('scene')
            this.saveEditing('style')
            this.removeUnusedParamaters(false);
            this.updateFilteredData(this.currentAutocompleteValue)
            this.savingEvent.emit({ "FullStoryDict": { "story": this.story, "scenes": this.scenes, "styling": this.styling } })
        } else {
            this.scene["sceneId"] = this.currentScene;
            this.savingEvent.emit({ "variables": this.variables, "currentSlide": this.currentSlide, "currentScene": { ...this.scene } });
            delete this.scene["sceneId"];
        }
    }

    emitExitEvent(): void {
        if (this.editing) {
            this.exitEvent.emit({ "FullStoryDict": { "story": this.story, "scenes": this.scenes }, "currentSlide": this.currentSlide, "currentScene": this.scene })
        } else {
            this.scene["sceneId"] = this.currentScene;
            this.exitEvent.emit({ "variables": this.variables, "currentSlide": this.currentSlide, "currentScene": { ...this.scene } });
            delete this.scene["sceneId"];
        }
    }

    emitErrorEvent(text: string, errorCode: string | undefined, severity: string = "ERROR"): void {
        this.errorEvent.emit({ "text": text, "errorCode": errorCode, "severity": severity });
    }

    constructor(
        private runtimeService: RuntimeServiceService,
    ) { }

    ngOnInit(): void {
        console.log(this.scenes, this.story, this.styling, this.currentSlide, this.currentScene, this.editing, this.variables);
        this.story = this.deepClone(this.story);
        this.scenes = this.deepClone(this.scenes);
        this.styling = this.deepClone(this.styling);
        this.showSaveIcon = this.story["showSaveButton"];
        this.showExitButton = this.story["showExitButton"];
        if (this.showSaveIcon == undefined) {
            this.showSaveIcon = true;
        }
        if (this.showExitButton == undefined) {
            this.showExitButton = true;
        }
        if (!this.editing) {
            setTimeout(() => {
                this.removeIntro();
                this.loadSelectedSlide();
            }, 1000);
        }
        if (this.currentSlide == "-1") {
            this.currentSlide = this.story.startSlide;
            if (this.currentSlide == "-1") {
                // if startscene is not defined
                this.currentSlide = DefaultIdentifierForExceptions;
                this.slide = this.deepClone(this.story.slides[this.currentSlide]);
            } else {
                if (this.doesThisSlideExist(this.currentSlide)) {
                    this.slide = this.story.slides[this.currentSlide];
                } else {
                    this.slide = this.story.slides[DefaultIdentifierForExceptions];
                }
            }
        } else {
            this.slide = this.story.slides[this.currentSlide];
        }
        if (this.slide == undefined) {
            this.temperedWithFileError({ "slideName": this.currentSlide, "info": "slide does not exist" });
        }
        if (this.currentScene == undefined) {
            this.currentScene = "-1";
        }
        if (this.scenes[this.currentScene] == undefined || this.currentScene == "-1") {
            this.scene = this.scenes[DefaultIdentifierForExceptions];
        } else {
            if (this.doesThisSceneExist(this.currentScene)) {
                this.scene = this.scenes[this.currentScene];
            } else {
                this.scene = this.scenes[DefaultIdentifierForExceptions];
                if (this.scene == undefined) {
                    this.temperedWithFileError({ "sceneName": this.currentScene, "info": "scene does not exist" });
                }
            }
        }


        // Initialize the filteredData observable
        this.searchControl.valueChanges.subscribe(selectedValue => {
            this.currentAutocompleteValue = selectedValue;
            // Manually update the filteredData based on the selectedValue
            this.updateFilteredData(selectedValue);
        });
        this.searchControl.valueChanges.subscribe(selectedValue => {
            this.currentAutocompleteValue = selectedValue;
            if (selectedValue != undefined
                && selectedValue != "" && selectedValue != null
                && Object.keys(this.story.slides).includes(selectedValue.split(":")[0])
                && this.story.slides[selectedValue.split(":")[0]].type == selectedValue.split(": ")[1]
            ) {
                this.createNewSlideButton = false;
                this.currentSlide = selectedValue.split(":")[0];
                if (!this.doesThisSlideExist(this.currentSlide)) {
                    this.currentSlide = DefaultIdentifierForExceptions;
                }
                this.slide = this.deepClone(this.story.slides[this.currentSlide]);
                this.loadSelectedSlide();
            } else if (selectedValue != undefined
                && selectedValue != "" && selectedValue != null
                && !Object.keys(this.story.slides).includes(selectedValue)
                && !Object.keys(this.story.slides).includes(selectedValue.split(":")[0])
            ) {
                this.createNewSlideButton = true;
            }
        });
        if (this.editing) {
            if (!this.doesThisSlideExist(this.currentSlide)) {
                this.currentSlide = DefaultIdentifierForExceptions;
            }
            this.removeIntro();
            this.setValueOfAutocomplete(`${this.currentSlide}: ${this.story.slides[this.currentSlide].type}`);
            this.currentWarnings = this.checkForWarnings();
        }
    }

    removeIntro(): void {
        this.intro = false;
    }

    getSlides(): string[] {
        return Object.keys(this.story.slides);
    }

    getEditorScenesDict(value: any, where: string = "scenes") {
        var keys = Object.keys(value);
        var scenes: ComboboxOption[] = [];
        for (let index = 0; index < keys.length; index++) {
            scenes.push({ "value": keys[index], "viewValue": keys[index] })
        }
        scenes.push({ "value": "-1", "viewValue": "NONE" })
        this.editorValues[where] = scenes;
    }

    saveEditing(mode: string): void {
        function saveSlide(this: VisualNovelComponent) {
            this.story.slides[this.currentSlide] = this.deepClone(this.slide);
        }

        function saveScene(this: VisualNovelComponent) {
            this.scenes[this.currentScene] = this.deepClone(this.scene);
        }

        function saveStyle(this: VisualNovelComponent) {
            this.styling = this.deepClone(this.styling);
        }

        if (mode == "slide") {
            saveSlide.call(this);
        } else if (mode == "scene") {
            saveScene.call(this);
        } else if (mode == "style") {
            saveStyle.call(this);
        }
        this.setEditedValue(false);
    }

    slideTypeChange(): void {
        this.setEditedValue(true)
        if (this.slide['type'] == "variable" && this.slide['variable'] == undefined) {
            this.slide['variable'] = { "name": "defaultVariableName", "type": "+", "value": 1 };
        } else if (this.slide['type'] == "playSound") {
            if (this.slide['sound'] == undefined) {
                this.slide['volume'] = 0.5;
            }
            if (this.slide['sound'] == undefined) {
                this.slide['sound'] = 'https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-55112/zapsplat_aminal_wild_could_be_bear_growl_snarl_001_60537.mp3';
            }

        }
    }

    addOption(): void {
        if (this.slide.choices == undefined) {
            this.slide.choices = [];
        }
        this.slide.choices.push({ "text": "New Option", "next": this.currentSlide });
    }

    deleteOption(index: number) {
        this.slide.choices.splice(index, 1);
    }

    setValueOfAutocomplete(value: string) {
        this.searchControl.setValue(value);
        this.searchControl.markAsDirty(); // Optionally mark the control as dirty
        this.searchControl.updateValueAndValidity(); // Optionally update value and validity
        // Manually update the filteredData based on the selected value
        this.updateFilteredData(value);
    }

    editorTabChange() {
        this.setEditedValue(false)
    }

    // Function to manually update filteredData based on the selected value
    private updateFilteredData(value: string) {
        const filterValue = value.toLowerCase();
        this.filteredData = Object.keys(this.story["slides"])
            .filter(key =>
                key.toLowerCase().includes(filterValue) ||
                this.story["slides"][key].type.toLowerCase().includes(filterValue) ||
                `${key}: ${this.story["slides"][key].type}`.toLowerCase().includes(filterValue))
            .map(key => ({ id: key, type: this.story["slides"][key].type }));
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
        if (this.slide.choices == undefined) {
            this.slide.choices = [];
        }
        var choices = [...this.slide.choices]
        var allowedChoices = [];
        for (let index = 0; index < Object.keys(choices).length; index++) {
            var allowed = true;
            const element = choices[index];
            if (element["if"] != undefined) {
                if (["==", ">", "<", ">=", "<=", "!="].includes(element["if"]["typeOfCheck"]) == false) {
                    element["if"]["typeOfCheck"] = "==";
                }
                if (!["==", "!="].includes(element["if"]["typeOfCheck"]) && isNaN(element["if"]["value"])) {
                    // string to ascii
                    if (element["if"]["value"].length > 1) {
                        element["if"]["value"] = element["if"]["value"].charCodeAt(0);
                    } else {
                        element["if"]["value"] = 0;
                    }
                }
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
        if (this.doesThisSlideExist(this.currentSlide)) {
            this.slide = this.deepClone(this.story.slides[this.currentSlide]);
            this.loadSelectedSlide();
        } else {
            this.createErrorMessage("Unable to redirect user to a slide that does not exist.\nCheck console for details.");
        }
    }

    loadSelectedSlide() {
        if (this.runtimeError) {
            return;
        }
        if (this.slide.scene != undefined && this.slide.scene != "-1") {
            if (this.doesThisSceneExist(this.slide.scene)) {
                this.scene = this.scenes[this.slide.scene];
            } else {
                this.createErrorMessage("The scene that should be here does not exist.\nCheck console for details.");
                this.scene = this.scenes[DefaultIdentifierForExceptions];
            }
        } else if (this.scene == undefined) {
            this.scene = this.scenes[DefaultIdentifierForExceptions];

        } else if (this.editing
            && (this.slide.scene == "-1" || this.slide.scene == undefined)
        ) {
            this.slide.scene = "-1";
        }
        if (this.scene == undefined) {
            this.temperedWithFileError({ "sceneName": this.currentScene, "info": "scene does not exist" });
        }


        if (this.slide.type == "variable" && !this.editing) {
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
        } else if (this.slide.type == "playSound" && !this.editing) {
            if (isNaN(this.slide.volume)) {
                this.slide.volume = 0.5;
            }
            this.setVolume(this.slide.volume);
            this.playAudio(this.slide.sound);
            this.clickChoice();
        } else if (this.slide.type == "choice") {
            this.getAllChoices();
        }
        if (this.editing) {
            if (this.slide['nextSlideText'] == undefined) {
                this.slide['nextSlideText'] = this.story['defaultNextSlideText'];
            }
            if (this.slide['promptStyling'] == undefined) {
                this.slide['promptStyling'] = '-1';
            }
            if (this.slide['style'] == undefined) {
                this.slide['style'] = '-1';
            }
            this.getEditorScenesDict(this.scenes, "scenes");
            this.getEditorScenesDict(this.styling['styles'], "styles");
        }
    }

    stringifyObject(obj: any) {
        return JSON.stringify(obj);
    }

    createSlide(slideName: string, settings: { [key: string]: any } = {}) {
        this.story.slides[slideName] = { "type": "prompt", "text": this.story['defaultNextSlideText'], "next": "-1", "scene": "-1" };
        if (settings["setAutocomplete"] != undefined && settings["setAutocomplete"]) {
            this.setValueOfAutocomplete(`${slideName}: ${this.story.slides[slideName].type}`);
        }
        if (settings["removeCreateButton"] != undefined && settings["removeCreateButton"]) {
            this.createNewSlideButton = false;
        }

    }

    deleteSlide(slideName: string) {
        if (this.confirmDelete) {
            if (this.story.slides[slideName] == undefined) {
                this.createErrorMessage("Unable to delete a slide that does not exist.\nCheck console for details.", { "errorCode": "404", "severity": "WARNING", "debug": { "slideName": slideName } });
                this.confirmDelete = false;
                return;
            }
            if (Object.keys(this.story.slides).length == 1) {
                this.createErrorMessage("Unable to delete the last slide.\nCheck console for details.", { "errorCode": "403", "severity": "WARNING", "debug": { "slideName": slideName } });
                this.confirmDelete = false;
                return;
            }
            if (DefaultIdentifierForExceptions == slideName) {
                this.createErrorMessage("Unable to delete the default slide.\nCheck console for details.", { "errorCode": "403", "severity": "WARNING", "debug": { "slideName": slideName, "info": "number " + DefaultIdentifierForExceptions + " is set as the default number. This means that in case of an exception, it will default to this slide. This means that you cannot delete this slide." } });
                this.confirmDelete = false;
                return;
            }
            delete this.story.slides[slideName];
            this.confirmDelete = false;
            this.createNewSlideButton = false;
            if (this.currentSlide == slideName) {
                this.currentSlide = Object.keys(this.story.slides)[0];
                this.slide = this.deepClone(this.story.slides[this.currentSlide]);
                this.loadSelectedSlide();
                this.setValueOfAutocomplete(`${this.currentSlide}: ${this.story.slides[this.currentSlide].type}`);
            }
        } else {
            this.confirmDelete = true;
            setTimeout(() => {
                this.confirmDelete = false;
            }, 3000);
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

    tryToPlayAudio(from: string = 'slide'): void {
        if (from == 'slide') {
            if (this.slide.sound != undefined) {
                this.setVolume(this.slide.volume);
            }
            this.playAudio(this.slide.sound);
        } else if (from == 'scene') {
            if (this.scene.sound != undefined) {
                this.setVolume(this.scene.volume);
            }
            this.playAudio(this.scene.music);
        }
    }

    setEditedValue(value: boolean): void {
        this.changesMade = value;
    }

    slideSceneChange(): void {
        this.setEditedValue(true);
        if (this.scenes[this.slide.scene] == undefined || this.slide.scene == "-1") {
            this.scene = this.scenes[DefaultIdentifierForExceptions];
            this.slide.scene = "-1";
            return;
        }
        if (this.doesThisSceneExist(this.slide.scene)) {
            this.scene = this.deepClone(this.scenes[this.slide.scene]);
        } else {
            this.createErrorMessage("The scene that should be here does not exist.\nCheck console for details.");
            this.scene = this.scenes[DefaultIdentifierForExceptions];
        }
    }

    doesThisSlideExist(id: string): boolean {
        return this.story.slides[id] != undefined;
    }

    doesThisSceneExist(id: string): boolean {
        return this.scenes[id] != undefined;
    }

    doesThisStyleExist(id: string): boolean {
        return this.styling['styles'][id] != undefined;
    }

    getStyles(): string[] {
        return Object.keys(this.styling['styles']);
    }

    createErrorMessage(message: string, data: { [key: string]: any } = {}): void {
        var errorMessage = "";
        var errorCode = "";
        var severity = "";
        var errorObject: { [key: string]: any } = {}
        if (message == "The scene that should be here does not exist.\nCheck console for details.") {
            errorMessage = message;
            errorCode = "404";
            severity = "WARNING";
            errorObject = {
                "debug": {
                    "sceneTryingToLoad": this.slide.scene,
                    "currentSlideData": { ...this.slide }
                }
            }
        } else if (message == "Unable to redirect user to a slide that does not exist.\nCheck console for details.") {
            errorMessage = message;
            errorCode = "404";
            severity = "ERROR";
            errorObject = {
                "debug": {
                    "slideToNavigateTo": this.currentSlide,
                    "currentSlideData": { ...this.slide }
                }
            }
        } else if (JSON.stringify(data) != JSON.stringify({})) {
            errorMessage = message;
            errorCode = data["errorCode"];
            severity = data["severity"];;
            errorObject = {
                "debug": data["debug"]
            }
        } else {
            errorMessage = message;
            errorCode = "000";
            severity = "ERROR";
            errorObject = {
                "debug": {
                    "currentSlideData": { ...this.slide }
                }
            }
        }
        errorObject["error"] = {
            "message": errorMessage,
            "code": errorCode,
            "severity": severity,
        }
        this.emitErrorEvent(errorMessage, errorCode, severity);
        if (severity == "ERROR") {
            console.error("error:", errorObject);
        } else if (severity == "WARNING") {
            console.warn("warning:", errorObject);
        } else {
            console.log("info:", errorObject);
        }
    }

    temperedWithFileError(debug: { [key: string]: any } = {}): void {
        this.runtimeError = true;
        debug["DefaultIdentifierForExceptions"] = DefaultIdentifierForExceptions;
        debug["information"] = "The game file has been tempered with. This means that the game file has been changed in a way that it should not have been changed. Make sure that " + DefaultIdentifierForExceptions + " is set as the default number. This means that in case of an exception, it will default to this slide / stye / theme / etc. This means that you cannot delete this slide / stye / theme / etc.";
        this.createErrorMessage("The game file has been tempered with.\nCheck console for details.", { "errorCode": "403", "severity": "ERROR", "debug": debug });
    }

    removeUnusedParamaters(bigRemove: boolean): void {
        for (let index = 0; index < Object.keys(this.story.slides).length; index++) {
            var slide = Object.keys(this.story.slides)[index];
            if (this.story.slides[slide].type == "prompt" && bigRemove) {
                delete this.story.slides[slide]["choices"];
                delete this.story.slides[slide]["sound"];
                delete this.story.slides[slide]["variable"];
                delete this.story.slides[slide]["volume"];
            } else if (this.story.slides[slide].type == "choice" && bigRemove) {
                delete this.story.slides[slide]["text"];
                delete this.story.slides[slide]["sound"];
                delete this.story.slides[slide]["volume"];
                delete this.story.slides[slide]["variable"];
                delete this.story.slides[slide]["next"];
                delete this.story.slides[slide]["nextSlideText"];
            } else if (this.story.slides[slide].type == "playSound" && bigRemove) {
                delete this.story.slides[slide]["choices"];
                delete this.story.slides[slide]["text"];
                delete this.story.slides[slide]["nextSlideText"];
                delete this.story.slides[slide]["promptStyling"];
                delete this.story.slides[slide]["variable"];
            } else if (this.story.slides[slide].type == "variable" && bigRemove) {
                delete this.story.slides[slide]["choices"];
                delete this.story.slides[slide]["text"];
                delete this.story.slides[slide]["scene"];
                delete this.story.slides[slide]["sound"];
                delete this.story.slides[slide]["volume"];
                delete this.story.slides[slide]["nextSlideText"];
                delete this.story.slides[slide]["promptStyling"];
            } else if (bigRemove) {
                console.warn("Unknown slide type: " + this.story.slides[index].type);
            }
            if (this.story.slides[slide].scene == "-1") {
                delete this.story.slides[slide]["scene"];
            }
            if (this.story.slides[slide]['nextSlideText'] == this.story["defaultNextSlideText"] && bigRemove) {
                delete this.story.slides[slide]['nextSlideText'];
            }
            if (this.story.slides[slide]['promptStyling'] == this.styling["default"]["textBox"] || this.story.slides[slide]['promptStyling'] == '-1') {
                delete this.story.slides[slide]['promptStyling'];
            }
            if (this.story.slides[slide]['style'] == this.styling["default"]["nextSlide"] || this.story.slides[slide]['style'] == '-1') {
                delete this.story.slides[slide]['style'];
            }
        }
    }

    checkForWarnings(): { [key: string]: string | number }[] {
        function addWarning(warning: string, severity: string, where: string): void {
            warningDictList.push({ "position": number, "warning": warning, "severity": severity, "where": where });
            number += 1;
        }

        var number = 1;
        var warningDictList: { [key: string]: string | number }[] = [];
        for (let index = 0; index < Object.keys(this.story.slides).length; index++) {
            var slide = this.story.slides[Object.keys(this.story.slides)[index]];
            var slideId = Object.keys(this.story.slides)[index];
            if (slide["type"] == "choice") {
                if (slide["choices"] == undefined) {
                    slide["choices"] = [];
                }
                if (Object.keys(slide["choices"]).length == 0) {
                    addWarning("Slide '" + slideId + "' has no choices. This means that the game will end here.", "ERROR", "slide " + slideId);
                } else {
                    for (let index2 = 0; index2 < Object.keys(slide["choices"]).length; index2++) {
                        var choice = slide["choices"][Object.keys(slide["choices"])[index2]];
                        if (choice["next"] == "-1") {
                            addWarning("Slide '" + slideId + "' has a choice that does not lead anywhere, because -1 is invalid. This means that the game will end here.", "ERROR", "slide " + slideId);
                        } else if (this.doesThisSlideExist(choice["next"]) == false) {
                            addWarning("Slide '" + slideId + "' has a choice that leads to a slide that does not exist. This means that the game will end here.", "WARNING", "slide " + slideId);
                        }
                    }
                }
            } else {
                if (slide["next"] == "-1") {
                    addWarning("Slide '" + slideId + "' has no valid next slide. This means that the game will end here.", "ERROR", "slide " + slideId);
                } else if (this.doesThisSlideExist(slide["next"]) == false) {
                    addWarning("Slide '" + slideId + "' has a next slide that does not exist. This means that the game will end here.", "WARNING", "slide " + slideId);
                }
            }
        }
        if (this.story.slides[this.story.startSlide] == undefined) {
            addWarning("The start slide: '" + this.story.startSlide + "', does not exist. This means that it will take system default.", "WARNING", "slide " + this.story.startSlide);
        }
        if (this.story.slides[DefaultIdentifierForExceptions] == undefined) {
            addWarning("The default slide: '" + DefaultIdentifierForExceptions + "', does not exist. This means that it will take system default.", "ERROR", "slide " + DefaultIdentifierForExceptions);
        }
        if (!this.doesThisStyleExist(this.styling["default"]["nextSlide"])) {
            addWarning("The default next slide style: '" + this.styling["default"]["nextSlide"] + "', does not exist does not exist and will be ignored.", "WARNING", "default nextSlide style");
        }
        if (!this.doesThisStyleExist(this.styling["default"]["textBox"])) {
            addWarning("The default text box style: '" + this.styling["default"]["textBox"] + "', does not exist does not exist and will be ignored.", "WARNING", "default textBox style");
        }
        if (!this.doesThisStyleExist(this.styling["default"]["choices"])) {
            addWarning("The default choices style: '" + this.styling["default"]["choices"] + "', does not exist does not exist and will be ignored.", "WARNING", "default choices style");
        }
        if (this.story['defaultNextSlideText'] == '') {
            addWarning("The default next slide text is empty. Default Next slide text is empty, is this on purpose?", "WARNING", "defaultNextSlideText");
        }

        return warningDictList;
    }

    debug() {
        console.log(this.story, this.scenes, this.styling, this.currentSlide, this.currentScene, this.editing, this.variables)
    }

}

