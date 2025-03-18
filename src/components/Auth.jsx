import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';
import './Auth.css';

const Auth = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleAuth = async (e) => {
        e.preventDefault();
        try {
            // Attempt to log in with email and password
            const response = await login({ email, password });
            const { token, role, user_id } = response.data;

            // Store token and user details in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            localStorage.setItem('user_id', user_id);
            localStorage.setItem('isAuthenticated', 'true');

            // Navigate based on role
            if (role.toLowerCase() === 'admin') {
                navigate('/admin-dashboard');
            } else {
                navigate('/user-dashboard');
            }
            onClose();
        } catch (error) {
            alert(error.response?.data?.error || 'Login failed');
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>X</button>
                <h2>Login</h2>
                <form onSubmit={handleAuth}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div className="form-actions">
                        <button type="submit" className="submit-button">
                            Login
                        </button>
                        <button
                            type="button"
                            className="toggle-button"
                            onClick={() => alert('Signup functionality is not implemented.')}
                        >
                            Need an account? Signup
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Auth;