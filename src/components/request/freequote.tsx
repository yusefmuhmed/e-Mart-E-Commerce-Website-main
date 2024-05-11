"use client";
const CMS_BASE_URL = process.env.CMS_BASE_URL + "/api";
const CMS_READONLY_TOKEN = process.env.CMS_READONLY_TOKEN;
const authHeader = { Authorization: `Bearer ${CMS_READONLY_TOKEN}` };
import Swal from 'sweetalert2';
import Image from 'next/image'
import Home from '../cms/types/home'
import React, { useState } from 'react'
import withReactContent from 'sweetalert2-react-content'
import ImageShape11 from "../../../public/images/shape/shape11.png"
import ImageShape12 from "../../../public/images/shape/shape12.png"

const MySwal = withReactContent(Swal);

const alertContent = () => {
    MySwal.fire({
        title: 'Thank you!',
        text: 'We recived your request and our team will back to you soon',
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
    })
}

interface Props {
    home?: Home
}

// Form initial state
const INITIAL_STATE = {
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    mailSubject: "Free Quote Request"
};

export default function FreeQuote({ home }: Props) {

    const [freeQuoteForm, setFreeQuoteForm] = useState(INITIAL_STATE);
    const [loading, setLoading] = useState(false);

    const disabled = (loading || !freeQuoteForm.name || !freeQuoteForm.email || !freeQuoteForm.phone || freeQuoteForm.phone.length < 9);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFreeQuoteForm(prevState => ({ ...prevState, [name]: value }));
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',...authHeader },
                body: JSON.stringify(freeQuoteForm)
            };
            const res = await fetch(CMS_BASE_URL +"/contact", requestOptions);
            setFreeQuoteForm(INITIAL_STATE);
            alertContent();
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="free-quote-area ptb-100">
                <div className="container">
                    <div className="free-quote-inner">
                        <div className="section-title">
                            <span className="sub-title">{home?.freeQuote?.subTitle || 'Free Quote'}</span>
                            <h2>{home?.freeQuote?.title}</h2>
                            <p>{home?.freeQuote?.paragraph}</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-lg-6 col-md-6">
                                    <div className="form-group">
                                        <label>{home?.freeQuote?.formFieldName || 'Your Name'}</label>
                                        <input name="name" type="text" className="form-control" value={freeQuoteForm.name} required onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <div className="form-group">
                                        <label>{home?.freeQuote?.formFIeldEmail || 'Your Email'}</label>
                                        <input name="email" type="email" className="form-control" value={freeQuoteForm.email} required onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <div className="form-group">
                                        <label>{home?.freeQuote?.formFieldService || 'Phone'}</label>
                                        <input name="phone" type="number" className="form-control" value={freeQuoteForm.phone} onChange={handleChange} />
                                    </div>
                                </div>
                                {
                                    !home?.freeQuote?.formSubmitButton?.enabled ? <></> : (
                                        <div className="col-lg-6 col-md-6">
                                            <div className="form-group">
                                                <button type="submit" className="btn default-btn" disabled={disabled}>
                                                    {home?.freeQuote?.formSubmitButton?.label || 'Request a Quote'}
                                                    <i className={home?.freeQuote?.formSubmitButton?.icon || 'ri-information-line'}></i>
                                                </button>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </form>

                        <div className="shape6">
                            <Image src={ImageShape11} alt="left shape" />
                        </div>
                        <div className="shape7">
                            <Image src={ImageShape12} alt="right shape" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
