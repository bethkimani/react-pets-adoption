import React from 'react';
import './AdoptionProcess.css';

// Placeholder images (replace with actual image URLs or local paths)
const petImage = 'https://via.placeholder.com/300x400?text=Pet+Image';
const adopterImage = 'https://via.placeholder.com/300x400?text=Adopter+Image';

const AdoptionProcess = () => {
  return (
    <div className="adoption-process-container">
      {/* Header Section */}
      <div className="header">
        <div className="shelter-info">
          <div className="shelter-logo">W</div>
          <h2>Shelter World</h2>
        </div>
        <h1>Application details</h1>
        <button className="payment-btn">PAYMENT</button>
      </div>

      {/* Progress Timeline */}
      <div className="progress-timeline">
        <div className="progress-step completed">
          <div className="step-circle">✔</div>
          <p>Application</p>
          <span>18 OCT</span>
        </div>
        <div className="progress-line completed"></div>
        <div className="progress-step completed">
          <div className="step-circle">✔</div>
          <p>Start review</p>
          <span>18 OCT</span>
        </div>
        <div className="progress-line completed"></div>
        <div className="progress-step completed">
          <div className="step-circle">✔</div>
          <p>Approve</p>
          <span>18 OCT</span>
        </div>
        <div className="progress-line"></div>
        <div className="progress-step active">
          <div className="step-circle">⬤</div>
          <p>Payment</p>
        </div>
        <div className="progress-line"></div>
        <div className="progress-step">
          <div className="step-circle">⬤</div>
          <p>Schedule pick-up</p>
        </div>
      </div>

      {/* Main Content: Pet and Adopter Info */}
      <div className="main-content">
        {/* Images Section */}
        <div className="images-section">
          <div className="image-container">
            <img src={petImage} alt="Pet" />
            <p className="name">Pelico</p>
          </div>
          <div className="heart-icon">❤️</div>
          <div className="image-container">
            <img src={adopterImage} alt="Adopter" />
            <p className="name">Laura</p>
          </div>
        </div>

        {/* Pet Info Section */}
        <div className="pet-info-section">
          <h3>Pet info</h3>
          <ul>
            <li><span className="icon">🚻</span> Gender: Male</li>
            <li><span className="icon">🐾</span> Breed: Golden Retriever</li>
            <li><span className="icon">🎂</span> Age: Adult</li>
            <li><span className="icon">📏</span> Size: Small</li>
            <li><span className="icon">🐶</span> Type: Dog</li>
            <li><span className="icon">⏳</span> Time in shelter: 2 months</li>
            <li><span className="icon">💰</span> Adoption Fee: $500.00</li>
            <li><span className="icon">📋</span> Fee model: Adopter pays</li>
          </ul>
          <h3>Adopter info</h3>
          <p>Fee model: Adopter pays</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="cancel-btn">Cancel adoption</button>
      </div>
    </div>
  );
};

export default AdoptionProcess;