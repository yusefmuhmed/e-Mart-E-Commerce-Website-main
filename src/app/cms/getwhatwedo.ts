import fetcher from "./fetcher";
import WhatWeDo from "./types/whatwedo";

export default async function getWhatWeDo(locale: string): Promise<WhatWeDo> {
    return fetcher<WhatWeDo>({ uri: `/what-we-do`, locale });
}
