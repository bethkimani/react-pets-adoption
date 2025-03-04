import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import ViewPets from './View'; // Ensure correct import
import AddPets from './AddPets'; // Ensure correct import
import MyPets from './MyPets'; // Ensure correct import
import UserProfile from './UserProfile'; // Ensure correct import
import LogoutModal from './LogoutModal'; // Import the modal
import './Admin.css';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [pets, setPets] = useState([
        { id: 1, name: 'Adam', adoptionStatus: 'Available', owner: 'None' },
        { id: 2, name: 'Riga', adoptionStatus: 'Available', owner: 'None' },
        { id: 3, name: 'Johnny', adoptionStatus: 'Adopted', owner: 'Owner Name' },
    ]);
    
    const [isModalOpen, setModalOpen] = useState(false); // State to manage modal visibility

    const handleEditPet = (pet) => {
        console.log('Editing pet:', pet);
    };

    const handleDeletePet = (petId) => {
        console.log('Deleting pet with ID:', petId);
        setPets(pets.filter(pet => pet.id !== petId));
    };

    const handleAddPet = (newPet) => {
        setPets([...pets, newPet]);
    };

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated'); // Clear authentication
        localStorage.removeItem('role'); // Clear user role
        navigate('/'); // Redirect to the main user website (home page)
    };

    const confirmLogout = () => {
        setModalOpen(true); // Open the confirmation modal
    };

    return (
        <div className="admin-dashboard">
            <Sidebar 
                onViewMyPets={() => {}} 
                onViewProfile={() => {}} 
                onLogout={confirmLogout} // Call the confirmLogout function
            />
            <div className="main-content">
                <Routes>
                    <Route path="view-pets" element={<ViewPets pets={pets} onEditPet={handleEditPet} onDeletePet={handleDeletePet} />} />
                    <Route path="add-pet" element={<AddPets onAddPet={handleAddPet} />} />
                    <Route path="my-pets" element={<MyPets pets={pets} onEditPet={handleEditPet} onBack={() => {}} />} />
                    <Route path="profile" element={<UserProfile user={{}} onSaveChanges={() => {}} />} />
                    <Route path="/" element={<Dashboard />} />
                </Routes>
            </div>
            <LogoutModal 
                isOpen={isModalOpen} 
                onClose={() => setModalOpen(false)} 
                onConfirm={handleLogout} 
            />
        </div>
    );
};

export default AdminDashboard;