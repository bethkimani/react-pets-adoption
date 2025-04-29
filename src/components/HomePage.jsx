import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { getPets } from '../api';
import Auth from './Auth';

const HomePage = () => {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [error, setError] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await getPets();
        const data = response.data;
        console.log(data);
        setPets(data);
      } catch (error) {
        console.error('Error fetching pets:', error);
        setError('Failed to load pets. Please try again later.');
        setPets([]);
      }
    };
    fetchPets();
  }, []);

  const handleAdoptClick = (pet) => {
    if (pet.adoption_status === "available") {
      navigate(`adoption-process/${pet.id}`);
    } else {
      alert(`${pet.name} has already found their forever home. 🏡`);
    }
  };

  return (
    <div className="homepage animate__animated animate__fadeInUp animate__delay-2s">
      {/* Catalogue Section */}
      <div id="catalogue" className="catalogue">
        <h1>
          <FontAwesomeIcon icon={faHeart} className="heart-icon" /> Find Your Furry Soulmate <FontAwesomeIcon icon={faHeart} className="heart-icon" />
        </h1>
        <h2>Pets</h2>
        <div className="homepage-gallery">
          {pets.map((pet) => (
            <div key={pet.id} className="homepage-pet-card">
              <div className="card-inner">
                {/* Front face */}
                <div className="card-front">
                  <img
                    src={`  https://react-pets-adoption.onrender.com${pet.image}`}
                    alt={pet.name}
                    className="homepage-pet-image"
                  />
                  <div className="pet-name-overlay">
                    <div className="pet-name">{pet.name}</div>
                    {pet.owner && (
                      <div className="owner-details">
                        <p>Owner: {pet.owner.name}</p>
                        <p>Phone: {pet.owner.phone_number}</p>
                        
                      </div>
                    )}
                  </div>
                </div>

                {/* Back face */}
                <div className="card-back">
                  <h2>{pet.name}</h2>
                  <div className="pet-details">
                    <p>Breed: {pet.breed}</p>
                    <p>Age: {pet.age}</p>
                    <p>Weight: {pet.weight}</p>
                    <p>Gender: {pet.gender}</p>
                    <p>Microchipped: {pet.microchipped}</p>
                    <p>Personality: {pet.personality}</p>
                    <p>Hypoallergenic: {pet.hypoallergenic ? 'Yes' : 'No'}</p>
                    <p>Special Needs: {pet.special_needs}</p>
                    <p>Back Story: {pet.back_story}</p>
                  </div>
                  <div className="button-container">
                    {pet.adoption_status.toLowerCase() === 'available' ? (
                      <button className="adopt-button" onClick={() => openAuthModal('login')}>
                        Adopt Me
                      </button>
                    ) : (
                      <button className="adopt-button" disabled>
                        Adopted
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isAuthModalOpen && (
        <Auth
          onClose={closeAuthModal}
          initialMode={authMode}
        />
      )}
    </div>
  );
};

export default HomePage;