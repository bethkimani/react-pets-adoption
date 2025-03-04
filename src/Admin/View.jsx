import React, { useState } from 'react';
import './View.css'; // Correctly importing the CSS file
import EditPetModal from './EditPetModal'; // Import the edit modal

const ViewPets = ({ pets, onEditPet, onDeletePet, onUpdatePet }) => {
    const [selectedPet, setSelectedPet] = useState(null); // State to manage the selected pet for editing

    const handleEditClick = (pet) => {
        setSelectedPet(pet); // Set the selected pet to edit
    };

    const handleCloseModal = () => {
        setSelectedPet(null); // Close the modal
    };

    const handleUpdatePet = (updatedPet) => {
        onUpdatePet(updatedPet); // Call the update function passed as a prop
        setSelectedPet(null); // Close the modal after updating
    };

    return (
        <div>
            <h2>Pets List</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Adoption Status</th>
                        <th>Owner</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pets.map((pet) => (
                        <tr key={pet.id}>
                            <td>{pet.id}</td>
                            <td>{pet.name}</td>
                            <td>{pet.adoptionStatus}</td>
                            <td>{pet.owner}</td>
                            <td>
                                <button 
                                    className="edit-button" 
                                    onClick={() => handleEditClick(pet)}
                                >
                                    Edit
                                </button>
                                <button 
                                    className="delete-button" 
                                    onClick={() => onDeletePet(pet.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedPet && (
                <EditPetModal 
                    pet={selectedPet} 
                    onClose={handleCloseModal} 
                    onUpdate={handleUpdatePet} 
                />
            )}
        </div>
    );
};

export default ViewPets;