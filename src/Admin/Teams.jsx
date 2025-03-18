import React, { useState, useEffect } from "react";
import './Teams.css';
import { FaEdit, FaTrash } from "react-icons/fa";
import { getUsers, getRoles, signup, updateUser, deleteUser } from '../api';

const Team = () => {
    // State for users and roles fetched from backend
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
    const [userRole, setUserRole] = useState(null); // To store the logged-in user's role

    // Fetch users and roles from backend on component mount
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            // Get the logged-in user's role from localStorage
            const storedRole = localStorage.getItem("role");
            setUserRole(storedRole);

            // Only proceed if the user is a SuperAdmin
            if (storedRole !== "SuperAdmin") {
                setError("Unauthorized: Only SuperAdmins can manage users.");
                setLoading(false);
                return;
            }

            try {
                const usersResponse = await getUsers();
                setTeamMembers(usersResponse.data);

                const rolesResponse = await getRoles();
                setRoles(rolesResponse.data);
            } catch (err) {
                setError(err.response?.data?.error || "Failed to fetch data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Add a new user via the signup endpoint
    const handleAddUser = async (e) => {
        e.preventDefault();
        if (userRole !== "SuperAdmin") {
            setError("Unauthorized: Only SuperAdmins can add users.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await signup({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                phone_number: formData.phone_number,
                role_id: parseInt(formData.role_id) // Ensure role_id is an integer
            });

            const updatedUsers = await getUsers();
            setTeamMembers(updatedUsers.data);
            setShowAddModal(false);
            resetForm();
        } catch (err) {
            setError(err.response?.data?.error || "Failed to add user");
        } finally {
            setLoading(false);
        }
    };

    // Edit a user via the update endpoint
    const handleEditUser = async (e) => {
        e.preventDefault();
        if (userRole !== "SuperAdmin") {
            setError("Unauthorized: Only SuperAdmins can edit users.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await updateUser(currentUser.id, {
                name: formData.name,
                email: formData.email,
                phone_number: formData.phone_number,
                role_id: parseInt(formData.role_id) // Ensure role_id is an integer
            });

            const updatedUsers = await getUsers();
            setTeamMembers(updatedUsers.data);
            setShowEditModal(false);
            resetForm();
        } catch (err) {
            setError(err.response?.data?.error || "Failed to update user");
        } finally {
            setLoading(false);
        }
    };

    // Delete a user via the DELETE endpoint
    const handleDeleteUser = async () => {
        if (userRole !== "SuperAdmin") {
            setError("Unauthorized: Only SuperAdmins can delete users.");
            setShowDeleteModal(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await deleteUser(currentUser.id);
            const updatedUsers = await getUsers();
            setTeamMembers(updatedUsers.data);
            setShowDeleteModal(false);
        } catch (err) {
            setError(err.response?.data?.error || "Failed to delete user");
        } finally {
            setLoading(false);
        }
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
        if (userRole !== "SuperAdmin") {
            setError("Unauthorized: Only SuperAdmins can edit users.");
            return;
        }
        setCurrentUser(member);
        setFormData({
            name: member.name,
            email: member.email,
            phone_number: member.phone_number || "",
            role_id: member.role ? member.role.id : ""
        });
        setShowEditModal(true);
    };

    const openDeleteModal = (member) => {
        if (userRole !== "SuperAdmin") {
            setError("Unauthorized: Only SuperAdmins can delete users.");
            return;
        }
        setCurrentUser(member);
        setShowDeleteModal(true);
    };

    return (
        <div className="container">
            {loading && <div className="loading-message">Loading...</div>}
            {error && <div className="error-message">{error}</div>}
            <div className="header">
                <h2 className="title">Team</h2>
                {userRole === "SuperAdmin" && (
                    <button className="add-button" onClick={() => setShowAddModal(true)}>
                        Add +
                    </button>
                )}
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
                                <td>{member.phone_number || "N/A"}</td>
                                <td>{member.role ? member.role.name : "No Role Assigned"}</td>
                                <td>
                                    {userRole === "SuperAdmin" && (
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
                        ))}
                </tbody>
            </table>

            {/* Add User Modal */}
            {showAddModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <span className="close-button" onClick={() => setShowAddModal(false)}>×</span>
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

            {/* Edit User Modal */}
            {showEditModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <span className="close-button" onClick={() => setShowEditModal(false)}>×</span>
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

            {/* Delete User Modal */}
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