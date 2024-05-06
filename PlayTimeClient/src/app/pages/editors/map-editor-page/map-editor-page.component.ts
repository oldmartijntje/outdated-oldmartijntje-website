import { Component, OnInit } from '@angular/core';
import { LocalstorageHandlingService } from 'src/app/services/localstorage-handling.service';
import { environment } from 'src/environments/environment';

interface TileDisplay {
    backgroundColor: string;
    color: string;
    type: string; // image, text, icon
    value: any;
    displayValue: string;
}

const emptyTile: TileDisplay = {
    backgroundColor: '',
    color: '',
    type: 'text',
    value: 0,
    displayValue: ''
}

interface tileMapField {
    value: any;
    x: number;
    y: number;
}

@Component({
    selector: 'app-map-editor-page',
    templateUrl: './map-editor-page.component.html',
    styleUrl: './map-editor-page.component.scss'
})
export class MapEditorPageComponent implements OnInit {
    readonly emptyTile = { ...emptyTile };
    tileDisplays: TileDisplay[] = [
        {
            backgroundColor: 'white',
            color: 'black',
            type: 'image',
            value: 1,
            displayValue: 'https://i.imgur.com/Ybl4wiW.png'
        },
        {
            backgroundColor: 'white',
            color: 'black',
            type: 'image',
            value: 2,
            displayValue: 'https://i.imgur.com/kgZ3Dgm.png'
        },
        {
            backgroundColor: 'white',
            color: 'black',
            type: 'icon',
            value: 3,
            displayValue: 'compost'
        },
        {
            backgroundColor: '#ff00bf',
            color: '#007fff',
            type: 'text',
            value: { mood: 'Goofy', expression: ':3' },
            displayValue: ':3'
        },
        {
            backgroundColor: 'gold',
            color: 'white',
            type: 'icon',
            value: 'warn',
            displayValue: 'warning_amber'
        },
        {
            backgroundColor: 'white',
            color: 'red',
            type: 'icon',
            value: 'err',
            displayValue: 'image_not_supported'
        }
    ];

    tileDisplayCache: TileDisplay = emptyTile;

    tileMap = {
        width: 10,
        height: 10,
        title: 'My Map.'
    };
    tileMapData: any[] = [];

    tilePlacementValue: any = 1;
    tileSecondPlacementValue: any = 2;

    mouseDown: number = 0; // 0 = none, 1 = left, 2 = right

    uiMode: string = 'inspect';

    confirmDelete: boolean = false;
    confirmApply: boolean = false;
    confirmClear: boolean = false;
    confirmTimout: any;
    generating = {
        active: false
    }
    production = environment.production;
    mask = ''
    grid = true

    editerVersions = {
        textures: 1,
        settings: 1,
        tileMap: 1
    }

    constructor(
        private localStorageHandler: LocalstorageHandlingService
    ) {
        this.generateTileMap();
    }

    ngOnInit(): void {
        var response = this.localStorageHandler.getLocalstorageHandler().loadData('data', 'MapEditor.appData.oldmartijntje.nl')
        if (response.success) {
            this.handleImportedData(response.data);
        }
    }

    /**
     * Make the "confirm button" work for the resize tile map button.
     * @returns void
     */
    resizeTileMap(): void {
        if (this.confirmApply) {
            this.confirmApply = false;
            this.generating.active = true;
            setTimeout(() => {
                this.generateTileMap();
            }, 100);
        } else {
            this.confirmApply = true;
            this.confirmTimout = setTimeout(() => {
                this.confirmApply = false;
            }, 3000);
        }
    }

