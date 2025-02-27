// components/WhyAdopt.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDog, faHeart, faHome } from '@fortawesome/free-solid-svg-icons';
import './WhyAdopt.css'; // Ensure you have this CSS file

const WhyAdopt = () => {
    return (
        <section className="why-adopt">
            <h2>Why Adopt?</h2>
            <div className="why-adopt-container">
                <div className="adopt-point">
                    <FontAwesomeIcon icon={faDog} className="adopt-icon" />
                    <p>Save a life and give a pet a second chance.</p>
                </div>
                <div className="adopt-point">
                    <FontAwesomeIcon icon={faHeart} className="adopt-icon" />
                    <p> Find a companion who will love you unconditionally</p>
                </div>
                <div className="adopt-point">
                    <FontAwesomeIcon icon={faHome} className="adopt-icon" />
                    <p> Help reduce pet homelessness in your community.</p>
                </div>
            </div>
        </section>
    );
};

export default WhyAdopt;