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
    const [sessionExpiry, setSessionExpiry] = useState(null);
    const [timeLeft, setTimeLeft] = useState(null);
    const [isReturningUser, setIsReturningUser] = useState(false);
    const [cooldownRemaining, setCooldownRemaining] = useState(null);

    const navigate = useNavigate();

    //checking if the user exists from database
    const loginUser = async () => {
        try {
            const response = await fetch("http://localhost:8000/user/Login/", {
                method: "POST",
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

        if (cooldownRemaining) {
            setError(
                `Please wait ${cooldownRemaining} hours before signing in again`,
            );
            setLoading(false);
            return;
        }

        setTimeout(() => {
            setLoading(false);
            loginUser();
        }, 2000);
    }

    ///setting on session timer 
    useEffect(() => {
        if (sessionExpiry) {
            const updateTimeLeft = () => {
                const now = new Date();
                const expiryTime = new Date(sessionExpiry);
                const diff = expiryTime - now;
                const hoursLeft = Math.max(0, Math.floor(diff / (1000 * 60 * 60)));
                const minutesLeft = Math.max(
                    0,
                    Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
                );
                setTimeLeft(`${hoursLeft}h ${minutesLeft}m`);
            };

            updateTimeLeft();
            const interval = setInterval(updateTimeLeft, 60000);

            return () => clearInterval(interval);
        }
    }, [sessionExpiry]);

    //check returning loging in user 
    useEffect(() => {
        if (typeof window !== "undefined") {
            const previousLogins = JSON.parse(
                localStorage.getItem("previousLogins") || "{}",
            );
            if (email && previousLogins[email]) {
                const lastLogout = new Date(previousLogins[email].lastLogout || 0);
                const now = new Date();
                const hoursSinceLogout = (now - lastLogout) / (1000 * 60 * 60);

                if (hoursSinceLogout < 8) {
                    setCooldownRemaining(Math.ceil(8 - hoursSinceLogout));
                    setIsReturningUser(true);
                } else {
                    setCooldownRemaining(null);
                    setIsReturningUser(true);
                }
            } else {
                setIsReturningUser(false);
                setCooldownRemaining(null);
            }
        }
    }, [email]);

    const getCooldownMessage = () => {
        if (!isReturningUser) {
            return "Your session will remain active until you log out.";
        }
        if (cooldownRemaining) {
            return `Please wait ${cooldownRemaining} hours before signing in again.`;
        }
        return "Welcome back! Your session will remain active until you log out.";
    };

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
                    <div className="field-group">
                        <p className="session-info">
                            {getCooldownMessage()}
                        </p>
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" disabled={loading} className="auth-button">
                        {loading 
                        ? "Loading..."
                        :cooldownRemaining
                        ? `Cooldown: ${cooldownRemaining}h remaining `
                        : "Sign In"}
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
