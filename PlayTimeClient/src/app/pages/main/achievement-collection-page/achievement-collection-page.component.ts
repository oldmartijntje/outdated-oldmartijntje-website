import { Component, OnInit } from '@angular/core';
import { Achievement, AchievementType, AchievementSettings, achievements } from '../../../data/achievements';
import { RuntimeServiceService } from 'src/app/services/runtime-service.service';
import { LocalstorageHandlingService } from 'src/app/services/localstorage-handling.service';
import { CommonModel } from 'src/app/models/commonModel';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'app-achievement-collection-page',
    templateUrl: './achievement-collection-page.component.html',
    styleUrl: './achievement-collection-page.component.scss'
})
export class AchievementCollectionPageComponent implements OnInit {
    achievementsTypeDict: { [key: string]: Achievement[] } = {}; // Initialize with your actual achievements data
    achievementTypes: AchievementType[] = [AchievementType.Achievement, AchievementType.Secret, AchievementType.EasterEgg];
    mobileMode = false;
    counters = {
        normal: {
            Achievement: {
                found: 0,
                total: 0
            },
            Secret: {
                found: 0,
                total: 0
            },
            EasterEgg: {
                found: 0,
                total: 0
            }
        },
        mobileMode: {
            Achievement: {
                found: 0,
                total: 0
            },
            Secret: {
                found: 0,
                total: 0
            },
            EasterEgg: {
                found: 0,
                total: 0
            }
        }
    }

    constructor(
        private runtimeService: RuntimeServiceService,
        private localstorageHandlingService: LocalstorageHandlingService,
        private router: Router,
        private sanitizer: DomSanitizer
    ) { }

    ngOnInit(): void {
        for (const achievement of achievements) {
            const response = this.localstorageHandlingService.getLocalstorageHandler().checkAndLoad(achievement.localstorageUrl);
            if (response != achievement.unlocksWhenLocolStorageUrlIsSetTo) {
                achievement.found = false;
                if (!achievement.hideOnMobile) {
                    this.counters.mobileMode[achievement.type].total++;
                    this.counters.normal[achievement.type].total++;
                } else {
                    this.counters.normal[achievement.type].total++;
                }
            } else {
                achievement.found = true;
                this.counters.mobileMode[achievement.type].found++;
                this.counters.mobileMode[achievement.type].total++;
                this.counters.normal[achievement.type].found++;
                this.counters.normal[achievement.type].total++;
            }
            if (this.achievementsTypeDict[achievement.type] == undefined) {
                this.achievementsTypeDict[achievement.type] = [];
            }
            this.achievementsTypeDict[achievement.type].push({ ...achievement });
        }
        // sort all achievement types by found first
        for (const type of this.achievementTypes) {
            if (this.achievementsTypeDict[type] == undefined) {
                this.achievementsTypeDict[type] = [];
            }
            this.achievementsTypeDict[type] = this.achievementsTypeDict[type].sort((a, b) => {
                if (a.found && !b.found) {
                    return -1;
                } else if (!a.found && b.found) {
                    return 1;
                } else {
                    return 0;
                }
            });
        }



        this.runtimeService.mobileModeSubjectValue$.subscribe((value) => {
            this.mobileMode = value['MobileMode'];
        });
    }

    isUnlocked(achievement: Achievement): boolean {
        // Check if the achievement is unlocked based on local storage URL
        const unlocked = localStorage.getItem(achievement.localstorageUrl);
        return unlocked === achievement.unlocksWhenLocolStorageUrlIsSetTo.toString();
    }

    goToLink(url: string): void {
        CommonModel.navigateToLink(this.router, url);
    }

    convertMarkdownLinksToHtml(title: string): SafeHtml {
        const regex = /\[(.*?)\]\((.*?)\)/g;
        return this.sanitizer.bypassSecurityTrustHtml(title.replace(regex, '<a href="$2" target="_blank" style="color: #e05b3e">$1</a>'));
    }

}
