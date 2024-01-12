import Navbar from '../components/core/navbar';
import Footer from '../components/core/footer';
import HomeBanner from "../components/home/banner";
import TeamMembers from "../components/whoweare/teams";
import FreeQuote from "../components/request/freequote";
import AboutContent from "../components/whoweare/about";
import ContactForm from "../components/shared/contactform";
import ServicesIcon from "../components/whatwedo/servicesicon";
import Testimonials from "../components/whoweare/testimonials";

import getApp from '../app/cms/getapp';
import getHome from '../app/cms/gethome';
import getContact from '../app/cms/getcontact';
import getWhoWeAre from '../app/cms/getwhoweare';
import getWhatWeDo from '../app/cms/getwhatwedo';
import getServices from '../app/cms/getservices';
import getTeamHeads from '../app/cms/getteamheads';
import getTestimonial from '../app/cms/gettestimonial';

// export const revalidate = false;
// export const dynamic = 'force-static';
// export const fetchCache = 'force-cache';

export default async function Home() {

  // concurrent fetch
  const [app, home, services, whoWeAre, whatwedo, testimonial, teamHeads, contact] = await Promise.all([
    getApp("en"),
    getHome("en"),
    getServices("en"),
    getWhoWeAre("en"),
    getWhatWeDo("en"),
    getTestimonial("en"),
    getTeamHeads("en"),
    getContact("en"),
  ]);

  return (
    <>
       <Navbar app={app} dark />

      <HomeBanner home={home} />

      <AboutContent whoWeAre={whoWeAre} />

      <ServicesIcon whatWeDo={whatwedo} services={services} />

      <FreeQuote home={home} />

      <Testimonials testimonial={testimonial} />

      <TeamMembers team={teamHeads} />

      <ContactForm app={app} contact={contact} />

      <Footer app={app} />
    </>
  )
}
