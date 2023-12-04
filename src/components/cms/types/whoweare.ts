import ImageProps from "./image";

export default interface WhoWeAre {
    id: number;
    title: string;
    subTilte: string;
    paragraph: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    features: Feature[];
    image: ImageProps;
}

interface Feature {
    id: number;
    num: string;
    title: string;
    paragraph: string;
}