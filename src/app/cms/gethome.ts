import fetcher from "./fetcher";
import Home from "./types/home";

export default async function getHome(locale: string): Promise<Home> {
    return fetcher<Home>({ uri: `/home`, locale })
}
