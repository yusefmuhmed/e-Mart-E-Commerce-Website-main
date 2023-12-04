"use client";

import React, { useEffect, useState } from 'react'
import Home from '../cms/types/home';
import Image from '../core/image';
import Button from '../core/button';
import { useKeenSlider } from "keen-slider/react"

interface Props {
    home?: Home
}

export default function HomeBanner({ home }: Props) {

    const [ref] = useKeenSlider<HTMLDivElement>(
        {
            loop: true,
        },
        [
            (slider) => {
                let timeout: ReturnType<typeof setTimeout>
                let mouseOver = false
                function clearNextTimeout() {
                    clearTimeout(timeout)
                }
                function nextTimeout() {
                    clearTimeout(timeout)
                    if (mouseOver) return
                    timeout = setTimeout(() => {
                        slider.next()
                    }, 3500)
                }
                slider.on("created", () => {
                    slider.container.addEventListener("mouseover", () => {
                        mouseOver = true
                        clearNextTimeout()
                    })
                    slider.container.addEventListener("mouseout", () => {
                        mouseOver = false
                        nextTimeout()
                    })
                    nextTimeout()
                })
                slider.on("dragStarted", clearNextTimeout)
                slider.on("animationEnded", nextTimeout)
                slider.on("updated", nextTimeout)
            },
        ]
    );

    const [loader, setLoader] = useState<Boolean>(true);

    useEffect(() => {
        setLoader(false)
    }, [])

    return (
        <>
            <div className="banner-area">
                <div ref={ref} className="keen-slider">
                    {
                        home?.banners?.map((banner, idx) => (
                            // HIDING elements 
                            <div className="keen-slider__slide" key={banner.id} hidden={(idx > 0 && !!loader)}>
                                <div className="container">
                                    <div className="row align-items-center">
                                        <div className="col-lg-6 col-md-12">
                                            <div className="banner-content">
                                                <span className="sub-title">{banner.subTitle}</span>
                                                <h1>{banner.title}</h1>
                                                <p>{banner.paragraph}</p>

                                                <Button btn={banner.primaryButton} />

                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-12">
                                            <div className="banner-image">
                                                <Image src={banner.bannerImage} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

        </>
    )
};
