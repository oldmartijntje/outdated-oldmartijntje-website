import { Component, OnInit, SecurityContext } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendMiddlemanService } from 'src/app/services/backend-middleman.service';
import { DefaultUserNames, DefaultMessages, Settings, userTypeEmoji, hiddenIdentifierTypes } from 'src/app/data/settings';
import { BackendServiceService } from 'src/app/services/backend-service.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'app-message-page',
    templateUrl: './message-page.component.html',
    styleUrl: './message-page.component.scss'
})
export class MessagePageComponent implements OnInit {
    sentMessages: any[] = [
    ];
    messageBoxInput: string = '';
    nickname: string = '';
    lastId: number = 0;
    entered: boolean = false;
    maxMessageLength: number = Settings['messageMaxLength'];

    constructor(
        private backendMiddlemanService: BackendMiddlemanService,
        private backendServiceService: BackendServiceService,
        private sanitizer: DomSanitizer
    ) { }

    gatAPI(): void {
        this.onChange();
    }

    getYourMessageClass(message: any, type: string): string {
        if (message['yours'] == true) {
            return `${type}-yours`;
        }
        return '';
    }

    onEnterPress() {
        if (this.entered) {
            return;
        }
        this.entered = true;
        this.sendMessage();
    }

    ngOnInit(): void {
        // Set up an interval to call gatAPI() every minute (30,000 milliseconds)
        setInterval(() => {
            this.gatAPI();
        }, 30000);

        this.backendMiddlemanService.getMessages().then((data) => {
            this.sentMessages = data['data'];
            if (data['data'].length > 0) {
                this.lastId = data['data'][data['data'].length - 1]['id'];
            }
            this.sentMessages = this.sentMessages.concat(DefaultMessages[0])
        });
        var nickname = localStorage.getItem('nickname');
        if (nickname == null) {
            nickname = this.generateRandomName();
            localStorage.setItem('nickname', nickname);
            this.nickname = nickname;
        } else {
            if (nickname.length > Settings['usernameMaxLength']) {
                nickname = this.generateRandomName();
                localStorage.setItem('nickname', nickname);
            }
            this.nickname = nickname;
        }

    }

    getEmojiByMessage(message: any): string {
        const messageType = message['type'];
        return userTypeEmoji[messageType] || '';
    }

    generateRandomName(): string {
        var nickname = DefaultUserNames[this.getRandomNumber(0, DefaultUserNames.length - 1)];
        return nickname;
    }

