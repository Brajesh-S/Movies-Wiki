import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import "./register.css";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [registerError, setRegisterError] = useState(null);
  const [registerSuccess, setRegisterSuccess] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: pass,
    };

    setIsLoading(true);
    setRegisterError(null);
    setRegisterSuccess(null);

    axios
      .post("https://movies-wiki.onrender.com/api/auth/register", userData)
      .then((response) => {
        setRegisterSuccess("Registration is successful. ");
      })
      .catch((error) => {
        if (error.response) {
          console.error("Response Data:", error.response.data);
          setRegisterError("An error occurred during registration");
          console.error("Response Status:", error.response.status);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error:", error.message);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="auth-logo-form">
      <div className="auth-form-container">
        <div className="login-logo">
          <img src={require("./Image4.png")} alt="" />
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          <label htmlFor="name">First name </label>
          <input
            className="form-input"
            value={firstName}
            type="text"
            placeholder=""
            id="name"
            name="name"
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label htmlFor="name">Last name</label>
          <input
            className="form-input"
            value={lastName}
            type="text"
            placeholder=""
            id="name"
            name="name"
            onChange={(e) => setLastName(e.target.value)}
          />

          <label htmlFor="email">Email</label>
          <input
            className="form-input"
            value={email}
            type="email"
            placeholder=""
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            className="form-input"
            value={pass}
            type="password"
            placeholder=""
            id="password"
            name="password"
            onChange={(e) => setPass(e.target.value)}
          />

          <button type="submit" className="register-button">
            {isLoading ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              "Register"
            )}
          </button>

          {registerError && (
            <Stack
              sx={{
                width: "100%",
                marginBottom: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              spacing={2}
            >
              <Alert
                sx={{
                  color: "red",
                  border: "1px solid #grey",
                  borderRadius: "5px",
                  textAlign: "center",
                }}
                severity="error"
                className="error-alert"
              >
                {registerError}
              </Alert>
            </Stack>
          )}
          {registerSuccess && (
            <Stack
              sx={{
                width: "100%",
                marginBottom: "-18px",
                marginTop: "15px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              spacing={2}
            >
              <Alert
                sx={{
                  color: "#white",
                  border: "1px solid #4CAF50",
                  borderRadius: "10px",
                  textAlign: "center",
                  fontSize: "0.79rem",
                }}
                severity="success"
                className="success-alert"
              >
                {registerSuccess}
              </Alert>
            </Stack>
          )}
        </form>

        <button onClick={() => navigate("/")} className="toggle-login">
          Already have an account? Login here.
        </button>
      </div>
    </div>
  );
};
