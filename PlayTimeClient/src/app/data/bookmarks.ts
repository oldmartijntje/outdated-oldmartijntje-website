export const bookmarks: Record<string, any>[] = [
    {
        "TopText": "This is a test",
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
        "Tabs": [
            {
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
    },
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
        "TopText": "This Codepen gave me the design for this page",
        "Size": { "Width": "400px", "Height": "350px" },
        "Tabs": [
            {
                "Title": "Codepen",
                "Buttons": [
                    {
                        "Text": "Visit Codepen",
                        "Command": "Nav",
                        "Link": "https://codepen.io/tsukamoto/pen/KKVPeRp",
                        "AfterText": "or you can't do that?"
                    }
                ],
                "Text": [
                    {
                        "Text": "Made By: Sho Tsukamoto",
                        "Link": "https://codepen.io/tsukamoto"
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
    }
]