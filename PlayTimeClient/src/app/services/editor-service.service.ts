import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { EditorSettings } from 'src/app/data/settings';
import { RuntimeServiceService } from './runtime-service.service';
import { defaultPageVariables } from 'src/app/data/pageVariables';

@Injectable({
    providedIn: 'root'
})
export class EditorServiceService {
    private booleanSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private allowEditor = false;
    private lastEditorParams: boolean = false;
    private sandboxSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    private activePath: string = "";

    // Create an observable for subscribers
    currentValue$: Observable<boolean> = this.booleanSubject.asObservable();
    sandboxValue$: Observable<boolean> = this.sandboxSubject.asObservable();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private runtimeServiceService: RuntimeServiceService
    ) {
        this.router.events.subscribe(event => {
            const currentUrl = this.router.url; // Get the full URL
            const currentPathWithoutQueryParams = currentUrl.split('?')[0].substring(1); // Extract the path
            this.activePath = currentPathWithoutQueryParams;
            if (event instanceof NavigationEnd) {
                // This event is triggered when the navigation is complete
                const currentUrl = this.router.url; // Get the full URL
                const currentPathWithoutQueryParams = currentUrl.split('?')[0].split("/")[1]; // Extract the path
                if (EditorSettings["EditorPathing"].includes(currentPathWithoutQueryParams)) {
                    this.setAllowEditor(true);
                }
            }
        });
        this.route.queryParams.subscribe(params => {
            if (params['Editor'] !== undefined && (params['Editor'] == "true" || params['Editor'] == "True")) {
                if (this.allowEditor) {
                    this.setEditor(true);
                } else {
                    this.setEditor(false);
                }
                this.lastEditorParams = true;
            } else {
                this.setEditor(false);
                this.lastEditorParams = false;
            }
            if (params['Sandbox'] !== undefined && (params['Sandbox'] == "true" || params['Sandbox'] == "True")) {
                this.setSandbox(true);
            } else {
                this.setSandbox(false);
            }
        });
    }

    // Function to change the value
    setEditor(value: boolean) {
        this.booleanSubject.next(value);
        if (value == false) {
            if (this.activePath == "") {
                this.router.events.subscribe(event => {
                    const currentUrl = this.router.url; // Get the full URL
                    const currentPathWithoutQueryParams = currentUrl.split('?')[0].substring(1); // Extract the path
                    this.activePath = currentPathWithoutQueryParams;
                    this.runtimeServiceService.setPageVariablesToEmpty();
                    const pageVar = { ...defaultPageVariables }
                    this.runtimeServiceService.setPageVariables(pageVar[this.activePath]);
                    this.runtimeServiceService.flushPageVariables();
                });
            } else {
                this.runtimeServiceService.setPageVariablesToEmpty();
                const pageVar = { ...defaultPageVariables }
                this.runtimeServiceService.setPageVariables(pageVar[this.activePath]);
                this.runtimeServiceService.flushPageVariables();
            }

        }
    }

    setAllowEditor(value: boolean) {
        this.allowEditor = value;
        if (value == false) {
            this.setEditor(false);
        } else if (this.lastEditorParams) {
            this.setEditor(true);
        }
    }

    setSandbox(value: boolean) {
        this.sandboxSubject.next(value);
    }
}
