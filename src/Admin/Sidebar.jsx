/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { FaHome, FaPaw, FaSignOutAlt, FaUsers, FaFileAlt } from 'react-icons/fa';
import './Sidebar.css';
import { RiAccountCircleLine } from "react-icons/ri";

const Sidebar = ({ onLogout }) => {
    const adminName = localStorage.getItem('username')
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
                    <Link to="/admin-dashboard/chats" className="sidebar-link">
                        <FaPaw /> Chats
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

            {/*  Make user info clickable */}
            <Link to="/admin-dashboard/profile" className="sidebar-user">
                <RiAccountCircleLine className="user-icon" />
                <span className="user-name">{adminName}</span>
            </Link>
        </div>
    );
};

export default Sidebar;
