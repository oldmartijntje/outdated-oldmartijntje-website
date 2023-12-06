export const EditorSettings: any = {
    "EditorPathing": [
        "Railroad",
        "404"
    ],
    "MaxLines": {
        "Console": 50,
        "Output": 50
    }
}

export const Settings: any = {
    "inWindowsRouter": [
        "404", "Railroad", "Home", "AdBee"
    ],
    "ignoreDisclaimer": [
        "AdBee"
    ],
    "usernameMaxLength": 16,
    "messageMaxLength": 256,
    'messageMinLength': 2,
    'usernameMinLength': 4,
    "blackListedUsernames": [
        "SYSTEM"
    ]
}

export const DefaultUserNames: string[] = [
    "Anonymous",
    "anotherGuy",
    "user",
    "noName",
    "nicknameless",
    "Player",
    "User"
]
var date = new Date();
export const DefaultMessages: any[] = [
    [
        {
            datetime: date.toLocaleDateString() + ' ' + date.toLocaleTimeString(),
            username: 'SYSTEM',
            content: 'Welcome to chat. Use /nick to set a nick.',
            type: 'system'
        }
    ],
    [
        {
            datetime: date.toLocaleDateString() + ' ' + date.toLocaleTimeString(),
            username: 'SYSTEM',
            content: 'Username is too long. ' + Settings['usernameMaxLength'] + ' is the limit.',
            type: 'warning',
            SysId: 0
        },
        {
            datetime: date.toLocaleDateString() + ' ' + date.toLocaleTimeString(),
            username: 'SYSTEM',
            content: 'Message is too long. ' + Settings['messageMaxLength'] + ' is the limit.',
            type: 'warning',
            SysId: 1
        },
        {
            datetime: date.toLocaleDateString() + ' ' + date.toLocaleTimeString(),
            username: 'SYSTEM',
            content: 'Sucessfully changed username to ||USERNAME||',
            type: 'system',
            SysId: 2
        },
        {
            datetime: date.toLocaleDateString() + ' ' + date.toLocaleTimeString(),
            username: 'SYSTEM',
            content: 'Changing your name into ||USERNAME|| is not allowed.',
            type: 'warning',
            SysId: 3
        },
        {
            datetime: date.toLocaleDateString() + ' ' + date.toLocaleTimeString(),
            username: 'SYSTEM',
            content: 'Username is too short. ' + Settings['usernameMinLength'] + ' is the minimum.',
            type: 'warning',
            SysId: 4
        },
        {
            datetime: date.toLocaleDateString() + ' ' + date.toLocaleTimeString(),
            username: 'SYSTEM',
            content: 'Message is too short. ' + Settings['messageMinLength'] + ' is the minimum.',
            type: 'warning',
            SysId: 5
        },
        {
            datetime: date.toLocaleDateString() + ' ' + date.toLocaleTimeString(),
            username: 'SERVER',
            content: 'The server received your message, but it was empty. This means your message only had illegal characters.',
            type: 'error',
            SysId: 6
        },
        {
            datetime: date.toLocaleDateString() + ' ' + date.toLocaleTimeString(),
            username: 'SERVER',
            content: 'The server received your message, but your username was empty. This means your username only had illegal characters. The only characters allowed are letters, numbers, semicolons, and underscores. (a-z, A-Z, 0-9, :, ;, _)',
            type: 'error',
            SysId: 7
        },
        {
            datetime: date.toLocaleDateString() + ' ' + date.toLocaleTimeString(),
            username: 'SYSTEM',
            content: 'You need to type something to rename yourself as, for example: "/nick CoolUsername"',
            type: 'warning',
            SysId: 8
        }
    ]
]

export const PageInfo: any = [
    {
        "Navigate": {
            "Base": ["404"],
            "QueryParams": {}
        },
        "Title": "404 Not Found Page",
        "Description": "This page does not exist.",
        "TitlePath": "404"
    },
    {
        "Navigate": {
            "Base": ["Home"],
            "QueryParams": {}
        },
        "Title": "Main Page",
        "Description": "This is the main page.",
        "TitlePath": "Home"
    },
    {
        "Navigate": {
            "Base": ["Railroad"],
            "QueryParams": {}
        },
        "Title": "Railroad Page",
        "Description": "This is the page for Railroad ink dice.",
        "TitlePath": "Railroad"
    },

]

export const PageCode: any = {
    "Editor": {
        "javascript": "function generateFibonacci(n) {\n  const fibonacciSequence = [];\n  \n  if (n >= 1) {\n    fibonacciSequence.push(0);\n  }\n  if (n >= 2) {\n    fibonacciSequence.push(1);\n  }\n\n  for (let i = 2; i < n; i++) {\n    const nextFibonacci = fibonacciSequence[i - 1] + fibonacciSequence[i - 2];\n    fibonacciSequence.push(nextFibonacci);\n  }\n\n  return fibonacciSequence;\n}\n\n// Example: Generate the first 10 Fibonacci numbers\nconst fibonacciNumbers = generateFibonacci(20);\nconsole.log(fibonacciNumbers);\n\n",
        "MarjinScript": "for(5){\n    print('henk', 'loop1')\n}\nprint('henk', 'noloop1')\nprint('henk', 'noloop2')\nfor(3) {\n    print('ss', 'loop2')\n    setValues(1, 2, 3, 4)\n    for(3) {\n        print('ss', 'loop2 subloop')\n        setValues(1, 2, 3, 4)\n    }\n}\n'123abc'\n6\n//cheeseI\nnoCommand(1)\n\n"
    },
    "Railroad": {
        "javascript": "",
        "MarjinScript": 'showTypeButton("ExpCliff")\nshowTypeButton("ExpDessert")\nshowTypeButton("ExpForrest")\nshowTypeButton("ExpHiking")\nshowTypeButton("ExpLake")\nshowTypeButton("ExpRiver")\nshowTypeButton("Normal1")\nshowTypeButton("Normal2")\nshowRollAllButton()\nshowDiceRollButton()\nshowDiceDeleteButton()\nshowDiceImage()\nsynchroniseCodeToPage()\n\n'
    },
    "404": {
        "javascript": "",
        "MarjinScript": ""
    }
}