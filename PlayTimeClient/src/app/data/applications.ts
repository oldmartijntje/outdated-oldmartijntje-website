import { Shortcut } from "../models/applications"

export const application: Record<string, any>[] = [
    {
        "Size": { "Width": "600px" },
        "Popup": [
        ],
        "Title": "Page Explorer",
        "Type": "Router",
        'ParentId': 9,
        "SinglePageId": "page-explorer",
        'Minimised': false
    },
]

export const shortcuts: Shortcut[] = [
    {
        "Title": "Installer.iso",
        "Icon": "assets/icons/iso.png",
        "Command": "openNewTab",
        "Link": "",
        "Payload": {
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
                        "InnerHTML": '<img src="https://media1.tenor.com/m/9MVlipGuNioAAAAC/you-are-an-idiot.gif" style="width: 100%">'
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
        "Location": {
            "X": 0,
            "Y": 0
        }
    },
    {
        "Title": "Minecraft.exe",
        "Icon": "https://i.imgur.com/QDCsTUb.png",
        "Command": "openNewTab",
        "Link": "",
        "Payload": {
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
        "Location": {
            "X": 0,
            "Y": 0
        }
    },
    {
        "Title": "Doom.exe",
        "Icon": "https://i.imgur.com/3Ry6Cvl.png",
        "Command": "openNewTab",
        "Link": "",
        "Payload": {
            "Popup": [

            ],
            "Title": "Click me to play Doom!",
            "Size": { "Width": "700px", "Height": "350px" },
            "Buttons": [

            ],
            "Tabs": [],
            "Type": "Iframe",
            "iframe": {
                "src": "https://dos.zone/player/?bundleUrl=https%3A%2F%2Fcdn.dos.zone%2Fcustom%2Fdos%2Fdoom.jsdos?anonymous=1",
                "width": "680",
                "height": "400",
                "frameborder": true
            }
        },
        "Location": {
            "X": 0,
            "Y": 0
        }
    },
    {
        "Title": "Codepen",
        "Icon": "https://i.imgur.com/tCEFkcD.png",
        "Command": "openNewTab",
        "Link": "",
        "Payload": {
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
                    "Title": "CSS3 Marquee effect - with/without javascript",
                    "Buttons": [
                        {
                            "Text": "Visit Codepen",
                            "Command": "Nav",
                            "Link": "https://codepen.io/ayulayol/pen/LvQNpV",
                            "AfterText": " Scroll.. Scroll.. Scroll.."
                        }
                    ],
                    "Text": [
                        {
                            "Text": "This helped me a lot with the ads.",
                            "Link": ""
                        },
                        {
                            "Text": "Made By: AYUL AYOL",
                            "Link": "https://codepen.io/ayulayol"
                        },
                        {
                            "Text": "Thanks Stan for making the same thing :D",
                            "Link": "https://codepen.io/Staninna/pen/dyamjyQ"
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
        "Location": {
            "X": 1,
            "Y": -2
        }
    },
    {
        "Title": "Neocities",
        "Icon": "https://i.imgur.com/FW2h5Yd.png",
        "Command": "openNewTab",
        "Link": "",
        "Payload": {
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
                    "Title": "vaerael",
                    "Text": [
                        {
                            "Text": "I found this one that kinda looks like mine.",
                            "Link": ""
                        }
                    ],
                    "InnerHTML": '<a href="http://vaerael.neocities.org/"><img src="https://64.media.tumblr.com/fb603cee5834488971d74d7f66cdf99d/6c005a58dfcc6d02-12/s540x810/e2aaabc47e427d4f1af027a67dd03a5306ccb88f.png"/></a>'

                },
                {
                    "Title": "Notable Links",
                    "Buttons": [
                        {
                            "Text": "Cool PC?",
                            "Command": "Nav",
                            "Link": "https://www.windows93.net",
                            "AfterText": "Check this thing I found on the vaerael page."
                        }
                    ],
                    "Text": [
                        {
                            "Text": "Basically all cool websites, but if I keep adding pages to this window it'll be too clutterred.",
                            "Link": ""
                        }
                    ],
                    "InnerHTML": ''

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
        "Location": {
            "X": 0,
            "Y": -1
        }
    },
    {
        "Title": "Github",
        "Icon": "https://i.imgur.com/xeBj2vD.png",
        "Command": "openNewTab",
        "Link": "",
        "Payload": {
            "Popup": [
                {
                    "Text": "Visit my github!",
                    "Img": "assets/icons/Information.png"
                }
            ],
            "Title": "Hey!",
            "Size": { "Width": "300px" },
            "Buttons": [
                {
                    "Text": "OK",
                    "Command": "nav",
                    "Link": "https://oldmartijntje.nl/link?me=github"
                },
                {
                    "Text": "This website is open source!",
                    "Command": "nav",
                    "Link": "https://github.com/oldmartijntje/playtime"
                }
            ],
            "Tabs": []
        },
        "Location": {
            "X": 0,
            "Y": 0
        },
    },
    {
        "Title": "Hotline Webring",
        "Icon": "https://i.imgur.com/mNIIElh.png",
        "Command": "openNewTab",
        "Link": "",
        "Payload": {
            "Popup": [
                {
                    "Text": "You encountered HOTLINE WEBRING!",
                    "Img": "assets/icons/Exclamation.png"
                }
            ],
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
        "Location": {
            "X": 1,
            "Y": 0
        }
    },
    {
        "Title": "tominhisroom",
        "Icon": "https://i.imgur.com/vVFWGCH.png",
        "Command": "openNewTab",
        "Link": "",
        "Payload": {
            "Popup": [
                {
                    "Text": "Do you want to check out my friends website?",
                    "Img": "assets/icons/Question.png"
                }
            ],
            "Title": "tominhisroom.dev",
            "Size": { "Width": "250px" },
            "Buttons": [
                {
                    "Text": "OK",
                    "Command": "nav",
                    "Link": "https://tominhisroom.dev"
                }
            ],
            "Tabs": []
        },
        "Location": {
            "X": 2,
            "Y": -1
        }
    },
    {
        "Title": "Link me!",
        "Icon": "assets/icons/oldma.png",
        "Command": "openNewTab",
        "Link": "",
        "Payload": {
            "Popup": [
            ],
            "Size": { "Width": "400px" },
            "Title": "Link me!",
            "Tabs": [
                {
                    "Title": "Small",
                    "InnerHTML": '<a href="https://oldmartijntje.nl/"><img src="https://i.imgur.com/5svJRQD.png" alt=""></a><textarea style="border-width: 2px; border-color: #919b9c; border-style: solid;" rows="4" cols="50">&lt;a href="https://oldmartijntje.nl/"&gt;&lt;img src="https://i.imgur.com/5svJRQD.png" alt=""&gt;&lt;/a&gt;</textarea>'
                },
                {
                    "Title": "Wide",
                    "InnerHTML": '<a href="https://oldmartijntje.nl/"><img src="https://i.imgur.com/HCb2U1H.png" alt=""></a><textarea style="border-width: 2px; border-color: #919b9c; border-style: solid;" rows="4" cols="50">&lt;a href="https://oldmartijntje.nl/"&gt;&lt;img src="https://i.imgur.com/HCb2U1H.png" alt=""&gt;&lt;/a&gt;</textarea>'
                }
            ],
            "TopText": "Link me!",
            "Buttons": [
                {
                    "Text": "OK",
                    "Command": "close",
                    "Link": ""
                }
            ],
        },
        "Location": {
            "X": 0,
            "Y": -1
        }
    },
    {
        "Title": "Page Explorer",
        "Icon": "assets/icons/Internet.ico",
        "Command": "openSingleNewTab",
        "Link": "",
        "Payload": {
            "Size": { "Width": "600px" },
            "Popup": [
            ],
            "Title": "Page Explorer",
            "Type": "Router",
            "SinglePageId": "page-explorer",
        },
        "Location": {
            "X": 2,
            "Y": -5
        }
    },
    {
        "Title": "Task Manager",
        "Icon": "assets/icons/pc.ico",
        "Command": "openNewTab",
        "Link": "",
        "Payload": {
            "Popup": [

            ],
            "Title": "Task Manager",
            "Size": { "Width": "450px", "Height": "350px" },
            'ParentId': 10,
            "Buttons": [

            ],
            "Tabs": [
                {
                    "Title": "Processes",
                    "Mode": "Processes",

                },
                // {
                //     "Title": "Startup",
                //     "Mode": "Startup",
                // },
                {
                    "Title": "Developer Data",
                    "Mode": "Dev",
                }
            ],
            "Type": "TaskManager"
        },
        "Location": {
            "X": 1,
            "Y": -3
        }
    },
    {
        "Title": "Mobile Mode",
        "Icon": "assets/icons/phone.ico",
        "Command": "mobileMode",
        "Link": "",
        "Payload": {
        },
        "Location": {
            "X": 2,
            "Y": -11
        }
    },
    {
        "Title": "Mail",
        "Icon": "../assets/images/turtleWithEnvelope.png",
        "Command": "nav",
        "Link": "https://oldmartijntje.nl/Chat",
        "Payload": {
        },
        "Location": {
            "X": 1,
            "Y": -9
        }
    },
    {
        "Title": "Youtube.mew",
        "Icon": "https://i.imgur.com/4xsgRm6.png",
        "Command": "openNewTab",
        "Link": "",
        "Payload": {
            "Popup": [

            ],
            "Title": "dQw4w9WgXcQ",
            "Size": { "Width": "700px", "Height": "350px" },
            "Buttons": [

            ],
            "Tabs": [],
            "Type": "Iframe",
            "iframe": {
                "src": "https://www.youtube.com/embed/DLzxrzFCyOs?hl=en_US&version=3&rel=0&autoplay=1",
                "width": "680",
                "height": "400",
                "frameborder": true
            }
        },
        "Location": {
            "X": 3,
            "Y": -11
        }
    },
    {
        "Title": "mielesgames",
        "Icon": "https://i.imgur.com/efgkNK5.png",
        "Command": "openNewTab",
        "Link": "",
        "Payload": {
            "Popup": [
                {
                    "Text": "Do you want to check out my friends website?",
                    "Img": "assets/icons/Question.png"
                }
            ],
            "Title": "https://mielesgames.nl",
            "Size": { "Width": "250px" },
            "Buttons": [
                {
                    "Text": "OK",
                    "Command": "nav",
                    "Link": "https://mielesgames.nl/About"
                }
            ],
            "Tabs": []
        },
        "Location": {
            "X": 3,
            "Y": -14
        }
    },
    {
        "Title": "Nintendo Switch",
        "Icon": "https://i.imgur.com/metEtPg.png",
        "Command": "nav",
        "Link": "https://oldmartijntje.nl/nintendo",
        "Payload": {
        },
        "Location": {
            "X": 4,
            "Y": -10
        }
    },
    {
        "Title": "digital garden",
        "Icon": "https://i.imgur.com/BMpl8FL.png",
        "Command": "openNewTab",
        "Link": "",
        "Payload": {
            "Popup": [
                {
                    "Text": "Do you want to check out my digital garden?",
                    "Img": "assets/icons/Question.png"
                }
            ],
            "Title": "https://docs.oldmartijntje.nl",
            "Size": { "Width": "350px" },
            "Buttons": [
                {
                    "Text": "OK",
                    "Command": "nav",
                    "Link": "https://oldmartijntje.nl/link?me=docs"
                }
            ],
            "Tabs": []
        },
        "Location": {
            "X": 2,
            "Y": -13
        }
    },
]

export const taskBar: Shortcut[] = [
    {
        "Title": "Page Explorer",
        "Icon": "assets/icons/Internet.ico",
        "Command": "openSingleNewTab",
        "Link": "",
        "Payload": {
            "Size": { "Width": "600px" },
            "Popup": [
            ],
            "Title": "Page Explorer",
            "Type": "Router",
            "SinglePageId": "page-explorer",
        },
        "Id": 9,
        "Location": {
            "X": 2,
            "Y": -5
        }
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
