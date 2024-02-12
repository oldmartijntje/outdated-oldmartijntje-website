export interface Game {
    [key: string]: any;
    id: string;
    name: string;
    nav?: string;
    settings?: GameSettings;
    info?: GameInfo;
}

export interface GameInfo {
    text: string;
    demoUrl?: string;
    keywords?: string[];
    developers?: string[];
    githubRepo?: string;
    images?: string[];
}

export interface GameSettings {
    jsonDesign: any;
    items: GameSettingItem[];
    version: string;
    publisher: string;
    tabs: string[];
}

export interface GameSettingItem {
    title: string;
    settingTab: string;
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