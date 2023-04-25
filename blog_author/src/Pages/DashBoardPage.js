import '../Styles/DashboardPage.css';
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import logOut from '../Javascript/logOut'
import PostRow from '../Components/PostRow';
import PostListRow from '../Components/PostListRow';
import PageNavRow from '../Components/PageNavRow';
import PageNavSpan from '../Components/PageNavSpan';
import ConfirmPopUp from '../Components/ConfirmPopUp';

const DashboardPage = ({ currUser }) => {
    const [postList, setPostList] = useState([]);
    const [paginateInfo, setPaginateInfo] = useState({});
    const [pageNum, setPageNum] = useState(null);
    const [sortOrd, setSortOrd] = useState(null);
    const [limitVal, setLimitVal] = useState(null);
    const [clickId, setClickId] = useState(null);
    const [listViewFlag, setListViewFlag] = useState(true);
    const [popUpFlag, setPopUpFlag] = useState(false);
    const [searchParams] = useSearchParams();

    //fetch user's posts
    useEffect(() => {
        //get query string values if any
        const getQueryVals = () => {
            setPageNum(searchParams.get('page') || '');
            setSortOrd(searchParams.get('sortOrd') || '');
            setLimitVal(searchParams.get('limit') || '');
        };

        //if there is an verified user, fetch post data from db
        if (currUser) {
            getQueryVals();
            fetchData();
        }

    // eslint-disable-next-line
    }, [currUser]);

    //function to get post data from api
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

    //prompt confirmation to make post private/public
    const privatePublicClick = (postId) => {
        setClickId(postId);
        setPopUpFlag(true);
    };

    const confirmPrivatePublic = async () => {
        //submit request to change post private status from api
        try {
            //request update to post private value from api
            const changeBool = !postList[postList.findIndex(post => post._id === clickId)].private;
            const response = await fetch(`${process.env.REACT_APP_BLOGAPI_URL}/post/${clickId}/update`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ post_private: changeBool }),
            });
            if (response.status === 200) {
                fetchData();
            }
            setClickId(null);
            setPopUpFlag(false);
        } catch (error) {
            console.log(error);
        }
    };

    const cancelPrivatePublic = () => {
        setClickId(null);
        setPopUpFlag(false);
    };

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
                                    <PostRow key={i} post={post} privatePublicClick={privatePublicClick} />
                                );
                            } else {
                                return (
                                    <PostListRow key={i} post={post} privatePublicClick={privatePublicClick} />
                                );
                            }
                        })}
                        <PageNavSpan paginateInfo={paginateInfo} sortOrd={sortOrd} limitVal={limitVal} classStr={'post-info'}/>
                    </>
                }
                {postList.length === 0 &&
                    <p>There are no posts to show :(</p>
                }
                {popUpFlag &&
                    <ConfirmPopUp cancelClick={cancelPrivatePublic} confirmClick={confirmPrivatePublic} name={`"${postList[postList.findIndex(post => post._id === clickId)].title}"`} message1={'Are you sure you wish to make post'} message2={postList[postList.findIndex(post => post._id === clickId)].private ? 'public?' : 'private?'} />
                }
            </div>
        );
    }
};
export default DashboardPage;