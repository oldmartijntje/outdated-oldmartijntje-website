import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModel } from 'src/app/models/commonModel';
import { RuntimeServiceService } from 'src/app/services/runtime-service.service';

@Component({
    selector: 'app-homepage-decider',
    templateUrl: './homepage-decider.component.html',
    styleUrl: './homepage-decider.component.scss'
})
export class HomepageDeciderComponent implements OnInit {
    constructor(
        private router: Router,
        private runtimeServiceService: RuntimeServiceService
    ) { }

    ngOnInit(): void {
        this.runtimeServiceService.mobileModeSubjectValue$.subscribe((value) => {
            if (value['MobileUser']) {
                this.router.navigate(['/Home'], { skipLocationChange: true });
            } else {
                this.router.navigate(['/Homepage'], { skipLocationChange: true });
            }
        });
    }
}
