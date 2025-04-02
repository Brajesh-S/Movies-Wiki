import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import "./auth.css";

export const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [registerError, setRegisterError] = useState(null);
  const [registerSuccess, setRegisterSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setRegisterError(null);
    setRegisterSuccess(null);

    try {
      const response = await axios.post(
        "https://movies-wiki.onrender.comapi/auth/register",
        formData
      );
      
      if (response.status === 201) {
        setRegisterSuccess("Registration successful! Redirecting...");
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      setRegisterError(error.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="auth-wrapper">
    <div className="auth-form-container">
      <div className="login-logo">
        <img src={require("../../assets/Image4.png")} alt="App Logo" />
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="firstName" className="form-label">
          First Name
        </label>
        <input
          className="form-input"
          name="firstName"
          value={formData.firstName}
          type="text"
          id="firstName"
          onChange={handleChange}
          required
        />

        <label htmlFor="lastName" className="form-label">
          Last Name
        </label>
        <input
          className="form-input"
          name="lastName"
          value={formData.lastName}
          type="text"
          id="lastName"
          onChange={handleChange}
          required
        />

        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          className="form-input"
          name="email"
          value={formData.email}
          type="email"
          id="email"
          onChange={handleChange}
          required
        />

        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          className="form-input"
          name="password"
          value={formData.password}
          type="password"
          id="password"
          onChange={handleChange}
          required
        />

        <button 
          type="submit" 
          className="auth-button"
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress color="inherit" size={20} />
          ) : (
            "Register"
          )}
        </button>

        {registerError && (
          <Stack spacing={2} className="auth-alert">
            <Alert severity="error" className="error-alert">
              {registerError}
            </Alert>
          </Stack>
        )}

        {registerSuccess && (
          <Stack spacing={2} className="auth-alert">
            <Alert severity="success" className="success-alert">
              {registerSuccess}
            </Alert>
          </Stack>
        )}
      </form>

      <button
        onClick={() => navigate("/")}
        className="toggle-button"
      >
        Already have an account? Login here.
      </button>
    </div>
    </div>
  );
};