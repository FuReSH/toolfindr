import React from "react";

const ResetFilters = ({ resetFilters }) => {
  // Funktion zum Zurücksetzen der Filter
  const handleReset = () => {
    resetFilters();  // Aufruf von resetFilters
  };

  return (
    <button onClick={handleReset} className="btn btn-primary btn-sm shadow-sm">
      Reset Filters
    </button>
  );
};

export default ResetFilters;
