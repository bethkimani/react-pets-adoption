import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, signup } from '../api';
import './Auth.css';

const Auth = ({ onClose, initialMode }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [userType, setUserType] = useState('user');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [role_id, setRoleId] = useState('1'); // Default to User (role_id=1)
    const navigate = useNavigate();

    // Set initial mode based on prop
    useEffect(() => {
        setIsLogin(initialMode === 'login');
    }, [initialMode]);

    const handleAuth = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
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
            } else {
                const response = await signup({
                    name,
                    phone_number,
                    email,
                    password,
                    role_id
                });
                console.log('Signup response:', response.data);
                alert('Signup successful! Please log in.');
                setIsLogin(true);
                setName('');
                setPhoneNumber('');
                setEmail('');
                setPassword('');
                setRoleId('1');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.error || 
                                (isLogin ? 'Login failed' : 'Signup failed') || 
                                'An unexpected error occurred';
            console.error('Auth error:', errorMessage);
            alert(errorMessage);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>X</button>
                <h2>{isLogin ? 'Login' : 'Signup'}</h2>
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
                <form onSubmit={handleAuth}>
                    {!isLogin && (
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
                    <input
                        type="password"
                        id="auth-password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {!isLogin && (
                        <select
                            id="signup-role"
                            name="role_id"
                            value={role_id}
                            onChange={(e) => setRoleId(e.target.value)}
                            required
                        >
                            <option value="1">User</option>
                            <option value="2">Admin</option>
                        </select>
                    )}
                    <div className="form-actions">
                        <button type="submit" className="submit-button">
                            {isLogin ? 'Login' : 'Signup'}
                        </button>
                        <button
                            type="button"
                            className="toggle-button"
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin ? 'Need an account? Signup' : 'Already have an account? Login'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Auth;