import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import icons from react-icons
import { getPets, updatePet, deletePet } from '../api';
import './ViewPets.css';

const ViewPets = () => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedPet, setSelectedPet] = useState(null);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await getPets();
                setPets(response.data);
                setLoading(false);
            } catch (error) {
                const errorMessage = error.response?.data?.error || error.message || 'Unknown error';
                setError(`Failed to load pets: ${errorMessage}`);
                setLoading(false);
            }
        };
        fetchPets();
    }, []);

    const handleEdit = (pet) => {
        setSelectedPet(pet);
        setFormData({ ...pet });
        setEditModalOpen(true);
    };

    const handleDelete = (pet) => {
        setSelectedPet(pet);
        setDeleteModalOpen(true);
    };

    const submitEdit = async () => {
        try {
            const updatedPet = new FormData();
            // Append all form fields
            updatedPet.append('name', formData.name || '');
            updatedPet.append('species', formData.species || '');
            updatedPet.append('breed', formData.breed || '');
            updatedPet.append('age', formData.age || '');
            updatedPet.append('adoption_status', formData.adoption_status || '');
            updatedPet.append('description', formData.description || '');
            if (formData.imageFile) {
                updatedPet.append('image', formData.imageFile);
            }

            const response = await updatePet(selectedPet.id, updatedPet);
            setPets(pets.map(p => (p.id === selectedPet.id ? response.data : p))); // Update with server response
            setEditModalOpen(false);
            setError(null); // Clear any previous errors
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message || 'Unknown error';
            setError(`Failed to update pet: ${errorMessage}`);
        }
    };

    const confirmDelete = async () => {
        try {
            await deletePet(selectedPet.id);
            setPets(pets.filter(p => p.id !== selectedPet.id));
            setDeleteModalOpen(false);
            setError(null); // Clear any previous errors
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message || 'Unknown error';
            setError(`Failed to delete pet: ${errorMessage}`);
        }
    };

    const filteredPets = pets.filter(pet => 
        pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (pet.breed?.toLowerCase().includes(searchTerm.toLowerCase()) || false)
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
                className="view-pets-search-input"
            />
            {filteredPets.length === 0 ? (
                <p>No pets found.</p>
            ) : (
                <table className="view-pets-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Species</th>
                            <th>Breed</th>
                            <th>Age</th>
                            <th>Adoption Status</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th>Actions</th>
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
                                            style={{ width: '50px', height: '50px' }}
                                            onError={(e) => { e.target.src = 'https://via.placeholder.com/50'; }}
                                        />
                                    ) : (
                                        <img
                                            src="https://via.placeholder.com/50"
                                            alt="No image"
                                            style={{ width: '50px', height: '50px' }}
                                        />
                                    )}
                                </td>
                                <td className="view-pets-actions">
                                    <button onClick={() => handleEdit(pet)} className="view-pets-edit-btn">
                                        <FaEdit />
                                    </button>
                                    <button onClick={() => handleDelete(pet)} className="view-pets-delete-btn">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Edit Modal */}
            {editModalOpen && (
                <div className="view-pets-modal">
                    <div className="view-pets-modal-content">
                        <h3>Edit Pet</h3>
                        <input
                            type="text"
                            value={formData.name || ''}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Name"
                        />
                        <input
                            type="text"
                            value={formData.species || ''}
                            onChange={(e) => setFormData({ ...formData, species: e.target.value })}
                            placeholder="Species"
                        />
                        <input
                            type="text"
                            value={formData.breed || ''}
                            onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                            placeholder="Breed"
                        />
                        <input
                            type="number"
                            value={formData.age || ''}
                            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                            placeholder="Age"
                        />
                        <input
                            type="text"
                            value={formData.adoption_status || ''}
                            onChange={(e) => setFormData({ ...formData, adoption_status: e.target.value })}
                            placeholder="Adoption Status"
                        />
                        <textarea
                            value={formData.description || ''}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Description"
                        />
                        <input
                            type="file"
                            onChange={(e) => setFormData({ ...formData, imageFile: e.target.files[0] })}
                        />
                        <button onClick={submitEdit}>Save</button>
                        <button onClick={() => setEditModalOpen(false)}>Cancel</button>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {deleteModalOpen && (
                <div className="view-pets-modal">
                    <div className="view-pets-modal-content">
                        <h3>Confirm Delete</h3>
                        <p>Are you sure you want to delete {selectedPet.name}?</p>
                        <button onClick={confirmDelete}>Yes</button>
                        <button onClick={() => setDeleteModalOpen(false)}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewPets;