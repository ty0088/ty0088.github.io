import '../styles/PostDetailPage.css'
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

import logOut from '../javascript/logOut';
import fetchUserToken from '../javascript/fetchUserToken';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

const PostDetailPage = ({ scrollComFlag, setScrollComFlag }) => {
    const [currUser, setCurrUser] = useState({});
    const [postData, setPostData] = useState({});
    const [commentData, setCommentData] = useState([]);
    const [newCommentFlag, setNewCommentFlag] = useState(false);
    const [scrollNewComFlag, setScrollNewComFlag] = useState(false);
    const { postId } = useParams();
    const navigate = useNavigate();

    //function to get post and related comments from api
    const fetchData = async () => {
        try {
            //fetch user token data from api  
            const tokenResponse = await fetchUserToken();
            setCurrUser(tokenResponse.user ? tokenResponse.user : {});
            //fetch post data from api
            const response = await fetch(`${process.env.REACT_APP_BLOGAPI_URL}/post/${postId}`, { credentials: "include" });
            if (response.status === 200) {
                //if successful response, set data to state
                const responseData = await response.json();
                setPostData(responseData.post);
                setCommentData(responseData.comments);
            } else if (response.status === 401) {
                //if 401 Unauthorised error, redirect user to log in
                navigate('/blog_reader/request-log-in');
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
        //scroll to comment section if called
        if (scrollComFlag) {
            document.getElementById('comment-container').scrollIntoView({ behavior: "smooth", block: "start" });
        }        
    }, [commentData, scrollComFlag]);

    //function to render comment add new comment form
    const addCommentClick = () => {
        setNewCommentFlag(true);
    };

    return (
        <div id='main-container'>
            <h1>The Blog Spot</h1>
            <nav>
                <Link className='button-link' to='/blog_reader'>Blog Posts</Link>
                <Link className='button-link' to={`/blog_reader/user/${currUser.user_id}`}>My Account ({currUser.display_name})</Link>
                <button className='button-link' type='button' onClick={logOut}>Log Out</button>
            </nav>
            <div className='post-row'>
                {Object.keys(postData).length > 0 &&
                    <>
                        <h3>{postData.title}</h3>
                        <div className='post-info'>
                            <a href={`/blog_reader/user/${postData.user._id}`}>{postData.user.display_name}</a>,&nbsp;
                            Posted on: {new Date(postData.post_date).toLocaleString('en-GB', { weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "numeric", minute: "numeric", hour12: true })}
                        </div>
                        <div className='post-text'>{postData.text}</div>
                        <div className='post-footer'>
                            {postData.lastEditBy &&
                                <span><i>Last edited: {new Date(postData.lastEditDate).toLocaleString()} by {postData.lastEditBy.display_name} ({postData.lastEditBy.user_type})</i></span>
                            }
                        </div>
                    </>                    
                }
            </div>
            <div id='comment-container'>
                {!newCommentFlag &&
                    <button type='button' className='button-link' onClick={addCommentClick}>Add New Comment</button>
                }
                {newCommentFlag &&
                    <CommentForm setNewCommentFlag={setNewCommentFlag} postId={postId} fetchData={fetchData} setScrollNewComFlag={setScrollNewComFlag} setScrollComFlag={setScrollComFlag} />
                }
                <CommentList commentData={commentData} scrollNewComFlag={scrollNewComFlag}/>
            </div>
        </div>
    );
};
export default PostDetailPage;