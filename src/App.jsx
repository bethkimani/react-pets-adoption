
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import SearchPage from './components/SearchPage';
import ErrorBoundary from './components/ErrorBoundary';
import LiveChat from './components/LiveChat';
import SearchAndDisplayPets from './components/Display';
import Header from './components/Header';
import WhyAdopt from './components/WhyAdopt';
import AdminDashboard from './Admin/AdminDashboard';
import UserDashboard from './Users/UserDashboard'; // Import UserDashboard
import Auth from './components/Auth';

const Home = () => {
    return (
        <>
            <Hero />
            <WhyAdopt />
            <HomePage />
            <AboutUs />
            <Footer />
        </>
    );
};

const AppLayout = () => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');
    const isUserDashboard = location.pathname.startsWith('/user-dashboard');
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const userRole = localStorage.getItem("role");

    return (
        <div className="App">
            <ErrorBoundary>
                {/* Render Header and Navbar unless on user dashboard */}
                {!isUserDashboard && !isAdminRoute && <Header />}
                {!isUserDashboard && !isAdminRoute && <Navbar />}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/catalogue" element={<HomePage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/search-and-display" element={<SearchAndDisplayPets />} />
                    <Route path="/about" element={<AboutUs />} />
                    
                    {/* Admin Dashboard route, only accessible if authenticated as admin */}
                    {isAuthenticated && userRole === "admin" && (
                        <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
                    )}
                    
                    {/* User Dashboard route, only accessible if authenticated as user */}
                    {isAuthenticated && userRole === "user" ? (
                        <Route path="/user-dashboard/*" element={<UserDashboard />} />
                    ) : null}

                    <Route path="/auth" element={<Auth />} />
                    <Route path="*" element={<div><h1>404: Not Found</h1><p>The page you are looking for does not exist.</p></div>} />
                </Routes>
                {!isAdminRoute && <LiveChat />}
            </ErrorBoundary>
        </div>
    );
};

function App() {
    return (
        <Router>
            <AppLayout />
        </Router>
    );
}

export default App;