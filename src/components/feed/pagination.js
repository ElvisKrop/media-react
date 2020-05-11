import React from "react";

function Pagination({ data: { articlesCount, currentPage, setPage } }) {
  function renderButton() {
    let arr = [];
    for (let i = 0; i < articlesCount; i++) {
      arr.push(i);
    }

    return arr.map((item) => {
      let className = "page-item";

      if (item === currentPage) {
        className += " active";
      }

      return (
        <li className={className} key={item} onClick={() => setPage(item)}>
          <button className="page-link">{item + 1}</button>
        </li>
      );
    });
  }

  return <ul className="pagination pl-3 d-flex flex-wrap">{renderButton()}</ul>;
}

export default Pagination;
