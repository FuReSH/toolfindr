import React, { useState, useEffect } from 'react';
import { useAllDataFile } from '../hooks/use-all-data-file';
import { GoFilter } from "react-icons/go";


const Concepts = () => {

    const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const tadirahConcepts = useAllDataFile();

  const filename = tadirahConcepts.allFile.edges.find(edge => edge.node.extension === "txt").node.publicURL;
console.log(filename);
  useEffect(() => {
    fetch(filename)
      .then(response => response.text())
      .then(text => {
        const lines = text.split('\n');
        setOptions(lines.filter(line => line.trim() !== ''));
        console.log(lines);
      })
      .catch(error => console.error('Error loading the data file:', error));
  }, []);


  const handleSelectChange = (event) => {
    // Sammle alle ausgewählten Optionen
    const values = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedOptions(values);
  };


return (
    <div>
    <strong className="h5"><GoFilter /> Choose TaDiRAH concepts</strong>
    <p className="fs-6 my-2">Select one or more TaDiRAH concepts from the list below.</p>
    <p className="fs-6 my-3">Further information on the TaDiRAH concepts can be found on the official taxonomy website.</p>

    <hr />
      <div className="input-group">
        <select 
            multiple
            size="100"
            className="form-select" 
            aria-label="Select TaDiRAH concept" 
            onChange={handleSelectChange}
            value={selectedOptions}
          >
      {options.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
      </select>
      </div>
    </div>
    );
};

export default Concepts;