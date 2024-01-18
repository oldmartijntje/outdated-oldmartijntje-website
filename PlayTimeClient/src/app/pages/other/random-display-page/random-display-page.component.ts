import { Component, OnInit } from '@angular/core';
import { RandomDisplayHandler, itemDisplay } from 'src/app/models/randomDisplayHandler';

@Component({
    selector: 'app-random-display-page',
    templateUrl: './random-display-page.component.html',
    styleUrl: './random-display-page.component.scss'
})
export class RandomDisplayPageComponent implements OnInit {
    displayItems: itemDisplay[] = [];
    randomDisplayHandler = new RandomDisplayHandler();
    amount = 0;

    constructor() { }

    ngOnInit(): void {
        this.getItems();
        this.amount = this.randomDisplayHandler.getAmountOfItems();
    }

    getItems(): void {
        this.displayItems = this.randomDisplayHandler.getItems(8);
    }



}
