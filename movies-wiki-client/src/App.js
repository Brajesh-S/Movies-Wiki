import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";
import { AuthProvider } from "./context/authContext";
import { Login } from "./components/Auth/Login";
import { Register } from "./components/Auth/register";
import Dashboard from "./components/Dashboard";

function App() { 
  return (
    <StyledEngineProvider injectFirst>
      <AuthProvider>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </StyledEngineProvider>
  );
}

export default App;
