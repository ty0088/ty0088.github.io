import '../Styles/UserDetailPage.css'
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserContent = ({ userType, userPosts, userComments }) => {
    const [contentType, setContentType] = useState('posts');
    const navigate = useNavigate();

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
    const commentPostClick = (postId) => {
        navigate(`/blog_author/post/${postId}`);
        //scroll to comment ------------------------------------------------------- ???
    };

    if (contentType === 'posts') {
        return (
            <ol className='user-content-container'>
                <span><strong>User Blog Posts</strong> / <button className='button-link' type='button' onClick={toggleContent}>User Comments</button></span>
                {userPosts.length > 0 &&
                    userPosts.map((post, i) => {
                        return (
                            <li key={i}>
                                <Link to={`/blog_reader/post/${post._id}`}>{post.title}</Link>
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
                {userComments.length > 0 &&
                    userComments.map((comment, i) => {
                        return (
                            <li key={i}>
                                {comment.text}
                                &nbsp;&nbsp;-&nbsp;&nbsp;({new Date(comment.post_date).toLocaleString('en-GB', {day: "numeric", month: "long", year: "numeric" })})
                                &nbsp;&nbsp;-&nbsp;&nbsp;Post: <button type='button' className='button-link' onClick={() => commentPostClick(comment.post._id)}>{comment.post.title}</button>
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