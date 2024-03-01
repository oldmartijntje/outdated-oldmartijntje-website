import { Game, GameSettingTypeBoolean } from "../models/homescreenItems.interface"

export const games: Game[] = [
    {
        id: 'windowsXPHomepage',
        name: 'My WindowsXP Homepage',
        imageUrl: 'https://i.imgur.com/AleDHLn.png',
        nav: '/windows',
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
            text: "I crafted a Windows XP desktop using Angular, featuring both mobile and PC modes. In the PC mode, users can interact with a desktop environment complete with movable icons and runnable applications. The 'Page Explorer' application, reminiscent of the classic Internet Explorer, allows users to navigate through various webpages on my website. On the other hand, the mobile mode focuses solely on the 'Page Explorer,' offering a nostalgic look and feel of the old Internet Explorer.",
            demoUrl: '/windows',
            keywords: ['Angular', 'HTML/CSS', 'TypeScript', 'Windows XP', 'Mobile Compatible'],
            developers: ['OldMartijntje'],
            githubRepo: 'https://github.com/oldmartijntje/oldmartijntje.nl-client',
            images: ['https://i.imgur.com/SMEPpAm.png', 'https://i.imgur.com/JtGbQOz.png', 'https://i.imgur.com/7KAJa8r.png', 'https://i.imgur.com/Bg26JOT.png', 'https://i.imgur.com/BTYW2Xe.png']
        },
    },
    {
        id: 'chat',
        name: 'My Chat',
        imageUrl: 'https://i.imgur.com/YImBBrS.png',
        nav: '/Chat',
        info: {
            text: "I created a chat website using Angular for the front end and a PHP backend. The chat application is designed to be straightforward, allowing users to engage in conversations effortlessly. The interface includes emoji selection for expressive communication. Each user is assigned a unique identifier, ensuring its permanence. Additionally, users have the flexibility to personalize their experience by changing their nicknames.",
            demoUrl: 'Chat',
            keywords: ['Angular', 'HTML/CSS', 'TypeScript', 'PHP', 'Chat Application', 'Mobile Compatible'],
            developers: ['OldMartijntje'],
            images: ['https://i.imgur.com/136uArv.png', 'https://i.imgur.com/VitBK81.png', 'https://i.imgur.com/tbcfuxj.png', 'https://i.imgur.com/Epoei2o.png']
        }
    },
    {
        id: 'explorer',
        name: 'Explorer of the internet',
        imageUrl: 'https://i.imgur.com/O20GeaF.png',
        nav: '/ItemDisplay',
        info: {
            text: "I created a dynamic webpage using Angular that allows users to explore a curated collection of 146 handpicked websites. Each website is accompanied by a small banner indicating its type, such as 'Youtube Video,' 'Website,' 'Github Repository,' or 'Game.' The page loads 8 random websites at a time, with a refresh button for exploration variety. Every website has a title, description, and a thumbnail (or a 404 image). Clicking on the thumbnail redirects users to the corresponding website. While most websites are safe for work, some carry NSFW disclaimers, adding an element of surprise. Please note that the number of websites may vary as the collection evolves; the stated 146 websites could be outdated at the time of reading.",
            demoUrl: 'ItemDisplay',
            keywords: ["Random Exploration", "Angular", "HTML/CSS", "TypeScript", "Website Collection", 'Mobile Compatible'],
            developers: ['OldMartijntje'],
            images: ['https://i.imgur.com/WEQY34p.png', 'https://i.imgur.com/et7b1kx.png']
        }
    },
    {
        id: 'github',
        name: 'Github',
        imageUrl: 'https://i.imgur.com/1bZ0CgJ.png',
        nav: 'https://github.com/oldmartijntje',
        info: {
            text: 'This is my Github profile. Here you can find all my repositories and projects. I have a lot of projects, some of them are private, but most of them are public. I have a lot of different projects, from websites to games and from chatbots to chat applications.',
            demoUrl: '',
            keywords: ['Github', 'Repositories', 'Projects', 'Open Source'],
            developers: ['OldMartijntje']
        }
    },
    {
        id: 'obsidianVault',
        name: 'OldMartijntje\'s Obsidian Vault.',
        imageUrl: 'https://i.imgur.com/BqEtov7.png',
        nav: 'https://docs.oldmartijntje.nl',
        info: {
            text: 'This is my cloud-hosted obsidian vault. Here you can find my notes, my knowledge base, my second brain. I use Obsidian to store all my notes and knowledge. I use it to store everything I know, everything I learn and everything I want to remember. I use it to store my ideas, my projects and my thoughts.\n\n(Might be slightly excaggerated, this description is generated by chatGPT.)',
            demoUrl: 'https://docs.oldmartijntje.nl',
            keywords: ['Obsidian', 'Knowledge Base', 'Notes', 'Ideas', 'Projects', 'Documentation'],
            developers: ['OldMartijntje'],
            images: ['https://i.imgur.com/nHr8cy1.png', 'https://i.imgur.com/W1cJTzS.png', 'https://i.imgur.com/rPySnxe.png', 'https://i.imgur.com/7Wb8OWc.png', 'https://i.imgur.com/6fVEyty.png'],
            githubRepo: 'https://github.com/oldmartijntje/oldmartijntje.nl-client'
        },
    },
    {
        id: 'terminal',
        name: 'Terminal.',
        imageUrl: 'https://i.imgur.com/DkWfK2p.png',
        nav: '/index',
        info: {
            text: "I created a dynamic terminal using Angular, featuring a variety of entertaining commands for interactive engagement. The terminal supports commands with adjustable arguments, cleverly recognizing text within quotes as a single argument, even if it includes spaces. For added complexity, users can specify particular arguments using the syntax $argument=input. Additionally, the terminal allows chaining commands together using the semicolon (;) for seamless execution of multiple operations.",
            demoUrl: '/index',
            keywords: ['Terminal', 'Command Line', 'CLI', 'Angular', 'HTML/CSS', 'TypeScript', 'Mobile Compatible'],
            developers: ['OldMartijntje'],
            images: ['https://i.imgur.com/E6fwjKO.png', 'https://i.imgur.com/IQM6lNb.png', 'https://i.imgur.com/HlwPZEX.png', 'https://i.imgur.com/dMciHX0.png']
        },
    },
    {
        id: 'textAdventures',
        name: 'Text Adventures',
        imageUrl: 'https://i.imgur.com/k0JjdWj.png',
        nav: '/Player',
        info: {
            text: "I created a text adventure engine hosted on my website, featuring a user-friendly built-in editor for crafting personalized text adventures. The engine, crafted in TypeScript, boasts mobile compatibility, allowing users to delve into interactive narratives on the go. Offering a plethora of features, including multiple choices, prompts, variable-driven scenarios, and playsound slides, the engine provides a dynamic and engaging storytelling experience. The incorporation of variables allows for the creation of unique choices contingent on specific actions. While the editor is a work in progress, users can seamlessly modify content through the convenient .json export function.",
            demoUrl: 'Player',
            keywords: ['Angular', 'HTML/CSS', 'TypeScript', 'Text Adventures', 'In game editor', 'Mobile Compatible'],
            developers: ['OldMartijntje'],
            images: ['https://i.imgur.com/k0JjdWj.png', 'https://i.imgur.com/6w6L0Tf.png', 'https://i.imgur.com/eCBzCYN.png', 'https://i.imgur.com/j0FD1dR.png', 'https://i.imgur.com/jaCidnV.png', 'https://i.imgur.com/1QXpG89.png', 'https://i.imgur.com/CD2CUFz.png', 'https://i.imgur.com/MhoyGWp.png', 'https://i.imgur.com/zBYu0Xa.png', 'https://i.imgur.com/AMaK9UH.png', 'https://i.imgur.com/VDYw7gE.png', 'https://i.imgur.com/oMhI6XN.png', 'https://i.imgur.com/1QbMmgO.png'],
        },
    },
    {
        id: 'adBee',
        name: 'AdBee',
        imageUrl: 'https://i.imgur.com/R8WuUUD.png',
        nav: 'https://oldmartijntje.nl/AdBee?nav=104,116,116,112,115,58,47,47,109,101,100,105,97,46,116,101,110,111,114,46,99,111,109,47,79,53,111,86,69,70,109,67,48,68,111,65,65,65,65,105,47,115,104,97,121,109,105,110,45,115,105,112,46,103,105,102',
        info: {
            text: "AdBee is my playful rendition of Adf.ly, residing within my Windows XP environment on a webpage of my website. In a humorous twist, AdBee features only fake ads that serve as a meme rather than a revenue source. The concept revolves around user-generated links, which, when visited, display random funny GIFs. To proceed to the intended web address, users simply click the prominently placed 'SKIP AD' button. Notably, while Adfly shortens links, AdBee playfully extends them by splitting the URL into characters and converting them to ASCII, resulting in an amusing and functional Easter egg.",
            demoUrl: 'https://oldmartijntje.nl/AdBee?nav=104,116,116,112,115,58,47,47,109,101,100,105,97,46,116,101,110,111,114,46,99,111,109,47,79,53,111,86,69,70,109,67,48,68,111,65,65,65,65,105,47,115,104,97,121,109,105,110,45,115,105,112,46,103,105,102',
            keywords: ['Angular', 'HTML/CSS', 'TypeScript', 'AdBee'],
            developers: ['OldMartijntje'],
            images: ['https://i.imgur.com/c6FyZ7E.png', 'https://i.imgur.com/DK2M3a5.png', 'https://i.imgur.com/GFA1EzF.png', 'https://i.imgur.com/a8JnPmM.png', 'https://i.imgur.com/2kg61Bt.png'],
        },
    }
];

