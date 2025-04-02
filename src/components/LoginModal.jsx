// LoginModal.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, resetPassword } from '../api'; // Add resetPassword import
import './Auth.css';

const LoginModal = ({ onClose }) => {
  const [userType, setUserType] = useState('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showReset, setShowReset] = useState(false); // State for reset form
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

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await resetPassword({ email });
      alert('Password reset link has been sent to your email.');
      setShowReset(false);
      setEmail('');
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Reset failed';
      console.error('Reset error:', errorMessage);
      alert(errorMessage);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>X</button>
        <h2>{showReset ? 'Reset Password' : 'Login'}</h2>
        
        {!showReset ? (
          <>
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
              <button
                type="button"
                className="toggle-button"
                onClick={() => setShowReset(true)}
              >
                Forgot Password?
              </button>
            </form>
          </>
        ) : (
          <form onSubmit={handleResetPassword}>
            <input
              type="email"
              id="reset-email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="form-actions">
              <button type="submit" className="submit-button">Reset Password</button>
            </div>
            <button
              type="button"
              className="toggle-button"
              onClick={() => setShowReset(false)}
            >
              Back to Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginModal;