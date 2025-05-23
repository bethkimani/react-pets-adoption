// LogoutModal.jsx
import React from 'react';
import './LogoutModal.css';

const LogoutModal = ({ isOpen, onClose, onLogout }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirm Logout</h2>
        <p>Are you sure you want to logout?</p>
        <button onClick={onLogout}>Yes, Logout</button>
        <button onClick={onClose} className="secondary">Cancel</button>
      </div>
    </div>
  );
};

export default LogoutModal;