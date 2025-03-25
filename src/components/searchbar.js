import React from 'react';
import { GoSearch } from "react-icons/go";


const SearchBar = ({ search, setSearch }) => {
  
  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="row">
      <div className="col">
        <div className="input-group shadow-sm">
          <div className="input-group-text"><GoSearch /></div>
          <input
            id="searchForm"
            className="form-control"
            type="text"
            value={search}
            onChange={handleInputChange}
            placeholder="Search for a tool by its label..."
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

