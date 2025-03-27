// AccountManagement.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AccountManagement.css';

const AccountManagement = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="account-management">
      <h1>My Account</h1>
      <h4>Manage your profile and adoption details</h4>
      <div className="nav-menu">
        <button onClick={() => setActiveTab('profile')} className={activeTab === 'profile' ? 'active' : ''}>Profile</button>
        <button onClick={() => setActiveTab('adoptionHistory')} className={activeTab === 'adoptionHistory' ? 'active' : ''}>Adoption History</button>
        <button onClick={() => setActiveTab('favorites')} className={activeTab === 'favorites' ? 'active' : ''}>Favorites</button>
        <button onClick={() => setActiveTab('settings')} className={activeTab === 'settings' ? 'active' : ''}>Settings</button>
        <button onClick={() => setActiveTab('support')} className={activeTab === 'support' ? 'active' : ''}>Support</button>
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
    <h2>Profile</h2>
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
    <div className="adoption-summary">
      <h3>Adoption Summary</h3>
      <div className="summary-item">
        <span>🐾 Pets Adopted: 3</span>
      </div>
      <div className="summary-item">
        <span>❤️ Pets Given for Adoption: 1</span>
      </div>
      <div className="summary-item">
        <span>⏰ Ongoing Requests: 2</span>
        <Link to="/ongoing-requests" className="button secondary">View Details</Link>
      </div>
    </div>
    <div className="button-group">
      <button className="button">Edit Profile</button>
      <button className="button secondary">Change Password</button>
    </div>
  </div>
);

const AdoptionHistory = () => (
  <div className="adoption-history-section">
    <h2>Adoption History</h2>
    <p>Current Adoptions:</p>
    <div className="pet-item">Fluffy (Adopted on Jan 1, 2023) <button className="button">Update Care Info</button></div>
    <p>Past Adoptions:</p>
    <div className="pet-item">Bella (Adopted on Jan 1, 2022) <button className="button">Leave a Review</button></div>
  </div>
);

const Favorites = () => (
  <div className="favorites-section">
    <h2>Favorites</h2>
    <div className="pet-item">Max <button className="button secondary">Remove from Favorites</button></div>
    <div className="pet-item">Daisy <button className="button secondary">Remove from Favorites</button></div>
  </div>
);

const Settings = () => (
  <div className="settings-section">
    <h2>Settings</h2>
    <div>
      <label>Notification Preferences:</label>
      <div>
        <input type="checkbox" id="email-notifications" />
        <label htmlFor="email-notifications">Email Notifications</label>
      </div>
      <div>
        <input type="checkbox" id="sms-notifications" />
        <label htmlFor="sms-notifications">SMS Notifications</label>
      </div>
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
    <h2>Support</h2>
    <p>Help Center</p>
    <button className="button">Contact Support</button>
  </div>
);

export default AccountManagement;