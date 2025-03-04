
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import EditPet from './EditPet';
import MyPets from './MyPets';
import UserProfile from './UserProfile'; // Import UserProfile component
import './Admin.css';

const AdminDashboard = () => {
    const [isEditingPet, setIsEditingPet] = useState(false);
    const [currentPet, setCurrentPet] = useState(null);
    const [viewingMyPets, setViewingMyPets] = useState(false);
    const [viewingProfile, setViewingProfile] = useState(false); // State for profile view

    // Sample user data
    const user = {
        firstName: 'Jing',
        lastName: 'Zhao',
        email: 'jing@pet.com',
        phone: '189304509',
        bio: 'Hi, welcome to the pet adoption agency.',
    };

    // Sample pet data
    const pets = [
        {
            id: 1,
            name: 'Adam',
            breed: 'Unknown',
            bio: 'Adam is a friendly cat.',
            color: 'Gray',
            weight: 24,
            height: 23,
            hypoallergenic: false,
            dietary: 'Requires special cat food',
            picture: 'https://example.com/path/to/cat-image.jpg',
        },
    ];

    const handleEditPet = (pet) => {
        setCurrentPet(pet);
        setIsEditingPet(true);
    };

    const handleSave = (updatedPet) => {
        console.log('Updated Pet:', updatedPet);
        setIsEditingPet(false);
    };

    const handleViewMyPets = () => {
        setViewingMyPets(true);
        setViewingProfile(false); // Ensure profile is hidden
    };

    const handleViewProfile = () => {
        setViewingProfile(true);
        setViewingMyPets(false); // Ensure pets view is hidden
    };

    const handleBackToDashboard = () => {
        setViewingMyPets(false);
        setViewingProfile(false); // Reset both views
    };

    const handleSaveProfileChanges = (updatedUser) => {
        console.log('Profile Updated:', updatedUser);
        // Logic to save user profile changes (e.g., API call)
        setViewingProfile(false);
    };

    return (
        <div className="admin-dashboard">
            <Sidebar onViewMyPets={handleViewMyPets} onViewProfile={handleViewProfile} />
            <div className="main-content">
                {viewingMyPets && (
                    <MyPets pets={pets} onEditPet={handleEditPet} onBack={handleBackToDashboard} />
                )}
                {viewingProfile && (
                    <UserProfile user={user} onSaveChanges={handleSaveProfileChanges} />
                )}
                {isEditingPet && (
                    <EditPet pet={currentPet} onSave={handleSave} onCancel={handleBackToDashboard} />
                )}
                {!viewingMyPets && !viewingProfile && !isEditingPet && (
                    <Dashboard onEditPet={handleEditPet} />
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;