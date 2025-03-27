import React, { useState, useEffect } from 'react';
import '../App.css';
import BookingModal from './BookingPet';

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Array of background images
  const backgroundImages = [
    "url('./assets/images/homepg.jpg')",
    "url('./assets/images/guinea.jpg')",
    "url('./assets/images/about-3.jpg')",
  ];

  // Cycle through images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [backgroundImages.length]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className="hero"
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), ${backgroundImages[currentImageIndex]}`,
      }}
    >
      <div className="hero-text">
        <h1 className="hero-title">Find Your Perfect Furry Friend Today!</h1>
        <h2 className="hero-subtitle">
          Browse adorable cats, dogs, and more. Adopt, don’t shop!
        </h2>
        <div className="cta-buttons">
          <a href="/catalogue" className="btn">
            Meet Your Match
          </a>
          <a href="/catalogue#adoption-form-section" className="btn">
            Start the Adoption Process
          </a>
          <a href="#faq-section" className="btn">
            Learn More
          </a>
        </div>
      </div>
      {isModalOpen && <BookingModal onClose={closeModal} />}
    </div>
  );
};

export default Hero;