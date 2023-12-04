import fetcher from "./fetcher";
import Contact from "./types/contact";

export default async function getContact(locale: string): Promise<Contact> {
    return fetcher<Contact>({ uri: `/contact`, locale });
}
