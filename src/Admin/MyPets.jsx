
import React from 'react';
import './MyPets.css'; // Import necessary styles

const MyPets = ({ pets, onEditPet, onUnsaved, onBack }) => {
    return (
        <div className="my-pets">
            <h2>My Pets</h2>
            <button className="back-button" onClick={onBack}>Back to Dashboard</button>
            <div className="pets-list">
                {pets.length === 0 ? (
                    <p>You have no pets listed.</p>
                ) : (
                    pets.map((pet) => (
                        <div key={pet.id} className="pet-card">
                            <img src={pet.picture} alt={pet.name} className="pet-image" />
                            <h3>{pet.name}</h3>
                            <p><strong>Breed:</strong> {pet.breed || 'Unknown'}</p>
                            <p><strong>Bio:</strong> {pet.bio}</p>
                            <p><strong>Color:</strong> {pet.color}</p>
                            <p><strong>Weight:</strong> {pet.weight} kg</p>
                            <p><strong>Height:</strong> {pet.height} cm</p>
                            <p><strong>Hypoallergenic:</strong> {pet.hypoallergenic ? 'Yes' : 'No'}</p>
                            <p><strong>Dietary:</strong> {pet.dietary}</p>
                            <div className="pet-actions">
                                <button className="adopt-button">Adopt</button>
                                <button className="foster-button">Foster</button>
                                <button className="edit-button" onClick={() => onEditPet(pet)}>Edit Pet</button>
                                <button className="unsaved-button" onClick={() => onUnsaved(pet)}>Unsaved</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyPets;