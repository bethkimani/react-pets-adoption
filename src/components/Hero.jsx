import React, { useState, useEffect } from 'react';
import '../App.css';
import BookingModal from './BookingPet';

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [fade, setFade] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Array of background image URLs
  const backgroundImages = [
    "url('./assets/images/homepg.jpg')",
    "url('./assets/images/guinea.jpg')",
    "url('./assets/images/about-3.jpg')",
  ];

  // Preload images to avoid delays
  useEffect(() => {
    const imagePaths = [
      './assets/images/homepg.jpg',
      './assets/images/guinea.jpg',
      './assets/images/about-3.jpg',
    ];
    imagePaths.forEach((path) => {
      const img = new Image();
      img.src = path;
      img.onerror = () => console.error(`Failed to load image: ${path}`);
    });
  }, []);

  // Cycle through images every 5 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setFade(false); // Start fading out

      setTimeout(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
        );
        setNextImageIndex((prevIndex) =>
          prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
        );
        setFade(true); // Fade in the next image
      }, 1000); // Wait for the fade-out to complete (1 second)
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [isPaused, backgroundImages.length]);

  const goToPrevious = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? backgroundImages.length - 1 : prevIndex - 1
      );
      setNextImageIndex((prevIndex) =>
        prevIndex === 0 ? backgroundImages.length - 1 : prevIndex - 1
      );
      setFade(true);
    }, 1000);
  };

  const goToNext = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
      setNextImageIndex((prevIndex) =>
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
      setFade(true);
    }, 1000);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className="hero"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="hero-background"
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), ${backgroundImages[currentImageIndex]}`,
          opacity: fade ? 1 : 0,
        }}
      />
      <div
        className="hero-background"
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), ${backgroundImages[nextImageIndex]}`,
          opacity: fade ? 0 : 1,
        }}
      />
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
      <button className="carousel-arrow left" onClick={goToPrevious}>
        ❮
      </button>
      <button className="carousel-arrow right" onClick={goToNext}>
        ❯
      </button>
      <div className="carousel-dots">
        {backgroundImages.map((_, index) => (
          <span
            key={index}
            className={`dot ${currentImageIndex === index ? 'active' : ''}`}
            onClick={() => {
              setFade(false);
              setTimeout(() => {
                setCurrentImageIndex(index);
                setNextImageIndex(
                  index === backgroundImages.length - 1 ? 0 : index + 1
                );
                setFade(true);
              }, 1000);
            }}
          />
        ))}
      </div>
      {isModalOpen && <BookingModal onClose={closeModal} />}
    </div>
  );
};

export default Hero;