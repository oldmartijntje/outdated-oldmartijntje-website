import { Component } from '@angular/core';
import { Settings } from 'src/app/data/settings';
import { BuildData } from 'src/app/models/buildData';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
    versionNumber = BuildData["BuildNumber"];
    versionWord = "BuildId";

    logBuildData() {
        console.log(BuildData);
    }
}
