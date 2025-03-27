import React, { useState, useEffect } from 'react';
import '../App.css';
import BookingModal from './BookingPet';
import homepg from '../assets/images/homepg.jpg'; // Corrected path
import guinea from '../assets/images/guinea.jpg'; // Corrected path
import about3 from '../assets/images/about-3.jpg'; // Corrected path

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [fade, setFade] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Array of imported background images
  const backgroundImages = [homepg, guinea, about3];

  // Log image paths for debugging
  useEffect(() => {
    console.log('Image paths:', { homepg, guinea, about3 });
  }, []);

  // Preload images to avoid delays
  useEffect(() => {
    backgroundImages.forEach((image) => {
      const img = new Image();
      img.src = image;
      img.onerror = () => console.error(`Failed to load image: ${image}`);
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
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImages[currentImageIndex]})`,
          opacity: fade ? 1 : 0,
        }}
      />
      <div
        className="hero-background"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImages[nextImageIndex]})`,
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