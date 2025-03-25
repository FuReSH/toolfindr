import React from "react";
import { GoKebabHorizontal } from "react-icons/go";

import "./pagination.scss"

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const step = 3;

  const getPageNumbers = () => {
    let pages = [];
  
    // Immer die erste Seite anzeigen
    pages.push(1);
  
    // Linker Platzhalter falls nötig
    if (currentPage - step > 2) {
      pages.push("...");
    }
  
    // Dynamische Seitenzahlen generieren
    for (let i = Math.max(2, currentPage - step); i <= Math.min(totalPages - 1, currentPage + step); i++) {
      pages.push(i);
    }
  
    // Rechter Platzhalter falls nötig
    if (currentPage + step < totalPages - 1) {
      pages.push("...");
    }
  
    // Immer die letzte Seite anzeigen, wenn es mehr als eine gibt
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <nav aria-label="Page navigation" className="mt-4">
      <ul className="pagination justify-content-center">
        {/* Previous Button */}
        <li key="prev" className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button 
            className="shadow-sm page-link" 
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>

        {/* Page Numbers */}
        {getPageNumbers().map((page, index) => (
          <li key={index} className={`page-item ${page === currentPage ? "active" : ""} ${page === "..." ? "disabled" : ""}`}>
            <button 
              ref={(el) => el && el.blur()}
              className="shadow-sm page-link"
              onClick={() => onPageChange(page)}
            >
              {page === "..." ? <GoKebabHorizontal /> : page}
            </button>
          </li>
        ))}

        {/* Next Button */}
        <li key='next' className={`page-item ${(currentPage === totalPages || totalPages === 0) ? "disabled" : ""}`}>
          <button 
            className="shadow-sm page-link" 
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
