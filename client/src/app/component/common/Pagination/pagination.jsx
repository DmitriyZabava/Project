import React from "react";
import PropTypes from "prop-types";

import intToArray from "../../../utils/intToArray";

function Pagination({itemsCount, pageSize, onPageChange, currentPage}) {
    const pageCount = Math.ceil(itemsCount / pageSize);

    if(pageCount === 1) return null;
    const notActive =
        "h-10 px-5 text-sky-800 transition-colors duration-150 focus:shadow-outline hover:bg-sky-300";
    const active =
        "h-10 px-5 text-white transition-colors duration-150 bg-sky-800 border border-r-0 border-sky-500 focus:shadow-outline";

    const pages = intToArray(pageCount);

    return (
        <div className="bg-white p-4 flex items-center flex-wrap">
            <nav aria-label="Page navigation">
                <ul className="inline-flex">
                    {pages.map((page) => (
                        <li key={"page_" + page}>
                            <button
                                className={
                                    page === currentPage ? active : notActive
                                }
                                onClick={() => onPageChange(page)}
                            >
                                {page}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}

Pagination.propTypes = {
    itemsCount: PropTypes.number,
    pageSize: PropTypes.number,
    onPageChange: PropTypes.func,
    currentPage: PropTypes.number,
};

export default Pagination;
