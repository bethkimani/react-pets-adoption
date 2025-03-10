import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import '../App.css';

// Import images directly
import catImage from '../assets/images/cat.jpeg';
import dogImage from '../assets/images/dog.webp';
import germanShepherdImage from '../assets/images/germanshepherd.jpg';
import rabbitImage from '../assets/images/rabbit.jpg';
import turtleImage from '../assets/images/turtle.jpg';
import parrotImage from '../assets/images/parrot.jpg';

const pets = [
  { 
    name: 'Amuki', 
    type: 'Dog', 
    image: dogImage, 
    available: false, 
    specialty: 'Babysitting',
    weight: '30 lbs',
    greased: 'Yes',
    highestMedal: 'Gold Medal'
  },
  { 
    name: 'Muimui', 
    type: 'Dog', 
    image: catImage, 
    available: true, 
    specialty: 'Truffle Hunter',
    weight: '25 lbs',
    greased: 'No',
    highestMedal: 'Silver Medal'
  },
  { 
    name: 'Snow', 
    type: 'Golden Retriever', 
    image: germanShepherdImage, 
    available: true, 
    specialty: 'Helper Dog',
    weight: '65 lbs',
    greased: 'No',
    highestMedal: 'Bronze Medal'
  },
  { 
    name: 'Bunny', 
    type: 'Rabbit', 
    image: rabbitImage, 
    available: true, 
    specialty: 'Bunny Hop',
    weight: '5 lbs',
    greased: 'No',
    highestMedal: 'None'
  },
  { 
    name: 'Shelly', 
    type: 'Turtle', 
    image: turtleImage, 
    available: true, 
    specialty: 'Slow and Steady',
    weight: '10 lbs',
    greased: 'No',
    highestMedal: 'Participation Medal'
  },
  { 
    name: 'Polly', 
    type: 'Parrot', 
    image: parrotImage, 
    available: true, 
    specialty: 'Talkative',
    weight: '2 lbs',
    greased: 'No',
    highestMedal: 'Champion Talker'
  },
];

const HomePage = () => {
  const navigate = useNavigate(); // Use navigate to redirect

  const handleAdoptClick = (pet) => {
    if (pet.available) {
      // Redirect to the adoption process directly
      navigate('/adoption-process');
    } else {
      alert(`${pet.name} has already found their forever home. 🏡`);
    }
  };

  return (
    <div className="homepage">
      {/* Catalogue Section */}
      <div id="catalogue" className="catalogue">
        <h1>
          <FontAwesomeIcon icon={faHeart} className="heart-icon" /> Find Your Furry Soulmate <FontAwesomeIcon icon={faHeart} className="heart-icon" />
        </h1>
        <h2>Catalogue</h2>
        <div className="homepage-gallery">
          {pets.map((pet, index) => (
            <div key={index} className="homepage-pet-card">
              <img src={pet.image} alt={pet.name} className="homepage-pet-image" />
              <h2>{pet.name}</h2>
              <div className="button-container">
                {pet.available ? (
                  <button className="adopt-button" onClick={() => handleAdoptClick(pet)}>
                    Adopt Me
                  </button>
                ) : (
                  <button className="adopt-button" disabled>
                    Adopted
                  </button>
                )}
              </div>
              <div className="pet-details">
                <p>Specialty: {pet.specialty}</p>
                <p>Weight: {pet.weight}</p>
                <p>Greased: {pet.greased}</p>
                <p>Highest Medal: {pet.highestMedal}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;