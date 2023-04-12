import '../styles/BlogMainPage.css'
import React from 'react';

import PageNavSpan from './PageNavSpan';

const PageNavRow = ({ paginateInfo, pageNum, sortOrd, limitVal }) => {
    //Page navigation with sort by newest or oldest and query result limit
    return (
        <div className='post-info'>
            <PageNavSpan paginateInfo={paginateInfo} sortOrd={sortOrd} limitVal={limitVal} />
            &nbsp;-&nbsp;
            Sort: <a href={`/blog_reader?page=${pageNum}&sortOrd=-1&limit=${limitVal}`}>{(sortOrd === '-1' || sortOrd === '') ? <strong>Newest First</strong> : 'Newest First'}</a> : <a href={`/blog_reader?page=${pageNum}&sortOrd=1&limit=${limitVal}`}>{sortOrd === '1' ? <strong>Oldest First</strong> : 'Oldest First'}</a>
            &nbsp;-&nbsp;
            Posts: <a href={`/blog_reader?page=1&sortOrd=${sortOrd}&limit=5`}>{(limitVal === '5' || limitVal === '') ? <strong>5</strong> : '5'}</a> / <a href={`/blog_reader?page=1&sortOrd=${sortOrd}&limit=10`}>{limitVal === '10' ? <strong>10</strong> : '10'}</a> / <a href={`/blog_reader?page=1&sortOrd=${sortOrd}&limit=20`}>{limitVal === '20' ? <strong>20</strong> : '20'}</a>
        </div>
    );
};
export default PageNavRow;