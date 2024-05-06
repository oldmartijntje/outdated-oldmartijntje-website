import { Component, ElementRef, ViewChild } from '@angular/core';

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
export class MapEditorPageComponent {
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
    };
    tileMapData: any[] = [];

    tilePlacementValue: any = 1;

    mouseDown: number = 0; // 0 = none, 1 = left, 2 = right

    uiMode: string = 'inspect';

    confirmDelete: boolean = false;
    confirmApply: boolean = false;
    confirmTimout: any;
    generating = {
        active: false
    }

    editerVersions = {
        textures: 1,
        settings: 1,
        tileMap: 1
    }

    constructor() {
        this.generateTileMap();
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
                    this.tileMapData[i].push({ value: 0, x: i, y: j });
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
        const item = this.tileDisplays.find(display => display.value === value);
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
        if (this.tileDisplayCache.value != tileValue) {
            this.tileDisplayCache = this.getTileDisplay(tile); // Assuming getTileDisplay is defined in your component
        }
        return this.tileDisplayCache;
    }


    /**
     * Handle the click event on a tile
     * @param tile The tile object
     * @returns void
     */
    tileClick(tile: any): void {
        this.setTileValue(tile, this.tilePlacementValue, 0);
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
            if (mode === 1 || this.uiMode == 'move') {
                return;
            }
            this.tilePlacementValue = tile.value;
            this.mouseDown = 0;
            return;
        }
        tile.value = value;
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
            this.setTileValue(tile, 0, 1);
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
     */
    selectTileMap(tileMap: TileDisplay): void {
        this.tilePlacementValue = tileMap.value;
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

        // Check if the value is already in use - might not work on parsed objects
        const found = this.tileDisplays.find((tile: any) => tile.value == newValue);
        if (newValue == '' || newValue == 0 || found) {
            newValue = oldValue
        }
        try {
            newValue = this.parse(newValue);
        } catch (e) {
            // Do nothing
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