import React from 'react';
import '../Dashboard/dashboard.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="pagination-centered">
        <div className="pagination">
          <div
            className={`page ${currentPage <= 1 ? "disabled" : ""}`}
            onClick={() => onPageChange(currentPage - 1)}
          >
            Previous Page
          </div>
          <div className="current" id="current">
            {currentPage}
          </div>
          <div
            className={`page ${
              currentPage >= totalPages ? "disabled" : ""
            }`}
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next Page
          </div>
        </div>
      </div>
    );
  };

export default Pagination;