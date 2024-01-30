import { Component, OnInit } from '@angular/core';
import { games, projects, Game } from 'src/app/data/homescreenItems';

@Component({
    selector: 'app-project-gallery-page',
    templateUrl: './project-gallery-page.component.html',
    styleUrl: './project-gallery-page.component.scss'
})
export class ProjectGalleryPageComponent implements OnInit {
    projects: Game[] = [];

    ngOnInit(): void {
        this.projects = games;
        this.projects.push(...projects);
    }

}
