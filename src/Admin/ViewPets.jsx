import { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { getPets, updatePet, deletePet, getAdoptions, deleteAdoption } from '../api';
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
            updatedPet.append('name', formData.name || '');
            updatedPet.append('species', formData.species || '');
            updatedPet.append('breed', formData.breed || '');
            updatedPet.append('age', formData.age || '');
            updatedPet.append('adoption_status', formData.adoption_status || '');
            updatedPet.append('gender', formData.gender || '');
            updatedPet.append('vaccination_status', formData.vaccination_status || '');
            updatedPet.append('special_needs', formData.special_needs || '');
            updatedPet.append('personality', formData.personality || '');
            updatedPet.append('back_story', formData.back_story || '');
            if (formData.imageFile) {
                updatedPet.append('image', formData.imageFile);
            }

            const response = await updatePet(selectedPet.id, updatedPet);
            setPets(pets.map(p => (p.id === selectedPet.id ? response.data : p)));
            setEditModalOpen(false);
            setError(null);
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message || 'Unknown error';
            setError(`Failed to update pet: ${errorMessage}`);
        }
    };

    const confirmDelete = async () => {
        try {
            // Attempt to fetch and delete related adoptions, but don't fail the pet deletion if this step fails
            let relatedAdoptions = [];
            try {
                const adoptionsResponse = await getAdoptions();
                relatedAdoptions = adoptionsResponse.data.filter(
                    adoption => adoption.pet_id === selectedPet.id
                );
            } catch (adoptionError) {
                console.warn('Failed to fetch adoptions:', adoptionError.response?.data?.error || adoptionError.message);
                // Continue with pet deletion even if fetching adoptions fails
            }

            // Delete related adoptions, if any
            if (relatedAdoptions.length > 0) {
                await Promise.all(
                    relatedAdoptions.map(async (adoption) => {
                        try {
                            await deleteAdoption(adoption.id);
                        } catch (deleteAdoptionError) {
                            console.warn(`Failed to delete adoption ${adoption.id}:`, deleteAdoptionError.response?.data?.error || deleteAdoptionError.message);
                            // Continue even if deletion of an adoption fails
                        }
                    })
                );
            }

            // Now delete the pet
            try {
                await deletePet(selectedPet.id);
                setPets(pets.filter(p => p.id !== selectedPet.id));
                setDeleteModalOpen(false);
                setError(null);
            } catch (petDeleteError) {
                const errorMessage = petDeleteError.response?.data?.error || petDeleteError.message || 'Unknown error';
                setError(`Failed to delete pet: ${errorMessage}`);
            }
        } catch (error) {
            // Catch any unexpected errors not caught in the inner try-catch blocks
            const errorMessage = error.response?.data?.error || error.message || 'Unknown error';
            setError(`Unexpected error during deletion: ${errorMessage}`);
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
                            <th>Owner</th>
                            <th>Species</th>
                            <th>Breed</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Adoption Status</th>
                            <th>Vaccination Status</th>
                            <th>Special Needs</th>
                            <th>Personality</th>
                            <th>Back Story</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPets.map(pet => (
                            <tr key={pet.id}>
                                <td>{pet.name}</td>
                                <td>{pet.owner ? pet.owner.name : 'N/A'}</td>
                                <td>{pet.species}</td>
                                <td>{pet.breed || 'N/A'}</td>
                                <td>{pet.age || 'N/A'}</td>
                                <td>{pet.gender || 'N/A'}</td>
                                <td>{pet.adoption_status}</td>
                                <td>{pet.vaccination_status || 'N/A'}</td>
                                <td>{pet.special_needs || 'N/A'}</td>
                                <td>{pet.personality || 'N/A'}</td>
                                <td>{pet.back_story || 'N/A'}</td>
                                <td>
                                    {pet.image ? (
                                        <img
                                            src={`https://pets-adoption-flask-sqlite-enz1.onrender.com${pet.image}`}
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
                            value={formData.gender || ''}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                            placeholder="Gender"
                        />
                        <input
                            type="text"
                            value={formData.adoption_status || ''}
                            onChange={(e) => setFormData({ ...formData, adoption_status: e.target.value })}
                            placeholder="Adoption Status"
                        />
                        <input
                            type="text"
                            value={formData.vaccination_status || ''}
                            onChange={(e) => setFormData({ ...formData, vaccination_status: e.target.value })}
                            placeholder="Vaccination Status"
                        />
                        <input
                            type="text"
                            value={formData.special_needs || ''}
                            onChange={(e) => setFormData({ ...formData, special_needs: e.target.value })}
                            placeholder="Special Needs"
                        />
                        <input
                            type="text"
                            value={formData.personality || ''}
                            onChange={(e) => setFormData({ ...formData, personality: e.target.value })}
                            placeholder="Personality"
                        />
                        <textarea
                            value={formData.back_story || ''}
                            onChange={(e) => setFormData({ ...formData, back_story: e.target.value })}
                            placeholder="Back Story"
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