    /**
     * Export JSON data
     * @param tileMap Whether to export the tile map
     * @param settings Whether to export the settings
     * @param textures Whether to export the textures
     * @param exportTo The location to export to
     * @returns any, depending on the export location
     */
    export(tileMap: boolean, settings: boolean, textures: boolean, exportTo: string, raw: boolean = false): any {
        if (!tileMap && !settings && !textures) {
            return;
        }
        const exportData: any = {
            editerVersions: {

            },
            exported: []
        };
        var title = ''
        if (settings) {

            exportData['settings'] = {
                width: this.tileMap.width,
                height: this.tileMap.height,
                title: this.tileMap.title,
                tilePlacementValue: this.tilePlacementValue,
                uiMode: this.uiMode,
                mask: this.mask,
                tileSecondPlacementValue: this.tileSecondPlacementValue,
                grid: this.grid
            };
            exportData.editerVersions.settings = this.editerVersions.settings;
            exportData.exported.push('settings');
            title = 'Settings-Export.json';
        }
        if (textures) {
            exportData['textures'] = this.tileDisplays;
            exportData.editerVersions.textures = this.editerVersions.textures;
            exportData.exported.push('textures');
            title = 'Textures-Export.json';
        }
        if (tileMap) {
            const temp = JSON.parse(JSON.stringify(this.tileMapData));
            const exportMap: any = [];
            for (let i = 0; i < temp.length; i++) {
                exportMap.push([]);
                for (let j = 0; j < temp[i].length; j++) {
                    if (raw) {
                        exportMap[i].push(temp[i][j].value);
                        continue;
                    }
                    exportMap[i].push(this.parse(temp[i][j].value));
                }
            }
            exportData['tileMap'] = exportMap;
            // turn every tile from tileDisplay to value
            exportData.tileMap.forEach((row: any) => {
                row.forEach((tile: any) => {
                    tile = tile.value;
                });
            });
            exportData.editerVersions.tileMap = this.editerVersions.tileMap;
            exportData.exported.push('tileMap');
            title = this.tileMap.title + '_Map-Export.json';
        }
        if (exportTo === 'console') {
            console.log(exportData);
            return;
        } else if (exportTo === 'file') {
            this.downloadFile(title, exportData);
            return;
        } else if (exportTo === 'localstorage') {
            this.localStorageHandler.addEditRequestToQueue(exportData, 'data', 'MapEditor.appData.oldmartijntje.nl');
            this.localStorageHandler.immediatlyGoThroughQueue();

        } else {
            return exportData;
        }
    }

