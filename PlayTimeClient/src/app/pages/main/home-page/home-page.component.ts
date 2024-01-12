import { Component, NgZone, OnInit } from '@angular/core';
import { Settings } from 'src/app/data/settings';
import { BuildData } from 'src/app/models/buildData';
import { AudioPlayerService } from 'src/app/services/audio-player.service';
import { MarioClicker } from 'src/app/data/gamesData';
import { environment } from 'src/environments/environment';
import { AdHandler } from 'src/app/models/adHandler';
import { Encryptor } from 'src/app/models/encryptor';
import { BackendServiceService } from 'src/app/services/backend-service.service';
import { BackendMiddlemanService } from 'src/app/services/backend-middleman.service';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
    versionNumber = BuildData["BuildNumber"];
    versionWord = "BuildId";
    counters = {
        "internships": {
            "todo": 1300,
            "done": 0,
            "average": 0,
            "modifier": 851,
            "gotFromApi": false,
            "lastInsert": undefined
        }
    }
    admin: boolean = false;
    amount: number = 8;

    constructor(
        private backendMiddlemanService: BackendMiddlemanService,
        private backendServiceService: BackendServiceService) { }

    ngOnInit(): void {
        this.backendMiddlemanService.getCounter('internships').then((data) => {
            this.canclulateCounterData(data)
        });
        this.backendServiceService.addMessage("/admintest", "").subscribe((data) => {
            this.admin = true;
        },
            (error) => {
                this.admin = false;
            });
    }

    logBuildData() {
        console.log(BuildData);
    }

    submitHours() {
        this.backendServiceService.addCounterIteration(this.amount * 60, 'internships').subscribe((data) => {
            console.log(data)
            this.backendMiddlemanService.getCounter('internships', true).then((data) => {
                console.log(data)
                this.canclulateCounterData(data)
            });
        });
    }
    roundDownToOneDecimal(num: number): number {
        return Math.floor(num * 10) / 10;
    }

    canclulateCounterData(data: any) {
        this.counters.internships.done = this.roundDownToOneDecimal((data.totalMinutes / 60) + this.counters.internships.modifier);
        try {
            this.counters.internships.average = this.roundDownToOneDecimal((data.totalMinutes / 60) / data.amountOfInserts);
            this.counters.internships.average = this.roundDownToOneDecimal((this.counters.internships.average));
        } catch (error) {
            this.counters.internships.average = 0;
        }
        if (Number.isNaN(this.counters.internships.average)) {
            this.counters.internships.average = 0;
        }
        this.counters.internships.gotFromApi = true;
        this.counters.internships.lastInsert = data.last;
    }
}
