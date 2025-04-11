import React, { useEffect, useState } from "react";
import "./Service-provider-registration.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ServiceProviderSignup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        business_name: "",
        service_type: [],
        service_area: "",
        contact: "",
        location: { lat: null, long: null },
        is_available: true,
        fee: 0,
    });
    const [locationError, setLocationError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setFormData((prevData) => ({
                        ...prevData,
                        location: {
                            lat: position.coords.latitude,
                            long: position.coords.longitude,
                        },
                    }));
                },
                (error) => {
                    setLocationError("Unable to fetch your location. Please allow access to location.");
                    console.error("Error fetching location:", error);
                }
            );
        } else {
            setLocationError("Geolocation is not supported by your browser.");
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prevData) => {
            let updatedServiceTypes = [...prevData.service_type];
            if (checked) {
                updatedServiceTypes.push(value); // Add service type if checked
            } else {
                updatedServiceTypes = updatedServiceTypes.filter((type) => type !== value); // Remove service type if unchecked
            }
            return {
                ...prevData,
                service_type: updatedServiceTypes,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.location.lat || !formData.location.long) {
            alert("Please allow access to your location to proceed.");
            return;
        }
        if (formData.service_type.length === 0) {
            alert("Please select at least one service type.");
            return;
        }
        console.log("Service Provider Signup Data:", formData);
        try {
            const response = await axios.post("http://localhost:5000/api/service/signup", formData)
            setSuccess(response.data.message);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.newUser));
            navigate("/spDashboard");
        } catch (err) {
            console.log(err);
            setLocationError("Signup failed. Please try again.");
        }
    };

    return (
        <div className="service-provider-signup-page">
            <div className="service-provider-signup-container">
                <h2>Create Your Account</h2>
                {locationError && <p className="error-message">{locationError}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="business_name">Business Name</label>
                        <input
                            type="text"
                            id="business_name"
                            name="business_name"
                            placeholder="Enter your business name"
                            value={formData.business_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Service Type</label>
                        <div className="checkbox-group">
                            {[
                                "flat tire",
                                "battery jump-start",
                                "fuel delivery",
                                "towing",
                                "lockout assistance",
                                "vehicle diagnostics",
                                "other",
                            ].map((service) => (
                                <div key={service} className="checkbox-item">
                                    <input
                                        type="checkbox"
                                        id={service}
                                        name="service_type"
                                        value={service}
                                        checked={formData.service_type.includes(service)}
                                        onChange={handleCheckboxChange}
                                    />
                                    <label htmlFor={service}>{service}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="service_area">Service Area</label>
                        <input
                            type="text"
                            id="service_area"
                            name="service_area"
                            placeholder="Enter your service area"
                            value={formData.service_area}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contact">Contact Number</label>
                        <input
                            type="tel"
                            id="contact"
                            name="contact"
                            placeholder="Enter your contact number"
                            value={formData.contact}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="fee">Service Fee</label>
                        <input
                            type="number"
                            id="fee"
                            name="fee"
                            placeholder="Enter your service fee"
                            value={formData.fee}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="signup-button">
                        Sign Up
                    </button>
                </form>
                <p className="login-link">
                    Already have an account?{" "}
                    <span onClick={() => navigate("/login")}>Sign In</span>
                </p>
            </div>
        </div>
    );
}

export default ServiceProviderSignup;