import { Component, OnInit } from '@angular/core';

interface Step {
    stepText: string
    timelineId: number
    id: number
    parentTimelineId: number | undefined
}

@Component({
    selector: 'app-step-tracker-page',
    templateUrl: './step-tracker-page.component.html',
    styleUrl: './step-tracker-page.component.scss'
})

export class StepTrackerPageComponent implements OnInit {
    // Dear me,
    //
    // I'm sorry for the mess I made. I tried to make a step tracker, I really did. But it didn't work perfectly. I hope you can fix it.
    // If you can't, I'm sorry. I tried my best.
    // I wish you the best of luck with this mess of a code.
    //
    // Kind regards,
    // Your past self

    // Dear past me,
    //
    // Thank you for your kind words.
    // I fixed the code, and it works perfectly now.
    // I'm sorry you had to go through this.
    //
    // Kind regards,
    // Your present self

    markdownMode = 'mode2'
    inputFieldText = ''

    steps: Step[] = []
    currentTimelineId = 0
    currentId = 0
    outputDoc = ''
    parentBranchId: number | undefined = undefined

    branches: { [key: number]: Step[] } = {}

    indentation = '  '

    timelineList: Step[] = []

    lastStep: Step | undefined = undefined

    alternativePath: boolean = true

    showLineBraks: boolean = true

    truncateTextMode = 'strikethrough'

    ngOnInit(): void {
        this.constructTimeline()
        // for (var i = 0; i < 10; i++) {
        //     this.onEnterKeyPressed(`${i + 1}`)
        // }
        // this.onEnterKeyPressed('2')
        // this.onEnterKeyPressed('2.1')
        // this.onEnterKeyPressed('2.2')
        // this.onEnterKeyPressed('4')
        // this.onEnterKeyPressed('4.01')
        // this.onEnterKeyPressed('4.02')
        // this.onEnterKeyPressed('2.2')
        // this.onEnterKeyPressed('2.3')
        // this.onEnterKeyPressed('2.4')
        // this.onEnterKeyPressed('1')
        // this.onEnterKeyPressed('1.001')
        // this.onEnterKeyPressed('2')
        // this.onEnterKeyPressed('2.0001')
        // this.onEnterKeyPressed('4.02')
        // this.onEnterKeyPressed('4.03')
        // this.onEnterKeyPressed('2.3')
        // this.onEnterKeyPressed('2.31')
        // this.onEnterKeyPressed('2.32')
        // this.onEnterKeyPressed('10')
        // this.onEnterKeyPressed('11')
    }

    onEnterKeyPressed(text: string = '') {
        if (text != '') {
            this.inputFieldText = text
        }
        if (this.inputFieldText == '') {
            return
        }
        var item: Step | undefined = this.steps.slice().reverse().find(x => x.stepText === this.inputFieldText);
        if (item === undefined) {
            this.steps.push({ stepText: this.inputFieldText, timelineId: this.currentTimelineId, id: this.currentId, parentTimelineId: this.parentBranchId });
            this.currentId++;
            this.lastStep = this.steps[this.steps.length - 1];
            this.parentBranchId = this.currentTimelineId;
        } else {
            this.lastStep = item;
            this.parentBranchId = item.timelineId;
            this.currentId = item.id + 1;
            this.currentTimelineId += 1;
        }
        this.inputFieldText = '';
        this.constructTimeline()
    }

    onModeChange() {
        this.constructTimeline()
    }

    onPathChange() {
        this.constructTimeline()
    }

    constructTimeline() {
        if (this.lastStep) {
            this.timelineList = []
            this.findParentsOfStep(this.lastStep)
        }
        var mainTimeline = [...this.timelineList]
        if (this.alternativePath) {
            this.steps.sort((a, b) => a.timelineId + b.timelineId);
            // for all steps, chjeck if it is already in the timelineList,
            // if it is not, don't add it to the list using findParentsOfStep()
            for (var i = 0; i < this.steps.length; i++) {
                if (!this.timelineList.includes(this.steps[i])) {
                    this.findParentsOfStep(this.steps[i])
                }
            }
        }
        this.printOutput(mainTimeline)

    }

