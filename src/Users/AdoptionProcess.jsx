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
  const [pets, setPets] = useState([
    { id: 1, name: 'Pelico', type: 'Dog', status: 'Pending' },
    { id: 2, name: 'Muimui', type: 'Dog', status: 'Available' },
    { id: 3, name: 'Snow', type: 'Golden Retriever', status: 'Adopted' },
    { id: 4, name: 'Bunny', type: 'Rabbit', status: 'Available' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [newPet, setNewPet] = useState({ name: '', type: '', status: 'Available' });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e, field, isAdopter = false) => {
    if (isAdopter) {
      setAdopterInfo({ ...adopterInfo, [field]: e.target.value });
    } else {
      setPetInfo({ ...petInfo, [field]: e.target.value });
    }
  };

  const handleAddPet = () => {
    setPets([...pets, { id: pets.length + 1, ...newPet }]);
    setNewPet({ name: '', type: '', status: 'Available' });
    setShowAddModal(false);
  };

  const handleEditPet = () => {
    setPets(pets.map(pet => (pet.id === selectedPet.id ? selectedPet : pet)));
    setShowEditModal(false);
    setSelectedPet(null);
  };

  const handleDeletePet = () => {
    setPets(pets.filter(pet => pet.id !== selectedPet.id));
    setShowDeleteModal(false);
    setSelectedPet(null);
  };

  const handlePetDetails = (pet) => {
    alert(`Details for ${pet.name}:\nType: ${pet.type}\nStatus: ${pet.status}`);
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

      {/* Pets Table */}
      <div className="pets-table-section">
        <div className="table-header">
          <h3>Pets List</h3>
          <button className="add-pet-btn" onClick={() => setShowAddModal(true)}>
            Add Pet
          </button>
        </div>
        <table className="pets-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pets.map(pet => (
              <tr key={pet.id}>
                <td>{pet.name}</td>
                <td>{pet.type}</td>
                <td>
                  <span className={`status ${pet.status.toLowerCase()}`}>
                    {pet.status}
                  </span>
                </td>
                <td>
                  <button
                    className="action-btn details-btn"
                    onClick={() => handlePetDetails(pet)}
                  >
                    Details
                  </button>
                  <button
                    className="action-btn edit-btn"
                    onClick={() => {
                      setSelectedPet(pet);
                      setShowEditModal(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => {
                      setSelectedPet(pet);
                      setShowDeleteModal(true);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Pet Modal */}
      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New Pet</h3>
            <label>
              Name:
              <input
                type="text"
                value={newPet.name}
                onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
              />
            </label>
            <label>
              Type:
              <input
                type="text"
                value={newPet.type}
                onChange={(e) => setNewPet({ ...newPet, type: e.target.value })}
              />
            </label>
            <label>
              Status:
              <select
                value={newPet.status}
                onChange={(e) => setNewPet({ ...newPet, status: e.target.value })}
              >
                <option value="Available">Available</option>
                <option value="Pending">Pending</option>
                <option value="Adopted">Adopted</option>
              </select>
            </label>
            <div className="modal-buttons">
              <button onClick={handleAddPet}>Add</button>
              <button onClick={() => setShowAddModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Pet Modal */}
      {showEditModal && selectedPet && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Pet</h3>
            <label>
              Name:
              <input
                type="text"
                value={selectedPet.name}
                onChange={(e) =>
                  setSelectedPet({ ...selectedPet, name: e.target.value })
                }
              />
            </label>
            <label>
              Type:
              <input
                type="text"
                value={selectedPet.type}
                onChange={(e) =>
                  setSelectedPet({ ...selectedPet, type: e.target.value })
                }
              />
            </label>
            <label>
              Status:
              <select
                value={selectedPet.status}
                onChange={(e) =>
                  setSelectedPet({ ...selectedPet, status: e.target.value })
                }
              >
                <option value="Available">Available</option>
                <option value="Pending">Pending</option>
                <option value="Adopted">Adopted</option>
              </select>
            </label>
            <div className="modal-buttons">
              <button onClick={handleEditPet}>Save</button>
              <button onClick={() => setShowEditModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Pet Modal */}
      {showDeleteModal && selectedPet && (
        <div className="modal">
          <div className="modal-content">
            <h3>Delete Pet</h3>
            <p>Are you sure you want to delete {selectedPet.name}?</p>
            <div className="modal-buttons">
              <button onClick={handleDeletePet}>Yes, Delete</button>
              <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Adoption Button */}
      <div className="action-buttons">
        {isEditing && <button onClick={handleSave} className="save-btn">Save</button>}
        <button className="cancel-btn">Cancel adoption</button>
      </div>
    </div>
  );
};

export default AdoptionProcess;