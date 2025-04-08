import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, signup, resetPassword } from '../api';
import './Auth.css';

const Auth = ({ onClose, initialMode }) => {
    const [isLogin, setIsLogin] = useState(initialMode === 'login');
    const [showReset, setShowReset] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleAuth = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setMessage('');

        try {
            if (showReset) {
                // Handle password reset request via email
                const response = await resetPassword({ email });
                setMessage(response.data.message || 'A password reset link has been sent to your email if it exists.');
                setShowReset(false);
                setEmail('');
            } else if (isLogin) {
                // Handle login
                const response = await login({ email, password });
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
            } else {
                // Handle signup
                const response = await signup({
                    name,
                    phone_number,
                    email,
                    password,
                });
                setMessage('Signup successful! Please log in.');
                setIsLogin(true);
                setName('');
                setPhoneNumber('');
                setEmail('');
                setPassword('');
            }
        } catch (error) {
            console.error('Auth error:', error.response || error.message);
            const errorMessage = error.response?.data?.error ||
                                (showReset ? 'Failed to send reset email. Please try again.' : isLogin ? 'Login failed' : 'Signup failed') ||
                                'An unexpected error occurred';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>X</button>
                <h2>{showReset ? 'Reset Password' : isLogin ? 'Login' : 'Sign Up'}</h2>
                {message && <p style={{ color: 'green' }}>{message}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleAuth}>
                    {!isLogin && !showReset && (
                        <>
                            <input
                                type="text"
                                id="signup-name"
                                name="name"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <input
                                type="tel"
                                id="signup-phone"
                                name="phone_number"
                                placeholder="Phone Number"
                                value={phone_number}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </>
                    )}
                    <input
                        type="email"
                        id="auth-email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {!showReset && (
                        <input
                            type="password"
                            id="auth-password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    )}
                    <div className="form-actions">
                        <button type="submit" className="submit-button" disabled={isLoading}>
                            {isLoading ? 'Processing...' : showReset ? 'Send Reset Link' : isLogin ? 'Login' : 'Sign Up'}
                        </button>
                        {isLogin && !showReset && (
                            <button
                                type="button"
                                className="toggle-button"
                                onClick={() => setShowReset(true)}
                            >
                                Forgot Password?
                            </button>
                        )}
                        {showReset ? (
                            <button
                                type="button"
                                className="toggle-button"
                                onClick={() => setShowReset(false)}
                            >
                                Back to Login
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="toggle-button"
                                onClick={() => setIsLogin(!isLogin)}
                            >
                                {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Auth;