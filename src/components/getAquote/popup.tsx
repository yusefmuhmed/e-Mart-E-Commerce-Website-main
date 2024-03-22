import "./popup.css";

import React, { useState } from "react";

const Popup = ({ handleClose, onSaveFormData }) => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        subject: "",
        message: "",
        company: "",
        country: "",
        address: "",
        category: "",
        industry: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleGetQuote = () => {
        const { name, email, mobile } = formData;

        // Check for required fields
        if (!name || !email || !mobile) {
            return;
        }

        // Validate email
        if (!isEmailValid(email)) {

            return;
        }

        // Validate mobile number
        if (!isMobileValid(mobile)) {
            alert("Please enter a valid 10-digit mobile number.");
            return;
        }

        // If all validations pass, send the form data to other components
        onSaveFormData(formData);
    };


    const isEmailValid = (email) => {
        // Regular expression for email validation
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const isMobileValid = (mobile) => {
        // Regular expression for mobile number validation (simple example)
        return mobile.length === 10 && !isNaN(mobile);
    };


    return (
        <div className="row">


            <div className="popup">
                <div className="card p-3">
                    <form className="needs-validation">

                        <input className="form-control my-3" type="text" placeholder="Name" name="name" onChange={handleInputChange} required />
                        <input className="form-control my-3" type="email" placeholder="Email" name="email" onChange={handleInputChange} required />
                        <input className="form-control my-3" type="text" placeholder="Mobile" name="mobile" onChange={handleInputChange} required />
                        <input className="form-control my-3" type="text" placeholder="Subject" name="subject" onChange={handleInputChange} />
                        <textarea className="form-control my-3" placeholder="Message" name="message" onChange={handleInputChange}  ></textarea>
                        <input className="form-control my-3" type="text" placeholder="Company" name="company" onChange={handleInputChange} />
                        <input className="form-control my-3" type="text" placeholder="Country" name="country" onChange={handleInputChange} />
                        <input className="form-control my-3" type="text" placeholder="Address" name="address" onChange={handleInputChange} />
                        <select className="form-select my-3">
                            <option value="">Select Category</option>
                            <option value="Request">Request</option>
                            <option value="Ask">Ask</option>
                            <option value="Complain">Compliment</option>
                        </select>
                        <select className="form-select">
                            <option value="">Select Industry</option>
                            <option value="Construction">Construction</option>
                            <option value="Agriculture">Agriculture</option>
                            <option value="Culture">Culture</option>
                        </select>
                        <div className="row m-3">
                            <button className="col btn btn-primary" onClick={(event) => onSaveFormData(formData, event)}>Send</button>

                            <button className="col btn btn-danger" onClick={handleClose}>Close</button>
                        </div>
                    </form>
                </div>

            </div>

        </div >
    );
};

export default Popup;