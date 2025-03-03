
import React from 'react';
import Sidebar from './Sidebar'; // Ensure you import the Sidebar
import Dashboard from './Dashboard'; // Ensure you import the Dashboard
import './Admin.css'; // Import any necessary styles

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <Sidebar />
            <div className="main-content">
                <Dashboard />
            </div>
        </div>
    );
};

export default AdminDashboard;