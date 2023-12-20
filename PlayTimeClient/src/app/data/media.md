- don't ever call a slide or scene or styling `"-1"`, cause then it won't work.



```ts
// sound related things in the scenes are not implemented
export const DefaultStory = {
    "variables": {

    },
    "startSlide": "1",
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
            "scene": "2",
            "autoSelectrandom": false,
            "shuffleOrder": false,
            "choices": [
                {
                    "text": "die",
                    "next": "5",
                    "style": "redText"
                },
                {
                    "text": "cry about it",
                    "next": "3"
                },
                {
                    "text": "eat a tsar bomba",
                    "next": "1",
                    "if": {
                        "variable": "henk",
                        "value": 0,
                        "typeOfCheck": ">|<|==|!=|>=|<=",
                        "onlyOption": false,
                        "showAsDisabled": false,
                        "autoClick": false,
                    },
                    "disabledStyle": "1"
                }
            ]
        },
        "3": {
            "type": "variable",
            "next": "6",
            "variable": {
                "name": "henk",
                "value": 1,
                "type": "+|-|="
            },
        },
        "4": {
            "type": "playSound",
            "next": "1",
            "sound": "../assets/audio/mario-1-up.mp3",
            "volume": 0.1,
        },
        "5": {
            "promptStyling": "1",
            "type": "prompt",
            "text": "cool, ur ded now",
            "next": "1",
            "scene": "1",
            "nextSlideText": "Restart"
        },
        "6": {
            "type": "variable",
            "next": "7",
            "variable": {
                "name": "henk",
                "value": 1,
                "type": "="
            },
        },
        "7": {
            "type": "variable",
            "next": "8",
            "variable": {
                "name": "henk",
                "value": 1,
                "type": "-"
            },
        },
        "8": {
            "type": "variable",
            "next": "4",
            "variable": {
                "name": "henk",
                "value": 3,
                "type": "+"
            },
        },
    }
}

export const DefaultScenes = {
    "1": {
        "styling": {
            "background": "url(\"../assets/images/background.gif\")"
        },
        "music": "assets/music/1.mp3",
        "volume": 0.5
    },
    "2": {
        "styling": {
            "background": "#111"
        },
        "music": "assets/music/1.mp3",
        "volume": 0.5
    }
}

export const Styling = {
    "default": {
        "choices": "1",
        "nextSlide": "1",
        "textBox": "1"
    },
    "styles": {
        "1": {
            "background-color": "#313338",
            'cursor': 'pointer',
            'user-select': 'none',
            'color': 'white'
        },
        "redText": {
            "color": "red",
            'cursor': 'pointer',
            'user-select': 'none'
        }
    }
}
```