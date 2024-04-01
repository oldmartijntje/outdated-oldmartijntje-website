export interface Link {
    queryParam: string;
    link: string | string[];
    title: string;
    discoverable: boolean;
    queryParamsInLink?: { [key: string]: string };
}
export const linkTooltip: string = "https://oldmartijntje.nl/link?me=";

export const Links: Link[] = [
    {
        queryParam: "socials",
        link: "link",
        title: "All Socials",
        discoverable: true
    },
    {
        queryParam: "github",
        link: "https://github.com/oldmartijntje",
        title: "My Github",
        discoverable: true
    },
    {
        queryParam: "discord",
        link: "https://discord.com/invite/YUSSpNCdGA",
        title: "My Discord Server",
        discoverable: true
    },
    {
        queryParam: "docs",
        link: "https://docs.oldmartijntje.nl",
        title: "My Digital Garden",
        discoverable: true
    },
    {
        queryParam: "spotify",
        link: "https://stats.fm/oldmartijntje",
        title: "My Spotify statistics",
        discoverable: true
    },
    {
        queryParam: "youtube",
        link: "https://www.youtube.com/channel/UCd9_pxx4m9KP13s1-TncLcQ",
        title: "My Youtube channel",
        discoverable: true
    },
    {
        queryParam: "youtube2",
        link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        title: "Rickroll",
        discoverable: true
    },
    {
        queryParam: "blog",
        link: "https://oldmartijntje.tumblr.com",
        title: "My Blog.",
        discoverable: true
    },
    {
        queryParam: "reddit",
        link: "https://www.reddit.com/user/oldmartijntje/",
        title: "My Reddit account.",
        discoverable: true
    },
    {
        queryParam: "website",
        link: [],
        title: "Website Homepage",
        discoverable: true
    },
    {
        queryParam: "",
        link: [],
        title: "empty",
        discoverable: false
    },
    {
        queryParam: "instagram",
        link: "https://www.instagram.com/oldmartijntje/",
        title: "My personal instagram account.",
        discoverable: false
    },
    {
        queryParam: "twitter",
        link: "https://twitter.com/oldmartijntje",
        title: "My Twitter account.",
        discoverable: true
    },
    {
        queryParam: "twitter2",
        link: "https://twitter.com/OldMartinG",
        title: "My Twitter alt account.",
        discoverable: true
    },
    {
        queryParam: "roblox",
        link: "https://www.roblox.com/users/1860710799/profile",
        title: "My roblox account.",
        discoverable: false
    },
    {
        queryParam: "steam",
        link: "https://steamcommunity.com/profiles/76561199033294793/",
        title: "My Steam account.",
        discoverable: false
    },
    {
        queryParam: "anime",
        link: "https://www.anime-planet.com/users/oldmartijntje",
        title: "My Anime-Planet account.",
        discoverable: false
    },
    {
        queryParam: "linkedin",
        link: "https://www.linkedin.com/in/martijn-van-houwelingen/",
        title: "My LinkedIn account.",
        discoverable: false
    },
    {
        queryParam: "msg",
        link: "https://oldmartijntje.tumblr.com/ask",
        title: "A place to contact me.",
        discoverable: true
    },
    {
        queryParam: "chat",
        link: "Chat",
        title: "A chat application I made.",
        discoverable: true
    },
    {
        queryParam: "discord2",
        link: "https://discord.gg/tdpVxnnpCb",
        title: "My Private Discord Server (Gameing Grounds)",
        discoverable: false
    },
    {
        queryParam: "pfp",
        link: "https://oldmartijntje.nl/assets/images/mii.png",
        title: "My profile picture.",
        discoverable: true
    },
    {
        queryParam: "aprilFools",
        link: ['blueScreen'],
        title: "Navigates to the latest April Fools joke.",
        discoverable: false
    },
    {
        queryParam: "dQw4w9WgXcQ",
        link: ['home'],
        title: "Not Added Yet.",
        discoverable: false,
        queryParamsInLink: { "plain": "true" }
    },
    {
        queryParam: "plainWebsite",
        link: ['home'],
        title: "The homepage of this website. (No fancy stuff or April Fools jokes)",
        discoverable: true,
        queryParamsInLink: { "plain": "true" }
    },
    {
        queryParam: "adbee",
        link: ["AdBee"],
        title: "Rickroll Adbee",
        discoverable: true,
        queryParamsInLink: { "nav": "104,116,116,112,115,58,47,47,119,119,119,46,121,111,117,116,117,98,101,46,99,111,109,47,119,97,116,99,104,63,118,61,100,81,119,52,119,57,87,103,88,99,81" }
    },
]

