import { Component, OnInit } from '@angular/core';
import { EditorServiceService } from 'src/app/services/global/editor-service.service';
import { RuntimeServiceService } from 'src/app/services/global/runtime-service.service';

export interface Dice {
    diceType: string;
    diceId: number;
    image: string;
    rotation: number;
    id: number;
}

export interface DiceInfo {
    sides: string[];
}

@Component({
    selector: 'app-railroadink-page',
    templateUrl: './railroadink-page.component.html',
    styleUrls: ['./railroadink-page.component.scss']
})

export class RailroadinkPageComponent implements OnInit {

    pageVariables: { [key: string]: any } = {};
    diceId = 1

    diceDict: { [key: string]: DiceInfo } = {
        "white1": {
            "sides": ["RailCorner", "RailStraight", "RailSplit", "RoadCorner", "RoadStraight", "RoadSplit"]
        },
        "white2": {
            "sides": ["StationCorner", "StationStraight", "Bridge"]
        },
        "white3": {
            "sides": ["StationRailEnd", "StationRoadEnd", "StationCorner", "StationStraight", "StationSplitRail", "StationSplitRoad"]
        },
        "white4": {
            "sides": ["RailSplit", "RoadSplit", "Rail2Corners", "Road2Corners", "Bridge", "Bridge"]
        },
        "dessert1": {
            "sides": ["DessertSun", "DessertCactus", "DessertRoadCornerPond", "DessertRailStraightCactus", "DessertRailCornerPond", "DessertRoadStraightCactus"]
        },
        "dessert2": {
            "sides": ["DessertSun", "DessertCactus", "DessertRailCornerCactus", "DessertRoadCornerCactus", "DessertRailStraightPond", "DessertRoadStraightPond"]
        },
        "cliffs": {
            "sides": ["Cliff1", "Cliff2", "Cliff3", "Cliff4", "Cliff5", "Cliff6"]
        },
        "rivers": {
            "sides": ["RiverStraight", "RiverCorner", "RiverCorner", "RiverCorner", "RiverRail", "RiverRoad"]
        },
        "lakes": {
            "sides": ["LakeRail", "LakeStationCorner", "LakeRoad", "LakeCorner", "LakeFull", "LakeEnd"]
        },
        "hiking": {
            "sides": ["PathRoadSplit", "PathRoadCorner", "PathRoadStraight", "PathRailSplit", "PathRailCorner", "PathRailStraight"]
        },
        "forrest": {
            "sides": ["Forrest", "Forrest", "ForrestRailStraight", "ForrestRailCorner", "ForrestRoadStraight", "ForrestRoadCorner"]
        }
    };

    activeDice: Dice[] = [];
    rotations = [0, 90, 180, 270]

    diceImageReference: { [key: string]: string[] } = {
        "RailCorner": ["https://i.ibb.co/2KXLWxy/DA1.png"],
        "RailStraight": ["https://i.ibb.co/kmrv6fQ/DA2.png"],
        "RailSplit": ["https://i.ibb.co/mHxk3K3/DD3.png"],
        "RoadCorner": ["https://i.ibb.co/BGDmj3Z/DA4.png"],
        "RoadStraight": ["https://i.ibb.co/x5cPfXv/DA5.png"],
        "RoadSplit": ["https://i.ibb.co/mGWJtZL/DD4.png"],
        "StationCorner": ["https://i.ibb.co/fD7j9k1/DB2.png"],
        "StationStraight": ["https://i.ibb.co/6JCqh8p/DB1.png"],
        "StationSplitRail": ["https://i.ibb.co/52tjmLG/DC3.png"],
        "StationSplitRoad": ["https://i.ibb.co/2NgC8ZP/DC5.png"],
        "Rail2Corners": ["https://i.ibb.co/Qp613Pg/DD2.png"],
        "Road2Corners": ["https://i.ibb.co/CVRczC5/DD1.png"],
        "Bridge": ["https://i.ibb.co/sV6KLXv/DB3.png", "https://i.ibb.co/Y334pkC/DD6.png"],
        "StationRailEnd": ["https://i.ibb.co/zxH54xC/DC1.png"],
        "StationRoadEnd": ["https://i.ibb.co/0VcFRc5/DC6.png"],
        "DessertSun": ["https://i.ibb.co/PTyY8Zc/DF1.png"],
        "DessertRailStraightCactus": ["https://i.ibb.co/zH91PC1/DE4.png"],
        "DessertRailStraightPond": ["https://i.ibb.co/Rc7HLMs/DF4.png"],
        "DessertRailCornerCactus": ["https://i.ibb.co/prbk3Yh/DF2.png"],
        "DessertRailCornerPond": ["https://i.ibb.co/RSS790r/DE5.png"],
        "DessertCactus": ["https://i.ibb.co/stZkHHd/DF6.png"],
        "DessertRoadStraightCactus": ["https://i.ibb.co/8XsSst6/DE2.png"],
        "DessertRoadStraightPond": ["https://i.ibb.co/q9V23Nd/DF5.png"],
        "DessertRoadCornerCactus": ["https://i.ibb.co/yV7p2SB/DF3.png"],
        "DessertRoadCornerPond": ["https://i.ibb.co/JBXwWtD/DE6.png"],
        "Cliff1": ["https://i.ibb.co/9bhN3qP/DG1.png"],
        "Cliff2": ["https://i.ibb.co/B25Knqk/DG2.png"],
        "Cliff3": ["https://i.ibb.co/T4LpkHv/DG3.png"],
        "Cliff4": ["https://i.ibb.co/JFMvFkY/DG4.png"],
        "Cliff5": ["https://i.ibb.co/DW7sLkL/DG5.png"],
        "Cliff6": ["https://i.ibb.co/6Xtstws/DG6.png"],
        "RiverStraight": ["https://i.ibb.co/TMN72wy/DH1.png"],
        "RiverCorner": ["https://i.ibb.co/zxjbnYj/DH2.png"],
        "RiverRail": ["https://i.ibb.co/SNr0dd0/DH4.png"],
        "RiverRoad": ["https://i.ibb.co/V2BV38s/DH3.png"],
        "LakeRail": ["https://i.ibb.co/GJRCr5M/DI1.png"],
        "LakeStationCorner": ["https://i.ibb.co/gTwN7zR/DI2.png"],
        "LakeRoad": ["https://i.ibb.co/ZY5sxwY/DI3.png"],
        "LakeCorner": ["https://i.ibb.co/MBtdxCT/DI4.png"],
        "LakeFull": ["https://i.ibb.co/Nxz6RC2/DI5.png"],
        "LakeEnd": ["https://i.ibb.co/wS3FVN5/DI6.png"],
        "PathRoadSplit": ["https://i.ibb.co/jZYT72z/DJ1.png"],
        "PathRoadCorner": ["https://i.ibb.co/71WDK0m/DJ4.png"],
        "PathRoadStraight": ["https://i.ibb.co/0XfM7fS/DJ6.png"],
        "PathRailSplit": ["https://i.ibb.co/q0N0BwM/DJ3.png"],
        "PathRailCorner": ["https://i.ibb.co/6vTjB7c/DJ2.png"],
        "PathRailStraight": ["https://i.ibb.co/kMtG905/DJ5.png"],
        "Forrest": ["https://i.ibb.co/CPR5zFW/DK1.png", "https://i.ibb.co/XWY3WVS/DK3.png"],
        "ForrestRailStraight": ["https://i.ibb.co/ZVptwVB/DK2.png"],
        "ForrestRailCorner": ["https://i.ibb.co/cXqj6Kv/DK6.png"],
        "ForrestRoadStraight": ["https://i.ibb.co/TqRPGYK/DK4.png"],
        "ForrestRoadCorner": ["https://i.ibb.co/1fPKLTf/DK5.png"],
    };

