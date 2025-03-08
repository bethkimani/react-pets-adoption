import React, { useState } from 'react';
import './ChangePassword.css';

const ChangePassword = ({ onChangePassword }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        onChangePassword(currentPassword, newPassword);
    };

    return (
        <form onSubmit={handleSubmit} className="change-password-form">
            <h2>Change Password</h2>
            <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Current Password"
                required
            />
            <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                required
            />
            <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm New Password"
                required
            />
            <button type="submit">Change Password</button>
        </form>
    );
};

export default ChangePassword;