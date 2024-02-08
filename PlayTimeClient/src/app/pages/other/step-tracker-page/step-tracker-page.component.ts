import { Component, OnInit } from '@angular/core';

interface Step {
    stepText: string
    timelineId: number
    id: number
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

    markdownMode = 'mode2'
    inputFieldText = ''

    steps: Step[] = []
    currentTimelineId = 0
    currentId = 0
    outputDoc = ''

    branches: { [key: number]: Step[] } = {}

    indentation = '  '

    timelineList: Step[] = []

    lastStep: Step | undefined = undefined

    alternativePath: boolean = false

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

    }

    onEnterKeyPressed(text: string = '') {
        if (text != '') {
            this.inputFieldText = text
        }
        if (this.inputFieldText == '') {
            return
        }
        var item: Step | undefined = this.steps.slice().reverse().find(x => x.stepText === this.inputFieldText)
        if (item === undefined) {
            this.steps.push({ stepText: this.inputFieldText, timelineId: this.currentTimelineId, id: this.currentId });
            this.currentId++;
            this.lastStep = this.steps[this.steps.length - 1]
        } else {
            var newItem = item;
            const filteredSteps = this.steps.filter(step => step.timelineId <= newItem.timelineId && step.id <= newItem.id);
            if (filteredSteps.length > 0) {
                for (var i = 0; i < filteredSteps.length; i++) {
                    filteredSteps[i].timelineId = this.currentTimelineId + 1;
                }
            }
            this.lastStep = newItem
            this.currentId = item.id + 1;
            this.currentTimelineId += 1;
        }
        this.inputFieldText = '';
        this.constructTimeline()
    }

    onModeChange() {
        this.printOutput()
    }

    onPathChange() {
        this.printOutput()
    }


    constructTimeline() {
        var timeline = []
        var currentTimelineId = 0
        var highestIdItem = this.steps.reduce((maxItem: Step | null, currentItem: Step) => {
            return (currentItem.id > (maxItem ? maxItem.id : 0)) ? currentItem : maxItem;
        }, null);
        if (highestIdItem) {
            for (var i = 0; i <= highestIdItem.id; i++) {
                var item = this.steps.slice().reverse().find(x => x.id === i)
                if (item) {
                    if (item.timelineId < currentTimelineId) {
                        continue
                    }
                    if (item.timelineId > currentTimelineId) {
                        currentTimelineId = item.timelineId
                    }
                    timeline.push(item)
                }
            }
        }
        this.timelineList = timeline
        this.printOutput()
    }

    printOutput() {
        this.outputDoc = ''

        var listToWorkFrom = []
        if (this.alternativePath) {
            listToWorkFrom = this.steps
        } else {
            listToWorkFrom = this.timelineList
        }
        listToWorkFrom.sort((a, b) => a.timelineId + b.timelineId);
        var lastI = 0
        var itemNumber = 0
        var indentation: number[] = []
        for (var i = 0; i < listToWorkFrom.length; i++) {
            if (!this.inFinalPath(listToWorkFrom[i])) {
                if (!indentation.includes(listToWorkFrom[i].timelineId)) {
                    indentation.push(listToWorkFrom[i].timelineId)
                }
                // get the id of what place in the array the timelineId is
                var indexOfId = indentation.indexOf(listToWorkFrom[i].timelineId)
                indexOfId += 1
                for (var j = 0; j < indexOfId; j++) {
                    this.outputDoc += this.indentation
                }
                this.outputDoc += '//'
                if (lastI == itemNumber) {
                    lastI = itemNumber - 1
                }
            } else {
                if (itemNumber != lastI) {
                    itemNumber = lastI + 1
                }
                lastI++
                indentation = []

            }
            if (this.markdownMode === 'mode2') {
                this.outputDoc += (itemNumber + 1) + '. '
            }
            if (this.markdownMode === 'mode3') {
                this.outputDoc += '- '
            }
            if (this.markdownMode === 'mode4') {
                this.outputDoc += '- [ ] '
            }
            this.outputDoc += listToWorkFrom[i].stepText + '\n'
            itemNumber++
        }
    }

    inFinalPath(item: Step) {
        return JSON.stringify(this.timelineList).includes(JSON.stringify(item))
    }

}
