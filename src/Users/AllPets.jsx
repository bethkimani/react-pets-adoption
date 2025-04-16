import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { getPets, updatePet } from '../api';
import './AllPets.css';

const AllPets = () => {
    const [pets, setPets] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await getPets();
                setPets(response.data);
            } catch (error) {
                console.error('Error fetching pets:', error);
                setError('Failed to load pets. Please try again later.');
            }
        };
        fetchPets();
    }, []);

    const handleAdoptClick = async (pet) => {
        if (pet.adoption_status.toLowerCase() !== 'available') {
            alert(`${pet.name} has already found their forever home. 🏡`);
            return;
        }

        navigate(`adoption-process/${pet.id}`);
        setError(null);

    };

    if (error && pets.length === 0) {
        return <div className="all-pets"><p>{error}</p></div>;
    }

    return (
        <div className="all-pets">
            <div className="catalogue">
                <h1>
                    <FontAwesomeIcon icon={faHeart} className="heart-icon" /> All Pets <FontAwesomeIcon icon={faHeart} className="heart-icon" />
                </h1>
                <h2>Catalogue</h2>
                {error && <p className="error-message">{error}</p>}
                <div className="pets-gallery">
                    {pets.map((pet) => (
                        <div key={pet.id} className="pet-card">
                            <img
                                src={pet.image ? `https://pets-adoption-flask-sqlite-1-l2rp.onrender.com${pet.image}` : 'default-image.jpg'}
                                alt={pet.name}
                                className="pet-image"
                            />
                            <h2>{pet.name}</h2>
                            <div className="button-container">
                                <button 
                                    className={`adopt-button ${pet.adoption_status.toLowerCase() !== 'available' ? 'adopted' : ''}`}
                                    onClick={() => handleAdoptClick(pet)}
                                    disabled={pet.adoption_status.toLowerCase() !== 'available' }
                                >
                                    {(pet.adoption_status.toLowerCase() === 'available' ? 'Adopt Me' : 'Adopted')}
                                </button>
                            </div>
                            <div className="pet-details">
                                <p>Species: {pet.species || 'N/A'}</p>
                                <p>Breed: {pet.breed || 'N/A'}</p>
                                <p>Age: {pet.age || 'N/A'}</p>
                                <p>Adoption Status: {pet.adoption_status || 'N/A'}</p>
                                <p>Description: {pet.description || 'N/A'}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllPets;