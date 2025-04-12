// components/Footer.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer animate__animated animate__fadeInUp animate__delay-2s" id="faq-section">
            <div className="footer-container">
                <div className="footer-section">
                    <h5>Contact Us</h5>
                    <p><FontAwesomeIcon icon={faPhoneAlt} /> 401-234-5678</p>
                    <p><FontAwesomeIcon icon={faEnvelope} /> adopt@petadoptionagency.com</p>
                </div>

                <div className="footer-section">
                    <h5>Adoption Info</h5>
                    <ul>
                        <li><a href="#">Why Adopt?</a></li>
                        <li><a href="#">Adoption Process</a></li>
                        <li><a href="#">Available Pets</a></li>
                        <li><a href="#">Success Stories</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h5>Newsletter</h5>
                    <p>Subscribe for pet adoption updates.</p>
                    <form className="newsletter-form">
                        <input type="text" placeholder="Your Name" required />
                        <input type="email" placeholder="Your Email" required />
                        <button type="submit">Subscribe</button>
                    </form>
                </div>

                <div className="footer-section social-section">
                    <h5>Follow Us for Heartwarming Updates!</h5> {/* Updated heading */}
                    <div className="social-icons">
                        <a href="#" className="social-icon"><FontAwesomeIcon icon={faFacebook} /></a>
                        <a href="#" className="social-icon"><FontAwesomeIcon icon={faTwitter} /></a>
                        <a href="#" className="social-icon"><FontAwesomeIcon icon={faInstagram} /></a>
                        <a href="#" className="social-icon"><FontAwesomeIcon icon={faLinkedin} /></a>
                    </div>
                </div>

                {/* FAQs and Support Section */}
                <div className="footer-section faqs-support-section">
                    <h5>Help</h5>
                    <div className="faqs-links">
                        <a href="#faq-section">FAQs</a>
                        <span>|</span> {/* Optional separator */}
                        <a href="#">Support</a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Pet Adoption Agency. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;