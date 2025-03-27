
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';
import './Auth.css';

const LoginModal = ({ onClose }) => {
  const [userType, setUserType] = useState('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password, user_type: userType });
      const { token, role, user_id } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('user_id', user_id);
      localStorage.setItem('isAuthenticated', 'true');
      if (role.toLowerCase() === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/user-dashboard');
      }
      onClose();
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Login failed';
      console.error('Login error:', errorMessage);
      alert(errorMessage);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Login</h2>
        <div className="user-type-selection">
          <button
            className={`login-button ${userType === 'user' ? 'active' : ''}`}
            onClick={() => setUserType('user')}
          >
            User Login
          </button>
          <button
            className={`login-button ${userType === 'admin' ? 'active' : ''}`}
            onClick={() => setUserType('admin')}
          >
            Admin Login
          </button>
        </div>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            id="login-email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            id="login-password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="form-actions">
            <button type="submit" className="submit-button">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;