import '../Styles/PageNav.css';
import React from "react";
import { useNavigate } from "react-router-dom";

const PageNavBar = ({ paginateInfo, sortOrd, limitVal }) => {
    //return a dashboard page navigation element
    //format: first page if not previous page or current page "/" previous page if available "<" current page ">" next page if available "/" last page if not next page or current page
    //format example 1 / 3 < 4 > 5 / 10 --- 10 total pages, current page is 4
    //format example 1 > 2 / 3 --- 3 total pages, current page is 1
    //format example 1 < 2 > 3 --- 3 total pages, current page is 2
    //format example 1 / 2 < 3 --- 3 total pages, current page is 3
    //format example 1 --- 1 total page, current page is 1
    //format example 1 > 2 --- 2 total pages, current page is 1

    const navigate = useNavigate();

    return (
        <div className='page-nav-bar'>
            <strong>Page:</strong>&nbsp;
            {(paginateInfo.prevPage !== 1 && paginateInfo.page !== 1) && 
                <>
                    <button type='button' className='btn-link' onClick={() => navigate(`/blog_reader?page=1&sortOrd=${sortOrd}&limit=${limitVal}`)}>1</button>
                    &nbsp;/&nbsp;
                </>
            }
            {paginateInfo.hasPrevPage &&
                <>
                    <button type='button' className='btn-link' onClick={() => navigate(`/blog_reader?page=${paginateInfo.prevPage}&sortOrd=${sortOrd}&limit=${limitVal}`)}>{paginateInfo.prevPage}</button>
                    &nbsp;&lt;&nbsp;
                </>
            }
            <button type='button' className='btn-link selected'>{paginateInfo.page}</button>
            {paginateInfo.hasNextPage &&
                <>
                    &nbsp;&gt;&nbsp;
                    <button type='button' className='btn-link' onClick={() => navigate(`/blog_reader?page=${paginateInfo.nextPage}&sortOrd=${sortOrd}&limit=${limitVal}`)}>{paginateInfo.nextPage}</button>
                </>
            }
            {(paginateInfo.nextPage !== paginateInfo.totalPages && paginateInfo.page !== paginateInfo.totalPages) &&
                <>
                    &nbsp;/&nbsp;
                    <button type='button' className='btn-link' onClick={() => navigate(`/blog_reader?page=${paginateInfo.totalPages}&sortOrd=${sortOrd}&limit=${limitVal}`)}>{paginateInfo.totalPages}</button>
                </>
            }
        </div>
    );
};
export default PageNavBar;