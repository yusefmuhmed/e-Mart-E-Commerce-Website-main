import React from 'react'
import App from '../cms/types/app'
import Contact from '../cms/types/contact'

interface Props {
    app?: App,
    contact?: Contact
}

export default function ContactInfo({ app, contact }: Props) {
    return (
        <>
            <div className="pt-100">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-12">
                            <div className="contact-content">
                                <span className="sub-title">{contact?.subTitle}</span>
                                <h2>{contact?.title}</h2>
                                <p>{contact?.paragraph}</p>

                                <div className="row justify-content-center">
                                    <div className="col-lg-4 col-md-4 col-sm-6">
                                        <div className="single-contact-info-box">
                                            <div className="icon">
                                                <i className="ri-home-7-line"></i>
                                            </div>
                                            <h3>{app?.company?.office?.name}</h3>
                                            <p>{app?.company?.office?.location}</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-6">
                                        <div className="single-contact-info-box">
                                            <div className="icon">
                                                <i className="ri-phone-line"></i>
                                            </div>
                                            <h3>Our Phone</h3>
                                            <p><span>{app?.footer?.callLabel}</span><a href={`mailto:${app?.company?.office?.phone}`} >{app?.company?.office?.phone}</a></p>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-6">
                                        <div className="single-contact-info-box">
                                            <div className="icon">
                                                <i className="ri-mail-star-line"></i>
                                            </div>
                                            <h3>Email Address</h3>
                                            <p><span>{app?.footer?.emailLabel}</span><a href={`mailto:${app?.company?.office?.email}`}>{app?.company?.office?.email}</a></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-12">
                            <div className="contact-image">
                                <img src="/images/noimage.png" alt="image" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
