import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = ({ onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        
        // Dummy authentication - Replace this with actual authentication logic
        if (email === "admin@example.com" && password === "admin123") {
            localStorage.setItem("isAuthenticated", "true"); // Store authentication state
            localStorage.setItem("role", "admin"); // Store user role
            navigate('/admin-dashboard'); // Redirect to admin dashboard
            onClose(); // Close the modal
        } else {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>X</button>
                {isLogin ? (
                    <div className="login-form">
                        <h2>Login</h2>
                        <form onSubmit={handleLogin}>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="form-actions">
                                <button type="submit">Login</button>
                                <p className="signup-link">
                                    Don't have an account? <span onClick={toggleForm}>Sign up</span>
                                </p>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="signup-form">
                        <h2>Sign Up</h2>
                        <form>
                            <input type="text" placeholder="Name" />
                            <input type="email" placeholder="Email" />
                            <input type="password" placeholder="Password" />
                            <div className="form-actions">
                                <button type="submit">Sign Up</button>
                                <p className="login-link">
                                    Already have an account? <span onClick={toggleForm}>Login</span>
                                </p>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Auth;