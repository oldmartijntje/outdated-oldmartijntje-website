import { Component, OnInit } from '@angular/core';
import { Achievement, AchievementType, AchievementSettings, achievements } from '../../../data/achievements';
import { RuntimeServiceService } from 'src/app/services/runtime-service.service';
import { LocalstorageHandlingService } from 'src/app/services/localstorage-handling.service';
import { CommonModel } from 'src/app/models/commonModel';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ToastQueueService } from 'src/app/services/toast-queue.service';

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
    buttonTitle: string = '';
    hideFoundAchievements: boolean = false;

    constructor(
        private runtimeService: RuntimeServiceService,
        private localstorageHandlingService: LocalstorageHandlingService,
        private router: Router,
        private sanitizer: DomSanitizer,
        private toastQueue: ToastQueueService
    ) { }

    ngOnInit(): void {
        this.toggleGottenAcheievements();
        for (const achievement of achievements) {
            const response = this.localstorageHandlingService.getLocalstorageHandler().checkAndLoad(achievement.localstorageUrl);
            if (response != achievement.unlocksWhenLocolStorageUrlIsSetTo && !(typeof achievement.unlocksWhenLocolStorageUrlIsSetTo == typeof response && response > achievement.unlocksWhenLocolStorageUrlIsSetTo)) {
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
                if (!this.hideFoundAchievements) {
                    if (a.found && !b.found) {
                        return -1;
                    } else if (!a.found && b.found) {
                        return 1;
                    } else {
                        if (a.difficulty > b.difficulty) {
                            return 1;
                        }
                        if (a.difficulty < b.difficulty) {
                            return -1;
                        }
                        return 0;
                    }
                } else {
                    if (a.difficulty > b.difficulty) {
                        return 1;
                    } else if (a.difficulty < b.difficulty) {
                        return -1;
                    } else {
                        return 0;
                    }
                }
            });
        }



        this.runtimeService.mobileModeSubjectValue$.subscribe((value) => {
            this.mobileMode = value['MobileMode'];
        });
    }

    toggleGottenAcheievements() {
        if (this.buttonTitle == 'Hide Unlocked') {
            this.buttonTitle = 'Show Unlocked';
            this.hideFoundAchievements = true;
        } else {
            this.buttonTitle = 'Hide Unlocked';
            this.hideFoundAchievements = false;
        }
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

    achievementClick(achievement: Achievement): void {
        if (achievement.localstorageUrl == "easterEggs.firstOneFree" && !achievement.found) {
            this.localstorageHandlingService.addEditRequestToQueue(true, "easterEggs.firstOneFree");
            this.localstorageHandlingService.immediatlyGoThroughQueue();
            this.counters.normal[achievement.type].found++;
            this.counters.mobileMode[achievement.type].found++;
            achievement.found = true;
            this.toastQueue.enqueueToast("You found the \"The first one\'s always free\" Achievement!", 'achievement', 69420)
        }
    }

    checkForVariableAchievement(achievement: Achievement): number | null {
        if (typeof achievement.unlocksWhenLocolStorageUrlIsSetTo == "number") {
            const response = this.localstorageHandlingService.getLocalstorageHandler().checkAndLoad(achievement.localstorageUrl);
            if (typeof response == 'number') {
                return response
            } else {
                return 0
            }
        } else {
            return null
        }
    }

    calculateAchievementProgress(achievement: Achievement): number {
        if (achievement.unlocksWhenLocolStorageUrlIsSetTo == true) {
            return 100
        } else if (typeof achievement.unlocksWhenLocolStorageUrlIsSetTo == "number") {
            const response = this.localstorageHandlingService.getLocalstorageHandler().checkAndLoad(achievement.localstorageUrl);
            if (typeof response == 'number') {
                return (response / achievement.unlocksWhenLocolStorageUrlIsSetTo) * 100
            } else {
                return 0
            }
        } else {
            return 0
        }
    }

}
