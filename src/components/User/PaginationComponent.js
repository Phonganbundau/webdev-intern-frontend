import React from 'react';
import ReactPaginate from 'react-paginate';


const PaginationComponent = ({ pageCount, handlePageClick }) => {
  return (
    
    <div className="pagination-container">
    <ReactPaginate
      previousLabel={'Previous'}
      nextLabel={'Next'}
      breakLabel={'...'}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageClick}
      containerClassName={'pagination'}
      subContainerClassName={'pages pagination'}
      activeClassName={'active'}
    />
  </div>
  );
};

export default PaginationComponent;
