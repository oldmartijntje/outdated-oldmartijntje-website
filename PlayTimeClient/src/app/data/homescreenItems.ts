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
            text: "I crafted a Windows XP desktop using Angular, featuring both mobile and PC modes. In the PC mode, users can interact with a desktop environment complete with movable icons and runnable applications. The 'Page Explorer' application, reminiscent of the classic Internet Explorer, allows users to navigate through various webpages on my website. On the other hand, the mobile mode focuses solely on the 'Page Explorer,' offering a nostalgic look and feel of the old Internet Explorer.",
            demoUrl: '/Home',
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
        nav: '/Homepage',
        info: {
            text: "I created a recreation of the Nintendo Switch Homepage UI using Angular. The interface serves as the homepage for PC users, offering a familiar layout with clickable applications that seamlessly navigate to various sections of my website. Clicking on 'All Apps' reveals a comprehensive list of all my projects, with options to run an application (pressing 'A'), deselect ('X'), open settings ('+'), and view information ('I'). The settings page mirrors the design of the Nintendo Switch, enhancing the overall user experience. Each application displayed within the Switch UI has individual information and settings pages, providing a comprehensive and user-friendly interface. The project supports both mouse and keyboard interactions for button presses.",
            demoUrl: 'Homepage',
            keywords: ['Angular', 'HTML/CSS', 'TypeScript'],
            developers: ['OldMartijntje'],
            images: ['https://i.imgur.com/Wa9FHbw.png', 'https://i.imgur.com/inIHXQB.png', 'https://i.imgur.com/Ae3uVfP.png', 'https://i.imgur.com/RNW13iU.png']
        },
    }
];