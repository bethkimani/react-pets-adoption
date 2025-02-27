import React, { useState } from 'react';
import '../App.css'; 

const SearchPage = () => {
  const [petType, setPetType] = useState('');
  const [advancedSearch, setAdvancedSearch] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(`Searching for: ${petType}`);
  };

  const handleClear = () => {
    setPetType('');
  };

  return (
    <div className="search-page">
      <h1>Search for a pet</h1>
      <form onSubmit={handleSearch} className="search-form">
        <label>
          Type:
          <select value={petType} onChange={(e) => setPetType(e.target.value)}>
            <option value="">Choose...</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Fish">Fish</option>
            <option value="Turtle">Turtle</option>
            <option value="Hamster">Hamster</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <div className="button-group">
          <button type="button" className="clear-button" onClick={handleClear}>
            Clear Search
          </button>
          <button type="submit" className="search-button">
            Search
          </button>
        </div>

        <div className="advanced-search">
          <label>
            <input 
              type="checkbox" 
              checked={advancedSearch} 
              onChange={() => setAdvancedSearch(!advancedSearch)} 
            />
            Advanced Search
          </label>
        </div>
      </form>
    </div>
  );
};

export default SearchPage;