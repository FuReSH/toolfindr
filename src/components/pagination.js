import React, { useState, useEffect } from "react";
import { GoKebabHorizontal } from "react-icons/go";

import "./pagination.scss"

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [isMobile, setIsMobile] = useState(false);
  const step = 3;

  // Responsive breakpoint mit useEffect und Resize-Listener
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 576);
    };

    // Initial check
    checkIsMobile();

    // Resize-Listener hinzufügen
    window.addEventListener('resize', checkIsMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const getPageNumbers = () => {
    let pages = [];
  
    // Edge case: Keine Seiten
    if (totalPages === 0) return pages;
    
    // Edge case: Nur eine Seite
    if (totalPages === 1) return [1];
  
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
    
    // Duplikate entfernen (kann bei kleinen totalPages auftreten)
    return [...new Set(pages)];
  };

  // Click-Handler für Ellipsis-Buttons deaktivieren
  const handlePageClick = (page) => {
    if (page !== "..." && typeof page === 'number') {
      onPageChange(page);
    }
  };

  // Keyboard-Navigation
  const handleKeyDown = (event, page) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handlePageClick(page);
    }
  };

  return (
    <nav aria-label="Page navigation" className="mt-4">
      <ul className="pagination justify-content-center flex-wrap">
        {/* Previous Button */}
        <li key="prev" className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button 
            className="shadow-sm page-link px-2 px-md-3" 
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Go to previous page"
          >
            <span className="d-none d-sm-inline">Previous</span>
            <span className="d-inline d-sm-none" aria-hidden="true">‹</span>
          </button>
        </li>

        {/* Page Numbers - mit bedingter Anzeige */}
        {getPageNumbers().map((page, index) => {
          const shouldShow = !isMobile || 
            page === currentPage || 
            page === currentPage - 1 || 
            page === currentPage + 1 || 
            page === 1 || 
            page === totalPages ||
            page === "...";

          if (!shouldShow) return null;

          const isEllipsis = page === "...";
          const isActive = page === currentPage;

          return (
            <li 
              key={`${page}-${index}`} 
              className={`page-item ${isActive ? "active" : ""} ${isEllipsis ? "disabled" : ""}`}
            >
              <button 
                className="shadow-sm page-link px-2 px-md-3"
                onClick={() => handlePageClick(page)}
                onKeyDown={(e) => handleKeyDown(e, page)}
                disabled={isEllipsis}
                aria-label={isEllipsis ? "More pages" : `Go to page ${page}`}
                aria-current={isActive ? "page" : undefined}
                style={{ minWidth: '40px' }}
                tabIndex={isEllipsis ? -1 : 0}
              >
                {isEllipsis ? <GoKebabHorizontal aria-hidden="true" /> : page}
              </button>
            </li>
          );
        })}

        {/* Next Button */}
        <li key='next' className={`page-item ${(currentPage === totalPages || totalPages === 0) ? "disabled" : ""}`}>
          <button 
            className="shadow-sm page-link px-2 px-md-3" 
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            aria-label="Go to next page"
          >
            <span className="d-none d-sm-inline">Next</span>
            <span className="d-inline d-sm-none" aria-hidden="true">›</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;