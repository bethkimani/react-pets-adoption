
// ManagePets.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AddPets from './AddPets'; // Ensure the correct import
import View from './View'; // Ensure the correct import

const ManagePets = ({ pets, onEditPet }) => {
    return (
        <div className="manage-pets">
            <Routes>
                <Route path="add" element={<AddPets />} />
                <Route path="view" element={<View pets={pets} onEditPet={onEditPet} />} />
            </Routes>
        </div>
    );
};

export default ManagePets;