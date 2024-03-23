"use client";

import React, { useState } from 'react'

import App from '../cms/types/app';
import Contact from '../cms/types/contact';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal);

const alertContent = () => {
    MySwal.fire({
        title: 'Thank you!',
        text: 'We received your request and our team will back to you soon',
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
    })
}

interface Props {
    app?: App
    contact?: Contact
}

// Form initial state
const INITIAL_STATE = {
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    mailSubject: "Contact Request"
};

export default function ContactForm({ app, contact }: Props) {

    const [contactForm, setContactForm] = useState(INITIAL_STATE);
    const [loading, setLoading] = useState(false);

    const disabled = loading || (!contactForm.name || !contactForm.email || !contactForm.phone || contactForm.phone.length < 9);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setContactForm(prevState => ({ ...prevState, [name]: value }));
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(contactForm)
            };
            const res = await fetch("/contact", requestOptions);
            setContactForm(INITIAL_STATE);
            alertContent();
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contact-area ptb-100">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-12">
                        <div className="maps">
                            <iframe src={app?.company?.office?.embedMapHtml}></iframe>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-12">
                        <div className="contact-form">
                            <span className="sub-title">{contact?.subTitle}</span>
                            <h2>{contact?.title}</h2>
                            <p>{contact?.paragraph}</p>

                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder={contact?.formFieldName || 'Name'}
                                                className="form-control"
                                                value={contactForm.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                name="email"
                                                placeholder={contact?.formFieldEmail || 'Email'}
                                                className="form-control"
                                                value={contactForm.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                        <div className="form-group">
                                            <input
                                                type="number"
                                                name="phone"
                                                placeholder={contact?.formFieldPhone || 'Phone'}
                                                className="form-control"
                                                value={contactForm.phone}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                name="subject"
                                                placeholder={contact?.formFieldSubject || 'Subject'}
                                                className="form-control"
                                                value={contactForm.subject}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <div className="form-group">
                                            <textarea
                                                name="message"
                                                cols={30}
                                                rows={6}
                                                placeholder={contact?.formFieldMessage || 'Write your message'}
                                                className="form-control"
                                                value={contactForm.message}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    {/* <div className="col-lg-12 col-md-12 col-sm-12">
                                        <div className="form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="checkme"
                                            />
                                            <label className="form-check-label" htmlFor="checkme">
                                                Accept <Link href="/terms-conditions"><a>Terms of Services</a></Link> and <Link href="/privacy-policy"><a>Privacy Policy</a></Link>
                                            </label>
                                        </div>
                                    </div> */}
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        {
                                            !contact?.formSubmitButton?.enabled ? '' : (
                                                <button type="submit" className="btn default-btn" disabled={disabled}>
                                                    {contact?.formSubmitButton?.label || 'Send Message'} <i className={contact?.formSubmitButton?.icon}></i>
                                                </button>
                                            )
                                        }
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
