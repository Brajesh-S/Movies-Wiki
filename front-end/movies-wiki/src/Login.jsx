import React, { useState } from "react";
import { useAuth } from "./authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import "./Login.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const { login, authData } = useAuth();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    await handleLogin(userData);
  };

  const handleLogin = async (userData) => {
    try {
      setIsLoading(true);
      setLoginError(null);

      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
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

        if (responseData && responseData.accessToken) {
          const { accessToken, name } = responseData;
          login(accessToken, name || "");
          navigate("/dashboard");
        } else {
          console.error("Login failed:", responseData.message);
          setLoginError(responseData.message);
        }
      } else {
        console.error("Unexpected status code:", response.status);
        setLoginError("Login failed. Unexpected status code.");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Login failed. An error occurred:", error.message);
      setLoginError("An error occurred during login.");
    }
  };

  return (
    <div className="auth-logo-form">
      <div className="auth-form-container">
        <div className="login-logo">
          <img src={require("./Image4.png")} alt="" />
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            className="form-input"
            value={email}
            type="email"
            placeholder=""
            id="email"
            name="email"
            onChange={handleEmailChange}
            autoComplete="email"
          />
          <label htmlFor="password">Password</label>
          <input
            className="form-input"
            value={password}
            type="password"
            placeholder=""
            id="password"
            name="password"
            onChange={handlePasswordChange}
            autoComplete="current-password"
          />
          <button type="submit" className="submit-button">
            {isLoading ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              "Login"
            )}
          </button>
          {loginError && (
            <Stack
              sx={{
                width: "100%",
                marginBottom: "6px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              spacing={2}
              className="error-alert"
            >
              <Alert
                sx={{
                  backgroundColor: "",
                  color: "red",
                  borderRadius: "10px",
                  padding: "-10px",
                  fontSize: "0.78rem",
                  textAlign: "center",
                }}
                severity="error"
              >
                {loginError}
              </Alert>
            </Stack>
          )}
        </form>
        <button
          onClick={() => navigate("/register")}
          className="toggle-register"
        >
          Don't have an account? Register here.
        </button>
      </div>
    </div>
  );
};
