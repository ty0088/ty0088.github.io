import '../Styles/PageNav.css'
import React from 'react';
import { Link } from 'react-router-dom';

import PageNavSpan from './PageNavSpan';

const PageNavRow = ({ paginateInfo, pageNum, sortOrd, limitVal }) => {
    //Page navigation with sort by newest or oldest and query result limit
    return (
        <div className='page-nav-bar'>
            <div>
                <PageNavSpan paginateInfo={paginateInfo} sortOrd={sortOrd} limitVal={limitVal} />&nbsp;-&nbsp;
            </div>
            
            <div>
                Sort: {(sortOrd === '-1' || sortOrd === '') ? <strong>Newest First</strong> : <Link to={`/blog_reader?page=${pageNum}&sortOrd=-1&limit=${limitVal}`}>Newest First</Link>} / {sortOrd === '1' ? <strong>Oldest First</strong> : <Link to={`/blog_reader?page=${pageNum}&sortOrd=1&limit=${limitVal}`}>Oldest First</Link>}&nbsp;-&nbsp;
            </div>
            <div>
                Posts: {(limitVal === '5' || limitVal === '') ? <strong>5</strong> : <Link to={`/blog_reader?page=1&sortOrd=${sortOrd}&limit=5`}>5</Link>} / {limitVal === '10' ? <strong>10</strong> : <Link to={`/blog_reader?page=1&sortOrd=${sortOrd}&limit=10`}>10</Link>} / {limitVal === '20' ? <strong>20</strong> : <Link to={`/blog_reader?page=1&sortOrd=${sortOrd}&limit=20`}>20</Link>}
            </div>
        </div>
    );
};
export default PageNavRow;