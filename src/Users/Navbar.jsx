import React from 'react';
import './Navbar.css'; // User dashboard styles

const Navbar = () => {
    const handleLogout = () => {
        // Logic for logout (e.g., clearing session, redirecting user)
        window.location.href = '/'; // Redirect to home or login page
    };

    return (
        <div className="navbar">
            <div className="search-container">
                <input type="text" placeholder="Search products, brands and categories" />
                <button type="button">Search</button>
            </div>
            <div className="user-account">
                <span>Hi, User</span>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Navbar;