import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar'; // Update this to AdminSidebar if different
import Dashboard from './Dashboard';
import ViewPets from './ViewPets';
import AddPets from './AddPets';
import ChangePassword from './ChangePassword';
import UserProfile from './UserProfile';
import Teams from './Teams';
import ViewFeedback from './ViewFeedback';
import LogoutModal from './LogoutModal';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('role');
        navigate('/'); // Navigate to the login page
    };

    const confirmLogout = () => {
        setModalOpen(true);
    };

    return (
        <div className="admin-dashboard">
            <Sidebar onLogout={confirmLogout} />
            <div className="main-content">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="view-pets" element={<ViewPets />} />
                    <Route path="add-pet" element={<AddPets />} />
                    <Route path="change-password" element={<ChangePassword />} />
                    <Route path="profile" element={<UserProfile />} />
                    <Route path="teams" element={<Teams />} />
                    <Route path="view-feedback" element={<ViewFeedback />} />
                </Routes>
            </div>
            <LogoutModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onConfirm={handleLogout} />
        </div>
    );
};

export default AdminDashboard;