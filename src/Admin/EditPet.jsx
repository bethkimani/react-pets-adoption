
import React, { useState } from 'react';
import './EditPet.css'; // Ensure this path is correct

const EditPet = ({ pet, onSave, onCancel }) => {
    const [name, setName] = useState(pet.name);
    const [type, setType] = useState(pet.type);
    const [adoptionStatus, setAdoptionStatus] = useState(pet.adoptionStatus);
    const [breed, setBreed] = useState(pet.breed);
    const [height, setHeight] = useState(pet.height);
    const [weight, setWeight] = useState(pet.weight);
    const [color, setColor] = useState(pet.color);
    const [hypoallergenic, setHypoallergenic] = useState(pet.hypoallergenic);
    const [dietary, setDietary] = useState(pet.dietary);
    const [bio, setBio] = useState(pet.bio);
    const [picture, setPicture] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedPet = {
            ...pet,
            name,
            type,
            adoptionStatus,
            breed,
            height,
            weight,
            color,
            hypoallergenic,
            dietary,
            bio,
            picture,
        };
        onSave(updatedPet);
    };

    const handleFileChange = (e) => {
        setPicture(e.target.files[0]); // Handle file upload
    };

    return (
        <div className="edit-pet">
            <h2>Edit Pet</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Pet Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Type:
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                    >
                        <option value="">Choose...</option>
                        <option value="Dog">Dog</option>
                        <option value="Cat">Cat</option>
                        <option value="Hamster">Hamster</option>
                        <option value="Fish">Fish</option>
                        <option value="Turtle">Turtle</option>
                    </select>
                </label>
                <label>
                    Adoption Status:
                    <select
                        value={adoptionStatus}
                        onChange={(e) => setAdoptionStatus(e.target.value)}
                        required
                    >
                        <option value="">Choose...</option>
                        <option value="Available">Available</option>
                        <option value="Adopted">Adopted</option>
                        <option value="Fostered">Fostered</option>
                    </select>
                </label>
                <label>
                    Breed:
                    <input
                        type="text"
                        value={breed}
                        onChange={(e) => setBreed(e.target.value)}
                    />
                </label>
                <label>
                    Height (cm):
                    <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                    />
                </label>
                <label>
                    Weight (kg):
                    <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                    />
                </label>
                <label>
                    Color:
                    <input
                        type="text"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                </label>
                <label>
                    Hypoallergenic:
                    <input
                        type="checkbox"
                        checked={hypoallergenic}
                        onChange={(e) => setHypoallergenic(e.target.checked)}
                    />
                </label>
                <label>
                    Dietary:
                    <input
                        type="text"
                        value={dietary}
                        onChange={(e) => setDietary(e.target.value)}
                    />
                </label>
                <label>
                    Change Picture:
                    <input
                        type="file"
                        onChange={handleFileChange}
                    />
                </label>
                <label>
                    Bio:
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />
                </label>
                <button type="submit">Save Changes</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default EditPet;