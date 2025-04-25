import React from 'react';
import './SearchBar.css';

const SearchBar = ({ value, onChange, placeholder }) => {
  return (
    <div className="search-bar">
      <span className="search-icon" aria-hidden="true">
        {/* Watch SVG icon */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="8" stroke="#888" strokeWidth="2" fill="#fff"/>
          <rect x="10" y="2" width="4" height="3" rx="1" fill="#888"/>
          <rect x="10" y="19" width="4" height="3" rx="1" fill="#888"/>
          <path d="M12 8v4l2 2" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder || 'Search products...'}
        className="search-input"
        aria-label="Search products"
      />
    </div>
  );
};

export default SearchBar;