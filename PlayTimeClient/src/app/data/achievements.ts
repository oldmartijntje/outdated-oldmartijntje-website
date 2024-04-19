export interface Achievement {
    teaserText: AchievementSettings;
    unlockedText: AchievementSettings;
    type: AchievementType;
    localstorageUrl: string;
    unlocksWhenLocolStorageUrlIsSetTo: any;
}

export interface AchievementSettings {
    title: string;
    description: string;
    show: boolean;
    icon?: string; // URL to icon
}

export enum AchievementType {
    Achievement = 'Achievement',
    Secret = 'Secret',
    EasterEgg = 'EasterEgg'
}

export const achievements: Achievement[] = [
    {
        teaserText: {
            title: 'But hey...',
            description: '',
            show: false,
            icon: ''
        },
        unlockedText: {
            title: 'That\'s just a theory!',
            description: '',
            show: true,
            icon: ''
        },
        type: AchievementType.Achievement,
        localstorageUrl: 'easterEggs.matpatCircle',
        unlocksWhenLocolStorageUrlIsSetTo: true
    },
    {
        teaserText: {
            title: '',
            description: '',
            show: false,
            icon: ''
        },
        unlockedText: {
            title: '',
            description: '',
            show: true,
            icon: ''
        },
        type: AchievementType.Achievement,
        localstorageUrl: 'easterEggs.xxxxx',
        unlocksWhenLocolStorageUrlIsSetTo: true
    },
    {
        teaserText: {
            title: '',
            description: '',
            show: false,
            icon: ''
        },
        unlockedText: {
            title: '',
            description: '',
            show: true,
            icon: ''
        },
        type: AchievementType.Achievement,
        localstorageUrl: 'easterEggs.xxxxx',
        unlocksWhenLocolStorageUrlIsSetTo: true
    },
    {
        teaserText: {
            title: '',
            description: '',
            show: false,
            icon: ''
        },
        unlockedText: {
            title: '',
            description: '',
            show: false,
            icon: ''
        },
        type: AchievementType.Achievement,
        localstorageUrl: 'easterEggs.xxxxx',
        unlocksWhenLocolStorageUrlIsSetTo: true
    },
];

const emptyAchievement: Achievement = {
    teaserText: {
        title: '',
        description: '',
        show: false,
        icon: ''
    },
    unlockedText: {
        title: '',
        description: '',
        show: false,
        icon: ''
    },
    type: AchievementType.Achievement,
    localstorageUrl: 'easterEggs.xxxxx',
    unlocksWhenLocolStorageUrlIsSetTo: true
};