export interface Game {
    [key: string]: any;
    id: string;
    name: string;
    imageUrl: string;
    nav: string;
    settings?: GameSettings;
}

export interface GameSettings {
    jsonDesign: any;
    items: GameSettingItem[];
    version: string;
    publisher: string;
}

export interface GameSettingItem {
    title: string;
    type: GameSettingType;
    replaceIdentifierForJson: string;
}

export interface GameSettingType {
    value: any;
}

export interface GameSettingTypeText extends GameSettingType {
    type: 'text';
}

export interface GameSettingTypeNumber extends GameSettingType {
    type: 'number';
    min: number;
    max: number;
}

export interface GameSettingTypeBoolean extends GameSettingType {
    type: 'boolean';
}

export interface GameSettingTypeSelect extends GameSettingType {
    type: 'select';
    options: GameSettingSelectable[];
}

export interface GameSettingSelectable {
    text: string;
    value: any;
}

export const games: Game[] = [
    {
        id: 'home',
        name: 'My WindowsXP Homepage',
        imageUrl: 'https://i.imgur.com/AleDHLn.png',
        nav: '/Home',
        settings: {
            jsonDesign: { "mobileMode": "val1" },
            items: [
                {
                    title: 'Mobile mode',
                    type: {
                        type: 'boolean',
                        value: false
                    } as GameSettingTypeBoolean,
                    replaceIdentifierForJson: 'val1'
                }
            ],
            version: 'Ver. 1.0.0',
            publisher: 'OldMartijntje'
        }
    },
    {
        id: 'chat',
        name: 'My Chat',
        imageUrl: 'https://i.imgur.com/YImBBrS.png',
        nav: '/Chat'
    },
    {
        id: 'explorer',
        name: 'Explorer of the internet',
        imageUrl: 'https://i.imgur.com/O20GeaF.png',
        nav: '/ItemDisplay'
    },
    {
        id: 'github',
        name: 'Github',
        imageUrl: 'https://i.imgur.com/1bZ0CgJ.png',
        nav: 'https://github.com/oldmartijntje'
    },
];