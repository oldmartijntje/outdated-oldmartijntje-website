export const DefaultStory = {
    "variables": {
        "coins": 0,
        "mushrooms": 0
    },
    "startSlide": "1",
    "showSaveButton": true,
    "defaultNextSlideText": "Next Slide...",
    "slides": {
        "1": {
            "type": "prompt",
            "text": "Welcome to the Mushroom Kingdom!",
            "next": "2",
            "scene": "1"
        },
        "2": {
            "type": "prompt",
            "text": "Mario is on a quest to rescue Princess Peach from Bowser's castle.",
            "next": "3",
            "scene": "2"
        },
        "3": {
            "type": "choice",
            "text": "What should Mario do?",
            "scene": "3",
            "autoSelectrandom": false,
            "shuffleOrder": false,
            "choices": [
                {
                    "text": "Jump on Goomba",
                    "next": "4",
                    "style": "1"
                },
                {
                    "text": "Collect coins",
                    "next": "5"
                },
                {
                    "text": "Enter warp pipe",
                    "next": "6",
                    "if": {
                        "variable": "mushrooms",
                        "value": 1,
                        "typeOfCheck": ">",
                        "onlyOption": false,
                        "showAsDisabled": false,
                        "autoClick": false,
                    },
                    "disabledStyle": "redText"
                }
            ]
        },
        "4": {
            "type": "prompt",
            "text": "Mario defeated the Goomba!",
            "next": "3",
            "scene": "2"
        },
        "5": {
            "type": "variable",
            "next": "7",
            "variable": {
                "name": "coins",
                "value": 1,
                "type": "+"
            },
        },
        "6": {
            "type": "prompt",
            "text": "The warp pipe takes Mario to a secret level!",
            "next": "8",
            "scene": "2"
        },
        "7": {
            "type": "variable",
            "next": "9",
            "variable": {
                "name": "mushrooms",
                "value": 1,
                "type": "+"
            },
        },
        "8": {
            "type": "prompt",
            "text": "Mario found the hidden treasure!",
            "next": "3",
            "scene": "2"
        },
        "9": {
            "type": "prompt",
            "text": "Mario found a coin!",
            "next": "3",
            "scene": "2",
            "style": "yellowText",
            "promptStyling": "yellowText",
        },
    }
}

export const DefaultScenes = {
    "1": {
        "styling": {
            "background": "url(\"../assets/images/background.gif\")"
        }
    },
    "2": {
        "styling": {
            "background": "#87CEEB"
        }
    },
    "3": {
        "styling": {
            "background": "#F0F8FF"
        }
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
            "color": "black",
            'cursor': 'pointer',
            'user-select': 'none'
        },
        "yellowText": {
            "color": "yellow",
            'cursor': 'pointer',
            'user-select': 'none'
        },
    }
}