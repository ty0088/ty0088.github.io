import React from "react";

const PageNavSpan = ({ paginateInfo, sortOrd, limitVal, classStr }) => {
    //return a page navigation element
    //format: first page if not previous page or current page "/" previous page if available "<" current page ">" next page if available "/" last page if not next page or current page
    //format example 1 / 3 < 4 > 5 / 10 --- 10 total pages, current page is 4
    //format example 1 > 2 / 3 --- 3 total pages, current page is 1
    //format example 1 < 2 > 3 --- 3 total pages, current page is 2
    //format example 1 / 2 < 3 --- 3 total pages, current page is 3
    //format example 1 --- 1 total page, current page is 1
    //format example 1 > 2 --- 2 total pages, current page is 1
    return (
        <span className={classStr}>
            Page: {(paginateInfo.prevPage !== 1 && paginateInfo.page !== 1) && <a href={`/blog_reader?page=1&sortOrd=${sortOrd}&limit=${limitVal}`}>1</a>}{(paginateInfo.prevPage !== 1 && paginateInfo.page !== 1) && `/ `}
            {paginateInfo.hasPrevPage && <a href={`/blog_reader?page=${paginateInfo.prevPage}&sortOrd=${sortOrd}&limit=${limitVal}`}>{paginateInfo.prevPage}</a>}  
            {paginateInfo.hasPrevPage && ` < `} <strong>{paginateInfo.page}</strong> {paginateInfo.hasNextPage && ` > `}
            {paginateInfo.hasNextPage && <a href={`/blog_reader?page=${paginateInfo.nextPage}&sortOrd=${sortOrd}&limit=${limitVal}`}>{paginateInfo.nextPage}</a>}
            {(paginateInfo.nextPage !== paginateInfo.totalPages && paginateInfo.page !== paginateInfo.totalPages) && `/ `} {(paginateInfo.nextPage !== paginateInfo.totalPages && paginateInfo.page !== paginateInfo.totalPages) && <a href={`/blog_reader?page=${paginateInfo.totalPages}&sortOrd=${sortOrd}&limit=${limitVal}`}>{paginateInfo.totalPages}</a>}
        </span>
    );
};
export default PageNavSpan;