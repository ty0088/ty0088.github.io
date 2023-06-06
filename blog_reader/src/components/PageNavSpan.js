import '../Styles/PageNav.css';
import React from "react";
import { Link } from "react-router-dom";

const PageNavSpan = ({ paginateInfo, sortOrd, limitVal }) => {
    //return a page navigation element
    //format: first page if not previous page or current page "/" previous page if available "<" current page ">" next page if available "/" last page if not next page or current page
    //format example 1 / 3 < 4 > 5 / 10 --- 10 total pages, current page is 4
    //format example 1 > 2 / 3 --- 3 total pages, current page is 1
    //format example 1 < 2 > 3 --- 3 total pages, current page is 2
    //format example 1 / 2 < 3 --- 3 total pages, current page is 3
    //format example 1 --- 1 total page, current page is 1
    //format example 1 > 2 --- 2 total pages, current page is 1
    return (
        <span className='page-nav-span'>
            Page: {(paginateInfo.prevPage !== 1 && paginateInfo.page !== 1) && <Link to={`/blog_reader?page=1&sortOrd=${sortOrd}&limit=${limitVal}`}>1</Link>}{(paginateInfo.prevPage !== 1 && paginateInfo.page !== 1) && ` / `}
            {paginateInfo.hasPrevPage && <Link to={`/blog_reader?page=${paginateInfo.prevPage}&sortOrd=${sortOrd}&limit=${limitVal}`}>{paginateInfo.prevPage}</Link>}  
            {paginateInfo.hasPrevPage && ` < `} <strong>{paginateInfo.page}</strong> {paginateInfo.hasNextPage && ` > `}
            {paginateInfo.hasNextPage && <Link to={`/blog_reader?page=${paginateInfo.nextPage}&sortOrd=${sortOrd}&limit=${limitVal}`}>{paginateInfo.nextPage}</Link>}
            {(paginateInfo.nextPage !== paginateInfo.totalPages && paginateInfo.page !== paginateInfo.totalPages) && ` / `} {(paginateInfo.nextPage !== paginateInfo.totalPages && paginateInfo.page !== paginateInfo.totalPages) && <Link to={`/blog_reader?page=${paginateInfo.totalPages}&sortOrd=${sortOrd}&limit=${limitVal}`}>{paginateInfo.totalPages}</Link>}
        </span>
    );
};
export default PageNavSpan;