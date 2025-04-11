import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import "./auth.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const { login, authData } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { email, password };
    await handleLogin(userData);
  };

  const handleLogin = async (userData) => {
    try {
      setIsLoading(true);
      setLoginError(null);

      const response = await axios.post(
        "https://movies-wiki.onrender.com/api/auth/login",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData.token}`,
          },
        }
      );

      if (response.status === 200) {
        const responseData = response.data;
        if (responseData?.accessToken) {
          login(responseData.accessToken, responseData.name || "");
          navigate("/dashboard");
        } else {
          setLoginError(responseData.message || "Login failed");
        }
      }
    } catch (error) {
      setLoginError(error.response?.data?.message || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
    <div className="auth-form-container">
      <div className="login-logo">
        <img src={require("../../assets/Image4.png")} alt="App Logo" />
      </div>
      
      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          className="form-input"
          value={email}
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />

        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          className="form-input"
          value={password}
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
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
            "Login"
          )}
        </button>

        {loginError && (
          <Stack spacing={2} className="auth-alert">
            <Alert severity="error" className="error-alert">
              {loginError}
            </Alert>
          </Stack>
        )}
      </form>

      <button
        onClick={() => navigate("/register")}
        className="toggle-button"
      >
        Don't have an account? Register here.
      </button>
    </div>
    </div>
  );
};