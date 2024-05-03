import { Component, NgZone, OnInit } from '@angular/core';
import { BuildData } from 'src/app/models/buildData';
import { BackendServiceService } from 'src/app/services/backend-service.service';
import { BackendMiddlemanService } from 'src/app/services/backend-middleman.service';
import { ToastQueueService } from 'src/app/services/toast-queue.service';
import { CommonModel } from 'src/app/models/commonModel';
import { Router } from '@angular/router';

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
            "todo": 1100,
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
        private backendServiceService: BackendServiceService,
        private toastQueue: ToastQueueService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.backendMiddlemanService.getCounter('internships').then((data) => {
            this.canclulateCounterData(data)
        });
        this.backendServiceService.addMessage("/admintest", "").subscribe((data) => {
            this.admin = true;
        },
            (error) => {
                this.admin = false;
            }
        );
    }

    logBuildData() {
        console.log(BuildData);
    }

    goToLink(link: string): void {
        CommonModel.navigateToLink(this.router, link);
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

    clickedTheInfoButton() {
        this.toastQueue.enqueueToast('This statistic is calculated by deviding the total hours left by the daily average.', 'info', 1);
    }
}
