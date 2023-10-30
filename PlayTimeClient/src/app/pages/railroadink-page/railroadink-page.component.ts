import { Component, OnInit } from '@angular/core';
import { EditorServiceService } from 'src/app/services/global/editor-service.service';

@Component({
    selector: 'app-railroadink-page',
    templateUrl: './railroadink-page.component.html',
    styleUrls: ['./railroadink-page.component.scss']
})
export class RailroadinkPageComponent implements OnInit {

    constructor(private editorService: EditorServiceService) { }

    ngOnInit(): void {
        // this.editorService.setAllowEditor(true);
    }
}
