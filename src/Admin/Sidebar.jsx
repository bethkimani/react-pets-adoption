import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaPaw, FaUser, FaSignOutAlt } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ onViewMyPets, onViewProfile, onLogout }) => {
    return (
        <div className="sidebar">
            <h2 className="sidebar-title">Pet Dashboard</h2>
            <ul className="sidebar-menu">
                <li>
                    <Link to="/admin-dashboard" className="sidebar-link">
                        <FaHome className="icon" /> Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/admin-dashboard/view-pets" className="sidebar-link">
                        <FaPaw className="icon" /> View Pets
                    </Link>
                </li>
                <li>
                    <Link to="/admin-dashboard/add-pet" className="sidebar-link">
                        <FaPaw className="icon" /> Add Pet
                    </Link>
                </li>
                <li>
                    <Link to="/admin-dashboard/my-pets" className="sidebar-link">
                        <FaPaw className="icon" /> My Pets
                    </Link>
                </li>
                <li>
                    <Link to="/admin-dashboard/profile" className="sidebar-link">
                        <FaUser className="icon" /> My Profile
                    </Link>
                </li>
                <li>
                    <button onClick={onLogout} className="sidebar-link">
                        <FaSignOutAlt className="icon" /> Logout
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;