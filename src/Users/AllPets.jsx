import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { getPets } from '../api'; // Import the API function
import './AllPets.css';

const AllPets = () => {
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();

  // Fetch pets from the backend on component mount
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await getPets();
        setPets(response.data);
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };
    fetchPets();
  }, []);

  const handleAdoptClick = (pet) => {
    if (pet.adoption_status === 'Available') {
      navigate('/user-dashboard/adoption-process');
    } else {
      alert(`${pet.name} has already found their forever home. 🏡`);
    }
  };

  return (
    <div className="all-pets">
      <div className="catalogue">
        <h1>
          <FontAwesomeIcon icon={faHeart} className="heart-icon" /> All Pets <FontAwesomeIcon icon={faHeart} className="heart-icon" />
        </h1>
        <h2>Catalogue</h2>
        <div className="pets-gallery">
          {pets.map((pet) => (
            <div key={pet.id} className="pet-card">
              <img 
                src={pet.image ? `https://pets-adoption-flask-sqlite.onrender.com${pet.image}` : 'default-image.jpg'} 
                alt={pet.name} 
                className="pet-image" 
              />
              <div className="pet-info">
                <h2>{pet.name}</h2>
                <div className="pet-details-front">
                  <p><strong>Type:</strong> {pet.species}</p>
                  <p><strong>Breed:</strong> {pet.breed || 'N/A'}</p>
                  <p><strong>Age:</strong> {pet.age || 'N/A'}</p>
                  <p><strong>Description:</strong> {pet.description || 'N/A'}</p>
                  <p><strong>Status:</strong> {pet.adoption_status}</p>
                </div>
                <div className="button-container">
                  {pet.adoption_status === 'Available' ? (
                    <button className="adopt-button" onClick={() => handleAdoptClick(pet)}>
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllPets;