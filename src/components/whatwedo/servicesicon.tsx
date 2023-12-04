import React, { Component } from 'react';
import Link from '../../components/core/link';
import Service from '../cms/types/service';
import WhatWeDo from '../cms/types/whatwedo';

interface Props {
    whatWeDo?: WhatWeDo;
    services?: Service[];
}

export default function ServicesIcon({ whatWeDo, services }: Props) {
    return (
        <>
            <div className="services-area ptb-100 bg-fbf9f7">
                <div className="container">
                    <div className="section-title">
                        <span className="sub-title">
                            {whatWeDo?.subTitle}
                        </span>
                        <h2>
                            {whatWeDo?.title}
                        </h2>
                        <p>
                            {whatWeDo?.paragraph}
                        </p>
                    </div>

                    <div className="row">
                        {services?.filter(s => s.enabled && s.addToHome).map((srv) => (

                            <div className="col-lg-4 col-md-6 col-sm-12" key={srv.id}>
                                <div className="single-services-item">
                                    <div className="icon">
                                        <i className={srv.icon || 'ri-information-line'}></i>
                                    </div>
                                    <h3>
                                        <Link href={'/services/' + srv.slug}>
                                            <a>{srv.title}</a>
                                        </Link>
                                    </h3>
                                    <p>{srv.paragraph}</p>

                                    <Link href={'/services/' + srv.slug}>
                                        <a className="link-btn">Read More</a>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

