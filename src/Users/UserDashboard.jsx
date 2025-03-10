import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import AccountManagement from './AccountManagement';
import AdoptionProcess from './AdoptionProcess';

import AdoptionForm from './AdoptionForm';


import Inbox from './Inbox';
import PaymentSettings from './PaymentSettings';
import PendingReviews from './PendingReviews';
import SpecialAdoptionForm from './SpecialAdoptionForm';
import LogoutModal from './LogoutModal';
import './UserDashboard.css';

const UserDashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLogout = () => {
        console.log("User logged out");
        setIsModalOpen(false);
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
                        <Route path="/account-management" element={<AccountManagement />} />
                        <Route path="/adoption-process" element={<AdoptionProcess />} />
                        <Route path="/adoption-form" element={<AdoptionForm />} />
                        
                        <Route path="/inbox" element={<Inbox />} />
                        <Route path="/payment-settings" element={<PaymentSettings />} />
                        <Route path="/pending-reviews" element={<PendingReviews />} />
                        <Route path="/special-adoption-form" element={<SpecialAdoptionForm />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;