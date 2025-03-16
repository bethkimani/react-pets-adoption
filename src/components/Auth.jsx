import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, signup } from '../api';
import './Auth.css';

const Auth = ({ onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [userType, setUserType] = useState('user');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login({ email, password, user_type: userType });
            console.log('Login response:', response.data); // Debug log
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
            alert(error.response?.data?.error || 'Login failed');
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await signup({ name, email, password, role: 'user' });
            alert('Sign up successful! Please log in.');
            setIsLogin(true);
        } catch (error) {
            alert(error.response?.data?.error || 'Sign up failed');
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>X</button>
                <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
                {isLogin && (
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
                )}
                <form onSubmit={isLogin ? handleLogin : handleSignUp}>
                    {isLogin ? (
                        <>
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
                        </>
                    ) : (
                        <>
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
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
                        </>
                    )}
                    <div className="form-actions">
                        <button type="submit" className="submit-button">
                            {isLogin ? 'Login' : 'Sign Up'}
                        </button>
                        <p className="toggle-link">
                            {isLogin ? "Don't have an account? " : 'Already have an account? '}
                            <span onClick={toggleForm}>{isLogin ? 'Sign up' : 'Login'}</span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Auth;