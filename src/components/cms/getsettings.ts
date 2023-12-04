import fetcher from "./fetcher";
import Settings from "./types/settings";

export default async function getSettings(): Promise<Settings> {
    return fetcher<Settings>({ uri: `/settings` });
}
