import ImageProps from "./image";
import ButtonProps from "./button";

export default interface Home {
    id: number;
    createdAt: string;
    updatedAt: string;
    locale: string;
    banners: Banner[];
    freeQuote: FreeQuote;
}

interface Banner {
    id: number;
    title: string;
    subTitle: string;
    paragraph: string;
    primaryButton: ButtonProps;
    secondaryButton: ButtonProps;
    bannerImage?: ImageProps;
}

interface FreeQuote {
    id: number;
    subTitle: string;
    title: string;
    paragraph?: any;
    formFieldName: string;
    formFieldService: string;
    formFIeldEmail: string;
    formSubmitButton: ButtonProps;
}
