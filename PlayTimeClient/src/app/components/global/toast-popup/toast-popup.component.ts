import { Component, OnInit } from '@angular/core';
import { ToastQueueService } from '../../../services/toast-queue.service';
import { Toast } from '../../../models/toast.interface';
import { Router } from '@angular/router';

@Component({
    selector: 'app-toast',
    templateUrl: './toast-popup.component.html',
    styleUrls: ['./toast-popup.component.scss']
})
export class ToastPopupComponent implements OnInit {
    toastQueue: Toast[] = [];

    constructor(
        private toastQueueService: ToastQueueService,
        private router: Router
    ) { }

    ngOnInit() {
        this.toastQueue = this.toastQueueService.getToastQueue();
    }

    dismissToast(toastId: number): void {
        this.toastQueueService.dequeueToastById(toastId);
    }

    scanForBreak(article: any) {
        // Replace \n with <br> in the text
        article = article.replace(/\n/g, '<br>');

        return article;
    }

    achievementClick(toeas: Toast) {
        if (toeas.type === 'achievement') {
            this.router.navigate(['/achievements']);
        }
    }
}
