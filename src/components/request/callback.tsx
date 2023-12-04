import React from 'react';
import Link from '../../components/core/link';

export default function CallBackRequest() {
    return (
        <>
            <div className="call-back-request-area ptb-100 bg-black">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-12">
                            <div className="call-back-request-img">
                                {/* <img src="/images/call-back-request2.png" alt="image" /> */}
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-12">
                            <div className="call-back-request-text">
                                <span className="sub-title">CALL BACK REQUEST</span>
                                <h2>Help You Reach Business of Your in Right Goal</h2>
                                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy a eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At verorh eos et accusam at vero eos et accusam.</p>

                                <div className="row justify-content-center">
                                    <div className="col-lg-4 col-md-4 col-6 col-sm-6">
                                        <div className="single-call-back-box">
                                            <div className="icon">
                                                <i className="ri-checkbox-multiple-line"></i>
                                            </div>
                                            <h3>Projects Completions</h3>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-6 col-sm-6">
                                        <div className="single-call-back-box">
                                            <div className="icon">
                                                <i className="ri-pie-chart-2-line"></i>
                                            </div>
                                            <h3>Case Study Competitions</h3>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-6 col-sm-6">
                                        <div className="single-call-back-box">
                                            <div className="icon">
                                                <i className="ri-medal-line"></i>
                                            </div>
                                            <h3>Excellent Awards Wins</h3>
                                        </div>
                                    </div>
                                </div>

                                <Link href="/contact">
                                    <a className="default-btn">
                                        Request A Call <i className="ri-arrow-right-line"></i>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
