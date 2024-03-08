import React from "react";
import "./popup.css";

const Popup = ({ handleClose, handleQuote }) => {
    return (
        <div className="row">
            

            <div className="popup">
                <div className="card p-3"> 
                <input className="form-control" type="text" placeholder="Name" />
                <input className="form-control" type="email" placeholder="Email" />
                <input className="form-control" type="text" placeholder="Mobile" />
                <input className="form-control" type="text" placeholder="Subject" />
                <textarea className="form-control" placeholder="Message"></textarea>
                <input className="form-control" type="text" placeholder="Company" />
                <input className="form-control" type="text" placeholder="Country" />
                <input className="form-control" type="text" placeholder="Address" />
                <select className="form-control">
                    <option value="">Select Category</option>
                    {/* Add options for category here */}
                </select>
                <select className="form-control">
                    <option value="">Select Industry</option>
                    {/* Add options for industry here */}
                </select>
                <div className="row"> 
                <button className="col btn btn-primary" onClick={handleQuote}>Get Quote</button>
                <button className="col btn btn-danger" onClick={handleClose}>Close</button>
                </div>
            </div>

            </div>

        </div>
    );
};

export default Popup;