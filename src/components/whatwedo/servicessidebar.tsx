import React from 'react';
import Link from '../../components/core/link';
import Service from '../cms/types/service';
import WhatWeDo from '../cms/types/whatwedo';

interface Props {
    slug?: string;
    locale?: string;
    whatWeDo?: WhatWeDo;
    services?: Service[];
}

export default function ServiceSidebar({ slug, services, whatWeDo, locale }: Props) {

    const servicesList = services?.map(srv => {
        if (!srv.enabled || srv.slug == slug) {
            return <></>
        }
        return (
            <li key={srv.slug}>
                <Link href={`/services/${srv.slug}`}>
                    <a>
                        {srv.title}
                        <i className={`ri-arrow-${locale == 'ar' ? 'left' : 'right'}-s-line`}></i>
                    </a>
                </Link>
            </li>
        );
    });

    return (
        <>
            <div className="widget-area">
                <div className="widget widget_service_categories">
                    <h3 className="widget-title">{whatWeDo?.subTitle}</h3>

                    <ul>
                        {servicesList}
                    </ul>
                </div>
            </div>
        </>
    )
}