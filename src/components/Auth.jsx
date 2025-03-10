
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // Import the CSS for styling

const Auth = ({ onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [userType, setUserType] = useState('user'); // State to track user type
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState(''); // State for name
    const navigate = useNavigate();

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        
        // Dummy authentication - Replace this with actual authentication logic
        if (userType === "admin" && email === "admin@example.com" && password === "admin123") {
            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("role", "admin");
            navigate('/admin-dashboard');
            onClose();
        } else if (userType === "user" && email === "user@example.com" && password === "user123") {
            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("role", "user");
            navigate('/user-dashboard');
            onClose();
        } else {
            alert("Invalid credentials");
        }
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        // Handle sign-up logic here (e.g., send data to server)
        alert("Sign up successful!");
        onClose(); // Close modal after sign-up
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>X</button>
                
                <h2>{isLogin ? "Login" : "Sign Up"}</h2>

                {/* User Type Selection */}
                {isLogin && (
                    <div className="user-type-selection">
                        <button className={`login-button ${userType === 'user' ? 'active' : ''}`} onClick={() => setUserType('user')}>User Login</button>
                        <button className={`login-button ${userType === 'admin' ? 'active' : ''}`} onClick={() => setUserType('admin')}>Admin Login</button>
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
                        <button type="submit" className="submit-button">{isLogin ? "Login" : "Sign Up"}</button>
                        <p className="toggle-link">
                            {isLogin 
                                ? "Don't have an account? " 
                                : "Already have an account? "}
                            <span onClick={toggleForm}>{isLogin ? "Sign up" : "Login"}</span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Auth;