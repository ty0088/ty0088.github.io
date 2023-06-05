import '../Styles/PostDetailPage.css'
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';

import logOut from '../Javascript/logOut';
import CommentList from '../Components/CommentList';
import CommentForm from '../Components/CommentForm';
import decodeHtml from '../Javascript/decodeHtml';
import ConfirmPopUp from '../Components/ConfirmPopUp';

const PostDetailPage = ({ currUser, scrollComFlag, setScrollComFlag, scrollComId  }) => {
    const [postData, setPostData] = useState({});
    const [commentData, setCommentData] = useState([]);
    const [newComFlag, setNewComFlag] = useState(false);
    const [editCommentId, setEditCommentId] = useState(null);
    const [scrollNewComFlag, setScrollNewComFlag] = useState(false);
    const [deletePopUpFlag, setDeletePopUpFlag] = useState(false);
    const { postId } = useParams();
    const navigate = useNavigate();

    //function to get post and related comments from api
    const fetchData = async () => {
        try {
            //fetch post data from api
            const response = await fetch(process.env.NODE_ENV === 'production' ? `https://blog-api.ty0088.co.uk/post/${postId}` : `${process.env.REACT_APP_BLOGAPI_URL}/post/${postId}`, { credentials: "include" });
            if (response.status === 200) {
                //if successful response, set data to state
                const responseData = await response.json();
                setPostData(responseData.post);
                setCommentData(responseData.comments);
            } else {
                //otherwise log response status and text
                console.log(response.status + ' : ' + response.statusText);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        //on render or change of postId, fetch post/comment data from api
        fetchData();
    // eslint-disable-next-line
    }, [postId]);

    useEffect(() => {
        //scroll to start of comment section or to specified comment if called
        if (scrollComFlag) {
            document.getElementById('comment-container').scrollIntoView({ behavior: "smooth", block: "start" });
        }
        const commentElem = document.querySelector(`[data-commentid="${scrollComId}"]`);
        if (commentElem !== null) {
            document.querySelector(`[data-commentid="${scrollComId}"]`).scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, [commentData, scrollComFlag, scrollComId]);

    //function to render comment add new comment form and close any other forms open
    const addCommentClick = () => {
        setNewComFlag(true);
        setEditCommentId(null);
    };

    //prompt confirmation to delete post
    const deletePostClick = (postId) => {
        setDeletePopUpFlag(true);
    };

    //submit delete request to api
    const confirmPostDelete = async () => {
        try {
            const response = await fetch(process.env.NODE_ENV === 'production' ? `https://blog-api.ty0088.co.uk/post/${postId}/delete` : `${process.env.REACT_APP_BLOGAPI_URL}/post/${postId}/delete`, {
                method: 'DELETE',
                credentials: 'include',
            });
            if (response.status === 200) {
                navigate('/blog_author');
            } else {
                alert('Something went wrong, try again...');
            }
            setDeletePopUpFlag(false);
        } catch (error) {
            console.log(error);
        }
    };

    //cancel post delete
    const cancelPostDelete = () => {
        setDeletePopUpFlag(false);
    };

    return (
        <div id='main-container'>
            <h1>The Blog Spot - Author</h1>
            <nav>
                <Link className='button-link' to='/blog_author'>Dashboard</Link>
                <Link className='button-link' to={`/blog_author/user/${currUser.user_id}`}>My Account ({currUser.display_name})</Link>
                <button className='button-link' type='button' onClick={logOut}>Log Out</button>
            </nav>     
            <div className='post-row'>
                {Object.keys(postData).length > 0 &&
                    <>
                        <h3>{decodeHtml(postData.title)}</h3>
                        <div className='post-info'>
                            Posted on: {new Date(postData.post_date).toLocaleString('en-GB', { weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "numeric", minute: "numeric", hour12: true })}
                        </div>
                        <hr></hr>
                        <div className='post-text'>{parse(postData.text)}</div>
                        <hr></hr>
                        <div className='post-footer'>
                            <div>
                                <Link to={`/blog_author/post/${postId}/update`}>EDIT</Link>&nbsp;-&nbsp;
                                <button type='button' className='button-link' onClick={() => deletePostClick(postId)}>DELETE</button>
                            </div>
                            {postData.lastEditBy &&
                                <span>&nbsp;- <i>Last edited: {new Date(postData.lastEditDate).toLocaleString()} by {postData.lastEditBy.display_name} ({postData.lastEditBy.user_type})</i></span>
                            }
                        </div>
                    </>                    
                }
            </div>
            <div id='comment-container'>
                {!newComFlag &&
                    <button type='button' className='button-link' onClick={addCommentClick}>Add New Comment</button>
                }
                {(currUser && currUser.user_type === 'Demo') &&
                    <span className='post-info'> *This is a read only Demo Account - No submitted data will be saved.*</span>
                }
                {newComFlag &&
                    <CommentForm postId={postId} commentText={null} fetchData={fetchData} setNewComFlag={setNewComFlag} setScrollNewComFlag={setScrollNewComFlag} setScrollComFlag={setScrollComFlag} editCommentId={editCommentId} setEditCommentId={setEditCommentId} />
                }
                <CommentList currUser={currUser} commentData={commentData} postId={postId} fetchData={fetchData} scrollNewComFlag={scrollNewComFlag} setNewComFlag={setNewComFlag} setScrollNewComFlag={setScrollNewComFlag} setScrollComFlag={setScrollComFlag} editCommentId={editCommentId} setEditCommentId={setEditCommentId} />
            </div>
            {deletePopUpFlag &&
                <ConfirmPopUp cancelClick={cancelPostDelete} confirmClick={confirmPostDelete} name={postData.title} message1={'Are you sure you wish to delete post'} message2={'The post and any related comments will be permanently deleted.'} />
            }
        </div>
    );
};
export default PostDetailPage;