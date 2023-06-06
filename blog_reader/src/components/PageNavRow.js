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
                Sort: <Link to={`/blog_reader?page=${pageNum}&sortOrd=-1&limit=${limitVal}`}>{(sortOrd === '-1' || sortOrd === '') ? <strong>Newest First</strong> : 'Newest First'}</Link> / <Link to={`/blog_reader?page=${pageNum}&sortOrd=1&limit=${limitVal}`}>{sortOrd === '1' ? <strong>Oldest First</strong> : 'Oldest First'}</Link>&nbsp;-&nbsp;
            </div>
            <div>
                Posts: <Link to={`/blog_reader?page=1&sortOrd=${sortOrd}&limit=5`}>{(limitVal === '5' || limitVal === '') ? <strong>5</strong> : '5'}</Link> / <Link to={`/blog_reader?page=1&sortOrd=${sortOrd}&limit=10`}>{limitVal === '10' ? <strong>10</strong> : '10'}</Link> / <Link to={`/blog_reader?page=1&sortOrd=${sortOrd}&limit=20`}>{limitVal === '20' ? <strong>20</strong> : '20'}</Link>
            </div>
        </div>
    );
};
export default PageNavRow;