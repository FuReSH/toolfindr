import React from 'react'
import { BsSearch, BsFilterCircle } from "react-icons/bs"


const SearchBar = ({ search, setSearch }) => {
  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div class="row">
      <div class="col">
      <div class="input-group">
        <div class="input-group-text"><BsSearch /></div>
        <input 
          id="searchForm"
          className="form-control"
          type="text" 
          value={search} 
          onChange={handleInputChange} 
          placeholder="Search..."
        />
      </div>
      </div>
      <div class="col">
      <div class="input-group">
        <div class="input-group-text"><BsFilterCircle /></div>
      <select class="form-select" aria-label="Select tool type" placeholder='test'>
        <option selected>Choose a tool type</option>
        <option value="1">Software</option>
        <option value="2">Method</option>
        <option value="2">Concepts</option>
        <option value="4">...</option>
      </select>
      </div>
      </div>
      
    </div>







  );
};

export default SearchBar;

