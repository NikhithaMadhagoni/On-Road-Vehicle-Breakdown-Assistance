import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./userDashboard.css";

const UserDashboard = () => {
    const [serviceProviders, setServiceProviders] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleNavigation = (sectionId) => {
        navigate("/");
        setTimeout(() => {
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            }
        }, 100);
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation({ lat: latitude, long: longitude });

                try {
                    const response = await axios.post("http://localhost:5000/api/user/spDisplay", {
                        userLat: latitude,
                        userLng: longitude,
                    });

                    if (Array.isArray(response.data.serviceProviders)) {
                        setServiceProviders(response.data.serviceProviders);
                    } else {
                        console.error("Unexpected data format:", response.data);
                        setServiceProviders([]);
                    }
                } catch (err) {
                    setError("Error fetching service providers");
                    console.error("Fetch Error:", err);
                }
            },
            (err) => setError("Please enable location access")
        );
    }, []);

    // ✅ Handler for Connect button
    const handleConnect = (providerId) => {
        navigate(`/provider/${providerId}`);
    };

    return (
        <div className="dashboard">
            <nav className="navbar">
                <div className="logo">
                    <h1>Breakdown Assist</h1>
                </div>
                <div className="nav-links">
                    <span onClick={() => handleNavigation("homepage")}>Home</span>
                    <span onClick={() => handleNavigation("services")}>About</span>
                    <span onClick={() => handleNavigation("contact")}>Contact Us</span>
                    <span className="profile-icon" onClick={() => navigate("/profile")}>
                        <FaUserCircle size={30} />
                    </span>
                </div>
            </nav>

            <div className="dashboard-container">
                <h1 className="dashboard-title">Nearby Service Providers</h1>

                {error && <div className="message error">{error}</div>}

                <div className="service-provider-list">
                    {serviceProviders.length === 0 ? (
                        <p className="no-service-message">No service providers available</p>
                    ) : (
                        serviceProviders.map((provider) => (
                            <div key={provider._id} className="service-provider-card">
                                <div className="provider-info">
                                    <h2 className="provider-name">{provider.name}</h2>
                                    <p className="provider-business">{provider.business_name}</p>
                                    <p className="provider-location">{provider.service_area}</p>
                                    <p className="provider-distance">
                                        Distance: {provider.distance !== null ? `${provider.distance} km` : "Unknown"}
                                    </p>
                                    <button
                                        className="connect-btn"
                                        onClick={() => handleConnect(provider._id)}
                                    >
                                        Connect
                                    </button>
                                </div>

                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
