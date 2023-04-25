import '../Styles/DashboardPage.css';
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import logOut from '../Javascript/logOut'
import PostRow from '../Components/PostRow';
import PostListRow from '../Components/PostListRow';
import PageNavRow from '../Components/PageNavRow';
import PageNavSpan from '../Components/PageNavSpan';

const DashboardPage = ({ currUser }) => {
    const [postList, setPostList] = useState([]);
    const [paginateInfo, setPaginateInfo] = useState({});
    const [pageNum, setPageNum] = useState(null);
    const [sortOrd, setSortOrd] = useState(null);
    const [limitVal, setLimitVal] = useState(null);
    const [listViewFlag, setListViewFlag] = useState(true);
    const [searchParams] = useSearchParams();

    //fetch user's posts
    useEffect(() => {
        //get query string values if any
        const getQueryVals = () => {
            setPageNum(searchParams.get('page') || '');
            setSortOrd(searchParams.get('sortOrd') || '');
            setLimitVal(searchParams.get('limit') || '');
        };

        //function to get post data
        const fetchData = async () => {
            try {
                //request user's post list from api
                const response = await fetch(`${process.env.REACT_APP_BLOGAPI_URL}/user/${currUser.user_id}/post-list${window.location.search}`, { credentials: "include" });
                const responseData = await response.json();
                //once response is returned, set the post list and paginate data to state
                setPostList(responseData.docs);
                setPaginateInfo({
                    totalDocs: responseData.totalDocs,
                    limit: responseData.limit,
                    totalPages: responseData.totalPages,
                    page: responseData.page,
                    pagingCounter: responseData.page,
                    hasPrevPage: responseData.hasPrevPage,
                    hasNextPage: responseData.hasNextPage,
                    prevPage: responseData.prevPage,
                    nextPage: responseData.nextPage,
                });
            } catch (error) {
                console.log(error);
            }
        };

        //if there is an verified user, fetch post data from db
        if (currUser) {
            getQueryVals();
            fetchData();
        }

    // eslint-disable-next-line
    }, [currUser]);

    if (currUser) {
        return (
            <div id='main-container'>
                <h1>The Blog Spot - Author Dashboard</h1>
                <nav>
                    <Link className='button-link' to={`/blog_author/user/${currUser.user_id}`}>My Account ({currUser.display_name})</Link>
                    <button className='button-link' type='button' onClick={logOut}>Log Out</button>
                </nav>
                <PageNavRow paginateInfo={paginateInfo} pageNum={pageNum} sortOrd={sortOrd} limitVal={limitVal} listViewFlag={listViewFlag} setListViewFlag={setListViewFlag} />
                {postList.length > 0 &&
                    <> 
                        {postList.map((post, i) => {
                            if (!listViewFlag) {
                                return (
                                    <PostRow key={i} post={post} />
                                );
                            } else {
                                return (
                                    <PostListRow key={i} post={post} />
                                );
                            }
                        })}
                        <PageNavSpan paginateInfo={paginateInfo} sortOrd={sortOrd} limitVal={limitVal} classStr={'post-info'}/>
                    </>
                }
                {postList.length === 0 &&
                    <p>There are no posts to show :(</p>
                }
            </div>
        );
    }
};
export default DashboardPage;