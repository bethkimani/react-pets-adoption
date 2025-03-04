import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaPaw, FaUser, FaSignOutAlt, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import './Sidebar.css'; // Import CSS file

const Sidebar = ({ onViewMyPets, onViewProfile }) => {
    const [showManagePets, setShowManagePets] = useState(false);

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
                    <button className="sidebar-link dropdown-btn" onClick={() => setShowManagePets(!showManagePets)}>
                        <FaPaw className="icon" /> Manage Pets
                        {showManagePets ? <FaChevronDown className="dropdown-icon" /> : <FaChevronRight className="dropdown-icon" />}
                    </button>
                    {showManagePets && (
                        <ul className="dropdown-menu">
                            <li>
                                <Link to="/add-pet" className="sidebar-link">Add Pet</Link>
                            </li>
                            <li>
                                <Link to="/view-pets" className="sidebar-link">View Pets</Link>
                            </li>
                        </ul>
                    )}
                </li>

                <li>
                    <button onClick={onViewMyPets} className="sidebar-link">
                        <FaPaw className="icon" /> My Pets
                    </button>
                </li>

                <li>
                    <button onClick={onViewProfile} className="sidebar-link">
                        <FaUser className="icon" /> My Profile
                    </button>
                </li>

                <li>
                    <Link to="/logout" className="sidebar-link">
                        <FaSignOutAlt className="icon" /> Logout
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
