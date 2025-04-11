import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/signin", {
                email,
                password
            })
            if (response.status === 200) {
                setSuccess(response.data.message);
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.newUser));
                if (response.data.newUser.role === "service_provider") {
                    navigate("/spDashboard");
                } else {
                    navigate("/userDashboard");
                }
            }
            else if (response.status === 400) {
                setError(response.data.message)
            }
        }
        catch (error) {
            console.error("Signin Error:", error);
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        }
    };
    return (
        <div className="login-page">
            <div className="login-container">
                <h2>Sign in to your account</h2>
                {error && (
                    <div style={{
                        color: "red",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                        fontSize: "20px",
                        fontWeight: "bold",
                        textAlign: "center"
                    }}>
                        {error}
                    </div>
                )}
                {success && (
                    <div style={{
                        color: "green",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                        fontSize: "20px",
                        fontWeight: "bold",
                        textAlign: "center"
                    }}>
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className="form-group">
                        <a href="#" className="forgot-password">Forgot Password?</a>
                    </div>
                    <button type="submit" className="login-button">Sign in</button>
                    <h4>Or</h4>
                    <div className="social-login">
                        <button className="google-button">Continue with Google</button>
                    </div>
                    <p className="signup-link">Don't have an account? <a className="signup" href="./register">Sign Up</a></p>
                </form>
            </div>
        </div>

    );
}

export default Login;
