import '../Styles/DashboardPage.css';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';

import decodeHtml from '../Javascript/decodeHtml';

const PostRow = ({ post, postPrivacyClick, deletePostClick }) => {
    const navigate = useNavigate();

    //go to post detail page
    const commentClick = () => {
        navigate(`/blog_author/post/${post._id}`);
        //scroll to comment section ------------------------------ ??
    };

    return (
        <div className='post-row'>
            <h3><Link to={`/blog_author/post/${post._id}`}>{decodeHtml( post.title)}</Link></h3>
            <div className='post-info'>{new Date(post.post_date).toLocaleString('en-GB', { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</div>
            <div className='post-text'>{parse(post.text)}</div>
            <div className='post-footer'>
                {post.private &&
                    <>
                        <button type='button' className='button-link' onClick={() => postPrivacyClick(post._id)}>Make Public</button>&nbsp;
                        /&nbsp;<span><strong>Private</strong></span>&nbsp;-&nbsp;
                    </>
                }
                {!post.private &&
                    <>
                        <span><strong>Public</strong></span>&nbsp;
                        /&nbsp;<button type='button' className='button-link' onClick={() => postPrivacyClick(post._id)}>Make Private</button>&nbsp;-&nbsp;
                    </>
                }
                <Link to={`/blog_author/post/${post._id}/update`}>EDIT</Link>&nbsp;-&nbsp;
                <button type='button' className='button-link' onClick={() => deletePostClick(post._id)}>DELETE</button>&nbsp;-&nbsp;
                <button type='button' className='button-link'  onClick={commentClick}>Comments ({post.commentCount})</button>
                {typeof post.lastEditBy == 'object' &&
                    <span>&nbsp;- <i>Last edited: {new Date(post.lastEditDate).toLocaleString()} by {post.lastEditBy.display_name} ({post.lastEditBy.user_type})</i></span>
                }
            </div>
        </div>
    );
};
export default PostRow;