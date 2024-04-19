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
            icon: '../assets/icons/achievements/Sprite-0002-locked.png'
        },
        unlockedData: {
            title: 'Peepee poopoo',
            description: 'Made a funny word on the [404 page](https://oldmartijntje.nl/Fancy404).',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0002-unlocked.png'
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
            icon: '../assets/icons/achievements/Sprite-0004-locked.png'
        },
        unlockedData: {
            title: 'No need to be formal',
            description: 'You removed the interpunction from the [404 page](https://oldmartijntje.nl/Fancy404).',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0004-unlocked.png'
        },
        type: AchievementType.EasterEgg,
        localstorageUrl: 'easterEggs.Fancy404.noNeedToBeFormal',
        unlocksWhenLocolStorageUrlIsSetTo: true,
        hideOnMobile: true
    },
    {
        lockedData: {
            title: '404 UNO reverse card not found',
            description: 'But let\'s say that, hypothetically, it was found?',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0003-locked.png'
        },
        unlockedData: {
            title: 'The One Page is REALLL!!',
            description: 'You removed the "not" from the "404 not found" message.',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0003-unlocked.png'
        },
        type: AchievementType.EasterEgg,
        localstorageUrl: 'easterEggs.Fancy404.OhWaitItDoesExist',
        unlocksWhenLocolStorageUrlIsSetTo: true,
        hideOnMobile: true
    },
    {
        lockedData: {
            title: 'Thanos snap?',
            description: 'The 404 page is not found, as it should be.',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0005-locked.png'
        },
        unlockedData: {
            title: '404 Letters not found',
            description: 'You removed all the characters from the [404 page](https://oldmartijntje.nl/Fancy404).',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0005-unlocked.png'
        },
        type: AchievementType.EasterEgg,
        localstorageUrl: 'easterEggs.Fancy404.LettersNotFound',
        unlocksWhenLocolStorageUrlIsSetTo: true,
        hideOnMobile: true
    },
    {
        lockedData: {
            title: 'Ethernity not found.',
            description: 'Try clicking 404 page text.',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0006-locked.png'
        },
        unlockedData: {
            title: 'Ethernal Power!',
            description: 'You found the DOOM game.',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0006-unlocked.png'
        },
        type: AchievementType.EasterEgg,
        localstorageUrl: 'easterEggs.404.EthernityNF',
        unlocksWhenLocolStorageUrlIsSetTo: true,
        hideOnMobile: false
    },
    {
        lockedData: {
            title: '100 Clicks!',
            description: 'Get a 1up mushroom.',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0007-locked.png'
        },
        unlockedData: {
            title: 'What a deal!',
            description: 'You clicked a coin 100 times, and got a 1up mushroom!',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0007-unlocked.png'
        },
        type: AchievementType.Achievement,
        localstorageUrl: 'easterEggs.ClickerGame.1up',
        unlocksWhenLocolStorageUrlIsSetTo: true,
        hideOnMobile: false
    },
    {
        lockedData: {
            title: 'Fast Traval.',
            description: 'If only there was a way to not have to type out the full URL to my socials...',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0008-locked.png'
        },
        unlockedData: {
            title: 'Fast Travel.',
            description: 'You used the [navigator](https://oldmartijntje.nl/link) to fast travel.',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0008-unlocked.png'
        },
        type: AchievementType.Achievement,
        localstorageUrl: 'easterEggs.navigator.fastTravel',
        unlocksWhenLocolStorageUrlIsSetTo: true,
        hideOnMobile: false
    },
    {
        lockedData: {
            title: 'Fast Maniac.',
            description: 'Can\'t get enough of fast traveling, that\'s why you did it 10 times!',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0008-locked.png'
        },
        unlockedData: {
            title: 'Fast Maniac.',
            description: 'You used the [navigator](https://oldmartijntje.nl/link) to fast travel 10 times.',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0009-unlocked.png'
        },
        type: AchievementType.Achievement,
        localstorageUrl: 'easterEggs.navigator.fastTravelCounter',
        unlocksWhenLocolStorageUrlIsSetTo: 10,
        hideOnMobile: false
    }
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