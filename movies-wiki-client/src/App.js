import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";
import { AuthProvider } from "./authContext";

import { Login } from "./Login";
import { Register } from "./Register";
import Dashboard from "./dashboard";

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
