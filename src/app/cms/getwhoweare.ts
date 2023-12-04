import fetcher from "./fetcher";
import WhoWeAre from "./types/whoweare";

export default async function getWhoWeAre(locale: string): Promise<WhoWeAre> {
    return fetcher<WhoWeAre>({ uri: `/who-we-are`, locale });
}
