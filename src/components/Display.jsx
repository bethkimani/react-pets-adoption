import React, { useState } from 'react';
import '../App.css'; 

// Import images directly
import catImage from '../assets/images/cat.jpeg';
import dogImage from '../assets/images/dog.webp';
import germanShepherdImage from '../assets/images/germanshepherd.jpg';
import rabbitImage from '../assets/images/rabbit.jpg';
import turtleImage from '../assets/images/turtle.jpg';
import parrotImage from '../assets/images/parrot.jpg';
import hamsterImage from '../assets/images/hamster.jpg';

const pets = [
  { name: 'Amuki', type: 'Dog', image: dogImage, available: true, details: 'Adopted' },
  { name: 'Muimui', type: 'Dog', image: catImage, available: true, details: 'Specialty: Finding truffles' },
  { name: 'Snow', type: 'Golden Retriever', image: germanShepherdImage, available: true, details: 'Adoption Status: Available\nColor: White\nBio: Friendly dog' },
  { name: 'Bunny', type: 'Rabbit', image: rabbitImage, available: true, details: 'Color: Grey\nBio: Loves carrots' },
  { name: 'Shelly', type: 'Turtle', image: turtleImage, available: true, details: 'Color: Green\nBio: Slow but steady' },
  { name: 'Polly', type: 'Parrot', image: parrotImage, available: true, details: 'Color: Rainbow\nBio: Talks a lot' },
  { name: 'Hammy', type: 'Hamster', image: hamsterImage, available: true, details: 'Color: Brown\nBio: Very active' },
];

const SearchAndDisplayPets = () => {
  const [selectedPet, setSelectedPet] = useState(null);
  const [showAdopt, setShowAdopt] = useState(false);

  const handleSeeMore = (pet) => {
    setSelectedPet(pet);
  };

  const handleAdoptClick = (pet) => {
    if (pet.available) {
      alert("Redirecting to sign-up page...");
      setShowAdopt(true);
    } else {
      alert(`${pet.name} is already adopted.`);
    }
  };

  const handleClose = () => {
    setSelectedPet(null);
    setShowAdopt(false);
  };

  return (
    <div className="search-and-display">
      <h1>Pets Available for Adoption</h1>
      <div className="search-gallery">
        {pets.map((pet, index) => (
          <div key={index} className="search-pet-card">
            <img src={pet.image} alt={pet.name} className="search-pet-image" />
            <div className="search-pet-info">
              <h2>{pet.name}</h2>
              <p>{pet.type}</p>
              {pet.available ? (
                <button className="search-adopt-button" onClick={() => handleAdoptClick(pet)}>
                  Available
                </button>
              ) : (
                <button className="search-adopt-button" disabled>
                  Adopted
                </button>
              )}
              <button className="search-details-button" onClick={() => handleSeeMore(pet)}>
                See More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pet Details Modal */}
      {selectedPet && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleClose}>&times;</span>
            <img src={selectedPet.image} alt={selectedPet.name} className="modal-image" />
            <h2>{selectedPet.name}</h2>
            <p>{selectedPet.details}</p>
            <button className="search-adopt-button" onClick={() => handleAdoptClick(selectedPet)}>
              {selectedPet.available ? "Adopt Me" : "Adopted"}
            </button>
          </div>
        </div>
      )}

      {/* Sign Up/Login Modal */}
      {showAdopt && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleClose}>&times;</span>
            <h2>Welcome to the Pet Adoption Agency!</h2>
            <p>Please sign up or log in to adopt.</p>
            <button className="search-adopt-button" onClick={handleClose}>Sign Up</button>
            <button className="search-adopt-button" onClick={handleClose}>Login</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchAndDisplayPets;