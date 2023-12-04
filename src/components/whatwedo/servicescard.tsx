import React, { Component } from 'react'
import Link from '../../components/core/link';
import Service from '../../app/cms/types/service';
import WhatWeDo from '../cms/types/whatwedo';
import Image from '../core/image';

interface Props {
    whatWeDo?: WhatWeDo;
    services?: Service[];
}

export default function ServicesCard({ services }: Props) {
    return (
        <>
            <div className="services-area ptb-100">
                <div className="container">
                    <div className="row align-items-center">
                        {services?.filter(s => s.enabled).map((service) => (
                            <div className="col-lg-4 col-md-6 col-sm-6" key={service.id}>
                                <div className="single-services-box">
                                    <div className="image">
                                        <Link href={`/services/${service.slug}`}>
                                            <a>
                                                <Image src={service.thumbnail} alt="" />
                                            </a>
                                        </Link>
                                    </div>
                                    <div className="content">
                                        <h3>
                                            <Link href={`/services/${service.slug}`}>
                                                <a>{service.title}</a>
                                            </Link>
                                        </h3>

                                        <p>{service.paragraph}</p>

                                        <Link href={`/services/${service.slug}`}>
                                        <a className="default-btn">
                                                Read More <i className="ri-arrow-right-line"></i>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>
    );
};
