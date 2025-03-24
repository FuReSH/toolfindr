import React from "react";

const ResetFilters = ({ setSearch, setAlphabetFilter, setConceptsFilter, setCurrentPage, setSelectedOptions }) => {
  // Funktion zum Zurücksetzen der Filter
  const handleReset = () => {
    sessionStorage.removeItem("searchFilters"); // Löscht den gespeicherten Zustand
    setSearch(""); // Setzt die Filter zurück
    setAlphabetFilter("");
    setConceptsFilter([]);
    setCurrentPage(1);
    setSelectedOptions([]); // Leert das Select-Feld
  };

  return (
    <button onClick={handleReset} className="btn btn-primary btn-sm shadow-sm">
      Reset Filters
    </button>
  );
};

export default ResetFilters;
