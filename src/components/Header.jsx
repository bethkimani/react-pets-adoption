import React from 'react';
import { FaFacebookF, FaTwitter, FaWhatsapp, FaTelegramPlane, FaLinkedinIn, FaInstagram, FaYoutube } from 'react-icons/fa';
import '../App.css'; 

const Header = () => {
  return (
    <div>
      {/* Top Green Bar */}
      <div className="header-top">
        <div className="header-links">
          {/* Removed FAQs, Help, and Support links */}
        </div>
        <div className="header-icons">
          <a href="#" className="social-icon"><FaFacebookF /></a>
          <a href="#" className="social-icon"><FaTwitter /></a>
          <a href="#" className="social-icon"><FaWhatsapp /></a>
          <a href="#" className="social-icon"><FaTelegramPlane /></a>
          <a href="#" className="social-icon"><FaLinkedinIn /></a>
          <a href="#" className="social-icon"><FaInstagram /></a>
          <a href="#" className="social-icon"><FaYoutube /></a>
        </div>
      </div>
      <div className="header-bottom">
        <div className="header-title">🐾 Adoptly</div> {/* Updated Title */}
        <div className="contact-info">
          <div className="contact-item">
            <strong>Opening Hours:</strong>
            <div>8:00 AM - 8:00 PM</div>
          </div>
          <div className="contact-item">
            <strong>Email Us:</strong>
            <div><a href="mailto:info@petadoption.com">info@petadoption.com</a></div>
          </div>
          <div className="contact-item">
            <strong>Call Us:</strong>
            <div><a href="tel:40123456789">401-234-5678</a></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;