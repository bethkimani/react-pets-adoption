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
                    className="action-btn edit-btn"
                    onClick={() => {
                      setSelectedPet(pet);
                      setShowEditModal(true);
                    }}
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => {
                      setSelectedPet(pet);
                      setShowDeleteModal(true);
                    }}
                  >
                    <i className="fas fa-trash"></i>
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