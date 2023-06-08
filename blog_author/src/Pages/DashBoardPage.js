import '../Styles/DashboardPage.css';
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import PostRow from '../Components/PostRow';
import PostListRow from '../Components/PostListRow';
import PageNavRow from '../Components/PageNavRow';
import PageNavSpan from '../Components/PageNavSpan';
import ConfirmPopUp from '../Components/ConfirmPopUp';
import NavBar from '../Components/NavBar';

const DashboardPage = ({ currUser, setScrollComFlag, setScrollComId }) => {
    const [postList, setPostList] = useState([]);
    const [paginateInfo, setPaginateInfo] = useState({});
    const [pageNum, setPageNum] = useState('');
    const [sortOrd, setSortOrd] = useState('');
    const [limitVal, setLimitVal] = useState('');
    const [clickId, setClickId] = useState('');
    const [listViewFlag, setListViewFlag] = useState(true);
    const [privacyPopUpFlag, setPrivacyPopUpFlag] = useState(false);
    const [deletePopUpFlag, setDeletePopUpFlag] = useState(false);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    //fetch user's posts
    useEffect(() => {
        //get query string values if any
        const getQueryVals = () => {
            setPageNum(searchParams.get('page') || '');
            setSortOrd(searchParams.get('sortOrd') || '');
            setLimitVal(searchParams.get('limit') || '');
        };

        //set scroll to comment states to false (reset to default behavior)
        setScrollComFlag(false);
        setScrollComId(null);

        //if there is an verified user, fetch post data from db
        if (currUser) {
            getQueryVals();
            fetchData();
        }
        //scroll to top of page on render
        document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
    // eslint-disable-next-line
    }, [currUser]);

    //function to get post data from api
    const fetchData = async () => {
        try {
            //request user's post list from api
            const response = await fetch(process.env.NODE_ENV === 'production' ? `https://blog-api.ty0088.co.uk/user/${currUser.user_id}/post-list${window.location.search}` : `${process.env.REACT_APP_BLOGAPI_URL}/user/${currUser.user_id}/post-list${window.location.search}`, { credentials: "include" });
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
    const postPrivacyClick = (postId) => {
        setClickId(postId);
        setPrivacyPopUpFlag(true);
    };

    //confirm change of post privacy
    const confirmPrivatePublic = async () => {
        //submit request to change post private status from api
        try {
            //request update to post private value from api
            const changeBool = !postList[postList.findIndex(post => post._id === clickId)].private;
            const response = await fetch(process.env.NODE_ENV === 'production' ? `https://blog-api.ty0088.co.uk/post/${clickId}/update` : `${process.env.REACT_APP_BLOGAPI_URL}/post/${clickId}/update`, {
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
            } else {
                alert('Something went wrong, try again...');
            }
            setClickId(null);
            setPrivacyPopUpFlag(false);
        } catch (error) {
            console.log(error);
        }
    };

    //cancel post privacy change
    const cancelPrivatePublic = () => {
        setClickId(null);
        setPrivacyPopUpFlag(false);
    };

    //prompt confirmation to delete post
    const deletePostClick = (postId) => {
        setClickId(postId);
        setDeletePopUpFlag(true);
    };

    //submit delete request to api
    const confirmPostDelete = async () => {
        try {
            const response = await fetch(process.env.NODE_ENV === 'production' ? `https://blog-api.ty0088.co.uk/post/${clickId}/delete` : `${process.env.REACT_APP_BLOGAPI_URL}/post/${clickId}/delete`, {
                method: 'DELETE',
                credentials: 'include',
            });
            if (response.status === 200) {
                fetchData();
            } else {
                alert('Something went wrong, try again...');
            }
            setClickId(null);
            setDeletePopUpFlag(false);
        } catch (error) {
            console.log(error);
        }
    };

    //cancel post delete
    const cancelPostDelete = () => {
        setClickId(null);
        setDeletePopUpFlag(false);
    };

    if (currUser) {
        return (
            <div id='main-container'>
                <h1>The Blog Spot - Author Dashboard</h1>
                <NavBar user={currUser} pageType={'blogs'} />
                <button type='button' className='btn-link' onClick={() => navigate('/blog_author/post/create')}>Create New Post</button>
                <PageNavRow paginateInfo={paginateInfo} pageNum={pageNum} sortOrd={sortOrd} limitVal={limitVal} listViewFlag={listViewFlag} setListViewFlag={setListViewFlag} />
                {(currUser && currUser.user_type === 'Demo') &&
                    <span className='post-info'> *This is a read only Demo Account - No submitted data will be saved.*</span>
                }
                {(postList && postList.length > 0) &&
                    <> 
                        {postList.map((post, i) => {
                            if (!listViewFlag) {
                                return (
                                    <PostRow key={i} post={post} postPrivacyClick={postPrivacyClick} deletePostClick={deletePostClick} setScrollComFlag={setScrollComFlag} />
                                );
                            } else {
                                return (
                                    <PostListRow key={i} post={post} postPrivacyClick={postPrivacyClick} deletePostClick={deletePostClick} setScrollComFlag={setScrollComFlag}  />
                                );
                            }
                        })}
                        <PageNavSpan paginateInfo={paginateInfo} sortOrd={sortOrd} limitVal={limitVal} classStr={'post-info'}/>
                    </>
                }
                {(!postList || postList.length === 0) &&
                    <p>There are no posts to show :(</p>
                }
                {privacyPopUpFlag &&
                    <ConfirmPopUp cancelClick={cancelPrivatePublic} confirmClick={confirmPrivatePublic} name={`"${postList[postList.findIndex(post => post._id === clickId)].title}"`} message1={'Are you sure you wish to make post'} message2={postList[postList.findIndex(post => post._id === clickId)].private ? 'public?' : 'private?'} />
                }
                {deletePopUpFlag &&
                    <ConfirmPopUp cancelClick={cancelPostDelete} confirmClick={confirmPostDelete} name={`"${postList[postList.findIndex(post => post._id === clickId)].title}"`} message1={'Are you sure you wish to delete post'} message2={'The post and any related comments will be permanently deleted.'} />
                }
            </div>
        );
    }
};
export default DashboardPage;