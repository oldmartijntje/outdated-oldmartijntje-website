import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-message-page',
    templateUrl: './message-page.component.html',
    styleUrl: './message-page.component.scss'
})
export class MessagePageComponent {
    sentMessages: any[] = [
        { timeSent: '12:30 PM', username: 'User1', text: 'Hello!' },
        { timeSent: '12:35 PM', username: 'User2', text: 'How are you?' },
        { timeSent: '12:40 PM', username: 'User1', text: 'Angular is awesome!' }
    ];
    sendMessage() {
        // Logic for sending a message
    }
}
