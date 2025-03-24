import React, { useEffect } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { GoMultiSelect, GoLinkExternal } from "react-icons/go";
import Select from 'react-select';

const Concepts = ({ selectedOptions, setSelectedOptions, onConceptsChange }) => {
  
  const data = useStaticQuery(graphql`
    query {
      allTadirahConcept {
        nodes {
          tadirahLabel
        }
      }
    }
  `);

  const options = data.allTadirahConcept.nodes.map(concept => ({
    value: concept.tadirahLabel,
    label: concept.tadirahLabel
  }));

  // useEffect zum Setzen der initialen ausgewählten Optionen, basierend auf gespeicherten Werten
  useEffect(() => {
    const storedFilters = sessionStorage.getItem("searchFilters");
    if (storedFilters) {
      const parsedFilters = JSON.parse(storedFilters);
      if (parsedFilters.conceptsFilter) {
        // Setze die initialen ausgewählten Optionen aus sessionStorage
        const storedSelectedOptions = options.filter(opt =>
          parsedFilters.conceptsFilter.includes(opt.value)
        );
        setSelectedOptions(storedSelectedOptions);
      }
    }
  }, []);

  // Aktualisiert sessionStorage und übergibt Werte an onConceptsChange
  const handleChange = (selected) => {
    setSelectedOptions(selected);
    const values = selected ? selected.map(opt => opt.value) : [];
    sessionStorage.setItem("searchFilters", JSON.stringify({
      ...JSON.parse(sessionStorage.getItem("searchFilters") || "{}"),
      conceptsFilter: values
    }));
    onConceptsChange(values);
  };

  // CSS-Variablen abrufen
  const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--bs-primary').trim();
  const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--bs-gray-300').trim();

  // Eigene Styles für react-select
  const customStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: 'white',
      borderColor: primaryColor,
      '&:hover': { borderColor: primaryColor },
      fontSize: 'initial',
      height: 'initial',
      minHeight: 'initial',
      width: '100%',
    }),
    option: (styles, { isSelected, isFocused }) => ({
      ...styles,
      backgroundColor: isSelected ? primaryColor : isFocused ? secondaryColor : undefined,
      color: isSelected ? 'white' : 'black',
      cursor: 'pointer',
      fontSize: 'initial',
      padding: '0.2rem 0.8rem',
    }),
    multiValue: (styles) => ({
      ...styles,
      backgroundColor: primaryColor,
    }),
    multiValueLabel: (styles) => ({
      ...styles,
      color: 'white',
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      color: 'white',
      ':hover': { backgroundColor: primaryColor, color: 'white' },
    }),
  };

  return (
    <div className='sticky-top top-10'>
      <h5><GoMultiSelect /> Filter by Tool Categories</h5>
      <hr />
      <p className="fs-6 my-2">Select one or more categories from the list below.</p>
      <p className="fs-6 my-3">
      We use the TaDiRAH taxonomy established in the DH to group tools. Further information on the TaDiRAH concepts can be found on the <a href="https://de.dariah.eu/tadirah" target="_blank" rel="noopener noreferrer" className='icon-link icon-hover-link'>official taxonomy website <GoLinkExternal /></a>.
      </p>
      <div className="shadow-sm">
        <Select
          closeMenuOnSelect={false}
          isClearable
          isSearchable
          options={options}
          isMulti
          value={selectedOptions}
          onChange={handleChange}
          placeholder="Select categories..."
          styles={customStyles} 
        />
      </div>
    </div>
  );
};

export default Concepts;