export default interface Settings {
    id: number;
    createdAt: string;
    updatedAt: string;
    mailSettings: MailSettings;
    mailTemplates: MailTemplates;
    mailtoReceivers: MailtoReceivers;
}

interface MailSettings {
    id: number;
    host: string;
    port: number;
    username: string;
    password: string;
    secure: boolean;
}

interface MailTemplates {
    id: number;
    contactRequest: string;
    freeQuoteRequest: string;
}

interface MailtoReceivers {
    id: number;
    contactRequest: string[];
}