import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import { RiAccountCircleLine } from "react-icons/ri";
import { FaHome, FaPaw, FaPlusCircle, FaEnvelope, FaUserCog, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = ({ onLogout }) => {
    const location = useLocation()
    const userName = localStorage.getItem('username')

    return (
        <div className="sidebar">
            <h2 className="sidebar-title">Pet Dashboard</h2>
            <ul className="sidebar-menu">
                <li className={location.pathname === '/user-dashboard' ? 'active' : ''}>
                    <Link to="/user-dashboard" className="sidebar-link">
                        <FaHome /> Dashboard
                    </Link>
                </li>
                <li className={location.pathname === '/user-dashboard/all-pets' ? 'active' : ''}>
                    <Link to="/user-dashboard/all-pets" className="sidebar-link">
                        <FaPaw /> All Pets
                    </Link>
                </li>
                <li className={location.pathname === '/user-dashboard/adoption-process' ? 'active' : ''}>
                    <Link to="/user-dashboard/adoption-process" className="sidebar-link">
                        <FaPaw /> Adopt a Pet
                    </Link>
                </li>
                <li className={location.pathname === '/user-dashboard/add-pet' ? 'active' : ''}>
                    <Link to="/user-dashboard/add-pet" className="sidebar-link">
                        <FaPlusCircle /> Add Pet
                    </Link>
                </li>
                <li className={location.pathname === '/user-dashboard/inbox' ? 'active' : ''}>
                    <Link to="/user-dashboard/inbox" className="sidebar-link">
                        <FaEnvelope /> Inbox
                    </Link>
                </li>
                <li>
                    <button onClick={onLogout} className="sidebar-link">
                        <FaSignOutAlt /> Logout
                    </button>
                </li>
            </ul>

            {/* User Profile Link at bottom */}
            <Link to="/user-dashboard/account-management" className="sidebar-user">
                <RiAccountCircleLine className="user-icon" />
                <span className="user-name">{userName}</span>
            </Link>
        </div>
    );
};

export default Sidebar;
