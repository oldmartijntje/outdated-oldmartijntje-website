export interface Game {
    id: string;
    name: string;
    imageUrl: string;
    nav: string;
}

export const games: Game[] = [
    {
        id: 'home',
        name: 'My WindowsXP Homepage',
        imageUrl: 'https://i.imgur.com/AleDHLn.png',
        nav: '/Home'
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