import React from 'react'
import { BsSearch } from "react-icons/bs"


const SearchBar = ({ search, setSearch }) => {
  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <form>
      <div class="input-group">
        <div class="input-group-text"><BsSearch /></div>
        <input 
          id="searchForm"
          className="form-control"
          type="text" 
          value={search} 
          onChange={handleInputChange} 
          placeholder="Search for tool label..."
        />
      </div>
    </form>

  );
};

export default SearchBar;