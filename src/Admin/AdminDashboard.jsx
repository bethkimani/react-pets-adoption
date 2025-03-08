
import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import ViewPets from './ViewPets';
import AddPets from './AddPets';
import MyPets from './MyPets';
import UserProfile from './UserProfile';
import LogoutModal from './LogoutModal';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('role');
        navigate('/');
    };

    const confirmLogout = () => {
        setModalOpen(true);
    };

    return (
        <div className="admin-dashboard">
            <Sidebar onLogout={confirmLogout} />
            <div className="main-content">
                <Routes>
                    <Route path="view-pets" element={<ViewPets />} />
                    <Route path="add-pet" element={<AddPets />} />
                    <Route path="my-pets" element={<MyPets />} />
                    <Route path="profile" element={<UserProfile />} />
                    <Route path="/" element={<Dashboard />} />
                </Routes>
            </div>
            <LogoutModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onConfirm={handleLogout} />
        </div>
    );
};

export default AdminDashboard;