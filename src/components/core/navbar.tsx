"use client";

import React from "react";
import App from "../cms/types/app";
import { useLocale } from "next-intl";
import Link from '../../components/core/link';
import { usePathname } from "next/navigation";

interface Props {
    app?: App
    dark?: boolean
}

export default function Navbar({ app, dark }: Props) {
    const locale = useLocale();
    const pathname = usePathname();
    const [menu, setMenu] = React.useState(true)

    const toggleNavbar = () => {
        setMenu(!menu)
    }

    React.useEffect(() => {
        const elementId = document.getElementById("navbar");
        document.addEventListener("scroll", () => {
            if (!elementId) {
                return
            }
            if (window.scrollY > 170) {
                elementId.classList.add("is-sticky");
            } else {
                elementId.classList.remove("is-sticky");
            }
        });
        window.scrollTo(0, 0);
    })

    // Hilighted selected navbar link
    const navLinkClass = (href: string) => pathname == '/' + locale + href ? 'active' : '';

    const classOne = menu ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
    const classTwo = menu ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';

    return (
        <>
            <div id="navbar" className={`navbar-area navbar-style-${dark ? 'three' : ''}`}>
                <div className="zixon-nav">
                    <div className="">
                        <nav className="navbar navbar-expand-md navbar-light">
                            <Link href="/">
                                <a className={`navbar-brand ${dark ? 'text-light' : ''}`} style={{ fontSize: 24, fontWeight: 600, fontFamily: 'inherit' }}>
                                    {app?.company?.name || 'Hard Steel'}
                                </a>
                            </Link>

                            <button
                                onClick={toggleNavbar}
                                className={classTwo}
                                type="button"
                                data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span className="icon-bar top-bar"></span>
                                <span className="icon-bar middle-bar"></span>
                                <span className="icon-bar bottom-bar"></span>
                            </button>

                            <div className={classOne} id="navbarSupportedContent">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link href="/" activeClassName="active">
                                            <a onClick={toggleNavbar} className={`nav-link ${navLinkClass('/')}`}>{app?.navbar?.homeLabel || 'Home'}</a>
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link href="/services" activeClassName="active">
                                            <a onClick={toggleNavbar} className={`nav-link ${navLinkClass('/services/')}`}>{app?.navbar?.servicesLabel || 'Services'}</a>
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link href="/about" activeClassName="active">
                                            <a onClick={toggleNavbar} className={`nav-link ${navLinkClass('/about/')}`}>{app?.navbar?.aboutUsLabel || 'About'}</a>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/product" activeClassName="active">
                                            <a onClick={toggleNavbar} className={`nav-link ${navLinkClass('/product/')}`}>Product</a>
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link href="/contact" activeClassName="active">
                                            <a onClick={toggleNavbar} className={`nav-link ${navLinkClass('/contact/')}`}>{app?.navbar?.contactUsLabel || 'Contact'}</a>
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link toLocale={locale === "ar" ? "en" : "ar"} href={pathname.replace('/' + locale + '/', '/')} activeClassName="active">
                                            <a onClick={toggleNavbar} className="nav-link">{locale === "en" ? "عربي" : "EN"}</a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
};
