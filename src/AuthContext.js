import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const login = (email, password) => {
    const user = JSON.parse(localStorage.getItem(email));
    if (user && user.password === password) {
      setCurrentUser({ email, password });
      localStorage.setItem('user', JSON.stringify({ email, password }));
    } else {
      alert("Invalid credentials");
    }
  };

  const register = (email, password) => {
    const existingUser = JSON.parse(localStorage.getItem(email));
    if (!existingUser) {
      localStorage.setItem(email, JSON.stringify({ email, password }));
      setCurrentUser({ email, password });
      localStorage.setItem('user', JSON.stringify({ email, password }));
    } else {
      alert("User already exists");
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
