// Dashboard.jsx
import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Paperless Adoption Management System</h1>
        <p>Adoptive streamlines the entire adoption process to help you adopt more pets, faster.</p>
      </div>

      <div className="dashboard-content">
        {/* Central Pet Icon */}
        <div className="pet-icon">🐾</div>

        {/* Adopter Circle */}
        <div className="circle adopter-circle">
          <span className="circle-label">ADOPTER</span>
          <div className="feature intelligent-pet-search">
            <span>Intelligent Pet Search</span>
          </div>
          <div className="feature online-application">
            <span>Online Application</span>
          </div>
          <div className="feature automatic-status-updates">
            <span>Automatic Status Updates</span>
          </div>
        </div>

        {/* Shelter Circle */}
        <div className="circle shelter-circle">
          <span className="circle-label">SHELTER</span>
          <div className="feature donation-campaigns">
            <span>Donation Campaigns</span>
          </div>
          <div className="feature automated-emails">
            <span>Automated Emails</span>
          </div>
          <div className="feature approval-workflow">
            <span>Approval Workflow</span>
          </div>
          <div className="feature visualization-dashboard">
            <span>Visualization Dashboard</span>
          </div>
        </div>

        {/* In-person & Online Adoptions Label */}
        <div className="adoptions-label">
          <p>In-person & Online Adoptions</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;