    sets = [
        ["white1", "white1", "white1", "white2"],
        ["white1", "white1", "white3", "white4"],
        ["dessert1", "dessert2"],
        ["cliffs", "cliffs"],
        ["rivers", "rivers"],
        ["lakes", "lakes"],
        ["hiking", "hiking"],
        ["forrest", "forrest"],
    ]

    constructor(
        private editorService: EditorServiceService,
        private runtimeServiceService: RuntimeServiceService
    ) { }

    ngOnInit(): void {
        // this.editorService.setAllowEditor(true);
        this.runtimeServiceService.pageVariables$.subscribe((value) => {
            console.log(value)
            this.pageVariables = value;
        });
    }

    addSet(number: number) {
        for (let i = 0; i < this.sets[number].length; i++) {
            var newNumber = this.createDiceJson(this.sets[number][i])
            this.createDice(newNumber)


        }
    }

    getPageVariable(key: string | string[]): any | undefined {
        if (typeof key === 'string') {
            return this.pageVariables[key];
        } else if (Array.isArray(key)) {
            let currentLevel = this.pageVariables;
            for (const currentKey of key) {
                if (currentLevel && typeof currentLevel === 'object' && currentKey in currentLevel) {
                    currentLevel = currentLevel[currentKey];
                } else {
                    return false; // Return undefined if any intermediate key is missing
                }
            }
            return currentLevel;
        }
        return false; // Return undefined for unsupported key types
    }

    createDiceJson(name: string) {
        var json: Dice = {
            "diceType": name,
            "diceId": this.diceId,
            "image": "",
            "rotation": 0,
            "id": this.diceId
        }
        this.diceId += 1;
        this.activeDice.push(json)
        return this.activeDice.length - 1
    }

    rollAllDice() {
        for (let index = 0; index < this.activeDice.length; index++) {
            this.rollDiceFunction(this.activeDice[index])

        }
    }

    rollDiceFunction(dice: any) {
        var diceName: string = dice["diceType"]
        var itemName = this.diceDict[diceName]['sides'][Math.floor(Math.random() * this.diceDict[diceName]['sides'].length)];
        dice["image"] = this.diceImageReference[itemName][Math.floor(Math.random() * this.diceImageReference[itemName].length)];
        dice["rotation"] = this.rotations[Math.floor(Math.random() * this.rotations.length)];
        return dice
    }

    removeObjectWithId(id: number) {
        const objWithIdIndex = this.activeDice.findIndex((obj) => obj["diceId"] === id);

        if (objWithIdIndex > -1) {
            this.activeDice.splice(objWithIdIndex, 1);
        }
    }

    rollDice(id: number) {
        const objWithIdIndex = this.activeDice.findIndex((obj) => obj["diceId"] === id);
        if (objWithIdIndex > -1) {
            this.rollDiceFunction(this.activeDice[objWithIdIndex])
            this.activeDice[objWithIdIndex] = this.activeDice[objWithIdIndex]
        }
    }

    deleteDice(id: number) {
        this.removeObjectWithId(id)
    }

    createDice(index: number) {
        this.rollDiceFunction(this.activeDice[index])
    }

}
