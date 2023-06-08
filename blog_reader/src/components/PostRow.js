import '../Styles/BlogMainPage.css'
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';

import decodeHtml from '../Javascript/decodeHtml';

const PostRow = ({ user, post, setScrollComFlag }) => {
    const navigate = useNavigate();

    //go to post detail page and call to scroll to comment section
    const commentClick = () => {
        navigate(`/blog_reader/post/${post._id}`);
        setScrollComFlag(true);
    };

    return (
        <div className='post-row'>
            { user ? <h3><Link to={`/blog_reader/post/${post._id}`}>{decodeHtml(post.title)}</Link></h3> : <h3>{decodeHtml(post.title)}</h3> }
            <div className='post-info'>
                <span>Posted on: {new Date(post.post_date).toLocaleString('en-GB', { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</span> 
                {user &&
                    <span>&nbsp;by <Link to={`/blog_reader/user/${post.user._id}`}>{post.user.display_name}</Link></span>
                }
            </div>
            <hr></hr>
            <div className='post-text'>{parse(post.text)}</div>
            <hr></hr>
            {user &&
                <div className='post-footer'>
                    <button className='btn-link font-small' type='button' onClick={commentClick}>Comments ({post.commentCount})</button>
                    {typeof post.lastEditBy == 'object' &&
                        <span><i>Last edited: {new Date(post.lastEditDate).toLocaleString()} by {post.lastEditBy.display_name} ({post.lastEditBy.user_type})</i></span>
                    }
                </div>
            }
            {!user &&
                <p className='post-info'>Log in to see who posted this and to see and make comments!</p>
            }
        </div>
    );
};
export default PostRow;