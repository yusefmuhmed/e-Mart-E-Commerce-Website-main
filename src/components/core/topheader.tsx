import React from 'react';
import Button from './button';
import App from '../cms/types/app';

interface Props {
    app?: App
    dark?: boolean
}

export default function TopHeader({ app }: Props) {
    if (!app?.header?.enabled) {
        return <></>
    }
    return (
        <>
            <div className="top-header-area">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-4 col-md-4">
                            <div className="top-header-left-side">
                                <div className="d-flex align-items-center">
                                    <ul className="top-header-social-links d-flex align-items-center">
                                        <li>Follow us on:</li>
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

                        <div className="col-lg-8 col-md-8">
                            <ul className="top-header-contact-info">
                                <li>
                                    <i className="ri-time-line"></i>
                                    <span>{app?.company?.office?.openingDays}</span> {app?.company?.office?.openingHours}
                                </li>
                                <li>
                                    <i className="ri-map-pin-2-line"></i>
                                    <span>{app?.company?.office?.name}</span> {app?.company?.office?.location}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
