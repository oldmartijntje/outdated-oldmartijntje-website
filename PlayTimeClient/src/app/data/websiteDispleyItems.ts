import { itemDisplay } from "../models/randomDisplayHandler";

const fillIn: itemDisplay = {
    "url": "",
    "image": "",
    "title": "",
    "description": "",
    "bannerText": ""
}

const bannerTexts: string[] = [
    "Code",
    "Youtube Channel",
    "Website",
    "Profile",
    "Article",
    "VScode Extension",
    "Video",
    "Github Repository",
    "GIF",
    "Software",
    "Wallpaper Engine",
    "Youtube Video",
    "Discord Server",
    "Twitch",
    "Spotify",
    "Twitter",
    "Image",
    "Item",
    "Game"
]

export const randomWebsites: itemDisplay[] = [
    {
        "title": "CSS social buttons and icons",
        "url": "https://codepen.io/Stanssongs/pen/VwvrBR",
        "bannerText": "Code",
        "image": "https://shots.codepen.io/username/pen/VwvrBR-1280.webp?version=1494576680",
    },
    {
        "url": "https://www.youtube.com/@Nighthawk1973/videos",
        "image": "https://yt3.googleusercontent.com/l3Y2l7l_7PnoujAj_f1y09rfAVdTrvJxsdQY89RD6S9BK94Hl0N4hQvPjFBRADnUCy1yhUiJJyc=s900-c-k-c0x00ffffff-no-rj",
        "title": "Fanatic Hayday Player",
        "description": "A random Hayday youtube channel, which I find a bit funny.",
        "bannerText": "Youtube Channel",
    },
    {
        "url": "https://thisissand.com",
        "image": "https://thisissand.com/static/media/bannerScreen.90c0058e0fa44ce86287.png",
        "title": "This is Sand",
        "description": "A fun little website where you can make sand art.",
        "bannerText": "Website",
    },
    {
        "url": "https://oldmartijntje.nl/link?me=spotify",
        "image": "https://stats.fm/_next/image?url=https%3A%2F%2Fcdn.stats.fm%2Ffile%2Fstatsfm%2Fimages%2Fusers%2F7uatf47gcofdupwdxammpxliw%2Fc15df2d67ccfdf5eef5927054f6d830b.webp&w=256&q=75",
        "title": "My Spotify Stats",
        "description": "A website that tracks my Spotify listening habits.",
        "bannerText": "Profile",
        "myOwn": true,
    },
    {
        "url": "https://kitsunezero4.neocities.org/home",
        "image": "https://kitsunezero4.neocities.org/iotw/8.jpg",
        "title": "kitsunezero4",
        "description": "This is a random website I came across.",
        "bannerText": "Website"
    },
    {
        "url": "https://stanro.chat",
        "image": "https://stanro.chat/public/img/mii.png",
        "title": "Staninna's Website",
        "description": "The website of my friend Staninna.",
        "bannerText": "Website"
    },
    {
        "url": "https://mielesgames.nl/About",
        "image": "https://tr.rbxcdn.com/0390d946fe7b93c66736d26cd47295e7/352/352/Image/Png",
        "title": "Mielesgames Website",
        "description": "The website of my friend Mielesgames.",
        "bannerText": "Website"
    },
    {
        "url": "https://androdome.com/Sand/",
        "image": "https://androdome.com/Sand/img/fs.png",
        "title": "Falling Sand",
        "description": "Cool website about sand",
        "bannerText": "Website"
    },
    {
        "url": "https://tominhisroom.dev",
        "image": "https://noita.wiki.gg/images/3/3d/Item_kakke.png",
        "title": "Tomsom's Website",
        "description": "My friend Tomsom's website.",
        "bannerText": "Website"
    },
    {
        "url": "https://oldmartijntje.nl/link?me=youtube",
        "image": "https://i.imgur.com/nzuaJtS.png",
        "title": "My youtube channel",
        "description": "This youtube channel is now full of random shitposts, but I used to upload Minecraft videos on it.",
        "bannerText": "Youtube Channel",
        "myOwn": true,
    },
    {
        "url": "https://steamcommunity.com/sharedfiles/filedetails/?id=1427262525",
        "image": "https://steamuserimages-a.akamaihd.net/ugc/963090736881157985/91A71DA94B69A3AC6D9FFC1646ADA502F9D3198E/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
        "title": "A wallpaper",
        "description": "The first link my friend sent me on discord.",
        "bannerText": "Wallpaper Engine"
    },
    {
        "url": "https://en.wikipedia.org/wiki/Maze_generation_algorithm",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Graph_based_maze_animation.gif/220px-Graph_based_maze_animation.gif",
        "title": "Maze generation algorithm",
        "description": "An wikipedia article on maze generation algorithms.",
        "bannerText": "Article"
    },
    {
        "url": "https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare",
        "image": "https://ms-vsliveshare.gallerycdn.vsassets.io/extensions/ms-vsliveshare/vsliveshare/1.0.5905/1704997244604/Microsoft.VisualStudio.Services.Icons.Default",
        "title": "Live Share Extension",
        "description": "A VScode extension to live share your code.",
        "bannerText": "VScode Extension"
    },
    {
        "url": "https://codepen.io/0biwan/pen/ggVemP",
        "image": "https://shots.codepen.io/username/pen/ggVemP-320.webp?version=1487719905",
        "title": "Minecraft colored text generator",
        "description": "",
        "bannerText": "Code"
    },
    {
        "url": "https://www.youtube.com/watch?v=XSAGLJckRWM",
        "image": "https://yt3.ggpht.com/hib75A2V1CCLJX9OIr4eYS6Hnx7VM8XVkPLM_qc8Z87vqz76vyJgFfpD7Mn30BuxakqkH3Uv=s48-c-k-c0x00ffffff-no-nd-rj",
        "title": "NF - Story",
        "description": "A song by NF, which a friend sent me.",
        "bannerText": "Youtube Video"
    },
    {
        "url": "https://www.oracle.com/java/technologies/downloads/#java17",
        "image": "https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Java_programming_language_logo.svg/1200px-Java_programming_language_logo.svg.png",
        "title": "Java 17",
        "description": "JDK Development Kit 17.0.10 downloads",
        "bannerText": "Software"
    },
    {
        "url": "https://marketplace.visualstudio.com/items?itemName=tonybaloney.vscode-pets",
        "image": "https://tonybaloney.gallerycdn.vsassets.io/extensions/tonybaloney/vscode-pets/1.25.1/1699262059134/Microsoft.VisualStudio.Services.Icons.Default",
        "title": "vscode-pets",
        "description": "Pets for your VS Code",
        "bannerText": "VScode Extension"
    },
    {
        "url": "https://www.youtube.com/watch?v=JTVz2_TRhts",
        "image": "",
        "title": "Did you sleep with Mr. Wilson",
        "description": "Idk why lol.",
        "bannerText": "Youtube video"
    },
    {
        "url": "https://www.emojicode.org",
        "image": "https://i.imgur.com/G3qBQQL.png",
        "title": "Emojicode",
        "description": "Emojicode is an open-source, full- blown programming language consisting of emojis.",
        "bannerText": "Software"
    },
    {
        "url": "https://twitter.com/MokoJ2/status/1481816643261054981?t=nl32uNnL8xD51JADbe8owQ&s=09",
        "image": "https://pbs.twimg.com/profile_images/1329174696533897220/R_6EYv3f_normal.png",
        "title": "Twitter Post",
        "description": "First person walk to this peaceful place on #Townscaper\nMade with...",
        "bannerText": "Twitter"
    },
    {
        "url": "https://jukebox.davi.gq/jukebox_go.html?id=2pNMoqwpAGDmoLWnn3IaVV&thresh=2&bp=0,0,9",
        "image": "https://i.redd.it/o96ijbx4u3y41.jpg",
        "title": "Ethernal jukebox",
        "description": "Makes your song loop seamlessly.",
        "bannerText": "Website"
    },
    {
        "url": "https://cssgradient.io",
        "image": "",
        "title": "CSS Gradient Designer",
        "description": "",
        "bannerText": "Website"
    },
    {
        "url": "https://www.youtube.com/clip/Ugkx6pcUXl6Ai4vMuuGrbKbN59DwItBoKckt",
        "image": "https://i.imgur.com/ClAPIgC.png",
        "title": "✂️ SCAR WHAT",
        "description": "Hermitcraft S9 Episode 1: MEGA Start!",
        "bannerText": "Youtube Video"
    },
    {
        "url": "https://discord.com/invite/u77vRWY",
        "image": "https://i.imgur.com/r6w7Mqx.png",
        "title": "Yuzu",
        "description": "Nintendo switch Emulator.",
        "bannerText": "Discord Server"
    },
    {
        "url": "https://discord.gg/the-lounge",
        "image": "",
        "title": "The Lounge",
        "description": "",
        "bannerText": "Discord Server",
        "nsfw": true
    },
    {
        "url": "https://selectorgadget.com",
        "image": "https://selectorgadget.com/128x128.png",
        "title": "SelectorGadget:\npoint and click CSS selectors",
        "description": "",
        "bannerText": "Software"
    },
    {
        "url": "https://i.imgur.com/BtjZedW.jpg",
        "image": "https://i.imgur.com/BtjZedW.jpg",
        "title": "Indent Hadouken",
        "description": "",
        "bannerText": "Image"
    },
    {
        "url": "https://www.youtube.com/watch?v=sXotP-9LcDY",
        "image": "https://i.imgur.com/nqdabsz.png",
        "title": "Computer Scientists review the code for Yandere Simulator",
        "description": "",
        "bannerText": "Youtube Video"
    },
    {
        "url": "https://dimden.dev/",
        "image": "https://dimden.dev/images/dimden.gif",
        "title": "Dimden.dev",
        "description": "My inspiration for this website",
        "bannerText": "Website"
    },
    {
        "url": "https://www.youtube.com/watch?v=Ld2e7sYy1aw",
        "image": "https://i.imgur.com/5hmIP2z.png",
        "title": "Random Youtube Video",
        "description": "My friend sent me this video to show what he made.",
        "bannerText": "Youtube Video"
    },
    {
        "url": "https://fucktaalblokken.nl",
        "image": "https://i.imgur.com/KQhFhQp.png",
        "title": "fucktaalblokken.nl",
        "description": "FuckTaalblokken, a tool designed to review the answers of the online software Taalblokken.",
        "bannerText": "Website"
    },
    {
        "url": "https://open.spotify.com/track/4DLPciwUrfuSROgLUkmmsr?si=a95c544e1d2447fa",
        "image": "https://i.scdn.co/image/ab67616d00001e028c0c32e414af6871f9802c1b",
        "title": "Poffertjes Crackertjes",
        "description": "I don't know how my friend keeps finding these.",
        "bannerText": "Spotify"
    },
    {
        "url": "https://www.youtube.com/watch?v=z0hxb5UVaNE",
        "image": "https://i.imgur.com/ZRjNyCx.png",
        "title": "Math Proves God?",
        "description": "A friend setn me this, and I still haven't watched it after 3 reminders lol.",
        "bannerText": "Youtube Video"
    },
    {
        "url": "https://bijbel.pietr.space",
        "image": "https://i.imgur.com/l5JsypU.png",
        "title": "Bible Multiplayer",
        "description": "Read the bible together, the host scrolls everyones screen and you can see their pointer.",
        "bannerText": "Website"
    },
    {
        "url": "https://www.youtube.com/watch?v=xHR1niL_YAo",
        "image": "https://i.imgur.com/PNYjJHx.png",
        "title": "NEW SUPER MARIO GALAXY",
        "description": "",
        "bannerText": "Youtube Video"
    },
    {
        "url": "https://www.twitch.tv/tomsom999",
        "image": "https://static-cdn.jtvnw.net/jtv_user_pictures/1dfdc167-e0e1-445c-811c-c6ef875f461a-profile_image-70x70.png",
        "title": "tomsom999",
        "description": "My best friend his twitch account",
        "bannerText": "Twitch"
    },
    {
        "url": "https://open.spotify.com/track/2xeD5cEmoGPQNqS2uOjghg?si=f3f963b9954d41b4",
        "image": "https://i.scdn.co/image/ab67616d00001e02a4b2881669896b444d7d9dfc",
        "title": "Vies laminaat",
        "description": "Bart found this song lol.",
        "bannerText": "Spotify"
    },
    {
        "url": "https://tenor.com/view/gatto-cibo-cat-bread-hungry-cat-gif-15925702",
        "image": "https://i.imgur.com/1yRPPY4.png",
        "title": "Cat baguette",
        "description": "",
        "bannerText": "GIF"
    },
    {
        "url": "https://www.youtube.com/watch?v=xQnuGIsZyHE",
        "image": "https://i.imgur.com/LOu0xQw.png",
        "title": "Live met thomas",
        "description": "",
        "bannerText": "Youtube Video",
        "myOwn": true,
    },
    {
        "url": "https://va.media.tumblr.com/tumblr_s1zzgjzoa91u5zg7m.mp4",
        "image": "https://i.imgur.com/Zvgv5kt.png",
        "title": "Random video",
        "description": "Bloopin'",
        "bannerText": "Video"
    },
    {
        "url": "https://va.media.tumblr.com/tumblr_ntnj63gRvu1rpdptu.mp4",
        "image": "https://i.imgur.com/NffG1ta.png",
        "title": "Funny tumblr vid",
        "description": "new lambwuguinie",
        "bannerText": "Video"
    },
    {
        "url": "https://www.youtube.com/watch?v=wr2XvB95rV8",
        "image": "https://i.imgur.com/ob6f1wH.png",
        "title": "How to make a 5$ taser!",
        "description": "I think my friend is going to make this lol.",
        "bannerText": "Youtube Video"
    },
    {
        "url": "https://open.spotify.com/track/0iLhfT4AWAOUWjsbVgVy6J?si=c2ecdf245417423f",
        "image": "https://i.scdn.co/image/ab67616d00001e025f018ef5b73de9779ede9e05",
        "title": "Pjotr, Dit is je verjaardag",
        "description": "How does he keep finding these LOL?",
        "bannerText": "Spotify"
    },
    {
        "url": "https://oldmartijntje.nl/link?me=github",
        "image": "https://avatars.githubusercontent.com/u/64547812?v=4",
        "title": "My Github Profile",
        "description": "I mean, it's also linked literally everywhere else on this website lol.",
        "bannerText": "Profile",
        "myOwn": true,
    },
    {
        "url": "https://github.com/oldmartijntje/oldmartijntje.nl-client",
        "image": "../../assets/images/mii.png",
        "title": "oldmartijntje.nl",
        "description": "This websites github repository.",
        "bannerText": "Github Repository",
        "myOwn": true,
    },
    {
        "url": "https://github.com/oldmartijntje/CodeDungeon",
        "image": "https://github.com/oldmartijntje/CodeDungeon/raw/main/sprites/readme/game.png",
        "title": "CodeDungeon",
        "description": "A dungeon crawler you control by programming.",
        "bannerText": "Github Repository",
        "myOwn": true,
    },
    {
        "url": "https://github.com/oldmartijntje/Angular-Github-Pages-Scripts",
        "image": "",
        "title": "Angular-Github-Pages-Scripts",
        "description": "Scripts for hosting your angular on github pages + a tutorial on basic angular configurations / practices.",
        "bannerText": "Github Repository",
        "myOwn": true,
    },
    {
        "url": "https://oldmartijntje.nl/link?me=docs",
        "image": "https://i.imgur.com/TmlM3qN.png",
        "title": "Articles",
        "description": "My big library of knowledge, Digital Garden. Using the obsidian app to merge my markdowns into a big library.",
        "bannerText": "Github Repository",
        "myOwn": true,
    },
    {
        "url": "https://github.com/oldmartijntje/Pokemon-Vibranium",
        "image": "https://oldmartijntje.github.io/Project-Viewer/assets/images/appTextures/pokemonVibranium.png",
        "title": "Pokemon Vibranium",
        "description": "A medium-ish Pokemon fangame I made in RPG maker XP.",
        "bannerText": "Github Repository",
        "myOwn": true,
    },
    {
        "url": "https://github.com/oldmartijntje/Pokemon-Backrooms",
        "image": "https://oldmartijntje.github.io/Project-Viewer/assets/images/appTextures/pokemon-backrooms.png",
        "title": "Pokemon Backrooms",
        "description": "A small Pokemon fangame I made in RPG maker XP.",
        "bannerText": "Github Repository",
        "myOwn": true,
    },
    {
        "url": "https://oldmartijntje.github.io/Project-Viewer/page/1",
        "image": "https://oldmartijntje.github.io/Project-Viewer/assets/images/appTextures/viewer.png",
        "title": "Project-Viewer",
        "description": "Outdated website that I used to display my projects.",
        "bannerText": "Website",
        "myOwn": true,
    },
    {
        "url": "https://adventure-land.nl",
        "image": "https://oldmartijntje.github.io/Project-Viewer/assets/images/appTextures/adventureLand.png",
        "title": "adventure-land.nl",
        "description": "",
        "bannerText": "Website"
    },
    {
        "url": "https://melonking.net/melon?z=/thoughts/lets-make",
        "image": "https://melonking.net/images/window-grey.gif",
        "title": "MELONS4EVER",
        "description": "Lets make the World-Wide-Web!",
        "bannerText": "Website"
    },
    {
        "url": "https://huggingface.co/spaces/AP123/IllusionDiffusion",
        "image": "https://i.imgur.com/01SyZSl.png",
        "title": "IllusionDiffusion",
        "description": "Make AI art.",
        "bannerText": "Website"
    },
    {
        "url": "https://mikevanniel.nl/",
        "image": "",
        "title": "HBO Informatica",
        "description": "",
        "bannerText": "Website"
    },
    {
        "url": "https://drive.google.com/file/d/1rMdqRge2JKRFYBw5CMe3c9HXl5QuOtvr/view?pli=1",
        "image": "",
        "title": "A minecraft world download.",
        "description": "I think naturarium?",
        "bannerText": "File"
    },
    {
        "url": "https://mkpc.malahieude.net/mariokart.php",
        "image": "https://i.imgur.com/4RaIbH2.png",
        "title": "Mario Kart PC",
        "description": "Free online Mario Kart game",
        "bannerText": "Website"
    },
    {
        "url": "https://www.youtube.com/watch?v=V9gbXoKU5nY",
        "image": "https://i.imgur.com/gU6EUO0.png",
        "title": "Een boom die niet meer goed is",
        "description": "",
        "bannerText": "Youtube Video"
    },
    {
        "url": "https://twitter.com/mielesgames/status/1568668773489725440",
        "image": "https://pbs.twimg.com/profile_images/1555234124213981184/gUUQlgJ5_normal.png",
        "title": "Mielesgames posted: Are yall still...",
        "description": "",
        "bannerText": "Twitter"
    },
    {
        "url": "https://www.roblox.com/catalog/9342139339/Maid-Dress-Pink",
        "image": "https://tr.rbxcdn.com/f20b0b3e60a8aeb72818011a41e97b85/420/420/LayeredAccessory/Png",
        "title": "Maid Dress - Pink",
        "description": "",
        "bannerText": "Item"
    },
    {
        "url": "https://steamcommunity.com/sharedfiles/filedetails/?id=2101027521",
        "image": "https://steamuserimages-a.akamaihd.net/ugc/1028455403162871463/3E017721CEA26C448E0B1A3234D327FE6FA1C9E3/?imw=128&imh=128&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
        "title": "Portal 2 Console Commands",
        "description": "",
        "bannerText": "Item"
    },
    {
        "url": "https://i.imgur.com/3KtPKJn.png",
        "image": "https://i.imgur.com/3KtPKJn.png",
        "title": "Where is the download?",
        "description": "",
        "bannerText": "Image"
    },
    {
        "url": "https://twitter.com/KFC_ES/status/1604816567040200707?t=HbJJnSlq8avPFQtgeCUYVg&s=33",
        "image": "https://pbs.twimg.com/media/FkVaoOyWQAA9b4r?format=jpg&name=small",
        "title": "KFC_ES posted:",
        "description": "",
        "bannerText": "Twitter"
    },
    {
        "url": "https://open.spotify.com/track/0MBYW7CcBJmsY3HTP05VQg?si=1261d6f9a97e45c0",
        "image": "https://i.scdn.co/image/ab67616d00001e02804c1bb88d714079e12d80e1",
        "title": "Russians",
        "description": "I find this a good song.",
        "bannerText": "Spotify"
    },
    {
        "url": "https://store.steampowered.com/app/1121910/I_Love_You_Colonel_Sanders_A_Finger_Lickin_Good_Dating_Simulator/",
        "image": "https://cdn.cloudflare.steamstatic.com/steam/apps/1121910/header.jpg?t=1569326440",
        "title": "I Love You, Colonel Sanders!",
        "description": "A Finger Lickin' Good Dating Simulator.",
        "bannerText": "Website"
    },
    {
        "url": "https://emojicombos.com/cheese",
        "image": "",
        "title": "Cheese.",
        "description": "",
        "bannerText": "Website"
    },
    {
        "url": "https://store.steampowered.com/app/2263010/Pineapple_on_pizza/",
        "image": "https://cdn.cloudflare.steamstatic.com/steam/apps/2263010/header.jpg?t=1683199105",
        "title": "Pineapple on pizza",
        "description": "",
        "bannerText": "Website"
    },
    {
        "url": "https://i.imgur.com/lIqILRT.png",
        "image": "https://i.imgur.com/lIqILRT.png",
        "title": "A Bruce Banner.",
        "description": "",
        "bannerText": "Website"
    },
    {
        "url": "https://ipodtouch0218.itch.io/nsmb-mariovsluigi",
        "image": "https://img.itch.zone/aW1hZ2UvMTQ0NTgzMS84NDQxODY3LnBuZw==/347x500/CmotUR.png",
        "title": "nsmb-mariovsluigi",
        "description": "",
        "bannerText": "Website"
    },
    {
        "url": "https://youtu.be/WIRK_pGdIdA",
        "image": "https://i.ytimg.com/vi/WIRK_pGdIdA/sddefault.jpg?sqp=-oaymwEWCKoDEPABIAQqCghqEJQEGHgg6AJIWg&rs=AOn4CLAfipALpqdTqXg-I-X80-RGo8__4A",
        "title": "chip",
        "description": "",
        "bannerText": "Youtube Video"
    },
    {
        "url": "https://youtu.be/L2mPqitmJO0?si=i1cTO0KGc35H3glV",
        "image": "https://i.ytimg.com/vi/L2mPqitmJO0/hq720.jpg",
        "title": "I Launched His Scooter...",
        "description": "",
        "bannerText": "Youtube Video"
    },
    {
        "url": "https://youtu.be/xx8NZa4ptJA?si=aYiwFvuND5ItWaYq",
        "image": "https://i.ytimg.com/vi/xx8NZa4ptJA/hq720.jpg",
        "title": "How To Open a Door",
        "description": "",
        "bannerText": "Youtube Video"
    },
    {
        "url": "https://youtu.be/5WKJmsn627o?si=akt7K0Tz4JW2l7XA",
        "image": "https://i.ytimg.com/vi/5WKJmsn627o/hq720.jpg?sqp=-oaymwEXCNUGEOADIAQqCwjVARCqCBh4INgESFo&rs=AOn4CLBIbNQoAM-CkyvHal9vXH7V6LQDwA",
        "title": "Thwomp Volcano - Mario and Luigi Partners In Time (RuditheRaven Remix)",
        "description": "",
        "bannerText": "Youtube Video"
    },
    {
        "url": "https://youtu.be/6ipSzUiSuRc?si=Nj0qyDNOXFGtrYgF",
        "image": "https://i.ytimg.com/vi/6ipSzUiSuRc/hq720.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGGUgUShYMA8=&rs=AOn4CLAHveWaCb9VwHhHlG3yQCPva0UkDw",
        "title": "The sky is pink?",
        "description": "",
        "bannerText": "Youtube Video"
    },
    {
        "url": "https://youtu.be/n7cjod9lF2s?si=JwkWHC-ilDPlLf1T",
        "image": "https://i.ytimg.com/vi/n7cjod9lF2s/hq720.jpg",
        "title": "The Avoongers Movie Trailer",
        "description": "",
        "bannerText": "Youtube Video"
    },
    {
        "url": "https://www.youtube.com/watch?v=Rb1HSnuR8WE",
        "image": "https://i.ytimg.com/vi/Rb1HSnuR8WE/hqdefault.jpg?sqp=-oaymwEXCJADEOABSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDa4RRlSkWgPV2rbvR2HZRe0SJ_sQ",
        "title": "Family Guy Funny Spelling",
        "description": "",
        "bannerText": "Youtube Video"
    },
    {
        "url": "https://youtu.be/6Wd_uaE76xo",
        "image": "https://i.ytimg.com/vi/6Wd_uaE76xo/hq720.jpg?v=64343795",
        "title": "WIE VINDT DE MEESTE PAASEIEREN?! - GenietTV Paasspecial",
        "description": "",
        "bannerText": "Youtube Video"
    },
    {
        "url": "https://www.roblox.com/catalog/9341914167/Maid-Dress-Black",
        "image": "https://tr.rbxcdn.com/4f854d001a0ee619c8276763004d1fdb/420/420/LayeredAccessory/Png",
        "title": "Maid Dress -Black",
        "description": "",
        "bannerText": "Item"
    },
    {
        "url": "https://www.roblox.com/catalog/15973526615/El-Gato-Cat-Suit",
        "image": "https://tr.rbxcdn.com/4965d5ccc46bc22e1a328901a5f6a90d/420/420/LayeredAccessory/Png",
        "title": "El-Gato-Cat-Suit",
        "description": "",
        "bannerText": "Item"
    },
    {
        "url": "https://www.roblox.com/games/5509074977/Content-Deleted",
        "image": "https://tr.rbxcdn.com/ecbfc1d6bfee52031dd93f703800f2a5/352/352/Image/Png",
        "title": "Content Deleted",
        "description": "",
        "bannerText": "Game"
    },
    {
        "url": "https://www.roblox.com/games/6726392544/Sea-shells-sea-shells-on-the-sea-shore",
        "image": "https://tr.rbxcdn.com/e9398c44b891502f9f44ced825168664/352/352/Image/Png",
        "title": "Sea shells sea shells on the sea shore",
        "description": "",
        "bannerText": "Game"
    },
    {
        "url": "https://www.youtube.com/watch?v=Z6bBRljccvs",
        "image": "https://i.ytimg.com/vi/Z6bBRljccvs/hqdefault.jpg?sqp=-oaymwExCJADEOABSFryq4qpAyMIARUAAIhCGAHwAQH4AdQGgALgA4oCDAgAEAEYZSBlKGUwDw==&rs=AOn4CLBQaANxQrNlqNIXzvBXNwd8z4gCfw",
        "title": "10 reasons to join naturarium",
        "description": "You should mentally prepare yourself before watching this.",
        "bannerText": "Youtube Video"
    },
    {
        "url": "https://images-na.ssl-images-amazon.com/images/I/5127loKnNJL._AC_SL1200_.jpg",
        "image": "https://images-na.ssl-images-amazon.com/images/I/5127loKnNJL._AC_SL1200_.jpg",
        "title": "Cable.",
        "description": "",
        "bannerText": "Image"
    },
    {
        "url": "https://www.boredbutton.com",
        "image": "https://www.boredbutton.com/i/bored-button-logo-300-min.png",
        "title": "boredbutton",
        "description": "Click it.",
        "bannerText": "Website"
    },
    {
        "url": "https://www.buienradar.nl",
        "image": "https://cdn.buienradar.nl/resources/svg/motregen.svg",
        "title": "buienradar",
        "description": "Het regent met een klein beetje kaas.",
        "bannerText": "Website"
    },
    {
        "url": "https://neal.fun/password-game/",
        "image": "https://i.imgur.com/MWaXvXr.png",
        "title": "Password game",
        "description": "Make the perfect password.",
        "bannerText": "Website"
    },
    {
        "url": "https://simpelsubsidie.nl",
        "image": "https://simpelsubsidie.nl/assets/images/simpel-subsidie-klein.png",
        "title": "simpelsubsidie",
        "description": "Brrrrrrrrrr",
        "bannerText": "Website"
    },
    {
        "url": "https://eelslap.com",
        "image": "https://i.imgur.com/Hxon5tV.png",
        "title": "",
        "description": "Most important website ever!",
        "bannerText": "Website"
    },
    {
        "url": "http://www.20q.net",
        "image": "http://www.20q.net/gfx/ktclfrb.gif",
        "title": "20q.net",
        "description": "idk what this is.",
        "bannerText": "Website"
    },
    {
        "url": "https://scp-wiki.wikidot.com",
        "image": "https://scp-wiki.wdfiles.com/local--files/main/logo_250.png",
        "title": "SCP Foundation",
        "description": "Secure, Contain, Protect",
        "bannerText": "Website"
    },
    {
        "url": "https://depomp.com",
        "image": "https://depompalmkerk.nl/img/galerijfotos/IMG_7002-1-860x573.webp",
        "title": "De Pomp",
        "description": "A youth group in Almkerk, The Netherlands",
        "bannerText": "Website"
    },
    {
        "url": "https://www.scp.nl",
        "image": "https://www.scp.nl/binaries/content/gallery/scp/channel-afbeeldingen/logo_scp.svg",
        "title": "Dutch SCP",
        "description": "Or something, IDK.",
        "bannerText": "Website"
    },
    {
        "url": "https://radio.garden/listen/spinning-seal-fm/d7RMpZjk",
        "image": "https://i.imgur.com/DoHG3LO.png",
        "title": "Radio Garden",
        "description": "Listen to Radio FM, You can select by geographic location.",
        "bannerText": "Website"
    },
    {
        "url": "https://www.urbandictionary.com/define.php?term=Copium",
        "image": "https://i.imgur.com/DD7StZ3.png",
        "title": "Copium",
        "description": "",
        "bannerText": "Article"
    },
    {
        "url": "https://www.youtube.com/watch?v=PnGpEJGFJ3w",
        "image": "https://i.ytimg.com/vi/PnGpEJGFJ3w/hq720.jpg",
        "title": "I Would Pay $999 - PARODY SONG",
        "description": ":D",
        "bannerText": "Youtube Video"
    },
    {
        "url": "https://www.youtube.com/watch?v=SLYXE9T8v6U",
        "image": "https://i.ytimg.com/vi/SLYXE9T8v6U/sddefault.jpg?sqp=-oaymwEWCKoDEPABIAQqCghqEJQEGHgg6AJIWg&rs=AOn4CLB8Hdqo5OJdMee1d7iE5OgwYSJpxg",
        "title": "Music Of Memes: Ultimate Edition",
        "description": "So that's where it came from lol.",
        "bannerText": "Youtube Video"
    },
    {
        "url": "https://www.youtube.com/watch?v=g2xXw7h12hE",
        "image": "https://i.ytimg.com/vi/g2xXw7h12hE/hq720.jpg?sqp=-oaymwEXCNUGEOADIAQqCwjVARCqCBh4INgESFo&rs=AOn4CLCawmkjXInmA2352sJOAxvL7Zf9YA",
        "title": "Het Regenbooglied gezongen door groep 8a",
        "description": "The good old days lmao",
        "bannerText": "Youtube Video"
    },
    {
        "url": "https://modrinth.com/datapack/rogue-craft",
        "image": "https://cdn.modrinth.com/data/HtKjVijx/2d8f731c49c3cfbea97b757c9bf6c3c7b71fcd3a.png",
        "title": "Roguecraft",
        "description": "I enjoy it like this.",
        "bannerText": "Item"
    },
    {
        "url": "https://www.urbandictionary.com/define.php?term=Meow",
        "image": "https://i.imgur.com/DD7StZ3.png",
        "title": "Meow",
        "description": "",
        "bannerText": "Article"
    },
    {
        "url": "https://i.imgur.com/TAjRVWP.png",
        "image": "https://i.imgur.com/TAjRVWP.png",
        "title": "Snel vliegen.",
        "description": "",
        "bannerText": "Image"
    },

    {
        "url": "https://onlywonder.net/home",
        "image": "https://onlywonder.net/images/icon.png",
        "title": "Only Wonder",
        "description": "",
        "bannerText": "Website"
    },
    {
        "url": "https://www.roblox.com/games/14005956124/PROVE-DAD-WRONG-BY-SELLING-ROCKS-TYCOON",
        "image": "https://tr.rbxcdn.com/8af001308db9e1627d8c64325c05f7c9/768/432/Image/Png",
        "title": "PROVE DAD WRONG BY SELLING ROCKS TYCOON",
        "description": "",
        "bannerText": "Game"
    },
    {
        "url": "https://www.reddit.com/r/PhoenixSC/comments/16d32d4/new_captcha_unlocked/?utm_source=share&utm_medium=web2x&context=3",
        "image": "https://preview.redd.it/new-captcha-unlocked-v0-5lvqd07p9zmb1.jpg?width=640&crop=smart&auto=webp&s=1d0ec9d290af6484a17de8a61ef376428f55ef54",
        "title": "New CAPTCHA unlocked",
        "description": "",
        "bannerText": "Image"
    },
    {
        "url": "https://franticfanfic.com",
        "image": "data:image/gif;base64,R0lGODlhXABAAPcAAP///wEAAQcGBwYDCAsCCwUKCwoLDA4QDg0HERQCFBsCHBYIGAYWFw0TExITFBkVHBMbGxscHSEAHx4EIQ8aIBoXIiQDJCcHKCoDKyUZKS0JMDMENTsFPTUJODsKPSkaNzUXNwQmJQgqKxolJxQvNwc3NyIjIyUqKikqKiorMTYqOSo0NTc5OkEFPxVAPj4JQT4QRCQkQDs9QUEMREgISkcYSU4MUVILVFgNXEsUVFUUWEowTUo2VF4MYVsVYmQOZ2YUangPfG4Tc3YVe1gsbWMkanMsexZHTRJPUTNITSNVWDRUcRhmZxF3eCVjZi9ud0JEREZKSkpLS0tOVVNJVFNUVltYXFFLbV5aY25Nc0tqb2dpamxncG1vcHFtdHZ3en2Af30UgXgqhR93hHFNkFdhkXVwi3Nxq4UYiowbk5UamoQoio4ilZYnnIk3kpYznJ0Yo6YXqp0npos5oaUoq6Msq6UyrKwptbQpu6w2tLMyvIxOlIR6h45ok5VBqK1Ms41vuKxztLglwL0uy7o3xLwxy8gZzMU5zc0w18k4084o4No35uU77rFOxr5Wypl6x7BuybZzxLlzw8REzMFQxMlF1dJG3MlY19Na3MFixcZlystv0tZ22thK5dtY5txa5N9Q8OJa6+dH+etR9elY99xm59t05tt64eNk6+F47uho9exk/PNg//Jt/ut3+PF0/vJ6/vp9/xqEhhqQkiKDhjCNlTubpi6qrjilpii2uk6MlXyEg3eYnEaTqm+UqUmssE2vtGmttWyvy2av2RzX2TTOzjTh6EXHy0nLy1fHylLL0kjZ2VjW2HPN0mfZ3E7c7nTe6lPl5G/s7oWGh5SElpSLlpKQlZqNp7mft4+vtqqosJuZ3a6LyY2swrSw6MyS09Ks19yK8OqI9/KE/vSM/+SQ8faV//Sc/tuq/Omn/PSn/fq5/5LNz5DO8bPS+JD3+KXy/bf+/s/t/e7//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUAAAAAIf4nR0lGIHJlc2l6ZWQgb24gaHR0cHM6Ly9lemdpZi5jb20vcmVzaXplACH/C3htcCBkYXRheG1w/z94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+PHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3Lncub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJmOmFib3V0PSIiIP94bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjE4QTM1QzFGNEU1NTExRUI4MTNDQUI3REQyMjMxREVGIiB4bXBNOkluc3RhbmNlSUQ9InhtcC5paWQ6MThBMzVDMUU0RTU1MTFFQjgxM0NBQjf/REQyMjMxREVGIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2IgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmRpZDo1RTQ3Rjc1RDUzNEVFQjExQTI1Q0E4M0ZDNTM4OUFFIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjVFNDdGNzVENTM0RUVCMTFBMjVDQTgzRjUzODk2QUUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQi/3IiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxL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",
        "title": "Frantic Fanfic",
        "description": "",
        "bannerText": "Website"
    },
    {
        "url": "https://docs.google.com/forms/d/e/1FAIpQLScvbQ_8joTS1vWbMrYnFuJRF_IRhsV_SvI0FMRxy1P0x8cU8Q/viewform",
        "image": "https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_dark_clr_74x24px.svg",
        "title": "Ban appeal form",
        "description": "",
        "bannerText": "Website"
    },
    {
        "url": "https://landover.io/game/home",
        "image": "https://i.imgur.com/lObquNA.png",
        "title": "Landover.io",
        "description": "Kinda like Catan, but free and online.",
        "bannerText": "Website"
    },
    {
        "url": "https://open.spotify.com/track/4NT9BkHuvYpzjtLy66l7Rg?si=e14a2757abb949f6",
        "image": "https://i.scdn.co/image/ab67616d00001e0279d9db7eb388ca4b29fc6559",
        "title": "Bop",
        "description": "It is a bop.",
        "bannerText": "Spotify"
    },
    {
        "url": "https://open.spotify.com/track/3mzRTOxA53fXidsDtPX0UF?si=eae16471dd8640b0",
        "image": "https://i.scdn.co/image/ab67616d00001e02428c4cfdcb0db673c15d0d18",
        "title": "Objection Hearsay",
        "description": "Song about the case of Jonny Depp vs Amber Heard.",
        "bannerText": "Spotify"
    },
    {
        "url": "https://www.roblox.com/games/8110845141/VC-POOP-WITH-FRIENDS",
        "image": "https://tr.rbxcdn.com/1837d52ea3170c9cdfdff795cafe8240/150/150/Image/Jpeg",
        "title": "VC POOP WITH FRIENDS",
        "description": "Yes",
        "bannerText": "Game"
    },
    {
        "url": "https://www.roblox.com/games/9743079991/NEW-EMOTES-wonderhoy-simulator",
        "image": "https://tr.rbxcdn.com/0216b672fef1aea3057c8e08ca023b02/768/432/Image/Png",
        "title": "wonderhoy simulator",
        "description": "I don't even know.",
        "bannerText": "Game"
    },
    {
        "url": "https://store.steampowered.com/app/1468160/Cube_Racer_2/",
        "image": "https://cdn.cloudflare.steamstatic.com/steam/apps/1468160/header.jpg?t=1646853060",
        "title": "Cube Racer 2",
        "description": "Ultimate Chicken horse but 3D and with cubes.",
        "bannerText": "Game"
    },
    {
        "url": "https://i.imgur.com/glgas5Z.png",
        "image": "https://i.imgur.com/glgas5Z.png",
        "title": "Glamrock Freddy.",
        "description": "You know what you gotta do.",
        "bannerText": "Image"
    },
    {
        "url": "https://www.youtube.com/watch?v=7IOOwSwwoM8",
        "image": "https://i.ytimg.com/vi/7IOOwSwwoM8/hq720.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGFMgZChlMA8=&rs=AOn4CLAYqKZxZH6bBHaei_5Pw3rFznX7wQ",
        "title": "You lovely you ZEST AMV",
        "description": "I reposted this, don't know why. It was originally a wallpaper on wallpaper engine.",
        "bannerText": "Youtube Video",
        "nsfw": true
    },
    {
        "url": "https://www.youtube.com/watch?v=kgCST5We3YE",
        "image": "https://i.ytimg.com/vi/kgCST5We3YE/hq720.jpg?sqp=-oaymwEXCNUGEOADIAQqCwjVARCqCBh4INgESFo&rs=AOn4CLAoPCAcII0g4-ds2EMEI9Thbpixrg",
        "title": "Idols(By Suppy)",
        "description": "It's been a while since I have listened to this.",
        "bannerText": "Youtube Video"
    },
    {
        "url": "https://jesusisgod.tv",
        "image": "https://jesusisgod.tv/wp-content/uploads/2019/08/JESUSisGODcube150clockwise.gif",
        "title": "jesusisgod.tv",
        "description": "I don't disagree with this website, but it's a bit much.",
        "bannerText": "Website"
    },
    {
        "url": "https://www.youtube.com/watch?v=iQsalE_SzCg",
        "image": "https://i.ytimg.com/vi/iQsalE_SzCg/hqdefault.jpg?sqp=-oaymwEXCJADEOABSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBqV5ZFoDUmkZ9LOI6K9WvhqyD1fw",
        "title": "CRUSH CRUSH - 100% Walkthrough No Commentary - PART 14: Ending [PC MAX Settings]",
        "description": "Ehhhhhh",
        "bannerText": "Youtube Video",
        "nsfw": true
    },
    {
        "url": "https://youtu.be/dr5vOtcoHSk",
        "image": "https://i.ytimg.com/vi/dr5vOtcoHSk/hq720.jpg",
        "title": "BOSCH PSB 18LT-2 Triple Bag",
        "description": "Most important video ever.",
        "bannerText": "Youtube Video"
    },
    {
        "url": "https://youtu.be/BwAMltY3-c0",
        "image": "https://i.ytimg.com/vi/BwAMltY3-c0/hq720.jpg",
        "title": "Making Fun Of Youtuber's Intros.",
        "description": "Baby Mrbeast go brrr. (he cringe now)",
        "bannerText": "Youtube Video"
    },
    {
        "url": "https://youtu.be/2vAo48hdO-4",
        "image": "https://i.ytimg.com/vi/2vAo48hdO-4/hq720.jpg",
        "title": "POV: You're Potato in my potato farm",
        "description": "AI, help me suggest a description: \"I don't know what to put here.\"",
        "bannerText": "Youtube Video"
    },
    {
        "url": "https://www.reddit.com/r/ProgrammerHumor/comments/19bgvsv/whatiseeaftertwodayscodingwithoutanybreak/",
        "image": "https://preview.redd.it/whatiseeaftertwodayscodingwithoutanybreak-v0-6pim9o6qqmdc1.jpeg?width=640&crop=smart&auto=webp&s=f4e5da93dfa0b1921d01224df096ec9cd16286a8",
        "title": "whatiseeaftertwodayscodingwithoutanybreak",
        "description": "AppliedTooMuchMargin",
        "bannerText": "Image"
    },
    {
        "url": "https://www.reddit.com/r/ProgrammerHumor/comments/19aj1af/imadethis/",
        "image": "https://preview.redd.it/hxanodkreedc1.png?width=640&crop=smart&auto=webp&s=abf6175e3f4160704748fd6051728bc133b80622",
        "title": "imadethis",
        "description": "Circle of life.",
        "bannerText": "Image"
    },
    {
        "url": "https://www.reddit.com/r/ProgrammerHumor/comments/199oxwo/shoulditrywithdoublelick/",
        "image": "https://preview.redd.it/shoulditrywithdoublelick-v0-y3j3c06sx6dc1.png?width=640&crop=smart&auto=webp&s=d64a20178f9774c8cd9fa507954c1223f6c4ed38",
        "title": "shoulditrywithdoublelick",
        "description": "Tasty",
        "bannerText": "Image"
    },
    {
        "url": "https://www.reddit.com/r/ProgrammerHumor/comments/199v7ii/thewondersofgit/",
        "image": "https://preview.redd.it/thewondersofgit-v0-wpveiv5ue8dc1.png?width=640&crop=smart&auto=webp&s=3488365e427f8032d0cdd3f989cd95d631361b59",
        "title": "thewondersofgit",
        "description": "Classy",
        "bannerText": "Image"
    },
    {
        "url": "https://www.reddit.com/r/ProgrammerHumor/comments/199q0ya/cluelessjavascript/",
        "image": "https://preview.redd.it/etp1i8ta97dc1.jpeg?blur=40&format=pjpg&auto=webp&s=8fa90df0219546f2078c7bd12cca82e1c140c8b9",
        "title": "cluelessjavascript",
        "description": "Javascript is weird man.",
        "bannerText": "Image"
    },
    {
        "url": "https://www.awesomecd.com.tw/UPLOAD/UserFiles/images/校前路匝道.jpg",
        "image": "https://www.awesomecd.com.tw/UPLOAD/UserFiles/images/校前路匝道.jpg",
        "title": "校前路匝道.jpg",
        "description": "",
        "bannerText": "Image"
    },
    {
        "url": "https://www.exploit-db.com/google-hacking-database",
        "image": "https://www.exploit-db.com/images/edb-logo.png",
        "title": "Google Hacking Database",
        "description": "Webcams go brrr.",
        "bannerText": "Website"
    },
    {
        "url": "http://109.233.191.228:8090/multi.html",
        "image": "https://i.imgur.com/6jbP1TD.png",
        "title": "WEBCAMXP 5 Streetviews",
        "description": "",
        "bannerText": "Website"
    },
    {
        "url": "http://216.137.193.126:8083/home.html",
        "image": "https://i.imgur.com/6jbP1TD.png",
        "title": "WEBCAMXP 5 Bird Feeder",
        "description": "",
        "bannerText": "Website"
    },
    {
        "url": "http://86.82.237.217:7272/home.html",
        "image": "https://i.imgur.com/6jbP1TD.png",
        "title": "WEBCAMXP 5 park or forest?",
        "description": "google dorks go brrr",
        "bannerText": "Website"
    },
    {
        "url": "https://www.cs.cmu.edu/~yhchu/Photos/DCIM/100CASIO/CIMG0014.JPG",
        "image": "https://www.cs.cmu.edu/~yhchu/Photos/DCIM/100CASIO/CIMG0014.JPG",
        "title": "CIMG0014.JPG",
        "description": "Frog.",
        "bannerText": "Image"
    },
    {
        "url": "http://uhi.geo.u-szeged.hu/~zeno/pics/DCIM/100APPLE/IMG_0323.JPG",
        "image": "http://uhi.geo.u-szeged.hu/~zeno/pics/DCIM/100APPLE/IMG_0323.JPG",
        "title": "IMG_0323.JPG",
        "description": "This looks suspicous.",
        "bannerText": "Image"
    },
    {
        "url": "https://codepen.io/Hyperplexed",
        "image": "https://i.imgur.com/tCEFkcD.png",
        "title": "Hyperplexed on Codepen",
        "description": "Good css effects",
        "bannerText": "Profile"
    },
    {
        "url": "https://checkboxrace.com/",
        "image": "https://i.imgur.com/d7zwi10.png",
        "title": "checkbox race",
        "description": "gotta go fast.",
        "bannerText": "Website"
    },
    {
        "url": "https://maninthedark.com/",
        "image": "https://i.imgur.com/YxHCVSW.png",
        "title": "man in the dark",
        "description": "",
        "bannerText": "Website"
    },
    {
        "url": "https://rotatingsandwiches.com/",
        "image": "https://i0.wp.com/rotatingsandwiches.com/wp-content/uploads/2023/04/bub-and-pops-italian-hoagie.gif?resize=480%2C270&ssl=1",
        "title": "rotatingsandwiches",
        "description": "spinny sandwich",
        "bannerText": "Website"
    },
    {
        "url": "https://ihasabucket.com/",
        "image": "https://ihasabucket.com/images/walrus_bucket.jpg",
        "title": "i has a bucket",
        "description": "my favorite website.",
        "bannerText": "Website"
    },
    {
        "url": "https://potatoortomato.com/",
        "image": "https://potatoortomato.com/images/potato.svg",
        "title": "",
        "description": "is it a potato or a tomato?",
        "bannerText": "Website"
    },
    {
        "url": "http://www.ismycomputeron.com/",
        "image": "",
        "title": "ismycomputeron",
        "description": "it's going to suprise you.",
        "bannerText": "Website"
    },
    {
        "url": "https://trello.com/b/Ebm2tHr5/oldmartijntjenl",
        "image": "https://i.imgur.com/mS2DTLI.png",
        "title": "Trello board.",
        "description": "It's the trello board I use for this website. (Outdated now.)",
        "bannerText": "Website",
        "myOwn": true
    },
    {
        "url": "https://puginarug.com/",
        "image": "https://puginarug.com/assets/pug.png",
        "title": "puginarug",
        "description": "its a pug in a rug",
        "bannerText": "Website"
    },
    {
        "url": "https://pointerpointer.com/",
        "image": "https://pointerpointer.com/images/615.jpg",
        "title": "pointerpointer",
        "description": "for if you don't know where your pointer is.",
        "bannerText": "Website"
    },
    {
        "url": "https://heeeeeeeey.com/",
        "image": "",
        "title": "heeeeeeeey",
        "description": "",
        "bannerText": "Website"
    },
    {
        "url": "https://binarypiano.com/",
        "image": "",
        "title": "binary piano",
        "description": "this was too loud for my liking.",
        "bannerText": "Website"
    },
    {
        "url": "https://open.spotify.com/track/1zPWTZRStEg3Vye5HtagV5?si=c30f197d214446f6",
        "image": "https://i.scdn.co/image/ab67616d00001e02f3a53da972a0e0693756ba14",
        "title": "Big chungus",
        "description": "",
        "bannerText": "Spotify"
    },
    {
        "url": "https://open.spotify.com/track/4FCiImxB9hnmyFWgcZJV2S?si=bVOqMmr_TmSuQuar2dHMAA",
        "image": "https://i.scdn.co/image/ab67616d00001e02e3da34ddbe0995171b6b52f5",
        "title": "Opblaasbare Afwasbare Barbara.",
        "description": "",
        "bannerText": "Spotify"
    },
    {
        "url": "https://www.reddit.com/r/ProgrammerHumor/comments/19f0xuo/feint/?share_id=ygti7JF3x20bHqLndyodT&utm_content=1&utm_medium=android_app&utm_name=androidcss&utm_source=share&utm_term=3",
        "image": "https://i.redd.it/v1e0hopokiec1.jpeg",
        "title": "feint",
        "description": "it do be like that. :<",
        "bannerText": "Image"
    },
    {
        "url": "https://www.youtube.com/watch?v=EShUeudtaFg",
        "image": "https://i.ytimg.com/vi/EShUeudtaFg/hqdefault.jpg?sqp=-oaymwEXCJADEOABSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAAeKtvx8ijpeGHTRzpvqH16QLtQQ",
        "title": "how is prangent formed",
        "description": "Yes, spelling...",
        "bannerText": "Youtube Video"
    },
    {
        "url": "https://neal.fun/infinite-craft/",
        "image": "https://i.imgur.com/rXv0Dg5.png",
        "title": "Infinite Craft",
        "description": "Craft me :3",
        "bannerText": "Website"
    },
    {
        "url": "https://purring.co/",
        "image": "https://i.imgur.com/ajV3ohA.png",
        "title": "Neat website :3",
        "description": "",
        "bannerText": "Website"
    },
    {
        "url": "https://steamcommunity.com/sharedfiles/filedetails/?id=2863816963",
        "image": "https://i.imgur.com/E4Lpmik.png",
        "title": "galaxy",
        "description": "its a background thingy that i made. (kinda)",
        "bannerText": "Item"
    },
    {
        "url": "https://steamcommunity.com/sharedfiles/filedetails/?id=1129194457",
        "image": "https://i.imgur.com/LfESKts.png",
        "title": "Matrix Randomizer",
        "description": "its a background thingy.",
        "bannerText": "Item"
    },
    {
        "url": "https://steamcommunity.com/sharedfiles/filedetails/?id=3025013651",
        "image": "https://i.imgur.com/Kj1ho1P.png",
        "title": "Programmer Clock",
        "description": "its a background thingy.",
        "bannerText": "Item"
    },
    {
        "url": "https://youtu.be/-SHTeywlEEI",
        "image": "https://i.ytimg.com/vi/-SHTeywlEEI/hq720.jpg",
        "title": "How Brutal was Papa Smurf's Communist Revolution?",
        "description": "",
        "bannerText": "Youtube Video"
    },
    {
        "url": "https://pianoverse.net/",
        "image": "https://i.imgur.com/TCJk4kQ.png",
        "title": "Multiplayer piano?",
        "description": "",
        "bannerText": "Website"
    },
    {
        "url": "https://nekoweb.org/",
        "image": "https://nekoweb.org/assets/banners/banner2.png",
        "title": "Nekoweb",
        "description": "Easy hosting",
        "bannerText": "Website"
    },
    {
        "url": "https://discord.gg/hvfHKyVS6b",
        "image": "https://nekoweb.org/assets/banners/banner1.png",
        "title": "Nekoweb discord",
        "description": "",
        "bannerText": "Website"
    },
    {
        "url": "https://publish.obsidian.md/hub/00+-+Start+here",
        "image": "https://publish-01.obsidian.md/access/e25082da1bfe16d54e36618cd5bfee68/logo.svg",
        "title": "Obsidian hub",
        "description": "plugins go brrrr",
        "bannerText": "Website"
    },
    {
        "url": "https://johnnydecimal.com/",
        "image": "https://johnnydecimal.com/img/_new/11.01.07-susans-tidy-files-700x900.png",
        "title": "Johnny Decimal",
        "description": "a way to order your life.",
        "bannerText": "Website"
    },
    {
        "url": "https://app.nos.nl/op3/stresstest-voor-je-adres/",
        "image": "https://i.imgur.com/HE5wWm7.png",
        "title": "Stresstest",
        "description": "Is je huis nog droog in 2050?",
        "bannerText": "Website"
    },
    {
        "url": "https://i.imgur.com/LevkKUe.png",
        "image": "https://i.imgur.com/LevkKUe.png",
        "title": "LevkKUe.png",
        "description": ":)",
        "bannerText": "Image"
    },
    {
        "url": "https://i.imgur.com/yvohibc.png",
        "image": "https://i.imgur.com/yvohibc.png",
        "title": "yvohibc.png",
        "description": "Pika",
        "bannerText": "Image"
    },
    {
        "url": "https://store.steampowered.com/app/2021910/FPS_Chess/",
        "image": "https://cdn.cloudflare.steamstatic.com/steam/apps/2021910/header.jpg?t=1670241965",
        "title": "FPS Chess",
        "description": "Google 'An passant'",
        "bannerText": "Game"
    },
    {
        "url": "https://store.steampowered.com/app/2138700/Crypt/",
        "image": "https://cdn.cloudflare.steamstatic.com/steam/apps/2138700/header.jpg?t=1664309237",
        "title": "Crypt",
        "description": "REEEEEEEEEEEEE",
        "bannerText": "Game"
    },
    {
        "url": "https://reliccastle.com/resources/1404/",
        "image": "https://reliccastle.com/data/resource_icons/1/1404.jpg?1696674230",
        "title": "Arcky's Region Map",
        "description": "Your own Pokemon game go brrr",
        "bannerText": "Website"
    },
    {
        "url": "https://www.thisman.org",
        "image": "https://i0.wp.com/www.thisman.org/wp-content/uploads/2023/02/thisman_small.jpg?fit=200%2C235&ssl=1",
        "title": "This man",
        "description": "Have you seen him?",
        "bannerText": "Website"
    },
    {
        "url": "",
        "image": "",
        "title": "",
        "description": "",
        "bannerText": ""
    }
]