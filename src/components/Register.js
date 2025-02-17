import "./Form.css"
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export const Register = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [department, setDepartment] = useState("");
  
    return (
      <div className="signup-container">
        {/* noValidate onSubmit={onSubmit}  */}
        <form className="signup-form">
          <h1 className="form-title">Create Account</h1>
  
          <div className="form-fields">
            <div className="form-group">
              <label>First Name</label>
              <div className="input-container">
                <input
                  required
                  name="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter your first name"
                />
              </div>
            </div>
  
            <div className="form-group">
              <label>Surname</label>
              <div className="input-container">
                <input
                  required
                  name="surname"
                  type="text"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  placeholder="Enter your surname"
                />
              </div>
            </div>
  
            <div className="form-group">
              <label>Email</label>
              <div className="input-container">
                <input
                  required
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
            </div>
  
            <div className="form-group">
              <label>Department</label>
              <div className="input-container">
                <select
                  required
                  name="department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <option value="">Select Department</option>
                  <option value="HR">HR</option>
                  <option value="Marketing">Marketing</option>
                  <option value="IT">IT</option>
                  <option value="Management">Management</option>
                </select>
              </div>
            </div>
  
            <div className="form-group">
              <label>Password</label>
              <div className="input-container">
                <input
                  required
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>
            </div>
  
            {/*error && <div className="error-message">{error}</div>*/}
  
            <button type="submit" className="submit-button">
              {loading ? "Loading..." : "Sign Up"}
            </button>
  
            <p className="signin-link">
              Already have an account? <a href="/Login">Sign in</a>
            </p>
          </div>
        </form>
      </div>
    );
  }
  
export default Register
  
  