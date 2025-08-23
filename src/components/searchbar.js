import React, {useState} from 'react';
import { useFlexSearch } from 'react-use-flexsearch'
import { GoSearch } from "react-icons/go";


const SearchBar = ({ search, setSearch }) => {

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="row justify-content-center mt-5 mb-3">
      <div className="col-12 col-md-12 col-lg-8">
        <div className="input-group shadow-sm">
          <div className="input-group-text"><GoSearch /></div>
          <input
            id="searchForm"
            className="form-control form-control-lg"
            type="text"
            value={search}
            onChange={handleInputChange}
            placeholder="Search..."
          />
        </div>
        <div className="form-text" id="search-help">Search research tools by their label and description.</div>
      </div>
    </div>
  );
};

export default SearchBar;

