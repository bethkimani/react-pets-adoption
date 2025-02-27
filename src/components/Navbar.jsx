import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { FaHome, FaSearch, FaUser, FaPaw, FaInfoCircle } from 'react-icons/fa'; 
import AuthModal from './Auth';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const openModal = () => {
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
        <div className="login-item" onClick={openModal}>
          <FaUser className="nav-icon" />
          <span className="nav-label">Login</span>
        </div>
      </div>
      {isModalOpen && <AuthModal onClose={closeModal} />}
    </nav>
  );
};

export default Navbar;