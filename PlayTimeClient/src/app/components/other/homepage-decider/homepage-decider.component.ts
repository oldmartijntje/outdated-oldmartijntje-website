import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModel } from 'src/app/models/commonModel';
import { RuntimeServiceService } from 'src/app/services/runtime-service.service';
import { ToastQueueService } from 'src/app/services/toast-queue.service';

@Component({
    selector: 'app-homepage-decider',
    templateUrl: './homepage-decider.component.html',
    styleUrl: './homepage-decider.component.scss'
})
export class HomepageDeciderComponent implements OnInit {
    strict = false;

    constructor(
        private router: Router,
        private runtimeServiceService: RuntimeServiceService,
        private route: ActivatedRoute,
        private toastQueueService: ToastQueueService
    ) {
        this.route.queryParams.subscribe(params => {
            const max = params['plain'];
            if (max) {
                this.strict = max.toLowerCase() === 'true';
            }
        });
    }

    ngOnInit(): void {
        this.runtimeServiceService.mobileModeSubjectValue$.subscribe((value) => {
            const queryParams = this.route.snapshot.queryParams;
            const date = new Date();
            if (date.getMonth() === 3 && date.getDate() === 1 && !this.strict) {
                this.toastQueueService.enqueueToast('This is an April Fools joke. Click the :( or QR-code to go to the normal site.', 'warning', 69420);
                this.router.navigate(['/blueScreen'], { queryParams, skipLocationChange: true });
            } else if (value['MobileUser']) {
                this.router.navigate(['/windows'], { queryParams, skipLocationChange: true });
            } else {
                this.router.navigate(['/nintendo'], { queryParams, skipLocationChange: true });
            }
        });
    }
}
