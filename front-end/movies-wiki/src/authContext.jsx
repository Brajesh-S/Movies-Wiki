import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    token: localStorage.getItem("accessToken") || null,
    name: null,
  });

  const login = (newToken, name) => {
    setAuthData({
      token: newToken,
      name: name,
    });
    localStorage.setItem("accessToken", newToken);
    localStorage.setItem("name", name);
  };

  const logout = () => {
    setAuthData({
      token: null,
      name: null,
    });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("name");
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
