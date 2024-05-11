import ButtonProps from "./button";

export default interface Contact {
    id: number;
    title: string;
    subTitle: string;
    paragraph: string;
    formTitle: string;
    formSubTitle: string;
    formParagraph: string;
    formFieldName: string;
    formFieldEmail: string;
    formFieldPhone: string;
    formFieldSubject: string;
    formFieldMessage: string;
    formFieldMobile:string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    formFieldTerms: string;
    phoneLabel: string;
    emailLabel: string;
    formSubmitButton: ButtonProps;
}
