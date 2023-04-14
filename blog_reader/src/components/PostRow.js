import '../styles/BlogMainPage.css'
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PostRow = ({ user, post, setScrollComFlag }) => {
    const navigate = useNavigate();

    //go to post detail page and call to scroll to comment section
    const commentClick = () => {
        navigate(`/blog_reader/post/${post._id}`);
        setScrollComFlag(true);
    };

    return (
        <div className='post-row'>
            { user ? <h3><Link to={`/blog_reader/post/${post._id}`}>{post.title}</Link></h3> : <h3>{post.title}</h3> }
            <div className='post-info'>
                {user &&
                    <span><a href={`/blog_reader/user/${post.user._id}`}>{post.user.display_name}</a>,&nbsp;</span>
                }
                Posted on: {new Date(post.post_date).toLocaleString('en-GB', { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </div>
            <div className='post-text'>{post.text}</div>
            {user &&
                <div className='post-footer'>
                    <span>
                        <button className='button-link' type='button' onClick={commentClick}>Comments</button>({post.commentCount})
                    </span>
                    {typeof post.lastEditBy == 'object' &&
                        <span>&nbsp;- <i>Last edited: {new Date(post.lastEditDate).toLocaleString()} by {post.lastEditBy.display_name} ({post.lastEditBy.user_type})</i></span>
                    }
                </div>
            }
        </div>
    );
};
export default PostRow;