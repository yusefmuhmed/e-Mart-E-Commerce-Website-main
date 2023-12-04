import Navbar from '../../components/core/navbar';
import Footer from '../../components/core/footer';
import PageHead from '../../components/core/pagehead';
import TopHeader from '../../components/core/topheader';
import ServicesCard from '../../components/whatwedo/servicescard';

import getApp from '../cms/getapp';
import getServices from '../cms/getservices';

export default async function Services({ params: { locale } }: { params: { locale: string } }) {

    const [app, services] = await Promise.all([getApp(locale), getServices(locale)]);

    return (
        <>
            <TopHeader app={app} />

            <Navbar app={app} />

            <PageHead
                title={app?.navbar?.servicesLabel}
                homeUrl="/"
                homeLabel={app?.navbar?.homeLabel}
                activePageLabel={app?.navbar?.servicesLabel}
            />

            <ServicesCard services={services} />

            <Footer app={app} />
        </>
    )
}
