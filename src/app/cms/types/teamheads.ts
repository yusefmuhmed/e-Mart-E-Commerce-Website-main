import ButtonProps from "./button";
import ImageProps from "./image";

export default interface TeamHeads {
    id: number;
    title: string;
    subTitle: string;
    paragraph?: string;
    addToHome: boolean;
    createdAt: string;
    updatedAt: string;
    heads: Head[];
}

interface Head {
    id: number;
    name: string;
    jobTitle: string;
    photo?: ImageProps;
    socialLinks: SocialLinks;
}

interface SocialLinks {
    id: number;
    twitter: ButtonProps;
    facebook: ButtonProps;
    linkedin: ButtonProps;
    whatsapp: ButtonProps;
    instagram: ButtonProps;
}
