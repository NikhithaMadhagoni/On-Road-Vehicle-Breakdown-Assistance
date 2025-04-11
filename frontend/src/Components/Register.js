import React from "react";
import { useNavigate } from "react-router-dom"; // React Router for navigation
import "./Register.css";

function Register() {
    const navigate = useNavigate(); // Hook for programmatic navigation

    const handleNavigation = (userType) => {
        if (userType === "user") {
            navigate("/user-registration"); // Navigate to the User registration page
        } else if (userType === "service-provider") {
            navigate("/ServiceProvider-Registration"); // Navigate to the Service Provider registration page
        }
    };

    return (
        <div className="register-selection-container">
            <h2>Select User Type</h2>
            <div className="selection-boxes">
                <div
                    className="selection-box"
                    onClick={() => handleNavigation("user")}
                >
                    <h3>User</h3>
                    {/* <p>Register to request breakdown assistance.</p><br /> */}
                </div>
                <div
                    className="selection-box"
                    onClick={() => handleNavigation("service-provider")}
                >
                    <h3>Service Provider</h3>
                    {/* <p>Join our network to offer vehicle assistance services</p> */}
                </div>
            </div>
        </div>
    );
}

export default Register;
