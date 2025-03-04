import React from 'react';
import './MyPets.css'; // Import the CSS file for styles

const MyPets = ({ pets, onEditPet, onBack }) => {
    return (
        <div className="my-pets">
            <h2>My Pets</h2>
            <div className="pets-list">
                {pets.map(pet => (
                    <div className="pet-card" key={pet.id}>
                        <img src={pet.picture} alt={pet.name} className="pet-image" />
                        <h3>{pet.name}</h3>
                        <p>Adoption Status: {pet.adoptionStatus}</p>
                        <p>Bio: {pet.bio || 'No bio available'}</p>
                        <div className="pet-actions">
                            <button className="edit-button" onClick={() => onEditPet(pet)}>Edit</button>
                            <button className="adopt-button">Adopt</button>
                            <button className="foster-button">Foster</button>
                        </div>
                    </div>
                ))}
            </div>
            <button className="back-button" onClick={onBack}>Back</button>
        </div>
    );
};

export default MyPets;