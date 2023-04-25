import '../Styles/DashboardPage.css';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PostListRow = ({ post }) => {
    const navigate = useNavigate();

    //go to post detail page
    const commentClick = () => {
        navigate(`/blog_author/post/${post._id}`);
        //scroll to comment section ------------------------------ ??
    };

    return (
        <div className='post-row'>
            <h4>Blog Title: <Link to={`/blog_author/post/${post._id}`}>{post.title}</Link></h4>
            <div className='post-info'>
                Created on: {new Date(post.post_date).toLocaleString('en-GB', { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </div>
            <div className='post-footer'>
                {post.private &&
                    <>
                        <span><strong>Private</strong></span>&nbsp;
                        (<button type='button' className='button-link'>Make Public</button>)&nbsp;-&nbsp;
                    </>
                }
                {!post.private &&
                    <>
                        <span><strong>Public</strong></span>&nbsp;
                        (<button type='button' className='button-link'>Make Private</button>)&nbsp;-&nbsp;
                    </>
                }
                <button type='button' className='button-link'>EDIT</button>&nbsp;-&nbsp;
                <button type='button' className='button-link'>DELETE</button>&nbsp;-&nbsp;
                <button type='button' className='button-link'  onClick={commentClick}>Comments ({post.commentCount})</button>
                {typeof post.lastEditBy == 'object' &&
                    <span>&nbsp;- <i>Last edited: {new Date(post.lastEditDate).toLocaleString()} by {post.lastEditBy.display_name} ({post.lastEditBy.user_type})</i></span>
                }
            </div>
        </div>
    );
};
export default PostListRow;