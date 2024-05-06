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

    constructor() {
        this.generateTileMap();
    }

    resizeTileMap() {
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



    async generateTileMap() {
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

    getTileDisplay(value: any): TileDisplay {
        const item = this.tileDisplays.find(display => display.value === value);
        return item ? item : emptyTile;
    }

    getTileDisplayCached(tile: any): TileDisplay {
        const tileValue = tile; // Assuming tile object has an id property
        if (this.tileDisplayCache.value != tileValue) {
            this.tileDisplayCache = this.getTileDisplay(tile); // Assuming getTileDisplay is defined in your component
        }
        return this.tileDisplayCache;
    }

    tileClick(tile: any) {
        this.setTileValue(tile, this.tilePlacementValue, 0);
    }

    setTileValue(tile: tileMapField, value: any, mode: number = 0) {
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

    onMouseDown(event: MouseEvent) {
        if (event.button === 0) {
            this.mouseDown = 1;
        } else if (event.button === 2) {
            this.mouseDown = 2;
        }
    }

    onMouseUp(event: MouseEvent) {
        if (event.button === 0) {
            this.mouseDown = 0;
        } else if (event.button === 2) {
            this.mouseDown = 0;
        }
    }

    onTouchStart(event: TouchEvent) {
        this.mouseDown = 1;
    }

    onTouchEnd(event: TouchEvent) {
        this.mouseDown = 0;
    }

    onMouseEnter(tile: tileMapField) {
        if (this.mouseDown === 1) {
            this.setTileValue(tile, this.tilePlacementValue, 1);
        } else if (this.mouseDown === 2) {
            this.setTileValue(tile, 0, 1);
        }
    }

    onTouchMove(event: TouchEvent) {
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

    stringify(tile: any): string {
        if (typeof tile === 'number' || typeof tile === 'string') {
            return `${tile}`;
        } else if (typeof tile !== 'object') {
            return tile;
        }
        return JSON.stringify(tile);
    }

    parse(tile: string): any {
        if (!this.isJSONString(tile)) {
            if (!isNaN(Number(tile))) {
                return Number(tile);
            }
            return tile;
        }
        return JSON.parse(tile);
    }

    isJSONString(str: string): boolean {
        if (/^[\],:{}\s]*$/.test(str.replace(/\\["\\\/bfnrtu]/g, '@')
            .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
            .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
            return true;
        }
        return false;
    }

    selectTileMap(tileMap: TileDisplay) {
        this.tilePlacementValue = tileMap.value;
    }

    addNewTileMap() {
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

    setInspect() {
        this.tilePlacementValue = undefined;
        this.uiMode = 'inspect';
    }

    setMove() {
        this.tilePlacementValue = undefined;
        this.uiMode = 'move';
    }

    changeTileMapValue(event: any) {
        const inputElement = event.target;
        const oldValue = this.tilePlacementValue
        const cursorStart = inputElement.selectionStart;
        const cursorEnd = inputElement.selectionEnd;

        var newValue = event.target.value;
        if (newValue == '' || newValue == 0) {
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