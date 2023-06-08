import '../Styles/UserDetailPage.css'
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserContent = ({ userType, userPosts, userComments, setScrollComId }) => {
    const [contentType, setContentType] = useState('posts');
    const navigate = useNavigate();

    //reset scroll to comment state on initial render
    useEffect(() => {
        setScrollComId(null);
    // eslint-disable-next-line
    }, []);

    //set content type depening on user type
    useEffect(() => {
        if (userType === 'Reader') {
            setContentType('comments');
        } else {
            setContentType('posts')
        }
    }, [userType]);

    //toggle content to display
    const toggleContent = () => {
        if (contentType === 'posts') {
            setContentType('comments');
        } else {
            setContentType('posts');
        }
    };

    //go to post and scroll to relevant comment
    const commentPostClick = (postId, commentId) => {
        setScrollComId(commentId);
        navigate(`/blog_reader/post/${postId}`)
    };

    if (contentType === 'posts') {
        return (
            <div className='user-content-container'>
                <span><button className='btn-link selected' type='button' >User Blog Posts</button> <button className='btn-link' type='button' onClick={toggleContent}>User Comments</button></span>
                <ol>
                    {userPosts.length > 0 &&
                        userPosts.map((post, i) => {
                            return (
                                <li key={i}>
                                    <Link to={`/blog_reader/post/${post._id}`}>{post.title}</Link>
                                    &nbsp;-&nbsp;({new Date(post.post_date).toLocaleString('en-GB', {day: "numeric", month: "long", year: "numeric" })})
                                    {post.private &&
                                        <span>&nbsp;-&nbsp;Private Post</span>
                                    }
                                </li>
                            );
                        })
                    }
                    {userPosts.length === 0 &&
                        <span>User has no blog posts.</span>
                    }
                </ol>
            </div>
        );
    } else {
        return (
            <div className='user-content-container'>
                <span><button className='btn-link' type='button' onClick={toggleContent}>User Blog Posts</button> <button className='btn-link selected' type='button'>User Comments</button></span>
                <ol>
                    {userComments.length > 0 &&
                        userComments.map((comment, i) => {
                            return (
                                <li key={i} >
                                    <div className='comment-list'>
                                        <span>{comment.text}</span>
                                        <span>&nbsp;-&nbsp;({new Date(comment.post_date).toLocaleString('en-GB', {day: "numeric", month: "long", year: "numeric" })})&nbsp;-&nbsp;</span>
                                        <span>Post: <button type='button' className='button-link' onClick={() => commentPostClick(comment.post._id, comment._id)}>{comment.post.title}</button></span>
                                    </div>
                                </li>
                            );
                        })
                    }
                    {userComments.length === 0 &&
                        <span>User has no comments.</span>
                    }
                </ol>
            </div>
        );
    }
};
export default UserContent;