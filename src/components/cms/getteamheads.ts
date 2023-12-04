import fetcher from "./fetcher";
import TeamHeads from "./types/teamheads";

export default async function getTeamHeads(locale: string): Promise<TeamHeads> {
    return fetcher<TeamHeads>({ uri: `/team`, locale, populate: 'deep,4' });
}
