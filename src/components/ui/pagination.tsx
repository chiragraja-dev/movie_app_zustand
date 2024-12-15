"use client"
import React, { useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageClick = (page: number) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };


  const range = 3;
  const start = Math.max(1, currentPage - range);
  const end = Math.min(totalPages, currentPage + range);

  const pagesToShow = [];

  if (start > 1) {
    pagesToShow.push(1);
    if (start > 2) pagesToShow.push("...");
  }

  for (let i = start; i <= end; i++) {
    pagesToShow.push(i);
  }

  if (end < totalPages) {
    if (end < totalPages - 1) pagesToShow.push("...");
    pagesToShow.push(totalPages);
  }

  useEffect(() => {
    scroll.scrollToTop({ duration: 500, smooth: true });
  }, [currentPage]);
  return (
    <div className="flex justify-center items-center space-x-2 mt-4">

      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
      >
        Previous
      </button>

      <div className="flex space-x-1">
        {pagesToShow.map((page, index) => (
          <button
            key={index}
            onClick={() => {
              if (typeof page === "number") {
                handlePageClick(page);
              }
            }}
            className={`px-3 py-2 rounded-md ${page === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
