// src/App.jsx
import React, {useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
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
import UserDashboard from './Users/UserDashboard';
import ResetPassword from './components/ResetPassword';
import AdoptionProcess from './Users/AdoptionProcess';
import Auth from './components/Auth';
import 'animate.css'

// Home component for the landing page
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

// ProtectedRoute component to handle authentication and role-based access
const ProtectedRoute = ({ element, allowedRole }) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const userRole = localStorage.getItem('role')?.toLowerCase();

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    if (allowedRole && userRole !== allowedRole.toLowerCase()) {
        return <Navigate to="/" replace />;
    }

    return element;
};

// Main App Layout
const AppLayout = () => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin-dashboard');
    const isUserDashboard = location.pathname.startsWith('/user-dashboard');
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    return (
        <div className="App">
            <ErrorBoundary>
                {!isUserDashboard && !isAdminRoute && <Header />}
                {!isUserDashboard && !isAdminRoute && <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/catalogue" element={<HomePage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/search-and-display" element={<SearchAndDisplayPets />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path='/adoption-process/:id' element={<AdoptionProcess/>}/>
                    <Route path='/auth' element={<Auth/>}/>
                    <Route path='catalogue/adoption-process/:id' element={<AdoptionProcess/>}/>

                    {/* Protected Routes */}
                    <Route
                        path="/user-dashboard/*"
                        element={<ProtectedRoute element={<UserDashboard />} allowedRole="user" />}
                    />
                    <Route
                        path="/admin-dashboard/*"
                        element={<ProtectedRoute element={<AdminDashboard />} allowedRole="admin" />}
                    />

                    {/* Catch-all for 404 */}
                    <Route
                        path="*"
                        element={
                            <div>
                                <h1>404: Not Found</h1>
                                <p>The page you are looking for does not exist.</p>
                            </div>
                        }
                    />
                </Routes>
                {!isAdminRoute && !isUserDashboard && <LiveChat />}
            </ErrorBoundary>
        </div>
    );
};

// App component
function App() {
    return (
        <Router>
            <AppLayout />
        </Router>
    );
}

export default App;