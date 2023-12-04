import ImageProps from "./image";

export default interface Service {
    productid: any;
    id: number;
    enabled: boolean;
    addToHome: boolean;
    title: string;
    subTitle: string;
    paragraph: string;
    bodyContent: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    slug: string;
    thumbnail?: ImageProps;
    icon: string
}
