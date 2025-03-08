import React, { useState } from "react";
import './Teams.css';
import { FaEdit, FaTrash } from "react-icons/fa";

const Team = () => {
    const [teamMembers, setTeamMembers] = useState([
        { id: 1, name: "Stephanie Mwoya", email: "stephanie.mwoya@gmail.com", phone_number: "+254712598987", role: { id: 1, name: "superAdmin" } },
        { id: 2, name: "Alice Johnson", email: "alice.j@gmail.com", phone_number: "+254712345678", role: { id: 2, name: "User" } },
        { id: 3, name: "Bob Brown", email: "bob.brown@gmail.com", phone_number: "+254712345679", role: { id: 3, name: "User" } },
    ]);
    const [roles] = useState([
        { id: 1, name: "superAdmin" },
        { id: 2, name: "User" },
    ]);
    
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone_number: "",
        password: "",
        role_id: ""
    });
    const [searchTerm, setSearchTerm] = useState("");

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddUser = (e) => {
        e.preventDefault();
        const newMember = {
            id: teamMembers.length + 1,
            ...formData,
            role: roles.find(role => role.id === parseInt(formData.role_id)) || { name: "No Role Assigned" }
        };
        setTeamMembers([...teamMembers, newMember]);
        setShowAddModal(false);
        resetForm();
    };

    const handleEditUser = (e) => {
        e.preventDefault();
        const updatedMembers = teamMembers.map(member => 
            member.id === currentUser.id ? { ...currentUser, ...formData } : member
        );
        setTeamMembers(updatedMembers);
        setShowEditModal(false);
        resetForm();
    };

    const handleDeleteUser = () => {
        setTeamMembers(teamMembers.filter(member => member.id !== currentUser.id));
        setShowDeleteModal(false);
    };

    const resetForm = () => {
        setFormData({
            name: "",
            email: "",
            phone_number: "",
            password: "",
            role_id: ""
        });
    };

    const openEditModal = (member) => {
        setCurrentUser(member);
        setFormData({
            name: member.name,
            email: member.email,
            phone_number: member.phone_number,
            role_id: member.role.id
        });
        setShowEditModal(true);
    };

    const openDeleteModal = (member) => {
        setCurrentUser(member);
        setShowDeleteModal(true);
    };

    return (
        <div className="container">
            <div className="header">
                <h2 className="title">Team</h2>
                <button className="add-button" onClick={() => setShowAddModal(true)}>
                    Add +
                </button>
            </div>

            <input
                type="text"
                className="search-input"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <table className="team-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {teamMembers
                        .filter(member => member.name.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((member) => (
                            <tr key={member.id}>
                                <td>{member.name}</td>
                                <td>{member.email}</td>
                                <td>{member.phone_number}</td>
                                <td>{member.role ? member.role.name : "No Role Assigned"}</td>
                                <td>
                                    <button className="action-button edit-button" onClick={() => openEditModal(member)}>
                                        <FaEdit /> Edit
                                    </button>
                                    <button className="action-button delete-button" onClick={() => openDeleteModal(member)}>
                                        <FaTrash /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

            {/* Add User Modal */}
            {showAddModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <span className="close-button" onClick={() => setShowAddModal(false)}>&times;</span>
                        <h2 className="modal-title">Add New User</h2>
                        <form onSubmit={handleAddUser}>
                            <input
                                type="text"
                                name="name"
                                className="modal-input"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                className="modal-input"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="tel"
                                name="phone_number"
                                className="modal-input"
                                placeholder="Phone"
                                value={formData.phone_number}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                className="modal-input"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                            <select
                                name="role_id"
                                className="modal-select"
                                value={formData.role_id}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select Role</option>
                                {roles.map((role) => (
                                    <option key={role.id} value={role.id}>{role.name}</option>
                                ))}
                            </select>
                            <div className="modal-buttons">
                                <button type="submit" className="modal-button continue-button">Continue</button>
                                <button type="button" className="modal-button cancel-button" onClick={() => setShowAddModal(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit User Modal */}
            {showEditModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <span className="close-button" onClick={() => setShowEditModal(false)}>&times;</span>
                        <h2 className="modal-title">Edit User</h2>
                        <form onSubmit={handleEditUser}>
                            <input
                                type="text"
                                name="name"
                                className="modal-input"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                className="modal-input"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="tel"
                                name="phone_number"
                                className="modal-input"
                                placeholder="Phone"
                                value={formData.phone_number}
                                onChange={handleInputChange}
                                required
                            />
                            <select
                                name="role_id"
                                className="modal-select"
                                value={formData.role_id}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select Role</option>
                                {roles.map((role) => (
                                    <option key={role.id} value={role.id}>{role.name}</option>
                                ))}
                            </select>
                            <div className="modal-buttons">
                                <button type="submit" className="modal-button continue-button">Save Changes</button>
                                <button type="button" className="modal-button cancel-button" onClick={() => setShowEditModal(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete User Modal */}
            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <span className="close-button" onClick={() => setShowDeleteModal(false)}>&times;</span>
                        <h2 className="modal-title">Delete User</h2>
                        <p>Are you sure you want to delete {currentUser?.name}?</p>
                        <div className="modal-buttons">
                            <button className="modal-button continue-button" onClick={handleDeleteUser}>Yes, Delete</button>
                            <button className="modal-button cancel-button" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Team;