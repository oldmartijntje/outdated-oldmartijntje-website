export interface Achievement {
    lockedData: AchievementSettings;
    unlockedData: AchievementSettings;
    type: AchievementType;
    localstorageUrl: string;
    unlocksWhenLocolStorageUrlIsSetTo: any;
    hideOnMobile: boolean;
    found?: boolean;
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
        lockedData: {
            title: 'But hey...',
            description: 'Thanks for watching!',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0001-locked.png'
        },
        unlockedData: {
            title: 'That\'s just a theory!',
            description: 'You did the order of [this](https://www.youtube.com/watch?v=OcAUG4tsthE) Game theory intro.',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0001-unlocked.png'
        },
        type: AchievementType.Achievement,
        localstorageUrl: 'easterEggs.matpatCircle',
        unlocksWhenLocolStorageUrlIsSetTo: true,
        hideOnMobile: false
    },
    {
        lockedData: {
            title: 'Funy go brr',
            description: 'I think people in third grade find this funny.\n\nIt is done on a 404 page..',
            show: true,
            icon: ''
        },
        unlockedData: {
            title: 'Peepee poopoo',
            description: 'Made a funny word on the [404 page](https://oldmartijntje.nl/Fancy404).',
            show: true,
            icon: ''
        },
        type: AchievementType.EasterEgg,
        localstorageUrl: 'easterEggs.Fancy404.theFunnyOne',
        unlocksWhenLocolStorageUrlIsSetTo: true,
        hideOnMobile: true
    },
    {
        lockedData: {
            title: '!.,?;:',
            description: '404 characters not found.',
            show: true,
            icon: ''
        },
        unlockedData: {
            title: 'No need to be formal',
            description: 'You removed the interpunction from the [404 page](https://oldmartijntje.nl/Fancy404).',
            show: true,
            icon: ''
        },
        type: AchievementType.EasterEgg,
        localstorageUrl: 'easterEggs.Fancy404.noNeedToBeFormal',
        unlocksWhenLocolStorageUrlIsSetTo: true,
        hideOnMobile: true
    },
    {
        lockedData: {
            title: 'UNO reverse card?',
            description: '404 funny joke not found.\n\nIt probably fell off the page.',
            show: true,
            icon: ''
        },
        unlockedData: {
            title: 'The One Page is REALLL!!',
            description: 'You removed the "not" from the "404 not found" message.',
            show: true,
            icon: ''
        },
        type: AchievementType.EasterEgg,
        localstorageUrl: 'easterEggs.Fancy404.OhWaitItDoesExist',
        unlocksWhenLocolStorageUrlIsSetTo: true,
        hideOnMobile: true
    },
    {
        lockedData: {
            title: 'Thanos snap?',
            description: '404 page not found.\n\nIt probably got snapped away.',
            show: true,
            icon: ''
        },
        unlockedData: {
            title: '404 Letters not found',
            description: 'You removed all the characters from the [404 page](https://oldmartijntje.nl/Fancy404).',
            show: true,
            icon: ''
        },
        type: AchievementType.EasterEgg,
        localstorageUrl: 'easterEggs.Fancy404.LettersNotFound',
        unlocksWhenLocolStorageUrlIsSetTo: true,
        hideOnMobile: true
    },
];

const emptyAchievement: Achievement = {
    lockedData: {
        title: '',
        description: '',
        show: false,
        icon: ''
    },
    unlockedData: {
        title: '',
        description: '',
        show: false,
        icon: ''
    },
    type: AchievementType.Achievement,
    localstorageUrl: 'easterEggs.xxxxx',
    unlocksWhenLocolStorageUrlIsSetTo: true,
    hideOnMobile: false
};