import { Component, NgZone, OnInit } from '@angular/core';
import { Settings } from 'src/app/data/settings';
import { BuildData } from 'src/app/models/buildData';
import { AudioPlayerService } from 'src/app/services/audio-player.service';
import { MarioClicker } from 'src/app/data/gamesData';
import { environment } from 'src/environments/environment';
import { AdHandler } from 'src/app/models/adHandler';
import { Encryptor } from 'src/app/models/encryptor';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
    versionNumber = BuildData["BuildNumber"];
    versionWord = "BuildId";

    ngOnInit(): void { }

    logBuildData() {
        console.log(BuildData);
    }
}
