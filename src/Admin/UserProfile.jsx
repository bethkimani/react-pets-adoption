import React, { useState, useEffect } from 'react';
import './UserProfile.css';

const UserProfile = ({ user = {}, onSaveChanges }) => {
    const [firstName, setFirstName] = useState(user.firstName || '');
    const [lastName, setLastName] = useState(user.lastName || '');
    const [email, setEmail] = useState(user.email || '');
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || '');
    const [bio, setBio] = useState(user.bio || '');
    const [profilePicture, setProfilePicture] = useState(user.profilePicture || null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePicture(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSave = () => {
        const updatedUser = {
            ...user,
            firstName,
            lastName,
            email,
            phoneNumber,
            bio,
            profilePicture,
        };
        onSaveChanges(updatedUser);
    };

    // Conditional rendering for loading state
    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="user-profile">
            <h2>My Profile</h2>
            {imagePreview && <img src={imagePreview} alt="Profile Preview" className="profile-picture" />}
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input"
            />
            <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                required
            />
            <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                required
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Phone Number"
            />
            <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Bio"
                rows="4"
            />
            <button onClick={handleSave}>Save Changes</button>
        </div>
    );
};

export default UserProfile;