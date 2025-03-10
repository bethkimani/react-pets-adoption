
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Import CSS for styling

const Sidebar = () => {
    return (
        <div className="user-sidebar">
            <h2>Pet Adoption Navigation</h2>
            <ul>
                <li><Link to="/user-dashboard"><i className="fas fa-tachometer-alt"></i> Dashboard</Link></li>
                <li><Link to="/user-dashboard/adoption-process"><i className="fas fa-paw"></i> Adoption Process</Link></li>
                <li><Link to="/user-dashboard/adoption-form"><i className="fas fa-file-alt"></i> Adoption Form</Link></li>
                <li><Link to="/user-dashboard/special-adoption-form"><i className="fas fa-heart"></i> Special Adoption Form</Link></li>
                <li><Link to="/user-dashboard/payment-settings"><i className="fas fa-credit-card"></i> Payment Settings</Link></li>
                <li><Link to="/user-dashboard/inbox"><i className="fas fa-envelope"></i> Inbox</Link></li>
                <li><Link to="/user-dashboard/account-management"><i className="fas fa-user-cog"></i> Account Management</Link></li>
                <li><Link to="/logout"><i className="fas fa-sign-out-alt"></i> Logout</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;