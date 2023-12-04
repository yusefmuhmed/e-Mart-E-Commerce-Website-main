import fetcher from "./fetcher";
import App from "./types/app";

export default async function getApp(locale: string): Promise<App> {
    return fetcher<App>({ uri: `/app`, locale, populate: "deep,4" })
}
