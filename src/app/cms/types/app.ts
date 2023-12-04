import ButtonProps from "./button";
import ImageProps from "./image";

export default interface App {
    id: number;
    createdAt: string;
    updatedAt: string;
    locale: string;
    company: Company;
    header: Header;
    navbar: Navbar;
    footer: Footer;
}

interface Footer {
    id: number;
    contactLabel: string;
    callLabel: string;
    emailLabel: string;
    opiningDaysLabel: string;
    openings: Opening[];
}

interface Opening {
    id: number;
    day: string;
    hours: string;
}

interface Navbar {
    id: number;
    homeLabel: string;
    servicesLabel: string;
    aboutUsLabel: string;
    contactUsLabel: string;
}

interface Header {
    id: number;
    enabled: boolean;
    followUsLabel: string;
}

interface Company {
    id: number;
    name: string;
    slogan: string;
    logo: ImageProps;
    office: Office;
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

interface Office {
    id: number;
    name: string;
    email: string;
    phone: string;
    location: string;
    openingDays: string;
    openingHours: string;
    embedMapHtml: string;
}
