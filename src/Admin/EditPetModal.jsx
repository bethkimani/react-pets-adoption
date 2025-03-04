
import React, { useState } from 'react';
import './View.css'; // Import CSS for styling

const EditPetModal = ({ pet, onClose, onUpdate }) => {
    const [name, setName] = useState(pet.name);
    const [adoptionStatus, setAdoptionStatus] = useState(pet.adoptionStatus);
    const [owner, setOwner] = useState(pet.owner);

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate({ ...pet, name, adoptionStatus, owner });
        onClose(); // Close the modal after updating
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Edit this pet</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Pet Name:
                        <input 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            required 
                        />
                    </label>
                    <label>
                        Adoption Status:
                        <select 
                            value={adoptionStatus} 
                            onChange={(e) => setAdoptionStatus(e.target.value)} 
                            required
                        >
                            <option value="">Choose...</option>
                            <option value="Available">Available</option>
                            <option value="Adopted">Adopted</option>
                        </select>
                    </label>
                    <label>
                        Owner:
                        <input 
                            type="text" 
                            value={owner} 
                            onChange={(e) => setOwner(e.target.value)} 
                            required 
                        />
                    </label>
                    <button type="submit">Update</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default EditPetModal;