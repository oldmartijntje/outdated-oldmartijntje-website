export const bookmarks: Record<string, any>[] = [

    {
        "Popup": [
            {
                "Text": "Catastrophic failure",
                "Img": "assets/icons/Exclamation.png"
            }
        ],
        "Title": "Error",
        "Size": { "Width": "400px", "Height": "350px" },
        "DisableCloseButton": true,
        "Buttons": [
            {
                "Text": "OK",
                "Command": "virus",
                "Link": ""
            }
        ],
        "Tabs": []
    },
    {
        "Popup": [
        ],
        "Title": "Codepen",
        "TopText": "A few Codepens that I like",
        "Size": { "Width": "400px", "Height": "350px" },
        "Tabs": [
            {
                "Title": "Windows XP in browser",
                "Buttons": [
                    {
                        "Text": "Visit Codepen",
                        "Command": "Nav",
                        "Link": "https://codepen.io/tsukamoto/pen/KKVPeRp",
                        "AfterText": "or you can't do that?"
                    }
                ],
                'InnerHTML': '',
                "Text": [
                    {
                        "Text": "This Codepen gave me the design for this page",
                        "Link": ""
                    },
                    {
                        "Text": "Made By: Sho Tsukamoto",
                        "Link": "https://codepen.io/tsukamoto"
                    }
                ],

            },
            {
                "Title": "CSS social buttons and icons",
                "Buttons": [
                    {
                        "Text": "Visit Codepen",
                        "Command": "Nav",
                        "Link": "https://codepen.io/Stanssongs/pen/VwvrBR",
                        "AfterText": " Such great design :D"
                    }
                ],
                "Text": [
                    {
                        "Text": "Probably will use this at some point.",
                        "Link": ""
                    },
                    {
                        "Text": "Made By: Stan Williams",
                        "Link": "https://codepen.io/Stanssongs"
                    }
                ],

            },
            {
                "Title": "Draggable Windows",
                "Buttons": [
                    {
                        "Text": "Visit Codepen",
                        "Command": "Nav",
                        "Link": "https://codepen.io/eibonlabs/pen/xxYNNao",
                        "AfterText": " Wow, this is a nice codepen"
                    }
                ],
                "Text": [
                    {
                        "Text": "This is juast a nice codepen that I found",
                        "Link": ""
                    },
                    {
                        "Text": "Made By: eibonlabs",
                        "Link": "https://codepen.io/eibonlabs"
                    }
                ],

            }
        ],
        "Buttons": [
            {
                "Text": "OK",
                "Command": "Close",
                "Link": ""
            }
        ]
    },
    {
        "Popup": [
        ],
        "Title": "dimden.dev",
        "Size": { "Width": "400px", "Height": "350px" },
        "Tabs": [
            {
                "Title": "Welcome!",
                "Buttons": [
                    {
                        "Text": "Visit Website",
                        "Command": "Nav",
                        "Link": "https://dimden.dev",
                        "AfterText": "It's pretty nice!"
                    }
                ],
                "Text": [
                    {
                        "Text": "This is a cool website that someone sent me.",
                        "Link": ""
                    }
                ]

            },
            {
                "InnerHTML": '<iframe width="180" height="180" style="border:none; margin-top: 0.5rem;" src="https://dimden.neocities.org/navlink/" name="neolink"></iframe>',
                "Title": " NavLink Ads!",
                "Buttons": [
                    {
                        "Text": "Visit Website",
                        "Command": "Nav",
                        "Link": "https://dimden.dev/navlinkads/",
                        "AfterText": "This is a very fun idea. UwU"
                    }
                ],
                "Text": [
                    {
                        "Text": "NavLink Ads is an ad system for personal websites. It cycles between ads every 30 seconds. It does not host any commercial ADs, and it does not cost money to join. Every ad in the system is for personal websites only, and preferrably hand coded sites (so nothing made with a website builder).",
                        "Link": ""
                    }
                ],

            }
        ],
        "Buttons": [
            {
                "Text": "OK",
                "Command": "Close",
                "Link": ""
            }
        ]
    },
    {
        "Popup": [
            {
                "Text": "Visit my github!",
                "Img": "assets/icons/Information.png"
            }
        ],
        "Title": "Hey!",
        "Size": { "Width": "400px", "Height": "350px" },
        "Buttons": [
            {
                "Text": "OK",
                "Command": "nav",
                "Link": "https://github.com/oldmartijntje"
            }
        ],
        "Tabs": []
    },
    {
        "Popup": [
            {
                "Text": "You encountered HOTLINE WEBRING!",
                "Img": "assets/icons/Exclamation.png"
            }
        ],
        "Title": "WARNING",
        "Size": { "Width": "400px", "Height": "350px" },
        "Buttons": [
            {
                "Text": "Previous",
                "Command": "nav",
                "Link": "https://hotlinewebring.club/oldma/previous"
            },
            {
                "Text": "Next",
                "Command": "nav",
                "Link": "https://hotlinewebring.club/oldma/next"
            }
        ],
        "Tabs": []
    },
]

var test = {
    "TopText": "This is a test",
    "Type": "WinXP",
    "Popup": [
        {
            "Text": "Error",
            "Img": "assets/icons/Critical Error.png"
        },
        {
            "Text": "Info",
            "Img": "assets/icons/Information.png"
        },
        {
            "Text": "Question",
            "Img": "assets/icons/Question.png"
        },
        {
            "Text": "Warning",
            "Img": "assets/icons/Exclamation.png"
        }
    ],
    "Title": "Test Window",
    "Size": { "Width": "400px", "Height": "350px" },
    "InnerHTML": "<h1>Test</h1>",
    "Tabs": [
        {
            "InnerHTML": "<h1>Test</h1>",
            "Title": "Tab1",
            "Buttons": [
                {
                    "Text": "Reset Alarm...",
                    "Command": "",
                    "Link": "https://codepen.io/",
                    "AfterText": "Try this to get some attention"
                },
                {
                    "Text": "Button2",
                    "Command": "",
                    "Link": "https://codepen.io/",
                    "AfterText": "AfterText2"
                }
            ],
            "Text": [
                {
                    "Text": "This is text",
                    "Link": "https://codepen.io/"
                },
                {
                    "Text": "Set your listening preferences",
                    "Link": ""
                },
            ],
            "RadioButtons": [
                {
                    "BoxTitle": "Today's mood",
                    "Options": [
                        { "Text": "Henk" },
                        { "Text": "Gertruda" },
                        { "Text": "Frietpan frank" },
                        { "Text": "Wilco" },
                        { "Text": "DieTim" }
                    ]
                }
            ]

        },
        {
            "Title": "Tab2",
            "Buttons": [
                {
                    "Text": "Button3",
                    "Command": "",
                    "Link": "https://codepen.io/",
                    "AfterText": "AfterText1"
                },
                {
                    "Text": "Button4",
                    "Command": "",
                    "Link": "https://codepen.io/",
                    "AfterText": "AfterText2"
                }
            ],
            "Id": 1

        }
    ],
    "Buttons": [
        {
            "Text": "OK",
            "Command": "",
            "Link": ""
        },
        {
            "Text": "Cancel",
            "Command": "",
            "Link": ""
        },
        {
            "Text": "OwO",
            "Command": "",
            "Link": ""
        }
    ]
}