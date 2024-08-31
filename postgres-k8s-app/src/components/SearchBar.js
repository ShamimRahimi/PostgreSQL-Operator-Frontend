// src/components/SearchBar.js
import React from "react";

const SearchBar = ({ setSearchQuery }) => {
  return (
    <input
      type="text"
      placeholder="Search databases..."
      onChange={e => setSearchQuery(e.target.value)}
    />
  );
};

export default SearchBar;
