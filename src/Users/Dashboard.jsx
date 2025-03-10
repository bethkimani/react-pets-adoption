import React from 'react';
import './Dashboard.css'; // User dashboard styles

const Dashboard = () => {
    return (
        <div className="user-dashboard-content">
            <h2>Dashboard</h2>
            <div className="organization-info">
                <h3>test12345</h3>
                <p>Organization ID: N12345</p>
                <button className="change-org-btn">Change Org</button>
            </div>
            <div className="dashboard-overview">
                <div className="dashboard-card">
                    <h3>Adoptable Pets</h3>
                    <p>42</p>
                </div>
                <div className="dashboard-card">
                    <h3>Applications Pending</h3>
                    <p>20</p>
                </div>
                <div className="dashboard-card">
                    <h3>Pets On Hold</h3>
                    <p>166</p>
                </div>
                <div className="dashboard-card">
                    <h3>Pets Adopted</h3>
                    <p>133</p>
                </div>
                <div className="dashboard-card">
                    <h3>Drafts</h3>
                    <p>958</p>
                </div>
            </div>
            <div className="annual-review">
                <div className="annual-review-content">
                    <span className="year">2025</span>
                    <div className="annual-review-text">
                        <h3>Your Annual Review is here!</h3>
                        <p>Recap the past year with a curated view of your life-saving impact. View your top pet profiles, average time pets spent on-site, funds you’ve raised, and more.</p>
                        <button className="annual-review-btn">See the Annual Review</button>
                    </div>
                </div>
            </div>
            <div className="dashboard-stats">
                <h3>This Week's Stats</h3>
                <div className="week-stats-container">
                    <div className="week-stats-header">
                        <p>7/20/23 - 7/26/23</p>
                    </div>
                    <div className="stats-cards">
                        <div className="stat-card">
                            <h4>Locations</h4>
                            <p>8</p>
                        </div>
                        <div className="stat-card">
                            <h4>Homepage Views</h4>
                            <p>31</p>
                        </div>
                        <div className="stat-card">
                            <h4>Pet Listings</h4>
                            <p>684</p>
                        </div>
                        <div className="stat-card">
                            <h4>Pet Inquiries</h4>
                            <p>3</p>
                        </div>
                        <div className="stat-card">
                            <h4>Pets Adopted</h4>
                            <p>0</p>
                        </div>
                    </div>
                    <button className="add-pet-btn">Add a Pet</button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;