import React from "react";
import Pagination from "react-js-pagination";
function PaginationBar(props) {
  return (
    <div className="d-flex justify-content-center">
      <Pagination
        activePage={props.currentPage}
        onChange={props.click}
        pageRangeDisplayed={2}
        itemsCountPerPage={props.limit}
        totalItemsCount={props.totalPageNum * props.limit}
        itemClass={"page-item"}
        itemClassPrev={"page-item"}
        itemClassNext={"page-item"}
        linkClass={"page-link"}
      />
    </div>
  );
}

export default PaginationBar;
