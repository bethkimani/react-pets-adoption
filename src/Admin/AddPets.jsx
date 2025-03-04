import React, { useState } from 'react';
import './AddPets.css'; // Import the CSS file for styling

const AddPets = ({ onAddPet }) => {
    const [petName, setPetName] = useState('');
    const [type, setType] = useState('');
    const [adoptionStatus, setAdoptionStatus] = useState('Available');
    const [breed, setBreed] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [color, setColor] = useState('');
    const [dietary, setDietary] = useState('');
    const [picture, setPicture] = useState(null);
    const [bio, setBio] = useState('');

    const handleAdd = (e) => {
        e.preventDefault();
        const newPet = {
            id: Date.now(),
            name: petName,
            type,
            adoptionStatus,
            breed,
            height,
            weight,
            color,
            dietary,
            picture,
            bio,
            owner: 'None'
        };
        onAddPet(newPet);
        // Reset form fields
        setPetName('');
        setType('');
        setAdoptionStatus('Available');
        setBreed('');
        setHeight('');
        setWeight('');
        setColor('');
        setDietary('');
        setPicture(null);
        setBio('');
    };

    return (
        <div className="add-pets">
            <h2>Add a New Pet</h2>
            <form onSubmit={handleAdd}>
                <input
                    type="text"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    placeholder="Enter pet's name"
                    required
                />
                <select value={type} onChange={(e) => setType(e.target.value)} required>
                    <option value="">Choose Type...</option>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Other">Other</option>
                </select>
                <select value={adoptionStatus} onChange={(e) => setAdoptionStatus(e.target.value)} required>
                    <option value="Available">Available</option>
                    <option value="Adopted">Adopted</option>
                </select>
                <input
                    type="text"
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                    placeholder="Enter pet's breed"
                />
                <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="Height (cm)"
                />
                <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Weight (kg)"
                />
                <input
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    placeholder="Color"
                />
                <select value={dietary} onChange={(e) => setDietary(e.target.value)}>
                    <option value="">Choose Dietary...</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Non-Vegetarian">Non-Vegetarian</option>
                </select>
                <div className="upload-picture">
                    <input type="file" onChange={(e) => setPicture(e.target.files[0])} />
                    <span>Choose Picture</span>
                </div>
                <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Add a bio for the pet..."
                />
                <button type="submit" className="add-pet-button">Add Pet</button>
            </form>
        </div>
    );
};

export default AddPets;