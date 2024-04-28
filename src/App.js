// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Blog from './components/Blog';
import Write from './pages/Write';
import View from './pages/View';
import ViewPosts from './pages/ViewPosts';
import AcademicResource from './pages/AcademicResource';
import CareerServices from './pages/CareerServices';
import Campus from './pages/Campus';
import Culture from './pages/Culture';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Blog />
              </ProtectedRoute>
            }
          />
          <Route path="/write" element={<ProtectedRoute><Write /></ProtectedRoute>} />
          <Route path="/view" element={<ProtectedRoute><View /></ProtectedRoute>} />
          <Route path="/view-posts" element={<ProtectedRoute><ViewPosts /></ProtectedRoute>} />
          <Route path="/academic-resource" element={<ProtectedRoute><AcademicResource /></ProtectedRoute>} />
          <Route path="/career-services" element={<ProtectedRoute><CareerServices /></ProtectedRoute>} />
          <Route path="/campus" element={<ProtectedRoute><Campus /></ProtectedRoute>} />
          <Route path="/culture" element={<ProtectedRoute><Culture /></ProtectedRoute>} />

          {/* Add other routes here */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