export const Settings: any = {
    "inWindowsRouter": [
        "404", "Railroad", "windows", "AdBee"
    ],
    "ignoreDisclaimer": [
        "AdBee",
        "home",
        "link",
        "blueScreen"
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
var options = { hour12: false };
var datetime = date.toLocaleDateString('en-US', options) + ' ' + date.toLocaleTimeString('en-US', options);

export const DefaultMessages: any[] = [
    [
        {
            datetime: datetime,
            username: '🤖SYSTEM',
            content: 'This website prioritizes privacy and operates in a data-safe manner. Your account is identified by a randomly generated number, with all other information stored locally in your browser.',
            type: 'hidden'
        },
        {
            datetime: datetime,
            username: 'SYSTEM',
            content: 'Welcome to chat. Use /nick to set a nick. Use /help for other commands.',
            type: 'system'
        }
    ],
    [
        {
            datetime: datetime,
            username: 'SYSTEM',
            content: 'Username is too long. ' + Settings['usernameMaxLength'] + ' is the limit.',
            type: 'warning',
            SysId: 0
        },
        {
            datetime: datetime,
            username: 'SYSTEM',
            content: 'Message is too long. ' + Settings['messageMaxLength'] + ' is the limit.',
            type: 'warning',
            SysId: 1
        },
        {
            datetime: datetime,
            username: 'SYSTEM',
            content: 'Sucessfully changed username to ||USERNAME||',
            type: 'system',
            SysId: 2
        },
        {
            datetime: datetime,
            username: 'SYSTEM',
            content: 'Changing your name into ||USERNAME|| is not allowed.',
            type: 'warning',
            SysId: 3
        },
        {
            datetime: datetime,
            username: 'SYSTEM',
            content: 'Username is too short. ' + Settings['usernameMinLength'] + ' is the minimum. The only characters allowed are letters, numbers, semicolons, and underscores. (a-z, A-Z, 0-9, :, ;, _)',
            type: 'warning',
            SysId: 4
        },
        {
            datetime: datetime,
            username: 'SYSTEM',
            content: 'Message is too short. ' + Settings['messageMinLength'] + ' is the minimum. (Not all characters count as a character, since they\'ll be stripped away)',
            type: 'warning',
            SysId: 5
        },
        {
            datetime: datetime,
            username: 'SERVER',
            content: 'The server received your message, but it was empty. This means your message only had illegal characters.',
            type: 'error',
            SysId: 6
        },
        {
            datetime: datetime,
            username: 'SERVER',
            content: 'The server received your message, but your username was empty. This means your username only had illegal characters. The only characters allowed are letters, numbers, semicolons, and underscores. (a-z, A-Z, 0-9, :, ;, _)',
            type: 'error',
            SysId: 7
        },
        {
            datetime: datetime,
            username: 'SYSTEM',
            content: 'You need to type something to rename yourself as, for example: "/nick CoolUsername"',
            type: 'warning',
            SysId: 8
        },
        {
            datetime: datetime,
            username: 'SERVER',
            content: '||ERROR||',
            type: 'error',
            SysId: 9
        },
        {
            datetime: datetime,
            username: 'SYSTEM',
            content: 'Use /nick to change your nickname. \nUse /help for other commands. \nUse /admin to get admin commands.',
            type: 'system',
            SysId: 10
        },
        {
            datetime: datetime,
            username: 'SYSTEM',
            content: 'Use /ban {userId} to ban a user.\nUse /unban {userId} to unban a user.\nUse /ipban {userId} to ban an IP.\nUse /ipunban {userId} to unban an IP.\nUse /getipbans to get all banned IPs (encrypted).\nUse /getidbybans {ipBanId} to get all users that use a banned IP.\nUse /checkuser {userId} to check if a user is banned and which other users have the same IP.',
            type: 'system',
            SysId: 11
        },
        {
            datetime: datetime,
            username: 'SYSTEM',
            content: 'Command: \'||COMMAND||\'.\nData: \'||DATA||\'.\nMessage: \'||MESSAGE||\'.',
            type: 'system',
            SysId: 12
        },
        {
            datetime: datetime,
            username: 'SYSTEM',
            content: 'These are all accounts on the same IP as ||USERNAME||: ||USERNAMES||\nBanned: ||BANNED||',
            type: 'system',
            SysId: 13
        }
    ]
]

export const userTypeEmoji: any = {
    "oldmartijntje": "👑",
    "system": "🤖",
    "warning": "⚠️",
    "error": "❌",
    "mogus": "ඞ",
    "butterfly": "🦋",
    "japaneseSymbolForBeginner": "🔰",
    "pregnart": "🫃"
}

export const serverSideCommands = [
    '/ban',
    '/unban',
    '/ipban',
    '/ipunban',
    '/getipbans',
    '/getidbybans',
    '/checkuser',
];

export const hiddenIdentifierTypes: any = [
    "hidden",
    "system",
    "error",
    "warning"
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
            "Base": ["windows"],
            "QueryParams": {}
        },
        "Title": "Main Page",
        "Description": "This is the main page.",
        "TitlePath": "windows"
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
    }
}