
import React, { useState, useEffect } from "react";
import './Teams.css'; // Ensure your CSS is correctly set up
import { FaEdit, FaTrash } from "react-icons/fa";
import { getUsers, getRoles, signup, updateUser, deleteUser } from '../api';

const Team = () => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [roles, setRoles] = useState([]);
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
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [userRole, setUserRole] = useState(localStorage.getItem("role"));

    useEffect(() => {
        if (!userRole || userRole !== "Admin") {
            setError("Unauthorized: Only Admins can manage users.");
            return;
        }
        fetchData();
    }, [userRole]);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const [usersResponse, rolesResponse] = await Promise.all([getUsers(), getRoles()]);
            console.log("Users Response:", usersResponse.data); // Log users response
            console.log("Roles Response:", rolesResponse.data); // Log roles response
            setTeamMembers(usersResponse.data || []);
            setRoles(rolesResponse.data || []);
        } catch (err) {
            console.error("Fetch error:", err);
            setError(err.response ? err.response.data.error : "Failed to fetch data from the server.");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        if (!userRole || userRole !== "Admin") return setError("Unauthorized: Only Admins can add users.");
        setLoading(true);
        setError(null);
        try {
            await signup({ ...formData, role_id: parseInt(formData.role_id) });
            await fetchData();
            setShowAddModal(false);
            resetForm();
        } catch (err) {
            setError(err.response?.data?.error || "Failed to add user.");
        } finally {
            setLoading(false);
        }
    };

    const handleEditUser = async (e) => {
        e.preventDefault();
        if (!userRole || userRole !== "Admin") return setError("Unauthorized: Only Admins can edit users.");
        setLoading(true);
        setError(null);
        try {
            await updateUser(currentUser.id, { ...formData, role_id: parseInt(formData.role_id) });
            await fetchData();
            setShowEditModal(false);
            resetForm();
        } catch (err) {
            setError(err.response?.data?.error || "Failed to update user.");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async () => {
        if (!userRole || userRole !== "Admin") return setError("Unauthorized: Only Admins can delete users.");
        setLoading(true);
        setError(null);
        try {
            await deleteUser(currentUser.id);
            await fetchData();
            setShowDeleteModal(false);
        } catch (err) {
            setError(err.response?.data?.error || "Failed to delete user.");
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({ name: "", email: "", phone_number: "", password: "", role_id: "" });
        setError(null);
    };

    const openEditModal = (member) => {
        if (!userRole || userRole !== "Admin") return setError("Unauthorized: Only Admins can edit users.");
        setCurrentUser(member);
        setFormData({
            name: member.name,
            email: member.email,
            phone_number: member.phone_number || "",
            role_id: member.role?.id || ""
        });
        setShowEditModal(true);
    };

    const openDeleteModal = (member) => {
        if (!userRole || userRole !== "Admin") return setError("Unauthorized: Only Admins can delete users.");
        setCurrentUser(member);
        setShowDeleteModal(true);
    };

    const filteredMembers = teamMembers.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container">
            {loading && <div className="loading-message">Loading...</div>}
            {error && <div className="error-message">{error}</div>}
            <div className="header">
                <h2 className="title">Team</h2>
                {userRole === "Admin" && (
                    <button className="add-button" onClick={() => setShowAddModal(true)}>
                        Add +
                    </button>
                )}
            </div>

            <input
                type="text"
                className="search-input"
                placeholder="Search by name"
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
                    {filteredMembers.length > 0 ? (
                        filteredMembers.map((member) => (
                            <tr key={member.id}>
                                <td>{member.name}</td>
                                <td>{member.email}</td>
                                <td>{member.phone_number || "N/A"}</td>
                                <td>{member.role?.name || "No Role Assigned"}</td>
                                <td>
                                    {userRole === "Admin" && (
                                        <div className="action-buttons">
                                            <button className="action-button edit-button" onClick={() => openEditModal(member)}>
                                                <FaEdit /> Edit
                                            </button>
                                            <button className="action-button delete-button" onClick={() => openDeleteModal(member)}>
                                                <FaTrash /> Delete
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No users found</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {showAddModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <span className="close-button" onClick={() => setShowAddModal(false)}>×</span>
                        <h2 className="modal-title">Add New User</h2>
                        <form onSubmit={handleAddUser}>
                            <input type="text" name="name" className="modal-input" placeholder="Name" value={formData.name} onChange={handleInputChange} required />
                            <input type="email" name="email" className="modal-input" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
                            <input type="tel" name="phone_number" className="modal-input" placeholder="Phone" value={formData.phone_number} onChange={handleInputChange} required />
                            <input type="password" name="password" className="modal-input" placeholder="Password" value={formData.password} onChange={handleInputChange} required />
                            <select name="role_id" className="modal-select" value={formData.role_id} onChange={handleInputChange} required>
                                <option value="">Select Role</option>
                                {roles.map((role) => (
                                    <option key={role.id} value={role.id}>{role.name}</option>
                                ))}
                            </select>
                            <div className="modal-buttons">
                                <button type="submit" className="modal-button continue-button" disabled={loading}>
                                    {loading ? "Adding..." : "Continue"}
                                </button>
                                <button type="button" className="modal-button cancel-button" onClick={() => setShowAddModal(false)} disabled={loading}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showEditModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <span className="close-button" onClick={() => setShowEditModal(false)}>×</span>
                        <h2 className="modal-title">Edit User</h2>
                        <form onSubmit={handleEditUser}>
                            <input type="text" name="name" className="modal-input" placeholder="Name" value={formData.name} onChange={handleInputChange} required />
                            <input type="email" name="email" className="modal-input" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
                            <input type="tel" name="phone_number" className="modal-input" placeholder="Phone" value={formData.phone_number} onChange={handleInputChange} required />
                            <select name="role_id" className="modal-select" value={formData.role_id} onChange={handleInputChange} required>
                                <option value="">Select Role</option>
                                {roles.map((role) => (
                                    <option key={role.id} value={role.id}>{role.name}</option>
                                ))}
                            </select>
                            <div className="modal-buttons">
                                <button type="submit" className="modal-button continue-button" disabled={loading}>
                                    {loading ? "Saving..." : "Save Changes"}
                                </button>
                                <button type="button" className="modal-button cancel-button" onClick={() => setShowEditModal(false)} disabled={loading}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <span className="close-button" onClick={() => setShowDeleteModal(false)}>×</span>
                        <h2 className="modal-title">Delete User</h2>
                        <p>Are you sure you want to delete {currentUser?.name}?</p>
                        <div className="modal-buttons">
                            <button className="modal-button continue-button" onClick={handleDeleteUser} disabled={loading}>
                                {loading ? "Deleting..." : "Yes, Delete"}
                            </button>
                            <button className="modal-button cancel-button" onClick={() => setShowDeleteModal(false)} disabled={loading}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Team;