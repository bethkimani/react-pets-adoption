import React from 'react';
import './LogoutModal.css'; // Import the CSS for styling

const LogoutModal = ({ isOpen, onClose, onLogout }) => {
    if (!isOpen) return null; // Don't render if not open

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Confirm Logout</h2>
                <p>Are you sure you want to logout?</p>
                <button onClick={onLogout}>Yes, Logout</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default LogoutModal;