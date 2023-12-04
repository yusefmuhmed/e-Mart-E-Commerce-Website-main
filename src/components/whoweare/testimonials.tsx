"use client";

import React from 'react'
import Image from '../../components/core/image';
import Testimonial from '../cms/types/testimonial';
import { useKeenSlider } from "keen-slider/react"

const options = {
    nav: false,
    loop: true,
    margin: 30,
    dots: true,
    items: 1,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    autoplay: true,
    autoplayHoverPause: true,
    navText: [
        "<i class='ri-arrow-left-s-line'></i>",
        "<i class='ri-arrow-right-s-line'></i>"
    ]
}

interface Props {
    testimonial?: Testimonial
}


export default function Testimonials({ testimonial }: Props) {

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

    return (
        <>
            <div className="testimonial-area ptb-100">
                <div className="container">
                    <div className="section-title">
                        <span className="sub-title">
                            {testimonial?.subTitle}
                        </span>
                        <h2>
                            {testimonial?.title}
                        </h2>
                        <p>
                            {testimonial?.paragraph}
                        </p>
                    </div>


                    <div ref={ref} className="keen-slider">
                        {testimonial?.testimonials?.map((item) => (
                            <div key={item.id}>
                                <div className="keen-slider__slide">
                                    <div className="testimonial-content row align-items-center">
                                        <div className="col-md-8">
                                            <div className="testimonial-desc">
                                                <p>
                                                    {item.paragraph}
                                                </p>

                                                <div className="info">
                                                    <h3>{item.client}</h3>
                                                    <span>{item.jobTitle}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 d-none d-md-block">
                                            <div className="testimonial-img">
                                                <Image src={item?.image} alt="" />
                                            </div>
                                        </div>
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
