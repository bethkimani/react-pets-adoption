import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ onLogout }) => {
    const location = useLocation();

    return (
        <div className="user-sidebar">
            <h2>Pet Adoption Navigation</h2>
            <ul>
                <li className={location.pathname === '/user-dashboard' ? 'active' : ''}>
                    <Link to="/user-dashboard">
                        <i className="fas fa-tachometer-alt"></i> Dashboard
                    </Link>
                </li>
                <li className={location.pathname === '/user-dashboard/all-pets' ? 'active' : ''}>
                    <Link to="/user-dashboard/all-pets">
                        <i className="fas fa-paw"></i> All Pets
                    </Link>
                </li>
                <li className={location.pathname === '/user-dashboard/adoption-process' ? 'active' : ''}>
                    <Link to="/user-dashboard/adoption-process">
                        <i className="fas fa-paw"></i> Adopt a pet
                    </Link>
                </li>
                <li className={location.pathname === '/user-dashboard/add-pet' ? 'active' : ''}>
                    <Link to="/user-dashboard/add-pet">
                        <i className="fas fa-plus-circle"></i> Add Pet
                    </Link>
                </li>
                <li className={location.pathname === '/user-dashboard/inbox' ? 'active' : ''}>
                    <Link to="/user-dashboard/inbox">
                        <i className="fas fa-envelope"></i> Inbox
                    </Link>
                </li>
                <li className={location.pathname === '/user-dashboard/account-management' ? 'active' : ''}>
                    <Link to="/user-dashboard/account-management">
                        <i className="fas fa-user-cog"></i> Account Management
                    </Link>
                </li>
                <li>
                    <button onClick={onLogout} className="logout-button">
                        <i className="fas fa-sign-out-alt"></i> Logout
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;