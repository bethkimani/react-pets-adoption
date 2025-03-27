import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { FaHome, FaSearch, FaUser, FaPaw, FaInfoCircle, FaSignInAlt } from 'react-icons/fa'; 
import AuthModal from './Auth';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [modalType, setModalType] = useState('login'); // To track which form to show

  const openModal = (type) => {
    setModalType(type); // Set whether it's login or signup
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleMenu = () => {
    setIsMobile(!isMobile);
  };

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
          <div className="login-item" onClick={() => openModal('login')}>
            <FaUser className="nav-icon" />
            <span className="nav-label">Login</span>
          </div>
          <div className="signup-item" onClick={() => openModal('signup')}>
            <FaSignInAlt className="nav-icon" />
            <span className="nav-label">Sign Up</span>
          </div>
        </div>
      </div>
      {isModalOpen && <AuthModal onClose={closeModal} initialMode={modalType} />}
    </nav>
  );
};

export default Navbar;