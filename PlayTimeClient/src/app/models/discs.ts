import { DefaultStory, DefaultScenes, Styling } from '../data/media';

export interface DiscType {
    styling: { [key: string]: any };
    story: { [key: string]: any };
    scenes: { [key: string]: any };
    name: string;
    image: string;
    description: string;
}

export const Discs: DiscType[] = [
    {
        "story": DefaultStory,
        "scenes": DefaultScenes,
        "styling": Styling,
        "name": "Short Mario Example",
        "image": "assets/icons/disc1.png",
        "description": "This is a short example of a visual novel."
    },
    {
        "story": DefaultStory,
        "scenes": DefaultScenes,
        "styling": Styling,
        "name": "Short Mario Example2",
        "image": "assets/icons/disc1.png",
        "description": "This is a short example of a visual novel."
    },
    {
        "story": DefaultStory,
        "scenes": DefaultScenes,
        "styling": Styling,
        "name": "Short Mario Example3",
        "image": "assets/icons/disc1.png",
        "description": "This is a short example of a visual novel."
    },
    {
        "story": DefaultStory,
        "scenes": DefaultScenes,
        "styling": Styling,
        "name": "Short Mario Example4",
        "image": "assets/icons/disc1.png",
        "description": "This is a short example of a visual novel."
    }


]