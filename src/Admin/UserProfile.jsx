import React, { useState } from 'react';
import './UserProfile.css'; // Import necessary styles

const UserProfile = ({ user, onSaveChanges }) => {
    const [formData, setFormData] = useState(user);
    const [profilePicture, setProfilePicture] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSaveChanges(formData);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicture(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="user-profile">
            <h2>My Profile</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div>
                    <label>Phone Number:</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
                </div>
                <div>
                    <label>Bio:</label>
                    <textarea name="bio" value={formData.bio} onChange={handleChange} />
                </div>
                <div>
                    <label>Profile Picture:</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                    {profilePicture && (
                        <div className="profile-picture-preview">
                            <img src={profilePicture} alt="Profile Preview" />
                        </div>
                    )}
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default UserProfile;