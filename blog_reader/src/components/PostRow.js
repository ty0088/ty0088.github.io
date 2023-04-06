import '../styles/BlogMainPage.css'
import React from 'react';
import { Link } from 'react-router-dom';

const PostRow = ({ user, post }) => {

    return (
        <div className='post-row'>
            <h3>{ user ? <Link to={`/blog_reader/post/${post._id}`}>{post.title}</Link> : <h3>{post.title}</h3> }</h3>
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
                        <a href={`/blog_reader/post/${post._id}`}>Comments</a> ({post.commentCount})
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