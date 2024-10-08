export interface displayAd {
    link: string;
    image: string;
    blank_?: boolean;
}

const smallAdList: displayAd[] = [
    {
        "link": "",
        "image": "https://oldmartijntje.github.io/outdated-oldmartijntje-website/assets/images/buttons/nicelyCSSed.gif",
        "blank_": true
    },
    {
        "link": "https://freakphone.net/",
        "image": "https://www.dl.dropboxusercontent.com/s/aw6yvlcgdwcol0h/freakbutton.gif",
        "blank_": true
    },
    {
        "link": "./Chat",
        "image": "https://oldmartijntje.github.io/outdated-oldmartijntje-website/assets/images/buttons/single.gif",
        "blank_": false
    },
    {
        "link": "",
        "image": "https://boxy.neocities.org/images/steam.gif",
        "blank_": true
    },
    {
        "link": "https://boxy.neocities.org/",
        "image": "https://boxy.neocities.org/images/ggPng.png",
        "blank_": true
    },
    {
        "link": "https://arutemu64.neocities.org/",
        "image": "https://arutemu64.neocities.org/button.gif",
        "blank_": true
    },
    {
        "link": "https://oldmartijntje.github.io/outdated-oldmartijntje-website/",
        "image": "https://i.imgur.com/5svJRQD.png",
        "blank_": false
    },
    {
        "link": "https://hopeslair.neocities.org/",
        "image": "https://hopeslair.neocities.org/pictures/buttonsite2.gif",
        "blank_": true
    },
    {
        "link": "https://www.duolingo.com",
        "image": "https://i.imgur.com/r5c8NVi.png",
        "blank_": true
    },
    {
        "link": "",
        "image": "https://i.imgur.com/unFAOY1.gif",
        "blank_": true
    },
    {
        "link": "http://www.saitogames.com/battlepainters/",
        "image": "https://oldmartijntje.github.io/outdated-oldmartijntje-website/assets/images/buttons/battlePainters.gif",
        "blank_": true
    },
    {
        "link": "https://dimden.dev/",
        "image": "https://dimden.dev/services/images/88x31.gif",
        "blank_": true
    },
    {
        "link": "",
        "image": "https://oldmartijntje.github.io/outdated-oldmartijntje-website/assets/images/buttons/robuzx.png",
        "blank_": true
    },
    {
        "link": "",
        "image": "https://plasticdino.neocities.org/buttons/bestvieweddesktop.gif",
        "blank_": true
    },
    {
        "link": "",
        "image": "https://fairytrash.neocities.org/img/buttons/18.gif",
        "blank_": true
    },
    {
        "link": "https://melankorin.net/",
        "image": "https://melankorin.net/assets/img/buttons/button-2.gif",
        "blank_": true
    },
    {
        "link": "http://vaerael.neocities.org/",
        "image": "https://64.media.tumblr.com/fb603cee5834488971d74d7f66cdf99d/6c005a58dfcc6d02-12/s540x810/e2aaabc47e427d4f1af027a67dd03a5306ccb88f.png",
        "blank_": true
    },
    {
        "link": "http://theoldnet.com",
        "image": "https://theoldnet.com/images/theoldnetanimblur2.gif",
        "blank_": true
    },
    {
        "link": "https://open.spotify.com/track/0X3FKutBnvxqEBxH5xwkU2?si=f38dc45e5b734ef1",
        "image": "https://oldmartijntje.github.io/outdated-oldmartijntje-website/assets/images/buttons/Button1.gif",
        "blank_": true
    },
    {
        "link": "https://nenrikido.neocities.org",
        "image": "https://dl.dropbox.com/s/265wg2om8bjr5g6/nenrikido_button.gif",
        "blank_": true
    },
    {
        "link": "",
        "image": "https://i.imgur.com/OOCrco2.gif",
        "blank_": true
    },
    {
        "link": "",
        "image": "https://oldmartijntje.github.io/outdated-oldmartijntje-website/assets/images/buttons/brainTraining.gif",
        "blank_": true
    },
    {
        "link": "",
        "image": "https://boxy.neocities.org/images/doomrl.gif",
        "blank_": true
    },
    {
        "link": "",
        "image": "https://boxy.neocities.org/images/phonechump.gif",
        "blank_": true
    },
    {
        "link": "https://roachette.neocities.org",
        "image": "https://roachette.neocities.org/rchettebutton.gif",
        "blank_": true
    },
    {
        "link": "",
        "image": "https://oldmartijntje.github.io/outdated-oldmartijntje-website/assets/images/buttons/longus.gif",
        "blank_": true
    },
    {
        "link": "",
        "image": "https://oldmartijntje.github.io/outdated-oldmartijntje-website/assets/images/buttons/marioScared.png",
        "blank_": true
    },
]

const mediumAdList: displayAd[] = [
]

const bigAdList: displayAd[] = [
    {
        "link": "",
        "image": "https://oldmartijntje.github.io/outdated-oldmartijntje-website/assets/images/buttons/carcassonne.gif",
        "blank_": true
    },
    {
        "link": "",
        "image": "https://oldmartijntje.github.io/outdated-oldmartijntje-website/assets/images/buttons/scratch.gif",
        "blank_": true
    },
    {
        "link": "",
        "image": "https://oldmartijntje.github.io/outdated-oldmartijntje-website/assets/images/buttons/partnerzInTiem.gif",
        "blank_": true
    }
]

function shuffleArray(array: displayAd[]): displayAd[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Shuffle the bigAdList array
shuffleArray(smallAdList);
shuffleArray(mediumAdList);
shuffleArray(bigAdList);

// Export the shuffled array
export { smallAdList, mediumAdList, bigAdList };