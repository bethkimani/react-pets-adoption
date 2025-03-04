
import React from 'react';
import './LogoutModal.css'; // Optional: CSS for styling

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Are you sure you want to leave the admin page?</h2>
                <div className="modal-actions">
                    <button className="cancel-button" onClick={onClose}>Cancel</button>
                    <button className="logout-button" onClick={onConfirm}>Logout</button>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;