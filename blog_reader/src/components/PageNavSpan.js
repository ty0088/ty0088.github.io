import React from "react";

const PageNavSpan = ({ paginateInfo, sortOrd, limitVal, classStr }) => {

    return (
        <span className={classStr}>
            Page: {(paginateInfo.prevPage !== 1 && paginateInfo.page !== 1) && <a href={`/blog_reader?page=1&sortOrd=${sortOrd}&limit=${limitVal}`}>1</a>}{(paginateInfo.prevPage !== 1 && paginateInfo.page !== 1) && ` / `}
            {paginateInfo.hasPrevPage && <a href={`/blog_reader?page=${paginateInfo.prevPage}&sortOrd=${sortOrd}&limit=${limitVal}`}>{paginateInfo.prevPage}</a>}  
            {paginateInfo.hasPrevPage && ` < `} <strong>{paginateInfo.page}</strong> {paginateInfo.hasNextPage && ` > `}
            {paginateInfo.hasNextPage && <a href={`/blog_reader?page=${paginateInfo.nextPage}&sortOrd=${sortOrd}&limit=${limitVal}`}>{paginateInfo.nextPage}</a>}
            {(paginateInfo.nextPage !== paginateInfo.totalPages && paginateInfo.page !== paginateInfo.totalPages) && ` / `} {(paginateInfo.nextPage !== paginateInfo.totalPages && paginateInfo.page !== paginateInfo.totalPages) && <a href={`/blog_reader?page=${paginateInfo.totalPages}&sortOrd=${sortOrd}&limit=${limitVal}`}>{paginateInfo.totalPages}</a>}
        </span>
    );
};
export default PageNavSpan;