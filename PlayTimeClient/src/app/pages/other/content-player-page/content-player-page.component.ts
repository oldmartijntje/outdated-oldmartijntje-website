import { Component } from '@angular/core';
import { Styling, DefaultScenes, DefaultStory } from '../../../data/media'

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

    messageFromChild: any;

    handleSavingEvent(message: any) {
        this.messageFromChild = message;
        console.log(this.messageFromChild);
    }
}
