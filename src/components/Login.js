import "./Form.css"
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cookies, useCookies } from 'react-cookie';

export const Login = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useCookies(["myToken"]);
    const [cookies, setCookie, removeCookie] = useCookies(["myToken"]);

    const navigate = useNavigate();

    //checking if the user exists from database
    const loginUser = async () => {
        try {
            const response = await fetch("http://localhost:8000/user/Login/", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            setCookie("myToken", data.token, { path: "/", maxAge: 3600 }); // Expires in 1 hour
            console.log("Logged in successfully");
            navigate("/Home");
        } catch (err) {
            setError(err.message);
        }

    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            loginUser();
        }, 2000);
    }

    return (
        <div className="auth-wrapper">
            <form onSubmit={handleSubmit} className="auth-form">
                <h1 className="auth-title">Sign In</h1>

                <div className="auth-fields">
                    <div className="field-group">
                        <label className="field-label">Email</label>
                        <div className="field-wrapper">
                            <input
                                required
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="field-input"
                            />
                        </div>
                    </div>

                    <div className="field-group">
                        <label className="field-label">Password</label>
                        <div className="field-wrapper">
                            <input
                                required
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="field-input"
                            />
                        </div>
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" disabled={loading} className="auth-button">
                        {loading ? "Loading..." : "Sign In"}
                    </button>

                    <p className="auth-link">
                        Don't have an account? <a href="/">Sign up</a>
                    </p>

                </div>
            </form>
        </div>
    );
}


export default Login
