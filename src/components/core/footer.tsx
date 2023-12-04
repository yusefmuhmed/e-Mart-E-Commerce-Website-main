import React from 'react'
import Link from '../../components/core/link';
import App from '../cms/types/app';
import Image from './image';
import Button from './button';

interface Props {
    app?: App
}

export default function Footer({ app }: Props) {
    const currentYear = new Date().getFullYear();
    return (
        <>
            <footer className="footer-area">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-sm-4 col-md-4">
                            <div className="single-footer-widget">
                                <Link href="/">
                                    <Image src={app?.company?.logo} alt="" />
                                </Link>
                                <p>{app?.company?.slogan}</p>
                                <div className="footer-contact-info">
                                    <h5>{app?.footer?.contactLabel}</h5>
                                    <ul>
                                        <li><span>{app?.footer?.callLabel}</span> <a href={`tel:${app?.company?.office?.phone}`}>{app?.company?.office?.phone}</a></li>
                                        <li><span>{app?.footer?.emailLabel}</span> <a href={`mailto:${app?.company?.office?.email}`}>{app?.company?.office?.email}</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-4 col-md-4">
                            <div className="single-footer-widget pl-4">
                                <h3>Quick Links</h3>
                                <ul className="links-list">
                                    <li>
                                        <Link href="/">
                                            <a>{app?.navbar?.homeLabel || 'Home'}</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/services">
                                            <a>{app?.navbar?.servicesLabel || 'Services'}</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/about">
                                            <a>{app?.navbar?.aboutUsLabel || 'About'}</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/contact">
                                            <a>{app?.navbar?.contactUsLabel || 'Contact'}</a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-4 col-md-4">
                            <div className="single-footer-widget">
                                <h3>{app?.footer?.opiningDaysLabel}</h3>
                                <ul className="opening-hours">
                                    {
                                        app?.footer?.openings?.map(item => (
                                            <li key={item.day}>{item.day} <span>{item.hours}</span></li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="copyright-area">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 col-md-7 col-sm-6">
                                <p>&copy; {currentYear} {app?.company?.name}</p>
                            </div>

                            <div className="col-lg-6 col-md-5 col-sm-6">
                                <ul className="social-links">
                                    <li>
                                        <Button btn={app?.company?.socialLinks?.twitter} noStyle targetBrank />
                                    </li>
                                    <li>
                                        <Button btn={app?.company?.socialLinks?.facebook} noStyle targetBrank />
                                    </li>
                                    <li>
                                        <Button btn={app?.company?.socialLinks?.linkedin} noStyle targetBrank />
                                    </li>
                                    <li>
                                        <Button btn={app?.company?.socialLinks?.whatsapp} noStyle targetBrank />
                                    </li>
                                    <li>
                                        <Button btn={app?.company?.socialLinks?.instagram} noStyle targetBrank />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};
