import { Game, GameSettingTypeBoolean } from "../models/homescreenItems.interface"

export const games: Game[] = [
    {
        id: 'windowsXPHomepage',
        name: 'My WindowsXP Homepage',
        imageUrl: 'https://i.imgur.com/AleDHLn.png',
        nav: '/Home',
        settings: {
            jsonDesign: { "mobileMode": "val1" },
            items: [
                {
                    title: 'Mobile mode',
                    settingTab: 'General',
                    type: {
                        type: 'boolean',
                        value: false
                    } as GameSettingTypeBoolean,
                    replaceIdentifierForJson: 'val1'
                }
            ],
            tabs: ['General', 'Test'],
            version: 'Ver. 1.0.0',
            publisher: 'OldMartijntje'
        },
        info: {
            text: 'A windows XP homepage recreation. Made with Angular.',
            demoUrl: '/Home',
            keywords: ['Angular', 'HTML/CSS', 'TypeScript'],
            developers: ['OldMartijntje']
        },
    },
    {
        id: 'chat',
        name: 'My Chat',
        imageUrl: 'https://i.imgur.com/YImBBrS.png',
        nav: '/Chat',
        info: {
            text: 'A chat website that I made with Angular and PHP.',
            demoUrl: 'Chat',
            keywords: ['Angular', 'HTML/CSS', 'TypeScript', 'PHP'],
            developers: ['OldMartijntje']
        }
    },
    {
        id: 'explorer',
        name: 'Explorer of the internet',
        imageUrl: 'https://i.imgur.com/O20GeaF.png',
        nav: '/ItemDisplay',
        info: {
            text: 'A webpage that I made with Angular. You can explore random websites with it.',
            demoUrl: '',
            keywords: [],
            developers: ['OldMartijntje']
        }
    },
    {
        id: 'github',
        name: 'Github',
        imageUrl: 'https://i.imgur.com/1bZ0CgJ.png',
        nav: 'https://github.com/oldmartijntje',
        info: {
            text: '',
            demoUrl: '',
            keywords: [],
            developers: ['OldMartijntje']
        }
    },
    {
        id: 'obsidianVault',
        name: 'OldMartijntje\'s Obsidian Vault.',
        imageUrl: 'https://i.imgur.com/BqEtov7.png',
        nav: 'https://docs.oldmartijntje.nl',
        info: {
            text: '',
            demoUrl: '',
            keywords: [],
            developers: ['OldMartijntje']
        },
    },
];

export const projects: Game[] = [
    {
        id: 'sisu',
        name: 'Simpel Subsidie Chatbot',
        imageUrl: 'https://i.imgur.com/JepdwY6.png',
        nav: '',
        info: {
            text: 'Chatbot that I made for the company SimpelSubsidie. It is a chatbot that helps people with questions about subsidies.',
            demoUrl: 'https://isde-subsidie.nl/chatbot/',
            keywords: ['PHP', 'Chatbot', 'ChatGPT'],
            developers: ['OldMartijntje']
        }
    },
    {
        id: 'nintendoSwitchHomescreen',
        name: 'Nintendo Homepage UI',
        imageUrl: 'https://i.imgur.com/RFOG0iI.png',
        nav: '',
        info: {
            text: 'A recreation of the Nintendo Switch Homepage UI. Made with Angular.',
            demoUrl: 'Homepage',
            keywords: ['Angular', 'HTML/CSS', 'TypeScript'],
            developers: ['OldMartijntje']
        },
    }
];