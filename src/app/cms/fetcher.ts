const CMS_BASE_URL = process.env.CMS_BASE_URL + "/api";
const CMS_READONLY_TOKEN = process.env.CMS_READONLY_TOKEN;
const authHeader = { Authorization: `Bearer ${CMS_READONLY_TOKEN}` };

interface Props {
    uri: string,
    options?: any
    locale?: string,
    populate?: string
    flat?: true | boolean,
}

export default async function fetcher<T>({ uri, locale = "en", populate = "deep", options = {} }: Props): Promise<T> {
    const operand = uri.includes('=') ? "&" : "?";
    const URL = `${CMS_BASE_URL}${uri}${operand}populate=${populate}&locale=${locale}`;

    // Add auth token
    options = {
        ...options,
        headers: {
            ...options.headers,
            ...authHeader,
        }
    }

    console.log(`\nGET ${URL}\n`);
    const resp = await fetch(URL, options);
    const json = await resp.json();
    const data = json.data;

    return data;
}
