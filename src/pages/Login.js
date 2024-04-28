import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./login.css";
import { useAuth } from '../AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [persona, setPersona] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Assuming login function in useAuth

  const handleLogin = async (event) => {
    event.preventDefault();
    // Your login logic here
    login(email, password, persona); // Pass persona along with email and password
    navigate('/'); // Redirect to Blog homepage after login
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleLogin}>
        <label>Email</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Persona</label>
        <select 
          className="loginInput" 
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
        <button type="submit" className="loginButton">Login</button>
      </form>
      <button onClick={() => navigate('/register')} className="loginRegisterButton">Register</button>
    </div>
  );
}
