export const MarioClicker: Record<string, any> = {
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
            "require": "",
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
        "rebirth": false
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
    },
    "specialBuys": {
        "rebirth": {
            "cost": {
                "type": "heart",
                "amount": 10,
                "mode": "perSecond"
            },
            "costMultiplier": 1,
            "gives": {
                "type": "rebirth",
                "amount": 1,
                "extra": 0.000001,
                "mode": "once"
            },
            "requires": "hammer-Bro",
            "run": "rebirth"
        }
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
                "perSecond": true,
                "autoSave": true,
                "ignoreKeys": [
                    "autoSave",
                    "rebirth",
                    "1up",
                    "click"
                ]
            }
        }
    }
}
