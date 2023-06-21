import '../Styles/DashboardPage.css';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import decodeHtml from '../Javascript/decodeHtml';

const PostListRow = ({ post, postPrivacyClick, deletePostClick, setScrollComFlag }) => {
    const navigate = useNavigate();

    //go to post detail page
    const commentClick = () => {
        setScrollComFlag(true);
        navigate(`/blog_author/post/${post._id}`);
    };

    return (
        <div className='post-row'>
            <h4>Blog Title: <Link to={`/blog_author/post/${post._id}`}>{decodeHtml(post.title)}</Link></h4>
            <div className='post-info'>
                Created on {new Date(post.post_date).toLocaleString('en-GB', { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </div>
            <div className='post-footer'>
                {post.private &&
                    <div>
                        <span>Post is <strong>Private</strong></span>&nbsp;-&nbsp;
                        <button type='button' className='btn-link' onClick={() => postPrivacyClick(post._id)}>Make Public</button>
                    </div>
                }
                {!post.private &&
                    <div>
                        <span>Post is <strong>Public</strong></span>&nbsp;-&nbsp;
                        <button type='button' className='btn-link' onClick={() => postPrivacyClick(post._id)}>Make Private</button>
                    </div>
                }
                <div>
                    <button type='button' className='btn-link' onClick={() => navigate(`/blog_author/post/${post._id}/update`)}>Edit</button>
                    <button type='button' className='btn-link' onClick={() => deletePostClick(post._id)}>Delete</button>
                    <button type='button' className='btn-link'  onClick={commentClick}>Comments ({post.commentCount})</button>
                </div>
                {typeof post.lastEditBy == 'object' &&
                    <span><i>Last edited: {new Date(post.lastEditDate).toLocaleString()} by {post.lastEditBy.display_name} ({post.lastEditBy.user_type})</i></span>
                }
            </div>
        </div>
    );
};
export default PostListRow;