import React, { useEffect, useState } from 'react';
import { getPets } from '../api'; // Import the getPets function
import './ViewPets.css';

const ViewPets = () => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await getPets();
                setPets(response.data); // Set the pets from the API response
                setLoading(false);
            } catch (error) {
                const errorMessage = error.response?.data?.error || error.message || "Unknown error";
                setError(`Failed to load pets: ${errorMessage}`);
                setLoading(false);
            }
        };

        fetchPets();
    }, []);

    const filteredPets = pets.filter(pet => 
        pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.breed?.toLowerCase().includes(searchTerm.toLowerCase()) || false // Handle null breed
    );

    if (loading) return <p>Loading pets...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="view-pets-container">
            <h2>View Pets</h2>
            <input
                type="text"
                placeholder="Search by name, species, or breed"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
            {filteredPets.length === 0 ? (
                <p>No pets found.</p>
            ) : (
                <table className="pets-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Species</th>
                            <th>Breed</th>
                            <th>Age</th>
                            <th>Adoption Status</th>
                            <th>Description</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPets.map(pet => (
                            <tr key={pet.id}>
                                <td>{pet.name}</td>
                                <td>{pet.species}</td>
                                <td>{pet.breed || 'N/A'}</td>
                                <td>{pet.age || 'N/A'}</td>
                                <td>{pet.adoption_status}</td>
                                <td>{pet.description || 'N/A'}</td>
                                <td>
                                    {pet.image ? (
                                        <img
                                            src={`https://pets-adoption-flask-sqlite.onrender.com${pet.image}`}
                                            alt={pet.name}
                                            style={{ width: "50px", height: "50px" }}
                                            onError={(e) => {
                                                e.target.src = "https://via.placeholder.com/50"; // Fallback image if the pet image fails to load
                                            }}
                                        />
                                    ) : (
                                        <img
                                            src="https://via.placeholder.com/50"
                                            alt="No image"
                                            style={{ width: "50px", height: "50px" }}
                                        />
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ViewPets;