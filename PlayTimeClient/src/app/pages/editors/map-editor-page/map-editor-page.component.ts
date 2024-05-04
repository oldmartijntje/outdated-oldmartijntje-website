import { Component } from '@angular/core';

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
    type: 'image',
    value: 0,
    displayValue: 'https://i.imgur.com/kgZ3Dgm.png'
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
    tileDisplays: TileDisplay[] = [
        {
            backgroundColor: 'white',
            color: 'black',
            type: 'image',
            value: 1,
            displayValue: 'https://i.imgur.com/Ybl4wiW.png'
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

    constructor() {
        this.generateTileMap();
    }



    generateTileMap() {
        for (let i = 0; i < this.tileMap.width; i++) {
            if (this.tileMapData.length < i + 1) {
                this.tileMapData.push([]);
            }
            for (let j = 0; j < this.tileMap.height; j++) {
                if (this.tileMapData[i].length < j + 1) {
                    this.tileMapData[i].push([]);
                }
                this.tileMapData[i][j] = { value: 0, x: i, y: j };
            }
            if (this.tileMapData[i].length > this.tileMap.height) {
                this.tileMapData[i].splice(this.tileMap.height, this.tileMapData[i].length - this.tileMap.height);
            }
        }
        if (this.tileMapData.length > this.tileMap.width) {
            this.tileMapData.splice(this.tileMap.width, this.tileMapData.length - this.tileMap.width);
        }
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
        this.setTileValue(tile, this.tilePlacementValue);
    }

    setTileValue(tile: tileMapField, value: any) {
        console.log(tile)
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
            this.setTileValue(tile, this.tilePlacementValue);
        } else if (this.mouseDown === 2) {
            this.setTileValue(tile, 0);
        }
    }

    onTouchMove(event: TouchEvent) {
        // Check if the touch is over the specific element you're interested in
        const element = document.elementFromPoint(event.touches[0].clientX, event.touches[0].clientY);
        if (element && element.classList.contains('tile')) {
            const attr = element.getAttribute('id');
            if (attr) {
                const parsed = this.parse(attr);
                this.tileMapData[parsed.x][parsed.y].value = this.tilePlacementValue;
            }
        }
    }

    stringify(tile: tileMapField) {
        return JSON.stringify(tile);
    }

    parse(tile: string): tileMapField {
        return JSON.parse(tile);
    }

}