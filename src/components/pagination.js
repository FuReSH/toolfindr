import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const step = 3;

  const getPageNumbers = () => {
    let pages = [];

    // Always show first page
    pages.push(1);

    if (currentPage > step + 2) {
      pages.push("...");
    }

    // Dynamically generate page numbers
    for (let i = Math.max(2, currentPage - step); i <= Math.min(totalPages - 1, currentPage + step); i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - step - 1) {
      pages.push("...");
    }

    // Always show last page if there are more than 1 pages
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        {/* Previous Button */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
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
              className="shadow-sm page-link"
              onClick={() => typeof page === "number" && onPageChange(page)}
              disabled={page === "..."}
            >
              {page}
            </button>
          </li>
        ))}

        {/* Next Button */}
        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
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
