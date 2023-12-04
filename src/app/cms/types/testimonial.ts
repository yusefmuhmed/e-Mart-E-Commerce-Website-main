import ImageProps from "./image";

export default interface Testimonial {
    id: number;
    title: string;
    subTitle: string;
    paragraph: string;
    createdAt: string;
    updatedAt: string;
    testimonials: {
        id: number;
        num: string;
        icon: string;
        client: string;
        jobTitle: string;
        paragraph: string;
        image?: ImageProps;
    }[];
};
