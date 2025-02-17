import "./Form.css"
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export const Login = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
      <div className="auth-wrapper">
        <form className="auth-form">
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
  