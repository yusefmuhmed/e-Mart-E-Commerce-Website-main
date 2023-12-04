import Navbar from '../../../components/core/navbar';
import Footer from '../../../components/core/footer';
import PageHead from '../../../components/core/pagehead';
import TopHeader from '../../../components/core/topheader';
import ServiceSidebar from '../../../components/whatwedo/servicessidebar';

import getApp from '../../cms/getapp';
import getWhatWeDo from '../../cms/getwhatwedo';
import getServices from '../../cms/getservices';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

interface Props {
    params: {
        slug: string;
        locale: string;
 
    }
}

export const generateStaticParams = async () => {
    const [servicesAR, servicesEN] = await Promise.all([getServices("ar"), getServices("en")]);
     
  
    const paramsAR = servicesAR.map(s => {
      return { locale: "ar", slug: `ar/services/${s.slug}` };
    });
  
    const paramsEN = servicesEN.map(s => {
      return { locale: "en", slug: `en/services/${s.slug}`};
    });
  
    return [...paramsAR, ...paramsEN];
  }
export default async function ServiceDetails({ params: { slug, locale } }: Props) {
    // concurrent fetch
    const [app, services, whatwedo] = await Promise.all([
        getApp(locale),
        getServices(locale),
        getWhatWeDo(locale),
    ]);

    const service = services.find(s => s.slug === slug);

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


            <div className="services-details-area ptb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-12">
                            <div className="services-details-desc">
                                <ReactMarkdown>
                                    {service?.bodyContent || ""}
                                </ReactMarkdown>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-12">
                            <ServiceSidebar slug={slug} services={services} whatWeDo={whatwedo} locale={locale} />
                        </div>
                    </div>
                </div>
            </div>

            <Footer app={app} />
        </>
    )
}
