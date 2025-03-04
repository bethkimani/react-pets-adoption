// View.jsx
import React from 'react';
import './View.css';

const View = ({ pets, onEditPet }) => {
    return (
        <div className="view-pets">
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
                                <button onClick={() => onEditPet(pet)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default View;
