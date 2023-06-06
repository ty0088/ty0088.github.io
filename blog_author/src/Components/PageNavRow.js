import '../Styles/PageNav.css';
import React from 'react';
import { Link } from 'react-router-dom';

import PageNavSpan from './PageNavSpan';

//Page navigation with view type, sort by newest or oldest and query result limit
const PageNavRow = ({ paginateInfo, pageNum, sortOrd, limitVal, listViewFlag, setListViewFlag }) => {

    const viewToggle = () => {
        setListViewFlag(!listViewFlag);
    };

    return (
        <div className='page-nav-bar'>
            {listViewFlag &&
                <div>
                    <span><strong>List View</strong></span>
                    &nbsp;/&nbsp;
                    <button type='button' className='button-link' onClick={viewToggle}>Post View</button>
                    &nbsp;-&nbsp;
                </div>
            }
            {!listViewFlag &&
                <div>
                    <button type='button' className='button-link' onClick={viewToggle}>List View</button>
                    &nbsp;/&nbsp;
                    <span><strong>Post View</strong></span>
                    &nbsp;-&nbsp;
                </div>
            }
            <div>
                <PageNavSpan paginateInfo={paginateInfo} sortOrd={sortOrd} limitVal={limitVal} />&nbsp;-&nbsp;
            </div>
            {/* <div>
                Sort: <Link to={`/blog_author?page=${pageNum}&sortOrd=-1&limit=${limitVal}`}>{(sortOrd === '-1' || sortOrd === '') ? <strong>Newest First</strong> : 'Newest First'}</Link> / <Link to={`/blog_author?page=${pageNum}&sortOrd=1&limit=${limitVal}`}>{sortOrd === '1' ? <strong>Oldest First</strong> : 'Oldest First'}</Link>&nbsp;-&nbsp;
            </div>
            <div>
                Posts: <Link to={`/blog_author?page=1&sortOrd=${sortOrd}&limit=5`}>{(limitVal === '5' || limitVal === '') ? <strong>5</strong> : '5'}</Link> / <Link to={`/blog_author?page=1&sortOrd=${sortOrd}&limit=10`}>{limitVal === '10' ? <strong>10</strong> : '10'}</Link> / <Link to={`/blog_author?page=1&sortOrd=${sortOrd}&limit=20`}>{limitVal === '20' ? <strong>20</strong> : '20'}</Link>
            </div> */}
            <div>
                Sort: {(sortOrd === '-1' || sortOrd === '') ? <strong>Newest First</strong> : <Link to={`/blog_author?page=${pageNum}&sortOrd=-1&limit=${limitVal}`}>Newest First</Link>} / {sortOrd === '1' ? <strong>Oldest First</strong> : <Link to={`/blog_author?page=${pageNum}&sortOrd=1&limit=${limitVal}`}>Oldest First</Link>}&nbsp;-&nbsp;
            </div>
            <div>
                Posts: {(limitVal === '5' || limitVal === '') ? <strong>5</strong> : <Link to={`/blog_author?page=1&sortOrd=${sortOrd}&limit=5`}>5</Link>} / {limitVal === '10' ? <strong>10</strong> : <Link to={`/blog_author?page=1&sortOrd=${sortOrd}&limit=10`}>10</Link>} / {limitVal === '20' ? <strong>20</strong> : <Link to={`/blog_author?page=1&sortOrd=${sortOrd}&limit=20`}>20</Link>}
            </div>
        </div>
    );
};
export default PageNavRow;