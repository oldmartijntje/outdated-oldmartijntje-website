export const DefaultStory = {
    "variables": {
        "henk": 0,
        "cheese": 2,
    },
    "startScene": "1",
    "showSaveButton": true,
    "defaultNextSlideText": "Next Slide...",
    "slides": {
        "1": {
            "type": "prompt",
            "text": "you bump into a wall",
            "next": "2",
            "scene": "1"
        },
        "2": {
            "type": "choice",
            "text": "what do you do?",
            "scene": "1",
            "autoSelectrandom": false,
            "shuffleOrder": false,
            "choises": [
                {
                    "text": "die",
                    "next": "5",
                    "style": "1"
                },
                {
                    "text": "cry about it",
                    "next": "4"
                },
                {
                    "text": "eat a tsar bomba",
                    "next": "1",
                    "if": {
                        "variable": "henk",
                        "value": 4,
                        "typeOfCheck": ">",
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
                "type": "+"
            },
        },
        "4": {
            "type": "playSound",
            "next": "1",
            "sound": "assets/sounds/1.mp3"
        },
        "5": {
            "type": "prompt",
            "text": "cool, ur ded now",
            "next": "1",
            "scene": "1",
            "nextSlideText": "Restart",
            "style": "1"
        },
    }
}

export const DefaultScenes = {
    "1": {
        "background": "assets/images/backgrounds/1.jpg",
        "music": "assets/music/1.mp3"
    }
}

export const Styling = {
    "default": {
        "choices": "2",
        "nextSlide": "2",
    },
    "styles": {
        "1": {
            "color": "red",
            'cursor': 'pointer',
            'user-select': 'none'
        },
        "2": {
            "color": "black",
            'cursor': 'pointer',
            'user-select': 'none'
        }
    }
}