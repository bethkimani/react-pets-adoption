import React, { useState } from 'react';
import './AdoptionProcess.css';

// Placeholder images (replace with actual image URLs or local paths)
const petImage = 'https://via.placeholder.com/300x400?text=Pet+Image';
const adopterImage = 'https://via.placeholder.com/300x400?text=Adopter+Image';

const AdoptionProcess = () => {
  const [petInfo, setPetInfo] = useState({
    gender: 'Male',
    breed: 'Golden Retriever',
    age: 'Adult',
    size: 'Small',
    type: 'Dog',
    timeInShelter: '2 months',
    adoptionFee: '$500.00',
    feeModel: 'Adopter pays',
  });

  const [adopterInfo, setAdopterInfo] = useState({
    feeModel: 'Adopter pays',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    // Logic to delete pet (e.g., API call)
    alert('Pet deleted');
  };

  const handleAddPet = () => {
    // Logic to add a new pet (e.g., open a form or modal)
    alert('Add new pet functionality');
  };

  const handleInputChange = (e, field, isAdopter = false) => {
    if (isAdopter) {
      setAdopterInfo({ ...adopterInfo, [field]: e.target.value });
    } else {
      setPetInfo({ ...petInfo, [field]: e.target.value });
    }
  };

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
        <div className="progress-line"></div>
        <div className="progress-step">
          <div className="step-circle">❤️</div>
          <p>Pet adopted</p>
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

        {/* Info Section */}
        <div className="info-section">
          {/* Pet Info */}
          <div className="pet-info-section">
            <h3>Pet info</h3>
            {isEditing ? (
              <ul>
                <li>
                  <span className="icon">🚻</span> Gender:{' '}
                  <input
                    value={petInfo.gender}
                    onChange={(e) => handleInputChange(e, 'gender')}
                  />
                </li>
                <li>
                  <span className="icon">🐾</span> Breed:{' '}
                  <input
                    value={petInfo.breed}
                    onChange={(e) => handleInputChange(e, 'breed')}
                  />
                </li>
                <li>
                  <span className="icon">🎂</span> Age:{' '}
                  <input
                    value={petInfo.age}
                    onChange={(e) => handleInputChange(e, 'age')}
                  />
                </li>
                <li>
                  <span className="icon">📏</span> Size:{' '}
                  <input
                    value={petInfo.size}
                    onChange={(e) => handleInputChange(e, 'size')}
                  />
                </li>
                <li>
                  <span className="icon">🐶</span> Type:{' '}
                  <input
                    value={petInfo.type}
                    onChange={(e) => handleInputChange(e, 'type')}
                  />
                </li>
                <li>
                  <span className="icon">⏳</span> Time in shelter:{' '}
                  <input
                    value={petInfo.timeInShelter}
                    onChange={(e) => handleInputChange(e, 'timeInShelter')}
                  />
                </li>
                <li>
                  <span className="icon">💰</span> Adoption Fee:{' '}
                  <input
                    value={petInfo.adoptionFee}
                    onChange={(e) => handleInputChange(e, 'adoptionFee')}
                  />
                </li>
                <li>
                  <span className="icon">📋</span> Fee model:{' '}
                  <input
                    value={petInfo.feeModel}
                    onChange={(e) => handleInputChange(e, 'feeModel')}
                  />
                </li>
              </ul>
            ) : (
              <ul>
                <li><span className="icon">🚻</span> Gender: {petInfo.gender}</li>
                <li><span className="icon">🐾</span> Breed: {petInfo.breed}</li>
                <li><span className="icon">🎂</span> Age: {petInfo.age}</li>
                <li><span className="icon">📏</span> Size: {petInfo.size}</li>
                <li><span className="icon">🐶</span> Type: {petInfo.type}</li>
                <li><span className="icon">⏳</span> Time in shelter: {petInfo.timeInShelter}</li>
                <li><span className="icon">💰</span> Adoption Fee: {petInfo.adoptionFee}</li>
                <li><span className="icon">📋</span> Fee model: {petInfo.feeModel}</li>
              </ul>
            )}
          </div>

          {/* Adopter Info */}
          <div className="adopter-info-section">
            <h3>Adopter info</h3>
            {isEditing ? (
              <ul>
                <li>
                  <span className="icon">📋</span> Fee model:{' '}
                  <input
                    value={adopterInfo.feeModel}
                    onChange={(e) => handleInputChange(e, 'feeModel', true)}
                  />
                </li>
              </ul>
            ) : (
              <ul>
                <li><span className="icon">📋</span> Fee model: {adopterInfo.feeModel}</li>
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <div className="actions-dropdown">
          <button onClick={() => setShowActions(!showActions)}>Actions ▼</button>
          {showActions && (
            <div className="dropdown-menu">
              <button onClick={handleAddPet}>Add Pet</button>
              <button onClick={handleEdit}>Edit Pet</button>
              <button onClick={handleDelete}>Delete Pet</button>
              <button>Pet details</button>
            </div>
          )}
        </div>
        {isEditing && <button onClick={handleSave} className="save-btn">Save</button>}
        <button className="cancel-btn">Cancel adoption</button>
      </div>
    </div>
  );
};

export default AdoptionProcess;