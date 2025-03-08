import React from 'react';
import './LogoutModal.css';

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Are you sure you want to log out?</h2>
                <div className="modal-actions">
                    <button className="cancel-button" onClick={onClose}>Cancel</button>
                    <button className="logout-button" onClick={onConfirm}>Logout</button>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;