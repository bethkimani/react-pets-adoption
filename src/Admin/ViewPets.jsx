import React, { useEffect, useState } from 'react';
import './ViewPets.css';

const ViewPets = () => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    // Mock data for testing
    const mockPets = [
        {
            id: 1,
            name: "Bella",
            species: "Dog",
            breed: "Labrador",
            age: "2 years",
            adoptionStatus: "Available",
            description: "Friendly and playful.",
            image: "https://via.placeholder.com/50"
        },
        {
            id: 2,
            name: "Mittens",
            species: "Cat",
            breed: "Siamese",
            age: "3 years",
            adoptionStatus: "Adopted",
            description: "Loves to cuddle.",
            image: "https://via.placeholder.com/50"
        }
    ];

    useEffect(() => {
        const fetchPets = () => {
            try {
                setTimeout(() => {
                    setPets(mockPets);
                    setLoading(false);
                }, 1000);
            } catch (error) {
                setError("Failed to load pets. Please try again later.");
                setLoading(false);
            }
        };

        fetchPets();
    }, []);

    const filteredPets = pets.filter(pet => 
        pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.breed.toLowerCase().includes(searchTerm.toLowerCase())
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
                                <td>{pet.breed}</td>
                                <td>{pet.age}</td>
                                <td>{pet.adoptionStatus}</td>
                                <td>{pet.description}</td>
                                <td>
                                    <img src={pet.image} alt={pet.name} style={{ width: "50px", height: "50px" }} />
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