export const projects: Game[] = [
    {
        id: 'sisu',
        name: 'Simpel Subsidie Chatbot',
        imageUrl: 'https://i.imgur.com/JepdwY6.png',
        info: {
            text: "I developed a specialized chatbot for SimpelSubsidie, a Dutch company. This chatbot, crafted using PHP and integrated with the ChatGPT API, serves as a valuable resource for individuals seeking information about subsidies. Featured prominently on the SimpelSubsidie website, the chatbot utilizes its own repository of Blogs and FAQs to efficiently address user inquiries. Notably, the chatbot is not a generic ChatGPT implementation; it specifically focuses on handling queries related to subsidies. Additionally, its versatility extends to a standard Iframe format, allowing seamless integration into other websites. This tailored solution provides users with a dedicated and user-friendly platform for subsidy-related inquiries.",
            demoUrl: 'https://isde-subsidie.nl/chatbot/',
            keywords: ['PHP', 'Chatbot', 'ChatGPT'],
            developers: ['OldMartijntje'],
            images: ['https://i.imgur.com/JepdwY6.png', 'https://i.imgur.com/LlbDW37.png', 'https://i.imgur.com/pB3RFXr.png', 'https://i.imgur.com/cwOwvRY.png', 'https://i.imgur.com/7hQlioQ.png', 'https://i.imgur.com/HrSMvj2.png']
        }
    },
    {
        id: 'nintendoSwitchHomescreen',
        name: 'Nintendo Homepage UI',
        imageUrl: 'https://i.imgur.com/RFOG0iI.png',
        nav: '/nintendo',
        info: {
            text: "I created a recreation of the Nintendo Switch Homepage UI using Angular. The interface serves as the homepage for PC users, offering a familiar layout with clickable applications that seamlessly navigate to various sections of my website. Clicking on 'All Apps' reveals a comprehensive list of all my projects, with options to run an application (pressing 'A'), deselect ('X'), open settings ('+'), and view information ('I'). The settings page mirrors the design of the Nintendo Switch, enhancing the overall user experience. Each application displayed within the Switch UI has individual information and settings pages, providing a comprehensive and user-friendly interface. The project supports both mouse and keyboard interactions for button presses.",
            demoUrl: 'nintendo',
            keywords: ['Angular', 'HTML/CSS', 'TypeScript'],
            developers: ['OldMartijntje'],
            images: ['https://i.imgur.com/Wa9FHbw.png', 'https://i.imgur.com/inIHXQB.png', 'https://i.imgur.com/Ae3uVfP.png', 'https://i.imgur.com/RNW13iU.png']
        },
    },
    {
        id: 'codeDungeon',
        name: 'Code Dungeon',
        imageUrl: 'https://i.imgur.com/tuuFF23.png',
        info: {
            text: "This project serves as an engaging educational tool designed to teach children the fundamentals of programming logic in a playful manner. Developed using Python's tkinter, it takes the form of a dungeon crawler game where players program their character's movements. The objective is to navigate through the dungeon, facing various enemies and collecting items while progressing through numerous levels. The flexibility of the project lies in its customization features; nearly everything, from powerful enemies with minimal health to diverse game elements, can be tailored by adjusting JSON files. Players exert control over the game dynamics using Python code commands, such as player.moveUp(). This unique approach allows users to elevate the complexity of the game, fostering a dynamic learning experience. In the Gallery tab, the second image showcases a user who has even created a simple GUI, highlighting the project's adaptability and creative potential.",
            keywords: ['Python', 'Dungeon Crawler', 'Roguelike', 'Game Development'],
            developers: ['OldMartijntje'],
            images: ['https://i.imgur.com/tuuFF23.png', 'https://i.imgur.com/CL2Cvay.png'],
            githubRepo: 'https://github.com/oldmartijntje/CodeDungeon'
        },
    },
    {
        id: 'editor',
        name: 'Code Editor [Discontinued]',
        imageUrl: 'https://i.imgur.com/N8UQNRD.png',
        nav: '/Editor',
        info: {
            text: "I created a Code editor using Angular, featuring the ability to edit web pages on my website using custom code. Over time, the webpage editing functionality was removed due to its complexity and resource intensity. The editor supported programming in JavaScript and Marjinscript, a language specifically designed for this platform, incorporating loops, commands, and importable modules. A separate console was provided for code input, along with an output window displaying code results and an error window highlighting any encountered errors. Surprisingly, this editor predates the website's home page. Presently, it serves as a streamlined code editor, supporting JavaScript execution. However, features such as output windows, compatibility with webpage editing, and Marjinscript support have been deprecated. Although technically feasible, executing code in languages other than JavaScript is limited to syntax highlighting without execution capabilities.",
            demoUrl: 'Editor',
            keywords: ['Angular', 'HTML/CSS', 'TypeScript', 'Code Editor'],
            developers: ['OldMartijntje'],
            images: ['https://i.imgur.com/2zxBG1r.png', 'https://i.imgur.com/tmOXzLD.png', 'https://i.imgur.com/3TR8Aww.png', 'https://i.imgur.com/cNOiOZN.png', 'https://i.imgur.com/VNa9VWU.png', 'https://i.imgur.com/ZYbYq6u.png', 'https://i.imgur.com/zQiXJlB.png', 'https://i.imgur.com/1ZTNd8K.png', 'https://i.imgur.com/8eDFunr.png', 'https://i.imgur.com/N8UQNRD.png'],
        },
    },
    {
        id: 'stepTracer',
        name: 'Step Tracer',
        imageUrl: 'https://i.imgur.com/agN69C7.png',
        nav: '/StepTracker',
        info: {
            text: "I developed a user-friendly feature on my website that enables users to effortlessly create step-by-step guides. Users can input information directly into a textbox, and the system automatically organizes and displays the content in markdown format, eliminating the need for users to handle markdown syntax. If modifications are desired, users can simply update the last step they want to change, and the tool dynamically adjusts the timeline accordingly. This versatile tool not only facilitates seamless guide creation but also offers customization options, including the ability to hide or modify removed steps. The system supports the creation of theoretically infinite timelines, enhancing flexibility and ease of use.",
            demoUrl: 'StepTracker',
            keywords: ['Angular', 'HTML/CSS', 'TypeScript', 'Markdown', 'Step Tracer', 'Mobile Compatible'],
            developers: ['OldMartijntje'],
            images: ['https://i.imgur.com/vGoxX9E.png', 'https://i.imgur.com/agN69C7.png', 'https://i.imgur.com/dVvJ4fW.png', 'https://i.imgur.com/uejCiFL.png'],
        },
    },
];