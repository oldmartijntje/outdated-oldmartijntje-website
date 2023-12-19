export const DefaultStory = {
    "variables": {
        "henk": 0,
        "cheese": 2,
        "startAt": "1"
    },
    "slides": {
        "1": {
            "type": "prompt",
            "text": "you bump into a wall",
            "next": "2",
            "scene": "1"
        },
        "2": {
            "type": "choice",
            "text": "you bump into a wall",
            "scene": "1",
            "random": false,
            "choises": [
                {
                    "text": "die",
                    "next": "3"
                },
                {
                    "text": "cry about it",
                    "next": "4"
                },
                {
                    "text": "cry about it",
                    "next": "5",
                    "if": {
                        "variable": "henk",
                        "value": 0,
                        "typeOfCheck": ">|<|=|!=",
                        "onlyOption": false,
                        "showAsDisabled": true
                    }
                }
            ]
        },
        "3": {
            "type": "variable",
            "next": "4",
            "variable": {
                "name": "henk",
                "value": 1,
                "type": "+|=|-"
            },
        },
        "4": {
            "type": "playSound",
            "next": "5",
            "sound": "assets/sounds/1.mp3"
        },
    }
}

export const DefaultScenes = {
    "1": {
        "background": "assets/images/backgrounds/1.jpg",
        "music": "assets/music/1.mp3"
    }
}