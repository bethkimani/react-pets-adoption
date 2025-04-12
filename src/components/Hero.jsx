import React, { useState } from 'react';
import '../App.css';
import BookingModal from './BookingPet';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="hero ">
      <div className="hero-text">
        <h1 className="hero-title">
          Find Your Perfect Furry Friend Today!
        </h1>
        <div className="cta-buttons">
          <Link to={'/catalogue'} className="buton">Meet Your Match</Link>
          <a href="#faq-section" className="buton">Learn More</a>
        </div>
      </div>
      {isModalOpen && <BookingModal onClose={closeModal} />}
    </div>
  );
};

export default Hero;