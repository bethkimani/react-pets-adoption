import React, { useState } from 'react';
import './AccountManagement.css';

const AccountManagement = () => {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className="account-management">
            <h2>My Account</h2>
            <h4>Manage your profile and adoption details</h4>
            <div className="nav-menu">
                <button onClick={() => setActiveTab('profile')}>Profile</button>
                <button onClick={() => setActiveTab('adoptionHistory')}>Adoption History</button>
                <button onClick={() => setActiveTab('favorites')}>Favorites</button>
                <button onClick={() => setActiveTab('settings')}>Settings</button>
                <button onClick={() => setActiveTab('support')}>Support</button>
            </div>
            <div className="tab-content">
                {activeTab === 'profile' && <Profile />}
                {activeTab === 'adoptionHistory' && <AdoptionHistory />}
                {activeTab === 'favorites' && <Favorites />}
                {activeTab === 'settings' && <Settings />}
                {activeTab === 'support' && <Support />}
            </div>
        </div>
    );
};

const Profile = () => (
    <div className="profile-section">
        <h3>Profile</h3>
        <div>
            <label>Upload Profile Photo:</label>
            <input type="file" accept="image/*" />
        </div>
        <div>
            <label>Name:</label>
            <input type="text" placeholder="John Doe" />
        </div>
        <div>
            <label>Email:</label>
            <input type="email" placeholder="john.doe@example.com" />
        </div>
        <div className="button-group">
            <button className="button">Edit Profile</button>
            <button className="button">Change Password</button>
        </div>
    </div>
);

const AdoptionHistory = () => (
    <div className="adoption-history-section">
        <h3>Adoption History</h3>
        <p>Current Adoptions:</p>
        <div className="pet-item">Fluffy (Adopted on Jan 1, 2023) <button>Update Care Info</button></div>
        <p>Past Adoptions:</p>
        <div className="pet-item">Bella (Adopted on Jan 1, 2022) <button>Leave a Review</button></div>
    </div>
);

const Favorites = () => (
    <div className="favorites-section">
        <h3>Favorites</h3>
        <div className="pet-item">Max <button>Remove from Favorites</button></div>
        <div className="pet-item">Daisy <button>Remove from Favorites</button></div>
    </div>
);

const Settings = () => (
    <div className="settings-section">
        <h3>Settings</h3>
        <div>
            <label>Notification Preferences:</label>
            <input type="checkbox" /> Email Notifications
            <input type="checkbox" /> SMS Notifications
        </div>
        <div>
            <label>Language Preferences:</label>
            <select>
                <option>English</option>
                <option>Spanish</option>
            </select>
        </div>
    </div>
);

const Support = () => (
    <div className="support-section">
        <h3>Support</h3>
        <p>Help Center</p>
        <button>Contact Support</button>
    </div>
);

export default AccountManagement;