    findParentsOfStep(step: Step) {
        // find the parent of the step
        // using a while loop, so that we don't need to worry about incursion
        if (this.timelineList.includes(step)) {
            return
        }
        var queue: Step[] = []
        queue.push(step)
        var found = false
        var child = step
        while (!found) {
            var parent = this.steps.find(x => x.timelineId === child.parentTimelineId && x.id === child.id - 1);
            if (parent) {
                if (!this.timelineList.includes(parent)) {
                    queue.push(parent);
                    child = parent;
                } else {
                    found = true;
                }
            } else {
                found = true;
            }
        }
        // for each item in the queue.reverse(), add it to the timelineList behind it's parent.
        // if the parent is undefined, add it to the start of the list
        var queueReversed = queue.reverse()
        for (var i = 0; i < queueReversed.length; i++) {
            if (queueReversed[i].parentTimelineId === undefined) {
                this.timelineList.unshift(queueReversed[i])
            } else {
                var index = this.timelineList.findIndex(x => x.timelineId === queueReversed[i].parentTimelineId && x.id === queueReversed[i].id - 1)
                this.timelineList.splice(index + 1, 0, queueReversed[i])
            }
        }


    }

    printOutput(mainTimeline: Step[]) {
        this.outputDoc = ''

        this.timelineList.sort((a, b) => a.timelineId + b.timelineId);

        var mainCounter = 0;
        var displayNumber = 0;

        var mainTimelineStep = true;
        var indentation: number[] = []
        var numberingPerIndentation: { [key: number]: number } = {}
        for (var i = 0; i < this.timelineList.length; i++) {

            if (!mainTimeline.includes(this.timelineList[i])) {
                mainTimelineStep = false;
                if (!indentation.includes(this.timelineList[i].timelineId)) {
                    var parentBranchId = this.timelineList[i].parentTimelineId;
                    if (parentBranchId && indentation.includes(parentBranchId)) {
                        numberingPerIndentation[this.timelineList[i].timelineId] = numberingPerIndentation[parentBranchId] + 1;
                    } else {
                        var indentation: number[] = []
                        numberingPerIndentation[this.timelineList[i].timelineId] = mainCounter + 1;
                    }
                    indentation.push(this.timelineList[i].timelineId);
                } else {
                    numberingPerIndentation[this.timelineList[i].timelineId]++
                }
                // get the id of what place in the array the timelineId is
                var indexOfId = indentation.indexOf(this.timelineList[i].timelineId);
                indexOfId += 1
                for (var j = 0; j < indexOfId; j++) {
                    this.outputDoc += this.indentation
                }
                displayNumber = numberingPerIndentation[this.timelineList[i].timelineId];


            } else {
                mainTimelineStep = true;
                numberingPerIndentation = {}
                indentation = [];
                mainCounter += 1;
                displayNumber = mainCounter;
            }
            if (this.markdownMode === 'mode2') {
                this.outputDoc += (displayNumber) + '. '
            }
            if (this.markdownMode === 'mode3') {
                this.outputDoc += '- '
            }
            if (this.markdownMode === 'mode4') {
                this.outputDoc += '- [ ] '
            }
            if (!mainTimelineStep) {
                if (this.truncateTextMode === 'strikethrough') {
                    this.outputDoc += '~~'
                } else if (this.truncateTextMode === 'comment') {
                    this.outputDoc += '//'
                } else if (this.truncateTextMode === 'italics') {
                    this.outputDoc += '<i>'
                } else if (this.truncateTextMode === 'underlined') {
                    this.outputDoc += '<u>'
                }
            }
            this.outputDoc += this.timelineList[i].stepText
            if (!mainTimelineStep) {
                if (this.truncateTextMode === 'strikethrough') {
                    this.outputDoc += '~~'
                } else if (this.truncateTextMode === 'italics') {
                    this.outputDoc += '</i>'
                } else if (this.truncateTextMode === 'underlined') {
                    this.outputDoc += '</u>'
                }
            }
            if (this.showLineBraks) {
                this.outputDoc += '<br>'
            }
            this.outputDoc += '\n'
        }
    }
}
