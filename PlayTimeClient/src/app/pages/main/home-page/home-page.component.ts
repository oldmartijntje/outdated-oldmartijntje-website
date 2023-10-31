import { Component } from '@angular/core';
import { Settings } from 'src/app/data/settings';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
    versionNumber = Settings["version"]["value"];
    versionWord = Settings["version"]["word"];
}
