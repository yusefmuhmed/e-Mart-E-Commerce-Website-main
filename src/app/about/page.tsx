import Navbar from "../../components/core/navbar";
import Footer from '../../components/core/footer';
import PageHead from '../../components/core/pagehead';
import TopHeader from "../../components/core/topheader";
import TeamMembers from "../../components/whoweare/teams";
import AboutContent from "../../components/whoweare/about";
import TestimonialStyleThree from "../../components/whoweare/testimonials";

import getApp from '../cms/getapp';
import getWhoWeAre from '../cms/getwhoweare';
import getTeamHeads from '../cms/getteamheads';
import getTestimonial from '../cms/gettestimonial';

export default async function About({ params: { locale } }: { params: { locale: string } }) {

    // concurrent fetch
    const [app, whoWeAre, teamHeads, testimonial] = await Promise.all([
        getApp(locale),
        getWhoWeAre(locale),
        getTeamHeads(locale),
        getTestimonial(locale)
    ]);

    return (
        <>
            <TopHeader app={app} />

            <Navbar app={app} />

            <PageHead
                title={app?.navbar?.aboutUsLabel}
                homeUrl="/"
                homeLabel={app?.navbar?.homeLabel}
                activePageLabel={app?.navbar?.aboutUsLabel}
            />

            <AboutContent whoWeAre={whoWeAre} />


            <TeamMembers team={teamHeads} />

            <TestimonialStyleThree testimonial={testimonial} />


            <Footer app={app} />
        </>
    )
}
