import React from 'react';
import '../Dashboard/dashboard.css';

const SearchBar = ({ searchTerm, onSearch }) => {
  return (
    <header>
      <form id="form">
        <div className="search-container">
          <input
            type="text"
            className="search"
            placeholder="Search for movies..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            aria-label="Search movies"
          />
        </div>
      </form>
    </header>
  );
};

export default SearchBar;