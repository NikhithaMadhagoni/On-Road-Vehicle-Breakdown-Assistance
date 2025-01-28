import React, { useState } from "react";
import "./User-registration.css";

const Registration = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        contact: "",
        vehicleType: "",
        lat: "",
        long: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted: ", formData);
    };

    return (
        <div className="registration-container">
            <h2>User Registration</h2>
            <form onSubmit={handleSubmit} className="registration-form">
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter your username"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Contact Number</label>
                    <input
                        type="text"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        placeholder="Enter your contact number"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Vehicle Type</label>
                    <select
                        name="vehicleType"
                        value={formData.vehicleType}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select vehicle type</option>
                        <option value="2">2-Wheeler</option>
                        <option value="4">4-Wheeler</option>
                        <option value="6">6-Wheeler</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Location</label>
                    <input
                        type="number"
                        name="lat"
                        value={formData.lat}
                        onChange={handleChange}
                        placeholder="Latitude"
                        required
                    />
                    <input
                        type="number"
                        name="long"
                        value={formData.long}
                        onChange={handleChange}
                        placeholder="Longitude"
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Register</button>
            </form>
        </div>
    );
};

export default Registration;
