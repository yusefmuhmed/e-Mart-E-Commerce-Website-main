import fetcher from "./fetcher";
import Service from "./types/service";

export default async function getServices(locale: string): Promise<Service[]> {
    return fetcher<Service[]>({ uri: `/services`, locale });
}

export async function getServiceBySlug(locale: string, slug: string): Promise<Service> {
    const services = await fetcher<Service[]>({ uri: `/services?filters[slug][$eq]=${slug}`, locale });
    return services[0];
}