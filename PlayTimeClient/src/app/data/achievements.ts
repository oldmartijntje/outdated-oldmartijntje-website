export interface Achievement {
    lockedData: AchievementSettings;
    unlockedData: AchievementSettings;
    type: AchievementType;
    localstorageUrl: string;
    unlocksWhenLocolStorageUrlIsSetTo: any;
    hideOnMobile: boolean;
    found?: boolean;
    difficulty: number; // 1-10
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
        type: AchievementType.EasterEgg,
        localstorageUrl: 'easterEggs.matpatCircle',
        unlocksWhenLocolStorageUrlIsSetTo: true,
        hideOnMobile: false,
        difficulty: 6
    },
    {
        lockedData: {
            title: 'Funy go brr',
            description: 'I think people in third grade find this funny.\n\nIt is done on a very fancy 404 page..',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0002-locked.png'
        },
        unlockedData: {
            title: 'Peepee poopoo',
            description: 'Made a funny word on the [404 page](https://oldmartijntje.github.io/outdated-oldmartijntje-website/Fancy404).',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0002-unlocked.png'
        },
        type: AchievementType.EasterEgg,
        localstorageUrl: 'easterEggs.Fancy404.theFunnyOne',
        unlocksWhenLocolStorageUrlIsSetTo: true,
        hideOnMobile: true,
        difficulty: 2
    },
    {
        lockedData: {
            title: '!.,?;:',
            description: '[404](https://oldmartijntje.github.io/outdated-oldmartijntje-website/Fancy404) characters not found.',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0004-locked.png'
        },
        unlockedData: {
            title: 'No need to be formal',
            description: 'You removed the interpunction from the [404 page](https://oldmartijntje.github.io/outdated-oldmartijntje-website/Fancy404).',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0004-unlocked.png'
        },
        type: AchievementType.EasterEgg,
        localstorageUrl: 'easterEggs.Fancy404.noNeedToBeFormal',
        unlocksWhenLocolStorageUrlIsSetTo: true,
        hideOnMobile: true,
        difficulty: 1
    },
    {
        lockedData: {
            title: '404 UNO reverse card not found',
            description: 'But let\'s say that, hypothetically, it was found?\n\nVery fancy..',
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
        hideOnMobile: true,
        difficulty: 3
    },
    {
        lockedData: {
            title: 'Thanos fanciest snap?',
            description: 'The 404 page is not found, as it should be.',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0005-locked.png'
        },
        unlockedData: {
            title: '404 Letters not found',
            description: 'You removed all the characters from the [404 page](https://oldmartijntje.github.io/outdated-oldmartijntje-website/Fancy404).',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0005-unlocked.png'
        },
        type: AchievementType.EasterEgg,
        localstorageUrl: 'easterEggs.Fancy404.LettersNotFound',
        unlocksWhenLocolStorageUrlIsSetTo: true,
        hideOnMobile: true,
        difficulty: 1
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
        hideOnMobile: false,
        difficulty: 4
    },
    {
        lockedData: {
            title: '100 Clicks!',
            description: 'Get a 1up mushroom in [the clickerGame](http://oldmartijntje.nl/windows).',
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
        hideOnMobile: false,
        difficulty: 2
    },
    {
        lockedData: {
            title: 'Fast Traval.',
            description: 'If only there was a way to not have to type out the full URL to my socials...\n\n[Navigator](https://oldmartijntje.github.io/outdated-oldmartijntje-website/link).',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0008-locked.png'
        },
        unlockedData: {
            title: 'Fast Travel.',
            description: 'You used the [navigator](https://oldmartijntje.github.io/outdated-oldmartijntje-website/link) to fast travel.\n\nThese links will never change, even when I change my accounts.\n[https://oldmartijntje.github.io/outdated-oldmartijntje-website/Link?me=github](https://oldmartijntje.github.io/outdated-oldmartijntje-website/Link?me=github) will always point towards my current github profile.',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0008-unlocked.png'
        },
        type: AchievementType.Achievement,
        localstorageUrl: 'easterEggs.navigator.fastTravel',
        unlocksWhenLocolStorageUrlIsSetTo: true,
        hideOnMobile: false,
        difficulty: 2
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
            description: 'You used the [navigator](https://oldmartijntje.github.io/outdated-oldmartijntje-website/link) to fast travel 10 times.',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0009-unlocked.png'
        },
        type: AchievementType.Achievement,
        localstorageUrl: 'easterEggs.navigator.fastTravelCounter',
        unlocksWhenLocolStorageUrlIsSetTo: 10,
        hideOnMobile: false,
        difficulty: 4
    },
    {
        lockedData: {
            title: 'The first one\'s always free',
            description: 'Use 0.0005 joules of energy to unlock this achievement.\n\nThis is equivalent to 10-7 kilocalories (big calories)—or less than a calorie, and even smaller than a small calorie. Even if I exert a bigger force over a greater distance, I\'m not going to burn one big calorie clicking a mouse.',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0010-locked.png'
        },
        unlockedData: {
            title: 'The first one\'s always free',
            description: 'You clicked this achievement.\n\nThis costed you 0.0005 joules of energy.\nThis is equivalent to 10-7 kilocalories (big calories)—or less than a calorie, and even smaller than a small calorie.',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0010-unlocked.png'
        },
        type: AchievementType.Achievement,
        localstorageUrl: 'easterEggs.firstOneFree',
        unlocksWhenLocolStorageUrlIsSetTo: true,
        hideOnMobile: false,
        difficulty: 1
    },
    {
        lockedData: {
            title: 'Shopaholic',
            description: 'Buy 50 things from the shop.\n\nIn [the clickerGame](http://oldmartijntje.nl/windows)',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0014-locked.png'
        },
        unlockedData: {
            title: 'Shopaholic',
            description: 'You bought 50 things from the shop in [the clickerGame](http://oldmartijntje.nl/windows).',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0014-unlocked.png'
        },
        type: AchievementType.Achievement,
        localstorageUrl: 'easterEggs.ClickerGame.shopaholic',
        unlocksWhenLocolStorageUrlIsSetTo: 50,
        hideOnMobile: false,
        difficulty: 7
    },
    {
        lockedData: {
            title: 'I shall return!',
            description: 'The Clicker game awaits you.\n\n[Click here](http://oldmartijntje.nl/windows) to ascend.',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0012-locked.png'
        },
        unlockedData: {
            title: 'I shall return!',
            description: 'You returned to [the clickerGame](http://oldmartijntje.nl/windows) with progression from a previous session.',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0012-unlocked.png'
        },
        type: AchievementType.Achievement,
        localstorageUrl: 'easterEggs.ClickerGame.welcomeBack',
        unlocksWhenLocolStorageUrlIsSetTo: true,
        hideOnMobile: false,
        difficulty: 3
    },
    {
        lockedData: {
            title: 'I can open this?',
            description: 'What happens when I click [this application](http://oldmartijntje.nl/windows)?',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0013-locked.png'
        },
        unlockedData: {
            title: 'I can open this?',
            description: 'Opened an application on the windows homepage.',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0013-unlocked.png'
        },
        type: AchievementType.Achievement,
        localstorageUrl: 'easterEggs.windows.runme',
        unlocksWhenLocolStorageUrlIsSetTo: true,
        hideOnMobile: true,
        difficulty: 2
    },
    {
        lockedData: {
            title: 'Life saver',
            description: 'Use taskmanager to close 50 [applications](http://oldmartijntje.nl/windows) at once.',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0011-locked.png'
        },
        unlockedData: {
            title: 'Life saver',
            description: 'Used taskmanager to close 50 [applications](http://oldmartijntje.nl/windows) at once.',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0011-unlocked.png'
        },
        type: AchievementType.Achievement,
        localstorageUrl: 'easterEggs.windows.delete50Processes',
        unlocksWhenLocolStorageUrlIsSetTo: true,
        hideOnMobile: true,
        difficulty: 4
    },
    {
        lockedData: {
            title: 'Well that doesn\'t close it...',
            description: 'Encounter a "virus" and close it.',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0015-locked.png'
        },
        unlockedData: {
            title: 'Well that doesn\'t close it...',
            description: 'You have tried to close the virus. Which did not turn out as expected.',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0015-unlocked.png'
        },
        type: AchievementType.EasterEgg,
        localstorageUrl: 'easterEggs.windows.duplication101',
        unlocksWhenLocolStorageUrlIsSetTo: true,
        hideOnMobile: true,
        difficulty: 3
    },
    {
        lockedData: {
            title: 'Birdz and the Beez.',
            description: 'Summon the [Bee](https://oldmartijntje.github.io/outdated-oldmartijntje-website/AdBee).\n\nCreate an AdBee link.',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0022-locked.png'
        },
        unlockedData: {
            title: 'Birdz and the Beez.',
            description: 'You created an AdBee link.',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0022-unlocked.png'
        },
        type: AchievementType.Achievement,
        localstorageUrl: 'easterEggs.windows.adBee',
        unlocksWhenLocolStorageUrlIsSetTo: true,
        hideOnMobile: false,
        difficulty: 3
    },
    {
        lockedData: {
            title: 'A new Identity!',
            description: 'Give yourself a new alias for the [Chat](https://oldmartijntje.github.io/outdated-oldmartijntje-website/Chat).',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0025-locked.png'
        },
        unlockedData: {
            title: 'A new Identity!',
            description: 'You changed your name in the Chat.',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0025-unlocked.png'
        },
        type: AchievementType.Achievement,
        localstorageUrl: 'easterEggs.chat.renameMe',
        unlocksWhenLocolStorageUrlIsSetTo: true,
        hideOnMobile: false,
        difficulty: 3
    },
    {
        lockedData: {
            title: 'Their first words',
            description: 'Send a message in the [Chat](https://oldmartijntje.github.io/outdated-oldmartijntje-website/Chat).',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0026-locked.png'
        },
        unlockedData: {
            title: 'Their first words',
            description: 'You sent a message in the Chat.',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0026-unlocked.png'
        },
        type: AchievementType.Achievement,
        localstorageUrl: 'easterEggs.chat.messages',
        unlocksWhenLocolStorageUrlIsSetTo: true,
        hideOnMobile: false,
        difficulty: 3
    },
    {
        lockedData: {
            title: 'Hacktor',
            description: 'Use the [terminal](https://oldmartijntje.github.io/outdated-oldmartijntje-website/Chat)',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0020-locked.png'
        },
        unlockedData: {
            title: 'Hacktor',
            description: 'You ran a command in the [terminal](https://oldmartijntje.github.io/outdated-oldmartijntje-website/Chat).',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0020-unlocked.png'
        },
        type: AchievementType.Achievement,
        localstorageUrl: 'easterEggs.chat.terminal',
        unlocksWhenLocolStorageUrlIsSetTo: true,
        hideOnMobile: true,
        difficulty: 3
    },
    {
        lockedData: {
            title: 'Tracing back the steps',
            description: 'Use the [step tracker](https://oldmartijntje.github.io/outdated-oldmartijntje-website/StepTracker) to track your steps.',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0024-locked.png'
        },
        unlockedData: {
            title: 'Tracing back the steps',
            description: 'You used the [step tracker](https://oldmartijntje.github.io/outdated-oldmartijntje-website/StepTracker) to track your steps.',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0024-unlocked.png'
        },
        type: AchievementType.Achievement,
        localstorageUrl: 'easterEggs.StepTracker.countingSteps',
        unlocksWhenLocolStorageUrlIsSetTo: 10,
        hideOnMobile: false,
        difficulty: 3
    },
    {
        lockedData: {
            title: 'Timeliness go brr',
            description: 'Use the [step tracker](https://oldmartijntje.github.io/outdated-oldmartijntje-website/StepTracker) to track your steps, And continue from a previous step.',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0023-locked.png'
        },
        unlockedData: {
            title: 'Timeliness go brr',
            description: 'You used the [step tracker](https://oldmartijntje.github.io/outdated-oldmartijntje-website/StepTracker) to track your steps, And continued from a previous step.',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0023-unlocked.png'
        },
        type: AchievementType.Achievement,
        localstorageUrl: 'easterEggs.StepTracker.branchess',
        unlocksWhenLocolStorageUrlIsSetTo: 5,
        hideOnMobile: false,
        difficulty: 5
    },
    {
        lockedData: {
            title: 'What else?',
            description: 'Refresh the [item display](https://oldmartijntje.github.io/outdated-oldmartijntje-website/ItemDisplay).',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0017-locked.png'
        },
        unlockedData: {
            title: 'What else?',
            description: 'You refreshed the [item display](https://oldmartijntje.github.io/outdated-oldmartijntje-website/ItemDisplay).',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0017-unlocked.png'
        },
        type: AchievementType.Achievement,
        localstorageUrl: 'easterEggs.ItemDisplay.refreeeshh',
        unlocksWhenLocolStorageUrlIsSetTo: true,
        hideOnMobile: false,
        difficulty: 1
    },
    {
        lockedData: {
            title: 'Blue screen of death',
            description: 'Visit the april fools 2024 [page](https://oldmartijntje.github.io/outdated-oldmartijntje-website/blueScreen).',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0019-locked.png'
        },
        unlockedData: {
            title: 'Blue screen of death',
            description: 'You visited the april fools 2024 [page](https://oldmartijntje.github.io/outdated-oldmartijntje-website/blueScreen).',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0019-unlocked.png'
        },
        type: AchievementType.Achievement,
        localstorageUrl: 'easterEggs.aprilfools.deathening',
        unlocksWhenLocolStorageUrlIsSetTo: true,
        hideOnMobile: false,
        difficulty: 2
    },
    {
        lockedData: {
            title: 'Blue screen of BORING',
            description: 'Wait till the % reaches 100% on the april fools 2024 [page](https://oldmartijntje.github.io/outdated-oldmartijntje-website/blueScreen).',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0019-locked.png'
        },
        unlockedData: {
            title: 'Blue screen of BORING',
            description: 'You waited till the % reached 100% on the april fools 2024 [page](https://oldmartijntje.github.io/outdated-oldmartijntje-website/blueScreen).',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0019-unlocked.png'
        },
        type: AchievementType.Achievement,
        localstorageUrl: 'easterEggs.aprilfools.deathening-pt2-electricBoogaloo',
        unlocksWhenLocolStorageUrlIsSetTo: true,
        hideOnMobile: false,
        difficulty: 5
    },
    {
        lockedData: {
            title: 'Blue screen of patience',
            description: 'Reach 420% :D',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0019-locked.png'
        },
        unlockedData: {
            title: 'Blue screen of patience',
            description: 'You waited till the % reached 420% on the april fools 2024 [page](https://oldmartijntje.github.io/outdated-oldmartijntje-website/blueScreen).',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0019-unlocked.png'
        },
        type: AchievementType.EasterEgg,
        localstorageUrl: 'easterEggs.aprilfools.deathening-pt3-theReckoning',
        unlocksWhenLocolStorageUrlIsSetTo: true,
        hideOnMobile: false,
        difficulty: 6
    },
    {
        lockedData: {
            title: 'Self destruction',
            description: "Unlock the hidden depths of control, where the orchestrator becomes the orchestrated.",
            show: true,
            icon: '../assets/icons/achievements/Sprite-0015-locked.png'
        },
        unlockedData: {
            title: 'Self destruction',
            description: 'Use Task Manager to close the Task Manager.',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0015-unlocked.png'
        },
        type: AchievementType.EasterEgg,
        localstorageUrl: 'easterEggs.windows.deleteTaskManager',
        unlocksWhenLocolStorageUrlIsSetTo: true,
        hideOnMobile: true,
        difficulty: 5
    },
    {
        lockedData: {
            title: 'Inspector Gadget',
            description: "Inspect a tile in [the map editor](https://oldmartijntje.github.io/outdated-oldmartijntje-website/MapEditor).",
            show: true,
            icon: '../assets/icons/achievements/Sprite-0018-locked.png'
        },
        unlockedData: {
            title: 'Inspector Gadget',
            description: 'You inspected a tile in [the map editor](https://oldmartijntje.github.io/outdated-oldmartijntje-website/MapEditor).',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0018-unlocked.png'
        },
        type: AchievementType.Achievement,
        localstorageUrl: 'easterEggs.mapEditor.inspecting',
        unlocksWhenLocolStorageUrlIsSetTo: true,
        hideOnMobile: false,
        difficulty: 3
    },
    {
        lockedData: {
            title: 'Magnifying-glass tilted Right.',
            description: "I can haz 2 buttnz?",
            show: true,
            icon: '../assets/icons/achievements/Sprite-0018-locked.png'
        },
        unlockedData: {
            title: 'Magnifying-glass tilted Right.',
            description: 'You inspected a tile in [the map editor](https://oldmartijntje.github.io/outdated-oldmartijntje-website/MapEditor), but with the right mouse button.',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0018-unlocked.png'
        },
        type: AchievementType.EasterEgg,
        localstorageUrl: 'easterEggs.mapEditor.inspecting2electricNotBoogaloo',
        unlocksWhenLocolStorageUrlIsSetTo: true,
        hideOnMobile: true,
        difficulty: 5
    },
    {
        lockedData: {
            title: 'Loss of control.',
            description: "7x5 art with just 0-1-2.\n\n[Map Editor](https://oldmartijntje.github.io/outdated-oldmartijntje-website/MapEditor).",
            show: true,
            icon: '../assets/icons/achievements/Sprite-0021-locked.png'
        },
        unlockedData: {
            title: 'Loss of control.',
            description: 'You have created the loss meme in [the map editor](https://oldmartijntje.github.io/outdated-oldmartijntje-website/MapEditor).\n\n7x5 art with just 0-1-2.',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0021-unlocked.png'
        },
        type: AchievementType.EasterEgg,
        localstorageUrl: 'easterEggs.mapEditor.loss',
        unlocksWhenLocolStorageUrlIsSetTo: true,
        hideOnMobile: false,
        difficulty: 8
    },
    {
        lockedData: {
            title: 'Mogus Art',
            description: "3x4 art with just 0-1.",
            show: true,
            icon: '../assets/icons/achievements/Sprite-0016-locked.png'
        },
        unlockedData: {
            title: 'Mogus Art',
            description: 'You have created the loss meme in [the map editor](https://oldmartijntje.github.io/outdated-oldmartijntje-website/MapEditor).\n\n3x4 art with just 0-1.',
            show: true,
            icon: '../assets/icons/achievements/Sprite-0016-unlocked.png'
        },
        type: AchievementType.EasterEgg,
        localstorageUrl: 'easterEggs.mapEditor.m-m-m-mogus',
        unlocksWhenLocolStorageUrlIsSetTo: true,
        hideOnMobile: false,
        difficulty: 7
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
    hideOnMobile: false,
    difficulty: 0
};