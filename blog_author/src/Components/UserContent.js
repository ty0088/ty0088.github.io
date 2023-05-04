import '../Styles/UserDetailPage.css'
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserContent = ({ currUser, userId, userType, userPosts, userComments, setScrollComId }) => {
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

    //go to post detail page with selected comment
    const commentPostClick = (comment) => {
        if (comment.post.user === currUser.user_id) {
            //if comment is on authors post, direct to 
            setScrollComId(comment._id);
            navigate(`/blog_author/post/${comment.post._id}`);
        } else {
            //if comment is from another author's post, open new window to blog reader site
            window.open(process.env.NODE_ENV === 'production' ? `https://ty0088.github.io/blog_reader/post/${comment.post._id}` : `${process.env.REACT_APP_BLOG_READER_URL}/post/${comment.post._id}`);
        }

    };

    if (contentType === 'posts') {
        return (
            <ol className='user-content-container'>
                <span><strong>User Blog Posts</strong> / <button className='button-link' type='button' onClick={toggleContent}>User Comments</button></span>
                {currUser.user_id !== userId &&
                    <span className='post-info'>(Links to other author's posts will redirect you to The Blog Spot - <strong>Reader</strong> web site)</span>
                }
                {userPosts.length > 0 &&
                    userPosts.map((post, i) => {
                        return (
                            <li key={i}>
                                {currUser.user_id === userId &&
                                    <Link to={`/blog_author/post/${post._id}`}>{post.title}</Link>
                                }
                                {currUser.user_id !== userId &&
                                    <button type='button' className='button-link' onClick={() => window.open(process.env.NODE_ENV === 'production' ? `https://ty0088.github.io/blog_reader/post/${post._id}` : `${process.env.REACT_APP_BLOG_READER_URL}/post/${post._id}`)}>{post.title}</button>
                                }
                                &nbsp;&nbsp;-&nbsp;&nbsp;({new Date(post.post_date).toLocaleString('en-GB', {day: "numeric", month: "long", year: "numeric" })})
                                {post.private &&
                                    <span>&nbsp;&nbsp;-&nbsp;&nbsp;Private Post</span>
                                }
                            </li>
                        );
                    })
                }
                {userPosts.length === 0 &&
                    <span>User has no blog posts.</span>
                }
            </ol>
        );
    } else {
        return (
            <ol className='user-content-container'>
                <span><button className='button-link' type='button' onClick={toggleContent}>User Blog Posts</button> / <strong>User Comments</strong></span>
                {currUser.user_id !== userId &&
                    <span className='post-info'>(Links to comments in other author's posts will redirect you to The Blog Spot - <strong>Reader</strong> web site)</span>
                }
                {userComments.length > 0 &&
                    userComments.map((comment, i) => {
                        return (
                            <li key={i}>
                                {comment.text}
                                &nbsp;&nbsp;-&nbsp;&nbsp;({new Date(comment.post_date).toLocaleString('en-GB', {day: "numeric", month: "long", year: "numeric" })})
                                &nbsp;&nbsp;-&nbsp;&nbsp;Post: <button type='button' className='button-link' onClick={() => commentPostClick(comment)}>{comment.post.title}</button>
                            </li>
                        );
                    })
                }
                {userComments.length === 0 &&
                    <span>User has no comments.</span>
                }
            </ol>
        );
    }
};
export default UserContent;