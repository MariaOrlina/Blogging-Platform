import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import "./register.css";

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [persona, setPersona] = useState(''); // State to hold the selected persona
  const { register } = useAuth(); // Assuming register function exists in useAuth
  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();
    // Pass persona along with email and password for registration logic
    register(email, password, persona); 
    navigate('/'); // Navigate to homepage after successful registration
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleRegister}>
        <label>Email</label>
        <input 
          className="registerInput" 
          type="text" 
          placeholder="Enter your email..." 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input 
          className="registerInput" 
          type="password" 
          placeholder="Enter your password..." 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Persona</label>
        <select 
          className="registerInput" // Reuse the registerInput style for the select dropdown
          value={persona} 
          onChange={(e) => setPersona(e.target.value)}
        >
          <option value="">Select Persona</option>
          <option value="Student">Student</option>
          <option value="Faculty">Faculty</option>
          <option value="Staff">Staff</option>
          <option value="Moderator">Moderator</option>
          <option value="Administrator">Administrator</option>
        </select>
        <button className="registerButton">Register</button>
      </form>
      <button onClick={() => navigate('/login')} className="registerLoginButton">Login</button>
    </div>
  );
}
