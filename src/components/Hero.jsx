import React, { useState } from 'react';
import Slider from 'react-slick';
import '../App.css';
import BookingModal from './BookingPet';

// Carousel images
const carouselImages = [
  './assets/images/homepg.jpg', // Using the same image for all slides
  './assets/images/homepg.jpg',
  './assets/images/homepg.jpg',
];

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="hero">
      <Slider {...settings}>
        {carouselImages.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </Slider>
      <div className="hero-text">
        <h1 className="hero-title">
          Find Your Perfect Furry Friend Today!
        </h1>
        <h2 className="hero-subtitle">
          Browse adorable cats, dogs, and more. Adopt, don’t shop!
        </h2>
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