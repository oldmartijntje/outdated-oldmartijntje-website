import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';

@Component({
    selector: 'app-testing-page',
    templateUrl: './testing-page.component.html',
    styleUrls: ['./testing-page.component.scss']
})
export class TestingPageComponent {
    // Your data in the specified format
    data: { [key: string]: { type: string } } = {
        "id1": { "type": "prompt" },
        "id2": { "type": "prompt" },
        "id3": { "type": "prompt" },
        "id4": { "type": "prompt" },
        // Add more data as needed
    };

    // Autocomplete variables
    searchControl = new FormControl();
    filteredData: Observable<any[]>;

    constructor() {
        // Initialize the filteredData observable
        this.filteredData = this.searchControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
        );
    }

    // Function to filter the data based on user input
    private _filter(value: string): any[] {
        const filterValue = value.toLowerCase();
        const x = Object.keys(this.data).filter(key =>
            key.toLowerCase().includes(filterValue) ||
            this.data[key].type.toLowerCase().includes(filterValue) ||
            `${key}: ${this.data[key].type}`.toLowerCase().includes(filterValue))
            .map(key => ({ id: key, type: this.data[key].type }));
        return x;
    }

    // Function to log filteredData
    logFilteredData() {
        this.filteredData.subscribe(data => {
            console.log('Filtered Data:', data);
        });
    }
}
