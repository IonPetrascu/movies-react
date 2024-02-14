import React from 'react';
import ReactPaginate from 'react-paginate';

function Pagination({ setCurrentPage, totalPages, headerRef }) {
  const pageCount = totalPages <= 500 ? totalPages : 500;
  return (
    <>
      <ReactPaginate
        containerClassName="flex flex-wrap border-t mt-7 mx-auto py-5 justify-center gap-5 "
        pageClassName="bg-white py-1 px-3 p block text-black rounded-lg"
        activeClassName="bg-purple-300 text-red-400 block shadow-xl"
        breakClassName="bg-white text-black flex items-center px-2 rounded-lg"
        previousClassName="bg-white text-black flex items-center px-2 rounded-lg"
        nextClassName="bg-white text-black flex items-center px-2 rounded-lg"
        onPageChange={(event) => {
          setCurrentPage(event.selected + 1 <= 500 ? event.selected + 1 : 500);
          headerRef.current.scrollIntoView();
        }}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        breakLabel="..."
        nextLabel={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3"
            />
          </svg>
        }
        previousLabel={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
            />
          </svg>
        }
        renderOnZeroPageCount={null}
      />
    </>
  );
}

export default Pagination;
