import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
import WhyAdopt from './components/WhyAdopt'; // Import the new component

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

function App() {
  return (
    <div className="App">
      <Router>
        <ErrorBoundary>
          <Header />
          <Navbar />
          
          <Routes>
            <Route path="/" element={<Home />} /> {/* Home contains all sections */}
            <Route path="/catalogue" element={<HomePage />} /> {/* Catalogue only shows the catalogue */}
            <Route path="/search" element={<SearchPage />} />
            <Route path="/search-and-display" element={<SearchAndDisplayPets />} />
            <Route path="/about" element={<AboutUs />} /> {/* About Us shows only the about section */}
            <Route path="*" element={<div><h1>404: Not Found</h1><p>The page you are looking for does not exist.</p></div>} /> {/* Basic 404 Handling */}
          </Routes>
          
          <LiveChat />
        </ErrorBoundary>
      </Router>
    </div>
  );
}

export default App;