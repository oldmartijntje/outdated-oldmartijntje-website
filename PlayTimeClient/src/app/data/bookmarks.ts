export const bookmarks: Record<string, any>[] = [

    {
        "Popup": [
            {
                "Text": "Catastrophic failure",
                "Img": "assets/icons/Exclamation.png"
            }
        ],
        "Title": "Error",
        "Size": { "Width": "200px", "Height": "350px" },
        "Buttons": [
            {
                "Text": "No",
                "Command": "close",
                "Link": ""
            }
        ],
        "Tabs": [],

    },
    {
        "Popup": [
            {
                "Text": "Want to download a virus?",
                "Img": "assets/icons/Question.png"
            }
        ],
        "Title": "Curiosity",
        "Size": { "Width": "200px" },
        "Buttons": [
            {
                "Text": "Install",
                "Command": "openNewTab",
                "Link": "",
                "Payload": {
                    "Popup": [
                    ],
                    "Title": "Error",
                    "Size": { "Width": "400px" },
                    "Buttons": [
                        {
                            "Text": "Close",
                            "Command": "virus",
                            "Link": ""
                        }
                    ],
                    "Tabs": [],
                    "InnerHTML": '<img src="https://media.tenor.com/W9t4G8la9w4AAAAd/you-are-idiot.gif" style="width: 100%">'
                }
            },
            {
                "Text": "Cancel",
                "Command": "close",
                "Link": "",
            }
        ],
        "Tabs": [],
    },
    {
        "Popup": [
        ],
        "Title": "Codepen",
        "TopText": "A few Codepens that I like",
        "Size": { "Width": "400px" },
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
        "Title": "neocities",
        "Size": { "Width": "400px" },
        "Tabs": [
            {
                "Title": "dimden.dev",
                "Buttons": [
                ],
                "Text": [
                    {
                        "Text": "This is a cool website that someone sent me.",
                        "Link": ""
                    }
                ],
                "InnerHTML": '<a href="https://dimden.dev/" target="_blank"><img src="https://dimden.dev/services/images/88x31.gif"></a>'

            },
            {
                "Title": "melankorin.net",
                "Buttons": [
                ],
                "Text": [
                    {
                        "Text": "I found this one through the Navlink Ads.",
                        "Link": ""
                    }
                ],
                "InnerHTML": '<a href="https://melankorin.net/"><img src="https://melankorin.net/assets/img/buttons/button-2.gif" alt=""></a>'

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
                    },
                    {
                        "Text": "Sadly Angular components keep refreshing every time the page changes (which is a lot more than you'd think), it instantly changes ads. (And for some reason chrome does on mouse move)",
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
        "Size": { "Width": "200px" },
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
        "CloseButton": {
            "Command": "",
            "Link": ""
        },
        "Title": "WARNING",
        "Size": { "Width": "300px" },
        "Buttons": [
            {
                "Text": "Previous",
                "Command": "nav",
                "Link": "https://hotlinewebring.club/oldma/previous"
            },
            {
                "Text": "HOTLINE WEBRING",
                "Command": "nav",
                "Link": "https://hotlinewebring.club"
            },
            {
                "Text": "Next",
                "Command": "nav",
                "Link": "https://hotlinewebring.club/oldma/next"
            }
        ],
        "Tabs": []
    },
    {
        "Popup": [
            {
                "Text": "Virus Detected?",
                "Img": "assets/icons/Question.png"
            }
        ],
        "Title": ".exe",
        "Size": { "Width": "200px" },
        "Buttons": [
            {
                "Text": "OK",
                "Command": "nav",
                "Link": "https://tominhisroom.dev"
            }
        ],
        "Tabs": []
    },
    {
        "Size": { "Width": "600px" },
        "Popup": [
        ],
        "Title": "Page Explorer",
        "Type": "Router"
    },
    {
        "Popup": [
        ],
        "Title": "Flag Counter",
        "Size": { "Width": "330px" },
        "Buttons": [
            {
                "Text": "OK",
                "Command": "close",
                "Link": ""
            },
            {
                "Text": "What?",
                "Command": "nav",
                "Link": "https://s11.flagcounter.com/more/cH0p/"
            }
        ],
        "Tabs": [],
        "InnerHTML": '<a href="https://info.flagcounter.com/cH0p"><img src="https://s11.flagcounter.com/count2/cH0p/bg_FAF9F9/txt_000000/border_919B9C/columns_4/maxflags_12/viewers_0/labels_0/pageviews_1/flags_0/percent_0/" alt="Flag Counter" border="0"></a>'
    },
    {
        "Popup": [
        ],
        "TopText": "Link me!",
        "Title": "Flag Counter",
        "Size": { "Width": "330px" },
        "Buttons": [
            {
                "Text": "OK",
                "Command": "close",
                "Link": ""
            },
            {
                "Text": "What?",
                "Command": "nav",
                "Link": "https://s11.flagcounter.com/more/cH0p/"
            }
        ],
        "Tabs": [],
        "InnerHTML": '<a href="https://oldmartijntje.nl/"><img src="/assets/icons/oldmartijntje.png" alt=""></a><textarea rows="4" cols="50">&lt;a href="https://oldmartijntje.nl/"&gt;&lt;img src="https://oldmartijntje.nl/assets/icons/oldmartijntje.png" alt=""&gt;&lt;/a&gt;</textarea>\n'
    }
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
    "Size": { "Width": "400px" },
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