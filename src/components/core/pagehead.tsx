import React from 'react';
import Link from '../../components/core/link';

interface Props {
    title: string,
    homeUrl: string,
    homeLabel: string,
    activePageLabel: string
}


export default function PageHead({ title, homeUrl, homeLabel, activePageLabel }: Props) {
    return (
        <>
            <div className="page-title-area">
                <div className="container">
                    <div className="page-title-content">
                        <h2>{title}</h2>
                        <ul>
                            <li>
                                <Link href={homeUrl}>
                                    <a>{homeLabel}</a>
                                </Link>
                            </li>
                            <li>{activePageLabel}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};
