
import React from 'react';
import './dashboard.css';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <div className="statistics">
                <div className="stat-card">
                    <h2>Total Admins</h2>
                    <p>36</p>
                </div>
                <div className="stat-card">
                    <h2>Total Users</h2>
                    <p>39</p>
                </div>
                <div className="stat-card">
                    <h2>Adopted Pets</h2>
                    <p>5</p>
                </div>
                <div className="stat-card">
                    <h2>Fostered Pets</h2>
                    <p>3</p>
                </div>
            </div>

            <div className="tables">
                <h2>Users List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Admin</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Yes</td>
                            <td>Rija</td>
                            <td>rija@gmail.com</td>
                            <td>123456789</td>
                        </tr>
                        {/* More rows as needed */}
                    </tbody>
                </table>

                <h2>Pets List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Adoption Status</th>
                            <th>Owner</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Henry</td>
                            <td>Available</td>
                            <td>None</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Riga</td>
                            <td>Available</td>
                            <td>None</td>
                        </tr>
                        {/* More rows as needed */}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;