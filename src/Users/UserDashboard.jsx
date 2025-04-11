import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import AccountManagement from './AccountManagement';
import AdoptionProcess from './AdoptionProcess';
import AdoptionForm from './AdoptionForm';
import Inbox from './Inbox';
import PaymentSettings from './PaymentSettings';
import PendingReviews from './PendingReviews';
import SpecialAdoptionForm from './SpecialAdoptionForm';
import AllPets from './AllPets';
import SchedulePickup from './SchedulePickup';
import AddPets from './AddPets';
import LogoutModal from './LogoutModal';
import './UserDashboard.css';

const UserDashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('role');
        setIsModalOpen(false);
        navigate('/auth');
    };

    return (
        <div className="user-dashboard">
            <LogoutModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onLogout={handleLogout}
            />
            <div className="dashboard-content">
                <Sidebar onLogout={() => setIsModalOpen(true)} />
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="account-management" element={<AccountManagement />} />
                        <Route path="adoption-process" element={<AdoptionProcess />} />
                        <Route path="adoption-form" element={<AdoptionForm />} />
                        <Route path="inbox" element={<Inbox />} />
                        <Route path="payment-settings" element={<PaymentSettings />} />
                        <Route path="pending-reviews" element={<PendingReviews />} />
                        <Route path="special-adoption-form" element={<SpecialAdoptionForm />} />
                        <Route path="all-pets" element={<AllPets />} />
                        <Route path="schedule-pickup" element={<SchedulePickup />} />
                        <Route path="add-pet" element={<AddPets />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;