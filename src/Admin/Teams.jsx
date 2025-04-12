import React, { useState, useEffect } from "react";
import './Teams.css'; // Ensure your CSS is correctly set up
import { FaEdit, FaTrash } from "react-icons/fa";
import { getUsers, getRoles, signup, updateUser, deleteUser } from '../api';
import { useNavigate } from 'react-router-dom';

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
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const [userRole, setUserRole] = useState(localStorage.getItem("role") || "");
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is authenticated and has the correct role
        const token = localStorage.getItem("token");
        console.log("Token in localStorage:", token);
        console.log("User Role:", userRole);
        if (!token || !userRole || userRole !== "Admin") {
            console.log("Unauthorized: Redirecting to login page");
            setError("Unauthorized: Only Admins can manage users.");
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('user_id');
            localStorage.removeItem('isAuthenticated');
            navigate('/auth');
            return;
        }
        fetchData();
    }, [userRole, navigate]);

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        // Fetch users
        try {
            console.log("Fetching users...");
            const usersResponse = await getUsers();
            console.log("Users Response Data:", usersResponse.data);
            setTeamMembers(usersResponse.data || []);
        } catch (err) {
            console.error("Users fetch error:", err.response ? err.response.data : err.message);
            if (err.response?.status === 401) {
                console.log("401 Unauthorized: Redirecting to login page");
                setError("Session expired or unauthorized. Please log in again.");
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                localStorage.removeItem('user_id');
                localStorage.removeItem('isAuthenticated');
                navigate('/auth');
                return;
            } else {
                const errorMessage = err.response?.data?.error || err.message || "Failed to fetch users from the server. Please check your network or server status.";
                setError(`Error fetching users: ${errorMessage}`);
            }
        }

        // Fetch roles
        try {
            console.log("Fetching roles...");
            const rolesResponse = await getRoles();
            console.log("Roles Response Data:", rolesResponse.data);
            setRoles(rolesResponse.data || []);
        } catch (err) {
            console.error("Roles fetch error:", err.response ? err.response.data : err.message);
            if (err.response?.status === 401) {
                console.log("401 Unauthorized: Redirecting to login page");
                setError("Session expired or unauthorized. Please log in again.");
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                localStorage.removeItem('user_id');
                localStorage.removeItem('isAuthenticated');
                navigate('/auth');
                return;
            } else {
                const errorMessage = err.response?.data?.error || err.message || "Failed to fetch roles from the server. Please check your network or server status.";
                setError(`Error fetching roles: ${errorMessage}`);
            }
        }

        setLoading(false);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        if (!userRole || userRole !== "Admin") {
            setError("Unauthorized: Only Admins can add users.");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            console.log("Adding new user with data:", formData);
            await signup({ ...formData, role_id: parseInt(formData.role_id) });
            await fetchData();
            setShowAddModal(false);
            resetForm();
            setSuccess("User added successfully.");
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            console.error("Add user error:", err.response ? err.response.data : err.message);
            const errorMessage = err.response?.data?.error || "Failed to add user.";
            setError(`Error adding user: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    const handleEditUser = async (e) => {
        e.preventDefault();
        if (!userRole || userRole !== "Admin") {
            setError("Unauthorized: Only Admins can edit users.");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            console.log("Editing user with data:", formData);
            await updateUser(currentUser.id, { ...formData, role_id: parseInt(formData.role_id) });
            await fetchData();
            setShowEditModal(false);
            resetForm();
            setSuccess("User updated successfully.");
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            console.error("Edit user error:", err.response ? err.response.data : err.message);
            const errorMessage = err.response?.data?.error || "Failed to update user.";
            setError(`Error updating user: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async () => {
        if (!userRole || userRole !== "Admin") {
            setError("Unauthorized: Only Admins can delete users.");
            return;
        }
        if (!currentUser?.id) {
            setError("Invalid user selected.");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            console.log("Deleting user with ID:", currentUser.id);
            await deleteUser(currentUser.id);
            await fetchData();
            setShowDeleteModal(false);
            setSuccess("User deleted successfully.");
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            console.error("Delete user error:", err.response ? err.response.data : err.message);
            const errorMessage = err.response?.data?.error || "Failed to delete user.";
            setError(`Error deleting user: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({ name: "", email: "", phone_number: "", password: "", role_id: "" });
        setError(null);
    };

    const openEditModal = (member) => {
        if (!userRole || userRole !== "Admin") {
            setError("Unauthorized: Only Admins can edit users.");
            return;
        }
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
        if (!userRole || userRole !== "Admin") {
            setError("Unauthorized: Only Admins can delete users.");
            return;
        }
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
            {success && <div className="success-message">{success}</div>}
            <div className="header">
                <h2 className="title">Users</h2>
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
                    {loading ? (
                        <tr>
                            <td colSpan="5">Loading...</td>
                        </tr>
                    ) : filteredMembers.length > 0 ? (
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

            {/* Add User Modal */}
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

            {/* Edit User Modal */}
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