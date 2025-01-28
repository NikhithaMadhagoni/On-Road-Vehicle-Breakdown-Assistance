import React, { useState } from "react";
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Email:", email);
        console.log("Password:", password);
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h2>Sign in to your account</h2>
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
                    <h5>Continue with</h5>
                    <div className="social-login">
                        <button className="google-button">Google</button>
                    </div>
                    <p className="signup-link">Don't have an account? <a className="signup" href="./register">Sign Up</a></p>
                </form>
            </div>
        </div>
    );
}

export default Login;
