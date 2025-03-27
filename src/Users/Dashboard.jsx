// Dashboard.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";
import pinIcon from '../assets/images/pin.ico';
import './Dashboard.css';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const Dashboard = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Pets Adopted',
        data: [10, 20, 30, 40, 50, 50, 60, 65, 70, 75, 80, 90],
        fill: true,
        backgroundColor: 'rgba(74, 144, 226, 0.5)', // Match primary blue
        borderColor: '#4A90E2',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="dashboard">
      {/* Navbar with Search Bar */}
      <header className="navbar">
        <div className="location">
          <img src={pinIcon} alt="Location Pin" className="icon" />
          <span>Riyadh, Saudi Arabia</span>
        </div>
        <h1>Looking for Adoption</h1>
        <div className="search-container">
          <input type="text" placeholder="Search ..." />
          <button className="notification-icon" aria-label="Notifications">🔔</button>
        </div>
      </header>

      {/* Main Content Section */}
      <div className="combined-section">
        {/* Graph Section */}
        <section className="progress-graph">
          <h2>Pets Growth Health</h2>
          <Line data={data} />
          <div className="adopted-info">
            <span>12 Jan 2022</span>
            <span>50 adopted</span>
          </div>
        </section>

        {/* Right Side Sections */}
        <div className="right-sections">
          {/* Upcoming Schedule Section */}
          <div className="upcoming-schedule">
            <h2>Upcoming Schedule</h2>
            <div className="schedule-item">
              <span>09:00 AM</span>
              <p>Health checkup</p>
              <button className="book-button">Book Now</button>
            </div>
            <div className="schedule-item">
              <span>10:00 AM</span>
              <p>Health adoption 2</p>
              <button className="book-button">Book Now</button>
            </div>
          </div>

          {/* Pets Growth Health Section */}
          <div className="pet-reviews">
            <h2>Pets Growth Health</h2>
            <div className="review-item">
              <span>3 years</span>
              <p>Animal age</p>
            </div>
            <div className="review-item">
              <span>87.5 centimeters</span>
              <p>Animal height</p>
            </div>
            <div className="star-rating">
              <span>Rating: </span>
              <span>⭐⭐⭐⭐⭐</span>
            </div>
            <Link to="/download-report" className="download-report">Download Report</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;