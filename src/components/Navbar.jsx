// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch, FaUser, FaPaw, FaInfoCircle } from 'react-icons/fa';
import Auth from './Auth'; // Import the combined Auth modal

const Navbar = () => {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authMode, setAuthMode] = useState('login'); // Default to login mode
    const [isMobile, setIsMobile] = useState(false);

    const openAuthModal = (mode) => {
        setAuthMode(mode);
        setIsAuthModalOpen(true);
    };

    const closeAuthModal = () => {
        setIsAuthModalOpen(false);
    };

    const toggleMenu = () => setIsMobile(!isMobile);

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="brand-name">Adoptly</div>
                <div className="menu-toggle" onClick={toggleMenu}>
                    <div className={`bar ${isMobile ? 'active' : ''}`}></div>
                    <div className={`bar ${isMobile ? 'active' : ''}`}></div>
                    <div className={`bar ${isMobile ? 'active' : ''}`}></div>
                </div>
                <div className={`nav-links ${isMobile ? 'active' : ''}`}>
                    <div className="nav-item">
                        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                            <FaHome className="nav-icon" />
                            <span className="nav-label">Home</span>
                        </Link>
                    </div>
                    <div className="nav-item">
                        <Link to="/catalogue" style={{ textDecoration: 'none', color: 'white' }}>
                            <FaPaw className="nav-icon" />
                            <span className="nav-label">Catalogue</span>
                        </Link>
                    </div>
                    <div className="nav-item">
                        <Link to="/search" style={{ textDecoration: 'none', color: 'white' }}>
                            <FaSearch className="nav-icon" />
                            <span className="nav-label">Search</span>
                        </Link>
                    </div>
                    <div className="nav-item">
                        <Link to="/about" style={{ textDecoration: 'none', color: 'white' }}>
                            <FaInfoCircle className="nav-icon" />
                            <span className="nav-label">About Us</span>
                        </Link>
                    </div>
                </div>
                <div className="auth-buttons">
                    <div
                        className="auth-item"
                        onClick={() => openAuthModal('login')}
                        title="Login / Sign Up"
                    >
                        <FaUser className="nav-icon" />
                        <span className="nav-label">Account</span>
                    </div>
                </div>
            </div>
            {isAuthModalOpen && (
                <Auth
                    onClose={closeAuthModal}
                    initialMode={authMode}
                />
            )}
        </nav>
    );
};

export default Navbar;