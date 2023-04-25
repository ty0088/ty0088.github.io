import '../Styles/DashboardPage.css';
import React from 'react';
import { Link } from 'react-router-dom';

import PageNavSpan from './PageNavSpan';

//Page navigation with view type, sort by newest or oldest and query result limit
const PageNavRow = ({ paginateInfo, pageNum, sortOrd, limitVal, listViewFlag, setListViewFlag }) => {

    const viewToggle = () => {
        setListViewFlag(!listViewFlag);
    };

    return (
        <div className='post-info'>
            {listViewFlag &&
                <>
                    <span><strong>List View</strong></span>
                    &nbsp;/&nbsp;
                    <button type='button' className='button-link' onClick={viewToggle}>Post View</button>
                    &nbsp;--&nbsp;
                </>
            }
            {!listViewFlag &&
                <>
                    <button type='button' className='button-link' onClick={viewToggle}>List View</button>
                    &nbsp;/&nbsp;
                    <span><strong>Post View</strong></span>
                    &nbsp;--&nbsp;
                </>
            }
            <PageNavSpan paginateInfo={paginateInfo} sortOrd={sortOrd} limitVal={limitVal} />
            &nbsp;--&nbsp;
            Sort: <Link to={`/blog_author?page=${pageNum}&sortOrd=-1&limit=${limitVal}`}>{(sortOrd === '-1' || sortOrd === '') ? <strong>Newest First</strong> : 'Newest First'}</Link> / <Link to={`/blog_author?page=${pageNum}&sortOrd=1&limit=${limitVal}`}>{sortOrd === '1' ? <strong>Oldest First</strong> : 'Oldest First'}</Link>
            &nbsp;--&nbsp;
            Posts: <Link to={`/blog_author?page=1&sortOrd=${sortOrd}&limit=5`}>{(limitVal === '5' || limitVal === '') ? <strong>5</strong> : '5'}</Link> / <Link to={`/blog_author?page=1&sortOrd=${sortOrd}&limit=10`}>{limitVal === '10' ? <strong>10</strong> : '10'}</Link> / <Link to={`/blog_author?page=1&sortOrd=${sortOrd}&limit=20`}>{limitVal === '20' ? <strong>20</strong> : '20'}</Link>
        </div>
    );
};
export default PageNavRow;