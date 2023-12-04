import fetcher from "./fetcher";
import Testimonial from "./types/testimonial";

export default async function getTestimonial(locale: string): Promise<Testimonial> {
    return fetcher<Testimonial>({ uri: `/testimonial`, locale });
}
