import '../Styles/PageNav.css'
import React from 'react';
import { useNavigate } from 'react-router-dom';

//Page blog list sort by newest or oldest and query result limit
const PageViewBar = ({ pageNum, sortOrd, limitVal }) => {
    const navigate = useNavigate();
    
    return (
        <div className='page-view-bar'>
            <div>
                <strong>Sort list:</strong>&nbsp;
                {(sortOrd === '-1' || sortOrd === '') ? <button type='button' className='btn-link selected'>Newest First</button> : <button type='button' className='btn-link' onClick={() => navigate(`/blog_reader?page=${pageNum}&sortOrd=-1&limit=${limitVal}`)}>Newest First</button>}
                /&nbsp;
                {sortOrd === '1' ? <button type='button' className='btn-link selected'>Oldest First</button> : <button type='button' className='btn-link' onClick={() => navigate(`/blog_reader?page=${pageNum}&sortOrd=1&limit=${limitVal}`)}>Oldest First</button>}
            </div>
            <div>
                <strong>Post limit:</strong>&nbsp;
                {(limitVal === '5' || limitVal === '') ? <button type='button' className='btn-link selected'>5</button> : <button type='button' className='btn-link' onClick={() => navigate(`/blog_reader?page=1&sortOrd=${sortOrd}&limit=5`)}>5</button>}
                /&nbsp;
                {limitVal === '10' ? <button type='button' className='btn-link selected'>10</button> : <button type='button' className='btn-link' onClick={() => navigate(`/blog_reader?page=1&sortOrd=${sortOrd}&limit=10`)}>10</button>}
                /&nbsp;
                {limitVal === '20' ? <button type='button' className='btn-link selected'>20</button> : <button type='button' className='btn-link' onClick={() => navigate(`/blog_reader?page=1&sortOrd=${sortOrd}&limit=20`)}>20</button>}
            </div>
        </div>
    );
};
export default PageViewBar;