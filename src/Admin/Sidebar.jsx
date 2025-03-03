import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch, FaPaw, FaUser, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = ({ onViewMyPets, onViewProfile }) => {
    return (
        <div className="sidebar">
            <h2>Admin Dashboard</h2>
            <ul>
                <li>
                    <Link to="/admin-dashboard">
                        <FaHome /> Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/search">
                        <FaSearch /> Search
                    </Link>
                </li>
                <li>
                    <Link to="/pets">
                        <FaPaw /> Manage Pets
                    </Link>
                </li>
                <li>
                    <button onClick={onViewProfile}>
                        <FaUser /> My Profile
                    </button>
                </li>
                <li>
                    <button onClick={onViewMyPets}>
                        <FaPaw /> My Pets
                    </button>
                </li>
                <li>
                    <Link to="/logout">
                        <FaSignOutAlt /> Logout
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;