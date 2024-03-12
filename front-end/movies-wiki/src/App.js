import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import { AuthProvider } from './authContext'
import axios from 'axios';
// import './App.css';
import { Login } from "./Login";
import { Register } from "./Register";
import Dashboard from './dashboard';



function App() {
  const [currentForm, setCurrentForm] = useState("login"); // Default to login

  const [data, setData] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  const toggleForm = (formName) => {
    console.log("toogling form:",formName )
    setCurrentForm(formName);
  };


  


  useEffect(() => {
    // Check if an access token exists in client-side storage
    const token = localStorage.getItem('accessToken');
    if (token) {
      setLoggedIn(true);
    }
  }, []); 


  return (
    <StyledEngineProvider injectFirst>
      <AuthProvider>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Login onFormSwitch={toggleForm} />} />
              <Route path="/register" element={<Register onFormSwitch={toggleForm} />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
            
            
    </div>
    </BrowserRouter>
  </AuthProvider>
  </StyledEngineProvider>
    );
  }

export default App;