    /**
     * Handling the import of JSON data
     * @param event The event that triggered the import
     * @returns void
     */
    importEvent(event: any): void {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const content = e.target?.result as string;
                    var importedStory = this.parse(content);
                    this.handleImportedData(importedStory);
                } catch (e) {
                    console.error(e);
                    return;
                }
            }
            reader.readAsText(file);
        }
    }

    /**
     * Converts the JSON data to the newest version
     * @param importedData 
     * @returns 
     */
    convertJsonToNewestVersion(importedData: any): any {
        return importedData;
    }

    clearMap(): void {
        if (this.confirmClear) {
            this.tileMapData.forEach((row: any) => {
                row.forEach((tile: any) => {
                    tile.value = this.stringify(emptyTile.value);
                });
            });
            this.confirmClear = false;
            clearTimeout(this.confirmTimout);
        } else {
            this.confirmClear = true;
            this.confirmTimout = setTimeout(() => {
                this.confirmClear = false;
            }, 3000);
        }
    }

    /**
     * Handle the imported data
     * @param importedData The imported data
     * @returns void
     */
    handleImportedData(importedData: any): void {
        if (typeof importedData !== 'object') {
            console.error('Invalid JSON');
            return;
        }
        if (importedData['editerVersions'] == undefined || importedData['exported'] == undefined) {
            console.error('Invalid JSON');
            return;
        }
        if (importedData['exported'].includes('settings')) {
            if (importedData['editerVersions']['settings'] < this.editerVersions.settings) {
                importedData = this.convertJsonToNewestVersion(importedData);
            }
            if (importedData['settings'] == undefined) {
                console.error('Invalid JSON');
                return;
            }
            this.tileMap.width = importedData['settings'].width;
            this.tileMap.height = importedData['settings'].height;
            this.tileMap.title = importedData['settings'].title;
            this.tilePlacementValue = importedData['settings'].tilePlacementValue;
            this.uiMode = importedData['settings'].uiMode;
            this.mask = importedData['settings'].mask;
            this.tileSecondPlacementValue = importedData['settings'].tileSecondPlacementValue;
            this.grid = importedData['settings'].grid;
        }
        if (importedData['exported'].includes('textures')) {
            if (importedData['editerVersions']['textures'] < this.editerVersions.textures) {
                importedData = this.convertJsonToNewestVersion(importedData);
            }
            if (importedData['textures'] == undefined) {
                console.error('Invalid JSON');
                return;
            }
            this.tileDisplays = importedData['textures'];
        }
        if (importedData['exported'].includes('tileMap')) {
            if (importedData['editerVersions']['tileMap'] < this.editerVersions.tileMap) {
                importedData = this.convertJsonToNewestVersion(importedData);
            }
            if (importedData['tileMap'] == undefined) {
                console.error('Invalid JSON');
                return;
            }
            const temp = JSON.parse(JSON.stringify(importedData['tileMap']));
            const importMap: any = [];
            const foundValues: any[] = []
            for (let i = 0; i < temp.length; i++) {
                importMap.push([]);
                for (let j = 0; j < temp[i].length; j++) {
                    let value = this.stringify(temp[i][j]);
                    importMap[i].push({ value: value, x: i, y: j });
                    if (!foundValues.includes(value)) {
                        foundValues.push(value);
                    }
                }
            }
            for (let i = 0; i < foundValues.length; i++) {
                if (foundValues[i] != this.stringify(emptyTile.value)) {
                    if (!this.tileDisplays.find((tile: any) => this.stringify(tile.value) === foundValues[i])) {
                        const newTile = {
                            backgroundColor: '',
                            color: '',
                            type: 'image',
                            value: foundValues[i],
                            displayValue: 'https://i.imgur.com/6f0kkE4.png'
                        };
                        this.tileDisplays.push(newTile);
                    }
                }
            }
            this.tileMapData = importMap;
        }
        if (importedData['exported'].includes('settings') && !importedData['exported'].includes('tileMap')) {
            this.generating.active = true;
            setTimeout(() => {
                this.generateTileMap();
            }, 100);
        }
    }

    /**
     * Download a json file
     * @param title 
     * @param data 
     */
    downloadFile(title: string, data: { [key: string]: any }) {
        const jsonContent = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonContent], { type: 'application/json' });

        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(blob);
        downloadLink.download = title;

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }


    /**
     * Generate the tile map based on the width and height
     * @returns Promise<void>
     * @async
     * @private
     */
    private async generateTileMap(): Promise<void> {
        var difference = this.tileMapData.length - this.tileMap.width;
        if (difference > 0) {
            this.tileMapData.splice(this.tileMap.width, difference);
        } else if (difference < 0) {
            for (let i = 0; i < Math.abs(difference); i++) {
                this.tileMapData.push([]);
            }
        } else {
        }
        for (let i = 0; i < this.tileMapData.length; i++) {
            difference = this.tileMapData[i].length - this.tileMap.height;
            if (difference > 0) {
                this.tileMapData[i].splice(this.tileMap.height, difference);
            } else if (difference < 0) {
                for (let j = 0; j < Math.abs(difference); j++) {
                    this.tileMapData[i].push({ value: this.stringify(emptyTile.value), x: i, y: j });
                }
            } else {
            }
        }
        this.generating.active = false;
    }


    /**
     * Get the tile display based on the value
     * @param value The value of the tile
     * @returns TileDisplay
     */
    getTileDisplay(value: any): TileDisplay {
        const item = this.tileDisplays.find(display => this.stringify(display.value) === this.stringify(value));
        return item ? item : emptyTile;
    }

    /**
     * Get the tile display based on the value, but cache the result.
     * If the value is the same as the last value, return the cached value.
     * 
     * @param tile The tile object
     * @returns TileDisplay
     */
    getTileDisplayCached(tile: any): TileDisplay {
        const tileValue = tile; // Assuming tile object has an id property
        if (this.stringify(this.tileDisplayCache.value) != tileValue) {
            this.tileDisplayCache = this.getTileDisplay(tile); // Assuming getTileDisplay is defined in your component
        }
        var returnValue = { ...this.tileDisplayCache };
        if (this.mask != '') {
            if (this.mask == 'value') {
                returnValue.displayValue = returnValue.value;
                returnValue.type = 'text';
                if (returnValue.value == this.tilePlacementValue) {
                    returnValue.backgroundColor = 'gold';
                    returnValue.color = 'black';
                } else if (returnValue.value == this.tileSecondPlacementValue) {
                    returnValue.backgroundColor = '#007fff';
                    returnValue.color = 'white';
                } else {
                    returnValue.backgroundColor = 'white';
                    returnValue.color = 'black';
                }
            }
        }
        return returnValue;
    }


    /**
     * Handle the click event on a tile
     * @param tile The tile object
     * @param button The button that was clicked (1 = left, 2 = right)
     * @returns void
     */
    tileClick(tile: any, button: number): void {
        if (button === 1) {
            this.setTileValue(tile, this.tilePlacementValue, 0);
        } else if (button === 2) {
            this.setTileValue(tile, this.tileSecondPlacementValue, 0);
        }
    }


    /**
     * Set the value of a tile
     * @param tile The tile object
     * @param value The new value of the tile
     * @param mode The mode of the replacement
     * @returns void
     * @private
     */
    private setTileValue(tile: tileMapField, value: any, mode: number = 0): void {
        if (this.tilePlacementValue === undefined) {
            if (mode === 1 || this.uiMode == 'move') { // ignore when not directly clicked on or when in move mode
                return;
            } else if (this.uiMode == 'inspect') {
                this.tilePlacementValue = tile.value;
                this.mouseDown = 0;
                return;
            }
            return;
        }
        tile.value = this.stringify(value);
    }

    /**
     * While the mouse is down, set the tile value
     * @param event 
     */
    onMouseDown(event: MouseEvent): void {
        if (event.button === 0) {
            this.mouseDown = 1;
        } else if (event.button === 2) {
            this.mouseDown = 2;
        }
    }

    /**
     * Set the mouse down to a specific value
     * @param event 
     */
    setMouseDownValue(value: number): void {
        this.mouseDown = value;
    }

    /**
     * When the mouse enters a tile, set the tile value
     * @param tile 
     */
    onMouseEnter(tile: tileMapField): void {
        if (this.mouseDown === 1) {
            this.setTileValue(tile, this.tilePlacementValue, 1);
        } else if (this.mouseDown === 2) {
            this.setTileValue(tile, this.tileSecondPlacementValue, 1);
        }
    }


    /**
     * When dragged over a tile, set the tile value.
     * @param event 
     * @returns 
     */
    onTouchMove(event: TouchEvent): void {
        // Check if the touch is over the specific element you're interested in
        const element = document.elementFromPoint(event.touches[0].clientX, event.touches[0].clientY);
        if (element && element.classList.contains('tile')) {
            const attr = element.getAttribute('id');
            if (attr) {
                if (this.tilePlacementValue === undefined) {
                    this.mouseDown = 0;
                    return;
                }
                // convert '{value: 0, x: 0, y: 0}' to {x: 0, y: 0}
                const parsed = this.parse(attr);
                this.tileMapData[parsed.x][parsed.y].value = this.tilePlacementValue;
            }
        }
    }

    /**
     * Stringify a variable
     * @param tile 
     * @returns 
     */
    stringify(tile: any): string {
        if (typeof tile !== 'object') {
            return `${tile}`;
        }
        return JSON.stringify(tile);
    }

    /**
     * Parse a string into a variable
     * 
     * If the string is a number, return the number.
     * 
     * If the string is a JSON string, parse the JSON string.
     * 
     * If the string is a boolean, return the boolean.
     * 
     * If the string is null, return null.
     * @param tile 
     * @returns 
     */
    parse(tile: string): any {
        if (!this.isJSONString(tile)) {
            if (!isNaN(Number(tile))) {
                return Number(tile);
            } else if (tile === 'true' || tile === 'false') {
                return tile === 'true';
            } else if (tile === 'null') {
                return null;
            }
            return tile;
        }
        return JSON.parse(tile);
    }

    /**
     * Check if a string is a JSON string (cause JSON.parse doesn't throw an error if it's not a JSON string)
     * @param str 
     * @returns 
     * @private
     */
    private isJSONString(str: string): boolean {
        if (/^[\],:{}\s]*$/.test(str.replace(/\\["\\\/bfnrtu]/g, '@')
            .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
            .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
            return true;
        }
        return false;
    }

    /**
     * Set an active tile map
     * @param tileMap 
     * @param mouseButton 1 is left, 2 is right
     * @param event
     */
    selectTileMap(tileMap: TileDisplay, mouseButton: number, event: any): void {
        if (mouseButton === 1) {
            this.tilePlacementValue = tileMap.value;
        } else if (mouseButton === 2) {
            this.tileSecondPlacementValue = tileMap.value;
            event.preventDefault();
        }
    }

    /**
     * Add a new tile map
     * @returns void
     */
    addNewTileMap(): void {
        const defaultTile = {
            backgroundColor: 'white',
            color: 'black',
            type: 'icon',
            value: this.tileDisplays.length + 1,
            displayValue: 'edit'
        };
        this.tileDisplays.push(defaultTile);


        this.tilePlacementValue = this.tileDisplays.length;
    }

    /**
     * Set the UI mode
     * @returns void
     */
    setUIMode(type: string): void {
        this.tilePlacementValue = undefined;
        this.uiMode = type;
    }

    /**
     * Change the value of a tile display. And update all instances of the old value with the new value.
     * @param event 
     * @returns void
     */
    changeTileMapValue(event: any): void {
        const inputElement = event.target;
        const oldValue = this.tilePlacementValue
        const cursorStart = inputElement.selectionStart;
        const cursorEnd = inputElement.selectionEnd;


        var newValue = event.target.value;

        // Check if the value is already in use.
        const found = this.tileDisplays.find((tile: any) => tile.value == newValue);
        if (newValue == '' || newValue == 0 || found || newValue == null) {
            newValue = oldValue
        }

        this.tilePlacementValue = newValue;

        // Restore cursor position
        setTimeout(() => { // Ensuring it runs after the value update
            let setNewValue = newValue;
            try {
                setNewValue = this.stringify(setNewValue);
            } catch (e) {
                // Do nothing
            }
            inputElement.value = setNewValue;
            inputElement.setSelectionRange(cursorStart, cursorEnd);
        });

        this.tileDisplays.forEach((tile: any) => {
            if (tile.value === oldValue) {
                tile.value = newValue;
            }
        });

        // replace all instances of the old value with the new value
        this.tileMapData.forEach((row: any) => {
            row.forEach((tile: any) => {
                if (tile.value === oldValue) {
                    tile.value = newValue;
                }
                try {
                    if (this.stringify(tile.value) === this.stringify(oldValue)) {
                        tile.value = newValue;
                    }
                } catch (e) {
                    // Do nothing
                }
            });
        });
    }

    /**
     * Delete a tile display
     * @returns void
     */
    deleteTileMap() {
        if (this.confirmDelete) {
            const index = this.tileDisplays.findIndex((tile: any) => tile.value === this.tilePlacementValue);
            this.tileDisplays.splice(index, 1);
            this.tilePlacementValue = emptyTile.value;

            this.tileMapData.forEach((row: any) => {
                row.forEach((tile: any) => {
                    if (tile.value === this.tilePlacementValue) {
                        tile.value = 0;
                    }
                    try {
                        if (this.stringify(tile.value) === this.stringify(this.tilePlacementValue)) {
                            tile.value = 0;
                        }
                    } catch (e) {
                        // Do nothing
                    }
                });
            });
            this.confirmDelete = false;
            clearTimeout(this.confirmTimout);
        } else {
            this.confirmDelete = true;
            this.confirmTimout = setTimeout(() => {
                this.confirmDelete = false;
            }, 3000);
        }
    }

}