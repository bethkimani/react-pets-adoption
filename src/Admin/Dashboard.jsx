import React, { useEffect, useRef,useState } from 'react';
import { Chart, registerables } from 'chart.js';
import './Dashboard.css';
import { getTotalPets,getTotalAdoptedPets,getTotalUsers } from '../api';

Chart.register(...registerables);

const Dashboard = () => {
    const adoptionRateChartRef = useRef(null);
    const adoptionSummaryChartRef = useRef(null);

    const [pets, setPets] = useState("");
    const [AdoptedPets, setAdoptedPets] = useState("");
    const [users, setUsers] = useState("");



    useEffect(() => {
        const fetchData = async () => {
          try {
            // Start all requests simultaneously
            const [petsResponse, adoptedResponse,usersResponse] = await Promise.all([
              getTotalPets(),
              getTotalAdoptedPets(),
              getTotalUsers()

            ]);
            console.log(usersResponse.data.total_user);
      
            setPets(petsResponse.data.total_pets);
            setAdoptedPets(adoptedResponse.data.total_adopted);
            setUsers(usersResponse.data.total_user);
      
          } catch (error) {
            console.error('Error fetching data:', error);
            setError('Failed to load data');
          }
        };
      
        fetchData();
      }, []);
    

    useEffect(() => {
        const adoptionRateChart = new Chart(adoptionRateChartRef.current, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Adoption Rate',
                    data: [30, 45, 50, 70, 85, 90, 70, 60, 80, 95, 100, 120], // Example data for adoption rates
                    borderColor: 'blue',
                    backgroundColor: 'rgba(0, 0, 255, 0.2)',
                    borderWidth: 2,
                    pointRadius: 5,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
            },
        });

        const adoptionSummaryChart = new Chart(adoptionSummaryChartRef.current, {
            type: 'pie',
            data: {
                labels: ['Adopted', 'Available', 'Pending'],
                datasets: [{
                    data: [300, 150, 50], // Example data for each category
                    backgroundColor: ['#4CAF50', '#FFC107', '#FF5722'], // Colors for each category
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
            },
        });

        return () => {
            adoptionRateChart.destroy();
            adoptionSummaryChart.destroy();
        };
    }, []);

    return (
        <div>
            <header className="dashboard-header">
                <h1>Admin Dashboard</h1>
            </header>

            <section className="summary-cards">
                <div className="summary-card">{users} Users</div>
                <div className="summary-card">{pets} Total Pets</div>
                <div className="summary-card">{AdoptedPets} Adopted Pets</div>
            </section>

            <section className="charts">
                <div className="chart-container">
                    <h2>Pet Adoption Chart</h2>
                    <canvas ref={adoptionRateChartRef}></canvas>
                </div>
                <div className="chart-container">
                    <h2>Adoption Summary</h2>
                    <canvas ref={adoptionSummaryChartRef}></canvas>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;