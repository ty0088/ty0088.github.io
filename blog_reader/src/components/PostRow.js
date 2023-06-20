import '../Styles/BlogMainPage.css'
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';

import decodeHtml from '../Javascript/decodeHtml';
import getS3ImageUrl from '../Javascript/getS3ImageUrl';

const PostRow = ({ user, post, setScrollComFlag }) => {
    const [imageUrl, setImageUrl] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        //get and set s3 image url to state. State will be set to null if no image available
        const setS3Url = async (postId) => {
            try {
                const s3Url = await getS3ImageUrl(postId);
                setImageUrl(s3Url);
            } catch (error) {
                console.log(error);
            }
        };
        setS3Url(post._id);
    }, [post]);

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
            {imageUrl &&
                <div className='post-image-container'>
                    <img src={imageUrl} alt={`${post._id} img`} className='post-image' />
                </div>
            }
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