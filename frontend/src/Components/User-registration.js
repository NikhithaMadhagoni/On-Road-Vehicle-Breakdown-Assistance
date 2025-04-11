import React, { useEffect, useState } from "react";
import "./User-registration.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
    const navigate = useNavigate();
    const [location, setLocation] = useState({ lat: null, long: null });
    const [locationError, setLocationError] = useState("");
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [contact, setContact] = useState("");
    const [success, setSuccess] = useState("");

    // Fetch user's location on component mount
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        long: position.coords.longitude,
                    });
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

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setVehicleTypes((prevTypes) =>
            checked ? [...prevTypes, value] : prevTypes.filter((type) => type !== value)
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!location.lat || !location.long) {
            alert("Please allow access to your location to proceed.");
            return;
        }
        if (vehicleTypes.length === 0) {
            alert("Please select at least one vehicle type.");
            return;
        }
        try {
            const response = await axios.post("http://localhost:5000/api/user/signup", {
                username,
                email,
                password,
                contact,
                vehicleType: vehicleTypes,
                location,
            });
            setSuccess(response.data.message);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.newUser));
            navigate("/userDashboard");
        } catch (error) {
            setLocationError(error.response?.data?.message || "Signup failed. Please try again.");
            console.error("Signup Error:", error);
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-container">
                <h2>Create Your Account</h2>
                {locationError && <p className="error-message">{locationError}</p>}
                {success && <p className="success-message">{success}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter your username"
                            onChange={(e) => setUserName(e.target.value)}
                            value={username}
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
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
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
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
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
                            pattern="[0-9]{10}" // Ensures only numbers are entered
                            onChange={(e) => setContact(e.target.value)}
                            value={contact}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Vehicle Type</label>
                        <div className="checkbox-group">
                            {["2-Wheeler", "4-Wheeler", "6-Wheeler"].map((type) => (
                                <div key={type} className="checkbox-item">
                                    <input
                                        type="checkbox"
                                        id={type}
                                        name="vehicleType"
                                        value={type}
                                        checked={vehicleTypes.includes(type)}
                                        onChange={handleCheckboxChange}
                                    />
                                    <label htmlFor={type}>{type}</label>
                                </div>
                            ))}
                        </div>
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

export default Signup;