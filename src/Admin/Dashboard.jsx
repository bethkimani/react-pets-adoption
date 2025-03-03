
import React from 'react';
import './dashboard.css';

const Dashboard = ({ onEditPet }) => {
    const pets = [
        { id: 1, name: 'Henry', adoptionStatus: 'Available', owner: 'None' },
        { id: 2, name: 'Riga', adoptionStatus: 'Available', owner: 'None' },
        { id: 3, name: 'Johnny', adoptionStatus: 'Adopted', owner: 'Owner Name' },
        // Add more pets as needed
    ];

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <div className="statistics">
                <div className="stat-card">
                    <h2>Total Admins</h2>
                    <p>4</p>
                </div>
                <div className="stat-card">
                    <h2>Total Users</h2>
                    <p>36</p>
                </div>
                <div className="stat-card">
                    <h2>Adopted Pets</h2>
                    <p>7</p>
                </div>
                <div className="stat-card">
                    <h2>Fostered Pets</h2>
                    <p>2</p>
                </div>
                <div className="stat-card">
                    <h2>Available Pets</h2>
                    <p>39</p>
                </div>
                <div className="stat-card">
                    <h2>Total Pets</h2>
                    <p>39</p>
                </div>
                <div className="stat-card">
                    <h2>Dogs</h2>
                    <p>5</p>
                </div>
                <div className="stat-card">
                    <h2>Cats</h2>
                    <p>3</p>
                </div>
                <div className="stat-card">
                    <h2>Hamsters</h2>
                    <p>1</p>
                </div>
                <div className="stat-card">
                    <h2>Fish</h2>
                    <p>2</p>
                </div>
                <div className="stat-card">
                    <h2>Turtles</h2>
                    <p>1</p>
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
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pets.map((pet) => (
                            <tr key={pet.id}>
                                <td>{pet.id}</td>
                                <td>{pet.name}</td>
                                <td>{pet.adoptionStatus}</td>
                                <td>{pet.owner}</td>
                                <td>
                                    <button onClick={() => onEditPet(pet)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;