    getRandomNumber(min: number, max: number): number {
        if (min >= max) {
            return -1;
        }
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    reverseOrderOfList(anyList: any[]): any[] {
        return [...anyList].reverse();
    }

    sanitizeHtml(html: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }

    showNumber(message: any) {
        if (message['yours'] === true) {
            return false;
        } else if (hiddenIdentifierTypes.includes(message['type'])) {
            return false;
        }
        return true;
    }

    getCorrectTime(message: any): string {
        return message.datetime;
    }



    sendMessage() {
        if (this.messageBoxInput.startsWith('/nick ')) {
            var nickname = this.messageBoxInput.substring(6);
            nickname = this.sanitizeInput(nickname, true);
            if (nickname.length > Settings['usernameMaxLength']) {
                //error message for too long nickname
                this.sentMessages = this.sentMessages.concat(DefaultMessages[1][0]);
                return;
            }
            if (nickname.length < Settings['usernameMinLength']) {
                //error message for too long nickname
                this.sentMessages = this.sentMessages.concat(DefaultMessages[1][4]);
                return;
            }
            if (Settings['blackListedUsernames'].includes(nickname)) {
                //error message for too long nickname
                this.sentMessages = this.sentMessages.concat(
                    this.generateMessage(nickname, DefaultMessages[1][3], '||USERNAME||')
                );
                return;
            }
            localStorage.setItem('nickname', nickname);
            this.messageBoxInput = '';
            this.nickname = nickname;
            // message for succesfully changing username
            this.sentMessages = this.sentMessages.concat(
                this.generateMessage(nickname, DefaultMessages[1][2], '||USERNAME||')
            );
            return;
        } else if (this.messageBoxInput.startsWith('/')) {
            if (this.messageBoxInput == '/nick') {
                //error message for no rename
                this.sentMessages = this.sentMessages.concat(DefaultMessages[1][8]);
            } else if (this.messageBoxInput.startsWith('/help')) {
                this.messageBoxInput = '';
                this.sentMessages = this.sentMessages.concat(DefaultMessages[1][10]);
            } else if (this.messageBoxInput.startsWith('/emoji')) {


            } else if (this.messageBoxInput.startsWith('/ban')) {
                this.sendMessageToServer(false);
            } else if (this.messageBoxInput.startsWith('/unban')) {
                this.sendMessageToServer(false);
            } else {
                this.sendMessageToServer();
            }
        } else if (this.messageBoxInput !== '') {
            this.sendMessageToServer();
        }
    }

    sanitizeInput(input: string, stricter: boolean, ignoreSlash: boolean = false): string {
        if (stricter) {
            input = input.trim().replace(/['"`]/g, '');
        } else {
            input = input.replace(/[<>"&'`]/g, (match) => {
                return {
                    '<': '&lt;',
                    '>': '&gt;',
                    '"': '&quot;',
                    '&': '&amp;',
                    "'": '&#x27;',
                    '`': '&#x60;'
                }[match] || match;
            });
        }

        // Remove emojis
        input = input.replace(/[\u{1F600}-\u{1F64F}]/gu, '');

        // Trim all special characters except numbers and underscores if stricter is true
        if (stricter) {
            input = ignoreSlash ? input.replace(/[^\p{L}\p{N}_:;/]/gu, '') : input.replace(/[^\p{L}\p{N}_:;]/gu, '');
        } else {
            // Keep specific characters and remove others not suitable for SQL
            input = ignoreSlash ? input.replace(/[^\p{L}\p{N}_#/$%^&(){\}[\]!@:;"".,<>? ]/gu, '') :
                input.replace(/[^\p{L}\p{N}_#$%^&(){\}[\]!@:;"".,<>? ]/gu, '');
        }

        return input;
    }

    sendMessageToServer(trimSlash: boolean = true) {
        this.messageBoxInput = this.sanitizeInput(this.messageBoxInput, false, !trimSlash);
        if (this.messageBoxInput.length > Settings['messageMaxLength']) {
            //error message for too long message
            this.sentMessages = this.sentMessages.concat(DefaultMessages[1][1]);
            return;
        } else if (this.messageBoxInput.length < Settings['messageMinLength']) {
            //error message for too short message
            this.sentMessages = this.sentMessages.concat(DefaultMessages[1][5]);
            return;
        }
        this.backendServiceService.addMessage(this.messageBoxInput, this.nickname).subscribe((data) => {
            this.onChange(true);
        },
            (error) => {
                console.error(error);
                if (error.status == 422) {
                    if (error.error['payload'] != undefined) {
                        if (error.error['payload']['content'] == '') {
                            this.sentMessages = this.sentMessages.concat(DefaultMessages[1][6]);
                        } else {
                            this.sentMessages = this.sentMessages.concat(DefaultMessages[1][7]);
                        }
                    }
                } else {
                    this.sentMessages = this.sentMessages.concat(
                        this.generateMessage(error.error['error'], DefaultMessages[1][9], '||ERROR||')
                    );
                }
            });
        this.messageBoxInput = '';
    }

    onChange(force: boolean = false) {
        this.backendMiddlemanService.getMessagesSinceLastCall(force, this.lastId).then((data) => {
            // this.sentMessages = this.sentMessages.concat(data);
            if (data['data'].length > 0 && data['data'][0]['id'] > this.lastId) {
                this.sentMessages = this.sentMessages.concat(data['data']);
                this.lastId = data['data'][data['data'].length - 1]['id'];
            }
        });
    }

    generateMessage(username: string, message: any, replaceString: string = '||USERNAME||') {
        var newMessage = { ...message };
        newMessage.content = newMessage.content.replace(replaceString, username);
        return newMessage;
    }
}
