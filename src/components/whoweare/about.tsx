import React from 'react'
import Link from '../../components/core/link';
import Image from '../../components/core/image';
import WhoWeAre from '../cms/types/whoweare';

interface Props {
    whoWeAre?: WhoWeAre
}

export default function AboutContent({ whoWeAre }: Props) {
    return (
        <>
            <div className="about-area ptb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-12">
                            <div className="about-image">
                                <Image src={whoWeAre?.image} alt="" />
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-12">
                            <div className="about-content">
                                <span className="sub-title">{whoWeAre?.subTilte}</span>
                                <h2>{whoWeAre?.title}</h2>
                                <p>{whoWeAre?.paragraph}</p>

                                <ul className="features-list">
                                    {
                                        whoWeAre?.features?.map((feat, idx) => (
                                            <li key={feat.id}>
                                                <div className="number">{idx < 9 ? '0' + (idx + 1) : idx}</div>
                                                <h3>{feat.title}</h3>
                                                <p>{feat.paragraph}</p>
                                            </li>
                                        ))
                                    }
                                </ul>

                                <div className="read-more-btn">
                                    <Link href="/about-simple">
                                        <a className="default-btn">
                                            Read More
                                            <i className="ri-arrow-right-line"></i>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
