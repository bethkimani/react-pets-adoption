import React from 'react';
import { FaPaw } from 'react-icons/fa';
import about1 from '../assets/images/about-1.jpg';
import './About.css';

const AboutUs = () => {
    return (
        <div className="about-us-container">
            {/* Left - Text Content */}
            <div className="about-text">
                <h1 className="about-heading">Every Pet Deserves a <span className="text-secondary">Loving Home</span></h1>
                <h2 className="title">About Us</h2>
                <p className="description">
                    We connect rescue pets with caring families through a seamless adoption process.  
                    Our priority is to ensure a perfect match, fostering lifelong companionship.
                </p>
                <ul className="features">
                    <li><FaPaw className="icon" /> Ethical Adoption Process</li>
                    <li><FaPaw className="icon" /> Comprehensive Health & Care</li>
                    <li><FaPaw className="icon" /> Ongoing Support for Pet Owners</li>
                </ul>
                <div className="btn-container">
                    <a href="#" className="btn-primary">Learn More</a>
                </div>
            </div>

            {/* Right - Single Image */}
            <div className="about-image">
                <img className="img-large" src={about1} alt="Happy adopted dog" />
            </div>
        </div>
    );
};

export default AboutUs;