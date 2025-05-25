import React, { useEffect, useState } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { GoMultiSelect, GoLinkExternal } from "react-icons/go";
import Select from "react-select";
import useIsBrowser from "../hooks/use-is-browser";

const Concepts = ({ filters, updateFilter }) => {
  const isBrowser = useIsBrowser();
  const { conceptsFilter } = filters;

  const data = useStaticQuery(graphql`
    query {
      allTadirahConcept {
        nodes {
          label
        }
      }
    }
  `);

  const options = data.allTadirahConcept.nodes.map((concept) => ({
    value: concept.label,
    label: concept.label,
  }));

  // Initialisiere die ausgewählten Optionen
  const [selectedOptions, setSelectedOptions] = useState(() =>
    conceptsFilter.map((concept) => ({ value: concept, label: concept }))
  );

  // Synchronisiere die ausgewählten Optionen mit den Filtern
  useEffect(() => {
    setSelectedOptions(
      conceptsFilter.map((concept) => ({ value: concept, label: concept }))
    );
  }, [conceptsFilter]);

  const handleChange = (selected) => {
    const newConcepts = selected ? selected.map((opt) => opt.value) : [];
    setSelectedOptions(selected || []);
    updateFilter({ conceptsFilter: newConcepts });
  };

  const primaryColor =
    isBrowser ? getComputedStyle(document.documentElement).getPropertyValue("--primary").trim() : "";
  const secondaryColor =
    isBrowser ? getComputedStyle(document.documentElement).getPropertyValue("--bs-gray-300").trim() : "";

  const [menuIsOpen, setMenuIsOpen] = useState(true);

  const customStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "white",
      borderColor: primaryColor,
      "&:hover": { borderColor: primaryColor },
      fontSize: "initial",
      height: "initial",
      minHeight: "initial",
      width: "100%",
    }),
    menuList: (styles) => ({
      ...styles,
      minHeight: "150px",
      maxHeight: "500px",
      backgroundColor: "rgba(255,255,255,0.7)"
    }),
    option: (styles, { isSelected, isFocused }) => ({
      ...styles,
      backgroundColor: isSelected ? primaryColor : isFocused ? secondaryColor : undefined,
      color: isSelected ? "white" : "black",
      cursor: "pointer",
      fontSize: "initial",
      padding: "0.2rem 0.8rem",
    }),
    multiValue: (styles) => ({
      ...styles,
      backgroundColor: primaryColor,
    }),
    multiValueLabel: (styles) => ({
      ...styles,
      color: "white",
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      color: "white",
      ":hover": { backgroundColor: primaryColor, color: "white" },
    }),
  };

  return (
    <div className="sticky-top top-10">
      <h5>
        <GoMultiSelect className='icon-color-secondary' /> Filter by Tool Categories
      </h5>
      <hr />
      <p className="fs-6 my-2">Select one or more categories from the list below.</p>
      <p className="fs-6 my-3">
        We use the TaDiRAH taxonomy established in the DH to group tools. Further information on the TaDiRAH concepts
        can be found on the
        <a href="https://de.dariah.eu/tadirah" target="_blank" rel="noopener noreferrer" className="icon-link icon-hover-link">
          official taxonomy website <GoLinkExternal />
        </a>
        .
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
          menuIsOpen={menuIsOpen}
          onMenuOpen={() => setMenuIsOpen(true)}
          onMenuClose={() => setMenuIsOpen(false)}
        />
      </div>
    </div>
  );
};

export default Concepts;