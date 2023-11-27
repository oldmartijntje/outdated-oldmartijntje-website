export const MarioClicker: Record<string, any> = {
    "toolTip": [
        {
            "text": "Every rebirth gives you a discount on everything you buy. It also auto saves your game.",
            "require": "rebirth",
            "click": true,
            "title": "Rebirth"
        },
        {
            "text": "If you have more than the cost of a rebirth, you get a small bonus to your rebirth discount.",
            "require": ["rebirth", "hammer-Bro"],
            "click": true,
            "title": "Rebirth Bonus"
        },
        {
            "text": "Rebirths only reset values and upgrades unlocked before the rebirth button.",
            "require": ["rebirth", "cosmic-clone"],
            "click": true,
            "title": "Rebirth Reset"
        },
        {
            "text": "Better Rebirths have a higher discount than normal rebirths. But also reset normal rebirths.",
            "require": ["rebirth", "cure-shroom"],
            "click": true,
            "title": "Better Rebirth"
        }
    ],
    "autoSaveCooldwon": 120,
    "currency": {
        "coin": {
            "amount": 0,
            "require": "click",
            "max": 100
        },
        "life": {
            "amount": 0,
            "require": "1up",
            "max": 999
        },
        "heart": {
            "amount": 0,
            "require": "goomba",
        },
        "powerHeart": {
            "amount": 0,
            "require": "",
        },
        "rebirth": {
            "amount": 0,
            "require": "rebirth",
        },
        "better-rebirth": {
            "amount": 0,
            "require": "better-rebirth",
        }
    },
    "discovery": {
        "click": false,
        "1up": false,
        "mini goomba": false,
        "goomba": false,
        "koopa": false,
        "para-koopa": false,
        "dry-bones": false,
        "para-dry-bones": false,
        "hammer-Bro": false,
        "rebirth": false,
        "cosmic-clone": false,
        "cure-shroom": false,
        "better-rebirth": false,
        "questionmark-block": false,
    },
    "buys": {
        "mini goomba": {
            "cost": {
                "amount": 1,
                "type": "life",
                "mode": "once"
            },
            "amount": 0,
            "costMultiplier": 1.25,
            "gives": {
                "amount": 1,
                "type": "coin",
                "mode": "perSecond"
            },
            "requires": "1up"
        },
        "goomba": {
            "cost": {
                "amount": 5,
                "type": "life",
                "mode": "once"
            },
            "amount": 0,
            "costMultiplier": 1.25,
            "gives": {
                "amount": 10,
                "type": "coin",
                "mode": "perSecond"
            },
            "requires": "mini goomba"
        },
        "koopa": {
            "cost": {
                "amount": 69,
                "type": "life",
                "mode": "once"
            },
            "amount": 0,
            "costMultiplier": 1.25,
            "gives": {
                "amount": 1,
                "type": "life",
                "mode": "perSecond"
            },
            "requires": "goomba"
        },
        "para-koopa": {
            "cost": {
                "amount": 50,
                "type": "life",
                "mode": "once"
            },
            "amount": 0,
            "costMultiplier": 1.05,
            "gives": {
                "amount": 1,
                "type": "heart",
                "mode": "once"
            },
            "requires": "goomba"
        },
        "dry-bones": {
            "cost": {
                "amount": 5,
                "type": "heart",
                "mode": "once"
            },
            "amount": 0,
            "costMultiplier": 1.05,
            "gives": {
                "amount": 10,
                "type": "life",
                "mode": "perSecond"
            },
            "requires": "para-koopa"
        },
        "para-dry-bones": {
            "cost": {
                "amount": 10,
                "type": "heart",
                "mode": "once"
            },
            "amount": 0,
            "costMultiplier": 1.1,
            "gives": {
                "amount": 20,
                "type": "life",
                "mode": "perSecond"
            },
            "requires": "dry-bones"
        },
        "hammer-Bro": {
            "cost": {
                "amount": 25,
                "type": "life",
                "mode": "perSecond"
            },
            "amount": 0,
            "costMultiplier": 1.15,
            "gives": {
                "amount": 1,
                "type": "heart",
                "mode": "perSecond"
            },
            "requires": "dry-bones"
        },
        "cheep-cheep": {
            "cost": {
                "amount": 1,
                "type": "rebirth",
                "mode": "once"
            },
            "amount": 0,
            "costMultiplier": 1.25,
            "gives": {
                "amount": 100,
                "type": "life",
                "mode": "once"
            },
            "requires": ["1up", "rebirth"]
        },
        "cheep-chomp": {
            "cost": {
                "amount": 1,
                "type": "rebirth",
                "mode": "once"
            },
            "amount": 0,
            "costMultiplier": 1.25,
            "gives": {
                "amount": 1,
                "type": "life",
                "mode": "perSecond"
            },
            "requires": ["1up", "rebirth", "cosmic-clone"]
        },
    },
    "specialBuys": {
        "rebirth": {
            "cost": {
                "type": "heart",
                "amount": 7.5,
                "mode": "perSecond"
            },
            "costMultiplier": 1.5,
            "gives": {
                "type": "rebirth",
                "amount": 1,
                "extra": 0.001,
                "mode": "once"
            },
            "requires": "hammer-Bro",
            "run": "rebirth"
        },
        "cosmic-clone": {
            "cost": {
                "type": "life",
                "amount": 1001,
                "mode": "once"
            },
            "costMultiplier": 1.5,
            "requires": ["rebirth", "hammer-Bro"],
            "run": "maximum+1000",
            "description": "increase the maximum of everything by 1000"
        },
        "cure-shroom": {
            "cost": {
                "type": "life",
                "amount": 10,
                "mode": "perSecond"
            },
            "costMultiplier": 1.15,
            "requires": ["rebirth", "cosmic-clone"],
            "run": "maximum-coin-100",
            "description": "decrease the maximum of coins by 100"
        },
        "questionmark-block": {
            "cost": {
                "type": "coin",
                "amount": 420,
                "mode": "once"
            },
            "costMultiplier": 1.25,
            "requires": ["rebirth", "cosmic-clone"],
            "run": "+1",
            "description": "every time you buy a 'currency', you get +1"
        },
        "wide-questionmark-block": {
            "cost": {
                "type": "rebirth",
                "amount": 10,
                "mode": "once"
            },
            "costMultiplier": 1.75,
            "requires": ["questionmark-block"],
            "run": "+10",
            "description": "every time you buy a 'currency', you get +10"
        },
        "better-rebirth": {
            "cost": {
                "type": "life",
                "amount": 9999,
                "mode": "perSecond"
            },
            "costMultiplier": 1.5,
            "gives": {
                "type": "better-rebirth",
                "amount": 1,
                "extra": 0.001,
                "mode": "once"
            },
            "requires": ["rebirth", "cure-shroom"],
            "run": "rebirth"
        },
    },
    "perSecond": {
        "coin": {
            "amount": 0,
            "require": "mini goomba",
        },
        "life": {
            "amount": 0,
            "require": "goomba",
        },
        "heart": {
            "amount": 0,
            "require": "hammer-Bro",
        },
        "powerHeart": {
            "amount": 0,
            "require": "",
        },
    },
    "autoSave": 0,
    "rebirthSettings": {
        "rebirth": {
            "discount": 0.001,
            "reset": {
                "currency": true,
                "discovery": true,
                "buys": true,
                "specialBuys": true,
                "perSecond": true,
                "rebirthSettings": true,
                "upgrades": false,
                "ignoreKeys": [
                    "rebirth",
                    "1up",
                    "click",
                    "cosmic-clone",
                    "better-rebirth",
                    "cure-shroom",
                    "questionmark-block",
                    "wide-questionmark-block"
                ]
            }
        },
        "better-rebirth": {
            "discount": 0.069,
            "reset": {
                "currency": true,
                "discovery": true,
                "buys": true,
                "specialBuys": true,
                "perSecond": true,
                "rebirthSettings": true,
                "upgrades": true,
                "ignoreKeys": [
                    "better-rebirth",
                    "1up",
                    "click",
                ]
            }
        }
    },
    "upgrades": {
        "maximum": {
            "coin": 0,
            "life": 0,
        },
        "extraPerBuy": 0
    }
}
