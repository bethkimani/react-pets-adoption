import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaPaw, FaUser, FaSignOutAlt, FaUsers, FaFileAlt } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ onLogout }) => {
    return (
        <div className="sidebar">
            <h2 className="sidebar-title">Pet Dashboard</h2>
            <ul className="sidebar-menu">
                <li>
                    <Link to="/admin-dashboard" className="sidebar-link">
                        <FaHome /> Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/admin-dashboard/teams" className="sidebar-link">
                        <FaUsers /> Users
                    </Link>
                </li>
                <li>
                    <Link to="/admin-dashboard/add-pet" className="sidebar-link">
                        <FaPaw /> Add Pet
                    </Link>
                </li>
                <li>
                    <Link to="/admin-dashboard/view-pets" className="sidebar-link">
                        <FaPaw /> View Pets
                    </Link>
                </li>
                <li>
                    <Link to="/admin-dashboard/manage-adoptions" className="sidebar-link">
                        <FaFileAlt /> Manage Adoptions
                    </Link>
                </li>
                <li>
                    <Link to="/admin-dashboard/change-password" className="sidebar-link">
                        <FaPaw /> Change Password
                    </Link>
                </li>
                <li>
                    <Link to="/admin-dashboard/profile" className="sidebar-link">
                        <FaUser /> My Profile
                    </Link>
                </li>
                <li>
                    <Link to="/admin-dashboard/view-feedback" className="sidebar-link">
                        <FaUsers /> User Feedback
                    </Link>
                </li>
                <li>
                    <button onClick={onLogout} className="sidebar-link">
                        <FaSignOutAlt /> Logout
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;