import React, { useState } from 'react';
import '../App.css';
import BookingModal from './BookingPet';

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="hero">
      <div className="hero-text">
        <h1 className="hero-title">
          Find Your Perfect Furry Friend Today!
        </h1>
        <div className="cta-buttons">
          <a href="/catalogue" className="btn">Meet Your Match</a>
          <a href="/catalogue#adoption-form-section" className="btn">Start the Adoption Process</a>
          <a href="#faq-section" className="btn">Learn More</a>
        </div>
      </div>
      {isModalOpen && <BookingModal onClose={closeModal} />}
    </div>
  );
};

export default Hero;